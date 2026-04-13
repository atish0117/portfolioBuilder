import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { uploadAPI } from '../../services/api'

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

  // 🔥 Generic upload
  const uploadToServer = async (file) => {
    const uploadType = type === 'resume' ? 'resume' : 'image'
    const res = await uploadAPI.uploadFile(file, uploadType)
    return res.data.url
  }

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      if (multiple) {
        const uploadPromises = Array.from(files).map(async (file) => {
          if (!validateFile(file)) return null
          return await uploadToServer(file)
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

        const url = await uploadToServer(file)

        onUpload(url)
        toast.success(`${type === 'resume' ? 'Resume' : 'Image'} uploaded successfully!`)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error(error?.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const validateFile = (file) => {
    const isImage = (type === 'image' || type === 'project') && file.type.startsWith('image/')
    const isPDF = type === 'resume' && file.type === 'application/pdf'

    if (!isImage && !isPDF) {
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
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
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
                type === 'image'
                  ? 'profile image'
                  : type === 'resume'
                  ? 'resume'
                  : 'project images'
              }
            </p>

            <p className="text-xs text-gray-500">
              Drag & drop or click • Max 5MB
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {type === 'resume' ? 'PDF only' : 'JPG, PNG, WebP'}
            </p>
          </div>
        )}
      </motion.div>

      {currentFile && (
        <div className="mt-3 p-3 bg-green-50 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600">
              {type === 'resume' ? 'Resume uploaded' : 'Image uploaded'}
            </span>
            <a href={currentFile} target="_blank" rel="noopener noreferrer" className="text-sm underline">
              View
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload