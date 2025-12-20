// import express from 'express';
// import Integration from '../models/Integration.js';
// import User from '../models/User.js';
// import { auth } from '../middleware/auth.js';
// import axios from 'axios';
// import { providers } from '../config/oauthProviders.js';

// const router = express.Router();

// // List all integrations (status)
// router.get('/', auth, async (req, res) => {
//   const defs = [
//     { id:'google-analytics', name:'Google Analytics', category:'analytics', icon:'📊', description:'Track portfolio visitors and engagement' },
//     { id:'github', name:'GitHub', category:'productivity', icon:'🐙', description:'Automatically sync your repositories' },
//     { id:'linkedin', name:'LinkedIn', category:'social', icon:'💼', description:'Import experience and recommendations' },
//     { id:'dribbble', name:'Dribbble', category:'design', icon:'🏀', description:'Showcase your design work' },
//     { id:'behance', name:'Behance', category:'design', icon:'🎨', description:'Display your creative projects' },
//     { id:'medium', name:'Medium', category:'productivity', icon:'📝', description:'Import your blog posts' },
//     { id:'figma', name:'Figma', category:'design', icon:'🎯', description:'Embed your design prototypes' },
//     { id:'codepen', name:'CodePen', category:'productivity', icon:'✏️', description:'Show your code experiments' },
//   ];
//   const rows = await Integration.find({ userId: req.user._id });
//   const map = Object.fromEntries(rows.map(r => [r.provider, r]));
//   const withStatus = defs.map(d => ({
//     ...d,
//     connected: !!map[d.id]?.connected,
//     lastSyncedAt: map[d.id]?.lastSyncedAt || null
//   }));
//   res.json({ integrations: withStatus });
// });

// // Get provider auth URL (so UI can start connect)
// router.get('/:provider/connect-url', auth, async (req, res) => {
//   const prov = req.params.provider;
//   const key = prov === 'google-analytics' ? 'google' : prov;
//   const cfg = providers[key];
//   if (!cfg) return res.status(400).json({ message: 'Unsupported provider' });
//   const state = encodeURIComponent('inapp'); // optional
//   const authUrl = key === 'github'
//     ? `${cfg.authUrl}?client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&scope=${encodeURIComponent(cfg.scope)}&state=${state}`
//     : key === 'google'
//     ? `${cfg.authUrl}?client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&response_type=code&scope=${encodeURIComponent(cfg.scope)}&access_type=offline&prompt=consent&state=${state}`
//     : `${cfg.authUrl}?response_type=code&client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&scope=${encodeURIComponent(cfg.scope)}&state=${state}`;

//   res.json({ authUrl });
// });

// // Disconnect
// router.post('/:provider/disconnect', auth, async (req, res) => {
//   const prov = req.params.provider;
//   await Integration.findOneAndUpdate(
//     { userId: req.user._id, provider: prov },
//     { connected: false, accessToken: null, refreshToken: null, expiresAt: null },
//     { upsert: true }
//   );
//   res.json({ message: `${prov} disconnected` });
// });

// // Manual Sync (example: GitHub & LinkedIn → update profile/projects)
// router.post('/:provider/sync', auth, async (req, res) => {
//   const prov = req.params.provider;
//   const row = await Integration.findOne({ userId: req.user._id, provider: prov });
//   if (!row?.connected || !row.accessToken) return res.status(400).json({ message: 'Not connected' });

//   const user = await User.findById(req.user._id);

//   try {
//     if (prov === 'github') {
//       const me = await axios.get('https://api.github.com/user', { headers: { Authorization: `Bearer ${row.accessToken}` }});
//       const repos = await axios.get('https://api.github.com/user/repos?per_page=100&sort=updated', { headers: { Authorization: `Bearer ${row.accessToken}` }});
//       // pick top 3 by stargazers_count
//       const top = repos.data.sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,3).map(r=>({
//         title: r.name,
//         description: r.description,
//         url: r.html_url,
//         stars: r.stargazers_count,
//         tech: (r.language ? [r.language] : [])
//       }));

