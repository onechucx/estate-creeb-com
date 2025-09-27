



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

const initialRequests: CreationRequest[] = [
    { id: 'REQ001', type: 'Community', name: 'Sunshine Cooperative', applicantName: 'Diana Prince', applicantEmail: 'diana@example.com', dateSubmitted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending', details: { regNumber: 'RC123456', country: 'Nigeria', state: 'Lagos', certificate: 'cert.pdf' } },
    { id: 'REQ002', type: 'Estate', name: 'Golden Gates Estate', applicantName: 'Bruce Wayne', applicantEmail: 'bruce@example.com', dateSubmitted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending', details: { address: '1007 Mountain Drive, Gotham', proof: 'proof_of_ownership.pdf' } },
    { id: 'REQ003', type: 'Community', name: 'Future Investments', applicantName: 'John Doe', applicantEmail: 'john.doe@example.com', dateSubmitted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), status: 'Approved', details: { regNumber: 'RC987654', country: 'Nigeria', state: 'Abuja', certificate: 'cert2.pdf' } },
];

const initialKycSubmissions: KYCSubmission[] = [
    { id: 'KYC001', userId: 'd_user1', userName: 'Charles Xavier', userAvatar: 'https://picsum.photos/seed/d-user1/48/48', idType: "Driver's License", idNumber: 'DL12345678', idDocumentUrl: 'doc.pdf', addressProofUrl: 'proof.pdf', dateSubmitted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending' },
    { id: 'KYC002', userId: 'em2', userName: 'Alice Williams', userAvatar: 'https://picsum.photos/seed/em2/48/48', idType: 'Passport', idNumber: 'A12345678', idDocumentUrl: 'doc.pdf', addressProofUrl: 'proof.pdf', dateSubmitted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending' }
];

const initialVendors: Vendor[] = [
  { id: 'vendor1', name: 'Prime Properties', status: 'Active', listingsCount: 1 },
  { id: 'vendor2', name: 'John Doe', status: 'Active', listingsCount: 2 },
  { id: 'vendor3', name: 'Dev Solutions', status: 'Active', listingsCount: 1 },
  { id: 'vendor4', name: 'Partner', status: 'Active', listingsCount: 1 },
  { id: 'vendor5', name: 'Jane Smith', status: 'Suspended', listingsCount: 1 },
];

const initialListings: Listing[] = [
    { id: 'L001', title: 'Luxury Villa in Lekki', category: 'Properties', price: 120000000, location: 'Lekki, Lagos', images: ['https://picsum.photos/seed/prop1/400/300', 'https://picsum.photos/seed/prop1-2/400/300', 'https://picsum.photos/seed/prop1-3/400/300'], description: 'Spacious 5-bedroom villa with a pool, modern kitchen, and a serene environment perfect for families. Comes with a 2-car garage and a beautiful garden. Recently renovated with top-quality materials.', vendorName: 'Prime Properties', vendorId: 'vendor1', isPaid: true, dateListed: '2023-11-01T10:00:00Z', status: 'Active', views: 12500, clicks: 830 },
    { id: 'L002', title: '2022 Toyota Camry', category: 'Assets', price: 15000000, location: 'Ikeja, Lagos', images: ['https://picsum.photos/seed/asset1/400/300'], description: 'Barely used 2022 Toyota Camry, automatic transmission, in perfect condition with only 5,000 miles. Clean title and full service history available.', vendorName: 'John Doe', vendorId: 'vendor2', isPaid: true, dateListed: '2023-10-28T14:30:00Z', boostEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), status: 'Active', views: 8200, clicks: 310 },
    { id: 'L003', title: 'Web Development Services', category: 'Services', price: 500000, location: 'Remote', images: ['https://picsum.photos/seed/serv1/400/300'], description: 'Professional web development for your business. We build responsive, fast, and SEO-friendly websites tailored to your needs.', vendorName: 'Dev Solutions', vendorId: 'vendor3', isPaid: false, dateListed: '2023-11-02T09:00:00Z', status: 'Pending', views: 500, clicks: 12 },
    { id: 'L004', title: 'Plot of Land in Epe', category: 'Properties', price: 5000000, location: 'Epe, Lagos', images: ['https://picsum.photos/seed/prop2/400/300'], description: 'A great investment for the future. Full plot of land in a rapidly developing area of Epe, with gazette title.', vendorName: 'Partner', vendorId: 'vendor4', isPaid: false, dateListed: '2023-10-15T12:00:00Z', status: 'Active', views: 25000, clicks: 1500 },
    { id: 'L005', title: 'Office Furniture Set', category: 'Assets', price: 750000, location: 'Victoria Island, Lagos', images: ['https://picsum.photos/seed/asset2/400/300'], description: 'Complete set for a small office, including 4 desks, chairs, and filing cabinets. All in excellent condition.', vendorName: 'Jane Smith', vendorId: 'vendor5', isPaid: true, dateListed: '2023-11-03T11:00:00Z', status: 'Pending', views: 100, clicks: 5 },
    { id: 'L006', title: 'Modern 2-Bedroom Apartment', category: 'Properties', price: 65000000, location: 'Yaba, Lagos', images: ['https://picsum.photos/seed/prop3/400/300'], description: 'Newly renovated 2-bedroom apartment in a secure complex. Perfect for young professionals or a small family.', vendorName: 'John Doe', vendorId: 'vendor2', isPaid: false, dateListed: '2023-10-20T18:00:00Z', status: 'Paused', views: 8200, clicks: 310 },
];

const pastDate = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

const initialManagedUsers: ManagedUser[] = [
  { id: 'user-1', name: 'John Doe', email: 'john.d@example.com', avatarUrl: 'https://picsum.photos/seed/user-1/48/48', subscriptions: { community: { subscribed: true, date: pastDate(30) }, estate: { subscribed: false } } },
  { id: 'user-2', name: 'Jane Smith', email: 'jane.s@example.com', avatarUrl: 'https://picsum.photos/seed/user-2/48/48', subscriptions: { community: { subscribed: true, date: pastDate(90) }, estate: { subscribed: true, date: pastDate(15) } } },
  { id: 'user-3', name: 'Peter Jones', email: 'peter.j@example.com', avatarUrl: 'https://picsum.photos/seed/user-3/48/48', subscriptions: { community: { subscribed: false }, estate: { subscribed: false } } },
  { id: 'user-4', name: 'Mary Williams', email: 'mary.w@example.com', avatarUrl: 'https://picsum.photos/seed/user-4/48/48', subscriptions: { community: { subscribed: false }, estate: { subscribed: true, date: pastDate(60) } } },
  { id: 'user-5', name: 'David Brown', email: 'david.b@example.com', avatarUrl: 'https://picsum.photos/seed/user-5/48/48', subscriptions: { community: { subscribed: true, date: pastDate(5) }, estate: { subscribed: false } } },
  { id: 'user-6', name: 'Susan Davis', email: 'susan.d@example.com', avatarUrl: 'https://picsum.photos/seed/user-6/48/48', subscriptions: { community: { subscribed: false }, estate: { subscribed: false } } },
  { id: 'd_user1', name: 'Charles Xavier', email: 'charles.x@example.com', avatarUrl: 'https://picsum.photos/seed/d-user1/48/48', subscriptions: { community: { subscribed: true, date: pastDate(120) }, estate: { subscribed: true, date: pastDate(120) } } },
  { id: 'em2', name: 'Alice Williams', email: 'alice.w@example.com', avatarUrl: 'https://picsum.photos/seed/em2/48/48', subscriptions: { community: { subscribed: false }, estate: { subscribed: true, date: pastDate(45) } } },
];


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
  const [requests, setRequests] = useState<CreationRequest[]>(initialRequests);
  const [kycSubmissions, setKycSubmissions] = useState<KYCSubmission[]>(initialKycSubmissions);
  const [viewedVendorName, setViewedVendorName] = useState<string | null>(null);
  const [messageRecipient, setMessageRecipient] = useState<{ id: string; name: string } | null>(null);
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(initialManagedUsers);


  useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark', 'ocean', 'forest', 'sunset', 'rose', 'royal', 'mint');
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
        return <Dashboard setActiveView={setActiveView} />;
      case AppView.WALLETS:
        return <Wallets showToast={showToast} />;
      case AppView.COMMUNITY:
        // FIX: Changed prop name from 'isCommunitySubscribed' to 'isSubscribed' to match CommunityProps interface.
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
        // FIX: Changed prop name from 'isSubscribed' to 'isCommunitySubscribed' to match the MyListingsProps interface.
        return <MyListings showToast={showToast} adPricing={adPricing} userLastFreeAdDate={userLastFreeAdDate} setUserLastFreeAdDate={setUserLastFreeAdDate} isCommunitySubscribed={userSubscriptions.community} allListings={listings} setAllListings={setListings} currentVendorId={MOCK_CURRENT_VENDOR_ID} />;
      case AppView.SETTINGS:
        return <Settings settings={appSettings} setSettings={setAppSettings} />;
      case AppView.SUPPORT:
        return <Support userRole={userRole} />;
      case AppView.INBOX:
        return <Inbox recipient={messageRecipient} setRecipient={setMessageRecipient} />;
      case AppView.CREATE_HUB:
        // FIX: Changed 'userSubscriptions' prop to 'isSubscribed' and passed a boolean value to match component's props interface.
        return <CreateHub showToast={showToast} setRequests={setRequests} isSubscribed={userSubscriptions.community || userSubscriptions.estate} />;
      case AppView.VENDOR_PROFILE:
        return viewedVendorName ? <VendorProfile vendorName={viewedVendorName} setActiveView={setActiveView} listings={listings} onStartMessage={handleStartMessage} /> : <Marketplace showToast={showToast} isAuthenticated={true} setActiveView={setActiveView} onViewVendor={handleViewVendor} isCommunitySubscribed={userSubscriptions.community} listings={listings} onStartMessage={handleStartMessage} />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
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