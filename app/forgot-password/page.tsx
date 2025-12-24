'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthCard from '@/components/AuthCard';
import Input from '@/components/Input';
import Button from '@/components/Button';
import api from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Failed to send reset email. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-6 relative z-[1]">
        <AuthCard logo="Hamro Service" title="Check Your Email" subtitle="">
          <div className="text-center flex flex-col gap-4">
            <p className="text-[var(--text-dark)] text-base leading-relaxed">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Please check your email and click the link to reset your password.
            </p>
            <Link href="/login" className="mt-4 text-[var(--text-orange)] no-underline font-medium transition-[var(--transition)] hover:text-[var(--text-orange-dark)] hover:underline">
              Back to Login
            </Link>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 relative z-[1]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1200px] w-full">
        <AuthCard logo="Hamro Service" title="Forgot Password" subtitle="">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <p className="text-[var(--text-secondary)] text-sm mb-3 leading-relaxed">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <Input
              type="email"
              name="email"
              label="Email"
              value={email}
              onChange={handleChange}
              error={error}
              placeholder="username@gmail.com"
              required
            />

            <Button type="submit" loading={loading} disabled={!email.trim()}>
              Send Reset Link
            </Button>

            <p className="text-center text-[var(--text-secondary)] text-sm mt-3">
              Remember your password?{' '}
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
    </div>
  );
}

