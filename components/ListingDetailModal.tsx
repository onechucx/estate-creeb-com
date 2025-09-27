import React, { useState } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Listing } from '../types';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ListingDetailModalProps {
    listing: Listing;
    onClose: () => void;
    isAuthenticated: boolean;
    onStartMessage?: (userId: string, userName: string) => void;
    onLoginRequest?: () => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose, isAuthenticated, onStartMessage, onLoginRequest }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleContact = () => {
        if (isAuthenticated && onStartMessage) {
            onStartMessage(listing.vendorId, listing.vendorName);
        } else if (!isAuthenticated && onLoginRequest) {
            onLoginRequest();
        }
        onClose(); // Close modal after action
    };

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % listing.images.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col relative">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 z-20">
                    <XMarkIcon className="h-6 w-6"/>
                </button>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto pr-2">
                    {/* Image Gallery */}
                    <div className="relative w-full aspect-square lg:aspect-auto">
                        <img 
                            src={listing.images[selectedImageIndex]} 
                            alt={`${listing.title} - Image ${selectedImageIndex + 1}`} 
                            className="w-full h-full object-cover rounded-lg bg-gray-200"
                        />
                        {listing.images.length > 1 && (
                            <>
                                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60">
                                    <ChevronLeftIcon className="h-6 w-6"/>
                                </button>
                                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60">
                                    <ChevronRightIcon className="h-6 w-6"/>
                                </button>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                    {listing.images.map((_, index) => (
                                        <div 
                                            key={index} 
                                            className={`h-2 rounded-full transition-all ${index === selectedImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Listing Details */}
                    <div className="flex flex-col">
                        <div>
                            <p className="text-sm text-brand-text-secondary">{listing.category} &bull; {listing.location}</p>
                            <h2 className="text-3xl font-bold mt-1 text-brand-text-primary">{listing.title}</h2>
                            <p className="text-3xl font-bold text-brand-primary mt-2">₦{listing.price.toLocaleString()}</p>
                            <p className="text-sm text-brand-text-secondary mt-2">Listed by: <span className="font-semibold text-brand-text-primary">{listing.vendorName}</span></p>
                        </div>
                        <div className="my-6 border-t border-brand-border"></div>
                        <div>
                            <h3 className="font-bold text-lg text-brand-text-primary">Description</h3>
                            <p className="mt-2 text-brand-text-secondary whitespace-pre-wrap">{listing.description}</p>
                        </div>
                        <div className="mt-auto pt-6">
                            <Button onClick={handleContact} className="w-full !py-3 !text-lg justify-center">
                                <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
                                {isAuthenticated ? 'Contact Vendor' : 'Login to Contact'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};