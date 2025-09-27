import React, { useState } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { ToastMessage, RequestType, CreationRequest } from '../types';
import { UsersIcon, BuildingLibraryIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

interface CreateHubProps {
    showToast: (message: string, type?: ToastMessage['type']) => void;
    setRequests: React.Dispatch<React.SetStateAction<CreationRequest[]>>;
    // FIX: Changed prop from 'userSubscriptions' object to 'isSubscribed' boolean to match usage in App.tsx.
    isSubscribed: boolean;
}

const CreationCard: React.FC<{
    title: string;
    description: string;
    icon: React.ElementType;
    onClick: () => void;
}> = ({ title, description, icon: Icon, onClick }) => (
    <Card 
        className="text-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
        onClick={onClick}
    >
        <Icon className="h-12 w-12 text-brand-primary dark:text-dark-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2 dark:text-dark-text-primary">{title}</h3>
        <p className="text-brand-text-secondary dark:text-dark-text-secondary">{description}</p>
    </Card>
);

const CreateCommunityForm: React.FC<{ 
    onBack: () => void; 
    showToast: (message: string, type?: ToastMessage['type']) => void;
    setRequests: React.Dispatch<React.SetStateAction<CreationRequest[]>>;
    isSubscribed: boolean;
}> = ({ onBack, showToast, setRequests, isSubscribed }) => {
    const [formData, setFormData] = useState({ name: '', regNumber: '', country: '', state: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: CreationRequest = {
            id: `REQ-${Date.now()}`,
            type: 'Community',
            name: formData.name,
            applicantName: 'John Doe', // Placeholder
            applicantEmail: 'john.doe@example.com', // Placeholder
            dateSubmitted: new Date().toISOString(),
            status: 'Pending',
            details: { ...formData, certificate: 'cert.pdf' }
        };
        setRequests(prev => [newRequest, ...prev]);
        showToast('Community creation request submitted for review!', 'success');
        onBack();
    };

    return (
        <Card>
            <h3 className="text-2xl font-bold mb-4 dark:text-dark-text-primary">Create a New Community</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Community Name" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                <input name="regNumber" value={formData.regNumber} onChange={handleChange} type="text" placeholder="Cooperative Society Registration Number" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Upload Certificate</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-border border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <ArrowUpOnSquareIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                                <span className="font-medium text-brand-primary">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder="Country" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                    <input name="state" value={formData.state} onChange={handleChange} type="text" placeholder="State/Province" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4">
                    {!isSubscribed && <p className="text-sm text-red-600">An active subscription is required.</p>}
                    <Button type="button" variant="secondary" onClick={onBack}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={!isSubscribed} title={!isSubscribed ? 'Subscription required' : ''}>Submit for Review</Button>
                </div>
            </form>
        </Card>
    );
};

const ListEstateForm: React.FC<{ 
    onBack: () => void; 
    showToast: (message: string, type?: ToastMessage['type']) => void; 
    setRequests: React.Dispatch<React.SetStateAction<CreationRequest[]>>;
    isSubscribed: boolean;
}> = ({ onBack, showToast, setRequests, isSubscribed }) => {
     const [formData, setFormData] = useState({ name: '', address: '' });

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: CreationRequest = {
            id: `REQ-${Date.now()}`,
            type: 'Estate',
            name: formData.name,
            applicantName: 'John Doe', // Placeholder
            applicantEmail: 'john.doe@example.com', // Placeholder
            dateSubmitted: new Date().toISOString(),
            status: 'Pending',
            details: { ...formData, proof: 'proof.pdf' }
        };
        setRequests(prev => [newRequest, ...prev]);
        showToast('Estate listing request submitted for review!', 'success');
        onBack();
    };
    
    return (
         <Card>
            <h3 className="text-2xl font-bold mb-4 dark:text-dark-text-primary">List a New Estate</h3>
             <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Estate Name" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Full Estate Address" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Proof of Ownership/Management Rights</label>
                     <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-border border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <ArrowUpOnSquareIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                                <span className="font-medium text-brand-primary">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-3 pt-4">
                    {!isSubscribed && <p className="text-sm text-red-600">An active subscription is required.</p>}
                    <Button type="button" variant="secondary" onClick={onBack}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={!isSubscribed} title={!isSubscribed ? 'Subscription required' : ''}>Submit for Review</Button>
                </div>
            </form>
        </Card>
    );
};

export const CreateHub: React.FC<CreateHubProps> = ({ showToast, setRequests, isSubscribed }) => {
    const [view, setView] = useState<'hub' | 'community_form' | 'estate_form'>('hub');

    const renderContent = () => {
        switch (view) {
            case 'community_form':
                return <CreateCommunityForm onBack={() => setView('hub')} showToast={showToast} setRequests={setRequests} isSubscribed={isSubscribed} />;
            case 'estate_form':
                return <ListEstateForm onBack={() => setView('hub')} showToast={showToast} setRequests={setRequests} isSubscribed={isSubscribed} />;
            case 'hub':
            default:
                return (
                    <>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold dark:text-dark-text-primary">Start Something New</h2>
                            <p className="text-lg text-brand-text-secondary dark:text-dark-text-secondary mt-2">Choose what you would like to create. Your submission will be sent to a site administrator for review.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <CreationCard 
                                title="Create a Community"
                                description="Start a new cooperative society for your group to manage projects, lands, and assets together."
                                icon={UsersIcon}
                                onClick={() => setView('community_form')}
                            />
                            <CreationCard 
                                title="List an Estate"
                                description="Onboard an existing residential estate to manage members, billing, security, and amenities."
                                icon={BuildingLibraryIcon}
                                onClick={() => setView('estate_form')}
                            />
                        </div>
                    </>
                );
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};