
// import { motion } from 'framer-motion'
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core'
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
//   useSortable,
// } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateProfile } from '../../store/slices/authSlice'
// import toast from 'react-hot-toast'

// const defaultSections = [
//   { id: 'hero', label: 'Hero Section', icon: '🏠', description: 'Introduction and profile image' },
//   { id: 'skills', label: 'Skills', icon: '⚡', description: 'Technical skills and expertise' },
//   { id: 'projects', label: 'Projects', icon: '💼', description: 'Portfolio projects showcase' },
//   { id: 'education', label: 'Education', icon: '🎓', description: 'Educational background' },
//   { id: 'experience', label: 'Experience', icon: '💻', description: 'Work experience details' },
//   { id: 'certifications', label: 'Certifications', icon: '🏆', description: 'Professional certifications' },
//   { id: 'testimonials', label: 'Testimonials', icon: '💬', description: 'Client and colleague reviews' },
//   { id: 'contact', label: 'Contact', icon: '📧', description: 'Contact information and form' },
// ]

// const SortableItem = ({ section, isVisible, onToggleVisibility, isUpdating }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: section.id })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   }

//   const handleToggleClick = (e) => {
//     e.preventDefault()
//     e.stopPropagation()

//     if (isUpdating) return

//     onToggleVisibility(section.id, !isVisible)
//   }

//   return (
//     <motion.div
//       ref={setNodeRef}
//       style={style}
//       className={`
//         card p-4 cursor-move select-none
//         ${isDragging ? 'opacity-50 shadow-2xl scale-105' : 'hover:shadow-lg'}
//         ${isVisible ? 'border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/10' : 'border-gray-200 dark:border-dark-600'}
//         transition-all duration-200
//       `}
//       whileHover={{ scale: isDragging ? 1.05 : 1.02 }}
//       {...attributes}
//       {...listeners}
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3 flex-1">
//           <div className="text-2xl">{section.icon}</div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-gray-900 dark:text-white">
//               {section.label}
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               {section.description}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-3">
//           <div className={`
//             px-2 py-1 rounded-full text-xs font-medium
//             ${isVisible 
//               ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
//               : 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
//             }
//           `}>
//             {isVisible ? 'Visible' : 'Hidden'}
//           </div>

//           <button
//             type="button"
//             onClick={handleToggleClick}
//             disabled={isUpdating}
//             className={`
//               relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
//               ${isVisible ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'}
//               ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
//             `}
//             aria-label={`Toggle ${section.label} visibility`}
//           >
//             <motion.span
//               className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
//               animate={{ x: isVisible ? 24 : 4 }}
//               transition={{ type: "spring", stiffness: 500, damping: 30 }}
//             />
//           </button>

//           <div className="text-gray-400 dark:text-gray-500 cursor-move">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {isUpdating && (
//         <div className="mt-2 flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400">
//           <motion.div
//             className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           />
//           <span>Updating...</span>
//         </div>
//       )}
//     </motion.div>
//   )
// }

// const SectionManager = () => {
//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.auth)
//   const [sections, setSections] = useState(defaultSections)
//   const [visibleSections, setVisibleSections] = useState({})
//   const [updatingSection, setUpdatingSection] = useState(null)

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   )

//   useEffect(() => {
//     if (user?.sectionOrder) {
//       const orderedSections = user.sectionOrder
//         .map(id => defaultSections.find(section => section.id === id))
//         .filter(Boolean)

//       const existingIds = new Set(user.sectionOrder)
//       const newSections = defaultSections.filter(section => !existingIds.has(section.id))

//       setSections([...orderedSections, ...newSections])
//     }

//     if (user?.visibleSections) {
//       let visibilityMap = {}
//       if (user.visibleSections instanceof Map) {
//         visibilityMap = Object.fromEntries(user.visibleSections)
//       } else if (typeof user.visibleSections === 'object') {
//         visibilityMap = user.visibleSections
//       }
//       setVisibleSections(visibilityMap)
//     } else {
//       const defaultVisibility = defaultSections.reduce((acc, section) => {
//         acc[section.id] = true
//         return acc
//       }, {})
//       setVisibleSections(defaultVisibility)
//     }
//   }, [user])

//   const handleDragEnd = async (event) => {
//     const { active, over } = event

//     if (active.id !== over?.id) {
//       const oldIndex = sections.findIndex(section => section.id === active.id)
//       const newIndex = sections.findIndex(section => section.id === over?.id)
//       const newSections = arrayMove(sections, oldIndex, newIndex)
//       setSections(newSections)

//       const newOrder = newSections.map(section => section.id)

//       try {
//         await dispatch(updateProfile({ sectionOrder: newOrder }))
//         toast.success('Section order updated!')
//       } catch (error) {
//         toast.error('Failed to update section order')
//         setSections(sections)
//       }
//     }
//   }

//   const handleToggleVisibility = async (sectionId, visible) => {
//     if (updatingSection === sectionId) return
//     setUpdatingSection(sectionId)

//     const newVisibleSections = { ...visibleSections, [sectionId]: visible }
//     setVisibleSections(newVisibleSections)

//     try {
//       await dispatch(updateProfile({ visibleSections: newVisibleSections }))
//       toast.success(`${sections.find(s => s.id === sectionId)?.label} ${visible ? 'enabled' : 'disabled'}`)
//     } catch (error) {
//       setVisibleSections(prev => ({ ...prev, [sectionId]: !visible }))
//       toast.error('Failed to update section visibility')
//     } finally {
//       setUpdatingSection(null)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Portfolio Sections</h2>
//         <p className="text-gray-600 dark:text-gray-400">Drag to reorder sections and toggle visibility for your portfolio</p>
//       </div>

