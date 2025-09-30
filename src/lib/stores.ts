import { writable } from 'svelte/store';
import type {
    UserRole,
    AppView,
    ToastMessage,
    AppSettings,
    AdPricing,
    CreationRequest,
    KYCSubmission,
    Listing,
    Vendor,
    UserSubscriptions,
    ManagedUser,
    SubscriptionPricing
} from './types';

export const isAuthenticated = writable<boolean>(false);
export const activeView = writable<AppView>('DASHBOARD' as AppView);
export const userRole = writable<UserRole>('User' as UserRole);
export const toast = writable<ToastMessage | null>(null);
export const userSubscriptions = writable<UserSubscriptions>({ community: true, estate: false });
export const appSettings = writable<AppSettings>({
    theme: 'light',
    fontSize: 'base'
});

// minimal user store used by profile and other components
export const user = writable({
    id: 'user-1',
    name: 'John Doe',
    email: 'john.d@example.com',
    phone: '',
    avatar: 'https://picsum.photos/seed/user-1/48/48',
    role: 'User' as UserRole,
    bio: ''
});

const pastDate = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

export const initialRequests: CreationRequest[] = [
    {
        id: 'REQ001',
        type: 'Community',
        name: 'Sunshine Cooperative',
        applicantName: 'Diana Prince',
        applicantEmail: 'diana@example.com',
        dateSubmitted: pastDate(2),
        status: 'Pending',
        details: { regNumber: 'RC123456', country: 'Nigeria', state: 'Lagos', certificate: 'cert.pdf' }
    },
    {
        id: 'REQ002',
        type: 'Estate',
        name: 'Golden Gates Estate',
        applicantName: 'Bruce Wayne',
        applicantEmail: 'bruce@example.com',
        dateSubmitted: pastDate(1),
        status: 'Pending',
        details: { address: '1007 Mountain Drive, Gotham', proof: 'proof_of_ownership.pdf' }
    },
    {
        id: 'REQ003',
        type: 'Community',
        name: 'Future Investments',
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        dateSubmitted: pastDate(15),
        status: 'Approved',
        details: { regNumber: 'RC987654', country: 'Nigeria', state: 'Abuja', certificate: 'cert2.pdf' }
    }
];

export const initialKycSubmissions: KYCSubmission[] = [
    {
        id: 'KYC001',
        userId: 'd_user1',
        userName: 'Charles Xavier',
        userAvatar: 'https://picsum.photos/seed/d-user1/48/48',
        idType: "Driver's License",
        idNumber: 'DL12345678',
        idDocumentUrl: 'doc.pdf',
        addressProofUrl: 'proof.pdf',
        dateSubmitted: pastDate(3),
        status: 'Pending'
    },
    {
        id: 'KYC002',
        userId: 'em2',
        userName: 'Alice Williams',
        userAvatar: 'https://picsum.photos/seed/em2/48/48',
        idType: 'Passport',
        idNumber: 'A12345678',
        idDocumentUrl: 'doc.pdf',
        addressProofUrl: 'proof.pdf',
        dateSubmitted: pastDate(1),
        status: 'Pending'
    }
];

export const initialVendors: Vendor[] = [
    { id: 'vendor1', name: 'Prime Properties', status: 'Active', listingsCount: 1 },
    { id: 'vendor2', name: 'John Doe', status: 'Active', listingsCount: 2 },
    { id: 'vendor3', name: 'Dev Solutions', status: 'Active', listingsCount: 1 },
    { id: 'vendor4', name: 'Partner', status: 'Active', listingsCount: 1 },
    { id: 'vendor5', name: 'Jane Smith', status: 'Suspended', listingsCount: 1 }
];

