import React, { useState } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Listing, AppView, ListingCategory } from '../types';
import { ArrowLeftIcon, AtSymbolIcon, PhoneIcon, StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { ListingDetailModal } from './ListingDetailModal';

const ListingCard: React.FC<{ listing: Listing; onClick: () => void; }> = ({ listing, onClick }) => (
    <Card className="group relative cursor-pointer" onClick={onClick}>
        {listing.isPaid && <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center"><StarIcon className="h-4 w-4 mr-1"/>Paid</div>}
        <img src={listing.images[0]} alt={listing.title} className="w-full h-48 object-cover rounded-lg mb-4"/>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{listing.category}</p>
        <h3 className="text-lg font-bold truncate text-brand-text-primary dark:text-dark-text-primary group-hover:text-brand-primary dark:group-hover:text-dark-primary">{listing.title}</h3>
        <p className="font-semibold text-brand-primary dark:text-dark-primary text-xl">₦{listing.price.toLocaleString()}</p>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary truncate">{listing.location}</p>
    </Card>
);

interface VendorProfileProps {
    vendorName: string;
    setActiveView: (view: AppView) => void;
    listings: Listing[];
    onStartMessage: (userId: string, userName: string) => void;
}

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l.227.361-1.057 3.864 3.96-1.042.327.216z"/>
    </svg>
);

export const VendorProfile: React.FC<VendorProfileProps> = ({ vendorName, setActiveView, listings: allListings, onStartMessage }) => {
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const vendorListings = allListings.filter(l => l.vendorName === vendorName && l.status === 'Active');

    const mockVendorData: { [key: string]: { id: string; email: string; phone: string; whatsapp: string } } = {
        'Prime Properties': { id: 'vendor1', email: 'contact@primeprops.com', phone: '+234 801 111 2222', whatsapp: '2348011112222' },
        'John Doe': { id: 'vendor2', email: 'john.doe@creeb.vip', phone: '+234 802 222 3333', whatsapp: '2348022223333' },
        'Dev Solutions': { id: 'vendor3', email: 'support@devsolutions.io', phone: '+234 803 333 4444', whatsapp: '2348033334444' },
        'Partner': { id: 'vendor4', email: 'partner@creeb.vip', phone: '+234 804 444 5555', whatsapp: '2348044445555' },
        'Jane Smith': { id: 'vendor5', email: 'jane.s@creeb.vip', phone: '+234 805 555 6666', whatsapp: '2348055556666' }
    };

    const vendorInfo = mockVendorData[vendorName] || {
        id: vendorListings[0]?.vendorId || 'unknown',
        email: `${vendorName.toLowerCase().replace(/\s/g, '.')}@creeb.vip`,
        phone: '+234 80' + Math.floor(10000000 + Math.random() * 90000000),
        whatsapp: '23480' + Math.floor(10000000 + Math.random() * 90000000)
    };


    return (
        <>
        {selectedListing && (
            <ListingDetailModal
                listing={selectedListing}
                onClose={() => setSelectedListing(null)}
                isAuthenticated={true}
                onStartMessage={onStartMessage}
            />
        )}
        <div className="space-y-6">
            <Button variant="secondary" onClick={() => setActiveView(AppView.MARKETPLACE)}>
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Marketplace
            </Button>

            <Card>
                <div className="flex flex-col md:flex-row items-start">
                    <img
                        src={`https://picsum.photos/seed/${vendorName}/96/96`}
                        alt={`${vendorName} avatar`}
                        className="h-24 w-24 rounded-full mr-6 mb-4 md:mb-0"
                    />
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold dark:text-dark-text-primary">{vendorName}</h2>
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                            <span className="flex items-center mb-2 md:mb-0"><AtSymbolIcon className="h-4 w-4 mr-1" /> {vendorInfo.email}</span>
                            <span className="flex items-center"><PhoneIcon className="h-4 w-4 mr-1" /> {vendorInfo.phone}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                             <Button onClick={() => onStartMessage(vendorInfo.id, vendorName)} className="w-full sm:w-auto justify-center">
                                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" /> Contact via Inbox
                            </Button>
                            <a 
                                href={`https://wa.me/${vendorInfo.whatsapp}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full sm:w-auto"
                            >
                                <Button className="w-full justify-center" variant="secondary">
                                <WhatsAppIcon /> Contact via WhatsApp
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </Card>

            <div>
                <h3 className="text-2xl font-bold mb-4 dark:text-dark-text-primary">Listings from {vendorName} ({vendorListings.length})</h3>
                {vendorListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vendorListings.map(listing => (
                            <ListingCard key={listing.id} listing={listing} onClick={() => setSelectedListing(listing)} />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <p className="text-gray-500">This vendor has no other listings.</p>
                    </Card>
                )}
            </div>
        </div>
        </>
    );
};