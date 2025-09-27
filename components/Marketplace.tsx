import React, { useState, useMemo } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Listing, ListingCategory, ToastMessage, AppView } from '../types';
import { MagnifyingGlassIcon, FunnelIcon, Squares2X2Icon, Bars3Icon, ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon, StarIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { ListingDetailModal } from './ListingDetailModal';

const ListingCard: React.FC<{ listing: Listing; onViewVendor?: (vendorName: string) => void; onClick: () => void; }> = ({ listing, onViewVendor, onClick }) => (
    <Card className="group relative cursor-pointer" onClick={onClick}>
        {listing.isPaid && <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center"><StarIcon className="h-4 w-4 mr-1"/>Paid</div>}
        <img src={listing.images[0]} alt={listing.title} className="w-full h-48 object-cover rounded-lg mb-4"/>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{listing.category}</p>
        <h3 className="text-lg font-bold truncate text-brand-text-primary dark:text-dark-text-primary group-hover:text-brand-primary dark:group-hover:text-dark-primary">{listing.title}</h3>
        <p className="font-semibold text-brand-primary dark:text-dark-primary text-xl">₦{listing.price.toLocaleString()}</p>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary truncate">{listing.location}</p>
        {onViewVendor && (
             <p className="text-xs text-gray-400 mt-1">by <button onClick={(e) => { e.stopPropagation(); onViewVendor(listing.vendorName); }} className="hover:underline font-semibold">{listing.vendorName}</button></p>
        )}
    </Card>
);

const ListingRow: React.FC<{ listing: Listing; onViewVendor?: (vendorName: string) => void; onClick: () => void; }> = ({ listing, onViewVendor, onClick }) => (
    <Card className="flex items-center space-x-4 mb-2 cursor-pointer" onClick={onClick}>
        <img src={listing.images[0]} alt={listing.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0"/>
        <div className="flex-1">
            <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{listing.category}</p>
                {listing.isPaid && <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 font-bold px-2 py-0.5 rounded-full">Paid</span>}
            </div>
            <h3 className="text-lg font-bold text-brand-text-primary dark:text-dark-text-primary">{listing.title}</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{listing.location}</p>
            {onViewVendor ? (
                 <p className="text-sm text-gray-500 dark:text-dark-text-secondary">by <button onClick={(e) => { e.stopPropagation(); onViewVendor(listing.vendorName); }} className="hover:underline font-semibold">{listing.vendorName}</button></p>
            ) : (
                 <p className="text-sm text-gray-500 dark:text-dark-text-secondary">by {listing.vendorName}</p>
            )}
        </div>
        <div className="text-right">
            <p className="font-semibold text-brand-primary dark:text-dark-primary text-xl">₦{listing.price.toLocaleString()}</p>
            <Button variant="secondary" className="mt-2 text-sm !py-1 !px-3">View Details</Button>
        </div>
    </Card>
);

interface MarketplaceProps {
    showToast: (message: string, type?: ToastMessage['type']) => void;
    isAuthenticated: boolean;
    setActiveView?: (view: AppView) => void;
    onViewVendor?: (vendorName: string) => void;
    isCommunitySubscribed: boolean;
    listings: Listing[];
    onStartMessage?: (userId: string, userName: string) => void;
    onLoginRequest?: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ showToast, isAuthenticated = true, setActiveView, onViewVendor, isCommunitySubscribed = false, listings: allListings, onStartMessage, onLoginRequest }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date-desc');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [activeCategory, setActiveCategory] = useState<ListingCategory | 'All'>('All');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    
    const categories: (ListingCategory | 'All')[] = ['All', 'Properties', 'Assets', 'Services'];

    const processedListings = useMemo(() => {
        let listings = allListings.filter(l => l.status === 'Active');

        // 1. Filter by category
        if (activeCategory !== 'All') {
            listings = listings.filter(l => l.category === activeCategory);
        }

        // 2. Filter by search term
        if (searchTerm.trim() !== '') {
            const lowercasedSearch = searchTerm.toLowerCase();
            listings = listings.filter(l =>
                l.title.toLowerCase().includes(lowercasedSearch) ||
                l.description.toLowerCase().includes(lowercasedSearch) ||
                l.location.toLowerCase().includes(lowercasedSearch)
            );
        }
        
        // 3. Filter by price range
        const minPrice = parseFloat(priceRange.min);
        const maxPrice = parseFloat(priceRange.max);
        if (!isNaN(minPrice)) {
            listings = listings.filter(l => l.price >= minPrice);
        }
        if (!isNaN(maxPrice)) {
            listings = listings.filter(l => l.price <= maxPrice);
        }

        // 4. Sort
        const sortedListings = listings.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'date-asc': return new Date(a.dateListed).getTime() - new Date(b.dateListed).getTime();
                case 'date-desc': return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
                case 'location-asc': return a.location.localeCompare(b.location);
                case 'location-desc': return b.location.localeCompare(a.location);
                case 'category-asc': return a.category.localeCompare(b.category);
                case 'category-desc': return b.category.localeCompare(a.category);
                default: return 0;
            }
        });
        
        // 5. Prioritize paid listings
        const paid = sortedListings.filter(l => l.isPaid);
        const unpaid = sortedListings.filter(l => !l.isPaid);

        return [...paid, ...unpaid];
    }, [allListings, activeCategory, searchTerm, sortBy, priceRange]);

    const totalPages = Math.ceil(processedListings.length / itemsPerPage);
    const currentListings = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return processedListings.slice(start, end);
    }, [processedListings, currentPage, itemsPerPage]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchTerm, sortBy, itemsPerPage, priceRange]);

    return (
        <>
        {selectedListing && (
            <ListingDetailModal
                listing={selectedListing}
                onClose={() => setSelectedListing(null)}
                isAuthenticated={isAuthenticated}
                onStartMessage={onStartMessage}
                onLoginRequest={onLoginRequest}
            />
        )}
        <div className="space-y-6">
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative lg:col-span-2">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Search listings by title, location..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                         <input 
                            type="number"
                            placeholder="Min Price"
                            value={priceRange.min}
                            onChange={e => setPriceRange({...priceRange, min: e.target.value})}
                            className="pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-center"
                        />
                        <span className="text-gray-400">-</span>
                        <input 
                            type="number"
                            placeholder="Max Price"
                            value={priceRange.max}
                            onChange={e => setPriceRange({...priceRange, max: e.target.value})}
                            className="pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-center"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="p-2 w-full border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        >
                            <option value="date-desc">Newest First</option>
                            <option value="date-asc">Oldest First</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="location-asc">Location (A-Z)</option>
                            <option value="location-desc">Location (Z-A)</option>
                            <option value="category-asc">Category (A-Z)</option>
                            <option value="category-desc">Category (Z-A)</option>
                        </select>
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`} aria-label="Grid View"><Squares2X2Icon className="h-5 w-5" /></button>
                            <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode === 'list' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`} aria-label="List View"><Bars3Icon className="h-5 w-5" /></button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 border-b border-brand-border dark:border-dark-border">
                    <nav className="-mb-px flex space-x-4 overflow-x-auto">
                        {categories.map(category => (
                            <button 
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeCategory === category ? 'border-brand-primary text-brand-primary dark:border-dark-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </nav>
                </div>
            </Card>

            {isAuthenticated && (
                <div className="flex justify-end">
                    <Button variant="secondary" onClick={() => setActiveView && setActiveView(AppView.MY_LISTINGS)} disabled={!isCommunitySubscribed} title={!isCommunitySubscribed ? 'Community subscription required to manage listings' : ''}>
                       <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
                        Manage My Listings
                    </Button>
                </div>
            )}

            {currentListings.length > 0 ? (
                viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentListings.map(listing => <ListingCard key={listing.id} listing={listing} onViewVendor={onViewVendor} onClick={() => setSelectedListing(listing)} />)}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {currentListings.map(listing => <ListingRow key={listing.id} listing={listing} onViewVendor={onViewVendor} onClick={() => setSelectedListing(listing)} />)}
                    </div>
                )
            ) : (
                <Card className="text-center py-16">
                    <InformationCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                    <h3 className="text-xl font-bold">No listings found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters.</p>
                </Card>
            )}
            
            <Card className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <span>Items per page:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="p-1 border border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-surface rounded-md"
                    >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={18}>18</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeftIcon className="h-5 w-5" /></Button>
                    <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                    <Button variant="secondary" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRightIcon className="h-5 w-5" /></Button>
                </div>
            </Card>

        </div>
        </>
    );
};