export const initialListings: Listing[] = [
    {
        id: 'L001',
        title: 'Luxury Villa in Lekki',
        category: 'Properties',
        price: 120000000,
        location: 'Lekki, Lagos',
        images: [
            'https://picsum.photos/seed/prop1/400/300',
            'https://picsum.photos/seed/prop1-2/400/300',
            'https://picsum.photos/seed/prop1-3/400/300'
        ],
        description:
            'Spacious 5-bedroom villa with a pool, modern kitchen, and a serene environment perfect for families. Comes with a 2-car garage and a beautiful garden. Recently renovated with top-quality materials.',
        vendorName: 'Prime Properties',
        vendorId: 'vendor1',
        isPaid: true,
        dateListed: '2023-11-01T10:00:00Z',
        status: 'Active',
        views: 12500,
        clicks: 830
    },
    {
        id: 'L002',
        title: '2022 Toyota Camry',
        category: 'Assets',
        price: 15000000,
        location: 'Ikeja, Lagos',
        images: ['https://picsum.photos/seed/asset1/400/300'],
        description:
            'Barely used 2022 Toyota Camry, automatic transmission, in perfect condition with only 5,000 miles. Clean title and full service history available.',
        vendorName: 'John Doe',
        vendorId: 'vendor2',
        isPaid: true,
        dateListed: '2023-10-28T14:30:00Z',
        boostEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Active',
        views: 8200,
        clicks: 310
    },
    {
        id: 'L003',
        title: 'Web Development Services',
        category: 'Services',
        price: 500000,
        location: 'Remote',
        images: ['https://picsum.photos/seed/serv1/400/300'],
        description:
            'Professional web development for your business. We build responsive, fast, and SEO-friendly websites tailored to your needs.',
        vendorName: 'Dev Solutions',
        vendorId: 'vendor3',
        isPaid: false,
        dateListed: '2023-11-02T09:00:00Z',
        status: 'Pending',
        views: 500,
        clicks: 12
    },
    {
        id: 'L004',
        title: 'Plot of Land in Epe',
        category: 'Properties',
        price: 5000000,
        location: 'Epe, Lagos',
        images: ['https://picsum.photos/seed/prop2/400/300'],
        description:
            'A great investment for the future. Full plot of land in a rapidly developing area of Epe, with gazette title.',
        vendorName: 'Partner',
        vendorId: 'vendor4',
        isPaid: false,
        dateListed: '2023-10-15T12:00:00Z',
        status: 'Active',
        views: 25000,
        clicks: 1500
    },
    {
        id: 'L005',
        title: 'Office Furniture Set',
        category: 'Assets',
        price: 750000,
        location: 'Victoria Island, Lagos',
        images: ['https://picsum.photos/seed/asset2/400/300'],
        description:
            'Complete set for a small office, including 4 desks, chairs, and filing cabinets. All in excellent condition.',
        vendorName: 'Jane Smith',
        vendorId: 'vendor5',
        isPaid: true,
        dateListed: '2023-11-03T11:00:00Z',
        status: 'Pending',
        views: 100,
        clicks: 5
    },
    {
        id: 'L006',
        title: 'Modern 2-Bedroom Apartment',
        category: 'Properties',
        price: 65000000,
        location: 'Yaba, Lagos',
        images: ['https://picsum.photos/seed/prop3/400/300'],
        description:
            'Newly renovated 2-bedroom apartment in a secure complex. Perfect for young professionals or a small family.',
        vendorName: 'John Doe',
        vendorId: 'vendor2',
        isPaid: false,
        dateListed: '2023-10-20T18:00:00Z',
        status: 'Paused',
        views: 8200,
        clicks: 310
    }
];

export const initialManagedUsers: ManagedUser[] = [
    {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.d@example.com',
        avatarUrl: 'https://picsum.photos/seed/user-1/48/48',
        subscriptions: { community: { subscribed: true, date: pastDate(30) }, estate: { subscribed: false } }
    },
    {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.s@example.com',
        avatarUrl: 'https://picsum.photos/seed/user-2/48/48',
        subscriptions: {
            community: { subscribed: true, date: pastDate(90) },
            estate: { subscribed: true, date: pastDate(15) }
        }
    },
    {
        id: 'user-3',
        name: 'Peter Jones',
        email: 'peter.j@example.com',
        avatarUrl: 'https://picsum.photos/seed/user-3/48/48',
        subscriptions: { community: { subscribed: false }, estate: { subscribed: false } }
    },
    {
        id: 'user-4',
        name: 'Mary Williams',
        email: 'mary.w@example.com',
        avatarUrl: 'https://picsum.photos/seed/user-4/48/48',
        subscriptions: { community: { subscribed: false }, estate: { subscribed: true, date: pastDate(60) } }
    },
    {
        id: 'user-5',
        name: 'David Brown',
        email: 'david.b@example.com',
        avatarUrl: 'https://picsum.photos/seed/user-5/48/48',
        subscriptions: { community: { subscribed: true, date: pastDate(5) }, estate: { subscribed: false } }
    },
    {
        id: 'user-6',
        name: 'Susan Davis',
        email: 'susan.d@example.com',
        avatarUrl: 'https://picsum.photos/seed/user-6/48/48',
        subscriptions: { community: { subscribed: false }, estate: { subscribed: false } }
    },
    {
        id: 'd_user1',
        name: 'Charles Xavier',
        email: 'charles.x@example.com',
        avatarUrl: 'https://picsum.photos/seed/d-user1/48/48',
        subscriptions: {
            community: { subscribed: true, date: pastDate(120) },
            estate: { subscribed: true, date: pastDate(120) }
        }
    },
    {
        id: 'em2',
        name: 'Alice Williams',
        email: 'alice.w@example.com',
        avatarUrl: 'https://picsum.photos/seed/em2/48/48',
        subscriptions: { community: { subscribed: false }, estate: { subscribed: true, date: pastDate(45) } }
    }
];

