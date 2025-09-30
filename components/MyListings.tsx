import React, { useState, useMemo } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Listing, ToastMessage, AdPricing } from '../types';
import { EyeIcon, ChartBarIcon, CurrencyDollarIcon, PencilIcon, PauseIcon, TrashIcon, StarIcon, PlusIcon, PlayIcon, XMarkIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { CreateListingModal } from './CreateListingModal';

const MetricCard: React.FC<{ title: string; value: string; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <Card className="flex items-center p-4">
        <div className="p-3 bg-blue-100 dark:bg-gray-700 rounded-full mr-4">
            <Icon className="h-6 w-6 text-brand-primary dark:text-dark-primary" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{title}</p>
            <p className="text-2xl font-bold text-brand-text-primary dark:text-dark-text-primary">{value}</p>
        </div>
    </Card>
);

const Modal: React.FC<{ title: string, children: React.ReactNode, onClose: () => void }> = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold dark:text-dark-text-primary">{title}</h2>
                <button onClick={onClose}><XMarkIcon className="h-6 w-6"/></button>
            </div>
            {children}
        </Card>
    </div>
);

const BoostListingModal: React.FC<{
    listing: Listing;
    adPricing: AdPricing;
    onClose: () => void;
    onBoost: (listingId: string, duration: 'day' | 'week' | 'month') => void;
}> = ({ listing, adPricing, onClose, onBoost }) => {
    return (
        <Modal title={`Boost Listing: ${listing.title}`} onClose={onClose}>
            <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Boost your listing to get it seen by more people. Paid listings appear at the top of search results.</p>
                <button onClick={() => onBoost(listing.id, 'day')} className="w-full p-4 border rounded-lg text-left hover:border-brand-primary dark:hover:border-dark-primary transition-colors">
                    <p className="font-bold">1 Day Boost - ₦{adPricing.perDay.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Quick visibility for urgent sales.</p>
                </button>
                 <button onClick={() => onBoost(listing.id, 'week')} className="w-full p-4 border rounded-lg text-left hover:border-brand-primary dark:hover:border-dark-primary transition-colors">
                    <p className="font-bold">1 Week Boost - ₦{adPricing.perWeek.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Great for getting consistent views.</p>
                </button>
                 <button onClick={() => onBoost(listing.id, 'month')} className="w-full p-4 border rounded-lg text-left hover:border-brand-primary dark:hover:border-dark-primary transition-colors">
                    <p className="font-bold">1 Month Boost - ₦{adPricing.perMonth.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Maximum exposure for high-value items.</p>
                </button>
            </div>
        </Modal>
    );
};


interface MyListingsProps {
    showToast: (message: string, type?: ToastMessage['type']) => void;
    adPricing: AdPricing;
    userLastFreeAdDate: string | null;
    setUserLastFreeAdDate: (date: string) => void;
    isCommunitySubscribed: boolean;
    allListings: Listing[];
    setAllListings: (listings: Listing[]) => void;
    currentVendorId: string;
}

export const MyListings: React.FC<MyListingsProps> = ({ showToast, adPricing, userLastFreeAdDate, setUserLastFreeAdDate, isCommunitySubscribed: isSubscribed, allListings, setAllListings, currentVendorId }) => {
    const [boostingListing, setBoostingListing] = useState<Listing | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const listings = useMemo(() => allListings.filter(l => l.vendorId === currentVendorId), [allListings, currentVendorId]);

    const totalViews = useMemo(() => listings.reduce((sum, l) => sum + (l.views || 0), 0), [listings]);
    const totalClicks = useMemo(() => listings.reduce((sum, l) => sum + (l.clicks || 0), 0), [listings]);

    const handleCreateListing = (listingData: Omit<Listing, 'id' | 'vendorName' | 'vendorId' | 'dateListed' | 'status'>) => {
        const newListing: Listing = {
            ...listingData,
            id: `L-${Date.now()}`,
            vendorName: 'John Doe', // This should be dynamic based on current user
            vendorId: currentVendorId,
            dateListed: new Date().toISOString(),
            status: 'Pending',
            views: 0,
            clicks: 0,
        };
        setAllListings([...allListings, newListing]);
        if (!listingData.isPaid) {
            setUserLastFreeAdDate(new Date().toISOString());
        }
        setIsCreateModalOpen(false);
        showToast('New listing submitted for review!');
    };
    
    const handleToggleStatus = (id: string, currentStatus: Listing['status']) => {
        const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
        setAllListings(allListings.map(l => l.id === id ? { ...l, status: newStatus } : l));
        showToast(`Listing status changed to ${newStatus}.`);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            setAllListings(allListings.filter(l => l.id !== id));
            showToast('Listing deleted.', 'error');
        }
    };

    const handleBoost = (listingId: string, duration: 'day' | 'week' | 'month') => {
        showToast(`Listing ${listingId} boosted for 1 ${duration}!`, 'success');
        setBoostingListing(null);
    };

    if (!isSubscribed) {
        return (
            <Card className="text-center py-16">
                <ShieldExclamationIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4"/>
                <h3 className="text-xl font-bold dark:text-dark-text-primary">Subscription Required</h3>
                <p className="text-gray-500 dark:text-dark-text-secondary mt-2">You need an active subscription to create and manage marketplace listings.</p>
                <Button className="mt-6">View Subscription Options</Button>
            </Card>
        );
    }

    const getStatusChip = (status: Listing['status']) => {
        const styles = {
            Active: 'bg-green-100 text-green-800',
            Paused: 'bg-yellow-100 text-yellow-800',
            Pending: 'bg-blue-100 text-blue-800',
            Rejected: 'bg-red-100 text-red-800',
            Expired: 'bg-gray-100 text-gray-800'
        };
        return <span className={`px-2 py-1 text-xs rounded-full ${styles[status]}`}>{status}</span>;
    };

    return (
        <>
        {boostingListing && <BoostListingModal listing={boostingListing} adPricing={adPricing} onClose={() => setBoostingListing(null)} onBoost={handleBoost} />}
        {isCreateModalOpen && <CreateListingModal onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateListing} adPricing={adPricing} userLastFreeAdDate={userLastFreeAdDate} />}
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h2 className="text-3xl font-bold dark:text-dark-text-primary">My Listings</h2>
                    <p className="text-brand-text-secondary dark:text-dark-text-secondary mt-1">Manage your ads, view performance, and create new listings.</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="flex-shrink-0"><PlusIcon className="h-5 w-5 mr-2"/>Create New Listing</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Total Views" value={totalViews.toLocaleString()} icon={EyeIcon} />
                <MetricCard title="Total Clicks" value={totalClicks.toLocaleString()} icon={ChartBarIcon} />
                <MetricCard title="Active Listings" value={listings.filter(l => l.status === 'Active').length.toString()} icon={CurrencyDollarIcon} />
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-dark-surface/50">
                            <tr>
                                <th className="p-2 text-left font-semibold dark:text-dark-text-secondary">Listing</th>
                                <th className="p-2 text-center font-semibold dark:text-dark-text-secondary">Status</th>
                                <th className="p-2 text-right font-semibold dark:text-dark-text-secondary">Performance</th>
                                <th className="p-2 text-center font-semibold dark:text-dark-text-secondary">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-dark-border">
                           {listings.map(listing => (
                               <tr key={listing.id}>
                                   <td className="p-2"><div className="flex items-center"><img src={listing.images[0]} alt={listing.title} className="w-16 h-12 object-cover rounded mr-4"/><div className="font-semibold dark:text-dark-text-primary">{listing.title}</div></div></td>
                                   <td className="p-2 text-center">{getStatusChip(listing.status)}</td>
                                   <td className="p-2 text-right"><div>{listing.views || 0} views</div><div className="text-xs text-gray-500">{listing.clicks || 0} clicks</div></td>
                                   <td className="p-2"><div className="flex justify-center space-x-1">
                                        <Button onClick={() => setBoostingListing(listing)} variant="secondary" className="!p-2" title="Boost"><StarIcon className="h-4 w-4"/></Button>
                                        <Button onClick={() => handleToggleStatus(listing.id, listing.status)} variant="secondary" className="!p-2" title={listing.status === 'Active' ? 'Pause' : 'Activate'} disabled={listing.status !== 'Active' && listing.status !== 'Paused'}>{listing.status === 'Active' ? <PauseIcon className="h-4 w-4"/> : <PlayIcon className="h-4 w-4"/>}</Button>
                                        <Button variant="secondary" className="!p-2" title="Edit"><PencilIcon className="h-4 w-4"/></Button>
                                        <Button onClick={() => handleDelete(listing.id)} variant="danger" className="!p-2" title="Delete"><TrashIcon className="h-4 w-4"/></Button>
                                   </div></td>
                               </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
        </>
    );
};