import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { uploadFile } from '../../services/appwrite'
import toast from 'react-hot-toast'

const FileUpload = ({ 
  type, 
  onUpload, 
  currentFile, 
  className = '',
  multiple = false 
}) => {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      if (multiple) {
        const uploadPromises = Array.from(files).map(async (file) => {
          if (!validateFile(file)) return null

          const result = await uploadFile(file, type)
          console.log('File uploaded:', result)
          return result.fileUrl
        })

        const uploadedUrls = await Promise.all(uploadPromises)
        const validUrls = uploadedUrls.filter(Boolean)

        if (validUrls.length > 0) {
          validUrls.forEach((url) => onUpload(url))
          toast.success(`${validUrls.length} file(s) uploaded successfully!`)
        }
      } else {
        const file = files[0]
        if (!validateFile(file)) return

        const result = await uploadFile(file, type)
        console.log('File uploaded:', result)

        onUpload(result.fileUrl)
        toast.success(`${type === 'image' ? 'Image' : 'Resume'} uploaded successfully!`)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const validateFile = (file) => {
    const isImage = type === 'image' && file.type.startsWith('image/')
    const isProject = type === 'project' && file.type.startsWith('image/')
    const isPDF = type === 'resume' && file.type === 'application/pdf'

    if (!isImage && !isPDF && !isProject) {
      toast.error(`Please select a valid ${type === 'resume' ? 'PDF' : 'image'} file`)
      return false
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return false
    }

    return true
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files) handleFileSelect(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={type === 'resume' ? '.pdf' : 'image/*'}
        multiple={multiple}
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        className="hidden"
      />

      <motion.div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${dragOver 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-dark-600 hover:border-primary-400'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: uploading ? 1 : 1.02 }}
        whileTap={{ scale: uploading ? 1 : 0.98 }}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <motion.div
              className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full mb-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {currentFile ? 'Replace' : 'Upload'} {
                type === 'image' ? 'profile image' : 
                type === 'resume' ? 'resume' : 
                'project images'
              }
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Drag & drop or click to select • Max 5MB {multiple ? '• Multiple files' : ''}
            </p>
            {type === 'image' || type === 'project' ? (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Supported: JPG, PNG, WebP, GIF
              </p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Supported: PDF only
              </p>
            )}
          </div>
        )}
      </motion.div>

      {currentFile && (
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                {type === 'image' ? 'Profile image' : type === 'resume' ? 'Resume' : 'Project image'} uploaded
              </span>
            </div>
            {currentFile && (
              <a
                href={currentFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                View
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload
