import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'
import { Palette, Zap, Sparkles, Camera, Leaf } from 'lucide-react';
import { BiAdjust } from "react-icons/bi";
// const templates = [
//   {
//     id: 'minimal',
//     name: 'Minimal',
//     description: 'Clean and simple design focusing on content',
//     preview: '🎨',
//     features: ['Clean Layout', 'Typography Focus', 'Fast Loading'],
//     color: 'from-gray-400 to-gray-600'
//   },
//   {
//     id: 'modern',
//     name: 'Modern',
//     description: 'Contemporary design with bold elements',
//     preview: '✨',
//     features: ['Bold Typography', 'Gradient Accents', 'Interactive Elements'],
//     color: 'from-blue-400 to-purple-600'
//   },
//   {
//     id: 'creative',
//     name: 'Creative',
//     description: 'Artistic and unique layout for creatives',
//     preview: '🎭',
//     features: ['Artistic Layout', 'Custom Animations', 'Portfolio Focus'],
//     color: 'from-pink-400 to-red-600'
//   },
//   {
//     id: 'professional',
//     name: 'Professional',
//     description: 'Corporate-friendly design for business',
//     preview: '💼',
//     features: ['Business Ready', 'Formal Layout', 'Corporate Colors'],
//     color: 'from-indigo-400 to-blue-600'
//   },
//   {
//     id: 'developer',
//     name: 'Developer',
//     description: 'Tech-focused design for developers',
//     preview: '💻',
//     features: ['Code Snippets', 'Tech Stack Focus', 'Dark Theme'],
//     color: 'from-green-400 to-teal-600'
//   },
//   {
//     id: 'designer',
//     name: 'Designer',
//     description: 'Visual-heavy layout for designers',
//     preview: '🎨',
//     features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections'],
//     color: 'from-purple-400 to-pink-600'
//   },
//    {
//     id: 'minimalist',
//     name: 'Minimalist',
//     description: 'Clean, elegant design with subtle animations',
//     // icon: Palette,
//     // component: MinimalistTemplate,
//      features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections'],
//     preview: Palette,'bg-gradient-to-br from-gray-100 to-white',
//     color: 'text-gray-600'
//   },
//   {
//     id: 'cyberpunk',
//     name: 'Neon Cyberpunk',
//     description: 'Futuristic design with glitch effects and neon colors',
//     // icon: Zap,
//     // component: NeonCyberpunkTemplate,
//      features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections'],
//     preview: Zap,'bg-gradient-to-br from-purple-900 via-black to-cyan-900',
//     color: 'text-cyan-400'
//   },
//   {
//     id: 'glassmorphism',
//     name: 'Glassmorphism',
//     description: 'Modern glass-like effects with beautiful transparency',
//     // icon: Sparkles,
//     // component: GlassmorphismTemplate,
//      features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections'],
//     preview: Sparkles,'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
//     color: 'text-white'
//   },
//   {
//     id: 'retro',
//     name: 'Retro Vintage',
//     description: 'Nostalgic 70s-80s design with warm colors and playful elements',
//     // icon: Camera,
//     // component: RetroVintageTemplate,
//      features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections'],
//     preview: Camera,'bg-gradient-to-br from-orange-300 via-yellow-200 to-red-300',
//     color: 'text-amber-800'
//   },
//   {
//     id: 'nature',
//     name: 'Nature & Organic',
//     description: 'Earth-inspired design with natural elements and seasonal themes',
//     // icon: Leaf,
//     // component: NatureOrganicTemplate,
//      features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections'],
//     preview: Leaf,'bg-gradient-to-br from-green-300 via-blue-200 to-purple-200',
//     color: 'text-green-700'
//   }
// ]



