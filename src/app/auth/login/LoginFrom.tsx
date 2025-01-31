'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Types for form inputs and validation
type LoginFormInputs = {
  email: string;
  password: string;
}

type ValidationErrors = {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  return (
    <main className="w-full flex min-h-screen">
      {/* Left Section - Hero/Banner */}
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gradient-to-b from-white to-blue-50 lg:flex">
        <div className="relative z-10 w-full max-w-md p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Welcome to the World of Innovation
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Login to Learn, Empower, and Invent with our cutting-edge platform.
            </p>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${70 + i}.jpg`}
                    className="w-12 h-12 rounded-full border-4 border-white"
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 0.2 * i }}
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-800">Join 5000+ users</p>
                <p className="text-gray-500">Growing community</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 my-auto h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-cyan-100/30 backdrop-blur-[100px] rounded-full transform rotate-12 scale-150" />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <LoginForm />
    </main>
  )
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<LoginFormInputs>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null)

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Include at least one uppercase letter'
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Include at least one lowercase letter'
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Include at least one number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted:', formData)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md space-y-8 px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h3 className="text-3xl font-bold text-gray-900">Welcome back</h3>
          <p className="text-gray-600">
            New to our platform?{' '}
            <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Create an account
            </Link>
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-4">
            <div className="relative">
              <motion.div
                animate={{
                  y: focusedField === 'email' || formData.email ? -24 : 0,
                  scale: focusedField === 'email' || formData.email ? 0.8 : 1,
                  color: focusedField === 'email' ? '#2563eb' : '#6b7280'
                }}
                className="absolute left-10 top-3.5 pointer-events-none origin-left"
              >
                Email address
              </motion.div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${focusedField === 'email' ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 
                  ${errors.email ? 'border-red-500' : focusedField === 'email' ? 'border-primary' : 'border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <motion.div
                animate={{
                  y: focusedField === 'password' || formData.password ? -24 : 0,
                  scale: focusedField === 'password' || formData.password ? 0.8 : 1,
                  color: focusedField === 'password' ? '#2563eb' : '#6b7280'
                }}
                className="absolute left-10 top-3.5 pointer-events-none origin-left"
              >
                Password
              </motion.div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${focusedField === 'password' ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-gray-50
                  ${errors.password ? 'border-red-500' : focusedField === 'password' ? 'border-primary' : 'border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400 h-5 w-5 hover:text-gray-600 transition-colors" />
                ) : (
                  <Eye className="text-gray-400 h-5 w-5 hover:text-gray-600 transition-colors" />
                )}
              </button>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className={`group relative w-full flex items-center justify-center py-3 px-4 
              border border-transparent text-sm font-medium rounded-xl text-white
              ${loading ? 'bg-primary/80' : 'bg-primary hover:bg-primary/90'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              transition-all duration-300`}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

export default LoginPage;