// // routes/oauthRoutes.js
// import express from 'express';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import Integration from '../models/Integration.js';
// import { providers } from '../config/oauthProviders.js';

// const router = express.Router();

// // step-1: return provider auth URL (so frontend can window.open)
// router.get('/:provider/login', (req, res) => {
//   const { provider } = req.params;
//   const cfg = providers[provider];
//   if (!cfg) return res.status(400).json({ message: 'Unknown provider' });

//   const state = encodeURIComponent(req.query.state || ''); // pass-thru (optional)
//   const urlMap = {
//     github: `${cfg.authUrl}?client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&scope=${encodeURIComponent(cfg.scope)}&state=${state}`,
//     google: `${cfg.authUrl}?client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&response_type=code&scope=${encodeURIComponent(cfg.scope)}&access_type=offline&prompt=consent&state=${state}`,
//     linkedin: `${cfg.authUrl}?response_type=code&client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(cfg.redirectUri)}&scope=${encodeURIComponent(cfg.scope)}&state=${state}`
//   };
//   return res.json({ authUrl: urlMap[provider] });
// });

// // helper: sign jwt
// function signJwt(userId) {
//   return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });
// }

// // step-2: callback (exchange code → token → profile → upsert user → save Integration → JWT)
// router.get('/:provider/callback', async (req, res) => {
//   try {
//     const { provider } = req.params;
//     const { code } = req.query;
//     const cfg = providers[provider];
//     if (!cfg || !code) return res.status(400).send('Invalid request');

//     // token exchange
//     let tokenRes;
//     if (provider === 'github') {
//       tokenRes = await axios.post(cfg.tokenUrl, {
//         client_id: cfg.clientId,
//         client_secret: cfg.clientSecret,
//         code,
//         redirect_uri: cfg.redirectUri
//       }, { headers: { Accept: 'application/json' }});
//     } else if (provider === 'google') {
//       tokenRes = await axios.post(cfg.tokenUrl, {
//         code,
//         client_id: cfg.clientId,
//         client_secret: cfg.clientSecret,
//         redirect_uri: cfg.redirectUri,
//         grant_type: 'authorization_code'
//       });
//     } else if (provider === 'linkedin') {
//       tokenRes = await axios.post(cfg.tokenUrl, new URLSearchParams({
//         grant_type: 'authorization_code',
//         code,
//         redirect_uri: cfg.redirectUri,
//         client_id: cfg.clientId,
//         client_secret: cfg.clientSecret
//       }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
//     }

//     const { access_token, refresh_token, token_type, expires_in, id_token } = tokenRes.data;

//     // profile fetch
//     let profile, email;
//     if (provider === 'github') {
//       const p = await axios.get(cfg.profileUrl, { headers: { Authorization: `Bearer ${access_token}` }});
//       profile = p.data; // { id, name, email, avatar_url, ... }
//       if (!profile.email) {
//         const emails = await axios.get('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${access_token}` }});
//         const primary = emails.data.find(e => e.primary) || emails.data[0];
//         email = primary?.email;
//       } else email = profile.email;
//     }
//     if (provider === 'google') {
//       const p = await axios.get(cfg.profileUrl, { headers: { Authorization: `Bearer ${access_token}` }});
//       profile = p.data; // { sub, name, picture, email, given_name, family_name, ... }
//       email = profile.email;
//     }
//     if (provider === 'linkedin') {
//       const p = await axios.get(cfg.profileUrl, { headers: { Authorization: `Bearer ${access_token}` }});
//       const e = await axios.get(providers.linkedin.emailUrl, { headers: { Authorization: `Bearer ${access_token}` }});
//       profile = p.data; // has id + localizedFirstName/LastName
//       email = e?.data?.elements?.[0]?.['handle~']?.emailAddress;
//     }

//     // upsert user
//     const providerUserId =
//       provider === 'google' ? profile.sub :
//       provider === 'github' ? String(profile.id) :
//       provider === 'linkedin' ? profile.id : undefined;

//     const fullName =
//       provider === 'google' ? (profile.name || `${profile.given_name||''} ${profile.family_name||''}`.trim()) :
//       provider === 'github' ? (profile.name || profile.login) :
//       provider === 'linkedin' ? `${profile.localizedFirstName||''} ${profile.localizedLastName||''}`.trim() : 'User';

//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({
//         fullName,
//         email,
//         password: undefined, // OAuth
//         profileImgUrl:
//           provider === 'google' ? profile.picture :
//           provider === 'github' ? profile.avatar_url : '',
//         socialLinks: {
//           github: provider === 'github' ? profile.html_url : undefined,
//           linkedin: provider === 'linkedin' ? `https://www.linkedin.com/in/${providerUserId}` : undefined
//         },
//         providers: [{ provider, providerUserId }]
//       });
//     } else {
//       // make sure provider is recorded
//       const already = user.providers?.some(p => p.provider === provider && p.providerUserId === providerUserId);
//       if (!already) {
//         user.providers = user.providers || [];
//         user.providers.push({ provider, providerUserId });
//         await user.save();
//       }
//     }

//     // upsert Integration record (mark connected)
//     await Integration.findOneAndUpdate(
//       { userId: user._id, provider: provider === 'google' ? 'google-analytics' : provider },
//       {
//         connected: true,
//         accessToken: access_token,
//         refreshToken: refresh_token,
//         tokenType: token_type,
//         scope: tokenRes.data.scope || providers[provider].scope,
//         expiresAt: expires_in ? new Date(Date.now() + expires_in * 1000) : undefined,
//         meta: { email, name: fullName }
//       },
//       { upsert: true, new: true }
//     );

//     // issue JWT and redirect back to your frontend (or return JSON if you prefer)
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });

//     // If using SPA, redirect to frontend deep link
//     const FE_REDIRECT = process.env.FE_OAUTH_REDIRECT || 'http://localhost:5173/oauth/callback';
//     const url = new URL(FE_REDIRECT);
//     url.searchParams.set('token', token);
//     url.searchParams.set('provider', provider);
//     return res.redirect(url.toString());

//     // Alternative: res.json({ token, provider })
//   } catch (e) {
//     console.error('OAuth callback error', e?.response?.data || e);
//     return res.status(500).send('OAuth error');
//   }
// });

// export default router;
