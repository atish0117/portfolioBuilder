import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String,},
    username: { type: String, required: true, unique: true, trim: true, index: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // make optional for OAuth
 // ----------------- Social Authentication -----------------
    socialAuth: {
      github: {
        id: String,
        username: String,
        accessToken: String, // consider encrypting
        profileUrl: String,
        lastSync: Date
      },
      google: {
        id: String,
        email: String,
        accessToken: String, // consider encrypting
        lastSync: Date
      },
      linkedin: {
        id: String,
        username: String,
        accessToken: String, //consider encrypting
        profileUrl: String,
        lastSync: Date
      }
    },

    authProvider: {
      type: String,
      enum: ["local", "github", "google", "linkedin"],
      default: "local"
    },

    // Password Reset Fields
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,

     // Admin Fields
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user"
    },
    status: {
      type: String,
      enum: ["active", "banned", "suspended", "pending"],
      default: "active"
    },
    lastLoginAt: Date,
    loginCount: { type: Number, default: 0 },


    // Profile Fields
    profileImgUrl: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    title: String,
    phoneNumber: String,
    location: String,
    intro: String, // Short intro about the user
    tagLine: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
      dribbble: String,
      behance: String,
      website: String,
      
    },
    skills: [{ type: String }],

      aboutSections: [{
      id: String,
      title: String,
      description: String,
    }],
      languages: [{ type: String }],
      timezone: String,
      hourlyRate: String,

    preferredWorkType: {
      type: String,
      enum: ["remote", "onsite", "hybrid", "freelance"],
      default: "remote"
    },
     availability: {
      type: String,
      enum: ["available", "busy", "not-available","currently-working",],
      default: "available"
    },
    workExperience: {
      type: String,
      default: "Fresher",
    },
    // Portfolio Sections
    experienceDetails: [
      {
        companyName: { type: String, required: true },
        jobTitle: { type: String, required: true },
        duration: { type: String, required: true },
        responsibilities: String,
        skills: [String],
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        startYear: String,
        endYear: String
      },
    ],
    sectionOrder: {
      type: [String],
      default: ["hero", "about","skills", "projects", "education", "experience", "certifications", "testimonials", "contact"]
    },
    visibleSections: {
      type: Map,
      of: Boolean,
     default: function() {
        return new Map([
          ['hero', true],
          ['about', true],
          ['skills', true],
          ['projects', true],
          ['education', true],
          ['experience', true],
          ['certifications', true],
          ['testimonials', true],
          ['contact', true]
        ])
      }
    },
    testimonials: [
      {
        name: String,
        designation: String,
        message: String,
        imageUrl: String
      }
    ],
    certifications: [
      {
        title: String,
        platform: String,
        certificateLink: String
      }
    ],
    selectedTemplate: { type: String, default: "minimal" },


                      //  Integration Settings 
    integrationSettings: {
      github: {
        autoImportRepos: { type: Boolean, default: true },
        syncFrequency: { type: String, enum: ["daily", "weekly", "manual"], default: "weekly" },
        importPrivateRepos: { type: Boolean, default: false }
      },
      linkedin: {
        syncExperience: { type: Boolean, default: true },
        syncSkills: { type: Boolean, default: true },
        syncEducation: { type: Boolean, default: true }
      },
      analytics: {
        googleAnalyticsId: String,
        hotjarId: String,
        trackingEnabled: { type: Boolean, default: true }
      }
    },

     // SEO Fields
    seoData: {
      metaTitle: { type: String, maxlength: 60 },
      metaDescription: { type: String, maxlength: 160 },
      keywords: [{ type: String, maxlength: 50 }],
      ogTitle: { type: String, maxlength: 60 },
      ogDescription: { type: String, maxlength: 160 },
      ogImage: { type: String },
      twitterCard: { 
        type: String, 
        enum: ['summary', 'summary_large_image', 'app', 'player'],
        default: 'summary_large_image' 
      },
       twitterTitle: { type: String, maxlength: 70 },
      twitterDescription: { type: String, maxlength: 200 },
      twitterImage: { type: String },
      canonicalUrl: { type: String },
      robotsDirective: { 
        type: String, 
        enum: ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'],
        default: 'index,follow' 
      },
         structuredData: {
        type: { type: String, default: 'Person' },
        jobTitle: String,
        worksFor: String,
        url: String,
        sameAs: [String], // Social media URLs
        knowsAbout: [String], // Skills/expertise
        alumniOf: [String], // Educational institutions
        award: [String] // Certifications/awards
      },
      customMetaTags: [{
        name: String,
        content: String,
        property: String // For og: properties
      }],
        seoScore: { type: Number, default: 0, min: 0, max: 100 },
      lastSeoUpdate: { type: Date, default: Date.now }

  },
  },
  
  { timestamps: true }
);

// Username generator
userSchema.pre("validate", async function (next) {
  if (!this.username || this.username.trim() === "") {
    const base = this.fullName.replace(/\s+/g, "").toLowerCase();
    let candidate;
    let exists = true;

    while (exists) {
      const randomNum = Math.floor(100 + Math.random() * 900);
      candidate = `${base}${randomNum}`;
      exists = await mongoose.models.User.exists({ username: candidate });
    }

    this.username = candidate;
  }
  next();
});

const sanitize = (_, ret) => {
  delete ret.password
  delete ret.__v
  delete ret.passwordResetToken
  delete ret.passwordResetExpires

  if (ret.socialAuth) {
    delete ret.socialAuth.github?.accessToken
    delete ret.socialAuth.google?.accessToken
    delete ret.socialAuth.linkedin?.accessToken
  }

  return ret
}

userSchema.set('toJSON', { transform: sanitize })
userSchema.set('toObject', { transform: sanitize })


export default mongoose.model("User", userSchema);