//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
//           <div className="space-y-3">
//             {sections.map(section => (
//               <SortableItem
//                 key={section.id}
//                 section={section}
//                 isVisible={visibleSections[section.id] ?? true}
//                 onToggleVisibility={handleToggleVisibility}
//                 isUpdating={updatingSection === section.id}
//               />
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>
//     </div>
//   )
// }

// export default SectionManager


import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { updateSectionOrder, toggleSectionVisibility } from '../../store/slices/portfolioSlice'
import toast from 'react-hot-toast'

// ✅ Default sections list
const defaultSections = [
  { id: 'hero', label: 'Hero Section', icon: '🏠', description: 'tagLines and profile image' },
  { id: 'about', label: 'About Section', icon: 'ℹ️', description: 'Introduction and what do you' },
  { id: 'skills', label: 'Skills', icon: '⚡', description: 'Technical skills and expertise' },
  { id: 'projects', label: 'Projects', icon: '💼', description: 'Portfolio projects showcase' },
  { id: 'education', label: 'Education', icon: '🎓', description: 'Educational background' },
  { id: 'experience', label: 'Experience', icon: '💻', description: 'Work experience details' },
  { id: 'certifications', label: 'Certifications', icon: '🏆', description: 'Professional certifications' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬', description: 'Client and colleague reviews' },
  { id: 'contact', label: 'Contact', icon: '📧', description: 'Contact information and form' },
]

// ✅ Sortable item for drag & toggle
const SortableItem = ({ section, isVisible, onToggleVisibility }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`
        card p-4 select-none bg-white dark:bg-dark-800 rounded-lg border
        ${isDragging ? 'opacity-70 z-50 scale-105 shadow-xl' : 'hover:shadow-lg'}
        ${isVisible ? 'border-primary-200 dark:border-primary-800' : 'border-gray-200 dark:border-dark-600'}
        transition-all duration-200
      `}
    >
      <div className="flex items-center justify-between">
        {/* Section icon & details */}
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{section.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{section.label}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
          </div>
        </div>

        {/* Toggle + Drag handle */}
        <div className="flex items-center space-x-3">
          {/* ✅ Toggle visibility */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onToggleVisibility(section.id, !isVisible)
            }}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${isVisible ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'}
            `}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
              animate={{ x: isVisible ? 24 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>

          {/* ✅ Drag handle */}
          <div
            {...attributes}
            {...listeners}
            tabIndex={0}
            className="cursor-grab active:cursor-grabbing text-gray-400 dark:text-gray-500 p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-700"
            aria-label={`Drag handle for ${section.label}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ✅ Main Component
const SectionManager = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [sections, setSections] = useState(defaultSections)
  const [visibleSections, setVisibleSections] = useState({})

  // ✅ Sensors for drag & keyboard
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // ✅ Initialize sections & visibility from user data
  useEffect(() => {
    if (user?.sectionOrder) {
      const orderedSections = user.sectionOrder
        .map((id) => defaultSections.find((section) => section.id === id))
        .filter(Boolean)

      const existingIds = new Set(user.sectionOrder)
      const newSections = defaultSections.filter((section) => !existingIds.has(section.id))

      setSections([...orderedSections, ...newSections])
    }

    if (user?.visibleSections && typeof user.visibleSections === 'object') {
      setVisibleSections(user.visibleSections)
    } else {
      const defaultVisibility = defaultSections.reduce((acc, section) => {
        acc[section.id] = true
        return acc
      }, {})
      setVisibleSections(defaultVisibility)
    }
  }, [user])

  // ✅ Handle drag end (update order)
  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id)
      const newIndex = sections.findIndex((section) => section.id === over?.id)

      const newSections = arrayMove(sections, oldIndex, newIndex)
      setSections(newSections)

      const newOrder = newSections.map((section) => section.id)

      try {
        await dispatch(updateSectionOrder(newOrder)).unwrap()
        toast.success('Section order updated!')
      } catch (error) {
        toast.error('Failed to update section order')
        setSections(sections) // rollback
      }
    }
  }

  // ✅ Handle visibility toggle (optimistic UI)
  const handleToggleVisibility = async (sectionId, visible) => {
    const prevVisible = visibleSections[sectionId]
    setVisibleSections((prev) => ({ ...prev, [sectionId]: visible }))

    try {
      await dispatch(toggleSectionVisibility({ section: sectionId, visible })).unwrap()
      toast.success(
        `${sections.find((s) => s.id === sectionId)?.label} ${
          visible ? 'enabled' : 'disabled'
        }`
      )
    } catch (error) {
      setVisibleSections((prev) => ({ ...prev, [sectionId]: prevVisible }))
      toast.error('Failed to update section visibility')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Portfolio Sections
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Drag to reorder sections and toggle visibility for your portfolio
        </p>
      </div>

      {/* Drag & Drop Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {sections.map((section) => (
              <SortableItem
                key={section.id}
                section={section}
                isVisible={visibleSections[section.id] ?? true}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800"
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="text-2xl">💡</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Pro Tips
          </h3>
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Drag sections to reorder them on your portfolio</li>
          <li>• Toggle visibility to show/hide sections</li>
          <li>• Hero section is always visible and appears first</li>
          <li>• Changes are saved automatically</li>
        </ul>
      </motion.div>
    </div>
  )
}

export default SectionManager

