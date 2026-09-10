import { useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Form fields per the global form spec (design.md §6.7):
 * transparent background, 1px stone bottom-border only, Fraunces 20px
 * placeholder label that lifts to a mono 11px eyebrow on focus/fill,
 * bronze focus border, 44px min touch height, mono inline errors (#D9480F).
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses = (error?: string) =>
  cn(
    'min-h-[44px] w-full border-b bg-transparent pb-2 pt-7 font-sans text-base text-ink outline-none transition-colors duration-300 ease-out-expo',
    error ? 'border-[#D9480F]' : 'border-stone focus:border-bronze',
  );

function FieldLabel({
  id,
  label,
  lifted,
}: {
  id: string;
  label: string;
  lifted: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'pointer-events-none absolute left-0 transition-all duration-300 ease-out-expo',
        lifted
          ? 'top-0 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bronze'
          : 'top-7 font-display text-xl font-normal text-mist',
      )}
    >
      {label}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p
      id={`${id}-error`}
      role="alert"
      className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#D9480F]"
    >
      {error}
    </p>
  );
}

/* ------------------------------------------------------------------ */

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'url';
  className?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  error,
  required,
  autoComplete,
  inputMode,
  className,
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className={cn('js-field relative', className)}>
      <FieldLabel id={id} label={label} lifted={lifted} />
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses(error)}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  rows = 5,
  className,
}: TextAreaFieldProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className={cn('js-field relative', className)}>
      <FieldLabel id={id} label={label} lifted={lifted} />
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClasses(error), 'resize-y')}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
  required?: boolean;
  className?: string;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required,
  className,
}: SelectFieldProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className={cn('js-field relative', className)}>
      <FieldLabel id={id} label={label} lifted={lifted} />
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClasses(error), 'cursor-pointer appearance-none pr-10')}
      >
        <option value="" hidden />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className={cn(
          'pointer-events-none absolute bottom-4 right-0 h-4 w-4 transition-colors duration-300',
          focused ? 'text-bronze' : 'text-mist',
        )}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface ConsentFieldProps {
  id: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  /** optional prefix override; defaults to the GDPR consent line */
  children?: ReactNode;
  className?: string;
}

export function ConsentField({
  id,
  checked,
  onChange,
  error,
  children,
  className,
}: ConsentFieldProps) {
  return (
    <div className={cn('js-field', className)}>
      <div className="flex items-start gap-4">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer sr-only"
        />
        <label
          htmlFor={id}
          aria-hidden="true"
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center border bg-transparent transition-colors duration-300 ease-out-expo',
            '[&_svg]:opacity-0 [&_svg]:transition-opacity [&_svg]:duration-200 peer-checked:[&_svg]:opacity-100',
            error
              ? 'border-[#D9480F] peer-checked:border-bronze peer-checked:bg-bronze'
              : 'border-stone peer-checked:border-bronze peer-checked:bg-bronze',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze',
          )}
        >
          <Check className="h-3.5 w-3.5 text-bone" strokeWidth={2} />
        </label>
        <label htmlFor={id} className="cursor-pointer text-sm leading-[1.7] text-umber">
          {children ?? (
            <>
              I consent to the processing of my personal data in line with the{' '}
              <Link
                to="/privacy-policy"
                className="text-bronze underline decoration-bronze/40 underline-offset-4 transition-colors duration-300 hover:text-bronze-deep"
              >
                Privacy Policy
              </Link>
              .
            </>
          )}
        </label>
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}
