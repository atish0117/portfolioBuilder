# Portfolio Builder 🚀

A modern, full-stack portfolio builder that allows users to create stunning professional portfolios with ease. Built with React, TypeScript, Node.js, and MongoDB.

## ✨ Features

### 🎨 **Portfolio Creation**
- **8 Customizable Sections**: Hero, Skills, Projects, Education, Experience, Certifications, Testimonials, Contact
- **6 Professional Templates**: Minimal, Modern, Creative, Professional, Developer, Designer
- **Drag & Drop Interface**: Reorder sections with intuitive drag-and-drop
- **Section Visibility**: Toggle sections on/off as needed
- **Responsive Design**: Perfect on all devices

### 💼 **Content Management**
- **Project Showcase**: Add projects with images, tech stack, and links
- **Work Experience**: Detailed experience with skills and responsibilities
- **Education**: Academic background with institutions and degrees
- **Certifications**: Professional certifications with verification links
- **Testimonials**: Client reviews with profile images
- **Skills**: Tag-based skill management

### 🔧 **Technical Features**
- **File Upload**: Profile images and resume upload (Appwrite integration)
- **Dark/Light Mode**: System preference detection with manual toggle
- **SEO Optimized**: Clean URLs and meta tags
- **Real-time Updates**: Instant preview of changes
- **Authentication**: Secure JWT-based auth system
- **Data Persistence**: MongoDB with comprehensive schemas

### 🎯 **User Experience**
- **Auto-generated Usernames**: Unique portfolio URLs
- **Live Portfolio**: Public portfolios at `/{username}`
- **Social Integration**: GitHub, LinkedIn, Twitter links
- **Professional Output**: Clean, modern designs
- **Fast Performance**: Optimized loading and animations

## 🛠️ Tech Stack

### **Frontend**
- **React 19** with javascript
- **Redux Toolkit** for state management
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for development and building

### **Backend**
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **CORS** and security middleware

### **Additional Tools**
- **Appwrite** for file storage
- **React Hot Toast** for notifications
- **DND Kit** for drag-and-drop
- **Lottie React** for animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Appwrite account (for file uploads)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio-builder
```

2. **Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

3. **Environment Setup**
```bash
# Copy server environment file
cp server/.env.example server/.env
```

4. **Configure Environment Variables**

Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio-builder
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

5. **Configure Appwrite (Optional)**

Edit `src/services/appwrite.ts`:
```typescript
const client = new Client()
  .setEndpoint('YOUR_APPWRITE_ENDPOINT')
  .setProject('YOUR_PROJECT_ID')

export const BUCKET_ID = 'YOUR_BUCKET_ID'
```

6. **Start Development Servers**
```bash
npm run dev
```

This starts both frontend (http://localhost:5173) and backend (http://localhost:5000) servers.

## 📁 Project Structure

```
portfolio-builder/
├── src/                          # Frontend source
│   ├── components/              # React components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── layout/             # Layout components
│   │   ├── portfolio/          # Portfolio display components
│   │   └── ui/                 # Reusable UI components
│   ├── contexts/               # React contexts
│   ├── hooks/                  # Custom hooks
│   ├── pages/                  # Page components
│   ├── services/               # API services
│   ├── store/                  # Redux store and slices
│   └── utils/                  # Utility functions
├── server/                      # Backend source
│   ├── middleware/             # Express middleware
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   └── server.js              # Server entry point
└── public/                     # Static assets
```

## 🎯 Usage Guide

### Creating Your Portfolio

1. **Sign Up**: Create an account with email and password
2. **Dashboard Access**: Navigate to the dashboard after login
<<<<<<< HEAD
3. **Profile Setup**: Add your basic information, tagLine, and skills
=======
3. **Profile Setup**: Add your basic information, bio, and skills
>>>>>>> 52b52f7 (first commit)
4. **Add Content**: 
   - Upload profile image and resume
   - Add projects with descriptions and tech stack
   - Include work experience and education
   - Add certifications and testimonials
5. **Customize**: 
   - Choose from 6 professional templates
   - Reorder sections with drag-and-drop
   - Toggle section visibility
6. **Publish**: Your portfolio is live at `/{your-username}`

### Dashboard Features

- **Profile Tab**: Basic information and social links
- **Projects Tab**: Manage portfolio projects
- **Experience Tab**: Add work experience
- **Education Tab**: Academic background
- **Certifications Tab**: Professional certifications
- **Testimonials Tab**: Client reviews
- **Sections Tab**: Reorder and toggle sections
- **Templates Tab**: Choose portfolio design
- **Files Tab**: Upload images and resume
- **Settings Tab**: Account information and portfolio URL

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Portfolio
- `GET /api/portfolio/:username` - Get public portfolio
- `PUT /api/portfolio/section-order` - Update section order
- `PUT /api/portfolio/section-visibility` - Toggle section visibility
- `PUT /api/portfolio/profile` - Update portfolio profile

### Projects
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 🎨 Customization

### Adding New Templates
1. Add template configuration to `src/utils/constants.ts`
2. Implement template styles in `src/components/portfolio/`
3. Update template selector component

### Adding New Sections
1. Add section to `PORTFOLIO_SECTIONS` in constants
2. Create section component
3. Update portfolio renderer
4. Add dashboard manager component

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd server
npm start
# Configure environment variables
```

### Database
- MongoDB Atlas for production
- Configure connection string in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- MongoDB for the flexible database
- All open-source contributors

## 📞 Support

For support, email support@portfoliobuilder.com or join our Discord community.

---

**Built with ❤️ by the Portfolio Builder Team**