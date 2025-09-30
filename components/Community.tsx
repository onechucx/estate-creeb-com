

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Post, CommunityInfo, CommunityAboutInfo, LandHolding, Project, LoanHolding, ToastMessage, CommunityMember, CommunityEvent, UserRole, CommunityFee, PaymentStatus, PollOption, RubbyTransferRequest, ProjectTier, ProjectMilestone, FinancialEntry, ProjectHolding, RubbyBatch, FeePaymentRecord, ProjectUpdate, DueFrequency, LoanProduct, LoanApplication, PiggyProduct, PayoutOption, PiggyHolding, PropertyForSale, PropertyVariant, PropertyInstallment, EstateInfo, PropertyHolding as PropertyHoldingType, ProjectComment, ProjectParticipant, MemberPaymentStatus, FeeItem, SecondaryMarketListing, TradingSettings, MarketTradeRecord, CommunityTransaction, MarketTradeRequest, FeeInstallment } from '../types';
import { 
    PhotoIcon, ChartBarIcon, FaceSmileIcon, HeartIcon, ChatBubbleOvalLeftIcon, ArrowPathIcon, 
    PencilIcon, BuildingOffice2Icon, CubeIcon, RocketLaunchIcon, BanknotesIcon, ChevronRightIcon, ArrowLeftIcon,
    LinkIcon, PhoneIcon, MapPinIcon, ClockIcon, InformationCircleIcon, CalendarDaysIcon, UserGroupIcon, ShieldCheckIcon,
    ChevronLeftIcon as ChevronLeft, ChevronRightIcon as ChevronRight, PlusIcon, XMarkIcon, EllipsisVerticalIcon, UserMinusIcon, UserPlusIcon, ChevronDownIcon, CheckIcon, BeakerIcon, WalletIcon, ArrowsUpDownIcon, TrashIcon, CheckCircleIcon, ChatBubbleLeftRightIcon, EyeIcon, AtSymbolIcon, CakeIcon, ArrowUpOnSquareIcon, DocumentPlusIcon, DocumentTextIcon, BanknotesIcon as PiggyBankIcon, TagIcon, UserCircleIcon, VideoCameraIcon,
    FlagIcon, ChatBubbleBottomCenterTextIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, ReceiptPercentIcon,
    MagnifyingGlassIcon, EnvelopeIcon, Squares2X2Icon, Bars3Icon, ArrowTrendingUpIcon, IdentificationIcon, Cog6ToothIcon, ShieldExclamationIcon, BuildingStorefrontIcon, ClipboardDocumentListIcon, CalendarIcon as CalendarIconOutline, PaperAirplaneIcon, PencilSquareIcon, UserPlusIcon as AddUserIcon, SparklesIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { GoogleGenAI } from "@google/genai";

export const PostCard: React.FC<{
    post: Post;
    isSubscribed: boolean;
    onVoteClick?: (post: Post) => void;
    onLike?: (postId: string) => void;
    onStartMessage?: (userId: string, userName: string) => void;
}> = ({ post, isSubscribed, onVoteClick, onLike, onStartMessage }) => {
    const totalVotes = post.poll ? post.poll.options.reduce((sum, opt) => sum + opt.votes, 0) : 0;
    const hasVoted = post.poll?.votedBy.includes('d_user1'); // Mock current user

    return (
        <Card className="mb-4">
            <div className="flex items-start">
                <img src={post.authorAvatar} alt={post.author} className="h-10 w-10 rounded-full mr-4" />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-sm text-brand-text-primary dark:text-dark-text-primary">{post.author}</p>
                            <p className="text-xs text-brand-text-secondary dark:text-dark-text-secondary">{post.timestamp}</p>
                        </div>
                        {onStartMessage && post.author !== "John Doe" && ( // Assuming John Doe is current user for demo
                            <Button variant="secondary" className="!p-1.5 text-xs" onClick={() => onStartMessage(post.id, post.author)}>
                                <ChatBubbleLeftRightIcon className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    {post.content && <p className="mt-2 text-brand-text-primary dark:text-dark-text-secondary text-sm">{post.content}</p>}
                    
                    {post.poll && (
                        <div className="mt-3 space-y-2 border-t pt-3 dark:border-dark-border">
                            <p className="font-semibold text-sm text-brand-text-primary">{post.poll.question}</p>
                            {post.poll.options.map(option => (
                                <div key={option.text} className="relative text-sm">
                                    <div className="absolute top-0 left-0 h-full bg-blue-100 dark:bg-blue-900/50 rounded-md" style={{ width: `${totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0}%` }}></div>
                                    <div className="relative flex justify-between items-center p-2">
                                        <span className="text-brand-text-primary">{option.text}</span>
                                        <span className="font-semibold text-brand-text-primary">{totalVotes > 0 ? `${Math.round((option.votes / totalVotes) * 100)}%` : '0%'}</span>
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs text-brand-text-secondary">{totalVotes.toLocaleString()} Rubbies Voted · Poll ends {new Date(post.poll.endDate).toLocaleDateString()}</p>
                            {!hasVoted && onVoteClick && <Button onClick={() => onVoteClick(post)} variant="secondary" className="w-full mt-2" disabled={!isSubscribed} title={!isSubscribed ? "Subscription required to vote" : ""}>Vote</Button>}
                            {hasVoted && <p className="text-sm text-green-600 font-semibold mt-2 text-center">You have voted.</p>}
                        </div>
                    )}

                    {post.image && <img src={post.image} alt="Post content" className="mt-3 rounded-lg w-full object-cover" style={{maxHeight: '400px'}} />}
                    
                    <div className="flex justify-between items-center mt-3 text-brand-text-secondary dark:text-dark-text-secondary">
                        <div className="flex space-x-4">
                            <button onClick={() => onLike?.(post.id)} className="flex items-center space-x-1 hover:text-red-500 text-xs"><HeartIcon className="h-4 w-4" /> <span>{post.likes}</span></button>
                            <button className="flex items-center space-x-1 hover:text-blue-500 text-xs"><ChatBubbleOvalLeftIcon className="h-4 w-4" /> <span>{post.comments}</span></button>
                            <button className="flex items-center space-x-1 hover:text-green-500 text-xs"><ArrowPathIcon className="h-4 w-4" /> <span>{post.reposts}</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};


const projectStartDate = new Date();
projectStartDate.setMonth(projectStartDate.getMonth() - 2);

const futureDate = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
const pastDate = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

const mockLoanProducts: LoanProduct[] = [
    { id: 'LP001', name: 'Emergency Loan', description: 'Quick access funds for emergencies, up to ₦100,000.', interestRate: 15, maxAmount: 100000, maxTenure: 12 },
    { id: 'LP002', name: 'Business Starter Loan', description: 'Seed capital for your next big idea.', interestRate: 8, maxAmount: 1000000, maxTenure: 36 }
];

const mockPiggyProducts: PiggyProduct[] = [
    { id: 'PP001', name: 'Flex Save', description: 'Save for short-term goals with competitive interest.', interestRate: 10, minTenure: 3, maxTenure: 12, allowCompounding: true, payoutOptions: ['Auto-Payout', 'Manual'] },
    { id: 'PP002', name: 'Target Builder', description: 'Lock funds for a longer period to get higher returns.', interestRate: 12, minTenure: 12, maxTenure: 48, allowCompounding: true, payoutOptions: ['Auto-Payout', 'Interest-Only'] }
];

const mockLoanApplications: LoanApplication[] = [
    { id: 'LA001', userId: 'd_user1', userName: 'John Doe', loanProductId: 'LP001', loanProductName: 'Emergency Loan', amount: 50000, tenure: 6, dateSubmitted: pastDate(2), status: 'Pending' },
    { id: 'LA002', userId: 'd_user2', userName: 'Scott Summers', loanProductId: 'LP002', loanProductName: 'Business Starter Loan', amount: 500000, tenure: 24, dateSubmitted: pastDate(5), status: 'Approved' },
];

const mockCommunityProperties: PropertyForSale[] = [
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

const generateMembershipNumber = (format: string | undefined, joinDateStr: string, index: number): string => {
    const defaultPrefix = '25-09';
    const number = (index + 1).toString().padStart(4, '0');
    
    if (!format) {
        return `${defaultPrefix}-${number}`;
    }

    const joinDate = new Date(joinDateStr);
    const year = joinDate.getFullYear().toString().slice(-2);
    const month = (joinDate.getMonth() + 1).toString().padStart(2, '0');
    
    return format
        .replace('YY', year)
        .replace('MM', month)
        .replace('NNNN', number);
};

const mockTransactionHistory: CommunityTransaction[] = [
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
const memberStatuses = ['Active', 'Suspended', 'Invited'] as const;
const paymentStatuses = ['Paid', 'Unpaid', 'Overdue'] as const;


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

const CreatePost: React.FC<{ onNewPost: (post: Post) => void }> = ({ onNewPost }) => {
    const [postType, setPostType] = useState<'text' | 'image' | 'poll'>('text');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [poll, setPoll] = useState({ question: '', options: ['', ''] });

    const handleImageUpload = () => setImage('https://picsum.photos/seed/newpost/600/400');
    const handleAddOption = () => setPoll(p => ({ ...p, options: [...p.options, ''] }));
    
    const handleSubmit = () => {
        const basePost: Omit<Post, 'id' | 'timestamp'> = {
            author: 'John Doe',
            authorAvatar: 'https://picsum.photos/seed/d-user1/48/48',
            content: postType !== 'image' ? content : '',
            likes: 0, comments: 0, reposts: 0,
        };
        let finalPost: Omit<Post, 'id' | 'timestamp'> | null = null;
        if(postType === 'text' && content) {
            finalPost = basePost;
        } else if (postType === 'image' && image) {
            finalPost = { ...basePost, image, content };
        } else if (postType === 'poll' && poll.question && poll.options.every(o => o)) {
            finalPost = { ...basePost, content, poll: { question: poll.question, options: poll.options.map(o => ({ text: o, votes: 0 })), endDate: futureDate(7), votedBy: [] } };
        }
        if (finalPost) {
            onNewPost({ ...finalPost, id: `post-${Date.now()}`, timestamp: 'Just now' });
            setContent(''); setImage(null); setPoll({ question: '', options: ['', ''] }); setPostType('text');
        }
    };

    return (
        <Card className="mb-4">
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind, John?" rows={3} className="w-full p-2 text-sm border-b dark:border-dark-border bg-transparent focus:outline-none text-brand-text-primary" />
            {postType === 'image' && <div className="mt-2">{image ? <img src={image} className="rounded-lg max-h-48"/> : <Button onClick={handleImageUpload} variant="secondary">Upload Image</Button>}</div>}
            {postType === 'poll' && <div className="mt-2 space-y-2">
                <input value={poll.question} onChange={e => setPoll({...poll, question: e.target.value})} placeholder="Poll Question" className="w-full p-2 text-sm border rounded dark:bg-dark-surface dark:border-dark-border text-brand-text-primary"/>
                {poll.options.map((opt, i) => <input key={i} value={opt} onChange={e => { const newOpts = [...poll.options]; newOpts[i] = e.target.value; setPoll({...poll, options: newOpts}); }} placeholder={`Option ${i+1}`} className="w-full p-2 text-sm border rounded dark:bg-dark-surface dark:border-dark-border text-brand-text-primary"/>)}
                {poll.options.length < 4 && <Button onClick={handleAddOption} variant="secondary" className="!text-xs !py-1">Add Option</Button>}
            </div>}
            <div className="flex justify-between items-center mt-2 pt-2">
                <div className="flex items-center space-x-2 text-gray-400">
                    <button onClick={() => setPostType('text')} title="Text" className={postType === 'text' ? 'text-brand-primary' : ''}><ChatBubbleBottomCenterTextIcon className="h-6 w-6"/></button>
                    <button onClick={() => setPostType('image')} title="Image" className={postType === 'image' ? 'text-brand-primary' : ''}><PhotoIcon className="h-6 w-6"/></button>
                    <button onClick={() => setPostType('poll')} title="Poll" className={postType === 'poll' ? 'text-brand-primary' : ''}><ChartBarIcon className="h-6 w-6"/></button>
                </div>
                <Button onClick={handleSubmit}>Post</Button>
            </div>
        </Card>
    );
};

const VoteModal: React.FC<{ post: Post | null; onClose: () => void; onVote: (postId: string, optionText: string) => void; }> = ({ post, onClose, onVote }) => {
    if (!post || !post.poll) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
                <h3 className="font-bold text-lg mb-4 text-brand-text-primary">{post.poll.question}</h3>
                <div className="space-y-3">
                    {post.poll.options.map(option => (
                        <Button key={option.text} variant="secondary" className="w-full text-left !justify-start" onClick={() => onVote(post.id, option.text)}>
                            {option.text}
                        </Button>
                    ))}
                </div>
                <div className="text-right mt-4"><Button onClick={onClose} variant="danger">Cancel</Button></div>
            </Card>
        </div>
    );
};

const FinancialCalculator: React.FC<{ 
    loanProducts: LoanProduct[]; 
    onApply: (loan: any) => void;
    piggyProducts: PiggyProduct[];
}> = ({ loanProducts, onApply, piggyProducts }) => {
    const [calculatorMode, setCalculatorMode] = useState<'loan' | 'savings'>('loan');
    
    // Loan State
    const [loanType, setLoanType] = useState(loanProducts[0].id);
    const [loanAmount, setLoanAmount] = useState(500000);
    const [loanTenure, setLoanTenure] = useState(24);
    
    // Savings State
    const [savingsProductId, setSavingsProductId] = useState(piggyProducts[0]?.id || '');
    const [initialDeposit, setInitialDeposit] = useState(50000);
    const [monthlyContribution, setMonthlyContribution] = useState(10000);
    const [savingsTenure, setSavingsTenure] = useState(12);

    // Loan calculations
    const selectedLoanProduct = loanProducts.find(p => p.id === loanType) || loanProducts[0];
    const { emi, totalPayable, totalInterest, loanChartData, amortization } = useMemo(() => {
        const principal = loanAmount;
        const rate = selectedLoanProduct.interestRate / 100 / 12;
        const tenure = loanTenure;
        if (principal <= 0 || rate <= 0 || tenure <= 0) return { emi: 0, totalPayable: 0, totalInterest: 0, loanChartData: [], amortization: [] };
        
        const calculatedEmi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
        const calculatedTotalPayable = calculatedEmi * tenure;
        const calculatedTotalInterest = calculatedTotalPayable - principal;
        
        const schedule = [];
        let balance = principal;
        for (let i = 1; i <= tenure; i++) {
            const interestPayment = balance * rate;
            const principalPayment = calculatedEmi - interestPayment;
            balance -= principalPayment;
            schedule.push({ month: i, principal: principalPayment, interest: interestPayment, balance: Math.max(0, balance) });
        }

        return {
            emi: calculatedEmi,
            totalPayable: calculatedTotalPayable,
            totalInterest: calculatedTotalInterest,
            loanChartData: [{ name: 'Principal', value: principal }, { name: 'Interest', value: calculatedTotalInterest }],
            amortization: schedule,
        };
    }, [loanAmount, loanTenure, selectedLoanProduct]);
    
    // Savings Calculations
    const selectedSavingsProduct = piggyProducts.find(p => p.id === savingsProductId) || piggyProducts[0];
    useEffect(() => {
        if (selectedSavingsProduct) {
            if (savingsTenure < selectedSavingsProduct.minTenure) setSavingsTenure(selectedSavingsProduct.minTenure);
            if (savingsTenure > selectedSavingsProduct.maxTenure) setSavingsTenure(selectedSavingsProduct.maxTenure);
        }
    }, [savingsProductId, savingsTenure, selectedSavingsProduct]);

    const { futureValue, totalContributions, totalInterestEarned, savingsPieData, savingsGrowthData } = useMemo(() => {
        if (!selectedSavingsProduct) return { futureValue: 0, totalContributions: 0, totalInterestEarned: 0, savingsPieData: [], savingsGrowthData: [] };

        const rate = selectedSavingsProduct.interestRate / 100 / 12;
        const n = savingsTenure;
        const P = initialDeposit;
        const PMT = monthlyContribution;

        const calculatedFutureValue = P * Math.pow(1 + rate, n) + PMT * ((Math.pow(1 + rate, n) - 1) / rate);
        const calculatedTotalContributions = P + (PMT * n);
        const calculatedTotalInterest = calculatedFutureValue - calculatedTotalContributions;

        const growthData = [];
        let balance = P;
        growthData.push({ month: 0, value: P });
        for (let i = 1; i <= n; i++) {
            balance = balance * (1 + rate) + PMT;
            growthData.push({ month: i, value: balance });
        }

        return {
            futureValue: calculatedFutureValue,
            totalContributions: calculatedTotalContributions,
            totalInterestEarned: calculatedTotalInterest,
            savingsPieData: [{ name: 'Contributions', value: calculatedTotalContributions }, { name: 'Interest', value: calculatedTotalInterest }],
            savingsGrowthData: growthData
        };
    }, [selectedSavingsProduct, initialDeposit, monthlyContribution, savingsTenure]);


    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-brand-text-primary">Financial Calculator</h3>
                <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                    <Button onClick={() => setCalculatorMode('loan')} className={`!text-xs !py-1 !px-3 ${calculatorMode === 'loan' ? 'bg-brand-surface dark:bg-dark-surface shadow' : 'bg-transparent border-transparent'}`}>Loan</Button>
                    <Button onClick={() => setCalculatorMode('savings')} className={`!text-xs !py-1 !px-3 ${calculatorMode === 'savings' ? 'bg-brand-surface dark:bg-dark-surface shadow' : 'bg-transparent border-transparent'}`}>Savings</Button>
                </div>
            </div>
            {calculatorMode === 'loan' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <select value={loanType} onChange={e => setLoanType(e.target.value)} className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-dark-border text-brand-text-primary">
                            {loanProducts.map(p => <option key={p.id} value={p.id}>{p.name} ({p.interestRate}% APR)</option>)}
                        </select>
                        <div>
                            <div className="flex justify-between font-semibold text-brand-text-primary"><label>Loan Amount</label><span>₦{loanAmount.toLocaleString()}</span></div>
                            <input type="range" min="50000" max={selectedLoanProduct.maxAmount} step="10000" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full" />
                        </div>
                         <div>
                            <div className="flex justify-between font-semibold text-brand-text-primary"><label>Loan Tenure (Months)</label><span>{loanTenure} months</span></div>
                            <input type="range" min="6" max={selectedLoanProduct.maxTenure} step="1" value={loanTenure} onChange={e => setLoanTenure(Number(e.target.value))} className="w-full" />
                        </div>
                        <div className="space-y-2 text-sm border-t dark:border-dark-border pt-4">
                            <div className="flex justify-between"><span className="text-brand-text-secondary">Monthly Payment (EMI)</span><span className="font-semibold text-brand-text-primary">₦{emi.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                            <div className="flex justify-between"><span className="text-brand-text-secondary">Total Interest Payable</span><span className="font-semibold text-brand-text-primary">₦{totalInterest.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                            <div className="flex justify-between text-lg font-bold text-brand-text-primary"><span >Total Repayment</span><span>₦{totalPayable.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                        </div>
                        <Button className="w-full !py-3 text-base" onClick={() => onApply({ loanProductId: loanType, amount: loanAmount, tenure: loanTenure })}>Apply for Loan</Button>
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart><Pie data={loanChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}><Cell key="principal" fill="var(--brand-primary)" /><Cell key="interest" fill="#EF4444" /></Pie><Tooltip /><Legend iconType="circle"/></PieChart>
                        </ResponsiveContainer>
                        <div className="h-48 overflow-y-auto mt-4 border rounded-md dark:border-dark-border">
                            <table className="w-full text-xs text-center">
                                <thead className="sticky top-0 bg-blue-100 dark:bg-blue-900/50">
                                    <tr className="text-blue-900 dark:text-blue-200 font-semibold">
                                        <th className="p-2">Month</th><th className="p-2">Principal</th><th className="p-2">Interest</th><th className="p-2">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="text-brand-text-primary dark:text-dark-text-primary divide-y divide-brand-border dark:divide-dark-border">
                                    {amortization.map(row => (
                                    <tr key={row.month}>
                                        <td className="p-2">{row.month}</td>
                                        <td className="p-2">{(row.principal).toFixed(2)}</td>
                                        <td className="p-2">{(row.interest).toFixed(2)}</td>
                                        <td className="p-2">{(row.balance).toFixed(2)}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                         <select value={savingsProductId} onChange={e => setSavingsProductId(e.target.value)} className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-dark-border text-brand-text-primary">
                            {piggyProducts.map(p => <option key={p.id} value={p.id}>{p.name} ({p.interestRate}% p.a.)</option>)}
                        </select>
                        <div>
                            <div className="flex justify-between font-semibold text-brand-text-primary"><label>Initial Deposit</label><span>₦{initialDeposit.toLocaleString()}</span></div>
                            <input type="range" min="10000" max="1000000" step="10000" value={initialDeposit} onChange={e => setInitialDeposit(Number(e.target.value))} className="w-full" />
                        </div>
                        <div>
                            <div className="flex justify-between font-semibold text-brand-text-primary"><label>Monthly Contribution</label><span>₦{monthlyContribution.toLocaleString()}</span></div>
                            <input type="range" min="0" max="200000" step="5000" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} className="w-full" />
                        </div>
                         <div>
                            <div className="flex justify-between font-semibold text-brand-text-primary"><label>Savings Tenure (Months)</label><span>{savingsTenure} months</span></div>
                            <input type="range" min={selectedSavingsProduct?.minTenure || 3} max={selectedSavingsProduct?.maxTenure || 48} step="1" value={savingsTenure} onChange={e => setSavingsTenure(Number(e.target.value))} className="w-full" />
                        </div>
                         <div className="space-y-2 text-sm border-t dark:border-dark-border pt-4">
                            <div className="flex justify-between"><span className="text-brand-text-secondary">Total Contributions</span><span className="font-semibold text-brand-text-primary">₦{totalContributions.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                            <div className="flex justify-between"><span className="text-brand-text-secondary">Total Interest Earned</span><span className="font-semibold text-brand-text-primary">₦{totalInterestEarned.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                            <div className="flex justify-between text-lg font-bold text-brand-text-primary"><span >Future Value</span><span>₦{futureValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                        </div>
                        <Button className="w-full !py-3 text-base">Start Saving</Button>
                    </div>
                     <div>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart><Pie data={savingsPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}><Cell key="contributions" fill="var(--brand-primary)" /><Cell key="interest" fill="var(--brand-accent)" /></Pie><Tooltip /><Legend iconType="circle"/></PieChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width="100%" height={180} className="mt-4">
                            <LineChart data={savingsGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                                <YAxis tickFormatter={(val) => `₦${Number(val/1000).toFixed(0)}k`} />
                                <Tooltip formatter={(value: number) => `₦${value.toLocaleString('en-US', {maximumFractionDigits:0})}`}/>
                                <Line type="monotone" dataKey="value" stroke="var(--brand-primary)" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </Card>
    );
};

const calculateFeeTotal = (fee: CommunityFee) => {
    const subtotal = fee.items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * ((fee.taxRate || 0) / 100);
    return subtotal + tax;
};

const StatementRequestModal: React.FC<{ 
    onClose: () => void;
    community: CommunityInfo;
    member: CommunityMember;
}> = ({ onClose, community, member }) => {
    const [options, setOptions] = useState({ projects: true, properties: true, fees: true });
    const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, [e.target.name]: e.target.checked });

    const generateStatementHtml = () => {
        const theme = document.documentElement.className;

        const projectsSection = options.projects ? `
            <div class="mb-4"><h4 class="font-bold mb-2">Project Holdings</h4><table class="min-w-full text-sm mb-4"><tbody>
            ${member.holdings.projects.map(h => {
                const project = community.projects.find(p => p.id === h.projectId);
                return `<tr class="border-t dark:border-dark-border"><td class="p-2">${project?.name || h.projectId}</td><td class="p-2">${h.units} Units</td></tr>`
            }).join('') || `<tr><td class="p-2" colspan="2">No project holdings.</td></tr>`}
            </tbody></table></div>
        ` : '';
        
        const propertiesSection = options.properties ? `
            <div class="mb-4"><h4 class="font-bold mb-2">Property Holdings</h4><table class="min-w-full text-sm mb-4"><tbody>
            ${member.holdings.properties.map(h => 
                `<tr class="border-t dark:border-dark-border"><td class="p-2">${h.propertyName}</td><td class="p-2">${h.units} Unit(s)</td><td class="p-2">${h.variantName}</td></tr>`
            ).join('') || `<tr><td class="p-2" colspan="3">No property holdings.</td></tr>`}
            </tbody></table></div>
        ` : '';

        const feesSection = options.fees ? `
            <div class="mb-4"><h4 class="font-bold mb-2">Fees & Dues Status</h4><table class="min-w-full text-sm mb-4"><tbody>
            ${community.fees.map(f => {
                const payment = member.paymentStatuses.find(ps => ps.feeId === f.id);
                return `<tr class="border-t dark:border-dark-border"><td class="p-2">${f.title}</td><td class="p-2">₦${calculateFeeTotal(f).toLocaleString()}</td><td class="p-2">${payment?.status || 'Unpaid'}</td></tr>`
            }).join('')}
            </tbody></table></div>
        ` : '';

        return `
            <!DOCTYPE html><html lang="en" class="${theme}"><head><meta charset="UTF-8" /><title>Account Statement</title><script src="https://cdn.tailwindcss.com"></script>
            <style>
                html.light { --brand-primary: #1E3A8A; --brand-background: #F9FAFB; --brand-surface: #FFFFFF; --brand-text-primary: #1F2937; --brand-border: #E5E7EB; }
                html.dark { --brand-primary: #3B82F6; --brand-background: #111827; --brand-surface: #1F2937; --brand-text-primary: #F9FAFB; --brand-border: #374151; }
                /* Add other themes if necessary */
                @media print { .no-print { display: none; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
            </style>
            <script>tailwind.config = { darkMode: 'class', theme: { extend: { colors: { 'brand-primary': 'var(--brand-primary)', 'brand-background': 'var(--brand-background)', 'brand-surface': 'var(--brand-surface)', 'brand-text-primary': 'var(--brand-text-primary)', 'brand-border': 'var(--brand-border)' }}},}</script></head>
            <body class="bg-brand-background text-brand-text-primary font-sans">
                <div class="max-w-4xl mx-auto my-8 p-8 bg-brand-surface shadow-lg">
                    <header class="flex items-center justify-between mb-4 border-b pb-4 dark:border-dark-border">
                        <div><h2 class="text-2xl font-bold">${community.name} - Member Statement</h2></div>
                        <div class="text-right"><p class="font-bold">${member.fullName}</p><p class="text-xs text-gray-500">For period: ${startDate} to ${endDate}</p></div>
                    </header>
                    <main>${projectsSection}${propertiesSection}${feesSection}</main>
                    <footer class="text-center text-xs text-gray-500 pt-6 border-t dark:border-dark-border mt-8"><p>This statement was generated electronically from the Creeb platform.</p></footer>
                </div>
                <div class="text-center my-8 no-print"><button onclick="window.print()" class="px-6 py-2 bg-brand-primary text-white rounded-lg font-semibold">Print Statement</button></div>
            </body></html>`;
    };

    const handleGenerate = () => {
        const statementHtml = generateStatementHtml();
        const statementWindow = window.open("", "_blank");
        if (statementWindow) {
            statementWindow.document.write(statementHtml);
            statementWindow.document.close();
        } else {
            alert("Please allow pop-ups to view your statement.");
        }
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-brand-text-primary">Generate Statement</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6"/></button></div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="date" title="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" /><input type="date" title="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" /></div>
                    <fieldset className="space-y-2 border p-3 rounded dark:border-dark-border"><legend className="text-sm font-semibold px-2 text-brand-text-primary">Include in statement:</legend>{Object.entries(options).map(([key, value]) => (<label key={key} className="flex items-center text-brand-text-primary"><input type="checkbox" name={key} checked={value} onChange={handleCheckboxChange} className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary" /><span className="ml-2 text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span></label>))}</fieldset>
                    <Button onClick={handleGenerate} className="w-full">Generate Statement</Button>
                </div>
            </Card>
        </div>
    );
};


const HoldingDetailView: React.FC<{
    holdingType: string;
    holdingId: string;
    member: CommunityMember;
    community: CommunityInfo;
    onClose: () => void;
}> = ({ holdingType, holdingId, member, community, onClose }) => {
    
    const { details, transactions, title, holdingImage } = useMemo(() => {
        const allTransactions = community.transactionHistory || [];
        const relatedTransactions = allTransactions.filter(
            t => (t.relatedAssetId === holdingId && t.memberId === member.id)
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        let holdingDetails: any = null;
        let mainTitle = '';
        let image = '';

        switch (holdingType) {
            case 'project':
                const project = community.projects.find(p => p.id === holdingId);
                holdingDetails = project;
                mainTitle = project?.name || 'Project Details';
                image = `https://picsum.photos/seed/${holdingId}/800/200`;
                break;
            case 'loan':
                const loan = member.holdings.loans.find(l => l.id === holdingId);
                holdingDetails = loan;
                mainTitle = loan?.type || 'Loan Details';
                break;
            case 'savings':
                const savings = member.holdings.piggyBanks.find(s => s.id === holdingId);
                holdingDetails = savings;
                mainTitle = savings?.productName || 'Savings Details';
                break;
            case 'property':
                const propertyHolding = member.holdings.properties.find(p => p.propertyId === holdingId);
                const propertyInfo = community.propertiesForSale?.find(p => p.id === holdingId);
                holdingDetails = { ...propertyHolding, ...propertyInfo };
                mainTitle = propertyHolding?.propertyName || 'Property Details';
                image = propertyInfo?.image || `https://picsum.photos/seed/${holdingId}/800/200`;
                break;
        }

        return { details: holdingDetails, transactions: relatedTransactions, title: mainTitle, holdingImage: image };
    }, [holdingType, holdingId, member, community]);

    return (
        <Card className="mt-6 animate-fade-in relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <XMarkIcon className="h-6 w-6"/>
            </button>

            <h3 className="text-2xl font-bold mb-4 text-brand-text-primary">{title}</h3>
            
            {(holdingImage || details?.description) && (
                 <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {holdingImage && <img src={holdingImage} alt={title} className="md:col-span-1 w-full h-48 object-cover rounded-lg"/>}
                    <div className={holdingImage ? "md:col-span-2" : "md:col-span-3"}>
                        {details?.description && <p className="text-brand-text-secondary">{details.description}</p>}
                    </div>
                </div>
            )}
            
            <h4 className="font-bold text-lg mb-2 text-brand-text-primary">Transaction History</h4>
            <div className="overflow-x-auto rounded-lg border dark:border-dark-border">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-dark-surface/50">
                        <tr>
                            <th className="p-3 text-left font-semibold text-brand-text-secondary">Date</th>
                            <th className="p-3 text-left font-semibold text-brand-text-secondary">Transaction ID</th>
                            <th className="p-3 text-left font-semibold text-brand-text-secondary">Description</th>
                            <th className="p-3 text-right font-semibold text-brand-text-secondary">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-dark-border">
                        {transactions.length > 0 ? transactions.map(tx => {
                            const isCredit = ['Loan Disbursement', 'Savings Payout'].includes(tx.type);
                            const amountPrefix = isCredit ? '+' : '-';
                            const amountColor = isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                            return (
                                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-dark-surface/30">
                                    <td className="p-3 whitespace-nowrap text-brand-text-secondary">{new Date(tx.date).toLocaleDateString()}</td>
                                    <td className="p-3 font-mono text-brand-text-secondary">{tx.id}</td>
                                    <td className="p-3 text-brand-text-primary">{tx.description}</td>
                                    <td className={`p-3 text-right font-semibold ${amountColor}`}>
                                        {amountPrefix} ₦{tx.amount.toLocaleString()}
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan={4} className="text-center p-8 text-brand-text-secondary">No transactions found for this holding.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

// FIX: Added the missing SellPropertyModal component.
const SellPropertyModal: React.FC<{
    property: PropertyHoldingType;
    member: CommunityMember;
    community: CommunityInfo;
    onUpdateCommunity: (c: CommunityInfo) => void;
    showToast: (m: string, t?: ToastMessage['type']) => void;
    onClose: () => void;
}> = ({ property, member, community, onUpdateCommunity, showToast, onClose }) => {
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('1');
    const settings = community.propertyTradingSettings;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numQuantity = Number(quantity);
        const numPrice = Number(price);

        if (numQuantity <= 0 || numQuantity > property.units) {
            showToast('Invalid quantity.', 'error');
            return;
        }
        if (numPrice <= 0) {
            showToast('Invalid price.', 'error');
            return;
        }

        const newListing: SecondaryMarketListing = {
            id: `SM-PROP-${Date.now()}`,
            assetType: 'Property',
            assetId: property.propertyId,
            variantName: property.variantName,
            assetName: property.propertyName,
            sellerId: member.id,
            sellerName: member.fullName,
            quantity: numQuantity,
            pricePerUnit: numPrice,
            dateListed: new Date().toISOString(),
            status: 'Listed',
        };

        const updatedCommunity = {
            ...community,
            secondaryMarketListings: [...(community.secondaryMarketListings || []), newListing],
        };

        onUpdateCommunity(updatedCommunity);
        showToast('Your property has been listed on the secondary market.', 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                 <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-brand-text-primary">List Property for Sale</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <p className="font-semibold text-brand-text-primary">{property.propertyName}</p>
                        <p className="text-sm text-brand-text-secondary">{property.variantName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-brand-text-secondary">Quantity (Units)</label>
                            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} min="1" max={property.units} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-brand-text-secondary">Price per Unit (₦)</label>
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/>
                        </div>
                    </div>
                    {settings && <Card className="!p-3 text-xs bg-gray-50 dark:bg-dark-surface/50 text-brand-text-secondary">A seller commission of {settings.sellerCommissionRate}% will be applied upon sale.</Card>}
                    <div className="flex justify-end gap-2"><Button variant="secondary" type="button" onClick={onClose}>Cancel</Button><Button type="submit">List Property</Button></div>
                 </form>
            </Card>
        </div>
    );
};


const MyPortfolio: React.FC<{ 
    member: CommunityMember; 
    community: CommunityInfo; 
    onUpdateCommunity: (c: CommunityInfo) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void;
}> = ({ member, community, onUpdateCommunity, showToast }) => {
    const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
    const [isManageRubbiesModalOpen, setIsManageRubbiesModalOpen] = useState(false);
    const [sellingProperty, setSellingProperty] = useState<PropertyHoldingType | null>(null);
    const [selectedHolding, setSelectedHolding] = useState<{ type: string; id: string } | null>(null);


    const handlePrivacyToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isPublic = e.target.checked;
        const updatedMember = { ...member, privacySettings: { ...member.privacySettings, isMembershipNumberPublic: isPublic } };
        const updatedCommunity = { ...community, members: community.members.map(m => m.id === member.id ? updatedMember : m) };
        onUpdateCommunity(updatedCommunity);
    };

    const getStatusWithOverdue = (payment: MemberPaymentStatus) => {
        if (payment.status === 'Unpaid') {
            const fee = community.fees.find(f => f.id === payment.feeId);
            if (fee?.deadline && new Date(fee.deadline) < new Date()) return 'Overdue';
        }
        return payment.status;
    };
    
    // --- Portfolio Chart Data Calculation ---
    const rubbiesValue = member.holdings.rubbies.value;
    const propertiesValue = member.holdings.properties.length * 15000000; // Mock value for visualization
    const projectsValue = member.holdings.projects.reduce((sum, p) => {
        const project = community.projects.find(proj => proj.id === p.projectId);
        return sum + (p.units * (project?.unitPrice || 0));
    }, 0);
    const loansValue = member.holdings.loans.reduce((sum, l) => sum + l.amount, 0);
    const savingsValue = member.holdings.piggyBanks.reduce((sum, s) => sum + s.principal, 0);

    const totalPortfolioValue = rubbiesValue + propertiesValue + projectsValue + loansValue + savingsValue;
    
    const portfolioData = useMemo(() => [
        { name: 'Rubbies', value: rubbiesValue, color: '#0088FE' },
        { name: 'Properties', value: propertiesValue, color: '#00C49F' },
        { name: 'Projects', value: projectsValue, color: '#FFBB28' },
        { name: 'Loans', value: loansValue, color: '#FF8042' },
        { name: 'Savings', value: savingsValue, color: '#AF19FF' },
    ].filter(item => item.value > 0), [rubbiesValue, propertiesValue, projectsValue, loansValue, savingsValue]);
    
    const ProgressBar: React.FC<{ value: number; color?: string; bgColor?: string }> = ({ value, color = 'bg-brand-primary', bgColor = 'bg-gray-200 dark:bg-gray-700' }) => (
        <div className={`w-full h-1.5 rounded-full ${bgColor}`}><div className={`h-1.5 rounded-full ${color}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }}></div></div>
    );

    const statusChip: Record<PaymentStatus, string> = { Paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', Unpaid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', Overdue: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' };

    return (
        <>
            {isStatementModalOpen && <StatementRequestModal onClose={() => setIsStatementModalOpen(false)} community={community} member={member} />}
            {isManageRubbiesModalOpen && <ManageRubbiesModal member={member} community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} onClose={() => setIsManageRubbiesModalOpen(false)} />}
            {sellingProperty && <SellPropertyModal property={sellingProperty} member={member} community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} onClose={() => setSellingProperty(null)} />}
            
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <div className="text-center">
                                <img src={member.avatarUrl} alt={member.fullName} className="h-24 w-24 rounded-full mx-auto border-4 border-white dark:border-dark-surface shadow-lg" />
                                <h3 className="text-xl font-bold mt-2 text-brand-text-primary">{member.fullName}</h3>
                                <p className="text-sm text-brand-text-secondary">@{member.username} &bull; {member.role}</p>
                                <p className="text-xs text-brand-text-secondary mt-2">Member Since: {new Date(member.dateJoined).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t dark:border-dark-border text-sm space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-brand-text-secondary">Membership No.</span>
                                    <span className="font-mono font-semibold text-brand-text-primary">{member.privacySettings.isMembershipNumberPublic ? member.membershipNumber : '**********'}</span>
                                </div>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-brand-text-secondary">Show Publicly</span>
                                    <div className="relative"><input type="checkbox" className="sr-only" checked={!!member.privacySettings.isMembershipNumberPublic} onChange={handlePrivacyToggle} /><div className="block bg-gray-300 dark:bg-gray-600 w-10 h-6 rounded-full"></div><div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${member.privacySettings.isMembershipNumberPublic ? 'translate-x-4' : ''}`}></div></div>
                                </label>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-bold mb-2 text-brand-text-primary">Quick Actions</h3>
                            <div className="space-y-2">
                                <Button onClick={() => setIsStatementModalOpen(true)} variant="secondary" className="w-full justify-center"><DocumentTextIcon className="h-5 w-5 mr-2" />Request Statement</Button>
                                <Button onClick={() => setIsManageRubbiesModalOpen(true)} variant="secondary" className="w-full justify-center"><CubeIcon className="h-5 w-5 mr-2" />Manage Rubbies</Button>
                            </div>
                        </Card>
                    </div>

                    {/* --- MIDDLE COLUMN --- */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <h3 className="text-lg font-bold mb-1 text-brand-text-primary">Portfolio Overview</h3>
                            <p className="text-brand-text-secondary text-sm">Total Value</p>
                            <p className="text-4xl font-bold text-brand-primary">₦{totalPortfolioValue.toLocaleString()}</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={portfolioData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} labelLine={false}>
                                        {portfolioData.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => `₦${value.toLocaleString()}`} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-2">
                                {portfolioData.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm text-brand-text-primary">
                                        <div className="flex items-center"><span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>{item.name}</div>
                                        <span className="font-semibold">₦{item.value.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <h3 className="text-lg font-bold mb-4 text-brand-text-primary">My Holdings</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center text-brand-text-primary"><RocketLaunchIcon className="h-5 w-5 mr-2 text-brand-primary"/>Projects ({member.holdings.projects.length})</h4>
                                    <div className="space-y-1">
                                        {member.holdings.projects.map(h => {
                                            const project = community.projects.find(p => p.id === h.projectId);
                                            if (!project) return null;
                                            const progress = project.milestones.length > 0 ? (project.milestones.filter(m => m.isCompleted).length / project.milestones.length) * 100 : 0;
                                            return (<div key={h.projectId} onClick={() => setSelectedHolding(selectedHolding?.id === h.projectId ? null : { type: 'project', id: h.projectId })} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedHolding(selectedHolding?.id === h.projectId ? null : { type: 'project', id: h.projectId })} className={`p-2 rounded-md cursor-pointer transition-colors ${selectedHolding?.type === 'project' && selectedHolding?.id === h.projectId ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}><div className="flex justify-between text-xs mb-1 text-brand-text-secondary"><span>{project?.name}</span><span>{h.units} units</span></div><ProgressBar value={progress} /></div>)
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center text-brand-text-primary"><BanknotesIcon className="h-5 w-5 mr-2 text-green-500"/>Loans ({member.holdings.loans.length})</h4>
                                    <div className="space-y-1">
                                    {member.holdings.loans.map(l => {
                                        const progress = (l.amountRepaid / l.amount) * 100;
                                        return (<div key={l.id} onClick={() => setSelectedHolding(selectedHolding?.id === l.id ? null : { type: 'loan', id: l.id })} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedHolding(selectedHolding?.id === l.id ? null : { type: 'loan', id: l.id })} className={`p-2 rounded-md cursor-pointer transition-colors ${selectedHolding?.type === 'loan' && selectedHolding?.id === l.id ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}><div className="flex justify-between text-xs mb-1 text-brand-text-secondary"><span>{l.type}</span><span>Repaid: ₦{l.amountRepaid.toLocaleString()}</span></div><ProgressBar value={progress} color="bg-green-500"/></div>)
                                    })}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center text-brand-text-primary"><PiggyBankIcon className="h-5 w-5 mr-2 text-purple-500"/>Savings ({member.holdings.piggyBanks.length})</h4>
                                    <div className="space-y-1">
                                    {member.holdings.piggyBanks.map(s => {
                                        const progress = ((new Date().getTime() - new Date(s.startDate).getTime()) / (new Date(s.maturityDate).getTime() - new Date(s.startDate).getTime())) * 100;
                                        return (<div key={s.id} onClick={() => setSelectedHolding(selectedHolding?.id === s.id ? null : { type: 'savings', id: s.id })} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedHolding(selectedHolding?.id === s.id ? null : { type: 'savings', id: s.id })} className={`p-2 rounded-md cursor-pointer transition-colors ${selectedHolding?.type === 'savings' && selectedHolding?.id === s.id ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}><div className="flex justify-between text-xs mb-1 text-brand-text-secondary"><span>{s.productName}</span><span>Matures: {new Date(s.maturityDate).toLocaleDateString()}</span></div><ProgressBar value={progress} color="bg-purple-500"/></div>)
                                    })}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm mb-2 flex items-center text-brand-text-primary"><BuildingOffice2Icon className="h-5 w-5 mr-2 text-orange-500"/>Properties ({member.holdings.properties.length})</h4>
                                    <div className="space-y-1">
                                    {member.holdings.properties.map(h => (
                                        <div key={h.id} onClick={() => setSelectedHolding(selectedHolding?.id === h.propertyId ? null : { type: 'property', id: h.propertyId })} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedHolding(selectedHolding?.id === h.propertyId ? null : { type: 'property', id: h.propertyId })} className={`p-2 rounded-md cursor-pointer transition-colors flex justify-between items-center ${selectedHolding?.type === 'property' && selectedHolding?.id === h.propertyId ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                            <span className="text-xs text-brand-text-secondary">{h.propertyName}</span>
                                            <Button variant="secondary" className="!text-xs !py-0.5 !px-1" onClick={(e) => { e.stopPropagation(); setSellingProperty(h); }}>Sell</Button>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <h3 className="text-lg font-bold mb-4 text-brand-text-primary">My Fees & Dues</h3>
                            <div className="space-y-3">
                                {community.fees.map(fee => {
                                    const payment = member.paymentStatuses.find(p => p.feeId === fee.id);
                                    const status = payment ? getStatusWithOverdue(payment) : 'Unpaid';
                                    return (
                                        <div key={fee.id} className="flex justify-between items-center text-sm">
                                            <div><p className="font-semibold text-brand-text-primary">{fee.title}</p><p className="text-xs text-brand-text-secondary">₦{calculateFeeTotal(fee).toLocaleString()}</p></div>
                                            <div className="flex items-center gap-2"><span className={`px-2 py-1 text-xs rounded-full font-medium ${statusChip[status]}`}>{status}</span>{status !== 'Paid' && <Button className="!py-1 !px-2 text-xs">Pay</Button>}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                    </div>
                </div>
                {selectedHolding && (
                    <HoldingDetailView
                        holdingId={selectedHolding.id}
                        holdingType={selectedHolding.type}
                        member={member}
                        community={community}
                        onClose={() => setSelectedHolding(null)}
                    />
                )}
            </div>
        </>
    );
};

const MemberProfileView: React.FC<{ member: CommunityMember, onClose: () => void, currentUserId: string, isPartner: boolean }> = ({ member, onClose, currentUserId, isPartner }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
            <div className="flex justify-end"><button onClick={onClose} className="p-1"><XMarkIcon className="h-5 w-5"/></button></div>
            <div className="text-center -mt-4"><img src={member.avatarUrl} alt={member.fullName} className="h-24 w-24 rounded-full mx-auto border-4 border-white dark:border-dark-surface shadow-lg" /><h3 className="text-xl font-bold mt-2 text-brand-text-primary">{member.fullName}</h3><p className="text-sm text-brand-text-secondary">@{member.username} &bull; {member.role}</p></div>
            <div className="mt-6 space-y-4 text-sm border-t pt-6 dark:border-dark-border text-brand-text-primary">
                <div className="flex items-center"><AtSymbolIcon className="h-5 w-5 mr-3 text-brand-text-secondary"/><a href={`mailto:${member.email}`} className="hover:underline">{member.email}</a></div>
                <div className="flex items-center"><PhoneIcon className="h-5 w-5 mr-3 text-brand-text-secondary"/><span>{member.privacySettings.isPhoneNumberPublic ? member.phoneNumber : '******'}</span></div>
                <div className="flex items-center"><CakeIcon className="h-5 w-5 mr-3 text-brand-text-secondary"/><span>Joined on {new Date(member.dateJoined).toLocaleDateString()}</span></div>
                <div className="flex items-center"><IdentificationIcon className="h-5 w-5 mr-3 text-brand-text-secondary"/><span>Mem. No: {isPartner || member.id === currentUserId || member.privacySettings.isMembershipNumberPublic ? member.membershipNumber : '**********'}</span></div>
            </div>
        </Card>
    </div>
);

const MemberHoldingsModal: React.FC<{ member: CommunityMember, onClose: () => void }> = ({ member, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center"><h3 className="text-lg font-bold text-brand-text-primary">Holdings for {member.fullName}</h3><button onClick={onClose}><XMarkIcon className="h-6 w-6"/></button></div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2">
                <Card className="!p-4 bg-gray-50 dark:bg-dark-surface/50"><p className="text-sm font-bold text-brand-text-primary">Rubbies</p><p className="text-xl text-brand-text-primary">{member.holdings.rubbies.total.toLocaleString()} (≈ ₦{member.holdings.rubbies.value.toLocaleString()})</p></Card>
                <div><h4 className="font-bold mb-2 text-brand-text-primary">Projects</h4>
                    <div className="space-y-2">
                        {member.holdings.projects.length > 0 ? member.holdings.projects.map(p => <div key={p.projectId} className="p-2 border rounded dark:border-dark-border text-sm text-brand-text-primary">Project: {p.projectId}, Units: {p.units}</div>) : <p className="text-sm text-brand-text-secondary">No project investments.</p>}
                    </div>
                </div>
                 <div><h4 className="font-bold mb-2 text-brand-text-primary">Properties</h4>
                    <div className="space-y-2">
                        {member.holdings.properties.length > 0 ? member.holdings.properties.map(p => <div key={p.id} className="p-2 border rounded dark:border-dark-border text-sm text-brand-text-primary">{p.propertyName} ({p.variantName}) - {p.units} Unit(s)</div>) : <p className="text-sm text-brand-text-secondary">No property holdings.</p>}
                    </div>
                </div>
                 <div><h4 className="font-bold mb-2 text-brand-text-primary">Loans</h4>
                    <div className="space-y-2">
                        {member.holdings.loans.length > 0 ? member.holdings.loans.map(l => <div key={l.id} className="p-2 border rounded dark:border-dark-border text-sm text-brand-text-primary">{l.type} - ₦{l.amount.toLocaleString()}</div>) : <p className="text-sm text-brand-text-secondary">No active loans.</p>}
                    </div>
                </div>
                 <div><h4 className="font-bold mb-2 text-brand-text-primary">Savings</h4>
                    <div className="space-y-2">
                        {member.holdings.piggyBanks.length > 0 ? member.holdings.piggyBanks.map(s => <div key={s.id} className="p-2 border rounded dark:border-dark-border text-sm text-brand-text-primary">{s.productName} - ₦{s.principal.toLocaleString()}</div>) : <p className="text-sm text-brand-text-secondary">No active savings plans.</p>}
                    </div>
                </div>
            </div>
        </Card>
    </div>
);

const MemberCard: React.FC<{
    member: CommunityMember;
    isPartner: boolean;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onUpdateMember: (id: string, updates: Partial<CommunityMember>) => void;
    onStartMessage: (userId: string, userName: string) => void;
    onViewProfile: (member: CommunityMember) => void;
    onViewHoldings: (member: CommunityMember) => void;
    currentUserId: string;
}> = ({ member, isPartner, isSelected, onSelect, onUpdateMember, onStartMessage, onViewProfile, onViewHoldings, currentUserId }) => {
    const statusChip: Record<CommunityMember['status'], string> = { Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', Suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', Invited: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' };

    return (
        <Card className={`relative transition-all ${isSelected ? 'ring-2 ring-brand-primary dark:ring-dark-primary' : ''}`}>
            {isPartner && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(member.id)}
                    className="absolute top-4 right-4 h-5 w-5 rounded text-brand-primary focus:ring-brand-primary"
                    aria-label={`Select ${member.fullName}`}
                />
            )}
            <div className="flex flex-col items-center text-center">
                <img src={member.avatarUrl} alt={member.fullName} className="h-20 w-20 rounded-full mb-3" />
                <p className="font-bold text-lg text-brand-text-primary dark:text-dark-text-primary">{member.fullName}</p>
                <p className="text-sm text-brand-text-secondary dark:text-dark-text-secondary">@{member.username}</p>
                <p className="text-xs text-brand-text-secondary mt-1">
                    ID: { isPartner || member.id === currentUserId || member.privacySettings.isMembershipNumberPublic ? member.membershipNumber : '**********' }
                </p>
                <div className="my-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusChip[member.status]}`}>{member.status}</span>
                    {member.isPartner && <span className="ml-2 px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">Partner</span>}
                </div>
                <p className="text-xs text-brand-text-secondary">Joined: {new Date(member.dateJoined).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 pt-4 border-t dark:border-dark-border flex justify-center space-x-2">
                 <Button variant="secondary" className="!p-2" onClick={() => onViewProfile(member)} title="View Profile"><UserCircleIcon className="h-5 w-5"/></Button>
                 <Button variant="secondary" className="!p-2" onClick={() => onStartMessage(member.id, member.fullName)} title="Send Message"><EnvelopeIcon className="h-5 w-5"/></Button>
                {isPartner && (
                    <>
                        <Button variant="secondary" className="!p-2" onClick={() => onViewHoldings(member)} title="View Holdings"><WalletIcon className="h-5 w-5"/></Button>
                        <Button variant="secondary" className="!p-2" onClick={()=>onUpdateMember(member.id, {status: member.status === 'Active' ? 'Suspended' : 'Active'})} title={member.status === 'Active' ? 'Suspend' : 'Activate'}>
                            {member.status === 'Active' ? <UserMinusIcon className="h-5 w-5"/> : <UserPlusIcon className="h-5 w-5"/>}
                        </Button>
                    </>
                )}
            </div>
        </Card>
    );
};

const CommunityMembers: React.FC<{
    community: CommunityInfo;
    userRole: UserRole;
    onUpdateCommunity: (community: CommunityInfo) => void;
    onStartMessage: (userId: string, userName: string) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void;
    currentUser: CommunityMember | undefined;
}> = ({ community, userRole, onUpdateCommunity, onStartMessage, showToast, currentUser }) => {
    const [viewingProfile, setViewingProfile] = useState<CommunityMember | null>(null);
    const [viewingHoldings, setViewingHoldings] = useState<CommunityMember | null>(null);
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'All' | CommunityMember['status']>('All');
    const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'>('date-desc');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = viewMode === 'grid' ? 8 : 10;

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const isPartner = userRole === UserRole.PARTNER;
    const { members } = community;
    const currentUserId = currentUser?.id || '';


    const filteredAndSortedMembers = useMemo(() => {
        let processedMembers = [...members];

        if (searchTerm) {
            processedMembers = processedMembers.filter(m => 
                m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                m.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterStatus !== 'All') {
            processedMembers = processedMembers.filter(m => m.status === filterStatus);
        }

        processedMembers.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc': return a.fullName.localeCompare(b.fullName);
                case 'name-desc': return b.fullName.localeCompare(a.fullName);
                case 'date-asc': return new Date(a.dateJoined).getTime() - new Date(b.dateJoined).getTime();
                case 'date-desc': return new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime();
                default: return 0;
            }
        });

        return processedMembers;
    }, [members, searchTerm, filterStatus, sortBy]);
    
    const totalPages = Math.ceil(filteredAndSortedMembers.length / itemsPerPage);
    const currentMembers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredAndSortedMembers.slice(start, end);
    }, [filteredAndSortedMembers, currentPage, itemsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus, sortBy, viewMode]);

    const handleSelectMember = (id: string) => {
        setSelectedMemberIds(prev => 
            prev.includes(id) ? prev.filter(memberId => memberId !== id) : [...prev, id]
        );
    };

    const handleUpdateMember = (id: string, updates: Partial<CommunityMember>) => {
        const updatedMembers = members.map(m => m.id === id ? { ...m, ...updates } : m);
        onUpdateCommunity({ ...community, members: updatedMembers });
    };

    const handleBulkAction = (action: 'suspend' | 'activate') => {
        // FIX: Explicitly type `newStatus` to prevent it from being inferred as a generic `string`.
        const newStatus: CommunityMember['status'] = action === 'suspend' ? 'Suspended' : 'Active';
        const updatedMembers = members.map(m => selectedMemberIds.includes(m.id) ? { ...m, status: newStatus } : m);
        onUpdateCommunity({ ...community, members: updatedMembers });
        showToast(`${selectedMemberIds.length} members ${action === 'suspend' ? 'suspended' : 'activated'}.`);
        setSelectedMemberIds([]);
    };

    const handleBulkInvite = (emails: string[]) => {
        const newMembers: CommunityMember[] = emails.map((email, i) => ({
            id: `invited-${Date.now()}-${i}`,
            fullName: 'Invited Member',
            username: email.split('@')[0],
            avatarUrl: `https://picsum.photos/seed/invited${Date.now() + i}/48/48`,
            isPartner: false,
            role: 'Member',
            dateJoined: new Date().toISOString(),
            status: 'Invited',
            email: email,
            phoneNumber: '',
            birthDate: '',
            privacySettings: { isPhoneNumberPublic: false, isAddressPublic: false, isBirthYearPublic: true, messagePrivacy: 'members_only' },
            holdings: { lands: [], properties: [], rubbies: { total: 0, value: 0 }, projects: [], loans: [], piggyBanks: [] },
            paymentStatuses: []
        }));
        onUpdateCommunity({ ...community, members: [...community.members, ...newMembers] });
        showToast(`Sent invites to ${emails.length} new members.`, 'success');
        setIsInviteModalOpen(false);
    };
    
    const handleImport = (count: number) => {
        // This is a simulation
        const newMembers: CommunityMember[] = Array.from({ length: count }, (_, i) => ({
            id: `imported-${Date.now()}-${i}`,
            fullName: `Imported Member ${i+1}`,
            username: `imported${i+1}`,
            avatarUrl: `https://picsum.photos/seed/imported${Date.now() + i}/48/48`,
            isPartner: false,
            role: 'Member',
            dateJoined: new Date().toISOString(),
            status: 'Invited',
            email: `imported${i+1}@example.com`,
            phoneNumber: '',
            birthDate: '',
            privacySettings: { isPhoneNumberPublic: false, isAddressPublic: false, isBirthYearPublic: true, messagePrivacy: 'members_only' },
            holdings: { lands: [], properties: [], rubbies: { total: 0, value: 0 }, projects: [], loans: [], piggyBanks: [] },
            paymentStatuses: []
        }));
        onUpdateCommunity({ ...community, members: [...community.members, ...newMembers] });
        showToast(`Successfully imported ${count} new members.`, 'success');
        setIsImportModalOpen(false);
    };
    
    const statusChip: Record<CommunityMember['status'], string> = { Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', Suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', Invited: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' };

    return (<>
        {viewingProfile && <MemberProfileView member={viewingProfile} onClose={() => setViewingProfile(null)} currentUserId={currentUserId} isPartner={isPartner} />}
        {viewingHoldings && <MemberHoldingsModal member={viewingHoldings} onClose={() => setViewingHoldings(null)} />}
        {isInviteModalOpen && <BulkInviteModal onInvite={handleBulkInvite} onClose={() => setIsInviteModalOpen(false)} />}
        {isImportModalOpen && <ImportMembersModal onImport={handleImport} onClose={() => setIsImportModalOpen(false)} />}
        <Card>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-brand-text-primary">Community Directory ({filteredAndSortedMembers.length})</h3>
                <div className="flex items-center gap-4">
                     <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`} aria-label="Grid View"><Squares2X2Icon className="h-5 w-5" /></button>
                        <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode === 'list' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`} aria-label="List View"><Bars3Icon className="h-5 w-5" /></button>
                    </div>
                    {isPartner && <div className="flex items-center gap-2">
                        <Button onClick={() => setIsImportModalOpen(true)} variant="secondary"><DocumentPlusIcon className="h-5 w-5 mr-2" />Import</Button>
                        <Button onClick={() => setIsInviteModalOpen(true)}><UserPlusIcon className="h-5 w-5 mr-2" />Invite Member</Button>
                    </div>}
                </div>
            </div>

            <Card className="p-4 mb-6 bg-gray-50 dark:bg-dark-surface/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative md:col-span-2 lg:col-span-1">
                         <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"/>
                         <input type="text" placeholder="Search by name or username..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border"/>
                    </div>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Invited">Invited</option>
                    </select>
                     <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">
                        <option value="date-desc">Newest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                    </select>
                </div>
            </Card>

            {isPartner && selectedMemberIds.length > 0 && (
                <Card className="p-3 mb-6 bg-blue-50 dark:bg-blue-900/20 flex flex-col sm:flex-row justify-between items-center gap-2 animate-fade-in">
                    <p className="font-semibold text-sm text-brand-text-primary">{selectedMemberIds.length} member(s) selected.</p>
                    <div className="flex gap-2">
                        <Button variant="secondary" className="!text-xs !py-1" onClick={() => handleBulkAction('activate')}><UserPlusIcon className="h-4 w-4 mr-1"/>Activate</Button>
                        <Button variant="secondary" className="!text-xs !py-1" onClick={() => handleBulkAction('suspend')}><UserMinusIcon className="h-4 w-4 mr-1"/>Suspend</Button>
                        <Button variant="secondary" className="!text-xs !py-1"><EnvelopeIcon className="h-4 w-4 mr-1"/>Message</Button>
                        <Button variant="danger" className="!p-1.5" onClick={() => setSelectedMemberIds([])} title="Clear selection"><XMarkIcon className="h-4 w-4"/></Button>
                    </div>
                </Card>
            )}

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentMembers.map(member => (
                        <MemberCard
                            key={member.id}
                            member={member}
                            isPartner={isPartner}
                            isSelected={selectedMemberIds.includes(member.id)}
                            onSelect={handleSelectMember}
                            onUpdateMember={handleUpdateMember}
                            onStartMessage={onStartMessage}
                            onViewProfile={setViewingProfile}
                            onViewHoldings={setViewingHoldings}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-dark-surface/50">
                            <tr>
                                {isPartner && <th className="p-3 w-12 text-center"><input type="checkbox" className="h-4 w-4 rounded" onChange={(e) => setSelectedMemberIds(e.target.checked ? currentMembers.map(m => m.id) : [])} checked={currentMembers.length > 0 && selectedMemberIds.length === currentMembers.length} /></th>}
                                <th className="p-3 text-left text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Member</th>
                                <th className="p-3 text-left text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Membership No.</th>
                                <th className="p-3 text-left text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Role</th>
                                <th className="p-3 text-center text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Status</th>
                                <th className="p-3 text-left text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Date Joined</th>
                                <th className="p-3 text-center text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-dark-border">
                            {currentMembers.map(member => (
                                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-dark-surface/30">
                                    {isPartner && <td className="p-3 text-center"><input type="checkbox" checked={selectedMemberIds.includes(member.id)} onChange={() => handleSelectMember(member.id)} className="h-4 w-4 rounded" /></td>}
                                    <td className="p-3"><div className="flex items-center"><img src={member.avatarUrl} alt={member.fullName} className="h-10 w-10 rounded-full mr-3"/><div className="font-semibold text-brand-text-primary">{member.fullName}</div></div></td>
                                    <td className="p-3 text-brand-text-secondary">{ isPartner || member.id === currentUserId || member.privacySettings.isMembershipNumberPublic ? member.membershipNumber : '**********' }</td>
                                    <td className="p-3 text-brand-text-secondary">{member.role}</td>
                                    <td className="p-3 text-center"><span className={`px-2 py-1 text-xs rounded-full ${statusChip[member.status]}`}>{member.status}</span></td>
                                    <td className="p-3 text-brand-text-secondary">{new Date(member.dateJoined).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <div className="flex justify-center items-center space-x-1">
                                            <Button variant="secondary" className="!p-2" onClick={() => setViewingProfile(member)}><UserCircleIcon className="h-5 w-5 text-brand-text-secondary hover:text-brand-primary"/></Button>
                                            <Button variant="secondary" className="!p-2" onClick={() => onStartMessage(member.id, member.fullName)}><EnvelopeIcon className="h-5 w-5 text-brand-text-secondary hover:text-brand-primary"/></Button>
                                            {isPartner && <Button variant="secondary" className="!p-2" onClick={() => setViewingHoldings(member)}><WalletIcon className="h-5 w-5 text-brand-text-secondary hover:text-brand-primary"/></Button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
             <Card className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                <span className="text-sm text-brand-text-secondary">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedMembers.length)} to {Math.min(currentPage * itemsPerPage, filteredAndSortedMembers.length)} of {filteredAndSortedMembers.length} members
                </span>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                        <ChevronLeft className="h-5 w-5 mr-1" /> Previous
                    </Button>
                    <span className="text-sm font-medium px-2 text-brand-text-primary">Page {currentPage} of {totalPages}</span>
                    <Button variant="secondary" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                        Next <ChevronRight className="h-5 w-5 ml-1" />
                    </Button>
                </div>
            </Card>
        </Card>
    </>);
};

const BulkInviteModal: React.FC<{
    onClose: () => void;
    onInvite: (emails: string[]) => void;
}> = ({ onClose, onInvite }) => {
    const [emails, setEmails] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailList = emails.split(/[\n,;]+/).map(e => e.trim()).filter(e => e);
        if (emailList.length > 0) {
            onInvite(emailList);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-brand-text-primary">Invite New Members</h3>
                    <Button variant="secondary" className="!p-1.5" onClick={onClose}><XMarkIcon className="h-5 w-5"/></Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea value={emails} onChange={e => setEmails(e.target.value)} placeholder="Enter email addresses, separated by commas, spaces, or new lines." rows={6} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" required />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Send Invites</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

const ImportMembersModal: React.FC<{
    onClose: () => void;
    onImport: (count: number) => void;
}> = ({ onClose, onImport }) => {
    const [step, setStep] = useState(1);
    const [mapping, setMapping] = useState<{ [key: string]: string }>({ fullName: '', email: '' });
    const mockCsvHeaders = ['Name', 'Email Address', 'Member Role'];
    const requiredFields = { fullName: 'Full Name', email: 'Email' };
    
    const handleNextStep = () => setStep(prev => prev + 1);
    const handlePrevStep = () => setStep(prev => prev - 1);

    const isMappingComplete = Object.values(mapping).every(v => v !== '');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4">
            <Card className="w-full max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-brand-text-primary">Import Members from File (Step {step}/3)</h3>
                    <Button variant="secondary" className="!p-1.5" onClick={onClose}><XMarkIcon className="h-5 w-5"/></Button>
                </div>
                {step === 1 && <div className="text-center">
                    <ArrowUpOnSquareIcon className="mx-auto h-16 w-16 text-gray-300" />
                    <p className="font-semibold my-2 text-brand-text-primary">Upload your file</p>
                    <p className="text-sm text-brand-text-secondary mb-4">Select a CSV or Excel file containing member data.</p>
                    <Button onClick={handleNextStep}>Simulate File Upload</Button>
                </div>}
                {step === 2 && <div>
                    <p className="text-sm text-brand-text-secondary mb-4">Map the columns from your file to the required fields in the platform.</p>
                    <div className="space-y-3">
                        {Object.entries(requiredFields).map(([key, label]) => (
                            <div key={key} className="grid grid-cols-2 items-center gap-4">
                                <label className="font-semibold text-right text-brand-text-primary">{label}:</label>
                                <select value={mapping[key]} onChange={e => setMapping(prev => ({...prev, [key]: e.target.value}))} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">
                                    <option value="">Select column from your file...</option>
                                    {mockCsvHeaders.map(header => <option key={header} value={header}>{header}</option>)}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>}
                 {step === 3 && <div className="text-brand-text-primary">
                    <p className="text-sm text-brand-text-secondary mb-4">Review your import configuration. We'll simulate importing 5 members based on your mapping.</p>
                     <p><strong>Full Name</strong> will be imported from column <strong>"{mapping.fullName}"</strong>.</p>
                     <p><strong>Email</strong> will be imported from column <strong>"{mapping.email}"</strong>.</p>
                </div>}
                <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-dark-border">
                    <Button variant="secondary" onClick={step === 1 ? onClose : handlePrevStep}>
                        {step === 1 ? 'Cancel' : 'Back'}
                    </Button>
                     <Button onClick={step === 3 ? () => onImport(5) : handleNextStep} disabled={step === 2 && !isMappingComplete}>
                        {step === 3 ? 'Confirm & Import' : 'Next'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

const ProposeEventModal: React.FC<{
    onClose: () => void;
    onPropose: (title: string, date: string, description: string) => void;
}> = ({ onClose, onPropose }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !date || !description) return;
        onPropose(title, date, description);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-brand-text-primary">Propose New Event</h3>
                        <Button type="button" variant="secondary" className="!p-1.5" onClick={onClose}><XMarkIcon className="h-5 w-5"/></Button>
                    </div>
                    <div className="space-y-3">
                        <input name="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" />
                        <input name="date" type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" />
                        <textarea name="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} rows={3} required className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border"/>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Submit for Review</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

const CommunityEvents: React.FC<{ events: CommunityEvent[], userRole: UserRole, onUpdateEvents: (events: CommunityEvent[]) => void }> = ({ events, userRole, onUpdateEvents }) => {
    const [isProposing, setIsProposing] = useState(false);
    
    // Calendar state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    
    // Event handlers
    const handlePropose = (title: string, date: string, description: string) => {
        const newEvent: CommunityEvent = { id: `EVT-${Date.now()}`, title, date: new Date(date).toISOString(), description, status: 'Pending', submittedBy: 'John Doe' };
        onUpdateEvents([newEvent, ...events]);
        setIsProposing(false);
    };
    const handleDecision = (id: string, status: 'Approved' | 'Rejected') => {
        onUpdateEvents(events.map(e => e.id === id ? {...e, status} : e));
    };
    
    // Memoized data for calendar
    const { daysInMonth, firstDayOfMonth, month, year, eventsByDate } = useMemo(() => {
        const y = currentDate.getFullYear();
        const m = currentDate.getMonth();
        const dim = new Date(y, m + 1, 0).getDate();
        const fdom = new Date(y, m, 1).getDay();
        
        const map = new Map<number, CommunityEvent[]>();
        events.forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate.getMonth() === m && eventDate.getFullYear() === y) {
                const day = eventDate.getDate();
                if (!map.has(day)) map.set(day, []);
                map.get(day)!.push(event);
            }
        });

        return {
            daysInMonth: dim,
            firstDayOfMonth: fdom,
            month: m,
            year: y,
            eventsByDate: map,
        };
    }, [currentDate, events]);
    
    const selectedDateEvents = useMemo(() => {
        if (!selectedDate) return [];
        return events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getFullYear() === selectedDate.getFullYear() &&
                   eventDate.getMonth() === selectedDate.getMonth() &&
                   eventDate.getDate() === selectedDate.getDate();
        });
    }, [selectedDate, events]);

    const changeMonth = (delta: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(1); // Avoids issues with day numbers
            newDate.setMonth(prev.getMonth() + delta);
            return newDate;
        });
    };

    const statusChip: Record<CommunityEvent['status'], string> = { Approved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' };

    return (
        <>
            {isProposing && <ProposeEventModal onClose={() => setIsProposing(false)} onPropose={handlePropose} />}
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-brand-text-primary">Community Events</h3>
                    <Button onClick={() => setIsProposing(true)}><PlusIcon className="h-5 w-5 mr-2"/>Propose Event</Button>
                </div>
                
                <Card className="!p-4 bg-gray-50 dark:bg-dark-surface/50">
                    <div className="flex justify-between items-center mb-4">
                        <Button variant="secondary" onClick={() => changeMonth(-1)} className="!p-2"><ChevronLeft className="h-5 w-5"/></Button>
                        <h4 className="text-lg font-bold text-brand-text-primary">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                        <Button variant="secondary" onClick={() => changeMonth(1)} className="!p-2"><ChevronRight className="h-5 w-5"/></Button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-brand-text-secondary">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2">{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} className="h-24 bg-gray-100 dark:bg-gray-800/50 rounded-md"></div>)}
                        {Array.from({ length: daysInMonth }).map((_, day) => {
                            const dayNumber = day + 1;
                            const date = new Date(year, month, dayNumber);
                            const dayEvents = eventsByDate.get(dayNumber) || [];
                            const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                            const isToday = new Date().toDateString() === date.toDateString();
                            
                            return (
                                <div 
                                    key={day} 
                                    onClick={() => setSelectedDate(date)}
                                    className={`h-24 p-1 text-xs overflow-hidden rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-blue-200 dark:bg-blue-800' : 'bg-brand-surface dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    <div className={`font-bold text-right ${isToday ? 'text-brand-primary font-extrabold' : 'text-brand-text-primary'}`}>{dayNumber}</div>
                                    <div className="space-y-1 mt-1">
                                        {dayEvents.slice(0, 2).map(e => (
                                            <div key={e.id} className={`p-0.5 rounded text-white text-[10px] truncate ${e.status === 'Approved' ? 'bg-brand-primary' : 'bg-yellow-500'}`} title={e.title}>
                                                {e.title}
                                            </div>
                                        ))}
                                        {dayEvents.length > 2 && <div className="text-[10px] font-semibold text-center text-brand-text-secondary">+{dayEvents.length - 2} more</div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
                
                <div className="mt-6">
                    <h4 className="font-bold text-lg mb-2 text-brand-text-primary">
                        Events for {selectedDate ? selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : "..."}
                    </h4>
                    {selectedDateEvents.length > 0 ? (
                        <div className="space-y-4">
                            {selectedDateEvents.map(e => (
                                <div key={e.id} className="p-4 border rounded-lg dark:border-dark-border">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-bold text-brand-text-primary">{e.title}</p>
                                            <p className="text-sm mt-1 text-brand-text-secondary">{e.description}</p>
                                            <p className="text-xs mt-1 text-brand-text-secondary">Proposed by {e.submittedBy}</p>
                                        </div>
                                        <div className="text-right ml-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${statusChip[e.status]}`}>{e.status}</span>
                                        </div>
                                    </div>
                                    {userRole === 'Partner' && e.status === 'Pending' && (
                                        <div className="flex justify-end gap-2 mt-2 pt-2 border-t dark:border-dark-border">
                                            <Button variant="danger" className="!text-xs !py-1" onClick={() => handleDecision(e.id, 'Rejected')}>Reject</Button>
                                            <Button className="!text-xs !py-1" onClick={() => handleDecision(e.id, 'Approved')}>Approve</Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-brand-text-secondary py-6">No events scheduled for this day.</p>
                    )}
                </div>
            </Card>
        </>
    );
};

const AIGenerateUpdateModal: React.FC<{
    projectName: string;
    onClose: () => void;
    onApply: (updateText: string) => void;
}> = ({ projectName, onClose, onApply }) => {
    const [keyPoints, setKeyPoints] = useState('');
    const [generatedUpdate, setGeneratedUpdate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!keyPoints.trim()) {
            setError('Please provide some key points for the update.');
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedUpdate('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `You are a professional project manager for a community investment project called "${projectName}". Write a concise and encouraging project update for community members based on these key points: ${keyPoints}. Keep it under 100 words and format it nicely for a public announcement.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setGeneratedUpdate(response.text);
        } catch (err) {
            console.error(err);
            setError('Failed to generate update. Please check the console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-brand-text-primary">Generate Update with AI</h2>
                    <Button variant="secondary" className="!p-1.5" onClick={onClose}><XMarkIcon className="h-5 w-5"/></Button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="key-points" className="text-sm font-medium text-brand-text-secondary">Provide key points for the update:</label>
                        <textarea
                            id="key-points"
                            value={keyPoints}
                            onChange={e => setKeyPoints(e.target.value)}
                            placeholder="e.g., Foundation work started. Minor delay due to rain. New equipment purchased."
                            rows={4}
                            className="w-full mt-1 p-2 border rounded dark:bg-dark-surface dark:border-dark-border"
                        />
                    </div>
                    <Button onClick={handleGenerate} disabled={isLoading} className="w-full justify-center">
                        {isLoading ? 'Generating...' : <><SparklesIcon className="h-5 w-5 mr-2" />Generate Update</>}
                    </Button>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {generatedUpdate && (
                        <div className="space-y-2 pt-4 border-t dark:border-dark-border animate-fade-in">
                            <h3 className="font-semibold text-brand-text-primary">Generated Update:</h3>
                            <div className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-md whitespace-pre-wrap text-sm text-brand-text-primary">
                                {generatedUpdate}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="secondary" onClick={() => { onApply(generatedUpdate); onClose(); }}>Use this Update</Button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

const ProjectDashboard: React.FC<{ 
    project: Project; 
    onClose: () => void; 
    onUpdateProject: (p: Project) => void;
    userRole: UserRole;
    communityMembers: CommunityMember[];
}> = ({ project: initialProject, onClose, onUpdateProject, userRole, communityMembers }) => {
    const [project, setProject] = useState(initialProject);
    const [newComment, setNewComment] = useState("");
    const [updateText, setUpdateText] = useState("");
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('timeline');

    const isPartner = userRole === UserRole.PARTNER;

    const raisedAmount = useMemo(() => project.participants.reduce((sum, p) => sum + p.totalContribution, 0), [project.participants]);
    const targetAmount = project.enrollmentType === 'TargetBased' ? project.targetAmount : project.totalUnits * project.unitPrice;
    const fundingProgress = targetAmount ? (raisedAmount / targetAmount) * 100 : 0;

    const unifiedTimeline = useMemo(() => {
        const items = [];
        project.milestones.forEach(m => items.push({ date: m.deadline, type: 'Milestone Due', title: m.title, description: m.isCompleted ? 'Completed' : 'Upcoming', icon: CalendarIconOutline, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30' }));
        project.updates.forEach(u => items.push({ date: u.date, type: u.type, title: u.type === 'Delay' ? `Delay: ${u.delayDuration}` : 'Update', description: u.description, icon: u.type === 'Delay' ? ClockIcon : InformationCircleIcon, color: u.type === 'Delay' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400', bgColor: u.type === 'Delay' ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-blue-100 dark:bg-blue-900/30' }));
        project.financials.forEach(f => items.push({ date: f.date, type: f.type, title: f.description, description: `Amount: ₦${f.amount.toLocaleString()}`, icon: f.type === 'Expense' ? ArrowDownCircleIcon : ArrowUpCircleIcon, color: f.type === 'Expense' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400', bgColor: f.type === 'Expense' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30' }));
        return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [project.milestones, project.updates, project.financials]);

    const handlePostComment = () => {
        if (!newComment.trim()) return;
        const comment: ProjectComment = { id: `c-${Date.now()}`, authorId: 'd_user1', authorName: 'John Doe', authorAvatar: 'https://picsum.photos/seed/d-user1/48/48', content: newComment, timestamp: new Date().toISOString() };
        const updatedProject = { ...project, comments: [...(project.comments || []), comment] };
        setProject(updatedProject);
        onUpdateProject(updatedProject);
        setNewComment("");
    };

    const handlePostUpdate = () => {
        if (!updateText.trim()) return;
        const newUpdate: ProjectUpdate = {
            id: `UPD-${Date.now()}`,
            date: new Date().toISOString(),
            description: updateText,
            type: 'Update',
        };
        const updatedProject = { ...project, updates: [newUpdate, ...project.updates] };
        setProject(updatedProject);
        onUpdateProject(updatedProject);
        setUpdateText("");
    };
    
    const StatCard: React.FC<{label: string; value: string; icon: React.ElementType}> = ({ label, value, icon: Icon }) => (
        <Card className="flex items-center">
            <div className="p-3 rounded-full bg-brand-primary/10 mr-4">
                <Icon className="h-6 w-6 text-brand-primary"/>
            </div>
            <div>
                <p className="text-sm text-brand-text-secondary">{label}</p>
                <p className="text-2xl font-bold text-brand-text-primary">{value}</p>
            </div>
        </Card>
    );
    
    const TabButton: React.FC<{label: string, tabId: string}> = ({ label, tabId }) => (
         <button onClick={() => setActiveTab(tabId)} className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${activeTab === tabId ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-secondary'}`}>{label}</button>
    );

    return (
        <>
        {isAiModalOpen && <AIGenerateUpdateModal projectName={project.name} onClose={() => setIsAiModalOpen(false)} onApply={setUpdateText} />}
        <div className="fixed inset-0 bg-brand-background/80 dark:bg-dark-background/80 backdrop-blur-sm z-[60] p-4 lg:p-8 animate-fade-in" aria-modal="true" role="dialog">
            <div className="bg-brand-surface dark:bg-dark-surface rounded-2xl shadow-2xl w-full h-full flex flex-col">
                <header className="p-4 lg:p-6 border-b dark:border-dark-border flex items-center justify-between flex-shrink-0">
                    <div>
                        <Button variant="secondary" onClick={onClose} className="mb-2 !py-1 !px-2 text-sm"><ArrowLeftIcon className="h-4 w-4 mr-2"/>Back</Button>
                        <h2 className="text-3xl font-bold text-brand-text-primary">{project.name}</h2>
                        <p className="text-sm text-brand-text-secondary">{project.category}</p>
                    </div>
                    {isPartner && <Button variant='secondary'><PencilSquareIcon className="h-5 w-5 mr-2" />Edit Project</Button>}
                </header>
                <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6 overflow-hidden p-4 lg:p-6">
                    <main className="xl:col-span-2 flex flex-col gap-6 overflow-y-auto pr-4">
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatCard label="Funds Raised" value={`₦${raisedAmount.toLocaleString()}`} icon={ArrowTrendingUpIcon}/>
                            <StatCard label="Funding Target" value={`₦${targetAmount?.toLocaleString() || 'N/A'}`} icon={BanknotesIcon}/>
                            <StatCard label="Participants" value={project.participants.length.toString()} icon={UserGroupIcon}/>
                        </section>
                        <Card>
                            <h3 className="font-bold text-lg mb-1 text-brand-text-primary">Funding Progress</h3>
                             <div className="flex justify-between text-sm text-brand-text-secondary mb-2"><p>Progress</p><p>{fundingProgress.toFixed(1)}%</p></div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"><div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${fundingProgress}%` }}></div></div>
                        </Card>
                        <div>
                             <div className="border-b dark:border-dark-border"><nav className="-mb-px flex space-x-4"><TabButton label="Timeline" tabId="timeline"/><TabButton label="Overview" tabId="overview"/><TabButton label="Financials" tabId="financials"/></nav></div>
                             <div className="pt-6">
                                {activeTab === 'timeline' && (
                                    <div className="relative pl-8">
                                        <div className="absolute left-3 top-0 h-full w-0.5 bg-brand-border dark:bg-dark-border" aria-hidden="true"></div>
                                        {unifiedTimeline.map((item, index) => (
                                            <div key={index} className="relative mb-8">
                                                <div className={`absolute -left-[26px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center ${item.bgColor}`}><item.icon className={`h-4 w-4 ${item.color}`}/></div>
                                                <p className="text-xs text-brand-text-secondary">{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                <p className={`font-semibold text-sm ${item.color}`}>{item.type}</p>
                                                <p className="font-bold text-brand-text-primary dark:text-dark-text-primary">{item.title}</p>
                                                <p className="text-sm text-brand-text-secondary">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'overview' && (
                                    <div className="space-y-4 text-sm text-brand-text-primary">
                                         <p className="text-base text-brand-text-secondary mb-6">{project.description}</p>
                                        <p><span className="font-semibold text-brand-text-secondary w-32 inline-block">Supervisor:</span> {project.supervisor}</p>
                                        <p><span className="font-semibold text-brand-text-secondary w-32 inline-block">Manager:</span> {project.projectManager}</p>
                                        <p><span className="font-semibold text-brand-text-secondary w-32 inline-block">Unit Price:</span> ₦{project.unitPrice.toLocaleString()}</p>
                                        <p><span className="font-semibold text-brand-text-secondary w-32 inline-block">Enrollment Closes:</span> {new Date(project.enrollmentCloseDate).toLocaleDateString()}</p>
                                    </div>
                                )}
                                 {activeTab === 'financials' && (
                                    <div className="overflow-x-auto"><table className="min-w-full text-sm">
                                        <thead><tr className="text-brand-text-secondary"><th className="p-2 text-left">Date</th><th className="p-2 text-left">Description</th><th className="p-2 text-left">Type</th><th className="p-2 text-right">Amount</th></tr></thead>
                                        <tbody>{project.financials.map(f => <tr key={f.id}><td className="p-2">{new Date(f.date).toLocaleDateString()}</td><td className="p-2">{f.description}</td><td className={`p-2 font-semibold ${f.type==='Revenue' ? 'text-green-600' : 'text-red-600'}`}>{f.type}</td><td className="p-2 text-right font-mono">₦{f.amount.toLocaleString()}</td></tr>)}</tbody>
                                    </table></div>
                                )}
                             </div>
                        </div>

                    </main>
                    <aside className="flex flex-col gap-6 overflow-y-auto pr-2 xl:border-l xl:pl-6 dark:border-dark-border">
                         <Card>
                            <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-lg text-brand-text-primary">Participants ({project.participants.length})</h3>{isPartner && <Button variant="secondary" className="!p-1.5"><AddUserIcon className="h-4 w-4"/></Button>}</div>
                            <div className="space-y-2">
                                {project.participants.slice(0, 4).map(p=>(<div key={p.userId} className="flex items-center text-sm"><img src={`https://picsum.photos/seed/${p.userId}/32/32`} className="h-8 w-8 rounded-full mr-2" alt={p.fullName}/><span className="font-semibold text-brand-text-primary">{p.fullName}</span><span className="ml-auto text-brand-text-secondary">{p.units} units</span></div>))}
                                {project.participants.length > 4 && <p className="text-center text-xs text-brand-text-secondary mt-2">+ {project.participants.length-4} more</p>}
                            </div>
                         </Card>
                        <Card className="flex-1 flex flex-col">
                            <h3 className="font-bold text-lg mb-3 text-brand-text-primary">Discussion ({project.comments?.length || 0})</h3>
                            <div className="flex-1 space-y-3 overflow-y-auto mb-4 pr-2">
                                {(project.comments || []).map(comment => (
                                    <div key={comment.id} className="flex items-start space-x-2">
                                        <img src={comment.authorAvatar} alt={comment.authorName} className="h-8 w-8 rounded-full flex-shrink-0"/>
                                        <div className="bg-gray-100 dark:bg-dark-surface/50 p-2 rounded-lg flex-1">
                                            <div className="flex items-baseline"><p className="font-semibold text-xs text-brand-text-primary">{comment.authorName}</p><p className="text-xs text-brand-text-secondary ml-2">{new Date(comment.timestamp).toLocaleTimeString()}</p></div>
                                            <p className="text-sm text-brand-text-primary">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-auto pt-4 border-t dark:border-dark-border flex items-center gap-2">
                                <input value={newComment} onChange={e => setNewComment(e.target.value)} type="text" placeholder="Add a comment..." className="flex-1 p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border text-sm"/>
                                <Button onClick={handlePostComment} className="!p-2"><PaperAirplaneIcon className="h-5 w-5"/></Button>
                            </div>
                        </Card>
                        <Button className="w-full !py-3 !text-base">Invest in Project</Button>
                    </aside>
                </div>
            </div>
        </div>
        </>
    );
};

const ProjectOffers: React.FC<{ 
    project: Project; 
    onViewProject: (project: Project) => void; 
}> = ({ project, onViewProject }) => {
    const raisedAmount = useMemo(() => project.participants.reduce((sum, p) => sum + p.totalContribution, 0), [project.participants]);
    const targetAmount = project.enrollmentType === 'TargetBased' ? project.targetAmount : project.totalUnits * project.unitPrice;
    const fundingProgress = targetAmount ? (raisedAmount / targetAmount) * 100 : 0;
    
    return (
        <Card onClick={() => onViewProject(project)} className="cursor-pointer group hover:shadow-lg transition-shadow flex flex-col">
            <div className="flex-1">
                <h4 className="font-bold text-lg truncate group-hover:text-brand-primary text-brand-text-primary">{project.name}</h4>
                <p className="text-xs text-brand-text-secondary bg-gray-100 dark:bg-dark-surface/50 inline-block px-2 py-1 rounded-full">{project.category}</p>
                <p className="text-sm my-2 h-10 overflow-hidden text-brand-text-secondary">{project.description}</p>
            </div>
            <div className="mt-auto pt-4">
                <div className="flex justify-between text-xs text-brand-text-secondary mb-1">
                    <span>Progress</span>
                    <span>{fundingProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">
                    <div className="bg-brand-primary h-1.5 rounded-full" style={{ width: `${fundingProgress}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-brand-text-primary">
                    <span className="font-bold">₦{raisedAmount.toLocaleString()}</span>
                    <span className="text-brand-text-secondary">Target: ₦{targetAmount?.toLocaleString()}</span>
                </div>
            </div>
        </Card>
    );
};

const CommunityOffers: React.FC<{
    community: CommunityInfo;
    showToast: (message: string, type?: ToastMessage['type']) => void;
    userRole: UserRole;
    onUpdateCommunity: (updatedCommunity: CommunityInfo) => void;
    onViewProject: (project: Project) => void;
    currentUser: CommunityMember | undefined;
}> = ({ community, showToast, userRole, onUpdateCommunity, onViewProject, currentUser }) => {
    const [activeInvestmentTab, setActiveInvestmentTab] = useState('projects');
    
    const handleApplyForLoan = (loanData: { loanProductId: string, amount: number, tenure: number }) => {
        const product = community.loanProducts.find(p => p.id === loanData.loanProductId);
        if (!product || !community) return;

        const newApplication: LoanApplication = {
            id: `LA-${Date.now()}`,
            userId: 'd_user1', // mock current user
            userName: 'John Doe',
            loanProductId: product.id,
            loanProductName: product.name,
            amount: loanData.amount,
            tenure: loanData.tenure,
            dateSubmitted: new Date().toISOString(),
            status: 'Pending',
        };

        const updatedCommunity = {
            ...community,
            loanApplications: [...(community.loanApplications || []), newApplication],
        };
        onUpdateCommunity(updatedCommunity);
        showToast('Loan application submitted successfully!', 'success');
    };

    const handleBuyFromMarket = (listing: SecondaryMarketListing) => {
        if (!currentUser) {
            showToast('You must be logged in to make a purchase.', 'error');
            return;
        }

        const totalValue = listing.quantity * listing.pricePerUnit;
        const buyerCommissionRate = (listing.assetType === 'Rubby' ? community.rubbyTradingSettings?.buyerCommissionRate : community.propertyTradingSettings?.buyerCommissionRate) || 0;
        const sellerCommissionRate = (listing.assetType === 'Rubby' ? community.rubbyTradingSettings?.sellerCommissionRate : community.propertyTradingSettings?.sellerCommissionRate) || 0;
        const totalCommission = totalValue * ((buyerCommissionRate + sellerCommissionRate) / 100);

        const newRequest: MarketTradeRequest = {
            id: `MTR-${Date.now()}`,
            listingId: listing.id,
            assetType: listing.assetType,
            assetName: listing.assetName,
            variantName: listing.variantName,
            sellerId: listing.sellerId,
            sellerName: listing.sellerName,
            buyerId: currentUser.id,
            buyerName: currentUser.fullName,
            quantity: listing.quantity, // Assuming buying the whole listing for simplicity
            pricePerUnit: listing.pricePerUnit,
            totalValue: totalValue,
            commission: totalCommission,
            dateInitiated: new Date().toISOString(),
            status: 'Pending',
        };
        
        const updatedListings = (community.secondaryMarketListings || []).map(l => 
            l.id === listing.id ? { ...l, status: 'Locked' as const } : l
        );
        const updatedRequests = [...(community.marketTradeRequests || []), newRequest];

        onUpdateCommunity({
            ...community,
            secondaryMarketListings: updatedListings,
            marketTradeRequests: updatedRequests,
        });

        showToast('Purchase request sent for partner approval.', 'info');
    };
    
    const TabButton: React.FC<{tab: string, label: string, count: number}> = ({ tab, label, count }) => (
        <button onClick={() => setActiveInvestmentTab(tab)} className={`py-2 px-3 border-b-2 text-sm font-medium flex items-center gap-2 ${activeInvestmentTab === tab ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-secondary hover:text-gray-700'}`}>
            {label} <span className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5 text-brand-text-secondary">{count}</span>
        </button>
    );

    return (
        <div className="space-y-6">
            <FinancialCalculator 
                loanProducts={community.loanProducts} 
                piggyProducts={community.piggyProducts}
                onApply={handleApplyForLoan} 
            />
            <Card>
                <h3 className="text-xl font-bold mb-4 text-brand-text-primary">Investment Offers</h3>
                <div className="border-b dark:border-dark-border -mt-4"><nav className="-mb-px flex space-x-2 overflow-x-auto">
                    <TabButton tab="projects" label="Projects" count={community.projects.length} />
                    <TabButton tab="properties" label="Properties" count={community.propertiesForSale?.length || 0} />
                    <TabButton tab="rubbies" label="Rubbies" count={community.rubbyBatches.length} />
                    <TabButton tab="secondary_market" label="Secondary Market" count={community.secondaryMarketListings?.length || 0} />
                </nav></div>

                <div className="mt-6">
                {activeInvestmentTab === 'projects' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {community.projects.map(p => <ProjectOffers key={p.id} project={p} onViewProject={onViewProject} />)}
                    </div>
                )}
                
                {activeInvestmentTab === 'properties' && (community.propertiesForSale && community.propertiesForSale.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {community.propertiesForSale.map(property => (
                            <Card key={property.id} className="!p-0 overflow-hidden flex flex-col">
                                <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h4 className="font-bold text-lg text-brand-text-primary">{property.name}</h4>
                                    <p className="text-sm text-brand-text-secondary mb-2 flex-grow">{property.description}</p>
                                    <p className="text-lg font-bold text-brand-primary dark:text-blue-300">From ₦{Math.min(...property.variants.map(v => v.price)).toLocaleString()}</p>
                                    <Button variant="secondary" className="w-full mt-2">View Details</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : <p className="text-center text-brand-text-secondary py-8">No properties are currently for sale.</p>)}


                {activeInvestmentTab === 'rubbies' && <div className="space-y-4">
                    {community.rubbyBatches.map(batch => <Card key={batch.id}><p className="text-brand-text-primary">{batch.name} - ₦{batch.price}/Rubby</p><Button>Buy Now</Button></Card>)}
                </div>}

                {activeInvestmentTab === 'secondary_market' && <div className="space-y-4">
                    <p className="text-sm p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-blue-800 dark:text-blue-200">This is a peer-to-peer marketplace. Prices are set by members and all trades are subject to partner approval.</p>
                    {(community.secondaryMarketListings || []).map(listing => {
                         const settings = listing.assetType === 'Rubby' ? community.rubbyTradingSettings : community.propertyTradingSettings;
                         const totalValue = listing.quantity * listing.pricePerUnit;
                         const commission = totalValue * (((settings?.sellerCommissionRate || 0) + (settings?.buyerCommissionRate || 0)) / 100);
                        return (
                        <Card key={listing.id} className="!p-3">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                <div>
                                    <p className="font-bold text-brand-text-primary">{listing.quantity.toLocaleString()} units of {listing.assetName} {listing.variantName ? `(${listing.variantName})` : ''}</p>
                                    <p className="text-xs text-brand-text-secondary">From: {listing.sellerName}</p>
                                </div>
                                <div className="text-sm text-right mt-2 sm:mt-0">
                                    <p className="text-brand-text-primary">Price/unit: <span className="font-semibold">₦{listing.pricePerUnit.toLocaleString()}</span></p>
                                    <p className="text-brand-text-primary">Total Value: <span className="font-semibold">₦{totalValue.toLocaleString()}</span></p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button onClick={() => handleBuyFromMarket(listing)} disabled={listing.status !== 'Listed' || listing.sellerId === currentUser?.id}>
                                    {listing.status === 'Listed' ? 'Buy' : listing.status === 'Locked' ? 'Pending Sale' : 'Sold'}
                                </Button>
                            </div>
                        </Card>
                        )
                    })}
                </div>}
                </div>
            </Card>
        </div>
    );
};

const TradingSettingsForm: React.FC<{
    title: string;
    settings: TradingSettings;
    onSettingsChange: (newSettings: TradingSettings) => void;
    onSave: () => void;
}> = ({ title, settings, onSettingsChange, onSave }) => {
    const handleDayToggle = (dayIndex: number) => {
        const allowedDays = settings.allowedDays || [];
        const newAllowedDays = allowedDays.includes(dayIndex)
            ? allowedDays.filter(d => d !== dayIndex)
            : [...allowedDays, dayIndex];
        onSettingsChange({ ...settings, allowedDays: newAllowedDays.sort() });
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <Card>
            <h4 className="text-lg font-bold mb-4 text-brand-text-primary">{title}</h4>
            <div className="space-y-4">
                {/* Commission inputs */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Seller Commission (%)</label>
                        <input type="number" step="0.1" value={settings.sellerCommissionRate} onChange={e => onSettingsChange({ ...settings, sellerCommissionRate: +e.target.value })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                    </div>
                    <div>
                        <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Buyer Commission (%)</label>
                        <input type="number" step="0.1" value={settings.buyerCommissionRate} onChange={e => onSettingsChange({ ...settings, buyerCommissionRate: +e.target.value })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                    </div>
                </div>

                {/* Trading Mode */}
                <div>
                    <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Trading Window Mode</label>
                    <div className="flex gap-4 mt-2 p-1 bg-gray-100 dark:bg-dark-surface/50 rounded-lg">
                        <button onClick={() => onSettingsChange({ ...settings, tradingMode: 'daily' })} className={`w-full py-1 text-sm rounded-md ${settings.tradingMode === 'daily' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`}>Daily Window</button>
                        <button onClick={() => onSettingsChange({ ...settings, tradingMode: 'date_range' })} className={`w-full py-1 text-sm rounded-md ${settings.tradingMode === 'date_range' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`}>Date Range</button>
                    </div>
                </div>

                {/* Conditional fields */}
                {settings.tradingMode === 'daily' && (
                    <div className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-md space-y-3 animate-fade-in">
                        <div>
                            <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Allowed Days</label>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {daysOfWeek.map((day, index) => (
                                    <button key={day} onClick={() => handleDayToggle(index)} className={`px-3 py-1 text-xs rounded-full border ${settings.allowedDays?.includes(index) ? 'bg-brand-primary text-white border-brand-primary' : 'bg-transparent dark:border-dark-border hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{day}</button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Start Time</label>
                                <input type="time" value={settings.startTime || ''} onChange={e => onSettingsChange({ ...settings, startTime: e.target.value })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                            </div>
                            <div>
                                <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">End Time</label>
                                <input type="time" value={settings.endTime || ''} onChange={e => onSettingsChange({ ...settings, endTime: e.target.value })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                            </div>
                        </div>
                    </div>
                )}

                {settings.tradingMode === 'date_range' && (
                    <div className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-md space-y-3 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Start Date</label>
                                <input type="date" value={settings.startDate?.split('T')[0] || ''} onChange={e => onSettingsChange({ ...settings, startDate: new Date(e.target.value).toISOString() })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                            </div>
                            <div>
                                <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">End Date</label>
                                <input type="date" value={settings.endDate?.split('T')[0] || ''} onChange={e => onSettingsChange({ ...settings, endDate: new Date(e.target.value).toISOString() })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                            </div>
                        </div>
                    </div>
                )}
                
                <Button onClick={onSave} className="w-full !mt-6">Save Settings</Button>
            </div>
        </Card>
    );
};


const PartnerPanel: React.FC<{
    community: CommunityInfo;
    onUpdateCommunity: (community: CommunityInfo) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void;
}> = ({ community, onUpdateCommunity, showToast }) => {
    const [activeTab, setActiveTab] = useState('projects');
    const [viewingProject, setViewingProject] = useState<Project | null>(null);

    const handleUpdateProject = (updatedProject: Project) => {
        const updatedProjects = community.projects.map(p => p.id === updatedProject.id ? updatedProject : p);
        onUpdateCommunity({ ...community, projects: updatedProjects });
    };

    const tabs = [
        { id: 'projects', label: 'Projects', icon: ClipboardDocumentListIcon },
        { id: 'fees', label: 'Fees', icon: ReceiptPercentIcon },
        { id: 'rubbies', label: 'Rubbies', icon: CubeIcon },
        { id: 'loans', label: 'Loans', icon: BanknotesIcon },
        { id: 'savings', label: 'Savings', icon: PiggyBankIcon },
        { id: 'transactions', label: 'Transactions', icon: ArrowTrendingUpIcon },
        { id: 'market', label: 'Secondary Market', icon: BuildingStorefrontIcon },
        { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
    ];

    const TabButton: React.FC<{tab: typeof tabs[0]}> = ({ tab }) => (
        <button 
            onClick={() => setActiveTab(tab.id)} 
            className={`flex items-center space-x-2 px-3 py-2 font-semibold rounded-t-lg text-sm whitespace-nowrap transition-colors ${activeTab === tab.id 
                ? 'bg-brand-surface dark:bg-dark-surface border-b-2 border-brand-primary text-brand-primary' 
                : 'text-brand-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
        >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
        </button>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'projects': return <ProjectManagementPanel projects={community.projects} onViewProject={setViewingProject} />;
            case 'fees': return <FeeManagementPanel community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} />;
            case 'rubbies': return <RubbyManagementPanel community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} />;
            case 'loans': return <LoanManagementPanel community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} />;
            case 'savings': return <SavingsManagementPanel community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} />;
            case 'transactions': return <TransactionManagementPanel transactions={community.transactionHistory || []} />;
            case 'market': return <SecondaryMarketPanel community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} />;
            case 'settings': return <CommunitySettingsPanel community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} />;
            default: return <p>Select a tab</p>;
        }
    };

    return (
        <>
        {viewingProject && <ProjectDashboard project={viewingProject} onClose={() => setViewingProject(null)} onUpdateProject={handleUpdateProject} userRole={UserRole.PARTNER} communityMembers={community.members} />}
        <Card className="!p-0">
            <div className="px-6 pt-4">
                <h3 className="text-2xl font-bold text-brand-text-primary">Partner Control Panel</h3>
                <p className="text-sm text-brand-text-secondary">Manage your community's finances, projects, and members.</p>
                <div className="border-b dark:border-dark-border mt-4">
                    <nav className="-mb-px flex space-x-2 overflow-x-auto">
                        {tabs.map(tab => <TabButton key={tab.id} tab={tab} />)}
                    </nav>
                </div>
            </div>
            <div className="p-6 bg-brand-background dark:bg-dark-surface/30 rounded-b-xl">
                {renderContent()}
            </div>
        </Card>
        </>
    );
};

// Sub-panels for the Partner Panel
const ProjectManagementPanel: React.FC<{projects: Project[], onViewProject: (p: Project) => void}> = ({projects, onViewProject}) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <div>
                <h4 className="text-xl font-bold text-brand-text-primary">Project Management</h4>
                <p className="text-sm text-brand-text-secondary">Create, manage, and track all community projects and investments from here.</p>
            </div>
            <Button><PlusIcon className="h-5 w-5 mr-2"/>Create New Project</Button>
        </div>
        <div className="space-y-3">
            {projects.map(p => (
                <Card key={p.id} className="!p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:shadow-md transition-shadow">
                    <div>
                        <p className="font-bold text-brand-text-primary">{p.name}</p>
                        <p className="text-xs text-brand-text-secondary">{p.participants.length} participants | {p.category}</p>
                    </div>
                    <div className="flex items-center space-x-1 flex-wrap gap-1">
                        <Button onClick={() => onViewProject(p)} variant="secondary" className="!text-xs !py-1 !px-2 flex items-center"><EyeIcon className="h-4 w-4 mr-1"/>View Details</Button>
                        <Button variant="secondary" className="!text-xs !py-1 !px-2 flex items-center"><UserGroupIcon className="h-4 w-4 mr-1"/>Participants</Button>
                        <Button variant="secondary" className="!text-xs !py-1 !px-2 flex items-center"><ArrowDownTrayIcon className="h-4 w-4 mr-1"/>Import Data</Button>
                        <Button variant="secondary" className="!text-xs !py-1 !px-2 flex items-center"><ArrowUpTrayIcon className="h-4 w-4 mr-1"/>Export Data</Button>
                        <Button variant="secondary" className="!text-xs !py-1 !px-2 flex items-center"><PlusIcon className="h-4 w-4 mr-1"/>Add Update</Button>
                        <Button variant="secondary" className="!p-1.5"><PencilIcon className="h-4 w-4"/></Button>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const FeeManagementPanel: React.FC<{community: CommunityInfo, onUpdateCommunity: (c: CommunityInfo) => void, showToast: (m: string, t?: ToastMessage['type']) => void}> = ({community, onUpdateCommunity, showToast}) => {
    // Implement full fee management logic here
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'All' | 'Mandatory' | 'Opt-in'>('All');
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingFee, setEditingFee] = useState<CommunityFee | null>(null);
    const [viewingMembersFee, setViewingMembersFee] = useState<CommunityFee | null>(null);

    const filteredFees = useMemo(() => {
        return (community.fees || [])
            .filter(fee => filterType === 'All' || fee.type === filterType)
            .filter(fee => fee.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [community.fees, filterType, searchTerm]);

    const handleSaveFee = (feeData: CommunityFee) => {
        const isEditing = community.fees.some(f => f.id === feeData.id);
        const updatedFees = isEditing
            ? community.fees.map(f => f.id === feeData.id ? feeData : f)
            : [{ ...feeData, id: `FEE-${Date.now()}` }, ...community.fees];
        onUpdateCommunity({ ...community, fees: updatedFees });
        showToast(`Fee successfully ${isEditing ? 'updated' : 'created'}!`, 'success');
        setIsFormModalOpen(false);
        setEditingFee(null);
    };

    const handleDeleteFee = (feeId: string) => {
        if (window.confirm('Are you sure you want to delete this fee? This action cannot be undone.')) {
            const updatedFees = community.fees.filter(f => f.id !== feeId);
            onUpdateCommunity({ ...community, fees: updatedFees });
            showToast('Fee deleted.', 'error');
        }
    };
    
    const handleEditFee = (fee: CommunityFee) => {
        setEditingFee(fee);
        setIsFormModalOpen(true);
    };

    const handleCreateFee = () => {
        setEditingFee(null);
        setIsFormModalOpen(true);
    };

    return <>
        {isFormModalOpen && <FeeFormModal fee={editingFee} onClose={() => setIsFormModalOpen(false)} onSave={handleSaveFee} />}
        {viewingMembersFee && <MemberPaymentsModal fee={viewingMembersFee} members={community.members} onClose={() => setViewingMembersFee(null)} />}
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h4 className="text-xl font-bold text-brand-text-primary">Fee & Dues Management</h4>
                    <p className="text-sm text-brand-text-secondary">Create and monitor all financial obligations for community members.</p>
                </div>
                <Button onClick={handleCreateFee}><PlusIcon className="h-5 w-5 mr-2" />Create New Fee</Button>
            </div>
            <Card className="!p-4 bg-gray-50 dark:bg-dark-surface/50">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow"><MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" /><input type="text" placeholder="Search fees by title..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" /></div>
                    <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border"><option value="All">All Types</option><option value="Mandatory">Mandatory</option><option value="Opt-in">Opt-in</option></select>
                </div>
            </Card>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-dark-surface/50 text-brand-text-secondary dark:text-brand-text-secondary"><tr>
                        <th className="p-2 text-left font-semibold">Title</th><th className="p-2 text-left font-semibold">Type</th><th className="p-2 text-left font-semibold">Frequency</th><th className="p-2 text-right font-semibold">Total Amount</th><th className="p-2 text-center font-semibold">Actions</th>
                    </tr></thead>
                    <tbody className="text-brand-text-primary dark:text-brand-text-primary">
                        {filteredFees.map(fee => (
                            <tr key={fee.id} className="border-b dark:border-dark-border">
                                <td className="p-2 font-semibold">{fee.title}</td><td className="p-2">{fee.type}</td><td className="p-2">{fee.frequency}</td><td className="p-2 text-right font-mono">₦{calculateFeeTotal(fee).toLocaleString()}</td>
                                <td className="p-2"><div className="flex justify-center gap-2"><Button onClick={() => setViewingMembersFee(fee)} variant="secondary" className="!text-xs !py-1 !px-2">Members</Button><Button onClick={() => handleEditFee(fee)} variant="secondary" className="!p-1.5"><PencilIcon className="h-4 w-4" /></Button><Button onClick={() => handleDeleteFee(fee.id)} variant="danger" className="!p-1.5"><TrashIcon className="h-4 w-4" /></Button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>;
};

const FeeFormModal: React.FC<{fee: CommunityFee | null; onClose: () => void; onSave: (fee: CommunityFee) => void;}> = ({ fee, onClose, onSave }) => {
    const defaultFee: Omit<CommunityFee, 'id'> = { title: '', type: 'Mandatory', frequency: DueFrequency.ONETIME, items: [{ id: `item-${Date.now()}`, name: '', description: '', amount: 0 }], taxRate: 0, paymentStructure: 'full' };
    const [formData, setFormData] = useState<Omit<CommunityFee, 'id'>>(fee ? { ...fee } : defaultFee);

    const handleItemChange = (index: number, field: keyof FeeItem, value: string | number) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData({ ...formData, items: newItems });
    };
    const handleAddItem = () => setFormData({ ...formData, items: [...formData.items, { id: `item-${Date.now()}`, name: '', description: '', amount: 0 }] });
    const handleRemoveItem = (index: number) => setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });

    const handleInstallmentChange = (index: number, field: keyof FeeInstallment, value: string | number) => {
        const newInstallments = [...(formData.installments || [])];
        newInstallments[index] = { ...newInstallments[index], [field]: value };
        setFormData({ ...formData, installments: newInstallments });
    };
    const handleAddInstallment = () => {
        const existing = formData.installments || [];
        setFormData({ ...formData, installments: [...existing, { stage: existing.length + 1, amount: 0, dueDate: '' }] });
    };
    const handleRemoveInstallment = (index: number) => setFormData({ ...formData, installments: (formData.installments || []).filter((_, i) => i !== index) });
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: fee?.id || '' });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4"><Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-brand-text-primary">{fee ? 'Edit' : 'Create'} Fee</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-2">
                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Fee Title" className="w-full p-2 border rounded" required/>
                <div className="grid grid-cols-2 gap-4"><select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full p-2 border rounded"><option value="Mandatory">Mandatory</option><option value="Opt-in">Opt-in</option></select><select value={formData.frequency} onChange={e => setFormData({...formData, frequency: e.target.value as any})} className="w-full p-2 border rounded">{Object.values(DueFrequency).map(f=><option key={f}>{f}</option>)}</select></div>
                <div><label className="text-brand-text-primary">Fee Items</label>{formData.items.map((item, i) => (<div key={item.id} className="flex gap-2 items-center mb-2"><input value={item.name} onChange={e => handleItemChange(i, 'name', e.target.value)} placeholder="Item Name" className="w-full p-2 border rounded" /><input value={item.amount} onChange={e => handleItemChange(i, 'amount', Number(e.target.value))} type="number" placeholder="Amount" className="w-48 p-2 border rounded" /><Button type="button" variant="danger" className="!p-2" onClick={() => handleRemoveItem(i)}><TrashIcon className="h-4 w-4"/></Button></div>))}{formData.items.length < 5 && <Button type="button" variant="secondary" onClick={handleAddItem}>Add Item</Button>}</div>
                <div><label className="text-brand-text-primary">Tax Rate (%)</label><input type="number" step="0.1" value={formData.taxRate} onChange={e => setFormData({...formData, taxRate: Number(e.target.value)})} className="w-full p-2 border rounded"/></div>
                <div><label className="text-brand-text-primary">Payment Structure</label><div className="flex gap-4 mt-1 text-brand-text-primary"><label><input type="radio" name="paymentStructure" value="full" checked={formData.paymentStructure === 'full'} onChange={() => setFormData({...formData, paymentStructure: 'full'})} /> Full Payment</label><label><input type="radio" name="paymentStructure" value="installment" checked={formData.paymentStructure === 'installment'} onChange={() => setFormData({...formData, paymentStructure: 'installment'})}/> Installmental</label></div></div>
                {formData.paymentStructure === 'installment' && <div><label className="text-brand-text-primary">Installments</label>{(formData.installments || []).map((inst, i) => (<div key={i} className="flex gap-2 items-center mb-2"><input value={inst.amount} onChange={e => handleInstallmentChange(i, 'amount', Number(e.target.value))} type="number" placeholder="Amount" className="w-full p-2 border rounded" /><input value={inst.dueDate.split('T')[0]} onChange={e => handleInstallmentChange(i, 'dueDate', new Date(e.target.value).toISOString())} type="date" className="w-full p-2 border rounded" /><Button type="button" variant="danger" className="!p-2" onClick={() => handleRemoveInstallment(i)}><TrashIcon className="h-4 w-4"/></Button></div>))}{ (formData.installments || []).length < 6 && <Button type="button" variant="secondary" onClick={handleAddInstallment}>Add Installment</Button>}</div>}
                <div className="flex justify-end gap-2 pt-4 border-t"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Save Fee</Button></div>
            </form>
        </Card></div>
    );
};

const MemberPaymentsModal: React.FC<{fee: CommunityFee; members: CommunityMember[]; onClose: () => void;}> = ({ fee, members, onClose }) => {
    const statusChip: Record<PaymentStatus, string> = { Paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', Unpaid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', Overdue: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4"><Card className="w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-brand-text-primary">Payment Status for: {fee.title}</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                {members.map(member => {
                    const payment = member.paymentStatuses.find(ps => ps.feeId === fee.id);
                    const status = payment?.status || 'Unpaid';
                    return (<div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-surface/50 rounded-md">
                        <div className="flex items-center"><img src={member.avatarUrl} alt={member.fullName} className="h-8 w-8 rounded-full mr-3" /><span className="text-brand-text-primary">{member.fullName}</span></div>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusChip[status]}`}>{status}</span>
                    </div>);
                })}
            </div>
        </Card></div>
    );
};


const RubbyManagementPanel: React.FC<{community: CommunityInfo, onUpdateCommunity: (c: CommunityInfo) => void, showToast: (m: string) => void}> = ({community, onUpdateCommunity, showToast}) => {
    const [activeTab, setActiveTab] = useState<'batches' | 'transfers'>('batches');
    const getStatusChip = (status: 'Active' | 'Ended') => (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-200 text-brand-text-secondary dark:bg-gray-700 dark:text-brand-text-secondary'}`}>{status}</span>
    );
    return <div>
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-brand-text-primary">Rubby Management</h4>
            <div className="flex items-center bg-gray-200 dark:bg-dark-surface p-1 rounded-lg">
                <button onClick={() => setActiveTab('batches')} className={`px-3 py-1 text-sm rounded-md ${activeTab === 'batches' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`}>Sale Batches</button>
                <button onClick={() => setActiveTab('transfers')} className={`px-3 py-1 text-sm rounded-md ${activeTab === 'transfers' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`}>Transfer Requests</button>
            </div>
        </div>
        {activeTab === 'batches' && <div className="space-y-4">
            <div className="flex justify-end"><Button><PlusIcon className="h-5 w-5 mr-2"/>Create New Batch</Button></div>
            {community.rubbyBatches.map(batch => {
                 const progress = (batch.volumeSold / batch.totalVolume) * 100;
                 const isActive = new Date(batch.stopDate) > new Date();
                 return <Card key={batch.id}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-brand-text-primary">{batch.name}</p>
                            <p className="text-sm text-brand-text-secondary">₦{batch.price} / Rubby</p>
                        </div>
                        {getStatusChip(isActive ? 'Active' : 'Ended')}
                    </div>
                    <div className="mt-2">
                         <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1"><div className="bg-brand-primary h-2 rounded-full" style={{width: `${progress}%`}}></div></div>
                        <div className="flex justify-between text-xs text-brand-text-secondary">
                            <span>{progress.toFixed(1)}% Sold</span>
                            <span>{batch.volumeSold.toLocaleString()} / {batch.totalVolume.toLocaleString()}</span>
                        </div>
                    </div>
                 </Card>
            })}
        </div>}
        {activeTab === 'transfers' && <div> {/* Transfer requests UI */} <p className="text-center p-8 text-brand-text-secondary">Transfer requests UI coming soon.</p> </div>}
    </div>;
};

// FIX: Add missing LoanManagementPanel component definition
const LoanManagementPanel: React.FC<{community: CommunityInfo, onUpdateCommunity: (c: CommunityInfo) => void, showToast: (m: string, t?: ToastMessage['type']) => void}> = ({community, onUpdateCommunity, showToast}) => {
    const [activeTab, setActiveTab] = useState<'applications' | 'products'>('applications');

    const handleApplicationDecision = (applicationId: string, decision: 'Approved' | 'Rejected') => {
        const updatedApplications = (community.loanApplications || []).map(app => 
            app.id === applicationId ? { ...app, status: decision } : app
        );
        onUpdateCommunity({ ...community, loanApplications: updatedApplications });
        showToast(`Loan application ${applicationId} has been ${decision.toLowerCase()}.`, decision === 'Approved' ? 'success' : 'info');
        // In a real app, you'd also create a LoanHolding record for the user.
    };

    const getStatusChip = (status: LoanApplication['status']) => {
        const styles = {
            Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            Approved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
            Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        };
        return <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status]}`}>{status}</span>;
    };

    return <div>
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-brand-text-primary">Loan Management</h4>
             <div className="flex items-center bg-gray-200 dark:bg-dark-surface p-1 rounded-lg">
                <button onClick={() => setActiveTab('applications')} className={`px-3 py-1 text-sm rounded-md ${activeTab === 'applications' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`}>Applications</button>
                <button onClick={() => setActiveTab('products')} className={`px-3 py-1 text-sm rounded-md ${activeTab === 'products' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`}>Products</button>
            </div>
        </div>
        {activeTab === 'applications' && <div className="space-y-4">
            <h5 className="font-semibold text-brand-text-primary">Pending Applications</h5>
            {(community.loanApplications || []).filter(a => a.status === 'Pending').map(app => (
                <Card key={app.id} className="!p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-brand-text-primary">{app.userName} - ₦{app.amount.toLocaleString()}</p>
                            <p className="text-sm text-brand-text-secondary">{app.loanProductName} for {app.tenure} months</p>
                        </div>
                        <div className="flex gap-2">
                             <Button onClick={() => handleApplicationDecision(app.id, 'Approved')} className="!text-xs !py-1">Approve</Button>
                             <Button onClick={() => handleApplicationDecision(app.id, 'Rejected')} variant="danger" className="!text-xs !py-1">Reject</Button>
                        </div>
                    </div>
                </Card>
            ))}
            <h5 className="font-semibold pt-4 border-t text-brand-text-primary">All Applications</h5>
            <div className="overflow-x-auto"><table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-dark-surface/50 text-xs"><tr className="text-brand-text-secondary">
                    <th className="p-2 text-left">Applicant</th><th className="p-2 text-left">Product</th><th className="p-2 text-right">Amount</th><th className="p-2 text-center">Status</th>
                </tr></thead>
                <tbody className="divide-y dark:divide-dark-border text-brand-text-primary">{(community.loanApplications || []).map(app => (
                    <tr key={app.id}><td className="p-2">{app.userName}</td><td className="p-2">{app.loanProductName}</td><td className="p-2 text-right">₦{app.amount.toLocaleString()}</td><td className="p-2 text-center">{getStatusChip(app.status)}</td></tr>
                ))}</tbody>
            </table></div>
        </div>}
        {activeTab === 'products' && <div className="space-y-4">
             <div className="flex justify-end"><Button><PlusIcon className="h-5 w-5 mr-2"/>Create New Loan Product</Button></div>
             {(community.loanProducts || []).map(prod => (
                 <Card key={prod.id} className="!p-3">
                     <p className="font-bold text-brand-text-primary">{prod.name}</p>
                     <p className="text-sm text-brand-text-secondary">{prod.description}</p>
                 </Card>
             ))}
        </div>}
    </div>
};

const SavingsManagementPanel: React.FC<{community: CommunityInfo, onUpdateCommunity: (c: CommunityInfo) => void, showToast: (m: string) => void}> = ({ community, onUpdateCommunity, showToast }) => {
    const [activeTab, setActiveTab] = useState<'products' | 'membersavings'>('products');
    const allSavings = useMemo(() => {
        return community.members.flatMap(member => 
            member.holdings.piggyBanks.map(holding => ({
                ...holding,
                memberId: member.id,
                memberName: member.fullName,
            }))
        );
    }, [community.members]);

    const handleSaveProduct = (product: PiggyProduct) => {
        const isEditing = community.piggyProducts.some(p => p.id === product.id);
        const updatedProducts = isEditing 
            ? community.piggyProducts.map(p => p.id === product.id ? product : p)
            : [...community.piggyProducts, { ...product, id: `PP-${Date.now()}` }];
        onUpdateCommunity({ ...community, piggyProducts: updatedProducts });
        showToast(`Savings product ${isEditing ? 'updated' : 'created'}!`);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-brand-text-primary">Savings Management</h4>
                <div className="flex items-center bg-gray-200 dark:bg-dark-surface p-1 rounded-lg">
                    <button onClick={() => setActiveTab('products')} className={`px-3 py-1 text-sm rounded-md ${activeTab === 'products' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`}>Products</button>
                    <button onClick={() => setActiveTab('membersavings')} className={`px-3 py-1 text-sm rounded-md ${activeTab === 'membersavings' ? 'bg-brand-surface dark:bg-dark-surface shadow' : ''}`}>Member Savings</button>
                </div>
            </div>

            {activeTab === 'products' && (
                <div className="space-y-4">
                    <div className="flex justify-end"><Button><PlusIcon className="h-5 w-5 mr-2"/>Create Product</Button></div>
                    {community.piggyProducts.map(product => (
                        <Card key={product.id} className="!p-4">
                            <p className="font-bold text-brand-text-primary">{product.name} - {product.interestRate}% p.a.</p>
                            <p className="text-sm text-brand-text-secondary">{product.description}</p>
                        </Card>
                    ))}
                </div>
            )}
            
            {activeTab === 'membersavings' && (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-dark-surface/50">
                            <tr className="text-brand-text-secondary">
                                <th className="p-2 text-left font-semibold">Member</th>
                                <th className="p-2 text-left font-semibold">Product</th>
                                <th className="p-2 text-right font-semibold">Principal</th>
                                <th className="p-2 text-left font-semibold">Maturity Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-dark-border">
                            {allSavings.map(saving => (
                                <tr key={saving.id} className="text-brand-text-primary">
                                    <td className="p-2">{saving.memberName}</td>
                                    <td className="p-2">{saving.productName}</td>
                                    <td className="p-2 text-right font-mono">₦{saving.principal.toLocaleString()}</td>
                                    <td className="p-2">{new Date(saving.maturityDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
const TransactionManagementPanel: React.FC<{ transactions: CommunityTransaction[] }> = ({ transactions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<CommunityTransaction['type'] | 'All'>('All');
    
    const filtered = useMemo(() => transactions.filter(t => 
        (typeFilter === 'All' || t.type === typeFilter) &&
        (t.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         t.id.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [transactions, searchTerm, typeFilter]);

    return <div>
        <h4 className="text-xl font-bold mb-4 text-brand-text-primary">Community Transactions</h4>
        <Card className="p-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="Search by member, description, ID..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="flex-grow p-2 border rounded-md text-brand-text-primary bg-brand-surface dark:border-dark-border"/>
                <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={()=>setTypeFilter('All')} className={`px-3 py-1 text-sm rounded-full ${typeFilter==='All' ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>All</button>
                    {(['Project Investment', 'Property Sale', 'Fee Payment', 'Rubby Sale'] as const).map(type => 
                        <button key={type} onClick={()=>setTypeFilter(type)} className={`px-3 py-1 text-sm rounded-full ${typeFilter===type ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>{type}</button>
                    )}
                </div>
            </div>
        </Card>
        <div className="overflow-x-auto"><table className="min-w-full text-sm">
             <thead className="bg-gray-100 dark:bg-dark-surface/50"><tr className="text-xs uppercase font-semibold text-brand-text-secondary">
                <th className="p-2 text-left">Date</th><th className="p-2 text-left">Member</th><th className="p-2 text-left">Transaction ID</th><th className="p-2 text-left">Description</th><th className="p-2 text-right">Amount</th>
            </tr></thead>
            <tbody>{filtered.slice(0, 10).map(tx => <tr key={tx.id} className="border-b dark:border-dark-border"><td className="p-2 text-brand-text-secondary">{new Date(tx.date).toLocaleDateString()}</td><td className="p-2 text-brand-text-primary">{tx.memberName}</td><td className="p-2 font-mono text-brand-text-secondary">{tx.id}</td><td className="p-2 text-brand-text-primary">{tx.description}</td><td className="p-2 text-right font-semibold text-brand-text-primary">₦{tx.amount.toLocaleString()}</td></tr>)}</tbody>
        </table></div>
    </div>
};
const SecondaryMarketPanel: React.FC<{community: CommunityInfo, onUpdateCommunity: (c: CommunityInfo) => void, showToast: (m: string, t?: ToastMessage['type']) => void}> = ({community, onUpdateCommunity, showToast}) => {
    const [activeTab, setActiveTab] = useState('approvals');
    const [viewingHoldingsFor, setViewingHoldingsFor] = useState<CommunityMember | null>(null);
    const [rubbySettings, setRubbySettings] = useState<TradingSettings>(community.rubbyTradingSettings || { sellerCommissionRate: 0, buyerCommissionRate: 0, tradingMode: 'daily' });
    const [propertySettings, setPropertySettings] = useState<TradingSettings>(community.propertyTradingSettings || { sellerCommissionRate: 0, buyerCommissionRate: 0, tradingMode: 'date_range' });
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isManualAddModalOpen, setIsManualAddModalOpen] = useState(false);

    const handleViewHoldings = (memberId: string) => {
        const member = community.members.find(m => m.id === memberId);
        if (member) setViewingHoldingsFor(member);
    };

    const handleDecision = (requestId: string, decision: 'approve' | 'reject') => {
        const request = (community.marketTradeRequests || []).find(r => r.id === requestId);
        if (!request) return;

        const updatedRequests = (community.marketTradeRequests || []).filter(r => r.id !== requestId);
        let updatedListings = [...(community.secondaryMarketListings || [])];
        let updatedHistory = [...(community.marketTradeHistory || [])];

        if (decision === 'approve') {
            updatedListings = updatedListings.map(l => l.id === request.listingId ? { ...l, status: 'Sold' } : l); // Simplified: assume whole listing is sold
            const newRecord: MarketTradeRecord = {
                id: `TRD-${Date.now()}`,
                date: new Date().toISOString(),
                assetType: request.assetType,
                assetName: request.assetName,
                sellerName: request.sellerName,
                buyerName: request.buyerName,
                quantity: request.quantity,
                totalValue: request.totalValue,
                commissionEarned: request.commission
            };
            updatedHistory.unshift(newRecord);
            // Here you would also update buyer/seller holdings in a real app
            showToast(`Trade ${requestId} approved.`, 'success');
        } else { // Reject
            updatedListings = updatedListings.map(l => l.id === request.listingId ? { ...l, status: 'Listed' } : l);
            showToast(`Trade ${requestId} rejected.`, 'error');
        }

        onUpdateCommunity({ ...community, marketTradeRequests: updatedRequests, secondaryMarketListings: updatedListings, marketTradeHistory: updatedHistory });
    };
    
    const handleSaveSettings = (type: 'rubby' | 'property') => {
        onUpdateCommunity({
            ...community,
            rubbyTradingSettings: type === 'rubby' ? rubbySettings : community.rubbyTradingSettings,
            propertyTradingSettings: type === 'property' ? propertySettings : community.propertyTradingSettings,
        });
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} trading settings updated!`, 'success');
    };

    const handleManualAdd = (newRecord: Omit<MarketTradeRecord, 'id'>) => {
        const fullRecord = { ...newRecord, id: `TRD-MANUAL-${Date.now()}`};
        onUpdateCommunity({
            ...community,
            marketTradeHistory: [fullRecord, ...(community.marketTradeHistory || [])]
        });
        showToast('Manual transaction added successfully.');
        setIsManualAddModalOpen(false);
    };
    
    const handleImport = () => {
        const importedRecords: MarketTradeRecord[] = [
            { id: 'TRD-IMP-1', date: pastDate(20), assetType: 'Rubby', assetName: 'Rubbies', sellerName: 'Old Member A', buyerName: 'Old Member B', quantity: 2000, totalValue: 80000, commissionEarned: 2400 },
            { id: 'TRD-IMP-2', date: pastDate(35), assetType: 'Property', assetName: 'Legacy Plots', sellerName: 'Old Member C', buyerName: 'Old Member A', quantity: 1, totalValue: 12000000, commissionEarned: 720000 },
        ];
        onUpdateCommunity({
            ...community,
            marketTradeHistory: [...importedRecords, ...(community.marketTradeHistory || [])]
        });
        showToast('Simulated import of 2 transactions complete.');
        setIsImportModalOpen(false);
    };

    return (
        <>
        {viewingHoldingsFor && <MemberHoldingsModal member={viewingHoldingsFor} onClose={() => setViewingHoldingsFor(null)} />}
        {isImportModalOpen && <ImportTransactionsModal onClose={() => setIsImportModalOpen(false)} onImport={handleImport} />}
        {isManualAddModalOpen && <ManualTransactionModal onClose={() => setIsManualAddModalOpen(false)} onAdd={handleManualAdd} settings={{rubby: rubbySettings, property: propertySettings}} />}

        <div className="flex border-b dark:border-dark-border mb-4">
            <button onClick={() => setActiveTab('approvals')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'approvals' ? 'border-b-2 border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-secondary'}`}>Pending Approvals ({(community.marketTradeRequests || []).length})</button>
            <button onClick={() => setActiveTab('transactions')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'transactions' ? 'border-b-2 border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-secondary'}`}>Transactions ({(community.marketTradeHistory || []).length})</button>
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'settings' ? 'border-b-2 border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-secondary'}`}>Settings</button>
        </div>
        {activeTab === 'approvals' && (
            <div>
                 <h4 className="text-xl font-bold mb-4 text-brand-text-primary dark:text-brand-text-primary">Pending P2P Trades</h4>
                 <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-dark-surface/50"><tr className="text-brand-text-secondary dark:text-brand-text-secondary">
                            <th className="p-2 text-left font-semibold">Asset</th><th className="p-2 text-left font-semibold">Seller</th><th className="p-2 text-left font-semibold">Buyer</th>
                            <th className="p-2 text-right font-semibold">Value</th><th className="p-2 text-center font-semibold">Actions</th>
                        </tr></thead>
                        <tbody className="text-brand-text-primary dark:text-brand-text-primary">
                            {(community.marketTradeRequests || []).length === 0 ? (
                                <tr><td colSpan={5} className="text-center p-8 text-brand-text-secondary">No pending trade approvals.</td></tr>
                            ) : (community.marketTradeRequests || []).map(req => (
                                <tr key={req.id} className="border-b dark:border-dark-border">
                                    <td className="p-2 font-semibold text-brand-text-primary dark:text-brand-text-primary">{req.quantity}x {req.assetName}</td>
                                    <td className="p-2"><Button variant="secondary" className="!p-0 !bg-transparent !text-brand-primary !font-normal hover:!underline" onClick={() => handleViewHoldings(req.sellerId)}>{req.sellerName}</Button></td>
                                    <td className="p-2"><Button variant="secondary" className="!p-0 !bg-transparent !text-brand-primary !font-normal hover:!underline" onClick={() => handleViewHoldings(req.buyerId)}>{req.buyerName}</Button></td>
                                    <td className="p-2 text-right font-semibold text-brand-text-primary dark:text-brand-text-primary">₦{req.totalValue.toLocaleString()}</td>
                                    <td className="p-2 text-center"><div className="flex justify-center gap-2"><Button onClick={() => handleDecision(req.id, 'approve')} className="!text-xs !py-1">Approve</Button><Button onClick={() => handleDecision(req.id, 'reject')} variant="danger" className="!text-xs !py-1">Reject</Button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        )}
        {activeTab === 'transactions' && (
            <div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                    <h4 className="text-xl font-bold text-brand-text-primary dark:text-brand-text-primary">Trade History</h4>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setIsImportModalOpen(true)}>Import Transactions</Button>
                        <Button onClick={() => setIsManualAddModalOpen(true)}>Add Manual Transaction</Button>
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-dark-surface/50"><tr className="text-brand-text-secondary dark:text-brand-text-secondary">
                            <th className="p-2 text-left font-semibold">Date</th><th className="p-2 text-left font-semibold">Asset</th><th className="p-2 text-left font-semibold">Seller</th><th className="p-2 text-left font-semibold">Buyer</th>
                            <th className="p-2 text-right font-semibold">Total Value</th><th className="p-2 text-right font-semibold">Commission</th>
                        </tr></thead>
                        <tbody className="text-brand-text-primary dark:text-brand-text-primary">
                             {(community.marketTradeHistory || []).map(rec => (
                                <tr key={rec.id} className="border-b dark:border-dark-border">
                                    <td className="p-2">{new Date(rec.date).toLocaleDateString()}</td><td className="p-2 font-semibold">{rec.quantity}x {rec.assetName}</td>
                                    <td className="p-2">{rec.sellerName}</td><td className="p-2">{rec.buyerName}</td>
                                    <td className="p-2 text-right font-mono">₦{rec.totalValue.toLocaleString()}</td><td className="p-2 text-right font-mono text-green-600">₦{rec.commissionEarned.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        )}
        {activeTab === 'settings' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TradingSettingsForm 
                    title="Rubby Trading Settings"
                    settings={rubbySettings}
                    onSettingsChange={setRubbySettings}
                    onSave={() => handleSaveSettings('rubby')}
                />
                <TradingSettingsForm 
                    title="Property Trading Settings"
                    settings={propertySettings}
                    onSettingsChange={setPropertySettings}
                    onSave={() => handleSaveSettings('property')}
                />
            </div>
        )}
        </>
    );
};
const CommunitySettingsPanel: React.FC<{community: CommunityInfo, onUpdateCommunity: (c: CommunityInfo) => void, showToast: (m: string, t?: ToastMessage['type']) => void}> = ({ community, onUpdateCommunity, showToast }) => {
    // For demo, assume current partner is 'd_admin1'
    const currentPartner = community.members.find(m => m.id === 'd_admin1');
    const [newEmail, setNewEmail] = useState(currentPartner?.email || '');

    const handlePrivacyToggle = () => {
        const newPrivacy = (community.privacy || 'public') === 'public' ? 'private' : 'public';
        onUpdateCommunity({ ...community, privacy: newPrivacy });
        showToast(`Community is now ${newPrivacy}.`, 'success');
    };

    const handleRoleChange = (memberId: string, newRole: string) => {
        const updatedMembers = community.members.map(m => m.id === memberId ? { ...m, role: newRole } : m);
        onUpdateCommunity({ ...community, members: updatedMembers });
        showToast('Partner role updated.');
    };

    const handleEmailChange = () => {
        if (!currentPartner || newEmail === currentPartner.email || !newEmail.includes('@')) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }
        const updatedMembers = community.members.map(m => m.id === currentPartner.id ? { ...m, email: newEmail } : m);
        onUpdateCommunity({ ...community, members: updatedMembers });
        showToast('Your email has been updated.', 'success');
    };
    
    const partners = community.members.filter(m => m.isPartner);
    // Dynamically create roles list for assignment
    const availableRoles = ['Partner', 'Financial Reporter', 'Admin', ...community.projects.map(p => `${p.name} Manager`)];

    return (
        <div className="space-y-6">
            <Card>
                <h4 className="text-lg font-bold mb-4 text-brand-text-primary">Partner Management</h4>
                <div className="flex justify-end gap-2 mb-4">
                    <Button variant="secondary">Add from Members</Button>
                    <Button>Invite New Partner</Button>
                </div>
                <div className="space-y-3">
                    {partners.map(partner => (
                        <div key={partner.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-surface/50 rounded-lg">
                            <div className="flex items-center">
                                <img src={partner.avatarUrl} alt={partner.fullName} className="h-10 w-10 rounded-full mr-3" />
                                <div>
                                    <p className="font-semibold text-brand-text-primary">{partner.fullName}</p>
                                    <p className="text-xs text-brand-text-secondary">@{partner.username}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <select value={partner.role} onChange={e => handleRoleChange(partner.id, e.target.value)} className="p-1 text-xs border rounded bg-transparent dark:border-dark-border">
                                    {availableRoles.map(role => <option key={role} value={role}>{role}</option>)}
                                </select>
                                {partner.id !== currentPartner?.id && <Button variant="danger" className="!p-1.5"><TrashIcon className="h-4 w-4"/></Button>}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <h4 className="text-lg font-bold mb-4 text-brand-text-primary">Community Privacy</h4>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-lg">
                    <div>
                        <p className="font-semibold text-brand-text-primary">Community Visibility: <span className="text-brand-primary capitalize">{community.privacy || 'public'}</span></p>
                        <p className="text-sm text-brand-text-secondary">Public communities are discoverable. Private are invite-only.</p>
                    </div>
                    <button onClick={handlePrivacyToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${ (community.privacy || 'public') === 'public' ? 'bg-brand-primary' : 'bg-gray-400'}`}>
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${ (community.privacy || 'public') === 'public' ? 'translate-x-6' : 'translate-x-1'}`}/>
                    </button>
                </div>
            </Card>

            <Card>
                <h4 className="text-lg font-bold mb-4 text-brand-text-primary">My Profile Settings</h4>
                <p className="text-sm font-medium mb-1 text-brand-text-secondary">Email Address</p>
                <div className="flex gap-2">
                    <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="flex-grow p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border"/>
                    <Button onClick={handleEmailChange}>Save</Button>
                </div>
            </Card>
        </div>
    );
};


const PendingItemsSection: React.FC<{title: string; items: any[]; onApprove: (id: string) => void; onReject: (id: string) => void; renderItem: (item: any) => React.ReactNode;}> = ({ title, items, onApprove, onReject, renderItem }) => (
    <div>
        <h4 className="font-semibold text-lg mb-2 text-brand-text-primary">{title} ({items.length})</h4>
        {items.length > 0 ? (
            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.id} className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-md flex justify-between items-center text-sm">
                        <div className="text-brand-text-primary">{renderItem(item)}</div>
                        <div className="flex gap-2 flex-shrink-0 ml-4">
                            <Button onClick={() => onApprove(item.id)} className="!text-xs !py-1 !px-2"><CheckIcon className="h-4 w-4"/></Button>
                            <Button onClick={() => onReject(item.id)} variant="danger" className="!text-xs !py-1 !px-2"><XMarkIcon className="h-4 w-4"/></Button>
                        </div>
                    </div>
                ))}
            </div>
        ) : <p className="text-sm text-brand-text-secondary">No pending items.</p>}
    </div>
);

const EditAboutModal: React.FC<{
    aboutInfo: CommunityAboutInfo;
    onClose: () => void;
    onSave: (newAboutInfo: CommunityAboutInfo) => void;
}> = ({ aboutInfo, onClose, onSave }) => {
    const [formData, setFormData] = useState(aboutInfo);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold dark:text-dark-text-primary text-brand-text-primary">Edit Community Information</h2>
                    <button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Office Address</label>
                            <input value={formData.officeAddress} onChange={e => setFormData({ ...formData, officeAddress: e.target.value })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                        </div>
                        <div>
                            <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Phone Number</label>
                             <input value={formData.phoneNumbers[0] || ''} onChange={e => setFormData({ ...formData, phoneNumbers: [e.target.value] })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                        </div>
                         <div>
                            <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Office Hours</label>
                            <input value={formData.officeHours} onChange={e => setFormData({ ...formData, officeHours: e.target.value })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                        </div>
                        <div>
                            <label className="text-sm font-medium dark:text-dark-text-secondary text-brand-text-secondary">Website URL</label>
                            <input value={formData.externalLinks[0]?.url || ''} onChange={e => setFormData({ ...formData, externalLinks: [{ title: 'Official Website', url: e.target.value }] })} className="w-full p-2 border rounded-md mt-1 dark:bg-dark-surface dark:border-dark-border" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t dark:border-dark-border">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

const CommunityAboutCard: React.FC<{
    aboutInfo: CommunityAboutInfo;
    isPartner: boolean;
    onUpdateAbout: (newAbout: CommunityAboutInfo) => void;
}> = ({ aboutInfo, isPartner, onUpdateAbout }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (newAbout: CommunityAboutInfo) => {
        onUpdateAbout(newAbout);
        setIsEditing(false);
    };

    return (
        <>
            {isEditing && <EditAboutModal aboutInfo={aboutInfo} onClose={() => setIsEditing(false)} onSave={handleSave} />}
            <Card>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-brand-text-primary dark:text-dark-text-primary">About this Community</h3>
                    {isPartner && <Button variant="secondary" onClick={() => setIsEditing(true)}><PencilIcon className="h-5 w-5 mr-2" />Edit</Button>}
                </div>
                <p className="mt-4 text-brand-text-secondary dark:text-dark-text-secondary">{aboutInfo.description}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex items-start"><MapPinIcon className="h-5 w-5 mr-3 mt-1 text-brand-text-secondary shrink-0"/><div><p className="font-semibold text-brand-text-primary">Address</p><p className="text-brand-text-secondary">{aboutInfo.officeAddress}</p></div></div>
                    <div className="flex items-start"><PhoneIcon className="h-5 w-5 mr-3 mt-1 text-brand-text-secondary shrink-0"/><div><p className="font-semibold text-brand-text-primary">Contact</p><p className="text-brand-text-secondary">{aboutInfo.phoneNumbers.join(', ')}</p></div></div>
                    <div className="flex items-start"><ClockIcon className="h-5 w-5 mr-3 mt-1 text-brand-text-secondary shrink-0"/><div><p className="font-semibold text-brand-text-primary">Office Hours</p><p className="text-brand-text-secondary">{aboutInfo.officeHours}</p></div></div>
                    <div className="flex items-start"><LinkIcon className="h-5 w-5 mr-3 mt-1 text-brand-text-secondary shrink-0"/><div><p className="font-semibold text-brand-text-primary">Links</p>{aboutInfo.externalLinks.map(link => <a key={link.url} href={link.url} className="text-brand-primary hover:underline block">{link.title}</a>)}</div></div>
                </div>
            </Card>
        </>
    );
};

const CommunityInfoTab: React.FC<{
    community: CommunityInfo;
    userRole: UserRole;
    onUpdateCommunity: (c: CommunityInfo) => void;
}> = ({ community, userRole, onUpdateCommunity }) => {
    return (
        <div className="space-y-6">
            <CommunityAboutCard
                aboutInfo={community.about}
                isPartner={userRole === UserRole.PARTNER}
                onUpdateAbout={(newAboutInfo) => onUpdateCommunity({ ...community, about: newAboutInfo })}
            />
            <CommunityEvents
                events={community.events}
                userRole={userRole}
                onUpdateEvents={events => onUpdateCommunity({ ...community, events })}
            />
        </div>
    );
};

const CommunityDetailView: React.FC<{
    community: CommunityInfo;
    onBack: () => void;
    userRole: UserRole;
    onUpdateCommunity: (community: CommunityInfo) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void;
    isSubscribed: boolean;
    onStartMessage: (userId: string, userName: string) => void;
}> = ({ community, onBack, userRole, onUpdateCommunity, showToast, isSubscribed, onStartMessage }) => {
    const [activeTab, setActiveTab] = useState('timeline');
    const [posts, setPosts] = useState<Post[]>([]); // This would be fetched
    const [votingOnPost, setVotingOnPost] = useState<Post | null>(null);
    const [viewingProject, setViewingProject] = useState<Project | null>(null);

    const handleNewPost = (post: Post) => setPosts(prev => [post, ...prev]);
    const handleLike = (postId: string) => setPosts(posts.map(p => p.id === postId ? {...p, likes: p.likes+1} : p));
    const handleVote = (postId: string, optionText: string) => {
        // Find the current user to get their voting power (rubby holdings)
        const currentUser = community.members.find(m => m.id === 'd_user1'); // Mock current user
        const votingPower = currentUser?.holdings.rubbies.total || 0;

        if (votingPower === 0) {
            showToast("You need rubbies to vote.", "info");
            setVotingOnPost(null);
            return;
        }

        setPosts(posts.map(p => {
            if(p.id === postId && p.poll) {
                // Add the user's rubby count to the selected option's vote tally
                const newOptions = p.poll.options.map(opt => 
                    opt.text === optionText ? {...opt, votes: opt.votes + votingPower } : opt
                );
                // Mark the user as having voted
                return {...p, poll: {...p.poll, options: newOptions, votedBy: [...p.poll.votedBy, 'd_user1']}};
            }
            return p;
        }));
        setVotingOnPost(null);
        showToast(`Your vote of ${votingPower.toLocaleString()} rubbies has been cast!`, 'success');
    };
    
    const handleUpdateProject = (updatedProject: Project) => {
        const updatedProjects = community.projects.map(p => p.id === updatedProject.id ? updatedProject : p);
        onUpdateCommunity({ ...community, projects: updatedProjects });
    };

    const currentUser = community.members.find(m => m.id === 'd_user1'); // Mock current user

    const TabButton: React.FC<{tab: string, label: string}> = ({ tab, label }) => (<button onClick={() => setActiveTab(tab)} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-brand-primary text-brand-primary dark:border-dark-primary' : 'border-transparent text-brand-text-secondary hover:text-gray-700 hover:border-gray-300'}`}>{label}</button>);

    return (
        <div className="space-y-6">
            <VoteModal post={votingOnPost} onClose={() => setVotingOnPost(null)} onVote={handleVote} />
            {viewingProject && <ProjectDashboard project={viewingProject} onClose={() => setViewingProject(null)} onUpdateProject={handleUpdateProject} userRole={userRole} communityMembers={community.members} />}
            <Button variant="secondary" onClick={onBack}><ArrowLeftIcon className="h-5 w-5 mr-2"/>Back to All Communities</Button>
            <Card className="!p-0"><div className="p-6"><h2 className="text-3xl font-bold text-brand-text-primary">{community.name}</h2><p className="text-brand-text-secondary">{community.about.description}</p></div></Card>
            <div className="border-b border-brand-border dark:border-dark-border"><nav className="-mb-px flex space-x-2 overflow-x-auto">
                <TabButton tab="timeline" label="Timeline"/>
                <TabButton tab="info" label="Info"/>
                <TabButton tab="portfolio" label="My Portfolio"/>
                <TabButton tab="members" label="Members"/>
                <TabButton tab="offers" label="Offers"/>
                {userRole === UserRole.PARTNER && <TabButton tab="partner" label="Partner Panel"/>}
            </nav></div>
            
            {activeTab === 'timeline' && <div><CreatePost onNewPost={handleNewPost} />{posts.map(p => <PostCard key={p.id} post={p} isSubscribed={isSubscribed} onVoteClick={setVotingOnPost} onLike={handleLike} onStartMessage={onStartMessage}/>)}</div>}
            {activeTab === 'info' && <CommunityInfoTab community={community} userRole={userRole} onUpdateCommunity={onUpdateCommunity} />}
            {activeTab === 'portfolio' && currentUser && <MyPortfolio member={currentUser} community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} />}
            {activeTab === 'members' && <CommunityMembers community={community} userRole={userRole} onUpdateCommunity={onUpdateCommunity} onStartMessage={onStartMessage} showToast={showToast} currentUser={currentUser} />}
            {activeTab === 'offers' && <CommunityOffers community={community} showToast={showToast} userRole={userRole} onUpdateCommunity={onUpdateCommunity} onViewProject={setViewingProject} currentUser={currentUser} />}
            {activeTab === 'partner' && userRole === UserRole.PARTNER && <PartnerPanel community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} />}
        </div>
    );
};

const CommunityHub: React.FC<{
    communities: CommunityInfo[];
    onSelectCommunity: (id: string) => void;
}> = ({ communities, onSelectCommunity }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-brand-text-primary dark:text-dark-text-primary">Your Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map(c => (
                    <Card key={c.id} className="cursor-pointer group hover:shadow-xl transition-shadow" onClick={() => onSelectCommunity(c.id)}>
                        <img src={c.thumbnail} alt={c.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl font-bold group-hover:text-brand-primary text-brand-text-primary dark:text-dark-text-primary dark:group-hover:text-dark-primary transition-colors">{c.name}</h3>
                        <p className="text-sm text-brand-text-secondary dark:text-dark-text-secondary">{c.memberCount} Members &bull; {c.activeProjects} Active Projects</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

interface CommunityProps {
  showToast: (message: string, type?: ToastMessage['type']) => void;
  userRole: UserRole;
  isSubscribed: boolean;
  onStartMessage: (userId: string, userName: string) => void;
}

// FIX: Added missing JSX return to the component.
const ManageRubbiesModal: React.FC<{
    member: CommunityMember;
    community: CommunityInfo;
    onUpdateCommunity: (c: CommunityInfo) => void;
    showToast: (m: string, t?: ToastMessage['type']) => void;
    onClose: () => void;
}> = ({ member, community, onUpdateCommunity, showToast, onClose }) => {
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const settings = community.rubbyTradingSettings;

    const isMarketOpen = useMemo(() => {
        if (!settings) return false;
        const now = new Date();
        if (settings.tradingMode === 'date_range') {
            return now >= new Date(settings.startDate || 0) && now <= new Date(settings.endDate || 0);
        }
        if (settings.tradingMode === 'daily') {
            const day = now.getDay();
            if (!settings.allowedDays?.includes(day)) return false;
            const [startH, startM] = (settings.startTime || "00:00").split(':').map(Number);
            const [endH, endM] = (settings.endTime || "23:59").split(':').map(Number);
            const currentTime = now.getHours() * 60 + now.getMinutes();
            const startTime = startH * 60 + startM;
            const endTime = endH * 60 + endM;
            return currentTime >= startTime && currentTime <= endTime;
        }
        return false;
    }, [settings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numQuantity = Number(quantity);
        const numPrice = Number(price);
        
        if (numQuantity <= 0 || numQuantity > member.holdings.rubbies.total) {
            showToast('Invalid quantity.', 'error');
            return;
        }
        if (numPrice <= 0) {
            showToast('Invalid price.', 'error');
            return;
        }

        const newListing: SecondaryMarketListing = {
            id: `SM-RUBBY-${Date.now()}`,
            assetType: 'Rubby',
            assetId: member.id,
            assetName: 'Rubbies',
            sellerId: member.id,
            sellerName: member.fullName,
            quantity: numQuantity,
            pricePerUnit: numPrice,
            dateListed: new Date().toISOString(),
            status: 'Listed',
        };

        const updatedCommunity = {
            ...community,
            secondaryMarketListings: [...(community.secondaryMarketListings || []), newListing],
        };

        onUpdateCommunity(updatedCommunity);
        showToast('Your Rubbies have been listed on the secondary market.', 'success');
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-brand-text-primary">Manage Rubbies</h2>
                    <button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button>
                </div>
                
                {!isMarketOpen && (
                    <div className="p-3 mb-4 text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md">
                        The Rubby secondary market is currently closed. Please check the trading schedule.
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-brand-text-secondary">Quantity to Sell</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            max={member.holdings.rubbies.total}
                            className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border"
                            required
                        />
                         <p className="text-xs text-brand-text-secondary mt-1">Your balance: {member.holdings.rubbies.total.toLocaleString()} Rubbies</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-brand-text-secondary">Price per Rubby (₦)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border"
                            required
                        />
                    </div>
                    {settings && <Card className="!p-3 text-xs bg-gray-50 dark:bg-dark-surface/50 text-brand-text-secondary">A seller commission of {settings.sellerCommissionRate}% will be applied upon sale.</Card>}
                    <div className="flex justify-end gap-2 pt-4 border-t dark:border-dark-border">
                        <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={!isMarketOpen}>List for Sale</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

const ImportTransactionsModal: React.FC<{
    onClose: () => void;
    onImport: () => void;
}> = ({ onClose, onImport }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-brand-text-primary">Import Transactions</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
            <div className="text-center">
                <ArrowUpOnSquareIcon className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-500" />
                <p className="font-semibold my-2 text-brand-text-primary">Upload your file</p>
                <p className="text-sm text-brand-text-secondary mb-4">Select a CSV or Excel file containing past P2P transactions to bulk import them.</p>
                <Button onClick={onImport}>Simulate Import</Button>
            </div>
        </Card>
    </div>
);

const ManualTransactionModal: React.FC<{
    onClose: () => void;
    onAdd: (record: Omit<MarketTradeRecord, 'id'>) => void;
    settings: { rubby: TradingSettings, property: TradingSettings };
}> = ({ onClose, onAdd, settings }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        assetType: 'Rubby' as 'Rubby' | 'Property',
        assetName: 'Rubbies',
        sellerName: '',
        buyerName: '',
        quantity: '',
        pricePerUnit: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const quantity = Number(formData.quantity);
        const price = Number(formData.pricePerUnit);
        const totalValue = quantity * price;
        const currentSettings = formData.assetType === 'Rubby' ? settings.rubby : settings.property;
        const commissionRate = (currentSettings.buyerCommissionRate || 0) + (currentSettings.sellerCommissionRate || 0);
        const commissionEarned = totalValue * (commissionRate / 100);

        onAdd({
            date: new Date(formData.date).toISOString(),
            assetType: formData.assetType,
            assetName: formData.assetName,
            sellerName: formData.sellerName,
            buyerName: formData.buyerName,
            quantity,
            totalValue,
            commissionEarned,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4">
            <Card className="w-full max-w-xl">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-brand-text-primary">Add Manual Transaction</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
                        <select name="assetType" value={formData.assetType} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="Rubby">Rubby</option>
                            <option value="Property">Property</option>
                        </select>
                    </div>
                    <input name="assetName" value={formData.assetName} onChange={handleChange} placeholder="Asset Name (e.g., Rubbies, Prime Garden Plot)" className="w-full p-2 border rounded" required />
                    <div className="grid grid-cols-2 gap-4">
                        <input name="sellerName" value={formData.sellerName} onChange={handleChange} placeholder="Seller's Full Name" className="w-full p-2 border rounded" required />
                        <input name="buyerName" value={formData.buyerName} onChange={handleChange} placeholder="Buyer's Full Name" className="w-full p-2 border rounded" required />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="w-full p-2 border rounded" required />
                        <input name="pricePerUnit" type="number" step="0.01" value={formData.pricePerUnit} onChange={handleChange} placeholder="Price per Unit (₦)" className="w-full p-2 border rounded" required />
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Add Record</Button></div>
                </form>
            </Card>
        </div>
    );
};

export const Community: React.FC<CommunityProps> = ({ showToast, userRole, isSubscribed, onStartMessage }) => {
    const [communities, setCommunities] = useState<CommunityInfo[]>(Object.values(mockFullCommunities));
    const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
    
    const handleUpdateCommunity = (updatedCommunity: CommunityInfo) => {
        setCommunities(prev => prev.map(c => c.id === updatedCommunity.id ? updatedCommunity : c));
    };

    const selectedCommunity = selectedCommunityId ? communities.find(c => c.id === selectedCommunityId) : null;

    if (selectedCommunity) {
        return <CommunityDetailView 
            community={selectedCommunity} 
            onBack={() => setSelectedCommunityId(null)} 
            userRole={userRole}
            onUpdateCommunity={handleUpdateCommunity}
            showToast={showToast}
            isSubscribed={isSubscribed}
            onStartMessage={onStartMessage}
        />;
    }

    return <CommunityHub communities={communities} onSelectCommunity={setSelectedCommunityId} />;
};