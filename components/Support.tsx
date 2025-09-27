import React, { useState, useEffect, useRef } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { SupportTicket, ChatMessage, UserRole } from '../types';
import { PaperAirplaneIcon, MagnifyingGlassIcon, InboxIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const initialSupportTickets: SupportTicket[] = [
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

interface SupportProps {
    userRole: UserRole;
}

const NewTicketModal: React.FC<{
    onClose: () => void;
    onCreateTicket: (destination: 'Creeb' | 'Community' | 'Estate', hubId: string | undefined, message: string) => void;
}> = ({ onClose, onCreateTicket }) => {
    const [destination, setDestination] = useState<'Creeb' | 'Community' | 'Estate'>('Creeb');
    const [hub, setHub] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        const hubId = destination === 'Creeb' ? undefined : hub;
        onCreateTicket(destination, hubId, message);
    };
    
    return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-lg">
             <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-dark-border">
                <h2 className="text-xl font-bold dark:text-dark-text-primary">Create New Support Ticket</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XMarkIcon className="h-6 w-6"/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium dark:text-dark-text-secondary">To:</label>
                    <select value={destination} onChange={e => setDestination(e.target.value as any)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">
                        <option value="Creeb">Creeb Platform Support</option>
                        <option value="Community">My Community's Support</option>
                        <option value="Estate">My Estate's Support</option>
                    </select>
                </div>
                {destination !== 'Creeb' && (
                     <div>
                        <label className="block text-sm font-medium dark:text-dark-text-secondary">Select {destination}:</label>
                        <select value={hub} onChange={e => setHub(e.target.value)} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">
                            <option value="demo">{destination === 'Community' ? 'Demo Community' : 'Demo Estate'}</option>
                            {/* In a real app, this would be populated with user's hubs */}
                        </select>
                    </div>
                )}
                 <div>
                    <label className="block text-sm font-medium dark:text-dark-text-secondary">Your Message:</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" placeholder="Please describe your issue..." required/>
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Send Message</Button>
                </div>
            </form>
        </Card>
    </div>
    )
};


export const Support: React.FC<SupportProps> = ({ userRole }) => {
    const [tickets, setTickets] = useState<SupportTicket[]>(initialSupportTickets);
    const [activeTicketId, setActiveTicketId] = useState<string | null>(initialSupportTickets[0].id);
    const [newMessage, setNewMessage] = useState('');
    const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // In a real app, filtering would be based on actual user/partner/admin data
    const visibleTickets = tickets.filter(ticket => {
        if (userRole === UserRole.ADMINISTRATOR) return true;
        if (userRole === UserRole.PARTNER) return ticket.destination !== 'Creeb'; // Simplified: show all hub tickets
        if (userRole === UserRole.USER) return true; // Simplified: show all for demo
        return false;
    });

    const activeTicket = visibleTickets.find(c => c.id === activeTicketId);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeTicket?.messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeTicketId) return;

        const userMessage: ChatMessage = {
            id: `MSG-${Date.now()}`,
            sender: 'user',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedTickets = tickets.map(c => {
            if (c.id === activeTicketId) {
                return { ...c, messages: [...c.messages, userMessage], lastMessage: newMessage };
            }
            return c;
        });
        setTickets(updatedTickets);
        setNewMessage('');
    };

    const handleCreateTicket = (destination: 'Creeb' | 'Community' | 'Estate', hubId: string | undefined, message: string) => {
        const newTicket: SupportTicket = {
            id: `TICKET-${Date.now()}`,
            contactName: destination === 'Creeb' ? 'Creeb Support' : `${hubId} Support`,
            destination,
            hubId,
            lastMessage: message,
            lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unreadCount: 0,
            messages: [{ id: `MSG-${Date.now()}`, sender: 'user', text: message, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
            status: 'Open',
            submittedBy: 'currentUser'
        };
        setTickets(prev => [newTicket, ...prev]);
        setActiveTicketId(newTicket.id);
        setIsNewTicketModalOpen(false);
    };

    return (
        <>
        {isNewTicketModalOpen && <NewTicketModal onClose={() => setIsNewTicketModalOpen(false)} onCreateTicket={handleCreateTicket} />}
        <Card className="!p-0 flex h-[calc(100vh-120px)]">
            {/* Ticket List Sidebar */}
            <div className="w-1/3 border-r dark:border-dark-border flex flex-col">
                <div className="p-4 border-b dark:border-dark-border">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold dark:text-dark-text-primary">Inbox</h2>
                        <Button variant="primary" onClick={() => setIsNewTicketModalOpen(true)} className="!py-1 !px-2 text-sm"><PlusIcon className="h-4 w-4 mr-1"/>New Ticket</Button>
                    </div>
                     <div className="relative mt-2">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2" />
                        <input type="text" placeholder="Search tickets..." className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {visibleTickets.map(conv => (
                        <div 
                            key={conv.id}
                            onClick={() => setActiveTicketId(conv.id)}
                            className={`flex p-4 cursor-pointer border-l-4 ${activeTicketId === conv.id ? 'bg-blue-50 dark:bg-gray-700/50 border-brand-primary' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold dark:text-dark-text-primary">{conv.contactName}</p>
                                    <p className="text-xs text-gray-400 dark:text-dark-text-secondary">{conv.lastMessageTime}</p>
                                </div>
                                <div className="flex justify-between items-start mt-1">
                                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary truncate pr-4">{conv.lastMessage}</p>
                                    {conv.unreadCount > 0 && <span className="text-xs bg-brand-primary text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">{conv.unreadCount}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Chat Window */}
            <div className="w-2/3 flex flex-col">
                {activeTicket ? (
                    <>
                        <div className="p-4 border-b dark:border-dark-border flex items-center justify-between">
                            <h3 className="text-lg font-bold dark:text-dark-text-primary">{activeTicket.contactName}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${activeTicket.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'}`}>{activeTicket.status}</span>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                            <div className="space-y-4">
                                {activeTicket.messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-brand-primary text-white' : 'bg-white dark:bg-dark-surface'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.timestamp}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                        </div>
                        <div className="p-4 bg-brand-surface dark:bg-dark-surface">
                            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                                <input 
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                                <Button type="submit" className="!p-3">
                                    <PaperAirplaneIcon className="h-6 w-6"/>
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 dark:text-dark-text-secondary">
                        <InboxIcon className="h-16 w-16 mb-4"/>
                        <h3 className="text-xl font-bold">Select a ticket</h3>
                        <p>Choose from your existing tickets or create a new one.</p>
                    </div>
                )}
            </div>
        </Card>
        </>
    );
};