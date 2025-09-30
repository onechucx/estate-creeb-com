

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Wallets } from './components/Wallets';
import { Community } from './components/Community';
import { AdminPanel } from './components/AdminPanel';
import { EstateManagement } from './components/EstateManagement';
import { Profile } from './components/Profile';
import { UserRole, AppView, ToastMessage, AppSettings, AdPricing, CreationRequest, RequestStatus, KYCSubmission, Listing, Vendor, UserSubscriptions, ManagedUser, SubscriptionPricing } from './types';
import { Marketplace } from './components/Marketplace';
import { Settings } from './components/Settings';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { PublicHomePage } from './components/PublicHomePage';
import { MyListings } from './components/MyListings';
import { Support } from './components/Support';
import { CreateHub } from './components/CreateHub';
import { VendorProfile } from './components/VendorProfile';
import { Inbox } from './components/Inbox';
import { initialRequests as initialRequestsData, initialKycSubmissions, initialVendors, initialListings, initialManagedUsers } from './data';

const Toast: React.FC<{ message: ToastMessage, onDismiss: () => void }> = ({ message, onDismiss }) => {
    const iconMap = {
        success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
        error: <XCircleIcon className="h-6 w-6 text-red-500" />,
        info: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
    };

    useEffect(() => {
        const timer = setTimeout(onDismiss, 5000);
        return () => clearTimeout(timer);
    }, [onDismiss]);


    return (
        <div className="fixed top-5 right-5 bg-brand-surface dark:bg-dark-surface shadow-lg rounded-lg p-4 flex items-center z-[100] animate-fade-in-down border border-brand-border dark:border-dark-border">
            {iconMap[message.type]}
            <p className="ml-3 font-medium text-brand-text-primary dark:text-brand-text-primary">{message.message}</p>
            <button onClick={onDismiss} className="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">&times;</button>
        </div>
    );
};

