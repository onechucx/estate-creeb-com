import React, { useState, useMemo } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { GlobalAd, UserRole, ToastMessage, AdPricing, CreationRequest, RequestStatus, RequestType, KYCSubmission, Listing, Vendor, ManagedUser, SubscriptionPricing } from '../types';
import { CurrencyDollarIcon, BuildingOffice2Icon, XMarkIcon, BellAlertIcon, CheckCircleIcon, XCircleIcon, FunnelIcon, CheckBadgeIcon, PencilIcon, PauseIcon, PlayIcon, TrashIcon, UserMinusIcon, UserPlusIcon, CreditCardIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { initialGlobalAds as initialGlobalAdsData } from '../data';

enum AdminTab { REQUESTS, GLOBAL_ADS, MARKETPLACE, KYC_VERIFICATION, SUBSCRIPTIONS }

const RequestReviewModal: React.FC<{ request: CreationRequest, onClose: () => void, onDecision: (id: string, decision: 'approve' | 'reject', notes: string) => void }> = ({ request, onClose, onDecision }) => {
    const [notes, setNotes] = useState('');
    return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold dark:text-dark-text-primary">{request.type} Creation Request</h2>
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Submitted by {request.applicantName} ({request.applicantEmail})</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"><XMarkIcon className="h-6 w-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <Card className="bg-gray-50 dark:bg-dark-surface/50">
                    <h3 className="font-bold mb-2 dark:text-dark-text-primary">{request.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {Object.entries(request.details).map(([key, value]) => (
                             <div key={key}>
                                <p className="font-semibold capitalize text-gray-600 dark:text-dark-text-secondary">{key.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="text-gray-800 dark:text-dark-text-primary">{String(value)}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                 <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Admin Notes (Optional, for rejection)</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" placeholder="Provide a reason if rejecting..." />
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t dark:border-dark-border">
                    <Button variant='danger' onClick={() => onDecision(request.id, 'reject', notes)}><XCircleIcon className="h-5 w-5 mr-2" />Reject</Button>
                    <Button variant='primary' onClick={() => onDecision(request.id, 'approve', notes)}><CheckCircleIcon className="h-5 w-5 mr-2"/>Approve Request</Button>
                </div>
            </div>
        </Card>
    </div>
)};


const RequestsManagement: React.FC<{ 
    requests: CreationRequest[];
    setRequests: (requests: CreationRequest[]) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void; 
}> = ({ requests, setRequests, showToast }) => {
    const [reviewingRequest, setReviewingRequest] = useState<CreationRequest | null>(null);
    const [filterType, setFilterType] = useState<RequestType | 'All'>('All');
    const [filterStatus, setFilterStatus] = useState<RequestStatus | 'All'>('All');

    const handleDecision = (id: string, decision: 'approve' | 'reject', notes: string) => {
        const updatedStatus: RequestStatus = decision === 'approve' ? 'Approved' : 'Rejected';
        setRequests(requests.map(r => r.id === id ? { ...r, status: updatedStatus, adminNotes: notes } : r));
        setReviewingRequest(null);
        showToast(`Request ${id} has been ${updatedStatus}.`);
    };

    const filteredRequests = useMemo(() => {
        return requests
            .filter(r => filterType === 'All' || r.type === filterType)
            .filter(r => filterStatus === 'All' || r.status === filterStatus);
    }, [requests, filterType, filterStatus]);

    const getStatusChip = (status: RequestStatus) => {
        const styles = {
            Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            Approved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
            Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        };
        return <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status]}`}>{status}</span>;
    };
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-gray-50 dark:bg-dark-surface/50 rounded-lg">
                <FunnelIcon className="h-5 w-5 text-gray-500" />
                <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border text-sm w-full sm:w-auto">
                    <option value="All">All Types</option><option value="Community">Community</option><option value="Estate">Estate</option>
                </select>
                 <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border text-sm w-full sm:w-auto">
                    <option value="All">All Statuses</option><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-brand-surface dark:bg-dark-surface">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="py-2 px-4 border-b dark:border-dark-border text-left">Request Name</th>
                            <th className="py-2 px-4 border-b dark:border-dark-border text-left">Type</th>
                            <th className="py-2 px-4 border-b dark:border-dark-border text-left">Applicant</th>
                            <th className="py-2 px-4 border-b dark:border-dark-border text-center">Status</th>
                            <th className="py-2 px-4 border-b dark:border-dark-border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-dark-border">
                        {filteredRequests.map(req => (
                            <tr key={req.id}>
                                <td className="py-2 px-4">
                                    <p className="font-semibold dark:text-dark-text-primary">{req.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Submitted: {new Date(req.dateSubmitted).toLocaleDateString()}</p>
                                </td>
                                <td className="py-2 px-4 dark:text-dark-text-secondary">{req.type}</td>
                                <td className="py-2 px-4 dark:text-dark-text-secondary">{req.applicantName}</td>
                                <td className="py-2 px-4 text-center">{getStatusChip(req.status)}</td>
                                <td className="py-2 px-4 text-center">
                                    <Button onClick={() => setReviewingRequest(req)} variant="secondary" className="text-sm py-1 px-3" disabled={req.status !== 'Pending'}>
                                        Review
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {reviewingRequest && <RequestReviewModal request={reviewingRequest} onClose={() => setReviewingRequest(null)} onDecision={handleDecision} />}
        </div>
    );
};

const KYCReviewModal: React.FC<{ submission: KYCSubmission, onClose: () => void, onDecision: (id: string, decision: 'approve' | 'reject', notes: string) => void }> = ({ submission, onClose, onDecision }) => {
    const [notes, setNotes] = useState('');
    return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                 <div>
                    <h2 className="text-2xl font-bold dark:text-dark-text-primary">KYC Submission Review</h2>
                    <div className="flex items-center mt-1">
                        <img src={submission.userAvatar} alt={submission.userName} className="h-8 w-8 rounded-full mr-2"/>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{submission.userName} ({submission.userId})</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"><XMarkIcon className="h-6 w-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <Card className="bg-gray-50 dark:bg-dark-surface/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><p className="font-semibold text-gray-600">ID Type</p><p>{submission.idType}</p></div>
                        <div><p className="font-semibold text-gray-600">ID Number</p><p>{submission.idNumber}</p></div>
                        <div><p className="font-semibold text-gray-600">ID Document</p><a href="#" className="text-brand-primary hover:underline">{submission.idDocumentUrl}</a></div>
                        <div><p className="font-semibold text-gray-600">Proof of Address</p><a href="#" className="text-brand-primary hover:underline">{submission.addressProofUrl}</a></div>
                    </div>
                </Card>
                 <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Admin Notes (Required for rejection)</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" placeholder="Provide a reason if rejecting..." />
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t dark:border-dark-border">
                    <Button variant='danger' onClick={() => onDecision(submission.id, 'reject', notes)} disabled={notes.trim() === ''}><XCircleIcon className="h-5 w-5 mr-2" />Reject</Button>
                    <Button variant='primary' onClick={() => onDecision(submission.id, 'approve', notes)}><CheckCircleIcon className="h-5 w-5 mr-2"/>Approve Submission</Button>
                </div>
            </div>
        </Card>
    </div>
)};


const KYCManagement: React.FC<{ 
    submissions: KYCSubmission[];
    setSubmissions: (submissions: KYCSubmission[]) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void; 
}> = ({ submissions, setSubmissions, showToast }) => {
    const [reviewingSubmission, setReviewingSubmission] = useState<KYCSubmission | null>(null);
    const pendingSubmissions = useMemo(() => submissions.filter(s => s.status === 'Pending'), [submissions]);

    const handleDecision = (id: string, decision: 'approve' | 'reject', notes: string) => {
        const updatedStatus: RequestStatus = decision === 'approve' ? 'Approved' : 'Rejected';
        setSubmissions(submissions.map(s => s.id === id ? { ...s, status: updatedStatus, adminNotes: notes } : s));
        setReviewingSubmission(null);
        showToast(`KYC Submission ${id} has been ${updatedStatus}.`);
        // In a real app, you would also update the user's KYC status here.
    };
    
    return(
        <Card>
            <h3 className="text-lg font-bold mb-4">Pending KYC Verifications</h3>
             <div className="overflow-x-auto">
                <table className="min-w-full bg-brand-surface dark:bg-dark-surface text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700/50"><tr>
                        <th className="py-2 px-4 border-b text-left">User</th>
                        <th className="py-2 px-4 border-b text-left">ID Type</th>
                        <th className="py-2 px-4 border-b text-left">Date Submitted</th>
                        <th className="py-2 px-4 border-b text-center">Actions</th>
                    </tr></thead>
                    <tbody className="divide-y dark:divide-dark-border">
                        {pendingSubmissions.length === 0 ? (
                            <tr><td colSpan={4} className="text-center p-8 text-gray-500">No pending KYC submissions.</td></tr>
                        ) : (
                            pendingSubmissions.map(sub => (
                                <tr key={sub.id}>
                                    <td className="py-2 px-4"><div className="flex items-center"><img src={sub.userAvatar} alt={sub.userName} className="h-8 w-8 rounded-full mr-2"/><p className="font-semibold">{sub.userName}</p></div></td>
                                    <td className="py-2 px-4">{sub.idType}</td>
                                    <td className="py-2 px-4">{new Date(sub.dateSubmitted).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 text-center"><Button onClick={() => setReviewingSubmission(sub)} variant="secondary" className="!py-1 !px-3 text-xs">Review</Button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
             </div>
             {reviewingSubmission && <KYCReviewModal submission={reviewingSubmission} onClose={() => setReviewingSubmission(null)} onDecision={handleDecision} />}
        </Card>
    );
};

const AdFormModal: React.FC<{ ad: GlobalAd | null; onClose: () => void; onSave: (ad: GlobalAd) => void; }> = ({ ad, onClose, onSave }) => {
    const [formData, setFormData] = useState<Omit<GlobalAd, 'id' | 'impressions' | 'clicks'>>({
        title: ad?.title || '',
        content: ad?.content || '',
        imageUrl: ad?.imageUrl || '',
        targetUrl: ad?.targetUrl || '',
        status: ad?.status || 'Paused',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalAd: GlobalAd = {
            id: ad?.id || `AD-${Date.now()}`,
            impressions: ad?.impressions || 0,
            clicks: ad?.clicks || 0,
            ...formData,
        };
        onSave(finalAd);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold dark:text-dark-text-primary">{ad ? 'Edit' : 'Create'} Global Ad</h2>
                    <button onClick={onClose}><XMarkIcon className="h-6 w-6"/></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Ad Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                    <textarea placeholder="Ad Content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={3} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                    <input type="url" placeholder="Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                    <input type="url" placeholder="Target URL" value={formData.targetUrl} onChange={e => setFormData({...formData, targetUrl: e.target.value})} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                    <div className="flex justify-end space-x-2"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Save Ad</Button></div>
                </form>
            </Card>
        </div>
    );
};

const GlobalAdsManagement: React.FC<{ showToast: (message: string, type?: ToastMessage['type']) => void; }> = ({ showToast }) => {
    const [ads, setAds] = useState<GlobalAd[]>(initialGlobalAdsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAd, setEditingAd] = useState<GlobalAd | null>(null);

    const handleOpenCreate = () => {
        setEditingAd(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (ad: GlobalAd) => {
        setEditingAd(ad);
        setIsModalOpen(true);
    };

    const handleSaveAd = (ad: GlobalAd) => {
        const adExists = ads.some(a => a.id === ad.id);
        if (adExists) {
            setAds(ads.map(a => a.id === ad.id ? ad : a));
            showToast('Ad updated successfully!');
        } else {
            setAds([ad, ...ads]);
            showToast('New global ad created!');
        }
        setIsModalOpen(false);
    };

    const handleToggleStatus = (id: string, currentStatus: GlobalAd['status']) => {
        const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
        setAds(ads.map(ad => ad.id === id ? { ...ad, status: newStatus } : ad));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this ad?')) {
            setAds(ads.filter(ad => ad.id !== id));
            showToast('Ad deleted.', 'error');
        }
    };

    return (
        <Card>
            {isModalOpen && <AdFormModal ad={editingAd} onClose={() => setIsModalOpen(false)} onSave={handleSaveAd} />}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold dark:text-dark-text-primary">Manage Global Ads</h3>
                <Button onClick={handleOpenCreate}>Create New Ad</Button>
            </div>
            {ads.length === 0 ? <p className="text-gray-500 dark:text-dark-text-secondary">No global ads created yet.</p> :
            <div className="overflow-x-auto"><table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-dark-surface/50"><tr><th className="p-2 text-left">Ad</th><th className="p-2 text-center">Status</th><th className="p-2 text-right">Performance (I/C)</th><th className="p-2 text-center">Actions</th></tr></thead>
                <tbody className="divide-y dark:divide-dark-border">{ads.map(ad => (<tr key={ad.id} className="hover:bg-gray-50 dark:hover:bg-dark-surface/30">
                    <td className="p-2"><div className="flex items-center"><img src={ad.imageUrl} alt={ad.title} className="w-16 h-10 object-cover rounded mr-3"/><p className="font-semibold">{ad.title}</p></div></td>
                    <td className="p-2 text-center"><span className={`px-2 py-1 text-xs rounded-full ${ad.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{ad.status}</span></td>
                    <td className="p-2 text-right font-mono">{ad.impressions.toLocaleString()} / {ad.clicks.toLocaleString()}</td>
                    <td className="p-2"><div className="flex justify-center space-x-1">
                        <Button variant="secondary" className="!p-2" title={ad.status === 'Active' ? 'Pause' : 'Activate'} onClick={() => handleToggleStatus(ad.id, ad.status)}>
                            {ad.status === 'Active' ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                        </Button>
                        <Button variant="secondary" className="!p-2" title="Edit" onClick={() => handleOpenEdit(ad)}><PencilIcon className="h-4 w-4" /></Button>
                        <Button variant="danger" className="!p-2" title="Delete" onClick={() => handleDelete(ad.id)}><TrashIcon className="h-4 w-4" /></Button>
                    </div></td>
                </tr>))}</tbody>
            </table></div>}
        </Card>
    );
};
const MarketplaceManagementPanel: React.FC<{ 
    pricing: AdPricing; 
    setPricing: (p:AdPricing) => void; 
    showToast: (m:string, t?: ToastMessage['type'])=>void; 
    listings: Listing[];
    setListings: (listings: Listing[]) => void;
    vendors: Vendor[];
    setVendors: (vendors: Vendor[]) => void;
}> = ({ pricing, setPricing, showToast, listings, setListings, vendors, setVendors }) => {
    const [formState, setFormState] = useState(pricing);
    const [activeSubTab, setActiveSubTab] = useState<'approvals' | 'vendors' | 'pricing'>('approvals');

    const pendingListings = useMemo(() => listings.filter(l => l.status === 'Pending'), [listings]);
    
    const handleSavePricing = () => {
        setPricing(formState);
        showToast('Marketplace pricing updated!', 'success');
    };

    const handleListingDecision = (listingId: string, decision: 'Approve' | 'Reject') => {
        const newStatus = decision === 'Approve' ? 'Active' : 'Rejected';
        setListings(listings.map(l => l.id === listingId ? { ...l, status: newStatus } : l));
        showToast(`Listing ${listingId} has been ${decision.toLowerCase()}d.`);
    };

    const handleVendorStatusToggle = (vendorId: string) => {
        setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: v.status === 'Active' ? 'Suspended' : 'Active' } : v));
        showToast(`Vendor status updated.`);
    };
    
    return (
         <Card>
            <div className="border-b dark:border-dark-border">
                <nav className="-mb-px flex space-x-4">
                    <button onClick={() => setActiveSubTab('approvals')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeSubTab === 'approvals' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500'}`}>Ad Approvals ({pendingListings.length})</button>
                    <button onClick={() => setActiveSubTab('vendors')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeSubTab === 'vendors' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500'}`}>Vendor Management</button>
                    <button onClick={() => setActiveSubTab('pricing')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeSubTab === 'pricing' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500'}`}>Pricing Settings</button>
                </nav>
            </div>
            <div className="pt-6">
                {activeSubTab === 'approvals' && (
                    <div className="space-y-3">
                        {pendingListings.length > 0 ? pendingListings.map(listing => (
                            <Card key={listing.id} className="!p-3 flex justify-between items-center">
                                <div className="flex items-center gap-4"><img src={listing.images[0]} alt={listing.title} className="w-16 h-12 object-cover rounded" /><div><p className="font-semibold">{listing.title}</p><p className="text-xs text-gray-500">by {listing.vendorName}</p></div></div>
                                <div className="flex gap-2"><Button onClick={() => handleListingDecision(listing.id, 'Approve')} className="!text-xs !py-1">Approve</Button><Button onClick={() => handleListingDecision(listing.id, 'Reject')} variant="danger" className="!text-xs !py-1">Reject</Button></div>
                            </Card>
                        )) : <p className="text-center text-gray-500 py-8">No pending listings to review.</p>}
                    </div>
                )}
                {activeSubTab === 'vendors' && (
                    <div className="overflow-x-auto"><table className="min-w-full text-sm">
                        <thead className="bg-gray-50"><tr><th className="p-2 text-left">Vendor</th><th className="p-2 text-center">Status</th><th className="p-2 text-right">Listings</th><th className="p-2 text-center">Actions</th></tr></thead>
                        <tbody>{vendors.map(vendor => (
                            <tr key={vendor.id} className="border-b"><td className="p-2 font-semibold">{vendor.name}</td><td className="p-2 text-center"><span className={`px-2 py-1 text-xs rounded-full ${vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{vendor.status}</span></td><td className="p-2 text-right">{vendor.listingsCount}</td><td className="p-2 text-center"><Button onClick={() => handleVendorStatusToggle(vendor.id)} variant="secondary" className="!text-xs !py-1">{vendor.status === 'Active' ? <UserMinusIcon className="h-4 w-4 mr-1"/> : <UserPlusIcon className="h-4 w-4 mr-1"/>}{vendor.status === 'Active' ? 'Suspend' : 'Unsuspend'}</Button></td></tr>
                        ))}</tbody>
                    </table></div>
                )}
                {activeSubTab === 'pricing' && (
                    <div className="space-y-4 max-w-md">
                        <div><label className="block text-sm font-medium">Price per Day (₦)</label><input type="number" value={formState.perDay} onChange={e => setFormState({...formState, perDay: Number(e.target.value)})} className="w-full p-2 border rounded-md"/></div>
                        <div><label className="block text-sm font-medium">Price per Week (₦)</label><input type="number" value={formState.perWeek} onChange={e => setFormState({...formState, perWeek: Number(e.target.value)})} className="w-full p-2 border rounded-md"/></div>
                        <div><label className="block text-sm font-medium">Price per Month (₦)</label><input type="number" value={formState.perMonth} onChange={e => setFormState({...formState, perMonth: Number(e.target.value)})} className="w-full p-2 border rounded-md"/></div>
                        <Button onClick={handleSavePricing}>Save Pricing</Button>
                    </div>
                )}
            </div>
         </Card>
    );
};

const PricingSettings: React.FC<{
    pricing: SubscriptionPricing;
    setPricing: (pricing: SubscriptionPricing) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void;
}> = ({ pricing, setPricing, showToast }) => {
    const [formState, setFormState] = useState(pricing);

    const handleSave = () => {
        setPricing(formState);
        showToast('Subscription pricing updated!', 'success');
    };

    return (
        <Card className="max-w-md">
            <h3 className="text-lg font-bold mb-4 dark:text-dark-text-primary">Subscription Pricing</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium dark:text-dark-text-secondary">Community Platform Annual Fee (₦)</label>
                    <input type="number" value={formState.community} onChange={e => setFormState({...formState, community: Number(e.target.value)})} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium dark:text-dark-text-secondary">Estate Platform Annual Fee (₦)</label>
                    <input type="number" value={formState.estate} onChange={e => setFormState({...formState, estate: Number(e.target.value)})} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border"/>
                </div>
                <Button onClick={handleSave}>Save Pricing</Button>
            </div>
        </Card>
    );
};

const UserSubscriptionManagement: React.FC<{
    users: ManagedUser[];
    setUsers: (users: ManagedUser[]) => void;
    pricing: SubscriptionPricing;
}> = ({ users, setUsers, pricing }) => {

    const handleToggleSubscription = (userId: string, type: 'community' | 'estate') => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                const isSubscribed = user.subscriptions[type].subscribed;
                return {
                    ...user,
                    subscriptions: {
                        ...user.subscriptions,
                        [type]: {
                            subscribed: !isSubscribed,
                            date: !isSubscribed ? new Date().toISOString() : undefined
                        }
                    }
                };
            }
            return user;
        }));
    };
    
    return (
        <Card>
            <h3 className="text-lg font-bold mb-4 dark:text-dark-text-primary">User Subscriptions</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-dark-surface/50">
                        <tr>
                            <th className="p-2 text-left dark:text-dark-text-secondary">User</th>
                            <th className="p-2 text-center dark:text-dark-text-secondary">Community Sub (₦{pricing.community.toLocaleString()}/yr)</th>
                            <th className="p-2 text-center dark:text-dark-text-secondary">Estate Sub (₦{pricing.estate.toLocaleString()}/yr)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-dark-border">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="p-2">
                                    <div className="flex items-center">
                                        <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full mr-2"/>
                                        <div>
                                            <p className="font-semibold dark:text-dark-text-primary">{user.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 text-center">
                                    <button 
                                        onClick={() => handleToggleSubscription(user.id, 'community')}
                                        className={`px-3 py-1 rounded-full text-xs ${user.subscriptions.community.subscribed ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {user.subscriptions.community.subscribed ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="p-2 text-center">
                                     <button 
                                        onClick={() => handleToggleSubscription(user.id, 'estate')}
                                        className={`px-3 py-1 rounded-full text-xs ${user.subscriptions.estate.subscribed ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {user.subscriptions.estate.subscribed ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const SubscriptionsManagement: React.FC<{
    users: ManagedUser[];
    setUsers: (users: ManagedUser[]) => void;
    pricing: SubscriptionPricing;
    setPricing: (pricing: SubscriptionPricing) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void;
}> = ({ users, setUsers, pricing, setPricing, showToast }) => {
    return (
        <div className="space-y-6">
            <PricingSettings pricing={pricing} setPricing={setPricing} showToast={showToast} />
            <UserSubscriptionManagement users={users} setUsers={setUsers} pricing={pricing} />
        </div>
    );
};

interface AdminPanelProps {
    userRole: UserRole;
    showToast: (message: string, type?: ToastMessage['type']) => void;
    adPricing: AdPricing;
    setAdPricing: (p: AdPricing) => void;
    requests: CreationRequest[];
    setRequests: (requests: CreationRequest[]) => void;
    kycSubmissions: KYCSubmission[];
    setKycSubmissions: (submissions: KYCSubmission[]) => void;
    listings: Listing[];
    setListings: (listings: Listing[]) => void;
    vendors: Vendor[];
    setVendors: (vendors: Vendor[]) => void;
    managedUsers: ManagedUser[];
    setManagedUsers: (users: ManagedUser[]) => void;
    subscriptionPricing: SubscriptionPricing;
    setSubscriptionPricing: (pricing: SubscriptionPricing) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
    userRole,
    showToast,
    adPricing,
    setAdPricing,
    requests,
    setRequests,
    kycSubmissions,
    setKycSubmissions,
    listings,
    setListings,
    vendors,
    setVendors,
    managedUsers,
    setManagedUsers,
    subscriptionPricing,
    setSubscriptionPricing,
}) => {
    const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.REQUESTS);

    const TabButton: React.FC<{ tab: AdminTab; label: string }> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${
                activeTab === tab
                    ? 'border-brand-primary text-brand-primary dark:border-dark-primary'
                    : 'border-transparent text-brand-text-secondary dark:text-dark-text-secondary hover:text-gray-700 hover:border-gray-300'
            }`}
        >
            {label}
        </button>
    );

    const renderContent = () => {
        switch (activeTab) {
            case AdminTab.REQUESTS:
                return <RequestsManagement requests={requests} setRequests={setRequests} showToast={showToast} />;
            case AdminTab.KYC_VERIFICATION:
                return <KYCManagement submissions={kycSubmissions} setSubmissions={setKycSubmissions} showToast={showToast} />;
            case AdminTab.GLOBAL_ADS:
                return <GlobalAdsManagement showToast={showToast} />;
            case AdminTab.MARKETPLACE:
                return <MarketplaceManagementPanel 
                            pricing={adPricing} 
                            setPricing={setAdPricing} 
                            showToast={showToast} 
                            listings={listings} 
                            setListings={setListings} 
                            vendors={vendors}
                            setVendors={setVendors}
                        />;
            case AdminTab.SUBSCRIPTIONS:
                 return <SubscriptionsManagement 
                            users={managedUsers} 
                            setUsers={setManagedUsers} 
                            pricing={subscriptionPricing}
                            setPricing={setSubscriptionPricing}
                            showToast={showToast}
                        />;
            default:
                return null;
        }
    };

    if (userRole !== UserRole.ADMINISTRATOR) {
        return (
            <Card className="text-center py-16">
                <ShieldExclamationIcon className="h-12 w-12 text-red-500 mx-auto mb-4"/>
                <h3 className="text-xl font-bold dark:text-dark-text-primary">Access Denied</h3>
                <p className="text-gray-500 dark:text-dark-text-secondary mt-2">You do not have permission to view this page.</p>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold dark:text-dark-text-primary">Administrator Panel</h2>
            <Card className="!p-0">
                <div className="border-b dark:border-dark-border px-4">
                    <nav className="-mb-px flex space-x-2 overflow-x-auto">
                        <TabButton tab={AdminTab.REQUESTS} label="Creation Requests" />
                        <TabButton tab={AdminTab.KYC_VERIFICATION} label="KYC Verifications" />
                        <TabButton tab={AdminTab.MARKETPLACE} label="Marketplace" />
                        <TabButton tab={AdminTab.SUBSCRIPTIONS} label="Subscriptions" />
                        <TabButton tab={AdminTab.GLOBAL_ADS} label="Global Ads" />
                    </nav>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-dark-surface/50 rounded-b-xl">
                    {renderContent()}
                </div>
            </Card>
        </div>
    );
};
