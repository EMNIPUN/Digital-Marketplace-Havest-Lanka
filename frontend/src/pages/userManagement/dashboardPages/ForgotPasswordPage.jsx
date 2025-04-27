import React from 'react'
import { useState } from 'react'
import { ArrowLeft, CheckCircle, XCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: Reset Password
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [message, setMessage] = useState('')

    const handleEmailSubmit = async (submittedEmail) => {
        try {
            const response = await axios.post('http://localhost:8005/user/otp/send', {
                mail: submittedEmail
            })
            setEmail(submittedEmail)
            setStep(2)
            setMessage(`OTP sent to ${submittedEmail}`)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP')
        }
    }

    const handleOtpSubmit = async (submittedOtp) => {
        try {
            const otpString = submittedOtp.join('')
            const response = await axios.post('http://localhost:8005/user/otp/validate', {
                mail: email,
                otp: otpString
            })
            setOtp(submittedOtp)
            setStep(3)
            setMessage('')
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP')
        }
    }

    const handlePasswordReset = async (newPassword) => {
        try {
            const response = await axios.post('http://localhost:8005/user/reset-password', {
                email: email,
                password: newPassword
            })
            toast.success(response.data.message)
            // Redirect logic would go here
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password')
        }
    }

    const goBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const steps = [
        { id: 1, name: 'Email' },
        { id: 2, name: 'Verification' },
        { id: 3, name: 'New Password' }
    ]

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 h-[500px] overflow-y-auto">
                {/* Header with logo placeholder */}
                <div className="flex justify-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                        <Lock className="h-6 w-6 text-green-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">Reset Your Password</h1>
                <p className="text-center text-gray-500 mb-6">Follow the steps to recover your account</p>

                {/* Fixed Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                        {/* Progress Lines */}
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                        <div
                            className="absolute top-4 left-0 h-0.5 bg-green-600 -z-10 transition-all duration-300"
                            style={{
                                width: step === 1 ? '0%' : step === 2 ? '50%' : '100%'
                            }}
                        ></div>

                        {/* Step Circles */}
                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center z-10">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium 
                  ${step >= s.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                                    style={{ backgroundColor: step >= s.id ? '#00b074' : undefined }}>
                                    {s.id}
                                </div>
                                <div className="text-xs mt-1 text-gray-500">{s.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {message && (
                    <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg text-center flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        {message}
                    </div>
                )}

                {step > 1 && (
                    <button
                        onClick={goBack}
                        className="flex items-center text-gray-500 hover:text-green-600 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back
                    </button>
                )}

                {step === 1 && <GetEmail onSubmit={handleEmailSubmit} />}
                {step === 2 && <GetOTP onSubmit={handleOtpSubmit} email={email} />}
                {step === 3 && <ResetPassword onSubmit={handlePasswordReset} email={email} />}
            </div>
        </div>
    )
}

function GetEmail({ onSubmit }) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Simple email validation
        if (!email) {
            setError('Email is required')
            return
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address')
            return
        }

        setLoading(true)
        try {
            await onSubmit(email)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-3 py-3 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Enter your email"
                    />
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {error}
                    </p>
                )}
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                style={{ backgroundColor: loading ? undefined : '#00b074' }}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : (
                    "Continue"
                )}
            </button>
        </form>
    )
}

