
import React from 'react';
import { CreationRequest, KYCSubmission, Vendor, Listing, ManagedUser, GlobalAd, Post, PropertyHolding, OtherHolding, Wallet, Transaction, VirtualCard, PayoutAccount, SupportTicket, UserConversation, CommunityInfo, LoanProduct, PiggyProduct, LoanApplication, PropertyForSale, CommunityTransaction, EstateInfo, EstateMember, Amenity, Incident, EstateFee, BillPaymentStatus, Occupant, Post as EstatePost, EstateEvent, DueFrequency, CommunityMember, PaymentStatus } from './types';
import { CurrencyDollarIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { pastDate, futureDate, generateCardNumber, generateCVV, generateExpiry, generateMembershipNumber } from './utils';

// FIX: Define projectStartDate to be used in mock project data.
const projectStartDate = new Date();
projectStartDate.setMonth(projectStartDate.getMonth() - 2);

// --- Mock Data from App.tsx ---
export const initialRequests: CreationRequest[] = [
    { id: 'REQ001', type: 'Community', name: 'Sunshine Cooperative', applicantName: 'Diana Prince', applicantEmail: 'diana@example.com', dateSubmitted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending', details: { regNumber: 'RC123456', country: 'Nigeria', state: 'Lagos', certificate: 'cert.pdf' } },
    { id: 'REQ002', type: 'Estate', name: 'Golden Gates Estate', applicantName: 'Bruce Wayne', applicantEmail: 'bruce@example.com', dateSubmitted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending', details: { address: '1007 Mountain Drive, Gotham', proof: 'proof_of_ownership.pdf' } },
    { id: 'REQ003', type: 'Community', name: 'Future Investments', applicantName: 'John Doe', applicantEmail: 'john.doe@example.com', dateSubmitted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), status: 'Approved', details: { regNumber: 'RC987654', country: 'Nigeria', state: 'Abuja', certificate: 'cert2.pdf' } },
];

export const initialKycSubmissions: KYCSubmission[] = [
    { id: 'KYC001', userId: 'd_user1', userName: 'Charles Xavier', userAvatar: 'https://picsum.photos/seed/d-user1/48/48', idType: "Driver's License", idNumber: 'DL12345678', idDocumentUrl: 'doc.pdf', addressProofUrl: 'proof.pdf', dateSubmitted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending' },
    { id: 'KYC002', userId: 'em2', userName: 'Alice Williams', userAvatar: 'https://picsum.photos/seed/em2/48/48', idType: 'Passport', idNumber: 'A12345678', idDocumentUrl: 'doc.pdf', addressProofUrl: 'proof.pdf', dateSubmitted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending' }
];

export const initialVendors: Vendor[] = [
  { id: 'vendor1', name: 'Prime Properties', status: 'Active', listingsCount: 1 },
  { id: 'vendor2', name: 'John Doe', status: 'Active', listingsCount: 2 },
  { id: 'vendor3', name: 'Dev Solutions', status: 'Active', listingsCount: 1 },
  { id: 'vendor4', name: 'Partner', status: 'Active', listingsCount: 1 },
  { id: 'vendor5', name: 'Jane Smith', status: 'Suspended', listingsCount: 1 },
];

export const initialListings: Listing[] = [
    { id: 'L001', title: 'Luxury Villa in Lekki', category: 'Properties', price: 120000000, location: 'Lekki, Lagos', images: ['https://picsum.photos/seed/prop1/400/300', 'https://picsum.photos/seed/prop1-2/400/300', 'https://picsum.photos/seed/prop1-3/400/300'], description: 'Spacious 5-bedroom villa with a pool, modern kitchen, and a serene environment perfect for families. Comes with a 2-car garage and a beautiful garden. Recently renovated with top-quality materials.', vendorName: 'Prime Properties', vendorId: 'vendor1', isPaid: true, dateListed: '2023-11-01T10:00:00Z', status: 'Active', views: 12500, clicks: 830 },
    { id: 'L002', title: '2022 Toyota Camry', category: 'Assets', price: 15000000, location: 'Ikeja, Lagos', images: ['https://picsum.photos/seed/asset1/400/300'], description: 'Barely used 2022 Toyota Camry, automatic transmission, in perfect condition with only 5,000 miles. Clean title and full service history available.', vendorName: 'John Doe', vendorId: 'vendor2', isPaid: true, dateListed: '2023-10-28T14:30:00Z', boostEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), status: 'Active', views: 8200, clicks: 310 },
    { id: 'L003', title: 'Web Development Services', category: 'Services', price: 500000, location: 'Remote', images: ['https://picsum.photos/seed/serv1/400/300'], description: 'Professional web development for your business. We build responsive, fast, and SEO-friendly websites tailored to your needs.', vendorName: 'Dev Solutions', vendorId: 'vendor3', isPaid: false, dateListed: '2023-11-02T09:00:00Z', status: 'Pending', views: 500, clicks: 12 },
    { id: 'L004', title: 'Plot of Land in Epe', category: 'Properties', price: 5000000, location: 'Epe, Lagos', images: ['https://picsum.photos/seed/prop2/400/300'], description: 'A great investment for the future. Full plot of land in a rapidly developing area of Epe, with gazette title.', vendorName: 'Partner', vendorId: 'vendor4', isPaid: false, dateListed: '2023-10-15T12:00:00Z', status: 'Active', views: 25000, clicks: 1500 },
    { id: 'L005', title: 'Office Furniture Set', category: 'Assets', price: 750000, location: 'Victoria Island, Lagos', images: ['https://picsum.photos/seed/asset2/400/300'], description: 'Complete set for a small office, including 4 desks, chairs, and filing cabinets. All in excellent condition.', vendorName: 'Jane Smith', vendorId: 'vendor5', isPaid: true, dateListed: '2023-11-03T11:00:00Z', status: 'Pending', views: 100, clicks: 5 },
    { id: 'L006', title: 'Modern 2-Bedroom Apartment', category: 'Properties', price: 65000000, location: 'Yaba, Lagos', images: ['https://picsum.photos/seed/prop3/400/300'], description: 'Newly renovated 2-bedroom apartment in a secure complex. Perfect for young professionals or a small family.', vendorName: 'John Doe', vendorId: 'vendor2', isPaid: false, dateListed: '2023-10-20T18:00:00Z', status: 'Paused', views: 8200, clicks: 310 },
];

export const initialManagedUsers: ManagedUser[] = [
  { id: 'user-1', name: 'John Doe', email: 'john.d@example.com', avatarUrl: 'https://picsum.photos/seed/user-1/48/48', subscriptions: { community: { subscribed: true, date: pastDate(30) }, estate: { subscribed: false } } },
  { id: 'user-2', name: 'Jane Smith', email: 'jane.s@example.com', avatarUrl: 'https://picsum.photos/seed/user-2/48/48', subscriptions: { community: { subscribed: true, date: pastDate(90) }, estate: { subscribed: true, date: pastDate(15) } } },
  { id: 'user-3', name: 'Peter Jones', email: 'peter.j@example.com', avatarUrl: 'https://picsum.photos/seed/user-3/48/48', subscriptions: { community: { subscribed: false }, estate: { subscribed: false } } },
  { id: 'user-4', name: 'Mary Williams', email: 'mary.w@example.com', avatarUrl: 'https://picsum.photos/seed/user-4/48/48', subscriptions: { community: { subscribed: false }, estate: { subscribed: true, date: pastDate(60) } } },
  { id: 'user-5', name: 'David Brown', email: 'david.b@example.com', avatarUrl: 'https://picsum.photos/seed/user-5/48/48', subscriptions: { community: { subscribed: true, date: pastDate(5) }, estate: { subscribed: false } } },
  { id: 'user-6', name: 'Susan Davis', email: 'susan.d@example.com', avatarUrl: 'https://picsum.photos/seed/user-6/48/48', subscriptions: { community: { subscribed: false }, estate: { subscribed: false } } },
  { id: 'd_user1', name: 'Charles Xavier', email: 'charles.x@example.com', avatarUrl: 'https://picsum.photos/seed/d-user1/48/48', subscriptions: { community: { subscribed: true, date: pastDate(120) }, estate: { subscribed: true, date: pastDate(120) } } },
  { id: 'em2', name: 'Alice Williams', email: 'alice.w@example.com', avatarUrl: 'https://picsum.photos/seed/em2/48/48', subscriptions: { community: { subscribed: false }, estate: { subscribed: true, date: pastDate(45) } } },
];


// --- Mock Data from AdminPanel.tsx ---
export const initialGlobalAds: GlobalAd[] = [
    { id: 'GAD001', title: 'Upgrade to Partner', content: 'Unlock advanced management tools by upgrading your account.', imageUrl: 'https://picsum.photos/seed/ad1/400/200', targetUrl: '#/profile/subscription', status: 'Active', impressions: 12540, clicks: 830 },
    { id: 'GAD002', title: 'New Marketplace Feature', content: 'You can now create listings for services. Check it out!', imageUrl: 'https://picsum.photos/seed/ad2/400/200', targetUrl: '#/marketplace', status: 'Paused', impressions: 5600, clicks: 120 },
];


// --- Mock Data from Dashboard.tsx ---
export const dashboardChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

export const mockGlobalPosts: Post[] = [
    {
        id: 'g1',
        author: 'Global Admin',
        authorAvatar: 'https://picsum.photos/seed/g-admin/48/48',
        content: "Welcome to the global feed! Posts here are visible to everyone, regardless of community.",
        timestamp: '1d ago',
        likes: 150,
        comments: 23,
        reposts: 11,
    },
];

export const upcomingBirthdays = [
    { name: 'Alice Johnson', date: 'Oct 28', avatar: 'https://picsum.photos/seed/alice/40/40' },
    { name: 'Bob Williams', date: 'Nov 2', avatar: 'https://picsum.photos/seed/bob/40/40' },
    { name: 'Diana Prince', date: 'Nov 5', avatar: 'https://picsum.photos/seed/diana/40/40' },
];

export const mockUserProperties: PropertyHolding[] = [
    {id: 'ph1', propertyId: 'EPROP01', propertyName: 'Demo Estate 4-Bed Duplex', estateId: 'demo', variantName: 'Standard Unit', units: 1},
    {id: 'ph2', propertyId: 'PROP001', propertyName: 'Sunshine Villa Plots', estateId: 'community-owned-estate', variantName: 'Full Plot', units: 2},
];

export const mockGlobalAd: GlobalAd = {
    id: 'GAD001',
    title: 'Upgrade to a Partner Account',
    content: 'Unlock advanced management tools, create unlimited listings, and get priority support. Upgrade your plan today!',
    imageUrl: 'https://picsum.photos/seed/ad-upgrade/400/400',
    targetUrl: '#', // In a real app this would link to the subscription page
    status: 'Active',
    impressions: 1000,
    clicks: 50,
};

export const mockOtherHoldings: OtherHolding[] = [
    { id: 'oh1', name: 'Beachfront Property in Lekki', shortDescription: 'Vacation rental property.', longDescription: 'A beautiful 3-bedroom beachfront property located in Lekki Phase 1, perfect for weekend getaways and generating rental income.', value: 250000000, images: ['https://picsum.photos/seed/oh1-1/600/400', 'https://picsum.photos/seed/oh1-2/600/400', 'https://picsum.photos/seed/oh1-3/600/400'] },
    { id: 'oh2', name: 'Commercial Land in Ikeja', shortDescription: 'Undeveloped land for commercial use.', longDescription: '2 acres of prime commercial land located in the industrial area of Ikeja. Zoned for mixed-use development.', value: 450000000, images: ['https://picsum.photos/seed/oh2-1/600/400'] }
];


// --- Mock Data from Wallets.tsx ---
const UsdtIcon = () => (
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: "h-6 w-6", viewBox: "0 0 24 24", fill: "currentColor" },
        React.createElement('path', { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2.34c1.1.2 1.95.83 2.45 1.66h-1.9c-.39-.55-1.02-.8-1.55-.8s-1.16.25-1.55.8h-1.9c.5-1.3 1.85-2-3.45-2V7h-2v2h-2V7z M8.55 12.5c-.5.83-1.35 1.46-2.45 1.66V15h2v2h2v-2h2v-2.34c-1.1-.2-1.95-.83-2.45-1.66h1.9c.39.55 1.02.8 1.55.8s1.16-.25-1.55.8h1.9c-.5 1.3-1.85 2-3.45 2V17h2v-2h2v-2h-3.45z" })
    )
);

export const initialWallets: Wallet[] = [
  { id: 'naira', currency: 'Naira', balance: 500000, icon: React.createElement(CurrencyDollarIcon, { className: "h-6 w-6" }), color: 'blue' },
  { id: 'dollar', currency: 'Dollar', balance: 250.00, icon: React.createElement(CurrencyDollarIcon, { className: "h-6 w-6" }), color: 'green' },
  { id: 'usdt', currency: 'USDT', balance: 1250.75, icon: React.createElement(UsdtIcon), color: 'yellow' },
  { id: 'card', currency: 'Card', balance: 0, icon: React.createElement(CreditCardIcon, { className: "h-6 w-6" }), color: 'indigo' },
];

export const mockTransactions: Transaction[] = [
  { id: 'TXN741852', type: 'Credit', description: 'Funded from Wema Bank', amount: 150000, date: pastDate(30), status: 'Completed', details: { "Payment Method": "Bank Transfer", "Sender": "John Doe" } },
  { id: 'TXN951753', type: 'Debit', description: 'Project Alpha Investment', amount: 75000, date: pastDate(25), status: 'Completed', details: { "Project": "Project Alpha", "Recipient": "Community Wallet" } },
  { id: 'TXN123456', type: 'Credit', description: 'Salary Deposit', amount: 350000, date: pastDate(15), status: 'Completed', details: { "Sender": "Creeb Inc." } },
  { id: 'TXN789012', type: 'Debit', description: 'Marketplace Purchase: 2022 Toyota Camry', amount: 125000, date: pastDate(12), status: 'Pending', details: { "Item": "2022 Toyota Camry", "Vendor": "John Doe" } },
  { id: 'TXN345678', type: 'Debit', description: 'Airtime Purchase', amount: 5000, date: pastDate(10), status: 'Completed', details: { "Network": "MTN", "Recipient": "+2348012345678" } },
  { id: 'TXN901234', type: 'Credit', description: 'Loan Payout: Emergency Loan', amount: 50000, date: pastDate(5), status: 'Completed', details: { "Loan ID": "LN001" } },
  { id: 'TXN567890', type: 'Debit', description: 'Subscription Fee: Community', amount: 50000, date: pastDate(2), status: 'Completed', details: { "Subscription": "Community Annual" } },
];

export const mockCardTransactions: Transaction[] = [
  { id: 'CTX-C-001', type: 'Debit', description: 'Amazon Purchase', amount: 49.99, date: pastDate(5), status: 'Completed', details: { "Merchant": "Amazon.com", "Category": "Shopping" } },
  { id: 'CTX-C-002', type: 'Debit', description: 'Netflix Subscription', amount: 15.49, date: pastDate(10), status: 'Completed', details: { "Merchant": "Netflix", "Category": "Entertainment" } },
  { id: 'CTX-C-003', type: 'Credit', description: 'Refund from Target', amount: 25.00, date: pastDate(12), status: 'Completed', details: { "Merchant": "Target", "Category": "Refund" } },
  { id: 'CTX-C-004', type: 'Debit', description: 'Uber Ride', amount: 22.50, date: pastDate(15), status: 'Completed', details: { "Merchant": "Uber", "Category": "Transport" } },
  { id: 'CTX-C-005', type: 'Debit', description: 'Starbucks Coffee', amount: 5.75, date: pastDate(16), status: 'Completed', details: { "Merchant": "Starbucks", "Category": "Food & Drink" } },
];

export const mockPayoutAccounts: PayoutAccount[] = [
    { id: 'acc1', bankName: 'GTBank', accountNumber: '0123456789', accountName: 'John Doe' },
    { id: 'acc2', bankName: 'Kuda Bank', accountNumber: '0987654321', accountName: 'John Doe' },
    { id: 'usd_acc1', bankName: 'Chase Bank', accountNumber: '9876543210', accountName: 'John Doe' },
];

export const defaultBillingAddress = {
    line1: '123 Creeb Lane',
    city: 'Innovation City',
    state: 'Lagos',
    postalCode: '100001',
    country: 'Nigeria',
};

export const initialCards: VirtualCard[] = [
    { id: 'VC-1', vendor: 'Visa', cardNumber: generateCardNumber(), expiry: generateExpiry(), cvv: generateCVV(), isFrozen: false, balance: 150.25, billingAddress: defaultBillingAddress },
    { id: 'VC-2', vendor: 'Mastercard', cardNumber: generateCardNumber(), expiry: generateExpiry(), cvv: generateCVV(), isFrozen: true, balance: 25.50, billingAddress: defaultBillingAddress },
];


// --- Mock Data from Support.tsx ---
export const initialSupportTickets: SupportTicket[] = [
    {
        id: 'TICKET001',
        contactName: 'Creeb Support',
        destination: 'Creeb',
        lastMessage: "You're welcome! Let us know if you need anything else.",
        lastMessageTime: '10:45 AM',
        unreadCount: 0,
        messages: [
            { id: 'MSG001', sender: 'support', text: 'Hello John, welcome to Creeb Support! How can we help you today?', timestamp: '10:40 AM' },
            { id: 'MSG002', sender: 'user', text: 'Hi, I just wanted to test out the support feature.', timestamp: '10:42 AM' },
            { id: 'MSG003', sender: 'support', text: "No problem at all! Everything seems to be working correctly. You're welcome! Let us know if you need anything else.", timestamp: '10:45 AM' },
        ],
        status: 'Closed',
        submittedBy: 'user123',
    },
    {
        id: 'TICKET002',
        contactName: 'Demo Community Support',
        destination: 'Community',
        hubId: 'demo',
        lastMessage: 'The meeting is scheduled for 2 PM tomorrow.',
        lastMessageTime: 'Yesterday',
        unreadCount: 1,
        messages: [
            { id: 'MSG004', sender: 'support', text: 'The meeting is scheduled for 2 PM tomorrow.', timestamp: 'Yesterday' },
        ],
        status: 'Open',
        submittedBy: 'user456',
    },
];


// --- Mock Data from Profile.tsx ---
export const mockApplications: CreationRequest[] = [
    { id: 'APP001', type: 'Community', name: 'My New Coop', applicantName: 'John Doe', applicantEmail: 'john.doe@example.com', dateSubmitted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Pending', details: {} },
    { id: 'APP002', type: 'Estate', name: 'My Dream Estate', applicantName: 'John Doe', applicantEmail: 'john.doe@example.com', dateSubmitted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), status: 'Approved', details: {} },
    { id: 'APP003', type: 'Community', name: 'Future Investments', applicantName: 'John Doe', applicantEmail: 'john.doe@example.com', dateSubmitted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), status: 'Rejected', details: { }, adminNotes: 'Registration certificate was not valid.' },
];


// --- Mock Data from Inbox.tsx ---
export const initialConversations: UserConversation[] = [
    {
        id: 'CONV001',
        participantId: 'd_admin1',
        participantName: 'Demo Partner',
        participantAvatar: 'https://picsum.photos/seed/d-admin1/48/48',
        lastMessage: "Okay, sounds good. I'll review the project details.",
        lastMessageTime: '11:30 AM',
        unreadCount: 0,
        messages: [
            { id: 'UMSG001', senderId: 'd_admin1', text: 'Hi John, can you take a look at the latest project update?', timestamp: '11:28 AM' },
            { id: 'UMSG002', senderId: 'currentUser', text: "Sure, I'll check it out now.", timestamp: '11:29 AM' },
            { id: 'UMSG003', senderId: 'd_admin1', text: "Okay, sounds good. I'll review the project details.", timestamp: '11:30 AM' },
        ],
    },
    {
        id: 'CONV002',
        participantId: 'd_user2',
        participantName: 'Scott Summers',
        participantAvatar: 'https://picsum.photos/seed/d-user2/48/48',
        lastMessage: 'Got it, thanks for the heads up!',
        lastMessageTime: 'Yesterday',
        unreadCount: 2,
        messages: [
            { id: 'UMSG004', senderId: 'currentUser', text: "Hey Scott, just a reminder about the monthly dues.", timestamp: 'Yesterday' },
            { id: 'UMSG005', senderId: 'd_user2', text: 'Got it, thanks for the heads up!', timestamp: 'Yesterday' },
        ],
    },
];

// --- Mock Data from Community.tsx ---
const memberStatuses = ['Active', 'Suspended', 'Invited'] as const;
const paymentStatuses = ['Paid', 'Unpaid', 'Overdue'] as const;

// FIX: Define and export mockStatementData for use in Dashboard.tsx.
export const mockStatementData = {
  openingBalance: 100000,
  walletTransactions: mockTransactions.slice(0, 5), // take a few
  cardTransactions: mockCardTransactions,
  community: {
    logo: 'https://picsum.photos/seed/demo/48/48',
    name: 'Demo Community',
    address: '123 Community Hub, Innovation City',
    loans: [
      {id: 'L001', type: 'Emergency Loan', amount: 50000, interest: 15, maturity: futureDate(320)},
    ],
    projects: [
      {id: 'PROJ001', name: 'Project Phoenix', contribution: 100000, status: 'Ongoing' as 'Ongoing' | 'Completed'},
    ],
    savings: [
      {id: 'S001', productName: 'Flex Save', principal: 150000, interestRate: 10, maturity: futureDate(265)},
    ],
  },
  estate: {
    logo: 'https://picsum.photos/seed/estate-demo/48/48',
    name: 'Demo Estate',
  },
  invoices: [
    {id: 'INV001', description: 'Annual Membership Dues', amount: 5500, date: pastDate(30), entity: 'community' as 'community' | 'estate'},
    {id: 'INV002', description: 'Monthly Service Charge', amount: 25000, date: pastDate(5), entity: 'estate' as 'community' | 'estate'},
  ]
};


export const mockLoanProducts: LoanProduct[] = [
    { id: 'LP001', name: 'Emergency Loan', description: 'Quick access funds for emergencies, up to ₦100,000.', interestRate: 15, maxAmount: 100000, maxTenure: 12 },
    { id: 'LP002', name: 'Business Starter Loan', description: 'Seed capital for your next big idea.', interestRate: 8, maxAmount: 1000000, maxTenure: 36 }
];

export const mockPiggyProducts: PiggyProduct[] = [
    { id: 'PP001', name: 'Flex Save', description: 'Save for short-term goals with competitive interest.', interestRate: 10, minTenure: 3, maxTenure: 12, allowCompounding: true, payoutOptions: ['Auto-Payout', 'Manual'] },
    { id: 'PP002', name: 'Target Builder', description: 'Lock funds for a longer period to get higher returns.', interestRate: 12, minTenure: 12, maxTenure: 48, allowCompounding: true, payoutOptions: ['Auto-Payout', 'Interest-Only'] }
];

export const mockLoanApplications: LoanApplication[] = [
    { id: 'LA001', userId: 'd_user1', userName: 'John Doe', loanProductId: 'LP001', loanProductName: 'Emergency Loan', amount: 50000, tenure: 6, dateSubmitted: pastDate(2), status: 'Pending' },
    { id: 'LA002', userId: 'd_user2', userName: 'Scott Summers', loanProductId: 'LP002', loanProductName: 'Business Starter Loan', amount: 500000, tenure: 24, dateSubmitted: pastDate(5), status: 'Approved' },
];

export const mockCommunityProperties: PropertyForSale[] = [
    { 
        id: 'CPROP01', 
        estateId: 'prime', 
        name: 'Prime Gardens Plots', 
        description: 'Well-located plots of land within the prestigious Prime Gardens Estate, available exclusively to community members.', 
        image: 'https://picsum.photos/seed/cprop1/400/300',
        variants: [
            { id: 'v1', name: 'Full Plot (600sqm)', price: 15000000, availableUnits: 10, paymentType: 'One-off', installments: [], refundOnDefaultPercent: 0 },
            { id: 'v2', name: 'Half Plot (300sqm)', price: 8000000, availableUnits: 20, paymentType: 'One-off', installments: [], refundOnDefaultPercent: 0 }
        ],
        participants: [
            { userId: 'd_user1', fullName: 'John Doe', units: 1, totalContribution: 15000000, joinDate: pastDate(5) }
        ]
    }
];

export const mockTransactionHistory: CommunityTransaction[] = [
    { id: 'CTX001', date: pastDate(1), type: 'Project Investment', description: '10 units investment', amount: 1000, memberId: 'd_user1', memberName: 'John Doe', relatedAssetId: 'PROJ001', relatedAssetName: 'Project Phoenix' },
    { id: 'CTX002', date: pastDate(2), type: 'Fee Payment', description: 'Annual Membership Dues', amount: 5500, memberId: 'd_user2', memberName: 'Scott Summers', relatedAssetId: 'FEE001', relatedAssetName: 'Annual Membership Dues' },
    { id: 'CTX003', date: pastDate(3), type: 'Rubby Sale', description: 'Purchase from Q1 2024 Batch', amount: 2750, memberId: 'd_user3', memberName: 'Jean Grey', relatedAssetId: 'RB002' },
    { id: 'CTX004', date: pastDate(4), type: 'Project Investment', description: '50 units investment', amount: 250000, memberId: 'd_user2', memberName: 'Scott Summers', relatedAssetId: 'PROJ002', relatedAssetName: 'Ocean View Estate' },
    { id: 'CTX005', date: pastDate(5), type: 'Property Sale', description: 'Purchase of Full Plot (600sqm)', amount: 15000000, memberId: 'd_user1', memberName: 'John Doe', relatedAssetId: 'CPROP01', relatedAssetName: 'Prime Gardens Plots' },
    { id: 'CTX006', date: pastDate(6), type: 'Project Investment', description: '20 units investment', amount: 2000, memberId: 'd_user3', memberName: 'Jean Grey', relatedAssetId: 'PROJ001', relatedAssetName: 'Project Phoenix' },
    // Loan and Savings Transactions
    { id: 'CTX_L001', date: pastDate(45), type: 'Loan Disbursement', description: 'Emergency Loan', amount: 50000, memberId: 'd_user1', memberName: 'John Doe', relatedAssetId: 'L001'},
    { id: 'CTX_L002', date: pastDate(15), type: 'Loan Repayment', description: 'Emergency Loan Repayment', amount: 4375, memberId: 'd_user1', memberName: 'John Doe', relatedAssetId: 'L001', details: { principal: 4000, interest: 375 } },
    { id: 'CTX_S001', date: pastDate(100), type: 'Savings Deposit', description: 'Flex Save Initial Deposit', amount: 150000, memberId: 'd_user1', memberName: 'John Doe', relatedAssetId: 'S001'},
    { id: 'CTX_S002', date: pastDate(70), type: 'Savings Deposit', description: 'Flex Save Monthly Top-up', amount: 10000, memberId: 'd_user1', memberName: 'John Doe', relatedAssetId: 'S001'},

    ...Array.from({ length: 15 }, (_, i) => {
        const typeOptions: CommunityTransaction['type'][] = ['Fee Payment', 'Rubby Sale', 'Project Investment', 'Property Sale'];
        const memberOptions = [
            { id: 'd_user1', name: 'John Doe' }, { id: 'd_user2', name: 'Scott Summers' }, { id: 'd_user3', name: 'Jean Grey' }, { id: 'd_admin1', name: 'Diana Prince' }
        ];
        const projectOptions = [
            { id: 'PROJ001', name: 'Project Phoenix' }, { id: 'PROJ002', name: 'Ocean View Estate' }
        ];
        
        const type = typeOptions[i % 4];
        const member = memberOptions[i % memberOptions.length];
        let assetId, assetName;
        if (type === 'Project Investment') {
            const project = projectOptions[i % projectOptions.length];
            assetId = project.id;
            assetName = project.name;
        } else if (type === 'Property Sale') {
            assetId = 'CPROP01';
            assetName = 'Prime Gardens Plots';
        } else if (type === 'Fee Payment') {
            assetId = 'FEE001';
        }

        return {
            id: `CTX_EXTRA_${i}`,
            date: pastDate(7 + i),
            type: type,
            description: `Mock transaction ${i+1}`,
            amount: Math.floor(1000 + Math.random() * 20000),
            memberId: member.id,
            memberName: member.name,
            relatedAssetId: assetId,
            relatedAssetName: assetName
        } as CommunityTransaction;
    })
];

export const mockFullCommunities: Record<string, CommunityInfo> = {
    'demo': {
        id: 'demo', name: 'Demo Community', memberCount: 42, activeProjects: 4, thumbnail: 'https://picsum.photos/seed/demo/200/150',
        membershipNumberFormat: 'DEMO-YY-NNNN',
        privacy: 'public',
        about: {
            description: "This is a fully-featured demo community. Feel free to explore all functionalities like the timeline, member directory, calendar, and management tools (if you are an admin).",
            externalLinks: [{ title: 'Official Website', url: '#' }],
            phoneNumbers: ['+234 800 123 4567'],
            officeAddress: '123 Community Hub, Innovation City',
            officeHours: 'Mon-Fri, 9am - 5pm',
        },
        members: [
            { id: 'd_user1', membershipNumber: 'DEMO-23-0001', fullName: 'John Doe', username: 'johndoe', avatarUrl: 'https://picsum.photos/seed/d-user1/48/48', isPartner: false, role: 'Member', dateJoined: pastDate(30), status: 'Active', email: 'john.doe@example.com', phoneNumber: '+1234567890', birthDate: '1990-01-01', privacySettings: { isPhoneNumberPublic: false, isAddressPublic: false, isBirthYearPublic: true, messagePrivacy: 'members_only', isMembershipNumberPublic: true }, holdings: { lands: [], properties: [{id: 'ph_user1_1', propertyId: 'CPROP01', propertyName: 'Prime Gardens Plots', estateId: 'prime', variantName: 'Full Plot (600sqm)', units: 1}], rubbies: { total: 1200, value: 60000 }, projects: [{ projectId: 'PROJ001', units: 100 }], loans: [{id: 'L001', type: 'Emergency Loan', amount: 50000, amountRepaid: 12500, interestRate: 15, issueDate: pastDate(45), maturityDate: futureDate(320), loanProductId: 'LP001', details: {}, status: 'Active', nextPaymentDueDate: futureDate(15) }], piggyBanks: [{ id: 'S001', productName: 'Flex Save', principal: 150000, interestRate: 10, startDate: pastDate(100), maturityDate: futureDate(265), compounding: true, piggyProductId: 'PP001' }] }, paymentStatuses: [{ feeId: 'FEE001', status: 'Paid' }, { feeId: 'FEE002', status: 'Unpaid' }, { feeId: 'FEE003', status: 'Paid' }] },
            { id: 'd_admin1', membershipNumber: 'DEMO-22-0002', fullName: 'Diana Prince', username: 'diana', avatarUrl: 'https://picsum.photos/seed/d-admin1/48/48', isPartner: true, role: 'Partner', dateJoined: pastDate(365), status: 'Active', email: 'diana.p@example.com', phoneNumber: '+1234567890', birthDate: '1985-03-22', privacySettings: { isPhoneNumberPublic: true, isAddressPublic: true, isBirthYearPublic: true, messagePrivacy: 'anyone', isMembershipNumberPublic: true }, holdings: { lands: [], properties: [], rubbies: { total: 5000, value: 250000 }, projects: [{ projectId: 'PROJ001', units: 500 }], loans: [], piggyBanks: [] }, paymentStatuses: [{ feeId: 'FEE001', status: 'Paid' }, { feeId: 'FEE003', status: 'Paid' }] },
            { id: 'd_user2', membershipNumber: 'DEMO-23-0003', fullName: 'Scott Summers', username: 'scotts', avatarUrl: 'https://picsum.photos/seed/d-user2/48/48', isPartner: false, role: 'Member', dateJoined: pastDate(15), status: 'Active', email: 'scott.s@example.com', phoneNumber: '+1234567890', birthDate: '1992-05-10', privacySettings: { isPhoneNumberPublic: true, isAddressPublic: false, isBirthYearPublic: true, messagePrivacy: 'members_only', isMembershipNumberPublic: false }, holdings: { lands: [], properties: [], rubbies: { total: 500, value: 25000 }, projects: [], loans: [{id: 'L002', type: 'Business Starter Loan', amount: 500000, amountRepaid: 100000, interestRate: 8, issueDate: pastDate(90), maturityDate: futureDate(500), loanProductId: 'LP002', details: {}, status: 'Overdue', nextPaymentDueDate: pastDate(5) }], piggyBanks: [] }, paymentStatuses: [{ feeId: 'FEE001', status: 'Paid' }, { feeId: 'FEE002', status: 'Overdue' }, { feeId: 'FEE003', status: 'Unpaid' }] },
            { id: 'd_user3', membershipNumber: 'DEMO-23-0004', fullName: 'Jean Grey', username: 'jgrey', avatarUrl: 'https://picsum.photos/seed/d-user3/48/48', isPartner: false, role: 'Member', dateJoined: pastDate(90), status: 'Suspended', email: 'jean.g@example.com', phoneNumber: '+1234567890', birthDate: '1991-11-30', privacySettings: { isPhoneNumberPublic: false, isAddressPublic: false, isBirthYearPublic: false, messagePrivacy: 'members_only', isMembershipNumberPublic: false }, holdings: { lands: [], properties: [], rubbies: { total: 100, value: 5000 }, projects: [], loans: [{id: 'L003', type: 'Emergency Loan', amount: 100000, amountRepaid: 20000, interestRate: 15, issueDate: pastDate(120), maturityDate: futureDate(245), loanProductId: 'LP001', details: {}, status: 'Default', nextPaymentDueDate: pastDate(40) }], piggyBanks: [] }, paymentStatuses: [{ feeId: 'FEE001', status: 'Overdue' }, { feeId: 'FEE003', status: 'Overdue' }] },
             // Add more members for pagination demo
            ...Array.from({ length: 20 }, (_, i) => {
                const joinDate = pastDate(Math.random() * 365);
                return {
                    id: `d_user_extra_${i}`,
                    membershipNumber: generateMembershipNumber('DEMO-YY-NNNN', joinDate, i + 4),
                    fullName: `Member ${i + 4}`,
                    username: `member${i + 4}`,
                    avatarUrl: `https://picsum.photos/seed/extra${i}/48/48`,
                    isPartner: false,
                    role: 'Member',
                    dateJoined: joinDate,
                    status: memberStatuses[i % 3],
                    email: `member${i + 4}@example.com`,
                    phoneNumber: '+1234567890',
                    birthDate: '1995-01-01',
                    privacySettings: { isPhoneNumberPublic: false, isAddressPublic: false, isBirthYearPublic: true, messagePrivacy: 'members_only', isMembershipNumberPublic: i % 2 === 0 },
                    holdings: { lands: [], properties: [], rubbies: { total: Math.floor(Math.random()*1000), value: 0 }, projects: [], loans: [], piggyBanks: [] },
                    paymentStatuses: [{ feeId: 'FEE001', status: paymentStatuses[i % 3] }, { feeId: 'FEE003', status: paymentStatuses[i % 3] }]
                } as CommunityMember;
            })
        ],
        events: [
            { id: 'EVT001', title: 'Annual General Meeting', date: futureDate(30), description: 'Discussing yearly performance and future plans.', status: 'Approved', submittedBy: 'Diana Prince' },
            { id: 'EVT002', title: 'Community Picnic', date: futureDate(15), description: 'A fun day out for all members and their families.', status: 'Pending', submittedBy: 'John Doe' },
        ],
        fees: [
            { id: 'FEE001', title: 'Annual Membership Dues', items: [{id: 'i1', name: 'Base Membership Fee', description: 'Mandatory annual fee for all members.', amount: 5000}, {id: 'i2', name: 'Platform Levy', description: 'Contribution to platform maintenance.', amount: 500}], taxRate: 7.5, frequency: DueFrequency.ANNUALLY, type: 'Mandatory', autoInvoiceDay: 1, paymentStructure: 'full' },
            { id: 'FEE002', title: 'Project Phoenix Initial Contribution', items: [{id: 'i3', name: 'Project Phoenix Investment', description: 'Optional contribution for Project Phoenix.', amount: 10000}], frequency: DueFrequency.ONETIME, type: 'Opt-in', deadline: futureDate(10), paymentStructure: 'full' },
            { id: 'FEE003', title: 'New Property Levy (Installments)', items: [{id: 'i4', name: 'Property Levy', description: 'Special levy for new property acquisition.', amount: 100000}], frequency: DueFrequency.ONETIME, type: 'Mandatory', paymentStructure: 'installment', installments: [ { stage: 1, amount: 50000, dueDate: futureDate(30) }, { stage: 2, amount: 50000, dueDate: futureDate(60) } ] }
        ],
        feePayments: [
            { memberId: 'd_user1', feeId: 'FEE001', status: 'Paid' }, { memberId: 'd_user1', feeId: 'FEE002', status: 'Unpaid' },
            { memberId: 'd_admin1', feeId: 'FEE001', status: 'Paid' },
            { memberId: 'd_user2', feeId: 'FEE001', status: 'Paid' }, { memberId: 'd_user2', feeId: 'FEE002', status: 'Overdue' },
            { memberId: 'd_user3', feeId: 'FEE001', status: 'Overdue' },
        ],
        rubbyBatches: [
            { id: 'RB001', name: 'Q4 2023 Batch', price: 50, startDate: pastDate(60), stopDate: pastDate(30), totalVolume: 100000, volumeSold: 85000 },
            { id: 'RB002', name: 'Q1 2024 Batch', price: 55, startDate: pastDate(10), stopDate: futureDate(20), totalVolume: 120000, volumeSold: 30000 },
        ],
        rubbyTransferRequests: [
            { id: 'RTR001', fromMember: 'd_user2', toMember: 'd_user1', amount: 100, date: pastDate(1), status: 'Pending' },
            { id: 'RTR002', fromMember: 'd_user3', toMember: 'd_user1', amount: 50, date: pastDate(2), status: 'Approved' },
        ],
        projects: [
            { 
                id: 'PROJ001', 
                name: 'Project Phoenix', 
                supervisor: 'Diana Prince', 
                projectManager: 'Charles Xavier', 
                category: 'Real Estate', 
                isPublic: true, 
                currency: 'NGN', 
                unitPrice: 10000, 
                totalUnits: 1000000, 
                targetAmount: 100000000,
                minContribution: 10000, 
                enrollmentCloseDate: futureDate(45), 
                isResellable: true, 
                withdrawalNoticeDays: 30, 
                profitModel: 'Reinvest', 
                description: 'A high-yield real estate venture in the heart of the city, aimed at developing luxury apartments.', 
                enrollmentType: 'TargetBased', 
                startDate: pastDate(90), 
                tiers: [], 
                milestones: [
                    { id: 'M1', title: 'Land Acquisition', deadline: pastDate(75), isCompleted: true },
                    { id: 'M2', title: 'Architectural Drawings', deadline: pastDate(60), isCompleted: true },
                    { id: 'M3', title: 'Foundation', deadline: '2025-10-14T00:00:00.000Z', isCompleted: false },
                    { id: 'M4', title: 'Superstructure', deadline: futureDate(60), isCompleted: false },
                ], 
                updates: [
                    { id: 'UPD001', date: pastDate(50), description: 'Geological survey completed.', type: 'Update' },
                    { id: 'UPD004', date: '2025-09-14T00:00:00.000Z', description: 'Minor delay due to weather.', type: 'Delay', delayDuration: '1 week' }
                ],
                financials: [
                    { id: 'FIN001', type: 'Expense', description: 'Land Purchase', amount: 5000000, date: pastDate(80) },
                    { id: 'FIN002', type: 'Expense', description: 'Survey Fees', amount: 250000, date: pastDate(52) },
                    { id: 'FIN003', type: 'Revenue', description: 'Initial Plot Sale', amount: 1500000, date: pastDate(30) },
                ],
                participants: [
                    { userId: 'd_admin1', fullName: 'Diana Prince', units: 500, totalContribution: 50000, joinDate: pastDate(59) },
                    { userId: 'd_user1', fullName: 'John Doe', units: 100, totalContribution: 100000, joinDate: pastDate(58) },
                    { userId: 'd_user2', fullName: 'Scott Summers', units: 250, totalContribution: 250000, joinDate: pastDate(50) },
                    { userId: 'd_user3', fullName: 'Jean Grey', units: 20, totalContribution: 20000, joinDate: pastDate(45) },
                ],
                comments: [
                    {
                        id: 'C1',
                        authorId: 'd_user2',
                        authorName: 'Charles Xavier',
                        authorAvatar: 'https://picsum.photos/seed/d-user2/48/48',
                        content: 'This is looking great! Really excited about the progress.',
                        timestamp: pastDate(1),
                    },
                    {
                        id: 'C2',
                        authorId: 'd_admin1',
                        authorName: 'Demo Partner',
                        authorAvatar: 'https://picsum.photos/seed/d-admin1/48/48',
                        content: 'Just a heads up, there might be a slight delay on the foundation due to unexpected rain.',
                        timestamp: pastDate(2),
                    }
                ]
            },
            { id: 'PROJ002', name: 'Tech Innovators Fund', supervisor: 'Diana Prince', projectManager: 'Bruce Wayne', category: 'Tech Startup', isPublic: true, currency: 'NGN', unitPrice: 5000, totalUnits: 5000, targetAmount: 25000000, minContribution: 50000, enrollmentCloseDate: futureDate(60), isResellable: false, withdrawalNoticeDays: 90, profitModel: 'Payout', description: 'Investing in promising early-stage technology startups.', enrollmentType: 'TargetBased', startDate: projectStartDate.toISOString(), tiers: [], milestones: [], updates: [], financials: [], participants: [] },
        ],
        loanProducts: mockLoanProducts,
        loanApplications: mockLoanApplications,
        piggyProducts: mockPiggyProducts,
        propertiesForSale: mockCommunityProperties,
        rubbyTradingSettings: {
            sellerCommissionRate: 2.5,
            buyerCommissionRate: 0.5,
            tradingMode: 'daily',
            allowedDays: [1, 3, 5], // Mon, Wed, Fri
            startTime: '10:00',
            endTime: '16:00',
        },
        propertyTradingSettings: {
            sellerCommissionRate: 5.0,
            buyerCommissionRate: 1.0,
            tradingMode: 'date_range',
            startDate: pastDate(10),
            endDate: futureDate(20),
        },
        secondaryMarketListings: [
            { id: 'SM001', assetType: 'Rubby', assetId: 'd_admin1', sellerId: 'd_admin1', sellerName: 'Diana Prince', quantity: 1000, pricePerUnit: 52, dateListed: pastDate(1), status: 'Locked', assetName: 'Rubbies' },
            { id: 'SM002', assetType: 'Rubby', assetId: 'd_user2', sellerId: 'd_user2', sellerName: 'Scott Summers', quantity: 200, pricePerUnit: 55, dateListed: pastDate(2), status: 'Listed', assetName: 'Rubbies' },
            { id: 'SM003', assetType: 'Property', assetId: 'CPROP01', variantName: 'Full Plot (600sqm)', sellerId: 'd_user1', sellerName: 'John Doe', quantity: 1, pricePerUnit: 16000000, dateListed: pastDate(3), status: 'Listed', assetName: 'Prime Gardens Plots' },
        ],
        marketTradeHistory: [
            { id: 'TRD001', date: pastDate(1), assetType: 'Rubby', assetName: 'Rubbies', sellerName: 'Diana Prince', buyerName: 'John Doe', quantity: 500, totalValue: 26000, commissionEarned: 650 },
            { id: 'TRD002', date: pastDate(2), assetType: 'Property', assetName: 'Prime Gardens Plots', sellerName: 'Scott Summers', buyerName: 'Jean Grey', quantity: 1, totalValue: 15500000, commissionEarned: 775000 },
            { id: 'TRD003', date: pastDate(3), assetType: 'Rubby', assetName: 'Rubbies', sellerName: 'John Doe', buyerName: 'Diana Prince', quantity: 100, totalValue: 5500, commissionEarned: 137.5 },
        ],
        marketTradeRequests: [
            {
                id: 'MTR001',
                listingId: 'SM001',
                assetType: 'Rubby',
                assetName: 'Rubbies',
                sellerId: 'd_admin1',
                sellerName: 'Diana Prince',
                buyerId: 'd_user2',
                buyerName: 'Scott Summers',
                quantity: 500,
                pricePerUnit: 52,
                totalValue: 26000,
                commission: 780,
                dateInitiated: pastDate(0.5),
                status: 'Pending',
            }
        ],
        transactionHistory: mockTransactionHistory,
    }
};
