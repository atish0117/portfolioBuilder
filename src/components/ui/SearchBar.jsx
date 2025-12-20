import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useDebounce from '../../hooks/useDebounce'

const SearchBar = ({
  placeholder = "Search portfolios, projects, users...",
  onSearch,
  onResultSelect,
  className = ""
}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const searchRef = useRef(null)
  const inputRef = useRef(null)

  const debouncedQuery = useDebounce(query, 300)

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return []

    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 200))

    const mockResults = [
      {
        id: '1',
        title: 'John Doe Portfolio',
        description: 'Full Stack Developer specializing in React and Node.js',
        type: 'portfolio',
        url: '/johndoe',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '2',
        title: 'E-commerce Platform',
        description: 'Modern e-commerce solution built with React and Stripe',
        type: 'project',
        url: '/johndoe#projects',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '3',
        title: 'Jane Smith',
        description: 'UI/UX Designer with 5+ years experience',
        type: 'user',
        url: '/janesmith',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ].filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setLoading(false)
    return mockResults
  }

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery).then(setResults)
      onSearch?.(debouncedQuery)
    } else {
      setResults([])
    }
  }, [debouncedQuery, onSearch])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultSelect(results[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleResultSelect = (result) => {
    onResultSelect?.(result)
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    window.location.href = result.url
  }

  const getResultIcon = (type) => {
    switch (type) {
      case 'portfolio':
        return '👤'
      case 'project':
        return '💼'
      case 'user':
        return '👥'
      default:
        return '🔍'
    }
  }

  const getResultTypeLabel = (type) => {
    switch (type) {
      case 'portfolio':
        return 'Portfolio'
      case 'project':
        return 'Project'
      case 'user':
        return 'User'
      default:
        return 'Result'
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setSelectedIndex(-1)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          placeholder={placeholder}
        />

        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <motion.div
              className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (query || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    onClick={() => handleResultSelect(result)}
                    className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors ${
                      selectedIndex === index ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 dark:bg-dark-600 rounded-full flex items-center justify-center text-lg">
                          {getResultIcon(result.type)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {result.title}
                        </p>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          {getResultTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {result.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 ml-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : query && !loading ? (
              <div className="px-4 py-8 text-center">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-gray-500 dark:text-gray-400">
                  No results found for "{query}"
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Try different keywords or check spelling
                </p>
              </div>
            ) : null}

            {query && results.length > 0 && (
              <div className="border-t border-gray-200 dark:border-dark-600 px-4 py-3 bg-gray-50 dark:bg-dark-700">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-600 rounded">↑</kbd>
                      <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-600 rounded">↓</kbd>
                      <span>navigate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-600 rounded">↵</kbd>
                      <span>select</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-600 rounded">esc</kbd>
                      <span>close</span>
                    </div>
                  </div>
                  <div>
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar
