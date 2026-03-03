import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  
  // Personal Info
  personalInfo: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    bio: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    resume: { type: String, default: '' }
  },
  
  // Contact Section
  contact: {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    social: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      website: { type: String, default: '' }
    }
  },
  
  // Skills Section
  skills: [{
    title: { type: String, required: true }, // e.g., "Frontend", "Backend"
    items: [{
      name: { type: String, required: true },
      logo: { type: String, default: '' }
    }]
  }],
  
  // Experience Section
  experience: [{
    company: { type: String, required: true },
    role: { type: String, required: true },
    companyLogo: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    description: { type: String, default: '' },
    skills: [{ type: String }],
    order: { type: Number, default: 0 }
  }],
  
  // Education Section
  education: [{
    school: { type: String, required: true },
    degree: { type: String, required: true },
    schoolLogo: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    grade: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 }
  }],
  
  // Projects Section
  projects: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    tags: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    order: { type: Number, default: 0 }
  }],
  
  // Theme Settings
  theme: {
    primaryColor: { type: String, default: '#3B82F6' },
    template: { type: String, default: 'modern' }, // modern, minimal, creative
    font: { type: String, default: 'Inter' }
  },
  
  // Analytics
  analytics: {
    views: { type: Number, default: 0 },
    lastViewed: { type: Date }
  }
  
}, { 
  timestamps: true 
});

// Index for faster slug lookups
portfolioSchema.index({ slug: 1 });
portfolioSchema.index({ userId: 1 });

export default mongoose.model('Portfolio', portfolioSchema);