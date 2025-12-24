'use client';

interface InputProps {
  type?: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  id?: string;
}

export default function Input({
  type = 'text',
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  name,
  id,
}: InputProps) {
  const inputId = id || name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--text-dark)] mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 text-base bg-[var(--bg-input)] border border-black/10 rounded-[var(--border-radius-sm)] text-[var(--text-dark)] transition-[var(--transition)] ${
          error ? 'border-red-500' : ''
        } focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_3px_var(--primary-focus)] hover:border-black/20`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <span id={`${inputId}-error`} className="text-red-500 text-[13px] mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

