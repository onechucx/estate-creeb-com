import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div {...props} className={`bg-brand-surface dark:bg-dark-surface rounded-xl shadow-sm p-6 dark:border dark:border-dark-border ${className}`}>
      {children}
    </div>
  );
};
