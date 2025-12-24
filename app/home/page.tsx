'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import api from '@/lib/api';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-[500px] bg-[var(--bg-card)] backdrop-blur-[10px] rounded-[var(--border-radius)] p-8 shadow-[var(--shadow-lg)] border border-[var(--border-color)] text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[500px] bg-[var(--bg-card)] backdrop-blur-[10px] rounded-[var(--border-radius)] p-8 shadow-[var(--shadow-lg)] border border-[var(--border-color)] text-center">
        <h1 className="text-[32px] font-semibold mb-8 text-[var(--text-dark)] tracking-tight">
          Welcome to Hamro Service
        </h1>
        {user && (
          <div className="mb-8 text-left bg-[var(--bg-hover)] p-6 rounded-[var(--border-radius-sm)] border border-[var(--border-color)]">
            <p className="text-base text-[var(--text-dark)] mb-3">Email: {user.email}</p>
            {user.name && <p className="text-base text-[var(--text-dark)]">Name: {user.name}</p>}
          </div>
        )}
        <Button onClick={handleLogout} variant="primary">
          Logout
        </Button>
      </div>
    </div>
  );
}

