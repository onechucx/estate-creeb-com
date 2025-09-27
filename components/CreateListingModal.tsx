import React, { useState, useMemo } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Listing, AdPricing, ListingCategory } from '../types';
import { XMarkIcon, CurrencyDollarIcon, CheckCircleIcon, StarIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface CreateListingModalProps {
    onClose: () => void;
    onCreate: (listingData: Omit<Listing, 'id' | 'vendorName' | 'vendorId' | 'dateListed' | 'status'>) => void;
    adPricing: AdPricing;
    userLastFreeAdDate: string | null;
}

const Modal: React.FC<{ title: string, children: React.ReactNode, onClose: () => void }> = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-dark-border">
                <h2 className="text-xl font-bold dark:text-dark-text-primary">{title}</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XMarkIcon className="h-6 w-6"/></button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">{children}</div>
        </Card>
    </div>
);

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ onClose, onCreate, adPricing, userLastFreeAdDate }) => {
    const [listingDetails, setListingDetails] = useState({
        title: '',
        category: 'Properties' as ListingCategory,
        price: '',
        location: '',
        description: '',
    });
    const [postingOption, setPostingOption] = useState<'free' | 'day' | 'week' | 'month'>('free');

    const isEligibleForFreePost = useMemo(() => {
        if (!userLastFreeAdDate) return true;
        const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000;
        return (new Date().getTime() - new Date(userLastFreeAdDate).getTime()) > thirtyDaysInMillis;
    }, [userLastFreeAdDate]);
    
    // Default to 'day' boost if not eligible for free post
    useState(() => {
        if (!isEligibleForFreePost) {
            setPostingOption('day');
        }
    });

    const costs = {
        free: 0,
        day: adPricing.perDay,
        week: adPricing.perWeek,
        month: adPricing.perMonth,
    };
    const totalCost = costs[postingOption] || 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setListingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let boostEndDate: string | undefined = undefined;
        if (postingOption !== 'free') {
            const endDate = new Date();
            if (postingOption === 'day') endDate.setDate(endDate.getDate() + 1);
            if (postingOption === 'week') endDate.setDate(endDate.getDate() + 7);
            if (postingOption === 'month') endDate.setMonth(endDate.getMonth() + 1);
            boostEndDate = endDate.toISOString();
        }

        const listingData = {
            ...listingDetails,
            price: Number(listingDetails.price),
            images: [`https://picsum.photos/seed/${listingDetails.title}/400/300`], // Placeholder image
            isPaid: postingOption !== 'free',
            boostEndDate,
        };
        onCreate(listingData);
    };

    const OptionCard: React.FC<{
        value: 'free' | 'day' | 'week' | 'month';
        title: string;
        description: string;
        cost: number;
        icon: React.ElementType;
        disabled?: boolean;
    }> = ({ value, title, description, cost, icon: Icon, disabled = false }) => (
        <label className={`relative flex items-center p-4 border-2 rounded-lg transition-all ${postingOption === value ? 'border-brand-primary' : 'border-brand-border dark:border-dark-border'} ${disabled ? 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400 dark:hover:border-gray-500'}`}>
            <input 
                type="radio" 
                name="posting-option" 
                value={value}
                checked={postingOption === value}
                onChange={(e) => setPostingOption(e.target.value as any)}
                className="absolute opacity-0"
                disabled={disabled}
            />
            <Icon className="h-8 w-8 text-brand-primary dark:text-dark-primary mr-4 flex-shrink-0"/>
            <div className="flex-1">
                <p className="font-bold dark:text-dark-text-primary">{title}</p>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{description}</p>
            </div>
            <p className="font-bold text-lg dark:text-dark-text-primary">₦{cost.toLocaleString()}</p>
        </label>
    );

    return (
        <Modal title="Create New Marketplace Listing" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Listing Details */}
                <div>
                    <h3 className="text-lg font-bold mb-3 dark:text-dark-text-primary">1. Listing Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="title" value={listingDetails.title} onChange={handleChange} type="text" placeholder="Listing Title" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/>
                        <select name="category" value={listingDetails.category} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">
                            <option>Properties</option>
                            <option>Assets</option>
                            <option>Services</option>
                        </select>
                        <input name="price" value={listingDetails.price} onChange={handleChange} type="number" placeholder="Price (₦)" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/>
                        <input name="location" value={listingDetails.location} onChange={handleChange} type="text" placeholder="Location" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/>
                        <textarea name="description" value={listingDetails.description} onChange={handleChange} placeholder="Description" rows={4} className="md:col-span-2 w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/>
                    </div>
                </div>

                {/* Step 2: Choose Posting Option */}
                <div>
                    <h3 className="text-lg font-bold mb-3 dark:text-dark-text-primary">2. Choose how to post</h3>
                    <div className="space-y-3">
                        <OptionCard 
                            value="free"
                            title="Free Listing"
                            description="1 per month. Standard visibility."
                            cost={0}
                            icon={CheckCircleIcon}
                            disabled={!isEligibleForFreePost}
                        />
                         <OptionCard 
                            value="day"
                            title="Boost for 1 Day"
                            description="Priority placement for 24 hours."
                            cost={adPricing.perDay}
                            icon={StarIcon}
                        />
                         <OptionCard 
                            value="week"
                            title="Boost for 1 Week"
                            description="Best value for short-term visibility."
                            cost={adPricing.perWeek}
                            icon={StarIcon}
                        />
                         <OptionCard 
                            value="month"
                            title="Boost for 1 Month"
                            description="Maximum exposure for your listing."
                            cost={adPricing.perMonth}
                            icon={StarIcon}
                        />
                    </div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-lg flex items-start">
                    <InformationCircleIcon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p>All new listings are submitted for review by an administrator before they become public on the marketplace.</p>
                </div>


                {/* Final Step: Submit */}
                <div className="pt-6 border-t dark:border-dark-border flex justify-between items-center">
                    <div>
                        <p className="font-semibold dark:text-dark-text-secondary">Total Cost:</p>
                        <p className="text-2xl font-bold dark:text-dark-text-primary">₦{totalCost.toLocaleString()}</p>
                    </div>
                    <Button type="submit" className="text-lg py-3 px-6">
                        {postingOption === 'free' ? 'Post for Free' : 'Pay and Post Listing'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};