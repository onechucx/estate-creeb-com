import React, { useState } from 'react';
import { Marketplace } from './Marketplace';
import { LoginModal } from './LoginModal';
import { Button } from './common/Button';
import { ToastMessage, Listing } from '../types';

interface PublicHomePageProps {
    onLoginSuccess: () => void;
    listings: Listing[];
}

const PublicHeader: React.FC<{ onLoginClick: () => void }> = ({ onLoginClick }) => (
    <header className="bg-brand-surface dark:bg-dark-surface p-4 border-b border-brand-border dark:border-dark-border">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
                <svg className="h-10 w-10 text-brand-primary dark:text-dark-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <h1 className="text-2xl font-bold text-brand-primary dark:text-dark-text-primary ml-2">Creeb</h1>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="secondary" onClick={onLoginClick}>Login</Button>
                <Button variant="primary">Sign Up</Button>
            </div>
        </div>
    </header>
);

export const PublicHomePage: React.FC<PublicHomePageProps> = ({ onLoginSuccess, listings }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    
    const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
      console.log(`Toast: [${type}] ${message}`);
    };

    return (
        <div className="min-h-screen bg-brand-background dark:bg-dark-background text-brand-text-primary dark:text-dark-text-primary">
            <PublicHeader onLoginClick={() => setIsLoginModalOpen(true)} />
            <main className="p-6 lg:p-8">
                <Marketplace 
                    showToast={showToast} 
                    isAuthenticated={false} 
                    listings={listings} 
                    onLoginRequest={() => setIsLoginModalOpen(true)}
                    // FIX: Added missing 'isCommunitySubscribed' prop, required by MarketplaceProps.
                    isCommunitySubscribed={false}
                />
            </main>
            {isLoginModalOpen && (
                <LoginModal 
                    onLogin={() => {
                        setIsLoginModalOpen(false);
                        onLoginSuccess();
                    }} 
                    onClose={() => setIsLoginModalOpen(false)} 
                />
            )}
        </div>
    );
};