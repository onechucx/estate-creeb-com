import React, { useState, useMemo, useEffect } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Wallet, Transaction, VirtualCard, ToastMessage, PayoutAccount } from '../types';
import { PlusIcon, ArrowPathIcon, PaperAirplaneIcon, CurrencyDollarIcon, CreditCardIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, ChevronDownIcon, EyeIcon, EyeSlashIcon, TrashIcon, LockClosedIcon, LockOpenIcon, ClipboardDocumentIcon, QrCodeIcon, ArrowUpRightIcon, XMarkIcon, MapPinIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { initialWallets, mockTransactions, mockPayoutAccounts, initialCards } from '../data';


const ChipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="6" width="18" height="12" rx="2" ry="2" fill="#d4af37" stroke="none" />
        <line x1="7" y1="12" x2="17" y2="12" stroke="#a88b2c" />
        <line x1="12" y1="9" x2="12" y2="15" stroke="#a88b2c" />
    </svg>
);

const WalletCard: React.FC<{ wallet: Wallet, isSelected: boolean, onClick: () => void }> = ({ wallet, isSelected, onClick }) => {
    const colorClasses = {
        blue: {
            ring: 'ring-blue-500 dark:ring-blue-400',
            bg: 'bg-blue-100 dark:bg-blue-900/50',
            text: 'text-blue-600 dark:text-blue-400',
            selectedBg: 'bg-blue-600 dark:bg-blue-500',
        },
        green: {
            ring: 'ring-green-500 dark:ring-green-400',
            bg: 'bg-green-100 dark:bg-green-900/50',
            text: 'text-green-600 dark:text-green-400',
            selectedBg: 'bg-green-600 dark:bg-green-500',
        },
        yellow: {
            ring: 'ring-yellow-500 dark:ring-yellow-400',
            bg: 'bg-yellow-100 dark:bg-yellow-900/50',
            text: 'text-yellow-600 dark:text-yellow-400',
            selectedBg: 'bg-yellow-600 dark:bg-yellow-500',
        },
        indigo: {
            ring: 'ring-indigo-500 dark:ring-indigo-400',
            bg: 'bg-indigo-100 dark:bg-indigo-900/50',
            text: 'text-indigo-600 dark:text-indigo-400',
            selectedBg: 'bg-indigo-600 dark:bg-indigo-500',
        },
    };
    const selectedColor = colorClasses[wallet.color as keyof typeof colorClasses] || colorClasses.blue;

    return (
    <Card 
        onClick={onClick} 
        className={`cursor-pointer transition-all !p-4 group ${isSelected ? `ring-2 ${selectedColor.ring}` : 'hover:shadow-md hover:-translate-y-1'}`}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full transition-colors ${isSelected ? `${selectedColor.selectedBg} text-white` : `${selectedColor.bg} group-hover:bg-opacity-80 ${selectedColor.text}`}`}>
                    {wallet.icon}
                </div>
                <span className="font-bold text-lg text-brand-text-primary dark:text-dark-text-primary">{wallet.currency}</span>
            </div>
            <ArrowUpRightIcon className={`h-5 w-5 transition-transform text-brand-text-secondary ${isSelected ? 'rotate-0' : '-rotate-45 group-hover:rotate-0'}`} />
        </div>
        <div className="mt-4 text-left">
            <p className="font-bold text-2xl text-brand-text-primary dark:text-dark-text-primary">
                {wallet.currency === 'Naira' ? '₦' : ['USDT', 'Dollar'].includes(wallet.currency) ? '$' : ''}
                {wallet.currency !== 'Card' ? wallet.balance.toLocaleString('en-US', {minimumFractionDigits: 2}) : 'Manage Cards'}
            </p>
        </div>
    </Card>
)};


const VirtualCardDisplay: React.FC<{ card: VirtualCard; onToggleDetails: (id: string) => void; onToggleFreeze: (id: string) => void; onDelete: (id: string) => void; detailsVisible: boolean; }> = ({ card, onToggleDetails, onToggleFreeze, onDelete, detailsVisible }) => {
    const cardBgClasses = {
        Visa: 'from-blue-700 to-blue-900',
        Mastercard: 'from-red-600 via-orange-500 to-yellow-400',
    };

    return (
    <div className={`relative w-full aspect-[1.586] rounded-xl shadow-lg text-white p-6 flex flex-col justify-between bg-gradient-to-br ${cardBgClasses[card.vendor]}`}>
        {card.isFrozen && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10 animate-fade-in">
                <LockClosedIcon className="h-12 w-12 text-white/80" />
                <span className="mt-2 text-lg font-bold">FROZEN</span>
            </div>
        )}
        <div className="flex justify-between items-start">
            <ChipIcon />
            <div className="text-right">
                <p className="font-bold text-2xl italic">{card.vendor}</p>
                 <p className="text-xs opacity-70">Virtual Card</p>
            </div>
        </div>
        <div>
            <p className="font-mono text-2xl tracking-widest text-center">
                {detailsVisible ? card.cardNumber : `**** **** **** ${card.cardNumber.slice(-4)}`}
            </p>
        </div>
        <div className="flex justify-between items-end">
             <div>
                <p className="text-xs opacity-70">Card Holder</p>
                <p className="font-medium tracking-wider">John Doe</p>
            </div>
            <div className="flex items-end space-x-4">
                <div className="text-right">
                    <p className="text-xs opacity-70">Expires</p>
                    <p className="font-medium tracking-wider">{detailsVisible ? card.expiry : '**/**'}</p>
                </div>
                {detailsVisible && (
                    <div className="text-right">
                        <p className="text-xs opacity-70">CVV</p>
                        <p className="font-medium tracking-wider">{card.cvv}</p>
                    </div>
                )}
            </div>
        </div>
         <div className="absolute top-4 right-4 z-20 flex space-x-1 bg-black/20 p-1 rounded-full">
            <button onClick={() => onToggleDetails(card.id)} className="p-1.5 text-white/80 hover:text-white" title={detailsVisible ? 'Hide Details' : 'Show Details'}>
                {detailsVisible ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
            </button>
            <button onClick={() => onToggleFreeze(card.id)} className="p-1.5 text-white/80 hover:text-white" title={card.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}>
                {card.isFrozen ? <LockOpenIcon className="h-5 w-5"/> : <LockClosedIcon className="h-5 w-5"/>}
            </button>
            <button onClick={() => onDelete(card.id)} className="p-1.5 text-red-400 hover:text-red-300" title="Delete Card">
                <TrashIcon className="h-5 w-5"/>
            </button>
        </div>
    </div>
    );
};

const Modal: React.FC<{ title: string, children: React.ReactNode, onClose: () => void, size?: 'md' | 'lg' }> = ({ title, children, onClose, size = 'md' }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <Card className={`w-full max-w-${size} max-h-[90vh] flex flex-col`}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-dark-border"><h2 className="text-xl font-bold dark:text-dark-text-primary">{title}</h2><button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XMarkIcon className="h-6 w-6"/></button></div>
            <div className="flex-1 overflow-y-auto pr-2">{children}</div>
        </Card>
    </div>
);

const ConversionModal: React.FC<{
    wallets: Wallet[];
    selectedWalletId: string;
    onClose: () => void;
    onConvert: (fromCurrency: string, toCurrency: string, amount: number) => void;
}> = ({ wallets, selectedWalletId, onClose, onConvert }) => {
    const initialFrom = wallets.find(w => w.id === selectedWalletId)?.currency || 'Naira';
    const initialTo = initialFrom === 'Naira' ? 'USDT' : 'Naira';

    const [fromCurrency, setFromCurrency] = useState(initialFrom);
    const [toCurrency, setToCurrency] = useState(initialTo);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const exchangeRate = 1450.50; // 1 USDT = 1450.50 NGN

    const fromWallet = wallets.find(w => w.currency === fromCurrency);
    const toWallet = wallets.find(w => w.currency === toCurrency);

    const convertedAmount = useMemo(() => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) return 0;
        if (fromCurrency === 'Naira') {
            return numAmount / exchangeRate;
        } else {
            return numAmount * exchangeRate;
        }
    }, [amount, fromCurrency, exchangeRate]);

    useEffect(() => {
        const numAmount = parseFloat(amount);
        if (fromWallet && !isNaN(numAmount) && numAmount > fromWallet.balance) {
            setError('Insufficient balance');
        } else {
            setError('');
        }
    }, [amount, fromWallet]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount('');
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!error && amount && parseFloat(amount) > 0) {
            onConvert(fromCurrency, toCurrency, parseFloat(amount));
        }
    };

    return (
        <Modal title="Convert Currency" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-dark-surface/50 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                        <label className="font-medium dark:text-dark-text-secondary">From</label>
                        <span className="text-gray-500 dark:text-dark-text-secondary">Balance: {fromWallet?.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex items-center mt-1">
                        <span className="font-bold text-lg mr-2">{fromCurrency === 'Naira' ? '₦' : '$'}</span>
                        <input 
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full text-2xl font-bold bg-transparent focus:outline-none"
                            autoFocus
                        />
                        <span className="font-semibold text-gray-500 dark:text-dark-text-secondary">{fromCurrency}</span>
                    </div>
                     {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                
                <div className="flex justify-center">
                    <Button type="button" variant="secondary" onClick={handleSwap} className="!p-2 rounded-full">
                        <ArrowsUpDownIcon className="h-5 w-5"/>
                    </Button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-dark-surface/50 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                        <label className="font-medium dark:text-dark-text-secondary">To</label>
                        <span className="text-gray-500 dark:text-dark-text-secondary">Balance: {toWallet?.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex items-center mt-1">
                        <span className="font-bold text-lg mr-2">{toCurrency === 'Naira' ? '₦' : '$'}</span>
                        <p className="w-full text-2xl font-bold text-gray-700 dark:text-gray-300">
                            {convertedAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 4})}
                        </p>
                        <span className="font-semibold text-gray-500 dark:text-dark-text-secondary">{toCurrency}</span>
                    </div>
                </div>

                <p className="text-center text-sm font-semibold text-brand-primary dark:text-dark-primary">
                    Rate: 1 USDT ≈ ₦{exchangeRate.toLocaleString()}
                </p>

                <Button type="submit" className="w-full text-lg !py-3" disabled={!!error || !amount || parseFloat(amount) <= 0}>
                    Convert
                </Button>
            </form>
        </Modal>
    );
};


interface WalletsProps { showToast: (message: string, type?: ToastMessage['type']) => void; }
export const Wallets: React.FC<WalletsProps> = ({ showToast }) => {
    const [wallets, setWallets] = useState<Wallet[]>(initialWallets);
    const [selectedWalletId, setSelectedWalletId] = useState<string>(initialWallets[0].id);
    const [expandedTxId, setExpandedTxId] = useState<string | null>(null);
    const [virtualCards, setVirtualCards] = useState<VirtualCard[]>(initialCards);
    const [visibleCardDetails, setVisibleCardDetails] = useState<string | null>(null);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);
    const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
    const [fundingCard, setFundingCard] = useState<VirtualCard | null>(null);
    const [withdrawingFromCard, setWithdrawingFromCard] = useState<VirtualCard | null>(null);
    const [isFundDollarWalletModalOpen, setIsFundDollarWalletModalOpen] = useState(false);
    
    // Handlers
    const handleCreateCard = (vendor: 'Visa' | 'Mastercard') => {
        const newCard: VirtualCard = { id: `VC-${Date.now()}`, vendor, cardNumber: '**** **** **** ****', expiry: '**/**', cvv: '***', isFrozen: false, balance: 0, billingAddress: {line1:'', city:'', state:'', postalCode:'', country:''} };
        setVirtualCards([newCard, ...virtualCards]);
        showToast(`New ${vendor} card created successfully!`);
    };
    const handleToggleFreeze = (id: string) => {
        const card = virtualCards.find(c => c.id === id);
        if (card) {
            setVirtualCards(virtualCards.map(c => c.id === id ? { ...c, isFrozen: !c.isFrozen } : c));
            showToast(`Card ${card.isFrozen ? 'unfrozen' : 'frozen'}.`);
        }
    };
    const handleDeleteCard = (id: string) => {
        setVirtualCards(virtualCards.filter(c => c.id !== id));
        showToast('Virtual card deleted.', 'error');
    };
    const handleToggleExpand = (txId: string) => {
        setExpandedTxId(currentId => (currentId === txId ? null : txId));
    };

    const handleWithdraw = () => {
        showToast('Withdrawal initiated successfully!');
        setIsWithdrawModalOpen(false);
    };

    const handleSendMoney = () => {
        showToast('Money sent successfully!');
        setIsSendMoneyModalOpen(false);
    };

    const handleConvert = (fromCurrency: string, toCurrency: string, amount: number) => {
        const rate = 1450.50;
        const convertedAmount = fromCurrency === 'Naira' ? amount / rate : amount * rate;

        setWallets(wallets.map(w => {
            if (w.currency === fromCurrency) {
                return { ...w, balance: w.balance - amount };
            }
            if (w.currency === toCurrency) {
                return { ...w, balance: w.balance + convertedAmount };
            }
            return w;
        }));

        showToast(`Converted ${amount.toLocaleString()} ${fromCurrency} successfully.`, 'success');
        setIsConversionModalOpen(false);
    };
    
    const handleFundCard = (cardId: string, amount: number) => {
        const dollarWallet = wallets.find(w => w.id === 'dollar');
        if (!dollarWallet || dollarWallet.balance < amount) {
            showToast('Insufficient balance in Dollar Wallet.', 'error');
            return;
        }
        setWallets(wallets.map(w => w.id === 'dollar' ? { ...w, balance: w.balance - amount } : w));
        setVirtualCards(cards => cards.map(c => c.id === cardId ? { ...c, balance: c.balance + amount } : c));
        showToast(`Successfully funded card with $${amount.toLocaleString()}.`);
        setFundingCard(null);
    };
    
    const handleWithdrawFromCard = (cardId: string, amount: number) => {
        const card = virtualCards.find(c => c.id === cardId);
        if (!card || card.balance < amount) {
            showToast('Insufficient balance on this card.', 'error');
            return;
        }
        setWallets(wallets.map(w => w.id === 'dollar' ? { ...w, balance: w.balance + amount } : w));
        setVirtualCards(cards => cards.map(c => c.id === cardId ? { ...c, balance: c.balance - amount } : c));
        showToast(`Successfully withdrew $${amount.toLocaleString()} from card.`);
        setWithdrawingFromCard(null);
    };

    // Modals
    const FundCardModal: React.FC<{ card: VirtualCard; dollarBalance: number; onClose: () => void; onFund: (cardId: string, amount: number) => void; }> = ({ card, dollarBalance, onClose, onFund }) => {
        const [amount, setAmount] = useState('');
        const numAmount = parseFloat(amount);
        const error = numAmount > dollarBalance ? 'Insufficient dollar wallet balance' : '';
        const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if(!error && numAmount > 0) onFund(card.id, numAmount); };
        return (<Modal title={`Fund ${card.vendor} Card`} onClose={onClose}><form onSubmit={handleSubmit} className="space-y-4"><div><label>Amount ($)</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 border rounded" autoFocus required/>{error && <p className="text-red-500 text-xs mt-1">{error}</p>}</div><p className="text-sm text-gray-500">Dollar Wallet Balance: ${dollarBalance.toLocaleString()}</p><Button type="submit" className="w-full" disabled={!!error || !numAmount || numAmount <= 0}>Confirm Funding</Button></form></Modal>);
    };
    
    const WithdrawFromCardModal: React.FC<{ card: VirtualCard; onClose: () => void; onWithdraw: (cardId: string, amount: number) => void; }> = ({ card, onClose, onWithdraw }) => {
        const [amount, setAmount] = useState('');
        const numAmount = parseFloat(amount);
        const error = numAmount > card.balance ? 'Insufficient card balance' : '';
        const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if(!error && numAmount > 0) onWithdraw(card.id, numAmount); };
        return (<Modal title={`Withdraw from ${card.vendor} Card`} onClose={onClose}><form onSubmit={handleSubmit} className="space-y-4"><div><label>Amount ($)</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 border rounded" autoFocus required/>{error && <p className="text-red-500 text-xs mt-1">{error}</p>}</div><p className="text-sm text-gray-500">Card Balance: ${card.balance.toLocaleString()}</p><Button type="submit" className="w-full" disabled={!!error || !numAmount || numAmount <= 0}>Confirm Withdrawal</Button></form></Modal>);
    };

    const FundDollarWalletModal: React.FC<{ onClose: () => void; }> = ({ onClose }) => {
        return (<Modal title="Fund Dollar Wallet" onClose={onClose} size="lg"><div className="space-y-4">
            <Button onClick={() => { onClose(); setIsConversionModalOpen(true); }} className="w-full !justify-start !p-4 !text-base"><ArrowPathIcon className="h-6 w-6 mr-3"/>Convert from Naira Wallet</Button>
            <Card className="!p-4"><h3 className="font-bold mb-2">From USDT</h3><p className="text-sm text-gray-600 mb-3">Send USDT (TRC20) to the address below.</p><div className="font-mono text-sm break-all p-2 bg-gray-100 rounded">TXYZ123AbcdeFGHIJKLMnopqrSTUVWX</div></Card>
            <Button onClick={() => { onClose(); const card = virtualCards.find(c => c.balance > 0); if (card) setWithdrawingFromCard(card); else showToast('No cards with funds available.', 'error'); }} className="w-full !justify-start !p-4 !text-base"><CreditCardIcon className="h-6 w-6 mr-3"/>Withdraw from Virtual Card</Button>
        </div></Modal>)
    };

    // Sub-components
    const getStatusChip = (status: Transaction['status']) => {
        const base = "px-2 py-0.5 text-xs font-medium rounded-full";
        switch (status) {
            case 'Completed': return <span className={`${base} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`}>Completed</span>;
            case 'Pending': return <span className={`${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300`}>Pending</span>;
            case 'Failed': return <span className={`${base} bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300`}>Failed</span>;
            default: return null;
        }
    };
    const renderMainContent = () => {
        switch (selectedWalletId) {
            case 'dollar': return (<><Card className="bg-green-50 dark:bg-dark-surface/50 border-l-4 border-green-500 mb-6"><h3 className="font-bold mb-2">Fund Your Dollar Wallet</h3><p className="text-sm text-gray-600">Use the Actions panel to fund your dollar wallet via Naira conversion, USDT deposit, or by withdrawing from a virtual card.</p></Card><Card><h2 className="text-xl font-bold mb-4">Transaction History</h2><p className="text-center py-8 text-gray-500">No Dollar transactions yet.</p></Card></>);
            case 'naira': return (<> <Card className="bg-blue-50 dark:bg-dark-surface/50 border-l-4 border-blue-500 dark:border-blue-400 mb-6"><h3 className="font-bold mb-2 dark:text-dark-text-primary">Fund Your Naira Wallet</h3><p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-3">Make a bank transfer to the account below to fund your wallet instantly.</p><div className="flex items-center justify-between p-3 bg-white dark:bg-dark-surface rounded-lg"><div className="font-mono"><p className="text-xs text-gray-500">Wema Bank</p><p className="text-lg font-bold">1234567890</p><p className="text-sm text-gray-600 dark:text-dark-text-secondary">John Doe / Creeb</p></div><Button variant="secondary" onClick={() => { navigator.clipboard.writeText("1234567890"); showToast("Account number copied!"); }}><ClipboardDocumentIcon className="h-5 w-5 mr-2" />Copy</Button></div></Card> <Card><h2 className="text-xl font-bold mb-4 dark:text-dark-text-primary">Transaction History</h2><div className="overflow-x-auto"><table className="min-w-full"><tbody>{mockTransactions.map(tx => (<React.Fragment key={tx.id}><tr onClick={() => handleToggleExpand(tx.id)} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center">{tx.type === 'Credit' ? <ArrowUpCircleIcon className="h-6 w-6 text-green-500 mr-3 shrink-0" /> : <ArrowDownCircleIcon className="h-6 w-6 text-red-500 mr-3 shrink-0" />}<div><div className="text-sm font-medium dark:text-gray-100">{tx.description}</div><div className="text-sm text-gray-500 dark:text-gray-400">{tx.date}</div></div></div></td><td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tx.type === 'Credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{tx.type === 'Credit' ? '+' : '-'} ₦{tx.amount.toLocaleString()}</td><td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusChip(tx.status)}</td><td className="px-6 py-4 whitespace-nowrap text-right"><ChevronDownIcon className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedTxId === tx.id ? 'rotate-180' : ''}`} /></td></tr>{expandedTxId === tx.id && (<tr className="bg-gray-50 dark:bg-gray-700/50"><td colSpan={4} className="px-6 py-4 text-sm"><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{Object.entries(tx.details || {}).map(([key, value])=>(<div key={key}><p className="font-semibold text-gray-600 dark:text-gray-300">{key}</p><p className="font-mono text-gray-800 dark:text-gray-100">{value}</p></div>))}</div></td></tr>)}</React.Fragment>))}</tbody></table></div></Card></>);
            case 'usdt': return (<> <Card className="bg-yellow-50 dark:bg-dark-surface/50 border-l-4 border-yellow-500 mb-6"><h3 className="font-bold mb-2 dark:text-dark-text-primary">Fund USDT Wallet</h3><p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-3">Send USDT (TRC20) to the address below or scan the QR code.</p><div className="flex flex-col md:flex-row items-center gap-4"><div className="p-2 bg-white dark:bg-gray-200 rounded-lg"><QrCodeIcon className="h-24 w-24 text-black"/></div><div className="flex-1 font-mono"><p className="text-xs text-gray-500">Static Wallet Address</p><p className="text-sm break-all font-bold">TXYZ123AbcdeFGHIJKLMnopqrSTUVWX</p><Button variant="secondary" className="mt-2 w-full" onClick={() => { navigator.clipboard.writeText("TXYZ123AbcdeFGHIJKLMnopqrSTUVWX"); showToast("USDT address copied!"); }}><ClipboardDocumentIcon className="h-5 w-5 mr-2" />Copy Address</Button></div></div></Card> <Card><h2 className="text-xl font-bold mb-4 dark:text-dark-text-primary">Transaction History</h2><p className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">No USDT transactions yet.</p></Card></>);
            case 'card': return (
                <Card>
                    <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold dark:text-dark-text-primary">Virtual Cards</h2></div>
                    {virtualCards.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">{virtualCards.map(card => { const isDetailsVisible = visibleCardDetails === card.id; return (<div key={card.id}><VirtualCardDisplay card={card} detailsVisible={isDetailsVisible} onToggleDetails={() => setVisibleCardDetails(prev => prev === card.id ? null : card.id)} onToggleFreeze={handleToggleFreeze} onDelete={handleDeleteCard} /><div className="mt-2 flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-surface/50 rounded-b-xl"><p className="font-bold text-lg dark:text-dark-text-primary">${card.balance.toFixed(2)}</p><div className="flex space-x-2"><Button onClick={() => setWithdrawingFromCard(card)} variant="secondary" className="!text-xs !py-1 !px-2" disabled={card.isFrozen}>Withdraw</Button><Button onClick={() => setFundingCard(card)} className="!text-xs !py-1 !px-2" disabled={card.isFrozen}>Fund Card</Button></div></div>{isDetailsVisible && (<div className="bg-gray-100 dark:bg-dark-surface/50 p-4 -mt-2 pt-4 shadow-inner animate-fade-in"><h4 className="text-xs font-bold uppercase text-gray-500 dark:text-dark-text-secondary mb-2">Billing Address</h4><div className="flex items-start text-sm"><MapPinIcon className="h-5 w-5 text-gray-500 dark:text-dark-text-secondary mr-3 mt-1 flex-shrink-0"/><div><p className="font-medium text-brand-text-primary dark:text-dark-text-primary">{card.billingAddress.line1}</p><p className="text-brand-text-secondary dark:text-dark-text-secondary">{card.billingAddress.city}, {card.billingAddress.state} {card.billingAddress.postalCode}</p><p className="text-brand-text-secondary dark:text-dark-text-secondary">{card.billingAddress.country}</p></div></div></div>)}</div>)})}</div>) : (<div className="text-center py-10 text-gray-500 dark:text-dark-text-secondary"><p>You have no virtual cards.</p><p className="text-sm">Use the Actions panel to create one.</p></div>)}
                </Card>
            );
            default: return null;
        }
    };
    const renderActions = () => {
        switch (selectedWalletId) {
            case 'dollar': return (<div className="space-y-3"><Button onClick={() => setIsFundDollarWalletModalOpen(true)} variant="primary" className="w-full justify-center"><PlusIcon className="h-5 w-5 mr-2"/>Fund Wallet</Button><Button onClick={() => setIsWithdrawModalOpen(true)} variant="secondary" className="w-full justify-center"><ArrowDownCircleIcon className="h-5 w-5 mr-2" />Withdraw Funds</Button></div>);
            case 'naira': return (<div className="space-y-3"><Button onClick={() => setIsWithdrawModalOpen(true)} variant="primary" className="w-full justify-center"><ArrowDownCircleIcon className="h-5 w-5 mr-2" />Withdraw Funds</Button><Button onClick={() => setIsSendMoneyModalOpen(true)} variant="secondary" className="w-full justify-center"><PaperAirplaneIcon className="h-5 w-5 mr-2" />Send Money</Button><Button onClick={() => setIsConversionModalOpen(true)} variant="secondary" className="w-full justify-center"><ArrowPathIcon className="h-5 w-5 mr-2"/>Convert Currency</Button></div>);
            case 'usdt': return (<div className="space-y-3"><Button onClick={() => setIsConversionModalOpen(true)} variant="primary" className="w-full justify-center"><ArrowPathIcon className="h-5 w-5 mr-2"/>Convert Currency</Button><Button onClick={() => showToast('Fund card action triggered!', 'info')} variant="secondary" className="w-full justify-center"><CreditCardIcon className="h-5 w-5 mr-2"/>Fund a Card</Button></div>);
            case 'card': return (<div className="space-y-3"><Button onClick={() => handleCreateCard('Visa')} variant="primary" className="w-full justify-center"><PlusIcon className="h-5 w-5 mr-2" />Create Visa Card</Button><Button onClick={() => handleCreateCard('Mastercard')} variant="secondary" className="w-full justify-center"><PlusIcon className="h-5 w-5 mr-2" />Create Mastercard</Button></div>);
            default: return null;
        }
    };

  return (
    <>
        {fundingCard && <FundCardModal card={fundingCard} dollarBalance={wallets.find(w => w.id === 'dollar')?.balance || 0} onClose={() => setFundingCard(null)} onFund={handleFundCard} />}
        {withdrawingFromCard && <WithdrawFromCardModal card={withdrawingFromCard} onClose={() => setWithdrawingFromCard(null)} onWithdraw={handleWithdrawFromCard} />}
        {isFundDollarWalletModalOpen && <FundDollarWalletModal onClose={() => setIsFundDollarWalletModalOpen(false)} />}
        {isWithdrawModalOpen && <Modal title="Withdraw Funds" onClose={() => setIsWithdrawModalOpen(false)}><form onSubmit={(e) => { e.preventDefault(); handleWithdraw(); }} className="space-y-4"><div><label className="block text-sm font-medium dark:text-dark-text-secondary">Amount ({selectedWalletId === 'dollar' ? '$' : '₦'})</label><input type="number" placeholder="Enter amount" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/></div><div><label className="block text-sm font-medium dark:text-dark-text-secondary">Select Payout Account</label><select className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">{mockPayoutAccounts.map(acc => <option key={acc.id}>{acc.bankName} - ...{acc.accountNumber.slice(-4)}</option>)}</select></div><Button type="submit" className="w-full">Confirm Withdrawal</Button></form></Modal>}
        {isSendMoneyModalOpen && <Modal title="Send Money" onClose={() => setIsSendMoneyModalOpen(false)}><form onSubmit={(e) => { e.preventDefault(); handleSendMoney(); }} className="space-y-4"><div><label className="block text-sm font-medium dark:text-dark-text-secondary">Amount (₦)</label><input type="number" placeholder="Enter amount" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/></div><div><label className="block text-sm font-medium dark:text-dark-text-secondary">Bank Name</label><input type="text" placeholder="e.g., GTBank" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/></div><div><label className="block text-sm font-medium dark:text-dark-text-secondary">Account Number</label><input type="text" placeholder="Enter account number" className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border" required/></div><Button type="submit" className="w-full">Send Money</Button></form></Modal>}
        {isConversionModalOpen && <ConversionModal wallets={wallets} selectedWalletId={selectedWalletId} onClose={() => setIsConversionModalOpen(false)} onConvert={handleConvert} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
                <h2 className="text-xl font-bold mb-4 dark:text-dark-text-primary">Your Wallets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wallets.map(wallet => ( <WalletCard key={wallet.id} wallet={wallet} isSelected={selectedWalletId === wallet.id} onClick={() => setSelectedWalletId(wallet.id)} /> ))}
                </div>
            </Card>
            {renderMainContent()}
          </div>
          <div className="lg:col-span-1">
            <Card>
                <h2 className="text-xl font-bold mb-4 dark:text-dark-text-primary">Actions</h2>
                {renderActions()}
            </Card>
          </div>
        </div>
    </>
  );
};