//       // merge to profile (simple example)
//       user.socialLinks = { ...(user.socialLinks||{}), github: me.data.html_url };
//       user.tagLine = user.tagLine || (me.data.bio || user.tagLine);
//       await user.save();

//       // OPTIONAL: if you have Project model, upsert these 3 as "imported"
//       // ... upsert logic here if needed ...

//     } else if (prov === 'linkedin') {
//       const prof = await axios.get(providers.linkedin.profileUrl, { headers: { Authorization: `Bearer ${row.accessToken}` }});
//       const first = prof.data.localizedFirstName || '';
//       const last = prof.data.localizedLastName || '';
//       const fullName = `${first} ${last}`.trim();
//       if (!user.fullName) user.fullName = fullName;
//       user.socialLinks = { ...(user.socialLinks||{}), linkedin: `https://www.linkedin.com/in/${prof.data.id}` };
//       await user.save();
//     } else if (prov === 'google-analytics') {
//       // here generally you'd store property id / measurement id after a config UI
//       // skipping actual GA property linkage in this minimal example
//     }

//     row.lastSyncedAt = new Date();
//     await row.save();
//     res.json({ message: 'Synced', lastSyncedAt: row.lastSyncedAt });
//   } catch (e) {
//     console.error('Sync error', e?.response?.data || e);
//     res.status(500).json({ message: 'Sync failed' });
//   }
// });

// export default router;


import express from 'express'
import { auth } from '../middleware/auth.js'
import User from '../models/User.js'
import Project from '../models/Project.js'
import { getGitHubRepositories, getGitHubStats } from '../services/oauth/githubOAuth.js'
import { getLinkedInProfile, getLinkedInExperience } from '../services/oauth/linkedinOAuth.js'
import { getGoogleProfile } from '../services/oauth/googleOAuth.js'

const router = express.Router()

// Get integration status
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('socialAuth socialLinks integrationSettings')
    
    const integrations = {
      github: {
        connected: !!(user.socialAuth?.github?.accessToken),
        lastSync: user.socialAuth?.github?.lastSync,
        username: user.socialAuth?.github?.username,
        profileUrl: user.socialLinks?.github
      },
      google: {
        connected: !!(user.socialAuth?.google?.accessToken),
        lastSync: user.socialAuth?.google?.lastSync,
        email: user.socialAuth?.google?.email
      },
      linkedin: {
        connected: !!(user.socialAuth?.linkedin?.accessToken),
        lastSync: user.socialAuth?.linkedin?.lastSync,
        username: user.socialAuth?.linkedin?.username,
        profileUrl: user.socialLinks?.linkedin
      },
      instagram: {
        connected: !!(user.socialLinks?.instagram),
        profileUrl: user.socialLinks?.instagram
      },
      dribbble: {
        connected: !!(user.socialLinks?.dribbble),
        profileUrl: user.socialLinks?.dribbble
      },
      behance: {
        connected: !!(user.socialLinks?.behance),
        profileUrl: user.socialLinks?.behance
      },
      website: {
        connected: !!(user.socialLinks?.website),
        profileUrl: user.socialLinks?.website
      }
    }

    const connectedCount = Object.values(integrations).filter(i => i.connected).length

    res.json({
      integrations,
      connectedCount,
      totalIntegrations: Object.keys(integrations).length,
      integrationSettings: user.integrationSettings || {}
    })
  } catch (error) {
    console.error('Get integration status error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// GitHub Integration
router.get('/github/repos', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    
    if (!user.socialAuth?.github?.accessToken) {
      return res.status(400).json({ message: 'GitHub account not connected' })
    }

    const repositories = await getGitHubRepositories(user.socialAuth.github.accessToken, {
      limit: 20,
      includePrivate: user.integrationSettings?.github?.importPrivateRepos
    })

    res.json({
      repositories: repositories.filter(repo => {
        if (user.integrationSettings?.github?.importPrivateRepos === false && repo.private) {
          return false
        }
        return !repo.fork && repo.stars >= 0
      })
    })
  } catch (error) {
    console.error('GitHub repos error:', error)
    res.status(500).json({ message: 'Failed to fetch GitHub repositories' })
  }
})

