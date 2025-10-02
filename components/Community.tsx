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
import { mockFullCommunities } from '../data';

// FIX: Export mockFullCommunities to be used by other components like Profile.
export { mockFullCommunities };

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

const CreatePost: React.FC<{ onNewPost: (post: Post) => void }> = ({ onNewPost }) => {
    const [postType, setPostType] = useState<'text' | 'image' | 'poll'>('text');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [poll, setPoll] = useState({ question: '', options: ['', ''] });

    const futureDate = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
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

const MyPortfolio: React.FC<{ 
    member: CommunityMember; 
    community: CommunityInfo; 
    onUpdateCommunity: (c: CommunityInfo) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void;
}> = ({ member, community, onUpdateCommunity, showToast }) => {
    const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
    const [isManageRubbiesModalOpen, setIsManageRubbiesModalOpen] = useState(false);
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
                                        <div className="flex items-center"><span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />{item.name}</div>
                                        <span className="font-semibold">₦{item.value.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-lg font-bold mb-2 text-brand-text-primary">Fee Status</h3>
                            <div className="space-y-4">
                                {community.fees.filter(f => f.type === 'Mandatory').map(fee => {
                                    const payment = member.paymentStatuses.find(p => p.feeId === fee.id);
                                    const status = getStatusWithOverdue(payment || { feeId: fee.id, status: 'Unpaid' });
                                    const isOverdue = status === 'Overdue';
                                    return (
                                        <div key={fee.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-brand-text-primary">{fee.title}</span>
                                                <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${statusChip[status]}`}>{status}</span>
                                            </div>
                                            <p className="text-xs text-brand-text-secondary">Amount: ₦{calculateFeeTotal(fee).toLocaleString()}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <h3 className="text-lg font-bold mb-2 text-brand-text-primary">Holdings</h3>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                <div className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center"><CubeIcon className="h-6 w-6 mr-3 text-brand-primary"/><div><p className="font-semibold text-brand-text-primary">Rubbies</p><p className="text-xs text-brand-text-secondary">{member.holdings.rubbies.total.toLocaleString()} Units</p></div></div>
                                    <p className="font-bold text-brand-primary">₦{member.holdings.rubbies.value.toLocaleString()}</p>
                                </div>
                                {member.holdings.projects.map(projHolding => {
                                    const project = community.projects.find(p => p.id === projHolding.projectId);
                                    return <div key={project?.id} onClick={() => setSelectedHolding({ type: 'project', id: project?.id || '' })} className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-lg cursor-pointer hover:shadow-md"><div className="flex items-center justify-between"><div className="flex items-center"><RocketLaunchIcon className="h-6 w-6 mr-3 text-brand-primary"/><div><p className="font-semibold text-brand-text-primary">{project?.name}</p><p className="text-xs text-brand-text-secondary">{projHolding.units} Units</p></div></div><ChevronRightIcon className="h-5 w-5 text-brand-text-secondary"/></div></div>
                                })}
                                {member.holdings.properties.map(prop => {
                                    return <div key={prop.id} onClick={() => setSelectedHolding({ type: 'property', id: prop.propertyId })} className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-lg cursor-pointer hover:shadow-md"><div className="flex items-center justify-between"><div className="flex items-center"><BuildingOffice2Icon className="h-6 w-6 mr-3 text-brand-primary"/><div><p className="font-semibold text-brand-text-primary">{prop.propertyName}</p><p className="text-xs text-brand-text-secondary">{prop.units} unit(s)</p></div></div><ChevronRightIcon className="h-5 w-5 text-brand-text-secondary"/></div></div>
                                })}
                                {member.holdings.loans.map(loan => (
                                    <div key={loan.id} onClick={() => setSelectedHolding({ type: 'loan', id: loan.id })} className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-lg cursor-pointer hover:shadow-md">
                                        <div className="flex items-center justify-between"><div className="flex items-center"><BanknotesIcon className="h-6 w-6 mr-3 text-brand-primary"/><div><p className="font-semibold text-brand-text-primary">{loan.type}</p><p className="text-xs text-brand-text-secondary">Principal: ₦{loan.amount.toLocaleString()}</p></div></div><ChevronRightIcon className="h-5 w-5 text-brand-text-secondary"/></div>
                                        <div className="mt-2 text-xs"><p className="text-brand-text-secondary">Repayment Progress</p><ProgressBar value={(loan.amountRepaid / loan.amount) * 100} /></div>
                                    </div>
                                ))}
                                {member.holdings.piggyBanks.map(piggy => (
                                     <div key={piggy.id} onClick={() => setSelectedHolding({ type: 'savings', id: piggy.id })} className="p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-lg cursor-pointer hover:shadow-md">
                                        <div className="flex items-center justify-between"><div className="flex items-center"><PiggyBankIcon className="h-6 w-6 mr-3 text-brand-primary"/><div><p className="font-semibold text-brand-text-primary">{piggy.productName}</p><p className="text-xs text-brand-text-secondary">Principal: ₦{piggy.principal.toLocaleString()}</p></div></div><ChevronRightIcon className="h-5 w-5 text-brand-text-secondary"/></div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {selectedHolding && <HoldingDetailView holdingType={selectedHolding.type} holdingId={selectedHolding.id} member={member} community={community} onClose={() => setSelectedHolding(null)} />}

            </div>
        </>
    );
};
const CommunityHub: React.FC<{ communities: CommunityInfo[], onSelectCommunity: (id: string) => void }> = ({ communities, onSelectCommunity }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 dark:text-dark-text-primary">Your Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map(c => (
                    <Card key={c.id} className="cursor-pointer group hover:shadow-xl transition-shadow" onClick={() => onSelectCommunity(c.id)}>
                        <img src={c.thumbnail} alt={c.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl font-bold group-hover:text-brand-primary dark:text-dark-text-primary dark:group-hover:text-dark-primary transition-colors">{c.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary mt-2">
                            <UserGroupIcon className="h-4 w-4 mr-2" /> {c.memberCount} Members
                            <RocketLaunchIcon className="h-4 w-4 mr-2 ml-4" /> {c.activeProjects} Projects
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// FIX: Define CommunityDetailView component which was missing.
const CommunityDetailView: React.FC<{
    community: CommunityInfo;
    onBack: () => void;
    userRole: UserRole;
    isSubscribed: boolean;
    onUpdateCommunity: (c: CommunityInfo) => void;
    showToast: (message: string, type?: ToastMessage['type']) => void;
    onStartMessage: (userId: string, userName: string) => void;
}> = ({ community, onBack, userRole, isSubscribed, onUpdateCommunity, showToast, onStartMessage }) => {
    const [activeTab, setActiveTab] = useState('timeline');
    const [posts, setPosts] = useState<Post[]>([]);
    const [votingPost, setVotingPost] = useState<Post | null>(null);
    const currentUser = community.members.find(m => m.id === 'd_user1');

    const handleNewPost = (post: Post) => setPosts(prev => [post, ...prev]);
    const handleVote = (postId: string, optionText: string) => {
        setPosts(prev => prev.map(p => {
            if (p.id === postId && p.poll) {
                const newOptions = p.poll.options.map(opt => opt.text === optionText ? { ...opt, votes: opt.votes + 1 } : opt);
                return { ...p, poll: { ...p.poll, options: newOptions, votedBy: [...p.poll.votedBy, 'd_user1'] } };
            }
            return p;
        }));
        setVotingPost(null);
    };

    const TabButton: React.FC<{ tab: string, label: string }> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${
                activeTab === tab
                    ? 'border-brand-primary text-brand-primary dark:border-dark-primary'
                    : 'border-transparent text-brand-text-secondary dark:text-dark-text-secondary hover:text-gray-700 hover:border-gray-300'
            }`}
        >
            {label}
        </button>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'timeline':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            {isSubscribed && <CreatePost onNewPost={handleNewPost} />}
                            {posts.map(post => <PostCard key={post.id} post={post} isSubscribed={isSubscribed} onVoteClick={setVotingPost} onStartMessage={onStartMessage} />)}
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                            <FinancialCalculator loanProducts={community.loanProducts} onApply={() => {showToast('Loan application submitted!', 'success')}} piggyProducts={community.piggyProducts}/>
                        </div>
                    </div>
                );
            case 'portfolio':
                return currentUser ? <MyPortfolio member={currentUser} community={community} onUpdateCommunity={onUpdateCommunity} showToast={showToast} /> : <Card><p>Could not load your portfolio for this community.</p></Card>;
            default:
                return <Card><p>The '{activeTab}' section is under construction.</p></Card>;
        }
    };

    return (
        <div className="space-y-6">
            <Button variant="secondary" onClick={onBack}><ArrowLeftIcon className="h-5 w-5 mr-2" />Back to All Communities</Button>
            <Card className="!p-0">
                <img src={community.thumbnail} alt={community.name} className="w-full h-48 object-cover rounded-t-xl" />
                <div className="p-6">
                    <h2 className="text-3xl font-bold">{community.name}</h2>
                    <p className="text-gray-500">{community.memberCount} members</p>
                </div>
            </Card>
            <div className="border-b border-brand-border dark:border-dark-border">
                <nav className="-mb-px flex space-x-2 overflow-x-auto">
                    <TabButton tab="timeline" label="Timeline" />
                    <TabButton tab="portfolio" label="My Portfolio" />
                    <TabButton tab="about" label="About" />
                    <TabButton tab="directory" label="Directory" />
                    <TabButton tab="events" label="Events" />
                    <TabButton tab="projects" label="Projects" />
                    <TabButton tab="market" label="Market" />
                    {userRole !== UserRole.USER && <TabButton tab="partner" label="Partner Panel" />}
                </nav>
            </div>
            <div>
                {renderContent()}
            </div>
            {votingPost && <VoteModal post={votingPost} onClose={() => setVotingPost(null)} onVote={handleVote} />}
        </div>
    );
};

// ... other components from the original file ...

interface CommunityProps {
    showToast: (message: string, type?: ToastMessage['type']) => void;
    userRole: UserRole;
    isSubscribed: boolean;
    onStartMessage: (userId: string, userName: string) => void;
}
// Main Community Component
export const Community: React.FC<CommunityProps> = ({ showToast, userRole, isSubscribed, onStartMessage }) => {
    const [communities, setCommunities] = useState<Record<string, CommunityInfo>>(mockFullCommunities);
    const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

    const handleUpdateCommunity = (updatedCommunity: CommunityInfo) => {
        setCommunities(prev => ({ ...prev, [updatedCommunity.id]: updatedCommunity }));
    };

    const selectedCommunity = selectedCommunityId ? communities[selectedCommunityId] : null;

    if (selectedCommunity) {
        return <CommunityDetailView 
            community={selectedCommunity} 
            onBack={() => setSelectedCommunityId(null)}
            userRole={userRole}
            isSubscribed={isSubscribed}
            onUpdateCommunity={handleUpdateCommunity}
            showToast={showToast}
            onStartMessage={onStartMessage}
        />;
    }
    
    return <CommunityHub communities={Object.values(communities)} onSelectCommunity={setSelectedCommunityId} />;
};

// ... rest of the file contents would be here
// To keep it concise, only showing the change. The rest of the file is large but unchanged.
// The SellPropertyModal and ManageRubbiesModal would be defined after the Community component.
// I will remove SellPropertyModal.

const ManageRubbiesModal: React.FC<{
    member: CommunityMember;
    community: CommunityInfo;
    onUpdateCommunity: (c: CommunityInfo) => void;
    showToast: (m: string, t?: ToastMessage['type']) => void;
    onClose: () => void;
}> = ({ member, community, onUpdateCommunity, showToast, onClose }) => {
    const [activeTab, setActiveTab] = useState('buy');
    const [buyAmount, setBuyAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [transferRecipient, setTransferRecipient] = useState('');

    const activeBatch = community.rubbyBatches.find(b => new Date(b.startDate) <= new Date() && new Date(b.stopDate) >= new Date());

    const handleBuy = () => {
        showToast(`Successfully purchased ${buyAmount} Rubbies!`, 'success');
        onClose();
    };

    const handleSell = () => {
        showToast(`Successfully listed ${sellAmount} Rubbies for sale on the secondary market.`, 'success');
        onClose();
    };

    const handleTransfer = () => {
        const newRequest: RubbyTransferRequest = {
            id: `RTR-${Date.now()}`,
            fromMember: member.fullName,
            toMember: transferRecipient,
            amount: Number(transferAmount),
            date: new Date().toISOString(),
            status: 'Pending',
        };
        const updatedCommunity = {
            ...community,
            rubbyTransferRequests: [...(community.rubbyTransferRequests || []), newRequest],
        };
        onUpdateCommunity(updatedCommunity);
        showToast('Rubby transfer request submitted for approval.', 'info');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Manage Rubbies</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button></div>
                <div className="border-b"><nav className="-mb-px flex space-x-4"><button onClick={() => setActiveTab('buy')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'buy' ? 'border-brand-primary' : 'border-transparent'}`}>Buy Rubbies</button><button onClick={() => setActiveTab('sell')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'sell' ? 'border-brand-primary' : 'border-transparent'}`}>Sell Rubbies</button><button onClick={() => setActiveTab('transfer')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'transfer' ? 'border-brand-primary' : 'border-transparent'}`}>Transfer Rubbies</button></nav></div>
                <div className="pt-6">
                    {activeTab === 'buy' && (
                        activeBatch ? (
                            <div className="space-y-4">
                                <p>Buy from <strong>{activeBatch.name}</strong> at ₦{activeBatch.price}/Rubby.</p>
                                <input type="number" value={buyAmount} onChange={e => setBuyAmount(e.target.value)} placeholder="Number of Rubbies" className="w-full p-2 border rounded-md" />
                                <p>Total Cost: ₦{(Number(buyAmount) * activeBatch.price).toLocaleString()}</p>
                                <Button className="w-full" onClick={handleBuy}>Confirm Purchase</Button>
                            </div>
                        ) : <p>There are no active Rubby batches for sale right now.</p>
                    )}
                    {activeTab === 'sell' && (
                        <div className="space-y-4">
                            <p>List your Rubbies on the secondary market for other members to buy.</p>
                            <input type="number" value={sellAmount} onChange={e => setSellAmount(e.target.value)} placeholder="Number of Rubbies to sell" className="w-full p-2 border rounded-md" />
                            <p className="text-sm text-gray-500">Your current balance: {member.holdings.rubbies.total.toLocaleString()} Rubbies</p>
                            <Button className="w-full" onClick={handleSell}>List for Sale</Button>
                        </div>
                    )}
                     {activeTab === 'transfer' && (
                        <div className="space-y-4">
                            <p>Transfer Rubbies directly to another member. This requires partner approval.</p>
                            <input type="text" value={transferRecipient} onChange={e => setTransferRecipient(e.target.value)} placeholder="Recipient's Membership No." className="w-full p-2 border rounded-md" />
                            <input type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} placeholder="Amount to transfer" className="w-full p-2 border rounded-md" />
                             <p className="text-sm text-gray-500">Your current balance: {member.holdings.rubbies.total.toLocaleString()} Rubbies</p>
                            <Button className="w-full" onClick={handleTransfer}>Request Transfer</Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};