const defaultSettings: AppSettings = {
    theme: 'light',
    fontSize: 'base'
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('creeb_user_session'));
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.USER);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscriptions>({ community: true, estate: false });
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
      try {
          const storedSettings = localStorage.getItem('creeb_app_settings');
          return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
      } catch (error) {
          return defaultSettings;
      }
  });
  const [adPricing, setAdPricing] = useState<AdPricing>({ perDay: 500, perWeek: 3000, perMonth: 10000 });
  const [subscriptionPricing, setSubscriptionPricing] = useState<SubscriptionPricing>({ community: 50000, estate: 25000 });
  const [userLastFreeAdDate, setUserLastFreeAdDate] = useState<string | null>('2023-01-01T00:00:00Z');
  const [requests, setRequests] = useState<CreationRequest[]>(initialRequestsData);
  const [kycSubmissions, setKycSubmissions] = useState<KYCSubmission[]>(initialKycSubmissions);
  const [viewedVendorName, setViewedVendorName] = useState<string | null>(null);
  const [messageRecipient, setMessageRecipient] = useState<{ id: string; name: string } | null>(null);
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(initialManagedUsers);


  useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark', 'coconut', 'forest', 'sunset', 'rose', 'royal', 'mint');
      root.classList.add(appSettings.theme);
      
      if (appSettings.fontColor) {
        root.style.setProperty('--brand-text-primary', appSettings.fontColor);
      } else {
        root.style.removeProperty('--brand-text-primary');
      }

      localStorage.setItem('creeb_app_settings', JSON.stringify(appSettings));
  }, [appSettings]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('creeb_user_session', 'true');
    } else {
      localStorage.removeItem('creeb_user_session');
    }
  }, [isAuthenticated]);


  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'success') => {
      setToast({ message, type });
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveView(AppView.DASHBOARD);
    showToast('Login successful!', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    showToast('You have been logged out.', 'info');
  };
  
  const handleViewVendor = (vendorName: string) => {
      setViewedVendorName(vendorName);
      setActiveView(AppView.VENDOR_PROFILE);
  };

  const handleStartMessage = (userId: string, userName: string) => {
    setMessageRecipient({ id: userId, name: userName });
    setActiveView(AppView.INBOX);
  };

  const renderContent = () => {
    // This mock ID corresponds to "John Doe"
    const MOCK_CURRENT_VENDOR_ID = 'vendor2';

    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard setActiveView={setActiveView} showToast={showToast} />;
      case AppView.WALLETS:
        return <Wallets showToast={showToast} />;
      case AppView.COMMUNITY:
        return <Community showToast={showToast} userRole={userRole} isSubscribed={userSubscriptions.community} onStartMessage={handleStartMessage} />;
      case AppView.ADMIN_PANEL:
        return <AdminPanel userRole={userRole} showToast={showToast} adPricing={adPricing} setAdPricing={setAdPricing} requests={requests} setRequests={setRequests} kycSubmissions={kycSubmissions} setKycSubmissions={setKycSubmissions} listings={listings} setListings={setListings} vendors={vendors} setVendors={setVendors} managedUsers={managedUsers} setManagedUsers={setManagedUsers} subscriptionPricing={subscriptionPricing} setSubscriptionPricing={setSubscriptionPricing} />;
      case AppView.ESTATE:
        return <EstateManagement userRole={userRole} showToast={showToast} onStartMessage={handleStartMessage} isEstateSubscribed={userSubscriptions.estate} />;
      case AppView.PROFILE:
        return <Profile userRole={userRole} userSubscriptions={userSubscriptions} setUserSubscriptions={setUserSubscriptions} showToast={showToast} />;
      case AppView.MARKETPLACE:
        return <Marketplace showToast={showToast} isAuthenticated={true} setActiveView={setActiveView} onViewVendor={handleViewVendor} isCommunitySubscribed={userSubscriptions.community} listings={listings} onStartMessage={handleStartMessage} />;
      case AppView.MY_LISTINGS:
        return <MyListings showToast={showToast} adPricing={adPricing} userLastFreeAdDate={userLastFreeAdDate} setUserLastFreeAdDate={setUserLastFreeAdDate} isCommunitySubscribed={userSubscriptions.community} allListings={listings} setAllListings={setListings} currentVendorId={MOCK_CURRENT_VENDOR_ID} />;
      case AppView.SETTINGS:
        return <Settings settings={appSettings} setSettings={setAppSettings} />;
      case AppView.SUPPORT:
        return <Support userRole={userRole} />;
      case AppView.INBOX:
        return <Inbox recipient={messageRecipient} setRecipient={setMessageRecipient} />;
      case AppView.CREATE_HUB:
        return <CreateHub showToast={showToast} setRequests={setRequests} isSubscribed={userSubscriptions.community || userSubscriptions.estate} />;
      case AppView.VENDOR_PROFILE:
        return viewedVendorName ? <VendorProfile vendorName={viewedVendorName} setActiveView={setActiveView} listings={listings} onStartMessage={handleStartMessage} /> : <Marketplace showToast={showToast} isAuthenticated={true} setActiveView={setActiveView} onViewVendor={handleViewVendor} isCommunitySubscribed={userSubscriptions.community} listings={listings} onStartMessage={handleStartMessage} />;
      default:
        return <Dashboard setActiveView={setActiveView} showToast={showToast} />;
    }
  };
  
  const pageTitle = useMemo(() => {
    if (activeView === AppView.ESTATE) return "My Estates";
    if (activeView === AppView.MY_LISTINGS) return "Manage My Listings";
    if (activeView === AppView.CREATE_HUB) return "Create New Community or Estate";
    if (activeView === AppView.SUPPORT) return "Support";
    if (activeView === AppView.INBOX) return "Inbox";
    if (activeView === AppView.VENDOR_PROFILE) return `${viewedVendorName || 'Vendor'}'s Profile`;
    const viewName = activeView.replace(/_/g, ' ');
    return viewName.charAt(0).toUpperCase() + viewName.slice(1).toLowerCase();
  }, [activeView, viewedVendorName]);
  
  const fontSizeClass = useMemo(() => {
      switch(appSettings.fontSize) {
          case 'sm': return 'text-sm';
          case 'lg': return 'text-lg';
          default: return 'text-base';
      }
  }, [appSettings.fontSize]);

  if (!isAuthenticated) {
    return (
        <div className={`${appSettings.theme} ${fontSizeClass}`}>
            {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
            <PublicHomePage onLoginSuccess={handleLogin} listings={listings} />
        </div>
    );
  }

  return (
    <div className={`flex h-screen bg-brand-background text-brand-text-primary ${fontSizeClass}`}>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
      <Sidebar activeView={activeView} setActiveView={setActiveView} userRole={userRole} userSubscriptions={userSubscriptions} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          pageTitle={pageTitle} 
          userRole={userRole} 
          setUserRole={setUserRole}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-background p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;