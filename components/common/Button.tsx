
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  // FIX: Changed onClick prop type to support event handlers that need the event object, like for stopPropagation.
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  // FIX: Added optional title prop to support tooltips on buttons.
  title?: string;
  // FIX: Added form prop to support associating button with a form outside its DOM hierarchy.
  form?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  title,
  form,
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-brand-primary text-white hover:bg-blue-800 focus:ring-brand-primary dark:bg-dark-primary dark:hover:bg-blue-500 dark:focus:ring-blue-400',
    secondary: 'bg-gray-200 text-brand-text-primary hover:bg-gray-300 focus:ring-gray-400 dark:bg-dark-surface dark:text-dark-text-primary dark:hover:bg-gray-700 dark:focus:ring-gray-500 border border-gray-300 dark:border-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      title={title}
      form={form}
    >
      {children}
    </button>
  );
};
