import React, { useState } from 'react';
import { UserRole } from '../types';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  pageTitle: string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ pageTitle, userRole, setUserRole, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-brand-surface dark:bg-dark-surface p-4 border-b border-brand-border dark:border-dark-border flex items-center justify-between">
      <h1 className="text-2xl font-bold text-brand-text-primary dark:text-dark-text-primary">{pageTitle}</h1>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 rounded-lg text-brand-text-primary dark:text-dark-text-primary placeholder:text-brand-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-primary"
          />
        </div>

        <button className="relative text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-dark-primary">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img 
              src={`https://picsum.photos/seed/${userRole}/40/40`}
              alt="User Avatar"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-sm text-brand-text-primary dark:text-dark-text-primary">John Doe</p>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 dark:text-dark-text-secondary">{userRole}</span>
                <ChevronDownIcon className={`h-3 w-3 text-brand-text-secondary dark:text-dark-text-secondary ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>
              </div>
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-brand-surface dark:bg-dark-surface rounded-md shadow-lg py-1 z-50 border border-brand-border dark:border-dark-border">
                <div className="px-4 py-2">
                    <label className="text-xs text-gray-500 dark:text-dark-text-secondary">Switch Role</label>
                    <select 
                        value={userRole} 
                        onChange={(e) => {
                            setUserRole(e.target.value as UserRole);
                            setIsDropdownOpen(false);
                        }}
                        className="w-full text-sm bg-transparent focus:outline-none dark:text-dark-text-primary"
                    >
                        <option value={UserRole.USER}>User</option>
                        <option value={UserRole.PARTNER}>Partner</option>
                        <option value={UserRole.ADMINISTRATOR}>Administrator</option>
                    </select>
                </div>
                 <div className="border-t border-brand-border dark:border-dark-border"></div>
                 <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-brand-text-primary dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                 >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500 dark:text-dark-text-secondary" />
                    Logout
                 </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};