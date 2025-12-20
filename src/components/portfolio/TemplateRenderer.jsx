import React from 'react'
import MinimalTemplate from './templates/MinimalTemplate'
import ModernTemplate from './templates/ModernTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import DeveloperTemplate from './templates/DeveloperTemplate'
import DesignerTemplate from './templates/DesignerTemplate'
import MinimalistTemplate from './templates/MinimalistTemplate'
import MinimalistTemplate2 from './templates/MinimalistTemplate2'
import NeonCyberpunkTemplate from './templates/NeonCyberpunkTemplate'
import RetroVintageTemplate from './templates/RetroVintageTemplate'
import GlassmorphismTemplate from './templates/GlassmorphismTemplate'
import NatureOrganicTemplate from './templates/NatureOrganicTemplate'
import BlackWhiteTemplate from './templates/BlackWhiteTemplate'
const TemplateRenderer = ({
  template,
  user,
  projects,
  sectionOrder,
  visibleSections
}) => {
  const templateProps = {
    user,
    projects,
    sectionOrder,
    visibleSections
  }

  switch (template) {
    case 'minimal':
      return <MinimalTemplate {...templateProps} />
    case 'modern':
      return <ModernTemplate {...templateProps} />
    case 'creative':
      return <CreativeTemplate {...templateProps} />
    case 'professional':
      return <ProfessionalTemplate {...templateProps} />
    case 'developer':
      return <DeveloperTemplate {...templateProps} />
    case 'designer':
      return <DesignerTemplate {...templateProps} />
    case 'minimalist':
      return <MinimalistTemplate {...templateProps} />
    case 'minimalist2':
      return <MinimalistTemplate2 {...templateProps} />
    case 'Cyberpunk':
      return <NeonCyberpunkTemplate {...templateProps} />
    case 'Retro':
      return <RetroVintageTemplate {...templateProps} />
    case 'Glassmorphism':
      return <GlassmorphismTemplate {...templateProps} />
    case 'Nature':
      return <NatureOrganicTemplate {...templateProps} />
    case 'black-white':
      return <BlackWhiteTemplate {...templateProps} />
    default:
      return <MinimalTemplate {...templateProps} />
  }
}

export default TemplateRenderer
