import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { 
    EstateInfo, Post, UserRole, Chapter, Heading, Subheading, Image,
    Visitor, Amenity, Booking, Incident, EstateFee, BillPaymentStatus, IncidentStatus, IncidentSeverity,
    DueFrequency, PaymentStatus, ToastMessage, EstateMember, AccessRequest, NoticeBoardPost, Occupant, OccupantBill,
    EstateEvent, PropertyForSale, PropertyVariant, PropertyHolding, NoticeBoardComment, CommunityAboutInfo
} from '../types';
import { 
    ArrowLeftIcon, UserPlusIcon, TrashIcon, QrCodeIcon, ClockIcon,
    CalendarDaysIcon, ExclamationTriangleIcon, BanknotesIcon, PencilIcon, PhotoIcon,
    ChartBarIcon, HeartIcon, ChatBubbleOvalLeftIcon, ArrowPathIcon, PlusCircleIcon, XMarkIcon,
    BuildingStorefrontIcon, CalendarIcon, EllipsisVerticalIcon, ArrowsUpDownIcon,
    InformationCircleIcon, ArrowUpOnSquareIcon, ChatBubbleLeftRightIcon, EyeIcon, ShieldCheckIcon, LockClosedIcon, UserMinusIcon, CheckIcon, UserCircleIcon, NoSymbolIcon, CheckCircleIcon as CheckCircle, AtSymbolIcon, UserGroupIcon, ChevronDownIcon, CheckBadgeIcon, BuildingOffice2Icon, FunnelIcon, MagnifyingGlassIcon, DocumentTextIcon, ReceiptPercentIcon, ClipboardDocumentListIcon, ArrowUpOnSquareStackIcon,
    ChevronLeftIcon, ChevronRightIcon, LinkIcon, MapPinIcon, PhoneIcon
} from '@heroicons/react/24/outline';

interface EstateManagementProps {
    userRole: UserRole;
    showToast: (message: string, type?: ToastMessage['type']) => void;
    onStartMessage: (userId: string, userName: string) => void;
    // FIX: Added missing isEstateSubscribed prop to align with the component's usage in App.tsx.
    isEstateSubscribed: boolean;
}

