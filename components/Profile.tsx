import React, { useState } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { AtSymbolIcon, PhoneIcon, HomeIcon, UserIcon, BellAlertIcon, ArchiveBoxIcon, DocumentTextIcon, BanknotesIcon, ShieldCheckIcon, CreditCardIcon, CheckCircleIcon, UserGroupIcon, IdentificationIcon, ArrowUpOnSquareIcon, ClockIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CreationRequest, RequestStatus, PayoutAccount, UserRole, KYCStatus, ToastMessage, UserSubscriptions } from '../types';
import { mockFullCommunities } from './Community';

const mockApplications: CreationRequest[] = [
    { id: 'APP001', type: 'Community', name: 'My New Coop', applicantName: 'John Doe', applicantEmail: 'john.doe@example.com', dateSubmitted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending', details: {} },
    { id: 'APP002', type: 'Estate', name: 'My Dream Estate', applicantName: 'John Doe', applicantEmail: 'john.doe@example.com', dateSubmitted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), status: 'Approved', details: {} },
    { id: 'APP003', type: 'Community', name: 'Future Investments', applicantName: 'John Doe', applicantEmail: 'john.doe@example.com', dateSubmitted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), status: 'Rejected', details: { }, adminNotes: 'Registration certificate was not valid.' },
];

const InfoField: React.FC<{ icon: React.ElementType, label: string, value: string }> = ({ icon: Icon, label, value }) => (
    <div>
        <label className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary flex items-center"><Icon className="h-4 w-4 mr-2" />{label}</label>
        <p className="mt-1 text-md text-gray-800 dark:text-dark-text-primary">{value}</p>
    </div>
);

const PersonalInfoTab: React.FC<{isSubscribed: boolean}> = ({ isSubscribed }) => {
    const [accounts, setAccounts] = useState<PayoutAccount[]>([]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold mb-6 dark:text-dark-text-primary">Contact Information</h3>
                    <div className="space-y-6">
                        <InfoField icon={AtSymbolIcon} label="Email Address" value="john.doe@example.com" />
                        <InfoField icon={PhoneIcon} label="Phone Number" value="+234 801 234 5678" />
                        <InfoField icon={HomeIcon} label="Address" value="123 Community Lane, Lagos, Nigeria" />
                    </div>
                </Card>
                <Card>
                    <h3 className="text-xl font-bold mb-6 dark:text-dark-text-primary">Next of Kin</h3>
                    <div className="space-y-6">
                        <InfoField icon={UserIcon} label="Name" value="Jane Doe" />
                        <InfoField icon={PhoneIcon} label="Phone Number" value="+234 809 876 5432" />
                    </div>
                </Card>
            </div>
            <Card>
                <h3 className="text-xl font-bold mb-6 flex items-center dark:text-dark-text-primary"><BanknotesIcon className="h-6 w-6 mr-3 text-brand-primary dark:text-dark-primary" />Payout Accounts</h3>
                {accounts.length > 0 && <div className="space-y-4 mb-6">{/* List accounts here */}</div>}
                {!isSubscribed && <p className="text-sm text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md mb-4">You need an active subscription to add or manage payout accounts.</p>}
                <Button disabled={!isSubscribed} title={!isSubscribed ? 'Subscription required': ''}>Add New Bank Account</Button>
            </Card>
        </div>
    );
};


