import type { ReactNode } from 'react';

export enum UserRole {
  USER = 'User',
  PARTNER = 'Partner',
  ADMINISTRATOR = 'Administrator',
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ESTATE = 'ESTATE',
  COMMUNITY = 'COMMUNITY',
  PROFILE = 'PROFILE',
  WALLETS = 'WALLETS',
  MARKETPLACE = 'MARKETPLACE',
  MY_LISTINGS = 'MY_LISTINGS',
  SETTINGS = 'SETTINGS',
  SUPPORT = 'SUPPORT',
  ADMIN_PANEL = 'ADMIN_PANEL',
  CREATE_HUB = 'CREATE_HUB',
  VENDOR_PROFILE = 'VENDOR_PROFILE',
  INBOX = 'INBOX',
}

export interface Wallet {
  id: string;
  currency: string;
  balance: number;
  icon: ReactNode;
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
    id:string;
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

export interface PropertyHolding {
    id: string;
    propertyId: string;
    propertyName: string;
    estateId: string;
    variantName: string;
    units: number;
}


export interface ProjectHolding {
    id: string;
    name: string;
    contribution: number;
    status: 'Ongoing' | 'Completed';
    details: Record<string, string>;
}

export interface LoanHolding {
    id: string;
    type: string;
    amount: number; // Principal amount
    amountRepaid: number;
    interestRate: number; // Annual percentage rate
    issueDate: string; // ISO String
    maturityDate: string; // ISO String
    details: Record<string, string>;
    loanProductId?: string;
    status: 'Active' | 'Paid' | 'Overdue' | 'Default';
    nextPaymentDueDate: string; // ISO String
}

export interface PiggyHolding {
    id: string;
    productName: string;
    principal: number;
    interestRate: number;
    startDate: string; // ISO String
    maturityDate: string; // ISO String
    compounding: boolean;
    piggyProductId?: string;
}

export interface OtherHolding {
    id: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    value: number;
    images: string[]; // Array of image URLs, max 5
}


export interface CommunityMember {
    id: string;
    membershipNumber?: string;
    fullName: string;
    username: string;
    avatarUrl: string;
    isPartner: boolean; // Replaces isAdmin for clarity
    role: string; // Custom role title e.g., 'Financial Reporter', 'Member'
    dateJoined: string; // ISO String
    status: 'Active' | 'Suspended' | 'Invited';
    paymentStatuses: MemberPaymentStatus[];
    holdings: {
      lands: LandHolding[];
      properties: PropertyHolding[];
      rubbies: { total: number; value: number };
      projects: { projectId: string, units: number }[];
      loans: LoanHolding[];
      piggyBanks: PiggyHolding[];
    };
    // New fields for profile view
    email: string;
    phoneNumber: string;
    birthDate: string; // ISO String for date part
    socialLinks?: {
        twitter?: string;
        linkedin?: string;
    };
    privacySettings: UserPrivacySettings;
}

export interface CommunityAboutInfo {
    description: string;
    externalLinks: { title: string; url: string }[];
    phoneNumbers: string[];
    officeAddress: string;
    officeHours: string;
}

export interface CommunityEvent {
    id: string;
    title: string;
    date: string; // ISO String (e.g., "2023-11-15")
    description: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    submittedBy: string;
}

export enum DueFrequency {
    ONETIME = 'One-time',
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly',
    QUARTERLY = 'Quarterly',
    ANNUALLY = 'Annually',
}

export interface FeeItem {
    id: string;
    name: string;
    description: string;
    amount: number;
}

export interface FeeInstallment {
    stage: number;
    amount: number;
    dueDate: string;
}

export interface CommunityFee {
    id: string;
    title: string;
    items: FeeItem[];
    taxRate?: number; // Optional tax rate in percent
    frequency: DueFrequency;
    type: 'Mandatory' | 'Opt-in';
    deadline?: string; // For one-time dues
    autoInvoiceDay?: number; // For recurrent dues (e.g., 1 for 1st of month)
    paymentStructure: 'full' | 'installment';
    installments?: FeeInstallment[];
}

export interface FeePaymentRecord {
    memberId: string;
    feeId: string;
    status: PaymentStatus;
}

export interface RubbyBatch {
    id: string;
    name: string;
    price: number;
    startDate: string;
    stopDate: string;
    totalVolume: number;
    volumeSold: number;
}

// New Detailed Project Management Types
export interface ProjectTier {
    id: string;
    name: string;
    minContribution: number;
    benefits: string[];
}

export interface ProjectMilestone {
    id: string;
    title: string;
    deadline: string;
    isCompleted: boolean;
    notes?: string;
}

export interface FinancialEntry {
    id: string;
    type: 'Revenue' | 'Expense';
    description: string;
    amount: number;
    date: string;
}

export interface ProjectParticipant {
    userId: string;
    fullName: string;
    units: number;
    totalContribution: number;
    joinDate?: string;
}

export interface ProjectUpdate {
    id: string;
    date: string; // ISO string
    description: string;
    type: 'Update' | 'Delay';
    delayDuration?: string; // e.g., "2 weeks"
}

export interface ProjectComment {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    timestamp: string; // ISO string
    replies?: ProjectComment[];
}

export interface Project {
    id: string;
    name: string;
    description: string;
    supervisor: string; // Name of the project supervisor
    projectManager: string; // Name of the project manager
    projectReviewer?: string;
    projectAccountant?: string;
    category: string;
    isPublic: boolean;
    currency: 'NGN' | 'USDT';
    unitPrice: number;
    totalUnits: number; // For fixed amount type
    contributionLimit?: number; // max units per member
    enrollmentType: 'FixedAmount' | 'TargetBased';
    targetAmount?: number;
    minContribution: number;
    enrollmentCloseDate: string;
    expansionDates?: { start: string; end: string }[];
    tiers: ProjectTier[];
    isResellable: boolean;
    resellSeason?: { start: string; end: string };
    withdrawalNoticeDays: number;
    maxWithdrawalAmount?: number;
    profitModel: 'Reinvest' | 'Payout';
    milestones: ProjectMilestone[];
    updates: ProjectUpdate[]; // For timeline
    financials: FinancialEntry[];
    participants: ProjectParticipant[];
    startDate: string; // ISO string for timeline calculations
    externalLinks?: { title: string; url: string }[];
    comments?: ProjectComment[];
}

export interface LoanProduct {
    id: string;
    name: string;
    description: string;
    interestRate: number; // Annual percentage rate
    maxAmount: number;
    maxTenure: number; // in months
}

export interface LoanApplication {
    id:string;
    userId: string;
    userName: string;
    loanProductId: string;
    loanProductName: string;
    amount: number;
    tenure: number; // in months
    dateSubmitted: string; // ISO string
    status: 'Pending' | 'Approved' | 'Rejected';
}

export type PayoutOption = 'Auto-Payout' | 'Interest-Only' | 'Manual';

export interface PiggyProduct {
    id: string;
    name: string;
    description: string;
    interestRate: number; // Annual percentage rate
    minTenure: number; // in months
    maxTenure: number; // in months
    allowCompounding: boolean;
    payoutOptions: PayoutOption[];
}

export interface PropertyInstallment {
    stage: number; // e.g., 1 for First Payment, 2 for Second, etc.
    amount: number;
    deadline: string;
    graceDays: number;
    fine: number;
}

export interface PropertyVariant {
    id: string;
    name: string; // e.g., "2-Bedroom, Ground Floor", "Full Plot", "Half Plot"
    price: number;
    availableUnits: number;
    paymentType: 'One-off' | 'Installment';
    installments: PropertyInstallment[];
    refundOnDefaultPercent: number;
}

export interface PropertyForSale {
    id: string;
    estateId: string;
    name: string;
    description: string;
    image: string;
    variants: PropertyVariant[];
    participants?: ProjectParticipant[];
}

export interface TradingSettings {
    sellerCommissionRate: number; // in percent
    buyerCommissionRate: number; // in percent
    tradingMode: 'daily' | 'date_range';
    allowedDays?: number[]; // 0 for Sunday, 1 for Monday...
    startTime?: string; // "HH:MM"
    endTime?: string; // "HH:MM"
    startDate?: string; // ISO string
    endDate?: string; // ISO string
}

export interface SecondaryMarketListing {
    id: string;
    assetType: 'Rubby' | 'Property';
    assetId: string; // For Rubbies, can be sellerId. For Property, propertyId.
    variantName?: string; // For properties with variants
    assetName: string; // e.g., 'Rubbies' or 'Prime Gardens Plot'
    sellerId: string;
    sellerName: string;
    quantity: number;
    pricePerUnit: number;
    dateListed: string; // ISO String
    status: 'Listed' | 'Sold' | 'Locked';
}

export interface MarketTradeRecord {
    id: string;
    date: string; // ISO String
    assetType: 'Rubby' | 'Property';
    assetName: string;
    sellerName: string;
    buyerName: string;
    quantity: number;
    totalValue: number;
    commissionEarned: number;
}

export interface MarketTradeRequest {
    id: string;
    listingId: string;
    assetType: 'Rubby' | 'Property';
    assetName: string;
    variantName?: string;
    sellerId: string;
    sellerName: string;
    buyerId: string;
    buyerName: string;
    quantity: number;
    pricePerUnit: number;
    totalValue: number;
    commission: number;
    dateInitiated: string;
    status: 'Pending';
}

export interface CommunityTransaction {
    id: string;
    date: string; // ISO String
    type: 'Fee Payment' | 'Rubby Sale' | 'Project Investment' | 'Property Sale' | 'Loan Disbursement' | 'Loan Repayment' | 'Savings Deposit' | 'Savings Payout';
    description: string;
    amount: number;
    memberId: string;
    memberName: string;
    relatedAssetId?: string; // e.g., project ID, property ID, fee ID
    relatedAssetName?: string; // e.g., 'Project Phoenix', 'Prime Gardens Plots'
    details?: {
        principal?: number;
        interest?: number;
    }
}

export interface CommunityInfo {
    id: string;
    name: string;
    memberCount: number;
    membershipNumberFormat?: string;
    activeProjects: number;
    thumbnail: string;
    about: CommunityAboutInfo;
    members: CommunityMember[];
    events: CommunityEvent[];
    fees: CommunityFee[];
    feePayments: FeePaymentRecord[];
    rubbyBatches: RubbyBatch[];
    rubbyTransferRequests?: RubbyTransferRequest[];
    projects: Project[];
    loanProducts: LoanProduct[];
    loanApplications: LoanApplication[];
    piggyProducts: PiggyProduct[];
    propertiesForSale?: PropertyForSale[];
    financials?: FinancialEntry[];
    rubbyTradingSettings?: TradingSettings;
    propertyTradingSettings?: TradingSettings;
    secondaryMarketListings?: SecondaryMarketListing[];
    marketTradeHistory?: MarketTradeRecord[];
    marketTradeRequests?: MarketTradeRequest[];
    transactionHistory?: CommunityTransaction[];
    privacy?: 'public' | 'private';
}

export interface UserPrivacySettings {
    isPhoneNumberPublic: boolean;
    isAddressPublic: boolean;
    isBirthYearPublic: boolean;
    messagePrivacy: 'anyone' | 'members_only';
    isMembershipNumberPublic?: boolean;
}

export type KYCStatus = 'Unverified' | 'Pending' | 'Verified' | 'Rejected';

export interface User {
  id: number;
  name: string;
  email: string;
  portfolioValue: number;
  status: 'Active' | 'Suspended';
  roles: string[];
  portfolio: {
    lands: LandHolding[];
    properties: PropertyHolding[];
    rubbies: { total: number; value: number };
    projects: ProjectHolding[];
    loans: LoanHolding[];
    piggyBanks: PiggyHolding[];
  };
  privacySettings: UserPrivacySettings;
  kycStatus: KYCStatus;
  kycRejectionNotes?: string;
}

export type IncidentStatus = 'Reported' | 'In Progress' | 'Resolved';
export type IncidentSeverity = 'Low' | 'Medium' | 'High';

export interface Incident {
    id: string;
    description: string;
    location: string;
    severity: IncidentSeverity;
    departments: string[];
    reportedBy: string;
    reportedByOccupantId?: number; // Link to occupant
    date: string;
    status: IncidentStatus;
    thumbsUp: number;
    thumbsDown: number;
    escalatedTo?: string[];
}

export interface EstateFee {
    id: string;
    title: string;
    description: string;
    amount: number;
    dueDate: string;
    frequency: DueFrequency;
}

export interface BillPaymentStatus {
    billId: string;
    residentName: string;
    status: PaymentStatus;
}

export interface Amenity {
    id: string;
    name: string;
    operatingHours: { start: number; end: number };
}

export interface EstateMember {
    id: string;
    fullName: string;
    avatarUrl: string;
    role: string;
    phoneNumber: string;
    status: 'Active' | 'Suspended' | 'Inactive';
    email: string;
    birthDate: string; // ISO String
    privacySettings: UserPrivacySettings;
    propertyHoldings?: PropertyHolding[];
}

export interface EstateEvent {
    id: string;
    title: string;
    date: string; // ISO String
    description: string;
    isEndorsed: boolean;
    proposer: string;
}

export interface EstateInfo {
    id: string;
    name: string;
    address: string;
    coverImage: string;
    description: string;
    gallery: string[];
    about: CommunityAboutInfo;
    amenities: Amenity[];
    incidents: Incident[];
    fees: EstateFee[];
    members: EstateMember[];
    accessRequests?: AccessRequest[];
    events?: EstateEvent[];
    propertiesForSale?: PropertyForSale[];
    customRoles?: string[];
}

export interface AccessRequest {
    userId: string;
    userName: string;
    userAvatar: string;
    date: string; // ISO string
    status: 'Pending' | 'Approved' | 'Rejected';
}

export interface OccupantBill {
    id: string;
    title: string;
    description: string;
    amount: number;
    status: PaymentStatus;
    type: 'One-off' | 'Recurrent';
    frequency: DueFrequency | null;
    issueDate: string; // ISO String
    dueDate: string; // ISO String
    discount?: number;
    notes?: string;
}

export interface NoticeBoardComment {
    id: string;
    author: string;
    authorAvatar: string;
    authorId: string;
    content: string;
    timestamp: string;
}

export interface NoticeBoardPost {
    id: string;
    author: string;
    authorId: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
    comments: NoticeBoardComment[];
    pinned?: boolean;
}

export interface Occupant {
    id: number;
    name: string;
    email: string;
    address: string;
    role: 'Occupant' | 'Sub-Admin';
    status: 'Invited' | 'Active';
    accessCode: string;
    bills?: OccupantBill[];
    noticeBoard?: NoticeBoardPost[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Subheading {
  id: string;
  name: string;
  images: Image[];
}

export interface Heading {
  id: string;
  name: string;
  subheadings: Subheading[];
}

export interface Chapter {
  id: string;
  name: string;
  headings: Heading[];
}

export type ListingCategory = 'Properties' | 'Assets' | 'Services';

export type ListingStatus = 'Pending' | 'Active' | 'Paused' | 'Rejected' | 'Expired';

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
  isPaid: boolean; // Paid ads get priority listing
  dateListed: string; // ISO string for sorting
  boostEndDate?: string; // ISO string for when the boost expires
  status: ListingStatus;
  views?: number;
  clicks?: number;
}

export interface Vendor {
  id: string;
  name: string;
  status: 'Active' | 'Suspended';
  listingsCount: number;
}

export interface AdPricing {
    perDay: number;
    perWeek: number;
    perMonth: number;
}

export interface GlobalAd {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    targetUrl: string;
    status: 'Active' | 'Paused' | 'Expired';
    impressions: number;
    clicks: number;
}

export interface Visitor {
    id: string;
    name: string;
    accessCode: string;
    expiresAt: Date;
}

export interface Booking {
    id: string;
    amenityId: string;
    amenityName: string;
    userId: string;
    userName: string;
    date: string;
    timeSlot: number;
}

export interface ToastMessage {
    message: string;
    type: 'success' | 'error' | 'info';
}

export type Theme = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'rose' | 'royal' | 'mint';
export type FontSize = 'sm' | 'base' | 'lg';

export interface AppSettings {
    theme: Theme;
    fontSize: FontSize;
    fontColor?: string;
}

// New types for Creation Requests
export type RequestType = 'Community' | 'Estate';
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface CreationRequest {
    id: string;
    type: RequestType;
    name: string; // Community or Estate name
    applicantName: string;
    applicantEmail: string;
    dateSubmitted: string; // ISO string
    status: RequestStatus;
    details: Record<string, any>; // Flexible object for form data
    adminNotes?: string; // For rejection reasons
}

// New types for KYC
export interface KYCSubmission {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    idType: 'National ID' | 'Passport' | "Driver's License";
    idNumber: string;
    idDocumentUrl: string; // Mock URL
    addressProofUrl: string; // Mock URL
    dateSubmitted: string; // ISO string
    status: RequestStatus;
    adminNotes?: string;
}


// New types for chat/support
export interface ChatMessage {
    id: string;
    sender: 'user' | 'support';
    text: string;
    timestamp: string;
}

export interface SupportTicket {
    id: string;
    contactName: string;
    destination: 'Creeb' | 'Community' | 'Estate';
    hubId?: string; // ID of the community or estate
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    messages: ChatMessage[];
    status: 'Open' | 'Closed';
    submittedBy: string; // user id
}

export interface PayoutAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    accountName: string; // Verified name
}

export interface RubbyTransferRequest {
    id: string;
    fromMember: string;
    toMember: string;
    amount: number;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

// New types for user-to-user messaging
export interface UserMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}

export interface UserConversation {
    id: string;
    participantId: string;
    participantName: string;
    participantAvatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    messages: UserMessage[];
}

export interface UserSubscriptions {
    community: boolean;
    estate: boolean;
}

export interface SubscriptionPricing {
    community: number;
    estate: number;
}

export interface ManagedUser {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    subscriptions: {
        community: {
            subscribed: boolean;
            date?: string; // ISO String
        };
        estate: {
            subscribed: boolean;
            date?: string; // ISO String
        };
    };
}