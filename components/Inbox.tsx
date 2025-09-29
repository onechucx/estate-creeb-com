import React, { useState, useEffect, useRef } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { UserConversation, UserMessage } from '../types';
import { PaperAirplaneIcon, MagnifyingGlassIcon, InboxIcon } from '@heroicons/react/24/outline';
import { initialConversations as initialConversationsData } from '../data';

interface InboxProps {
    recipient: { id: string; name: string } | null;
    setRecipient: (recipient: { id: string; name: string } | null) => void;
}

export const Inbox: React.FC<InboxProps> = ({ recipient, setRecipient }) => {
    const [conversations, setConversations] = useState<UserConversation[]>(initialConversationsData);
    const [activeConvId, setActiveConvId] = useState<string | null>(initialConversationsData[0]?.id || null);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = conversations.find(c => c.id === activeConvId);

    useEffect(() => {
        // If a recipient is passed, find or create a conversation and set it as active
        if (recipient) {
            let conversation = conversations.find(c => c.participantId === recipient.id);
            if (!conversation) {
                // Create a new conversation if one doesn't exist
                conversation = {
                    id: `CONV-${Date.now()}`,
                    participantId: recipient.id,
                    participantName: recipient.name,
                    participantAvatar: `https://picsum.photos/seed/${recipient.id}/48/48`,
                    lastMessage: '...',
                    lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    unreadCount: 0,
                    messages: [],
                };
                setConversations(prev => [conversation!, ...prev]);
            }
            setActiveConvId(conversation.id);
            setRecipient(null); // Clear recipient after handling
        } else if (!activeConvId && conversations.length > 0) {
            // Default to the first conversation if none is active
            setActiveConvId(conversations[0].id);
        }
    }, [recipient, conversations, activeConvId, setRecipient]);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConversation?.messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConvId) return;

        const userMessage: UserMessage = {
            id: `UMSG-${Date.now()}`,
            senderId: 'currentUser',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedConversations = conversations.map(c => {
            if (c.id === activeConvId) {
                return { ...c, messages: [...c.messages, userMessage], lastMessage: newMessage };
            }
            return c;
        });
        setConversations(updatedConversations);
        setNewMessage('');
    };

    return (
        <Card className="!p-0 flex h-[calc(100vh-120px)]">
            {/* Conversation List Sidebar */}
            <div className="w-1/3 border-r dark:border-dark-border flex flex-col">
                <div className="p-4 border-b dark:border-dark-border">
                    <h2 className="text-xl font-bold dark:text-dark-text-primary">Messages</h2>
                     <div className="relative mt-2">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2" />
                        <input type="text" placeholder="Search messages..." className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map(conv => (
                        <div 
                            key={conv.id}
                            onClick={() => setActiveConvId(conv.id)}
                            className={`flex p-4 cursor-pointer border-l-4 ${activeConvId === conv.id ? 'bg-blue-50 dark:bg-gray-700/50 border-brand-primary' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <img src={conv.participantAvatar} alt={conv.participantName} className="h-12 w-12 rounded-full mr-3" />
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold dark:text-dark-text-primary">{conv.participantName}</p>
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
                {activeConversation ? (
                    <>
                        <div className="p-4 border-b dark:border-dark-border flex items-center justify-between">
                            <h3 className="text-lg font-bold dark:text-dark-text-primary">{activeConversation.participantName}</h3>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                            <div className="space-y-4">
                                {activeConversation.messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-md p-3 rounded-lg ${msg.senderId === 'currentUser' ? 'bg-brand-primary text-white' : 'bg-white dark:bg-dark-surface'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.senderId === 'currentUser' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.timestamp}</p>
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
                        <h3 className="text-xl font-bold">Select a conversation</h3>
                        <p>Choose from your existing messages or start a new one from a member's profile.</p>
                    </div>
                )}
            </div>
        </Card>
    );
};