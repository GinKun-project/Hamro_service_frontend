'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthCard from '@/components/AuthCard';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SocialLogin from '@/components/SocialLogin';
import api from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastError, setToastError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name && formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (toastError) {
      setToastError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setToastError('');

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        ...(formData.name.trim() && { name: formData.name.trim() }),
      };

      await api.post('/auth/signup', payload);
      router.push('/login');
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Signup failed. Please try again.';
      setToastError(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 8 &&
    !Object.keys(errors).length;

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 relative z-[1]">
      {toastError && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-[var(--border-radius-sm)] shadow-[var(--shadow-lg)] z-[1000] animate-[slideDown_0.3s_ease] max-w-[90%] text-center bg-red-500 text-white"
          role="alert"
        >
          {toastError}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1200px] w-full">
        <AuthCard logo="Hamro Service" title="Sign Up" subtitle="">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <Input
              type="text"
              name="name"
              label="Name (Optional)"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter your name"
            />

            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="username@gmail.com"
              required
            />

            <div className="relative w-full">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="text-sm font-medium text-[var(--text-dark)] mb-1">
                  Password<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className={`w-full px-4 py-3 pr-12 text-base bg-[var(--bg-input)] border ${
                      errors.password ? 'border-red-500' : 'border-black/10'
                    } rounded-[var(--border-radius-sm)] text-[var(--text-dark)] transition-[var(--transition)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_3px_var(--primary-focus)] hover:border-black/20`}
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[var(--text-secondary)] p-1 flex items-center justify-center transition-[var(--transition)] z-[1] hover:text-[var(--primary-color)]"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showPassword ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-[13px] mt-1" role="alert">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="relative w-full">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-[var(--text-dark)] mb-1">
                  Confirm Password<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    className={`w-full px-4 py-3 pr-12 text-base bg-[var(--bg-input)] border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-black/10'
                    } rounded-[var(--border-radius-sm)] text-[var(--text-dark)] transition-[var(--transition)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_3px_var(--primary-focus)] hover:border-black/20`}
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[var(--text-secondary)] p-1 flex items-center justify-center transition-[var(--transition)] z-[1] hover:text-[var(--primary-color)]"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showConfirmPassword ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-[13px] mt-1" role="alert">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <Button type="submit" loading={loading} disabled={!isFormValid}>
              Sign up
            </Button>

            <SocialLogin />

            <p className="text-center text-[var(--text-secondary)] text-sm mt-3">
              Already have an account?{' '}
              <Link href="/login" className="text-[var(--text-orange)] no-underline font-medium transition-[var(--transition)] hover:text-[var(--text-orange-dark)] hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </AuthCard>
        <div className="hidden md:flex items-center justify-center relative h-full min-h-[500px]">
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="w-[300px] h-[400px] bg-gradient-to-br from-[rgba(255,200,150,0.3)] to-[rgba(255,180,120,0.2)] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] relative blur-[2px] opacity-60">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-20 h-20 bg-[rgba(255,200,150,0.4)] rounded-full blur-[10px]"></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

