export type UserRole = 'User' | 'Partner' | 'Administrator';

export type AppView =
    | 'DASHBOARD'
    | 'ESTATE'
    | 'COMMUNITY'
    | 'PROFILE'
    | 'WALLETS'
    | 'MARKETPLACE'
    | 'MY_LISTINGS'
    | 'SETTINGS'
    | 'SUPPORT'
    | 'ADMIN_PANEL'
    | 'CREATE_HUB'
    | 'VENDOR_PROFILE'
    | 'INBOX';

export interface Wallet {
    id: string;
    currency: string;
    balance: number;
    icon: any; // Replace with appropriate type for Svelte components
    color: string;
}

export interface Transaction {
    id: string;
    type: 'Credit' | 'Debit';
    description: string;
    amount: number;
    date: string;
    status: 'Completed' | 'Pending' | 'Failed';
    details?: {
        [key: string]: string;
    };
}

export interface VirtualCard {
    id: string;
    vendor: 'Visa' | 'Mastercard';
    cardNumber: string;
    expiry: string;
    cvv: string;
    isFrozen: boolean;
    balance: number;
    billingAddress: {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
}

export interface PollOption {
    text: string;
    votes: number;
}

export interface Post {
    id: string;
    author: string;
    authorAvatar: string;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    reposts: number;
    poll?: {
        question: string;
        options: PollOption[];
        endDate: string; // ISO string for poll closing time
        votedBy: string[]; // Array of user IDs who have voted
    };
    visibility?: 'members_only' | 'members_and_occupants';
}

export type PaymentStatus = 'Paid' | 'Unpaid' | 'Overdue';

export interface MemberPaymentStatus {
    feeId: string;
    status: PaymentStatus;
}

export interface LandHolding {
    id: string;
    name: string;
    value: number;
    location: string;
    details: Record<string, string>;
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
}

export interface AppSettings {
    theme: 'light' | 'dark' | 'system';
    fontSize: 'sm' | 'base' | 'lg';
}

export interface AdPricing {
    duration: number; // in days
    price: number;
}

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface CreationRequest {
    id: string;
    type: 'Community' | 'Estate';
    name: string;
    applicantName: string;
    applicantEmail: string;
    dateSubmitted: string;
    status: RequestStatus;
    details: Record<string, any>;
}

export interface KYCSubmission {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    idType: string;
    idNumber: string;
    idDocumentUrl: string;
    addressProofUrl: string;
    dateSubmitted: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export type ListingCategory = 'Properties' | 'Assets' | 'Services';

export interface Listing {
    id: string;
    title: string;
    category: ListingCategory;
    price: number;
    location: string;
    images: string[];
    description: string;
    vendorName: string;
    vendorId: string;
    isPaid: boolean;
    dateListed: string;
    status: 'Active' | 'Pending' | 'Paused' | 'Sold' | 'Rejected';
    views: number;
    clicks: number;
    boostEndDate?: string;
}

export interface Vendor {
    id: string;
    name: string;
    status: 'Active' | 'Suspended';
    listingsCount: number;
}

export interface UserSubscriptions {
    community: boolean;
    estate: boolean;
}

export interface ManagedUser {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    subscriptions: {
        community: { subscribed: boolean; date?: string };
        estate: { subscribed: boolean; date?: string };
    };
}

export interface SubscriptionPricing {
    community: {
        monthly: number;
        annually: number;
    };
    estate: {
        monthly: number;
        annually: number;
    };
}
// ViewKey kept for compatibility
export type ViewKey = AppView;
