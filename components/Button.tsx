'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary';
}

export default function Button({
  children,
  onClick,
  disabled,
  loading,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-3.5 px-6 text-base font-semibold border-none rounded-[var(--border-radius-sm)] cursor-pointer transition-[var(--transition)] flex items-center justify-center gap-3 font-[var(--font-family)] ${
        variant === 'primary'
          ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-md)] hover:-translate-y-[1px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[var(--primary-color)] focus-visible:outline-offset-2'
          : ''
      } ${
        disabled || loading ? 'opacity-60 cursor-not-allowed' : ''
      } ${loading ? 'pointer-events-none' : ''}`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