const EstateHub: React.FC<{ estates: EstateInfo[], onSelectEstate: (id: string) => void }> = ({ estates, onSelectEstate }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 dark:text-dark-text-primary">Your Estates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {estates.map(e => (
                    <Card key={e.id} className="cursor-pointer group hover:shadow-xl transition-shadow" onClick={() => onSelectEstate(e.id)}>
                        <img src={e.coverImage} alt={e.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl font-bold group-hover:text-brand-primary dark:text-dark-text-primary dark:group-hover:text-dark-primary transition-colors">{e.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{e.address}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const MOCK_CURRENT_USER_ID = 'user123'; // A simulated ID for a non-member user
const MOCK_CURRENT_USER_AVATAR = 'https://picsum.photos/seed/currentuser/48/48';
const pastDate = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();


const mockEstateMembers: EstateMember[] = [
    { id: 'em1', fullName: 'John Doe', avatarUrl: 'https://picsum.photos/seed/em1/48/48', role: 'Resident', phoneNumber: '+234 801 234 5678', email: 'john.doe@example.com', birthDate: '1985-04-12', privacySettings: { isPhoneNumberPublic: true, isAddressPublic: false, isBirthYearPublic: true, messagePrivacy: 'members_only' }, status: 'Active', propertyHoldings: [{ id: 'ph1', propertyId: 'EPROP01', propertyName: 'Demo Estate 4-Bed Duplex', estateId: 'demo', variantName: 'Standard Unit', units: 1 }] },
    { id: 'em2', fullName: 'Alice Williams', avatarUrl: 'https://picsum.photos/seed/em2/48/48', role: 'Partner', phoneNumber: '+234 802 345 6789', email: 'alice.w@example.com', birthDate: '1978-09-25', privacySettings: { isPhoneNumberPublic: true, isAddressPublic: true, isBirthYearPublic: true, messagePrivacy: 'anyone' }, status: 'Active' },
    { id: 'em3', fullName: 'Security Gate A', avatarUrl: 'https://picsum.photos/seed/em3/48/48', role: 'Security', phoneNumber: '+234 803 456 7890', email: 'gate.a@example.com', birthDate: '1990-01-01', privacySettings: { isPhoneNumberPublic: true, isAddressPublic: false, isBirthYearPublic: false, messagePrivacy: 'members_only' }, status: 'Active' },
    { id: 'em4', fullName: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/em4/48/48', role: 'Resident', phoneNumber: '+234 804 567 8901', email: 'jane.s@example.com', birthDate: '1992-02-14', privacySettings: { isPhoneNumberPublic: false, isAddressPublic: false, isBirthYearPublic: false, messagePrivacy: 'members_only' }, status: 'Suspended' },
    { id: 'em5', fullName: 'Bob Brown', avatarUrl: 'https://picsum.photos/seed/em5/48/48', role: 'Resident', phoneNumber: '+234 805 678 9012', email: 'bob.b@example.com', birthDate: '1995-03-18', privacySettings: { isPhoneNumberPublic: true, isAddressPublic: false, isBirthYearPublic: false, messagePrivacy: 'members_only' }, status: 'Inactive' },
];

const mockEstateEvents: EstateEvent[] = [
    { id: 'EE1', title: 'Annual General Meeting', date: new Date(new Date().getFullYear(), new Date().getMonth(), 28).toISOString(), description: 'Discussing the financials and future plans.', isEndorsed: true, proposer: 'Alice Williams' },
    { id: 'EE2', title: 'Kids Halloween Party', date: new Date(new Date().getFullYear(), 9, 31).toISOString(), description: 'Fun and games for the little ones at the clubhouse.', isEndorsed: false, proposer: 'John Doe' }
];

const mockEstateProperties: PropertyForSale[] = [
    { 
        id: 'EPROP01', 
        estateId: 'demo', 
        name: 'Demo Estate 4-Bed Duplex', 
        description: 'A luxurious duplex with a private garden in the heart of the estate.', 
        image: 'https://picsum.photos/seed/prop-duplex/400/300',
        variants: [
            { id: 'v1', name: 'Standard Unit', price: 85000000, availableUnits: 3, paymentType: 'One-off', installments: [], refundOnDefaultPercent: 0 },
            { id: 'v2', name: 'Penthouse Unit', price: 120000000, availableUnits: 1, paymentType: 'One-off', installments: [], refundOnDefaultPercent: 0 }
        ]
    }
];

const mockAmenities: Amenity[] = [ { id: 'gym', name: 'Gym', operatingHours: { start: 6, end: 22 } }, { id: 'clubhouse', name: 'Clubhouse', operatingHours: { start: 10, end: 20 } }, ];
const mockIncidents: Incident[] = [
    { id: 'INC-001', description: 'Street light out near Block C', location: 'Block C', severity: 'Low', departments: ['Maintenance'], reportedBy: 'John Doe', reportedByOccupantId: 1, date: pastDate(1), status: 'Reported', thumbsUp: 5, thumbsDown: 0 },
    { id: 'INC-002', description: 'Loud music from Flat 2B', location: 'Flat 2B', severity: 'Medium', departments: ['Security', 'Management'], reportedBy: 'Alice Williams', date: pastDate(3), status: 'In Progress', thumbsUp: 2, thumbsDown: 1 },
    { id: 'INC-003', description: 'Waste disposal not collected', location: 'General Area', severity: 'Medium', departments: ['Management', 'Utility'], reportedBy: 'Jane Doe', reportedByOccupantId: 2, date: pastDate(5), status: 'Resolved', thumbsUp: 10, thumbsDown: 0 },
];
const initialFees: EstateFee[] = [ { id: 'B001', title: 'Monthly Service Charge', description: 'Covers security, cleaning, and general maintenance.', amount: 25000, dueDate: '2023-11-30', frequency: DueFrequency.MONTHLY }, { id: 'B002', title: 'Generator Fuel Levy', description: 'Contribution for diesel purchase.', amount: 10000, dueDate: '2023-11-15', frequency: DueFrequency.ONETIME }, ];


export const initialFullEstates: EstateInfo[] = [
    { 
        id: 'demo', 
        name: 'Demo Estate', 
        address: '123 Showcase Avenue, Creeb City', 
        coverImage: 'https://picsum.photos/seed/estate-demo/800/400',
        description: 'Welcome to Demo Estate, a premier residential community offering top-notch amenities and a secure environment. This is a placeholder description that partners can edit to provide more details about the estate.',
        gallery: [
            'https://picsum.photos/seed/gallery1/600/400',
            'https://picsum.photos/seed/gallery2/600/400',
            'https://picsum.photos/seed/gallery3/600/400',
            'https://picsum.photos/seed/gallery4/600/400',
        ],
        about: { description: 'Welcome to Demo Estate, a premier residential community offering top-notch amenities and a secure environment. This is a placeholder description that partners can edit to provide more details about the estate.', externalLinks: [{title: "Official Website", url:"#"}], phoneNumbers: ["+234 800 123 4567"], officeAddress: '123 Showcase Avenue, Creeb City', officeHours: 'Mon-Fri, 9am-5pm' },
        amenities: mockAmenities,
        incidents: mockIncidents,
        fees: initialFees,
        members: mockEstateMembers,
        accessRequests: [
             { userId: 'user456', userName: 'Bruce Wayne', userAvatar: 'https://picsum.photos/seed/bruce/48/48', date: new Date().toISOString(), status: 'Pending' }
        ],
        events: mockEstateEvents,
        propertiesForSale: mockEstateProperties,
        customRoles: ['Treasurer', 'Maintenance Contact'],
    },
    { 
        id: 'prime', 
        name: 'Prime Gardens Estate', 
        address: 'Lekki, Lagos', 
        coverImage: 'https://picsum.photos/seed/estate1/800/400',
        description: 'Experience luxury living at Prime Gardens. Located in the heart of Lekki, this estate offers serene landscapes and state-of-the-art facilities for a comfortable and modern lifestyle.',
        gallery: [
            'https://picsum.photos/seed/prime1/600/400',
            'https://picsum.photos/seed/prime2/600/400',
        ],
        about: { description: 'Experience luxury living at Prime Gardens. Located in the heart of Lekki, this estate offers serene landscapes and state-of-the-art facilities for a comfortable and modern lifestyle.', externalLinks: [], phoneNumbers: [], officeAddress: 'Lekki, Lagos', officeHours: 'Mon-Fri, 9am-5pm' },
        amenities: [],
        incidents: [],
        fees: [],
        members: [],
        accessRequests: [],
        events: [],
    },
    { 
        id: 'haven', 
        name: 'Serene Haven', 
        address: 'Ikeja, Lagos', 
        coverImage: 'https://picsum.photos/seed/estate2/800/400',
        description: 'A peaceful and family-friendly environment in Ikeja. Serene Haven is known for its excellent security, well-maintained infrastructure, and strong community spirit.',
        gallery: [],
        about: { description: 'A peaceful and family-friendly environment in Ikeja. Serene Haven is known for its excellent security, well-maintained infrastructure, and strong community spirit.', externalLinks: [], phoneNumbers: [], officeAddress: 'Ikeja, Lagos', officeHours: 'Mon-Fri, 9am-5pm' },
        amenities: [],
        incidents: [],
        fees: [],
        members: [],
        accessRequests: [],
        events: [],
    },
];

const initialOccupants: Occupant[] = [
    { id: 1, name: 'Jane Doe', email: 'jane.d@example.com', address: 'Flat 1A, Main Building', role: 'Occupant', status: 'Active', accessCode: '789 012',
        bills: [
            { id: 'OB1', title: 'Monthly Service Charge', description: 'Service charge for October', amount: 25000, status: 'Paid', type: 'Recurrent', frequency: DueFrequency.MONTHLY, issueDate: pastDate(35), dueDate: pastDate(5) },
            { id: 'OB2', title: 'Generator Fuel Levy', description: 'Contribution for fuel', amount: 10000, status: 'Paid', type: 'One-off', frequency: null, issueDate: pastDate(20), dueDate: pastDate(15), discount: 1000, notes: 'Early payment discount' },
        ],
        noticeBoard: [{id: 'N1', author: 'John Doe (Owner)', authorId: 'em1', authorAvatar: 'https://picsum.photos/seed/em1/48/48', content: 'Rent is due next week!', timestamp: new Date().toISOString(), comments: []}]
    },
    { id: 2, name: 'Junior Doe', email: 'junior.d@example.com', address: 'Flat 1A, Main Building', role: 'Sub-Admin', status: 'Active', accessCode: '345 678', bills: [], noticeBoard: [] },
    { id: 3, name: 'New Tenant', email: 'new@tenant.com', address: 'BQ, Main Building', role: 'Occupant', status: 'Invited', accessCode: '901 234', bills: [], noticeBoard: [] },
];
const mockEstatePosts: Post[] = [
    { id: 'e1', author: 'Estate Manager', authorAvatar: 'https://picsum.photos/seed/e-admin/48/48', content: "Friendly reminder: The monthly service charge is due this Friday. You can pay via the 'View Bills' button on the dashboard.", timestamp: '1d ago', likes: 15, comments: 2, reposts: 0, visibility: 'members_and_occupants' },
    { id: 'e2', author: 'John Doe', authorAvatar: 'https://picsum.photos/seed/user/48/48', content: "Has anyone else noticed the street light out near Block C? I've reported it via the incident panel.", timestamp: '3h ago', likes: 8, comments: 4, reposts: 0, visibility: 'members_only' },
];
const initialPaymentStatus: BillPaymentStatus[] = [ { billId: 'B001', residentName: 'John Doe', status: 'Paid' }, { billId: 'B001', residentName: 'Jane Smith', status: 'Unpaid' }, { billId: 'B001', residentName: 'Alice Johnson', status: 'Overdue' }, { billId: 'B002', residentName: 'John Doe', status: 'Paid' }, { billId: 'B002', residentName: 'Jane Smith', status: 'Paid' }, { billId: 'B002', residentName: 'Alice Johnson', status: 'Unpaid' }, ];

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <Card className="mb-4"><div className="flex items-start"><img src={post.authorAvatar} alt={post.author} className="h-10 w-10 rounded-full mr-4" /><div className="flex-1"><div className="flex items-baseline"><p className="font-bold text-sm dark:text-dark-text-primary">{post.author}</p><p className="text-xs text-gray-500 dark:text-dark-text-secondary ml-2">{post.timestamp}</p></div><p className="mt-1 text-gray-800 dark:text-dark-text-secondary text-sm">{post.content}</p><div className="flex justify-between items-center mt-3 text-gray-500 dark:text-dark-text-secondary"><div className="flex space-x-4"><button className="flex items-center space-x-1 hover:text-red-500 text-xs"><HeartIcon className="h-4 w-4" /> <span>{post.likes}</span></button><button className="flex items-center space-x-1 hover:text-blue-500 text-xs"><ChatBubbleOvalLeftIcon className="h-4 w-4" /> <span>{post.comments}</span></button><button className="flex items-center space-x-1 hover:text-green-500 text-xs"><ArrowPathIcon className="h-4 w-4" /> <span>{post.reposts}</span></button></div></div></div></div></Card>
);
const CreatePost: React.FC = () => {
    const [visibility, setVisibility] = useState<'members_only' | 'members_and_occupants'>('members_only');

    return (
        <Card className="mb-4"><div className="flex items-start"><img src="https://picsum.photos/seed/user/48/48" alt="Current User" className="h-10 w-10 rounded-full mr-4" /><div className="flex-1"><textarea className="w-full p-2 text-sm border border-brand-border dark:border-dark-border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-primary" rows={2} placeholder="Share an update with your estate..." /><div className="flex justify-between items-center mt-2"><div className="flex space-x-2 items-center text-gray-400"><button className="hover:text-brand-primary dark:hover:text-dark-primary"><PhotoIcon className="h-5 w-5" /></button><button className="hover:text-brand-primary dark:hover:text-dark-primary"><ChartBarIcon className="h-5 w-5" /></button><select value={visibility} onChange={(e) => setVisibility(e.target.value as any)} className="text-xs p-1 border rounded bg-transparent dark:border-dark-border focus:outline-none"><option value="members_only">Members Only</option><option value="members_and_occupants">Members & Occupants</option></select></div><Button variant="primary" className="!py-1.5 !px-3 text-sm">Post</Button></div></div></div></Card>
    );
};
const AccessCodeCard: React.FC = () => (
    <Card className="border-l-4 border-brand-accent dark:border-dark-accent"><div className="flex items-start"><div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full mr-4"><QrCodeIcon className="h-6 w-6 text-brand-accent"/></div><div className="flex-1"><h4 className="font-bold text-gray-800 dark:text-dark-text-primary">Your Access Codes</h4><p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-3">These codes are unique to you and your occupants.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center"><div className="p-2 bg-gray-100 dark:bg-gray-700 rounded"><p className="text-xs text-gray-500 dark:text-dark-text-secondary">John Doe (Primary)</p><p className="font-mono text-lg font-bold text-brand-primary dark:text-dark-primary">123 456</p></div><div className="p-2 bg-gray-100 dark:bg-gray-700 rounded"><p className="text-xs text-gray-500 dark:text-dark-text-secondary">Jane Doe (Occupant)</p><p className="font-mono text-lg font-bold text-brand-primary dark:text-dark-primary">789 012</p></div></div><p className="text-xs text-brand-text-secondary dark:text-dark-text-secondary mt-2 flex items-center"><ClockIcon className="h-3 w-3 mr-1"/> New codes generate every 24 hours.</p></div></div></Card>
);
const ManagementPanel: React.FC<{ title: string, children: React.ReactNode, onClose: () => void, size?: 'md' | 'lg' | 'xl' | '3xl' | '5xl' }> = ({ title, children, onClose, size = 'lg' }) => {
    const sizeClasses = { md: 'max-w-md', lg: 'max-w-2xl', xl: 'max-w-4xl', '3xl': 'max-w-6xl', '5xl': 'max-w-screen-2xl' };
    return (
        <Card className={`w-full ${sizeClasses[size]}`}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-dark-border">
                <h2 className="text-xl font-bold dark:text-dark-text-primary">{title}</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XMarkIcon className="h-6 w-6"/></button>
            </div>
            <div>{children}</div>
        </Card>
    );
};

const AmenityBookingPanel: React.FC<{ amenities: Amenity[]; onUpdateAmenities: (amenities: Amenity[]) => void; userRole: UserRole; onClose: () => void; showToast: (message: string, type?: ToastMessage['type']) => void; }> = ({ amenities, onUpdateAmenities, userRole, onClose, showToast }) => {
    const [bookings, setBookings] = useState<Booking[]>([
        { id: 'B-initial', amenityId: 'gym', amenityName: 'Gym', userId: 'em2', userName: 'Alice Williams', date: new Date().toISOString().split('T')[0], timeSlot: 10 },
        { id: 'B-initial-2', amenityId: 'gym', amenityName: 'Gym', userId: 'em1', userName: 'John Doe', date: new Date().toISOString().split('T')[0], timeSlot: 11 },
    ]); 
    const [selectedAmenityId, setSelectedAmenityId] = useState<string>(amenities[0]?.id || ''); 
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const isPartner = userRole === UserRole.PARTNER;

    const selectedAmenity = amenities.find(a => a.id === selectedAmenityId);
    const timeSlots = selectedAmenity ? Array.from({ length: selectedAmenity.operatingHours.end - selectedAmenity.operatingHours.start }, (_, i) => selectedAmenity.operatingHours.start + i) : [];
    
    const handleBookSlot = (timeSlot: number) => { 
        if (!selectedAmenity) return;
        const newBooking: Booking = { id: `B-${Date.now()}`, amenityId: selectedAmenityId, amenityName: selectedAmenity.name, userId: 'em1', userName: 'John Doe', date: selectedDate, timeSlot }; 
        setBookings([...bookings, newBooking]); 
        showToast(`Booked ${selectedAmenity.name} for ${selectedDate} at ${timeSlot}:00`); 
    };
    
    // Partner functions
    const handleAddAmenity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const start = parseInt((form.elements.namedItem('start') as HTMLInputElement).value);
        const end = parseInt((form.elements.namedItem('end') as HTMLInputElement).value);
        if(name && !isNaN(start) && !isNaN(end) && start < end) {
            const newAmenity: Amenity = { id: `A-${Date.now()}`, name, operatingHours: { start, end } };
            onUpdateAmenities([...amenities, newAmenity]);
            showToast('Amenity added!');
            form.reset();
        } else {
            showToast('Invalid amenity details.', 'error');
        }
    };

    return (<ManagementPanel title="Amenities" onClose={onClose} size="xl"><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
            <div>
                <h3 className="font-bold mb-2 dark:text-dark-text-primary">1. Select Amenity</h3>
                <select value={selectedAmenityId} onChange={e => setSelectedAmenityId(e.target.value)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">{amenities.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select>
            </div>
            <div>
                <h3 className="font-bold mb-2 mt-4 dark:text-dark-text-primary">2. Select Date</h3>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" />
            </div>
            <div className="mt-6"><h4 className="font-bold text-md mb-2 dark:text-dark-text-primary">My Bookings</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {bookings.filter(b => b.userId === 'em1').length > 0 ? bookings.filter(b => b.userId === 'em1').map(b => (
                        <div key={b.id} className="text-xs p-2 bg-blue-50 dark:bg-gray-700 rounded flex justify-between items-center">
                            <div className="flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-3 text-blue-500"/>
                                <div className="dark:text-dark-text-secondary">
                                    <p className="font-semibold dark:text-dark-text-primary">{b.amenityName} - {b.date}</p>
                                    <p>{b.timeSlot}:00 - {b.timeSlot + 1}:00</p>
                                </div>
                            </div>
                            <Button variant="danger" className="!p-1" onClick={() => setBookings(bookings.filter(bk => bk.id !== b.id))}><TrashIcon className="h-3 w-3"/></Button>
                        </div>
                    )) : <p className="text-xs text-gray-500 dark:text-dark-text-secondary">You have no bookings.</p>}
                </div>
            </div>
        </div>
        <div className="md:col-span-2">
            <h3 className="font-bold mb-2 dark:text-dark-text-primary">3. Select Time Slot</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">{timeSlots.map(slot => { 
                const booking = bookings.find(b => b.amenityId === selectedAmenityId && b.date === selectedDate && b.timeSlot === slot);
                return (
                     <div key={slot}>
                        {booking ? (
                            <div className="p-3 text-center bg-gray-200 dark:bg-gray-700 rounded-lg h-full flex flex-col justify-center items-center">
                                <p className="font-bold text-gray-800 dark:text-gray-200">{`${slot}:00`}</p>
                                <p className="text-xs text-red-500 font-semibold">Booked</p>
                                {isPartner && <p className="text-xs text-gray-500 truncate" title={booking.userName}>by {booking.userName}</p>}
                            </div>
                        ) : (
                            <Button 
                                onClick={() => handleBookSlot(slot)} 
                                variant="primary" 
                                className="w-full !py-3"
                            >
                                {`${slot}:00`}
                            </Button>
                        )}
                    </div>
                );
            })}</div>
            {isPartner && (
                <Card className="mt-6 bg-gray-50 dark:bg-dark-surface/50"><h3 className="font-bold mb-2 dark:text-dark-text-primary">Manage Amenities</h3><form onSubmit={handleAddAmenity} className="space-y-3"><input name="name" type="text" placeholder="Amenity Name" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required /><div className="flex gap-2"><input name="start" type="number" placeholder="Open Hour (e.g., 6)" min="0" max="23" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required /><input name="end" type="number" placeholder="Close Hour (e.g., 22)" min="1" max="24" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required /></div><Button type="submit" className="w-full">Add Amenity</Button></form></Card>
            )}
        </div>
    </div></ManagementPanel>);
};
const IncidentReportingPanel: React.FC<{ incidents: Incident[]; onUpdateIncidents: (incidents: Incident[]) => void; onClose: () => void; showToast: (message: string, type?: ToastMessage['type']) => void; userRole: UserRole }> = ({ incidents, onUpdateIncidents, onClose, showToast, userRole }) => {
    const [newIncident, setNewIncident] = useState({ description: '', location: '', severity: 'Low' as IncidentSeverity, departments: [] as string[] }); 
    const [sortConfig, setSortConfig] = useState<{ key: keyof Omit<Incident, 'departments' | 'thumbsUp' | 'thumbsDown'>; direction: 'asc' | 'desc' } | null>({ key: 'date', direction: 'desc' });
    const isPartner = userRole === UserRole.PARTNER;
    const departments = ['Security', 'Police', 'Management', 'Medical', 'Maintenance', 'Welfare', 'Transportation', 'Utility'];

    const handleDepartmentChange = (department: string, isChecked: boolean) => {
        setNewIncident(prev => ({ ...prev, departments: isChecked ? [...prev.departments, department] : prev.departments.filter(d => d !== department) }));
    };

    const sortedIncidents = useMemo(() => {
        let sortableItems = [...incidents];
        if (sortConfig !== null) { sortableItems.sort((a, b) => { if (a[sortConfig.key] < b[sortConfig.key]) { return sortConfig.direction === 'asc' ? -1 : 1; } if (a[sortConfig.key] > b[sortConfig.key]) { return sortConfig.direction === 'asc' ? 1 : -1; } return 0; }); }
        return sortableItems;
    }, [incidents, sortConfig]);

    const requestSort = (key: keyof Omit<Incident, 'departments' | 'thumbsUp' | 'thumbsDown'>) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); const report: Incident = { id: `INC-${Date.now()}`, reportedBy: 'John Doe', date: new Date().toISOString(), status: 'Reported', ...newIncident, thumbsUp: 0, thumbsDown: 0 }; onUpdateIncidents([report, ...incidents]); showToast('Incident reported successfully!'); setNewIncident({ description: '', location: '', severity: 'Low', departments: [] }); };
    const handleStatusChange = (id: string, status: IncidentStatus) => onUpdateIncidents(incidents.map(inc => inc.id === id ? { ...inc, status } : inc));
    
    const statusColor: Record<IncidentStatus, string> = { 'Reported': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300', 'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', 'Resolved': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' };
    const severityColor: Record<IncidentSeverity, string> = { 'Low': 'text-gray-600 dark:text-gray-300', 'Medium': 'text-yellow-600 dark:text-yellow-400', 'High': 'text-red-600 dark:text-red-400' };
    const SortableTh: React.FC<{ name: keyof Omit<Incident, 'departments' | 'thumbsUp' | 'thumbsDown'>, label: string }> = ({ name, label }) => ( <th className="p-2 text-left dark:text-dark-text-secondary cursor-pointer" onClick={() => requestSort(name)}><div className="flex items-center">{label} <ArrowsUpDownIcon className="h-4 w-4 ml-2" /></div></th> );

    return (
        <ManagementPanel title="Incident Reporting" onClose={onClose} size="xl">
            <Card className="mb-6 bg-gray-50 dark:bg-dark-surface/50">
                <h3 className="font-bold text-lg mb-4 dark:text-dark-text-primary">Report a New Incident</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea value={newIncident.description} onChange={e => setNewIncident({...newIncident, description: e.target.value})} placeholder="Describe the issue..." rows={3} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input value={newIncident.location} onChange={e => setNewIncident({...newIncident, location: e.target.value})} type="text" placeholder="Location (e.g., Block C)" className="p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/><div><label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Severity</label><select value={newIncident.severity} onChange={e => setNewIncident({...newIncident, severity: e.target.value as IncidentSeverity})} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border"><option>Low</option><option>Medium</option><option>High</option></select></div></div>
                    <div><label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">Relevant Unit/Dept (select all that apply)</label><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">{departments.map(dept => (<label key={dept} className="flex items-center space-x-2 p-2 border rounded-md dark:border-dark-border cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><input type="checkbox" checked={newIncident.departments.includes(dept)} onChange={(e) => handleDepartmentChange(dept, e.target.checked)} className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary" /><span className="text-sm dark:text-dark-text-secondary">{dept}</span></label>))}</div></div>
                    <div className="flex justify-end"><Button type="submit" variant="primary">Submit Report</Button></div>
                </form>
            </Card>
            <h3 className="font-bold text-lg mb-4 dark:text-dark-text-primary">Incident Log</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-dark-surface/50">
                        <tr>
                            <th className="p-2 text-left dark:text-dark-text-secondary">Details</th>
                            <SortableTh name="location" label="Location" />
                            <SortableTh name="severity" label="Severity" />
                            <th className="p-2 text-left dark:text-dark-text-secondary">Departments</th>
                            <SortableTh name="reportedBy" label="Reported By" />
                            <SortableTh name="status" label="Status"/>
                        </tr>
                    </thead>
                    <tbody className="dark:text-dark-text-secondary">
                        {incidents.length === 0 ? <tr><td colSpan={6} className="text-center p-8 text-gray-500">No incidents reported yet.</td></tr> : sortedIncidents.map(inc => (
                            <tr key={inc.id} className="border-b dark:border-dark-border">
                                <td className="p-2">{inc.description}</td>
                                <td className="p-2">{inc.location}</td>
                                <td className={`p-2 font-semibold ${severityColor[inc.severity]}`}>{inc.severity}</td>
                                <td className="p-2"><div className="flex flex-wrap gap-1">{inc.departments.map(dept => (<span key={dept} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">{dept}</span>))}</div></td>
                                <td className="p-2">{inc.reportedBy}{inc.reportedByOccupantId && <span className="text-xs italic text-gray-500"> (Occupant)</span>}</td>
                                <td className="p-2">{isPartner ? (<select value={inc.status} onChange={e => handleStatusChange(inc.id, e.target.value as IncidentStatus)} className="p-1 text-xs border rounded bg-transparent dark:border-dark-border"><option>Reported</option><option>In Progress</option><option>Resolved</option></select>) : (<span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColor[inc.status]}`}>{inc.status}</span>)}{inc.escalatedTo && inc.escalatedTo.length > 0 && <span className="ml-2 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 px-2 py-1 rounded-full">Escalated</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ManagementPanel>
    );
};

const FeeFormModal: React.FC<{
    fee?: EstateFee | null;
    onClose: () => void;
    onSave: (feeData: Omit<EstateFee, 'id'> & { id?: string }) => void;
}> = ({ fee, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: fee?.id || undefined,
        title: fee?.title || '',
        description: fee?.description || '',
        amount: fee?.amount || 0,
        frequency: fee?.frequency || DueFrequency.ONETIME,
        dueDate: fee?.dueDate ? new Date(fee.dueDate).toISOString().split('T')[0] : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[70] p-4">
            <Card className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">{fee ? 'Edit' : 'Create'} Estate Fee</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Fee Title (e.g., Monthly Service Charge)" className="w-full p-2 border rounded-md" required />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full p-2 border rounded-md" required />
                    <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount (NGN)" className="w-full p-2 border rounded-md" required />
                    <select name="frequency" value={formData.frequency} onChange={handleChange} className="w-full p-2 border rounded-md">{Object.values(DueFrequency).map(f => <option key={f} value={f}>{f}</option>)}</select>
                    <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                    <div className="flex justify-end gap-2"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Save Fee</Button></div>
                </form>
            </Card>
        </div>
    );
};

const SplitBillModal: React.FC<{
    fee: EstateFee;
    occupants: Occupant[];
    onClose: () => void;
    onSplit: (splits: { occupantId: number; amount: number }[]) => void;
}> = ({ fee, occupants, onClose, onSplit }) => {
    const [selectedOccupantIds, setSelectedOccupantIds] = useState<number[]>(occupants.map(o => o.id));
    const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
    const [customAmounts, setCustomAmounts] = useState<Record<number, string>>({});

    const selectedOccupants = occupants.filter(o => selectedOccupantIds.includes(o.id));

    const calculatedSplits = useMemo(() => {
        if (splitType === 'equal') {
            const amountPerOccupant = selectedOccupants.length > 0 ? fee.amount / selectedOccupants.length : 0;
            return selectedOccupants.map(occ => ({ occupantId: occ.id, amount: amountPerOccupant }));
        }
        return selectedOccupants.map(occ => ({
            occupantId: occ.id,
            amount: Number(customAmounts[occ.id]) || 0,
        }));
    }, [splitType, selectedOccupants, fee.amount, customAmounts]);

    const totalAssigned = calculatedSplits.reduce((sum, split) => sum + split.amount, 0);
    const remainingAmount = fee.amount - totalAssigned;
    const isValid = remainingAmount >= -0.01; // Allow for floating point inaccuracies

    const handleSubmit = () => {
        if (isValid) {
            onSplit(calculatedSplits.filter(s => s.amount > 0));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[70] p-4">
            <Card className="w-full max-w-xl max-h-[90vh] flex flex-col">
                 <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Split Bill: {fee.title}</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
                 <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    <p className="text-lg">Total Amount to Split: <span className="font-bold">₦{fee.amount.toLocaleString()}</span></p>
                    <div className="flex gap-4"><label className="flex items-center"><input type="radio" name="splitType" value="equal" checked={splitType==='equal'} onChange={() => setSplitType('equal')} className="mr-2"/>Split Equally</label><label className="flex items-center"><input type="radio" name="splitType" value="custom" checked={splitType==='custom'} onChange={() => setSplitType('custom')} className="mr-2"/>Custom Amounts</label></div>
                    <div className="space-y-2 border p-2 rounded max-h-60 overflow-y-auto">
                        {occupants.map(occ => (
                            <div key={occ.id} className="flex items-center p-2 bg-gray-50 dark:bg-dark-surface/50 rounded">
                                <input type="checkbox" checked={selectedOccupantIds.includes(occ.id)} onChange={() => setSelectedOccupantIds(p => p.includes(occ.id) ? p.filter(id=>id!==occ.id) : [...p, occ.id])} className="h-4 w-4 mr-3" />
                                <span className="flex-1">{occ.name} ({occ.address})</span>
                                {splitType === 'custom' && selectedOccupantIds.includes(occ.id) && <input type="number" value={customAmounts[occ.id] || ''} onChange={e => setCustomAmounts(p => ({...p, [occ.id]: e.target.value}))} className="w-28 p-1 border rounded text-right dark:bg-dark-surface dark:border-dark-border" placeholder="Amount"/>}
                                {splitType === 'equal' && selectedOccupantIds.includes(occ.id) && <span className="w-28 text-right font-semibold">₦{(fee.amount / selectedOccupantIds.length).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>}
                            </div>
                        ))}
                    </div>
                    <Card className="!p-3 text-sm bg-gray-100 dark:bg-dark-surface/50">
                        <div className="flex justify-between"><span>Total Assigned:</span><span className="font-bold">₦{totalAssigned.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
                        <div className={`flex justify-between ${!isValid ? 'text-red-500' : ''}`}><span>Remaining:</span><span className="font-bold">₦{remainingAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
                    </Card>
                 </div>
                 <div className="flex justify-end gap-2 pt-4 border-t dark:border-dark-border"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button onClick={handleSubmit} disabled={!isValid}>Confirm Split</Button></div>
            </Card>
        </div>
    );
};


const BillingManagementPanel: React.FC<{
    estate: EstateInfo;
    billPayments: BillPaymentStatus[];
    userRole: UserRole;
    occupants: Occupant[];
    onClose: () => void;
    onUpdateEstate: (updatedEstate: EstateInfo) => void;
    onUpdatePayments: (payments: BillPaymentStatus[]) => void;
    onUpdateOccupants: (occupants: Occupant[]) => void;
    showToast: (m: string, t?: ToastMessage['type']) => void;
}> = ({ estate, billPayments, userRole, occupants, onClose, onUpdateEstate, onUpdatePayments, onUpdateOccupants, showToast }) => {
    const [activeTab, setActiveTab] = useState('fees');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFee, setEditingFee] = useState<EstateFee | null>(null);
    const [selectedFeeId, setSelectedFeeId] = useState<string>(estate.fees[0]?.id || '');
    const [splittingFee, setSplittingFee] = useState<EstateFee | null>(null);
    const isPartner = userRole === UserRole.PARTNER;

    const handleOpenCreate = () => { setEditingFee(null); setIsModalOpen(true); };
    const handleOpenEdit = (fee: EstateFee) => { setEditingFee(fee); setIsModalOpen(true); };

    const handleSaveFee = (feeData: Omit<EstateFee, 'id'> & { id?: string }) => {
        if (feeData.id) { // Editing
            const updatedFees = estate.fees.map(f => f.id === feeData.id ? { ...f, ...feeData } as EstateFee : f);
            onUpdateEstate({ ...estate, fees: updatedFees });
            showToast('Fee updated successfully.');
        } else { // Creating
            const newFee: EstateFee = { ...feeData, id: `FEE-${Date.now()}` };
            const updatedFees = [newFee, ...estate.fees];
            const newPayments = estate.members.map(member => ({
                billId: newFee.id,
                residentName: member.fullName,
                status: 'Unpaid' as PaymentStatus,
            }));
            onUpdateEstate({ ...estate, fees: updatedFees });
            onUpdatePayments([...billPayments, ...newPayments]);
            showToast('Fee created and payment records generated.');
        }
        setIsModalOpen(false);
    };
    
    const handleDeleteFee = (feeId: string) => {
        if (!window.confirm("Are you sure? This will delete the fee and all associated payment records.")) return;
        const updatedFees = estate.fees.filter(f => f.id !== feeId);
        const updatedPayments = billPayments.filter(p => p.billId !== feeId);
        onUpdateEstate({ ...estate, fees: updatedFees });
        onUpdatePayments(updatedPayments);
        showToast('Fee deleted.', 'error');
    };

    const handleSplitBill = (splits: { occupantId: number; amount: number }[]) => {
        if (!splittingFee) return;

        const updatedOccupants = occupants.map(occ => {
            const split = splits.find(s => s.occupantId === occ.id);
            if (split) {
                const newBill: OccupantBill = {
                    id: `OB-${splittingFee.id}-${occ.id}-${Date.now()}`,
                    title: splittingFee.title,
                    description: `Portion of estate fee: ${splittingFee.description}`,
                    amount: split.amount,
                    status: 'Unpaid',
                    type: 'One-off', // Estate fees are redistributed as one-off bills
                    frequency: null,
                    issueDate: new Date().toISOString(),
                    dueDate: splittingFee.dueDate,
                };
                return { ...occ, bills: [...(occ.bills || []), newBill] };
            }
            return occ;
        });

        onUpdateOccupants(updatedOccupants);
        showToast(`Bill '${splittingFee.title}' has been split among occupants.`, 'success');
        setSplittingFee(null);
    };

    const handlePayBill = (fee: EstateFee) => {
        showToast(`Payment of ₦${fee.amount.toLocaleString()} for '${fee.title}' initiated.`, 'info');
        // In a real app, this would open a payment gateway modal.
    };

    const paymentStatusesForSelectedFee = useMemo(() => {
        return estate.members.map(member => {
            const payment = billPayments.find(p => p.billId === selectedFeeId && p.residentName === member.fullName);
            return {
                memberName: member.fullName,
                status: payment?.status || 'Unpaid'
            };
        });
    }, [selectedFeeId, billPayments, estate.members]);
    
    const getStatusChip = (status: PaymentStatus) => {
        const styles = { Paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', Unpaid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', Overdue: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' };
        return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
    };


    return (
        <ManagementPanel title="Billing Center" onClose={onClose} size="xl">
            {isPartner && isModalOpen && <FeeFormModal fee={editingFee} onClose={() => setIsModalOpen(false)} onSave={handleSaveFee} />}
            {splittingFee && <SplitBillModal fee={splittingFee} occupants={occupants} onClose={() => setSplittingFee(null)} onSplit={handleSplitBill} />}
            
            {isPartner ? (
                <>
                    <div className="flex border-b mb-4">
                        <button onClick={() => setActiveTab('fees')} className={`px-4 py-2 text-sm ${activeTab === 'fees' ? 'border-b-2 border-brand-primary' : ''}`}>Estate Fees</button>
                        <button onClick={() => setActiveTab('status')} className={`px-4 py-2 text-sm ${activeTab === 'status' ? 'border-b-2 border-brand-primary' : ''}`}>Payment Status</button>
                    </div>
                    {activeTab === 'fees' && (
                        <div>
                            <div className="flex justify-end mb-4"><Button onClick={handleOpenCreate}>Create New Fee</Button></div>
                            <div className="space-y-3">
                                {estate.fees.map(fee => (
                                    <Card key={fee.id} className="!p-3 flex justify-between items-center">
                                        <div><p className="font-semibold">{fee.title}</p><p className="text-sm text-gray-500">₦{fee.amount.toLocaleString()} - {fee.frequency}</p></div>
                                        <div className="flex gap-2">
                                            <Button variant="secondary" className="!p-2" onClick={() => handleOpenEdit(fee)} title="Edit Fee"><PencilIcon className="h-4 w-4" /></Button>
                                            <Button variant="danger" className="!p-2" onClick={() => handleDeleteFee(fee.id)} title="Delete Fee"><TrashIcon className="h-4 w-4" /></Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'status' && (
                         <div>
                            <select value={selectedFeeId} onChange={e => setSelectedFeeId(e.target.value)} className="w-full md:w-1/2 p-2 border rounded-md mb-4">
                                {estate.fees.map(f => <option key={f.id} value={f.id}>{f.title}</option>)}
                            </select>
                            <div className="overflow-x-auto"><table className="min-w-full text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="p-2 text-left font-bold text-gray-600 dark:text-gray-300">Resident</th>
                                        <th className="p-2 text-center font-bold text-gray-600 dark:text-gray-300">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentStatusesForSelectedFee.map((p, i) => (
                                        <tr key={p.memberName} className={i % 2 === 0 ? 'bg-brand-surface' : 'bg-gray-50 dark:bg-dark-surface/50'}>
                                            <td className="p-2 font-medium">{p.memberName}</td>
                                            <td className="p-2 text-center">{getStatusChip(p.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table></div>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <h3 className="font-bold text-lg mb-4">Your Estate Bills</h3>
                    <div className="space-y-3">
                        {estate.fees.map(fee => (
                            <Card key={fee.id} className="!p-3 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{fee.title}</p>
                                    <p className="text-sm text-gray-500">₦{fee.amount.toLocaleString()} - {fee.frequency}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="primary" className="!text-xs !py-1" onClick={() => handlePayBill(fee)}>
                                        Pay Bill
                                    </Button>
                                    <Button variant="secondary" className="!text-xs !py-1" onClick={() => setSplittingFee(fee)}>
                                        Split Bill
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </ManagementPanel>
    );
};

// Define InviteOccupantModal to fix component reference error
const InviteOccupantModal: React.FC<{
    onClose: () => void;
    onInvite: (email: string, address: string) => void;
}> = ({ onClose, onInvite }) => {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onInvite(email, address);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                 <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Invite Occupant</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" placeholder="Occupant Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" required/>
                    <input type="text" placeholder="Address / Flat Number" value={address} onChange={e => setAddress(e.target.value)} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" required/>
                    <div className="flex justify-end gap-2"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Send Invite</Button></div>
                 </form>
            </Card>
        </div>
    );
};


const OccupantsView: React.FC<{
    occupants: Occupant[];
    setOccupants: React.Dispatch<React.SetStateAction<Occupant[]>>;
}> = ({ occupants, setOccupants }) => {
    const [selectedOccupant, setSelectedOccupant] = useState<Occupant | null>(occupants[0] || null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [noticeContent, setNoticeContent] = useState('');

    const handleInvite = (email: string, address: string) => {
        const newOccupant: Occupant = {
            id: Date.now(),
            name: 'New Tenant',
            email,
            address,
            role: 'Occupant',
            status: 'Invited',
            accessCode: `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`,
            bills: [],
            noticeBoard: []
        };
        setOccupants(prev => [...prev, newOccupant]);
        setIsInviteModalOpen(false);
    };

    const handlePostNotice = () => {
        if (!selectedOccupant || !noticeContent.trim()) return;
        const newPost: NoticeBoardPost = {
            id: `N-${Date.now()}`,
            author: 'John Doe (Owner)',
            authorId: 'em1',
            authorAvatar: 'https://picsum.photos/seed/em1/48/48',
            content: noticeContent,
            timestamp: new Date().toISOString(),
            comments: []
        };
        const updatedOccupants = occupants.map(occ => 
            occ.id === selectedOccupant.id 
                ? { ...occ, noticeBoard: [newPost, ...(occ.noticeBoard || [])] }
                : occ
        );
        setOccupants(updatedOccupants);
        setSelectedOccupant(updatedOccupants.find(o => o.id === selectedOccupant.id) || null);
        setNoticeContent('');
    };

    return (
        <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">Occupants ({occupants.length})</h4>
                    <Button variant="secondary" className="!py-1 !px-2 text-xs" onClick={() => setIsInviteModalOpen(true)}>Invite</Button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 border rounded-md dark:border-dark-border">
                    {occupants.map(occ => (
                        <div key={occ.id} onClick={() => setSelectedOccupant(occ)} className={`p-3 cursor-pointer ${selectedOccupant?.id === occ.id ? 'bg-blue-50 dark:bg-gray-700/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                            <p className="font-semibold">{occ.name}</p>
                            <p className="text-xs text-gray-500">{occ.address}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-2 overflow-y-auto pr-2">
                {selectedOccupant ? (
                    <div className="space-y-4">
                        <Card>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold">{selectedOccupant.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedOccupant.address} - {selectedOccupant.role}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${selectedOccupant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{selectedOccupant.status}</span>
                            </div>
                        </Card>
                        <Card>
                            <h4 className="font-bold mb-2">Notice Board</h4>
                            <div className="flex gap-2">
                                <textarea value={noticeContent} onChange={e => setNoticeContent(e.target.value)} placeholder="Post a notice..." rows={2} className="flex-1 p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" />
                                <Button onClick={handlePostNotice}>Post</Button>
                            </div>
                            <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                                {(selectedOccupant.noticeBoard || []).map(post => (
                                    <div key={post.id} className="text-xs p-2 bg-gray-50 dark:bg-dark-surface/50 rounded">
                                        <p className="font-semibold">{post.author}</p>
                                        <p>{post.content}</p>
                                        <p className="text-gray-400 text-right">{new Date(post.timestamp).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                ) : <p>Select an occupant to view details.</p>}
            </div>
            {isInviteModalOpen && <InviteOccupantModal onClose={() => setIsInviteModalOpen(false)} onInvite={handleInvite} />}
        </div>
    );
};

const CreateBillModal: React.FC<{
    occupants: Occupant[];
    onClose: () => void;
    onCreate: (billData: Omit<OccupantBill, 'id' | 'status'>, targetOccupantIds: number[]) => void;
}> = ({ occupants, onClose, onCreate }) => {
    const [billDetails, setBillDetails] = useState({ title: '', description: '', amount: '', dueDate: '', type: 'One-off' as 'One-off' | 'Recurrent', frequency: null as DueFrequency | null });
    const [selectedOccupantIds, setSelectedOccupantIds] = useState<number[]>([]);

    const handleSelectOccupant = (id: number) => {
        setSelectedOccupantIds(prev => prev.includes(id) ? prev.filter(occId => occId !== id) : [...prev, id]);
    };
    
    const handleSelectAll = () => {
        if (selectedOccupantIds.length === occupants.length) {
            setSelectedOccupantIds([]);
        } else {
            setSelectedOccupantIds(occupants.map(o => o.id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { frequency, ...rest } = billDetails;
        const finalFrequency = rest.type === 'Recurrent' ? (frequency || DueFrequency.MONTHLY) : null;
        onCreate({ ...rest, amount: Number(billDetails.amount), issueDate: new Date().toISOString(), frequency: finalFrequency }, selectedOccupantIds);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Create & Send Bill</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-2">
                    <input type="text" placeholder="Bill Title" value={billDetails.title} onChange={e => setBillDetails({...billDetails, title: e.target.value})} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" required />
                    <input type="number" placeholder="Amount (NGN)" value={billDetails.amount} onChange={e => setBillDetails({...billDetails, amount: e.target.value})} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" required />
                    <input type="date" value={billDetails.dueDate} onChange={e => setBillDetails({...billDetails, dueDate: e.target.value})} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" required />
                    <div className="border rounded p-2 dark:border-dark-border">
                        <label className="flex items-center p-2 border-b dark:border-dark-border"><input type="checkbox" checked={selectedOccupantIds.length === occupants.length} onChange={handleSelectAll} className="mr-2" /> Select All Occupants</label>
                        <div className="max-h-40 overflow-y-auto">
                            {occupants.map(occ => (
                                <label key={occ.id} className="flex items-center p-2"><input type="checkbox" checked={selectedOccupantIds.includes(occ.id)} onChange={() => handleSelectOccupant(occ.id)} className="mr-2" /> {occ.name} ({occ.address})</label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" disabled={selectedOccupantIds.length === 0}>Send Bill</Button></div>
                </form>
            </Card>
        </div>
    );
};

const BillingCenter: React.FC<{
    occupants: Occupant[];
    onCreateBill: (billData: Omit<OccupantBill, 'id' | 'status'>, targetOccupantIds: number[]) => void;
}> = ({ occupants, onCreateBill }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const allBills = useMemo(() => {
        return occupants.flatMap(occ => (occ.bills || []).map(bill => ({ ...bill, occupantName: occ.name, occupantId: occ.id })));
    }, [occupants]);

    const handleCreateBillSubmit = (billData: Omit<OccupantBill, 'id' | 'status'>, targetOccupantIds: number[]) => {
        onCreateBill(billData, targetOccupantIds);
        setIsCreateModalOpen(false);
    };

    const getStatusChip = (status: PaymentStatus) => {
        const styles = { Paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', Unpaid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', Overdue: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' };
        return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Occupant Billing</h3>
                <Button onClick={() => setIsCreateModalOpen(true)}>Create New Bill</Button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left bg-gray-50 dark:bg-dark-surface/50">
                            <th className="p-2">Occupant</th><th className="p-2">Bill Title</th><th className="p-2">Amount</th><th className="p-2">Due Date</th><th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-dark-border">
                        {allBills.map(bill => (
                            <tr key={`${bill.id}-${bill.occupantId}`}>
                                <td className="p-2">{bill.occupantName}</td><td className="p-2">{bill.title}</td><td className="p-2">₦{bill.amount.toLocaleString()}</td><td className="p-2">{new Date(bill.dueDate).toLocaleDateString()}</td><td className="p-2">{getStatusChip(bill.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isCreateModalOpen && <CreateBillModal occupants={occupants} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateBillSubmit} />}
        </div>
    );
};

const OccupantDashboardPanel: React.FC<{ 
    occupants: Occupant[];
    setOccupants: React.Dispatch<React.SetStateAction<Occupant[]>>;
    estateIncidents: Incident[];
    onClose: () => void; 
    showToast: (m: string, t?:'success'|'error'|'info') => void; 
}> = ({ occupants, setOccupants, estateIncidents, onClose, showToast }) => {
    const [mainView, setMainView] = useState<'occupants' | 'billing' | 'incidents'>('occupants');

    const handleCreateBill = (billData: Omit<OccupantBill, 'id' | 'status'>, targetOccupantIds: number[]) => {
        setOccupants(prev => prev.map(occ => {
            if (targetOccupantIds.includes(occ.id)) {
                const newBill: OccupantBill = { ...billData, id: `OB-${Date.now()}-${occ.id}`, status: 'Unpaid' };
                return { ...occ, bills: [...(occ.bills || []), newBill] };
            }
            return occ;
        }));
        showToast(`Bill '${billData.title}' sent to ${targetOccupantIds.length} occupant(s).`, 'success');
    };
    
    const MainViewButton: React.FC<{view: 'occupants' | 'billing' | 'incidents', label: string, icon: React.ElementType}> = ({ view, label, icon: Icon }) => (
        <button onClick={() => setMainView(view)} className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 w-full text-left ${mainView === view ? 'bg-brand-primary dark:bg-dark-primary text-white' : 'hover:bg-blue-100 dark:hover:bg-gray-700'}`}>
            <Icon className="h-6 w-6 mr-4" />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <ManagementPanel title="Occupants Dashboard" onClose={onClose} size="5xl">
            <div className="flex h-[70vh]">
                <nav className="w-1/5 border-r dark:border-dark-border pr-4 space-y-2">
                    <MainViewButton view="occupants" label="All Occupants" icon={UserGroupIcon}/>
                    <MainViewButton view="billing" label="Billing Center" icon={BanknotesIcon}/>
                    <MainViewButton view="incidents" label="Incident Log" icon={ExclamationTriangleIcon}/>
                </nav>
                <main className="w-4/5 pl-4">
                    {mainView === 'occupants' && <OccupantsView occupants={occupants} setOccupants={setOccupants} />}
                    {mainView === 'billing' && <BillingCenter occupants={occupants} onCreateBill={handleCreateBill} />}
                    {mainView === 'incidents' && <IncidentLogView estateIncidents={estateIncidents} occupants={occupants} />}
                </main>
            </div>
        </ManagementPanel>
    );
};

const PartnerControlsPanel: React.FC<{ estate: EstateInfo; onUpdateEstate: (e: EstateInfo) => void; onClose: () => void; showToast: (m: string) => void }> = ({ estate, onUpdateEstate, onClose, showToast }) => {
    const [activeTab, setActiveTab] = useState('roles');
    const [newRole, setNewRole] = useState('');

    const handleAddRole = () => {
        if (newRole.trim() && !(estate.customRoles || []).includes(newRole.trim())) {
            const updatedRoles = [...(estate.customRoles || []), newRole.trim()];
            onUpdateEstate({ ...estate, customRoles: updatedRoles });
            setNewRole('');
            showToast('Custom role added!');
        }
    };
    
    const handleDeleteRole = (roleToDelete: string) => {
        const updatedRoles = (estate.customRoles || []).filter(r => r !== roleToDelete);
        const updatedMembers = estate.members.map(m => m.role === roleToDelete ? { ...m, role: 'Resident' } : m);
        onUpdateEstate({ ...estate, customRoles: updatedRoles, members: updatedMembers });
        showToast(`Role '${roleToDelete}' deleted. Members were reassigned to 'Resident'.`);
    };

    return (<ManagementPanel title="Partner Controls" onClose={onClose}>
        <div className="flex border-b mb-4"><button onClick={() => setActiveTab('roles')} className={`px-4 py-2 text-sm ${activeTab === 'roles' ? 'border-b-2 border-brand-primary' : ''}`}>Manage Roles</button></div>
        {activeTab === 'roles' && <div className="space-y-4">
            <div><h4 className="font-bold mb-2">Create Custom Role</h4><div className="flex gap-2"><input value={newRole} onChange={e => setNewRole(e.target.value)} type="text" placeholder="e.g., Treasurer" className="flex-1 p-2 border rounded dark:bg-dark-surface dark:border-dark-border" /><Button onClick={handleAddRole}>Add Role</Button></div></div>
            <div><h4 className="font-bold mb-2">Existing Custom Roles</h4><div className="space-y-2">{!estate.customRoles || estate.customRoles.length === 0 ? <p className="text-sm text-gray-500">No custom roles created yet.</p> : estate.customRoles.map(r => <div key={r} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-dark-surface/50 rounded"><span>{r}</span><Button onClick={() => handleDeleteRole(r)} variant="danger" className="!p-1"><TrashIcon className="h-4 w-4"/></Button></div>)}</div></div>
        </div>}
    </ManagementPanel>);
};

const EstateMembersList: React.FC<{ members: EstateMember[]; userRole: UserRole; customRoles: string[]; onUpdateMember: (id: string, updates: Partial<EstateMember>) => void; onStartMessage: (userId: string, userName: string) => void; }> = ({ members, userRole, customRoles, onUpdateMember, onStartMessage }) => {
    const [filters, setFilters] = useState({ status: 'All', role: 'All', hasProperty: 'All' });
    const isPartner = userRole === UserRole.PARTNER;
    const defaultRoles = ['Resident', 'Partner', 'Security'];
    const allRoles = [...defaultRoles, ...customRoles];

    const filteredMembers = useMemo(() => {
        return members.filter(m => 
            (filters.status === 'All' || m.status === filters.status) &&
            (filters.role === 'All' || m.role === filters.role) &&
            (filters.hasProperty === 'All' || (filters.hasProperty === 'Yes' ? (m.propertyHoldings?.length || 0) > 0 : (m.propertyHoldings?.length || 0) === 0))
        );
    }, [members, filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const getStatusChip = (status: EstateMember['status']) => {
        const styles = {
            Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
            Suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            Inactive: 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300',
        };
        return <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status]}`}>{status}</span>;
    };

    return (<Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-gray-50 dark:bg-dark-surface/50 rounded-lg mb-4">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <select name="status" value={filters.status} onChange={handleFilterChange} className="p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border text-sm w-full sm:w-auto"><option value="All">All Statuses</option><option>Active</option><option>Suspended</option><option>Inactive</option></select>
            <select name="role" value={filters.role} onChange={handleFilterChange} className="p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border text-sm w-full sm:w-auto"><option value="All">All Roles</option>{allRoles.map(r=><option key={r}>{r}</option>)}</select>
            <select name="hasProperty" value={filters.hasProperty} onChange={handleFilterChange} className="p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border text-sm w-full sm:w-auto"><option value="All">Property</option><option value="Yes">Has Property</option><option value="No">No Property</option></select>
        </div>
        <div className="overflow-x-auto"><table className="min-w-full"><thead className="bg-gray-50 dark:bg-dark-surface/50"><tr><th className="p-2 text-left">Member</th><th className="p-2 text-left">Role</th><th className="p-2 text-center">Status</th><th className="p-2 text-center">Actions</th></tr></thead><tbody className="divide-y dark:divide-dark-border">{filteredMembers.map(m=><tr key={m.id}>
            <td className="p-2"><div className="flex items-center"><img src={m.avatarUrl} alt={m.fullName} className="h-10 w-10 rounded-full mr-3"/><div className="font-semibold">{m.fullName}</div></div></td>
            <td className="p-2">{isPartner ? <select value={m.role} onChange={e=>onUpdateMember(m.id, {role: e.target.value})} className="p-1 text-xs border rounded bg-transparent dark:border-dark-border">{allRoles.map(r=><option key={r} value={r}>{r}</option>)}</select> : m.role}</td>
            <td className="p-2 text-center">{getStatusChip(m.status)}</td>
            <td className="p-2"><div className="flex justify-center items-center space-x-2">
                <Button variant="secondary" className="!p-1 text-xs" onClick={() => onStartMessage(m.id, m.fullName)}><ChatBubbleLeftRightIcon className="h-4 w-4"/></Button>
                {isPartner && <>
                    <Button onClick={()=>onUpdateMember(m.id, {status: m.status === 'Active' ? 'Suspended' : 'Active'})} variant="secondary" className="!p-1 text-xs">{m.status === 'Active' ? <NoSymbolIcon className="h-4 w-4 text-yellow-600"/> : <CheckCircle className="h-4 w-4 text-green-600"/>}</Button>
                    <Button variant="secondary" className="!p-1 text-xs"><BuildingOffice2Icon className="h-4 w-4"/></Button>
                    <Button variant="danger" className="!p-1 text-xs"><UserMinusIcon className="h-4 w-4"/></Button>
                </>}
            </div></td>
        </tr>)}</tbody></table></div>
    </Card>);
};

const ProposeEstateEventModal: React.FC<{ onClose: () => void, onPropose: (event: Omit<EstateEvent, 'id'>) => void }> = ({ onClose, onPropose }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPropose({
            title,
            date,
            description,
            isEndorsed: false, // Not endorsed by default, partner needs to endorse it.
            proposer: 'John Doe' // Placeholder for current user
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 dark:text-dark-text-primary">Propose a New Estate Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                    <textarea placeholder="Event Description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required />
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Submit for Endorsement</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

const EstateEvents: React.FC<{ 
    events: EstateEvent[], 
    userRole: UserRole, 
    onProposeEvent: () => void 
}> = ({ events, userRole, onProposeEvent }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const eventsByDate = useMemo(() => {
        const map = new Map<number, EstateEvent[]>();
        events.filter(e => e.isEndorsed).forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear()) {
                const day = eventDate.getDate();
                if (!map.has(day)) map.set(day, []);
                map.get(day)!.push(event);
            }
        });
        return map;
    }, [events, currentDate]);

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Button variant="secondary" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
                    <ChevronLeftIcon className="h-5 w-5"/>
                </Button>
                <h3 className="text-xl font-bold dark:text-dark-text-primary">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <Button variant="secondary" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
                    <ChevronRightIcon className="h-5 w-5"/>
                </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-500 dark:text-dark-text-secondary">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2">{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} className="border dark:border-dark-border h-24"></div>)}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const dayNumber = day + 1;
                    const dayEvents = eventsByDate.get(dayNumber);
                    return (
                        <div key={day} className="border dark:border-dark-border h-24 p-1 text-xs overflow-y-auto">
                            <div className="font-bold dark:text-dark-text-primary">{dayNumber}</div>
                            {dayEvents && dayEvents.map(e => (
                                <div key={e.id} className="text-white bg-brand-secondary dark:bg-dark-primary p-1 rounded mt-1 truncate" title={e.title}>
                                    {e.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 flex justify-end">
                <Button onClick={onProposeEvent}>
                    <PlusCircleIcon className="h-5 w-5 mr-2"/>Propose Event
                </Button>
            </div>
        </Card>
    );
};

const EstateAboutTab: React.FC<{ estate: EstateInfo; userRole: UserRole; onUpdateEstate: (updatedEstate: EstateInfo) => void; showToast: (m:string) => void; }> = ({ estate, userRole, onUpdateEstate, showToast }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(estate.gallery[0]);
    const [editableInfo, setEditableInfo] = useState({ description: estate.description, about: estate.about, gallery: estate.gallery });

    const handleSave = () => {
        onUpdateEstate({ ...estate, ...editableInfo });
        setIsEditing(false);
        showToast('Estate information updated!');
    };
    
    const handleCancel = () => {
        setEditableInfo({ description: estate.description, about: estate.about, gallery: estate.gallery });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <Card>
                <div className="space-y-4">
                    <div><label className="font-bold">Description</label><textarea value={editableInfo.description} onChange={e => setEditableInfo(prev => ({...prev, description: e.target.value}))} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border mt-1" rows={4}/></div>
                    <div><label className="font-bold">Address</label><input type="text" value={editableInfo.about.officeAddress} onChange={e => setEditableInfo(prev => ({...prev, about: {...prev.about, officeAddress: e.target.value}}))} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border mt-1"/></div>
                    <div><label className="font-bold">Gallery Images (URLs)</label><div className="space-y-2 mt-1">{editableInfo.gallery.map((url, index) => (<div key={index} className="flex gap-2"><input type="url" value={url} onChange={e => { const newGallery = [...editableInfo.gallery]; newGallery[index] = e.target.value; setEditableInfo(prev => ({...prev, gallery: newGallery})); }} className="flex-1 p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border"/><Button variant="danger" className="!p-2" onClick={() => setEditableInfo(prev => ({...prev, gallery: prev.gallery.filter((_, i) => i !== index)}))}><TrashIcon className="h-4 w-4"/></Button></div>))}{editableInfo.gallery.length < 8 && <Button variant="secondary" onClick={() => setEditableInfo(prev => ({...prev, gallery: [...prev.gallery, '']}))}>Add Image</Button>}</div></div>
                    <div className="flex justify-end space-x-2 pt-4 border-t dark:border-dark-border"><Button variant="secondary" onClick={handleCancel}>Cancel</Button><Button onClick={handleSave}>Save Changes</Button></div>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                 <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold dark:text-dark-text-primary">About {estate.name}</h3>
                    {userRole === UserRole.PARTNER && <Button variant="secondary" onClick={() => setIsEditing(true)}><PencilIcon className="h-5 w-5 mr-2" />Edit</Button>}
                </div>
                <p className="mt-4 text-gray-600 dark:text-dark-text-secondary">{estate.description}</p>
                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex items-start"><MapPinIcon className="h-5 w-5 mr-3 mt-1 text-gray-400 shrink-0"/><div><p className="font-semibold">Address</p><p>{estate.about.officeAddress}</p></div></div>
                    <div className="flex items-start"><PhoneIcon className="h-5 w-5 mr-3 mt-1 text-gray-400 shrink-0"/><div><p className="font-semibold">Contact</p><p>{estate.about.phoneNumbers.join(', ')}</p></div></div>
                    <div className="flex items-start"><ClockIcon className="h-5 w-5 mr-3 mt-1 text-gray-400 shrink-0"/><div><p className="font-semibold">Office Hours</p><p>{estate.about.officeHours}</p></div></div>
                    <div className="flex items-start"><LinkIcon className="h-5 w-5 mr-3 mt-1 text-gray-400 shrink-0"/><div><p className="font-semibold">Links</p>{estate.about.externalLinks.map(link => <a key={link.url} href={link.url} className="text-brand-primary hover:underline block">{link.title}</a>)}</div></div>
                 </div>
            </Card>
            <Card>
                <h3 className="text-xl font-bold mb-4 dark:text-dark-text-primary">Gallery</h3>
                <img src={selectedImage} alt="Selected estate view" className="w-full h-96 object-cover rounded-lg mb-4" />
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {estate.gallery.map(img => (
                        <img key={img} src={img} onClick={() => setSelectedImage(img)} alt="Estate thumbnail" className={`w-full h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-brand-primary' : 'border-transparent hover:opacity-80'}`}/>
                    ))}
                </div>
            </Card>
        </div>
    );
};


const EstateDetailView: React.FC<{ estate: EstateInfo; onBack: () => void; userRole: UserRole; onUpdateEstate: (e: EstateInfo) => void; showToast: (m: string, t?: ToastMessage['type']) => void; onStartMessage: (userId: string, userName: string) => void; }> = ({ estate, onBack, userRole, onUpdateEstate, showToast, onStartMessage }) => {
    const [activeTab, setActiveTab] = useState('timeline');
    const [activeManagementView, setActiveManagementView] = useState<string | null>(null);
    const [isProposeEventModalOpen, setIsProposeEventModalOpen] = useState(false);
    const [billPayments, setBillPayments] = useState(initialPaymentStatus);
    const [occupants, setOccupants] = useState(initialOccupants);
    const isPartner = userRole === UserRole.PARTNER;

    const TabButton: React.FC<{tab: string, label: string}> = ({ tab, label }) => (<button onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap ${activeTab === tab ? 'bg-brand-surface dark:bg-dark-surface border-b-2 border-brand-primary dark:border-dark-primary text-brand-primary dark:text-dark-primary' : 'text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800'}`}>{label}</button>);

    const handleUpdateMember = (id: string, updates: Partial<EstateMember>) => {
        onUpdateEstate({ ...estate, members: estate.members.map(m => m.id === id ? { ...m, ...updates } : m) });
    };

    const handleUpdateIncident = (id: string, updates: Partial<Incident>) => {
        onUpdateEstate({ ...estate, incidents: estate.incidents.map(i => i.id === id ? { ...i, ...updates } : i) });
    };

    const handleManagementViewToggle = (view: string) => {
        setActiveManagementView(prev => prev === view ? null : view);
    };

    const handleProposeEvent = (event: Omit<EstateEvent, 'id'>) => {
        const newEvent = { ...event, id: `EE-${Date.now()}` };
        onUpdateEstate({ ...estate, events: [...(estate.events || []), newEvent] });
        showToast('Event proposed and awaiting endorsement!');
    };

    return (<>
        {isProposeEventModalOpen && <ProposeEstateEventModal onClose={() => setIsProposeEventModalOpen(false)} onPropose={handleProposeEvent} />}
        <div className="space-y-6">
            <Button variant="secondary" onClick={onBack}><ArrowLeftIcon className="h-5 w-5 mr-2"/>Back to All Estates</Button>
            <Card className="!p-0"><img src={estate.coverImage} alt={estate.name} className="w-full h-48 object-cover rounded-t-xl"/><div className="p-6"><h2 className="text-3xl font-bold">{estate.name}</h2><p className="text-gray-500">{estate.address}</p></div></Card>
            
            <AccessCodeCard />

            <div className="border-b border-brand-border dark:border-dark-border"><nav className="-mb-px flex space-x-2 overflow-x-auto"><TabButton tab="timeline" label="Timeline"/><TabButton tab="about" label="About & Info"/><TabButton tab="directory" label="Directory"/><TabButton tab="events" label="Events"/><TabButton tab="properties" label="For Sale"/><TabButton tab="manage" label="Manage"/></nav></div>
            
            <div className="space-y-6">
                {activeTab === 'timeline' && <div><CreatePost />{mockEstatePosts.map(p => <PostCard key={p.id} post={p} />)}</div>}
                {activeTab === 'about' && <EstateAboutTab estate={estate} userRole={userRole} onUpdateEstate={onUpdateEstate} showToast={showToast} />}
                {activeTab === 'directory' && <EstateMembersList members={estate.members} userRole={userRole} customRoles={estate.customRoles || []} onUpdateMember={handleUpdateMember} onStartMessage={onStartMessage} />}
                {activeTab === 'events' && <EstateEvents events={estate.events || []} userRole={userRole} onProposeEvent={() => setIsProposeEventModalOpen(true)} />}
                {activeTab === 'properties' && (
                    <Card>
                        <h3 className="text-xl font-bold mb-4">Properties for Sale in {estate.name}</h3>
                        {estate.propertiesForSale && estate.propertiesForSale.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {estate.propertiesForSale.map(p => (
                                    <Card key={p.id} className="overflow-hidden !p-0">
                                        <img src={p.image} alt={p.name} className="w-full h-48 object-cover"/>
                                        <div className="p-4">
                                            <h4 className="font-bold text-lg">{p.name}</h4>
                                            <p className="text-sm text-gray-500 mb-2">{p.variants[0]?.name || p.description}</p>
                                            <p className="text-2xl font-bold text-brand-primary">₦{p.variants[0]?.price.toLocaleString()}</p>
                                            <Button variant="secondary" className="w-full mt-2">View Details</Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-8 text-gray-500">There are currently no properties for sale in this estate.</p>
                        )}
                    </Card>
                )}
                {activeTab === 'manage' && (
                    <div className="space-y-6">
                        <Card>
                            <h3 className="text-lg font-bold mb-6">Management Tools</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Button onClick={() => handleManagementViewToggle('amenities')} className="w-full justify-center p-4 h-32 flex flex-col items-center space-y-2">
                                    <CalendarDaysIcon className="h-8 w-8" />
                                    <span className="font-semibold text-center">Estate Amenities</span>
                                </Button>
                                <Button onClick={() => handleManagementViewToggle('incidents')} className="w-full justify-center p-4 h-32 flex flex-col items-center space-y-2">
                                    <ExclamationTriangleIcon className="h-8 w-8" />
                                    <span className="font-semibold text-center">Report/View Incidents</span>
                                </Button>
                                <Button onClick={() => handleManagementViewToggle('occupants')} className="w-full justify-center p-4 h-32 flex flex-col items-center space-y-2">
                                    <UserGroupIcon className="h-8 w-8" />
                                    <span className="font-semibold text-center">Occupants Dashboard</span>
                                </Button>
                                <Button onClick={() => handleManagementViewToggle('billing')} className="w-full justify-center p-4 h-32 flex flex-col items-center space-y-2">
                                    <BanknotesIcon className="h-8 w-8" />
                                    <span className="font-semibold text-center">View Estate Bills</span>
                                </Button>
                                {isPartner && (
                                    <>
                                        <Button onClick={() => handleManagementViewToggle('partner_controls')} variant="secondary" className="w-full justify-center p-4 h-32 flex flex-col items-center space-y-2">
                                            <ShieldCheckIcon className="h-8 w-8" />
                                            <span className="font-semibold text-center">Partner Controls</span>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Card>

                        {activeManagementView && (
                            <div className="mt-6 animate-fade-in">
                                {activeManagementView === 'amenities' && <AmenityBookingPanel amenities={estate.amenities} onUpdateAmenities={(amenities) => onUpdateEstate({...estate, amenities})} userRole={userRole} onClose={() => setActiveManagementView(null)} showToast={showToast} />}
                                {activeManagementView === 'incidents' && <IncidentReportingPanel incidents={estate.incidents} onUpdateIncidents={(incidents) => onUpdateEstate({...estate, incidents})} userRole={userRole} onClose={() => setActiveManagementView(null)} showToast={showToast} />}
                                {activeManagementView === 'occupants' && <OccupantDashboardPanel occupants={occupants} setOccupants={setOccupants} estateIncidents={estate.incidents} onClose={()=>setActiveManagementView(null)} showToast={showToast} />}
                                {activeManagementView === 'billing' && <BillingManagementPanel estate={estate} billPayments={billPayments} userRole={userRole} occupants={occupants} onClose={()=>setActiveManagementView(null)} onUpdateEstate={onUpdateEstate} onUpdatePayments={setBillPayments} onUpdateOccupants={setOccupants} showToast={showToast} />}
                                {activeManagementView === 'partner_controls' && <PartnerControlsPanel estate={estate} onUpdateEstate={onUpdateEstate} onClose={() => setActiveManagementView(null)} showToast={showToast} />}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </>);
};
const IncidentLogView: React.FC<{
    estateIncidents: Incident[];
    occupants: Occupant[];
}> = ({ estateIncidents, occupants }) => {
    const occupantReportedIncidents = useMemo(() => {
        return estateIncidents.filter(inc => inc.reportedByOccupantId).map(inc => ({
            ...inc,
            occupantName: occupants.find(o => o.id === inc.reportedByOccupantId)?.name || 'Unknown Occupant'
        }));
    }, [estateIncidents, occupants]);
    return (<Card><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left bg-gray-50 dark:bg-dark-surface/50"><th className="p-2 font-semibold">Incident</th><th className="p-2 font-semibold">Reported By</th><th className="p-2 font-semibold">Location</th><th className="p-2 font-semibold">Date</th><th className="p-2 font-semibold">Status</th></tr></thead><tbody>{occupantReportedIncidents.map(inc => (<tr key={inc.id} className="border-t dark:border-dark-border"><td className="p-2">{inc.description}</td><td className="p-2">{inc.occupantName}</td><td className="p-2">{inc.location}</td><td className="p-2">{new Date(inc.date).toLocaleDateString()}</td><td className="p-2">{inc.status}</td></tr>))}</tbody></table></div></Card>);
};

export const EstateManagement: React.FC<EstateManagementProps> = ({ userRole, showToast, onStartMessage }) => {
    const [estates, setEstates] = useState(initialFullEstates);
    const [selectedEstateId, setSelectedEstateId] = useState<string | null>(null);

    const handleUpdateEstate = (updatedEstate: EstateInfo) => {
        setEstates(prev => prev.map(e => e.id === updatedEstate.id ? updatedEstate : e));
    };

    const selectedEstate = selectedEstateId ? estates.find(e => e.id === selectedEstateId) : null;

    if (selectedEstate) {
        return <EstateDetailView 
            estate={selectedEstate}
            onBack={() => setSelectedEstateId(null)}
            userRole={userRole}
            onUpdateEstate={handleUpdateEstate}
            showToast={showToast}
            onStartMessage={onStartMessage}
        />;
    }

    return <EstateHub estates={estates} onSelectEstate={setSelectedEstateId} />;
};