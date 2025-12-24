'use client';

interface AuthCardProps {
  logo?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AuthCard({ logo, title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-[450px] bg-[var(--bg-card)] backdrop-blur-[20px] rounded-[var(--border-radius)] p-8 shadow-[var(--shadow-glass)] border border-[var(--border-color)] relative z-[1]">
      <div className="text-center mb-8">
        {logo && (
          <div className="text-sm text-[var(--text-orange)] font-medium mb-4">
            {logo}
          </div>
        )}
        <h1 className="text-[32px] font-bold mb-2 text-[var(--text-dark)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base text-[var(--text-secondary)] leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