const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focusing on content',
    preview: '🎨',
    features: ['Clean Layout', 'Typography Focus', 'Fast Loading'],
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold elements',
    preview: '✨',
    features: ['Bold Typography', 'Gradient Accents', 'Interactive Elements'],
    color: 'from-blue-400 to-purple-600'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic and unique layout for creatives',
    preview: '🎭',
    features: ['Artistic Layout', 'Custom Animations', 'Portfolio Focus'],
    color: 'from-pink-400 to-red-600'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-friendly design for business',
    preview: '💼',
    features: ['Business Ready', 'Formal Layout', 'Corporate Colors'],
    color: 'from-indigo-400 to-blue-600'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Tech-focused design for developers',
    preview: '💻',
    features: ['Code Snippets', 'Tech Stack Focus', 'Dark Theme'],
    color: 'from-green-400 to-teal-600'
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Visual-heavy layout for designers',
    preview: '🎨',
    features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections'],
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, elegant design with subtle animations',
    preview: <Palette size={30} />,
    color: 'text-gray-600 bg-gradient-to-br from-gray-100 to-white',
    features: ['Clean, elegant design', 'Interactive skill cards', 'Smooth scroll navigation']

  },
  {
    id: 'minimalist2',
    name: 'Minimalist2',
    description: 'Clean, elegant design with subtle animations',
    preview: <Palette size={30} />,
    color: 'text-gray-600 bg-gradient-to-br from-gray-100 to-white',
    features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections']
  },
  {
    id: 'Cyberpunk',
    name: 'Neon Cyberpunk',
    description: 'Futuristic design with glitch effects and neon colors',
    preview: <Zap size={30} />,
    color: 'text-cyan-400 bg-gradient-to-br from-purple-900 via-black to-cyan-900',
    features: ['Futuristic design', 'Terminal-themed interface', 'Retro gaming aesthetics']

  },
  {
    id: 'Glassmorphism',
    name: 'Glassmorphism',
    description: 'Modern glass-like effects with beautiful transparency',
    preview: <Sparkles size={30} />,
    color: 'text-white bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
    features: ['Glass-like effects', 'Interactive theme switcher', '3D hover effects']

  },
  {
    id: 'Retro',
    name: 'Retro Vintage',
    description: 'Nostalgic 70s-80s design with warm colors and playful elements',
    preview: <Camera size={30} />,
    color: 'text-amber-800 bg-gradient-to-br from-orange-300 via-yellow-200 to-red-300',
    features: ['70s–80s nostalgia', 'Retro elements geometric shapes', 'Typography & colors']

  },
  {
    id: 'Nature',
    name: 'Nature & Organic',
    description: 'Earth-inspired design with natural elements and seasonal themes',
    preview: <Leaf size={30} />,
    color: 'text-green-700 bg-gradient-to-br from-green-300 via-blue-200 to-purple-200',
    features: ['Nature-based theme', 'Organic visuals', 'Natural animations']

  },
   {
    id: 'black-white',
    name: 'Black & White Interactive',
    description: 'Stunning monochrome design with high interactivity and attractive animations',
    // icon: Zap,
    // component: BlackWhiteTemplate,
    preview: <img src="/black.png" alt="" />,
    color: 'text-white',
    features: ['Monochrome elegance', 'Geometric visuals', 'Sophisticated animations']

  },
// {
//       id: 'vibrant-purple',
//     name: 'Vibrant Purple Magic',
//     description: 'Magical purple theme with enchanting animations and vibrant colors',
//     // icon: Sparkles,
//     // component: VibrantPurpleTemplate,
//     preview: 'bg-gradient-to-br from-purple-900 via-pink-600 to-indigo-600',
//     color: 'text-purple-400'
//   },

]



const TemplateSelector = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [selectedTemplate, setSelectedTemplate] = useState(user?.selectedTemplate || 'minimal')
  const [saving, setSaving] = useState(false)

  const handleTemplateSelect = async (templateId) => {
    setSelectedTemplate(templateId)
    setSaving(true)

    try {
      await dispatch(updateProfile({ selectedTemplate: templateId })).unwrap()
      toast.success('Template updated successfully!')
    } catch (error) {
      toast.error('Failed to update template')
      setSelectedTemplate(user?.selectedTemplate || 'minimal')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Template
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select a template that best represents your style and profession
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className={`
              card p-6 cursor-pointer transition-all duration-300 hover:shadow-xl
              ${selectedTemplate === template.id 
                ? 'ring-2 ring-primary-500 border-primary-200 dark:border-primary-800' 
                : 'hover:border-primary-200 dark:hover:border-primary-800'
              }
            `}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="text-center mb-4">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${template.color} flex items-center justify-center text-3xl mb-3`}>
                {template.preview}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {template.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {template.description}
              </p>
            </div>

            <div className="space-y-2">
              {template.features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {selectedTemplate === template.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Selected</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {saving && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <div className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400">
            <motion.div
              className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Updating template...</span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800"
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="text-2xl">💡</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Template Features
          </h3>
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• All templates are fully responsive and mobile-friendly</li>
          <li>• Dark/light mode support across all templates</li>
          <li>• SEO optimized for better search visibility</li>
          <li>• Fast loading with optimized performance</li>
          <li>• Easy customization through the dashboard</li>
        </ul>
      </motion.div>
    </div>
  )
}

export default TemplateSelector