function GetOTP({ onSubmit, email }) {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(30)
    const [canResend, setCanResend] = useState(false)

    const inputRefs = Array(6).fill(0).map(() => React.createRef())

    // Timer for OTP resend
    useState(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        setCanResend(true)
                        clearInterval(interval)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const handleChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return

        const newOtpValues = [...otpValues]
        newOtpValues[index] = value

        setOtpValues(newOtpValues)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs[index + 1].current.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            if (!otpValues[index] && index > 0) {
                const newOtpValues = [...otpValues]
                newOtpValues[index - 1] = ''
                setOtpValues(newOtpValues)
                inputRefs[index - 1].current.focus()
            }
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text')
        if (!/^\d+$/.test(pastedData)) return

        const digits = pastedData.slice(0, 6).split('')
        const newOtpValues = [...otpValues]

        digits.forEach((digit, index) => {
            if (index < 6) {
                newOtpValues[index] = digit
            }
        })

        setOtpValues(newOtpValues)

        // Focus on the next empty input or the last one
        const nextEmptyIndex = newOtpValues.findIndex(val => val === '')
        if (nextEmptyIndex !== -1) {
            inputRefs[nextEmptyIndex].current.focus()
        } else {
            inputRefs[5].current.focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (otpValues.some(val => val === '')) {
            setError('Please enter the complete 6-digit OTP')
            return
        }

        setLoading(true)
        try {
            await onSubmit(otpValues)
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (!canResend) return
        try {
            const response = await axios.post('http://localhost:8005/user/otp/send', {
                mail: email
            })
            setTimer(30)
            setCanResend(false)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend OTP')
        }
    }

    const maskedEmail = email.replace(/(.{3})(.*)(?=@)/, '$1***')

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h2 className="text-lg font-medium text-gray-700 mb-2">
                    Verification Code
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    We've sent a 6-digit code to {maskedEmail}
                </p>

                <div className="flex justify-between gap-2 mb-3">
                    {otpValues.map((value, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    ))}
                </div>

                {error && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {error}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                style={{ backgroundColor: loading ? undefined : '#00b074' }}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                    </span>
                ) : (
                    "Verify & Continue"
                )}
            </button>

            <div className="text-center">
                <p className="text-sm text-gray-500">
                    Didn't receive the code?{' '}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={!canResend}
                        className={`font-medium ${canResend ? 'text-green-600 hover:text-green-800' : 'text-gray-400'}`}
                        style={{ color: canResend ? '#00b074' : undefined }}
                    >
                        {canResend ? 'Resend code' : `Resend in ${timer}s`}
                    </button>
                </p>
            </div>
        </form>
    )
}

function ResetPassword({ onSubmit, email }) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validatePassword = (value) => {
        const newErrors = {}

        if (value.length < 8) {
            newErrors.length = 'Password must be at least 8 characters'
        }

        if (!/[A-Z]/.test(value)) {
            newErrors.uppercase = 'Password must contain at least one uppercase letter'
        }

        if (!/[a-z]/.test(value)) {
            newErrors.lowercase = 'Password must contain at least one lowercase letter'
        }

        if (!/\d/.test(value)) {
            newErrors.number = 'Password must contain at least one number'
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            newErrors.special = 'Password must contain at least one special character'
        }

        return newErrors
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        setErrors(validatePassword(value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Final validation
        const validationErrors = validatePassword(password)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        if (password !== confirmPassword) {
            setErrors({ ...validationErrors, match: 'Passwords do not match' })
            return
        }

        setLoading(true)
        try {
            await onSubmit(password)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Create new password"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                </div>
                {errors.match && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.match}
                    </p>
                )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        {errors.length ? (
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        ) : (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <span className={`text-sm ${errors.length ? 'text-red-600' : 'text-green-600'}`}>
                            At least 8 characters
                        </span>
                    </div>
                    <div className="flex items-center">
                        {errors.uppercase ? (
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        ) : (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <span className={`text-sm ${errors.uppercase ? 'text-red-600' : 'text-green-600'}`}>
                            One uppercase letter
                        </span>
                    </div>
                    <div className="flex items-center">
                        {errors.lowercase ? (
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        ) : (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <span className={`text-sm ${errors.lowercase ? 'text-red-600' : 'text-green-600'}`}>
                            One lowercase letter
                        </span>
                    </div>
                    <div className="flex items-center">
                        {errors.number ? (
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        ) : (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <span className={`text-sm ${errors.number ? 'text-red-600' : 'text-green-600'}`}>
                            One number
                        </span>
                    </div>
                    <div className="flex items-center">
                        {errors.special ? (
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        ) : (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <span className={`text-sm ${errors.special ? 'text-red-600' : 'text-green-600'}`}>
                            One special character
                        </span>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                style={{ backgroundColor: loading ? undefined : '#00b074' }}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Resetting...
                    </span>
                ) : (
                    "Reset Password"
                )}
            </button>
        </form>
    )
}