const ApplicationsTab: React.FC = () => {
    const getStatusChip = (status: RequestStatus) => {
        const styles = {
            Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            Approved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
            Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        };
        return <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status]}`}>{status}</span>;
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-6 flex items-center dark:text-dark-text-primary"><DocumentTextIcon className="h-6 w-6 mr-3 text-brand-primary dark:text-dark-primary" />Applications</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-dark-surface/50">
                        <tr>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Type</th>
                            <th className="p-2 text-left">Date Submitted</th>
                            <th className="p-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-dark-border">
                        {mockApplications.map(app => (
                            <React.Fragment key={app.id}>
                                <tr>
                                    <td className="p-2 font-semibold dark:text-dark-text-primary">{app.name}</td>
                                    <td className="p-2 dark:text-dark-text-secondary">{app.type}</td>
                                    <td className="p-2 dark:text-dark-text-secondary">{new Date(app.dateSubmitted).toLocaleDateString()}</td>
                                    <td className="p-2 text-center">{getStatusChip(app.status)}</td>
                                </tr>
                                {app.status === 'Rejected' && app.adminNotes && (
                                    <tr>
                                        <td colSpan={4} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
                                            <strong>Reason for Rejection:</strong> {app.adminNotes}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

// --- SUBSCRIPTION TAB COMPONENTS ---

interface SubscriptionCardProps {
    type: 'Community' | 'Estate';
    isSubscribed: boolean;
    onSubscribe: () => void;
    userRole: UserRole;
    members: { id: string; fullName: string; avatarUrl: string; }[];
    hubs: { id: string; name: string; }[];
    showToast: (message: string, type?: ToastMessage['type']) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ type, isSubscribed, onSubscribe, userRole, members, hubs, showToast }) => {
    const [selectedHubId, setSelectedHubId] = useState<string>(hubs[0]?.id || '');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    
    const handleMemberSelect = (memberId: string) => {
        setSelectedMembers(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
    };
    
    const handleSubscribeForMembers = () => {
        showToast(`Successfully subscribed for ${selectedMembers.length} ${type} members!`);
        setSelectedMembers([]);
    };
    
    return (
        <Card>
             <h3 className="text-xl font-bold mb-6 flex items-center dark:text-dark-text-primary"><CreditCardIcon className="h-6 w-6 mr-3 text-brand-primary dark:text-dark-primary" />Your {type} Platform Subscription</h3>
             {isSubscribed ? (
                 <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-between">
                     <div className="flex items-center">
                        <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400 mr-4" />
                        <div>
                            <p className="font-bold text-green-800 dark:text-green-300">Your {type} Subscription is Active</p>
                            <p className="text-sm text-green-700 dark:text-green-400">Next renewal: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <Button variant="secondary">Manage</Button>
                 </div>
             ) : (
                 <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-bold text-yellow-800 dark:text-yellow-300">No Active {type} Subscription</p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">Subscribe to unlock all {type.toLowerCase()} platform features.</p>
                     </div>
                     <Button onClick={onSubscribe}>Subscribe Annually - ₦50,000</Button>
                 </div>
             )}

            {userRole === UserRole.PARTNER && (
                <div className="mt-6 pt-6 border-t dark:border-dark-border">
                    <h3 className="text-xl font-bold mb-6 flex items-center dark:text-dark-text-primary"><UserGroupIcon className="h-6 w-6 mr-3 text-brand-primary dark:text-dark-primary" />Subscribe for {type} Members</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <select className="md:col-span-2 w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" value={selectedHubId} onChange={e => setSelectedHubId(e.target.value)}>
                            {hubs.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                        </select>
                        <Button onClick={handleSubscribeForMembers} disabled={selectedMembers.length === 0}>Subscribe for {selectedMembers.length} Members</Button>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-2 border p-2 rounded-md dark:border-dark-border">
                        {members.map(member => (
                            <label key={member.id} className="flex items-center p-2 bg-gray-50 dark:bg-dark-surface/50 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                                <input type="checkbox" checked={selectedMembers.includes(member.id)} onChange={() => handleMemberSelect(member.id)} className="h-4 w-4 rounded mr-3"/>
                                <img src={member.avatarUrl} alt={member.fullName} className="h-8 w-8 rounded-full mr-3"/>
                                <span className="font-medium dark:text-dark-text-secondary">{member.fullName}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};

const mockEstateMembersForSub = [
    { id: 'em1', fullName: 'John Doe', avatarUrl: 'https://picsum.photos/seed/em1/48/48' },
    { id: 'em2', fullName: 'Alice Williams', avatarUrl: 'https://picsum.photos/seed/em2/48/48' },
    { id: 'em4', fullName: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/em4/48/48' },
];
const mockEstates = [{id: 'demo', name: 'Demo Estate'}, {id: 'prime', name: 'Prime Gardens Estate'}];
const mockCommunityMembersForSub = mockFullCommunities.demo.members.map(m => ({ id: m.id, fullName: m.fullName, avatarUrl: m.avatarUrl }));
const mockCommunities = [{ id: mockFullCommunities.demo.id, name: mockFullCommunities.demo.name }];

const PlatformSubscriptionTab: React.FC<{
    subscriptions: UserSubscriptions;
    setSubscriptions: React.Dispatch<React.SetStateAction<UserSubscriptions>>;
    userRole: UserRole;
    showToast: (message: string, type?: ToastMessage['type']) => void;
}> = ({ subscriptions, setSubscriptions, userRole, showToast }) => {
    
    return (
        <div className="space-y-6">
            <SubscriptionCard
                type="Community"
                isSubscribed={subscriptions.community}
                onSubscribe={() => {
                    setSubscriptions(s => ({ ...s, community: true }));
                    showToast('Community subscription activated!', 'success');
                }}
                userRole={userRole}
                members={mockCommunityMembersForSub}
                hubs={mockCommunities}
                showToast={showToast}
            />
            <SubscriptionCard
                type="Estate"
                isSubscribed={subscriptions.estate}
                onSubscribe={() => {
                    setSubscriptions(s => ({ ...s, estate: true }));
                    showToast('Estate subscription activated!', 'success');
                }}
                userRole={userRole}
                members={mockEstateMembersForSub}
                hubs={mockEstates}
                showToast={showToast}
            />
        </div>
    );
};

const VerificationTab: React.FC<{ showToast: (message: string, type?: ToastMessage['type']) => void; }> = ({ showToast }) => {
    const [kycStatus, setKycStatus] = useState<KYCStatus>('Unverified');
    const [rejectionNotes, setRejectionNotes] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setKycStatus('Pending');
        showToast('Your verification documents have been submitted for review.', 'info');
    };

    const renderStatusContent = () => {
        switch (kycStatus) {
            case 'Verified':
                return (
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                        <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <h4 className="font-bold text-lg text-green-800 dark:text-green-300">You are Verified!</h4>
                        <p className="text-sm text-green-700 dark:text-green-400">You have full access to all financial features on the platform.</p>
                    </div>
                );
            case 'Pending':
                 return (
                    <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                        <ClockIcon className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                        <h4 className="font-bold text-lg text-yellow-800 dark:text-yellow-300">Submission Under Review</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">Your documents are being reviewed by our team. This usually takes 1-2 business days.</p>
                    </div>
                );
            case 'Rejected':
            case 'Unverified':
            default:
                return (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {kycStatus === 'Rejected' && (
                             <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <div className="flex items-start">
                                    <XCircleIcon className="h-6 w-6 text-red-500 mr-3 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-red-800 dark:text-red-300">Submission Rejected</h4>
                                        <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                                            {rejectionNotes || "Your previous submission could not be verified. Please review the requirements and submit again."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">ID Type</label>
                                <select className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required>
                                    <option>National ID Card (NIN Slip)</option>
                                    <option>Driver's License</option>
                                    <option>International Passport</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">ID Number</label>
                                <input type="text" placeholder="Enter ID Number" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Upload ID Document</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-border border-dashed rounded-md">
                                <div className="space-y-1 text-center"><ArrowUpOnSquareIcon className="mx-auto h-12 w-12 text-gray-400" /><p className="text-sm text-gray-600 dark:text-dark-text-secondary"><span className="font-medium text-brand-primary">Click to upload</span></p><p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p></div>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Upload Proof of Address</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-border border-dashed rounded-md">
                                <div className="space-y-1 text-center"><ArrowUpOnSquareIcon className="mx-auto h-12 w-12 text-gray-400" /><p className="text-sm text-gray-600 dark:text-dark-text-secondary"><span className="font-medium text-brand-primary">Click to upload</span></p><p className="text-xs text-gray-500">Utility Bill, Bank Statement (last 3 months)</p></div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4"><Button type="submit">Submit for Verification</Button></div>
                    </form>
                );
        }
    }
    
    return (
        <Card>
            <h3 className="text-xl font-bold mb-6 flex items-center dark:text-dark-text-primary"><IdentificationIcon className="h-6 w-6 mr-3 text-brand-primary dark:text-dark-primary" />Identity Verification (KYC)</h3>
            {renderStatusContent()}
        </Card>
    );
};


interface ProfileProps {
    userRole: UserRole;
    userSubscriptions: UserSubscriptions;
    setUserSubscriptions: React.Dispatch<React.SetStateAction<UserSubscriptions>>;
    showToast: (message: string, type?: ToastMessage['type']) => void;
}

export const Profile: React.FC<ProfileProps> = ({ userRole, userSubscriptions, setUserSubscriptions, showToast }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'applications' | 'subscription' | 'verification'>('info');

    const isSubscribed = userSubscriptions.community || userSubscriptions.estate;

    const TabButton: React.FC<{tab: string, label: string}> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${activeTab === tab ? 'bg-brand-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card>
                <div className="flex flex-col md:flex-row items-center">
                    <img
                        src="https://picsum.photos/seed/user/128/128"
                        alt="User Avatar"
                        className="h-32 w-32 rounded-full mb-4 md:mb-0 md:mr-8 border-4 border-brand-surface dark:border-dark-surface shadow-md"
                    />
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold dark:text-dark-text-primary">John Doe</h2>
                        <p className="text-md text-gray-500 dark:text-dark-text-secondary">Community Member since Jan 2022</p>
                        <div className="mt-4">
                            <Button variant="secondary">Edit Profile</Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-dark-surface/50 rounded-lg overflow-x-auto">
                <TabButton tab="info" label="Personal Info" />
                <TabButton tab="verification" label="Verification" />
                {userRole !== UserRole.ADMINISTRATOR && <TabButton tab="subscription" label="Subscription" />}
                <TabButton tab="applications" label="Applications" />
            </div>

            <div>
                {activeTab === 'info' && <PersonalInfoTab isSubscribed={isSubscribed} />}
                {activeTab === 'verification' && <VerificationTab showToast={showToast} />}
                {activeTab === 'subscription' && userRole !== UserRole.ADMINISTRATOR && <PlatformSubscriptionTab subscriptions={userSubscriptions} setSubscriptions={setUserSubscriptions} userRole={userRole} showToast={showToast} />}
                {activeTab === 'applications' && <ApplicationsTab />}
            </div>
        </div>
    );
};