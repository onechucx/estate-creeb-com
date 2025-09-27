import React from 'react';
import { UserRole, AppView, UserSubscriptions } from '../types';
import {
    HomeIcon, ChartPieIcon, UsersIcon, CurrencyDollarIcon, UserCircleIcon, Cog6ToothIcon,
    InboxIcon, BuildingStorefrontIcon, BuildingLibraryIcon, ShieldCheckIcon, PlusCircleIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  userRole: UserRole;
  userSubscriptions: UserSubscriptions;
}

const navItems = [
    { view: AppView.DASHBOARD, label: 'Dashboard', icon: HomeIcon, roles: [UserRole.USER, UserRole.PARTNER, UserRole.ADMINISTRATOR] },
    { view: AppView.ESTATE, label: 'My Estates', icon: BuildingLibraryIcon, roles: [UserRole.USER, UserRole.PARTNER, UserRole.ADMINISTRATOR] },
    { view: AppView.COMMUNITY, label: 'Community', icon: UsersIcon, roles: [UserRole.USER, UserRole.PARTNER, UserRole.ADMINISTRATOR] },
    { view: AppView.PROFILE, label: 'Profile', icon: UserCircleIcon, roles: [UserRole.USER, UserRole.PARTNER, UserRole.ADMINISTRATOR] },
    { view: AppView.WALLETS, label: 'Wallets', icon: CurrencyDollarIcon, roles: [UserRole.USER, UserRole.PARTNER] },
    { view: AppView.INBOX, label: 'Inbox', icon: EnvelopeIcon, roles: [UserRole.USER, UserRole.PARTNER, UserRole.ADMINISTRATOR] },
    { view: AppView.MARKETPLACE, label: 'Marketplace', icon: BuildingStorefrontIcon, roles: [UserRole.USER, UserRole.PARTNER] },
    { view: AppView.SETTINGS, label: 'Settings', icon: Cog6ToothIcon, roles: [UserRole.USER, UserRole.PARTNER, UserRole.ADMINISTRATOR] },
    { view: AppView.SUPPORT, label: 'Support', icon: InboxIcon, roles: [UserRole.USER, UserRole.PARTNER, UserRole.ADMINISTRATOR] },
];

const actionNavItems = [
    { view: AppView.CREATE_HUB, label: 'Create New...', icon: PlusCircleIcon, roles: [UserRole.USER, UserRole.PARTNER, UserRole.ADMINISTRATOR] },
];

const adminNavItems = [
    // This view is now integrated into the Community component for Partners
    // { view: AppView.ADMIN_PANEL, label: 'Partner Panel', icon: ShieldCheckIcon, roles: [UserRole.PARTNER] },
    { view: AppView.ADMIN_PANEL, label: 'Administrator', icon: ChartPieIcon, roles: [UserRole.ADMINISTRATOR] },
];

const NavItem: React.FC<{
    item: { view: AppView; label: string; icon: React.ElementType; };
    isActive: boolean;
    onClick: () => void;
    isAction?: boolean;
    disabled?: boolean;
}> = ({ item, isActive, onClick, isAction = false, disabled = false }) => {
    const Icon = item.icon;
    const baseClasses = 'flex items-center p-3 my-1 rounded-lg transition-colors duration-200';
    const activeClasses = 'bg-brand-primary dark:bg-dark-primary text-white shadow-lg';
    const inactiveClasses = 'text-gray-500 dark:text-dark-text-secondary hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-brand-primary dark:hover:text-dark-text-primary';
    const actionClasses = 'text-brand-primary dark:text-dark-primary bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 font-bold border-2 border-dashed border-blue-200 dark:border-gray-600';
    const disabledClasses = 'opacity-50 cursor-not-allowed';

    return (
        <li
            onClick={!disabled ? onClick : undefined}
            className={`${baseClasses} ${isAction ? actionClasses : (isActive ? activeClasses : inactiveClasses)} ${disabled ? disabledClasses : 'cursor-pointer'}`}
            title={disabled ? "An active subscription is required for this feature." : ""}
        >
            <Icon className="h-6 w-6 mr-4" />
            <span className="font-medium">{item.label}</span>
        </li>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, userRole, userSubscriptions }) => {
  const visibleNavItems = navItems.filter(item => item.roles.includes(userRole));
  const visibleActionNavItems = actionNavItems.filter(item => item.roles.includes(userRole));
  const visibleAdminNavItems = adminNavItems.filter(item => item.roles.includes(userRole));
  
  return (
    <aside className="w-64 bg-brand-surface dark:bg-dark-surface flex-shrink-0 p-4 border-r border-brand-border dark:border-dark-border flex flex-col">
      <div className="flex items-center mb-10 p-2">
        <svg className="h-10 w-10 text-brand-primary dark:text-dark-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
        <h1 className="text-2xl font-bold text-brand-primary dark:text-dark-text-primary ml-2">Creeb</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {visibleNavItems.map((item) => (
            <NavItem
              key={item.view}
              item={item}
              isActive={activeView === item.view}
              onClick={() => setActiveView(item.view)}
            />
          ))}
        </ul>

        {visibleActionNavItems.length > 0 && (
             <>
             <hr className="my-6 border-brand-border dark:border-dark-border"/>
             <ul className="space-y-1">
                 {visibleActionNavItems.map((item) => {
                    const isDisabled = item.view === AppView.CREATE_HUB && userRole !== UserRole.ADMINISTRATOR && !(userSubscriptions.community || userSubscriptions.estate);
                    return (
                     <NavItem
                         key={item.view}
                         item={item}
                         isActive={activeView === item.view}
                         onClick={() => setActiveView(item.view)}
                         isAction={true}
                         disabled={isDisabled}
                     />
                    )
                 })}
             </ul>
             </>
        )}
        
        {visibleAdminNavItems.length > 0 && (
          <>
            <hr className="my-6 border-brand-border dark:border-dark-border"/>
            <h2 className="px-3 mb-2 text-xs font-semibold tracking-wider text-brand-text-secondary dark:text-dark-text-secondary uppercase">Admin Tools</h2>
            <ul className="space-y-1">
              {visibleAdminNavItems.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isActive={activeView === item.view}
                  onClick={() => setActiveView(item.view)}
                />
              ))}
            </ul>
          </>
        )}
      </nav>
      
    </aside>
  );
};