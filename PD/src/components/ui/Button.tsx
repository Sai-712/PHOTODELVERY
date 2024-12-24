import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg transition-colors text-white',
        variant === 'primary' && 'bg-primary hover:bg-primary-dark',
        variant === 'secondary' && 'bg-secondary hover:bg-secondary-dark',
        variant === 'danger' && 'bg-secondary hover:bg-secondary-dark',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}