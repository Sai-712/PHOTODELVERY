import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
}

export function Input({ 
  label, 
  icon, 
  className, 
  ...props 
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-primary">{icon}</span>
        {label}
      </label>
      <input
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-lg",
          "focus:ring-2 focus:ring-primary focus:border-primary",
          "placeholder:text-gray-400",
          className
        )}
        {...props}
      />
    </div>
  );
}