router.post('/github/import', auth, async (req, res) => {
  try {
    const { repoIds } = req.body
    const user = await User.findById(req.user._id)

    if (!user.socialAuth?.github?.accessToken) {
      return res.status(400).json({ message: 'GitHub account not connected' })
    }

    const repositories = await getGitHubRepositories(user.socialAuth.github.accessToken)
    const importedProjects = []
    const errors = []

    for (const repoId of repoIds) {
      try {
        const repo = repositories.find(r => r.id === repoId)
        if (!repo) continue

        // Check if project already exists
        const existingProject = await Project.findOne({
          userId: user._id,
          githubLink: repo.url
        })

        if (!existingProject) {
          const project = new Project({
            userId: user._id,
            title: repo.name,
            description: repo.description || `${repo.language || 'Code'} project imported from GitHub`,
            techStack: [
              ...(repo.language ? [repo.language] : []),
              ...(repo.topics || []).slice(0, 4)
            ],
            githubLink: repo.url,
            liveLink: repo.homepage || '',
            category: 'web',
            status: 'published',
            startDate: new Date(repo.createdAt).toISOString().split('T')[0],
            endDate: repo.updatedAt !== repo.createdAt ? new Date(repo.updatedAt).toISOString().split('T')[0] : ''
          })

          await project.save()
          importedProjects.push(project)
        }
      } catch (error) {
        console.error(`Failed to import repo ${repoId}:`, error)
        errors.push(`Failed to import repository ${repoId}`)
      }
    }

    res.json({
      message: `Successfully imported ${importedProjects.length} projects from GitHub`,
      importedCount: importedProjects.length,
      totalRequested: repoIds.length,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error) {
    console.error('GitHub import error:', error)
    res.status(500).json({ message: 'Failed to import GitHub repositories' })
  }
})

router.get('/github/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    
    if (!user.socialAuth?.github?.accessToken) {
      return res.status(400).json({ message: 'GitHub account not connected' })
    }

    const stats = await getGitHubStats(user.socialAuth.github.accessToken)
    res.json(stats)
  } catch (error) {
    console.error('GitHub stats error:', error)
    res.status(500).json({ message: 'Failed to fetch GitHub stats' })
  }
})

// LinkedIn Integration
router.get('/linkedin/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    
    if (!user.socialAuth?.linkedin?.accessToken) {
      return res.status(400).json({ message: 'LinkedIn account not connected' })
    }

    const profile = await getLinkedInProfile(user.socialAuth.linkedin.accessToken)
    res.json(profile)
  } catch (error) {
    console.error('LinkedIn profile error:', error)
    res.status(500).json({ message: 'Failed to fetch LinkedIn profile' })
  }
})

router.get('/linkedin/experience', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    
    if (!user.socialAuth?.linkedin?.accessToken) {
      return res.status(400).json({ message: 'LinkedIn account not connected' })
    }

    const experience = await getLinkedInExperience(user.socialAuth.linkedin.accessToken)
    res.json(experience)
  } catch (error) {
    console.error('LinkedIn experience error:', error)
    res.status(500).json({ message: 'Failed to fetch LinkedIn experience' })
  }
})

// Google Integration
router.get('/google/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    
    if (!user.socialAuth?.google?.accessToken) {
      return res.status(400).json({ message: 'Google account not connected' })
    }

    const profile = await getGoogleProfile(user.socialAuth.google.accessToken)
    res.json(profile)
  } catch (error) {
    console.error('Google profile error:', error)
    res.status(500).json({ message: 'Failed to fetch Google profile' })
  }
})

// Update Integration Settings
router.put('/settings', auth, async (req, res) => {
  try {
    const { provider, settings } = req.body
    const user = await User.findById(req.user._id)

    if (!user.integrationSettings) {
      user.integrationSettings = {}
    }

    user.integrationSettings[provider] = {
      ...user.integrationSettings[provider],
      ...settings
    }

    await user.save()

    res.json({
      message: `${provider} integration settings updated`,
      settings: user.integrationSettings[provider]
    })
  } catch (error) {
    console.error('Update integration settings error:', error)
    res.status(500).json({ message: 'Failed to update settings' })
  }
})

export default router
