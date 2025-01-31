"use client"
import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, User, Building2, Briefcase, ChevronDown, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Types for form inputs and validation
type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
  userType: string;
  subType: string;
}

type ValidationErrors = {
  name?: string;
  email?: string;
  password?: string;
  userType?: string;
  subType?: string;
}

type FocusedField = 'name' | 'email' | 'password' | 'userType' | 'subType' | null;

const USER_TYPES = [
  { value: 'SERVICE_PROVIDER', label: 'Service Provider' },
  { value: 'CONSUMER', label: 'Consumer' },
  { value: 'COVETEN_EMPLOYEE', label: 'Coveten Employee' },
  { value: 'LAB_ASSISTANT', label: 'Lab Assistant' }
];

const SignupPage = () => {
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
              Start Your Innovation Journey
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Join India's biggest industrial community and unlock endless possibilities.
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

      {/* Right Section - Signup Form */}
      <SignupForm />
    </main>
  )
}

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<SignupFormInputs>({
    name: '',
    email: '',
    password: '',
    userType: '',
    subType: ''
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [focusedField, setFocusedField] = useState<FocusedField>(null)

  const getSubTypes = (userType: string) => {
    if (userType === 'SERVICE_PROVIDER') {
      return [
        { value: 'FREELANCER', label: 'Freelancer' },
        { value: 'TESTING_AGENT', label: 'Testing Agent' },
        { value: 'ACADEMICS', label: 'Academics / Institute' },
        { value: 'TESTING_LAB', label: 'Testing Lab' }
      ]
    }
    if (userType === 'CONSUMER') {
      return [
        { value: 'MANUFACTURER', label: 'Manufacturer' },
        { value: 'ACADEMICS', label: 'Academics / Institute' },
        { value: 'FOREIGN_CLIENT', label: 'Foreign Client' },
        { value: 'IMPORTER', label: 'Importer' }
      ]
    }
    return []
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

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
      } else if (!/[!@#$%^&*()]/.test(formData.password)) {
        newErrors.password = 'Include at least one special character'
      }
    }

    // User Type validation
    if (!formData.userType) {
      newErrors.userType = 'Please select a user type'
    }

    // Sub Type validation (only if user type requires it)
    if ((formData.userType === 'SERVICE_PROVIDER' || formData.userType === 'CONSUMER') && !formData.subType) {
      newErrors.subType = 'Please select a sub type'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <h3 className="text-3xl font-bold text-gray-900">Create Account</h3>
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Sign in
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
            {/* Name Input */}
            <div className="relative">
              <motion.div
                animate={{
                  y: focusedField === 'name' || formData.name ? -24 : 0,
                  scale: focusedField === 'name' || formData.name ? 0.8 : 1,
                  color: focusedField === 'name' ? '#2563eb' : '#6b7280'
                }}
                className="absolute left-10 top-3.5 pointer-events-none origin-left"
              >
                Full Name
              </motion.div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${focusedField === 'name' ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 
                  ${errors.name ? 'border-red-500' : focusedField === 'name' ? 'border-primary' : 'border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* User Type Select */}
            <div className="relative">
              <motion.div
                animate={{
                  y: focusedField === 'userType' || formData.userType ? -24 : 0,
                  scale: focusedField === 'userType' || formData.userType ? 0.8 : 1,
                  color: focusedField === 'userType' ? '#2563eb' : '#6b7280'
                }}
                className="absolute left-10 top-3.5 pointer-events-none origin-left"
              >
                User Type
              </motion.div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className={`h-5 w-5 ${focusedField === 'userType' ? 'text-primary' : 'text-gray-400'}`} />
              </div>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                onFocus={() => setFocusedField('userType')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-gray-50 appearance-none
                  ${errors.userType ? 'border-red-500' : focusedField === 'userType' ? 'border-primary' : 'border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
              >
                <option value="">Select User Type</option>
                {USER_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="text-gray-400 h-5 w-5" />
              </div>
              <AnimatePresence>
                {errors.userType && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.userType}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Sub Type Select (Conditional) */}
            {(formData.userType === 'SERVICE_PROVIDER' || formData.userType === 'CONSUMER') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    y: focusedField === 'subType' || formData.subType ? -24 : 0,
                    scale: focusedField === 'subType' || formData.subType ? 0.8 : 1,
                    color: focusedField === 'subType' ? '#2563eb' : '#6b7280'
                  }}
                  className="absolute left-10 top-3.5 pointer-events-none origin-left"
                >
                  Sub Type
                </motion.div>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className={`h-5 w-5 ${focusedField === 'subType' ? 'text-primary' : 'text-gray-400'}`} />
                </div>
                <select
                  name="subType"
                  value={formData.subType}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subType')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-gray-50 appearance-none
                    ${errors.subType ? 'border-red-500' : focusedField === 'subType' ? 'border-primary' : 'border-gray-300'}
                    focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                >
                  <option value="">Select Sub Type</option>
                  {getSubTypes(formData.userType).map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className="text-gray-400 h-5 w-5" />
                </div>
                <AnimatePresence>
                  {errors.subType && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.subType}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the{' '}
              <a href="/terms" className="text-primary hover:text-primary/80">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
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
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

export default SignupPage;