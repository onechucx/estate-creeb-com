import React, { useState, useMemo, useEffect } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { PostCard } from './Community';
import { Post, PropertyHolding, GlobalAd, OtherHolding, AppView, ToastMessage, HubPortfolio, DashboardSummary, PortfolioPerformanceDataPoint, Birthday } from '../types';
import { ArrowUpRightIcon, BanknotesIcon, BuildingOffice2Icon, CubeIcon, RocketLaunchIcon, CakeIcon, DocumentChartBarIcon, XMarkIcon, PlusIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { AdSection } from './AdSection';
import { mockGlobalAd } from '../data';
import { 
    getDashboardSummary, 
    getPortfolioPerformance, 
    getPortfolioOverview, 
    getOtherHoldings, 
    getGlobalTimeline, 
    getUpcomingBirthdays, 
    getUserProperties,
    saveOtherHolding,
    deleteOtherHolding
} from '../api';


interface DashboardProps {
  setActiveView: (view: AppView) => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;
}

const MetricCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}> = ({ title, value, change, icon: Icon, color }) => {
    const colorClasses = {
        blue: 'from-blue-400 to-blue-600',
        green: 'from-green-400 to-green-600',
        purple: 'from-purple-400 to-purple-600',
        yellow: 'from-yellow-400 to-yellow-600',
    };
    const gradientClass = colorClasses[color] || colorClasses.blue;

    return (
        <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg text-white shadow-md bg-gradient-to-br ${gradientClass}`}>
                    <Icon className="h-7 w-7" />
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-semibold">
                    {change}
                    <ArrowUpRightIcon className="h-4 w-4 ml-1" />
                </div>
            </div>
            <div className="mt-4 flex-grow">
                <p className="text-sm font-medium text-brand-text-secondary dark:text-dark-text-secondary">{title}</p>
                <h3 className="text-3xl font-bold text-brand-text-primary dark:text-dark-text-primary mt-1">{value}</h3>
            </div>
        </Card>
    );
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; value: number }>; label?: string; }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-surface dark:bg-dark-surface p-2 border border-brand-border dark:border-dark-border rounded-md shadow-lg">
        <p className="label font-semibold">{`${label}`}</p>
        <p className="intro" style={{ color: payload[0].color }}>{`Value : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const PortfolioOverview: React.FC<{ portfolios: HubPortfolio[]; otherHoldings: OtherHolding[] }> = ({ portfolios, otherHoldings }) => {
    const [selectedHubId, setSelectedHubId] = useState('all');

    const displayData = useMemo(() => {
        let aggregatedAssets = { rubbies: 0, properties: 0, projects: 0, loans: 0, savings: 0, otherHoldings: 0 };

        if (selectedHubId === 'all') {
            portfolios.forEach(p => {
                aggregatedAssets.rubbies += p.assets.rubbies;
                aggregatedAssets.properties += p.assets.properties;
                aggregatedAssets.projects += p.assets.projects;
                aggregatedAssets.loans += p.assets.loans;
                aggregatedAssets.savings += p.assets.savings;
            });
            aggregatedAssets.otherHoldings = otherHoldings.reduce((sum, h) => sum + h.value, 0);

        } else {
            const selectedPortfolio = portfolios.find(p => p.hubId === selectedHubId);
            if (selectedPortfolio) {
                aggregatedAssets = { ...selectedPortfolio.assets, otherHoldings: 0 };
            }
        }

        const dataForChart = [
            { name: 'Rubbies', value: aggregatedAssets.rubbies, color: '#3b82f6' },
            { name: 'Properties', value: aggregatedAssets.properties, color: '#10b981' },
            { name: 'Projects', value: aggregatedAssets.projects, color: '#f59e0b' },
            { name: 'Loans', value: aggregatedAssets.loans, color: '#f97316' },
            { name: 'Savings', value: aggregatedAssets.savings, color: '#8b5cf6' },
            { name: 'Other Holdings', value: aggregatedAssets.otherHoldings, color: '#6366f1'},
        ].filter(item => item.value > 0);

        const totalValue = dataForChart.reduce((sum, item) => sum + item.value, 0);
        const chartData = [...dataForChart].sort((a, b) => b.value - a.value);

        return { dataForChart, totalValue, chartData };
    }, [portfolios, otherHoldings, selectedHubId]);

    return (
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-brand-text-primary dark:text-dark-text-primary">Portfolio Overview</h3>
                <select 
                    value={selectedHubId} 
                    onChange={e => setSelectedHubId(e.target.value)}
                    className="text-sm bg-gray-100 dark:bg-dark-surface/50 border-none rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    aria-label="Select portfolio view"
                >
                    <option value="all">All-Inclusive</option>
                    {portfolios.map(p => (
                        <option key={p.hubId} value={p.hubId}>{p.hubName}</option>
                    ))}
                </select>
            </div>
            <p className="text-sm text-brand-text-secondary dark:text-dark-text-secondary mt-2">Total Value</p>
            <p className="text-4xl font-bold text-blue-900 dark:text-blue-400 mt-1">
                ₦{displayData.totalValue.toLocaleString()}
            </p>
            <div className="h-48 w-48 mx-auto my-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={displayData.chartData}
                            cx="50%"
                            cy="50%"
                            dataKey="value"
                            innerRadius="75%"
                            outerRadius="100%"
                            paddingAngle={2}
                            startAngle={90}
                            endAngle={-270}
                        >
                            {displayData.chartData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="var(--brand-surface)" strokeWidth={2} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4">
                {displayData.dataForChart.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></span>
                            <span className="text-brand-text-secondary dark:text-dark-text-secondary">{item.name}</span>
                        </div>
                        <span className="font-semibold text-brand-text-primary dark:text-dark-text-primary">₦{item.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const HoldingDetailModal: React.FC<{
    holding: OtherHolding | 'new' | null;
    onClose: () => void;
    onSave: (holding: OtherHolding | Omit<OtherHolding, 'id'>) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
}> = ({ holding, onClose, onSave, onDelete }) => {
    const isNew = holding === 'new';
    const [formData, setFormData] = useState<Omit<OtherHolding, 'id'>>(() => {
        if (isNew || !holding) {
            return { name: '', shortDescription: '', longDescription: '', value: 0, images: [] };
        }
        return holding;
    });
    const [selectedImage, setSelectedImage] = useState(formData.images[0] || '');

    useEffect(() => {
        if (!isNew && holding) {
            setFormData(holding);
            setSelectedImage(holding.images[0] || '');
        }
    }, [holding, isNew]);

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };
    
    const handleAddImageField = () => {
        if (formData.images.length < 5) {
            setFormData({ ...formData, images: [...formData.images, ''] });
        }
    };
    
    const handleRemoveImageField = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
        if (selectedImage === formData.images[index]) {
            setSelectedImage(newImages[0] || '');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const saveData: OtherHolding | Omit<OtherHolding, 'id'> = isNew ?
            { ...formData, value: Number(formData.value) || 0 } :
            { id: (holding as OtherHolding).id, ...formData, value: Number(formData.value) || 0 };
        
        await onSave(saveData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
                 <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold dark:text-dark-text-primary">{isNew ? 'Add New Holding' : 'Edit Holding'}</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6"/></button></div>
                 <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <img src={selectedImage || 'https://via.placeholder.com/600x400?text=No+Image'} alt="Selected holding view" className="w-full h-56 object-cover rounded-lg bg-gray-200" />
                            <div className="grid grid-cols-5 gap-2">
                                {formData.images.map((img, index) => (
                                    <img key={index} src={img || 'https://via.placeholder.com/100x100?text=...'} onClick={() => setSelectedImage(img)} alt={`Thumbnail ${index + 1}`} className={`w-full h-16 object-cover rounded cursor-pointer border-2 ${selectedImage === img ? 'border-brand-primary' : 'border-transparent'}`} />
                                ))}
                            </div>
                        </div>
                        <form id="holding-form" onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Asset Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" required />
                            <input type="text" placeholder="Short Description" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full p-2 border rounded" required />
                            <textarea placeholder="Long Description / Details" value={formData.longDescription} onChange={e => setFormData({...formData, longDescription: e.target.value})} rows={4} className="w-full p-2 border rounded" />
                            <div><label>Current Value (₦)</label><input type="number" placeholder="Value" value={formData.value} onChange={e => setFormData({...formData, value: Number(e.target.value)})} className="w-full p-2 border rounded" required /></div>
                        </form>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Image URLs (up to 5)</h4>
                        <div className="space-y-2">
                            {formData.images.map((img, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input type="url" placeholder={`Image URL ${index + 1}`} value={img} onChange={e => handleImageChange(index, e.target.value)} className="w-full p-2 border rounded" />
                                    <Button type="button" variant="danger" className="!p-2" onClick={() => handleRemoveImageField(index)}><TrashIcon className="h-4 w-4" /></Button>
                                </div>
                            ))}
                            {formData.images.length < 5 && <Button type="button" variant="secondary" onClick={handleAddImageField}><PlusIcon className="h-4 w-4 mr-1"/>Add Image</Button>}
                        </div>
                    </div>
                 </div>
                 <div className="pt-4 mt-4 border-t flex justify-between">
                    {!isNew && onDelete && <Button variant="danger" onClick={async () => { await onDelete((holding as OtherHolding).id); onClose(); }}>Delete Holding</Button>}
                    <div className="flex-1 flex justify-end gap-2"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form="holding-form">Save</Button></div>
                 </div>
            </Card>
        </div>
    );
};

const OtherHoldingsPanel: React.FC<{ holdings: OtherHolding[]; onEditHolding: (holding: OtherHolding | 'new') => void }> = ({ holdings, onEditHolding }) => (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Other Holdings</h3>
            <Button onClick={() => onEditHolding('new')}><PlusIcon className="h-5 w-5 mr-2" />Add New</Button>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {holdings.length > 0 ? holdings.map(h => (
                <div key={h.id} onClick={() => onEditHolding(h)} className="flex items-center p-3 bg-gray-50 dark:bg-dark-surface/50 rounded-lg cursor-pointer hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 border border-transparent hover:-translate-y-0.5 transition-all duration-300">
                    <img src={h.images[0] || 'https://via.placeholder.com/100x100?text=...'} alt={h.name} className="w-16 h-16 object-cover rounded-md mr-4 bg-gray-200" />
                    <div className="flex-1">
                        <p className="font-bold text-brand-text-primary">{h.name}</p>
                        <p className="text-sm text-brand-text-secondary">{h.shortDescription}</p>
                    </div>
                    <p className="font-semibold text-lg text-brand-primary">₦{h.value.toLocaleString()}</p>
                </div>
            )) : <p className="text-center text-gray-500 py-8">You haven't added any other holdings yet.</p>}
        </div>
    </Card>
);

export const Dashboard: React.FC<DashboardProps> = ({ setActiveView, showToast }) => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [performanceData, setPerformanceData] = useState<PortfolioPerformanceDataPoint[]>([]);
    const [hubPortfolios, setHubPortfolios] = useState<HubPortfolio[]>([]);
    const [otherHoldings, setOtherHoldings] = useState<OtherHolding[]>([]);
    const [userProperties, setUserProperties] = useState<PropertyHolding[]>([]);
    const [globalPosts, setGlobalPosts] = useState<Post[]>([]);
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [editingHolding, setEditingHolding] = useState<OtherHolding | 'new' | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [
                summaryRes,
                performanceRes,
                hubsRes,
                otherHoldingsRes,
                propertiesRes,
                postsRes,
                birthdaysRes
            ] = await Promise.all([
                getDashboardSummary(),
                getPortfolioPerformance(),
                getPortfolioOverview(),
                getOtherHoldings(),
                getUserProperties(),
                getGlobalTimeline(),
                getUpcomingBirthdays()
            ]);

            setSummary(summaryRes);
            setPerformanceData(performanceRes);
            setHubPortfolios(hubsRes);
            setOtherHoldings(otherHoldingsRes);
            setUserProperties(propertiesRes);
            setGlobalPosts(postsRes);
            setBirthdays(birthdaysRes);

        } catch (err: any) {
            setError(err.message || 'Failed to fetch dashboard data. Please try again later.');
            showToast('Could not load dashboard data.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaveHolding = async (holdingData: OtherHolding | Omit<OtherHolding, 'id'>) => {
        try {
            const savedHolding = await saveOtherHolding(holdingData);
            setOtherHoldings(prev => {
                const exists = prev.some(h => h.id === savedHolding.id);
                if (exists) {
                    return prev.map(h => h.id === savedHolding.id ? savedHolding : h);
                }
                return [savedHolding, ...prev];
            });
            showToast('Holding saved successfully!', 'success');
        } catch (err) {
            showToast('Failed to save holding.', 'error');
        }
    };
    
    const handleDeleteHolding = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this holding?')) {
            try {
                await deleteOtherHolding(id);
                setOtherHoldings(prev => prev.filter(h => h.id !== id));
                showToast('Holding deleted successfully.', 'success');
            } catch (err) {
                 showToast('Failed to delete holding.', 'error');
            }
        }
    };
    
    if (isLoading) {
        return <div className="text-center py-20">Loading Dashboard...</div>;
    }
    
    if (error) {
        return (
            <Card className="text-center py-20 bg-red-50 border-red-200">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-800">Failed to Load Dashboard</h3>
                <p className="text-red-600 mt-2">{error}</p>
                <Button onClick={fetchData} className="mt-6">Retry</Button>
            </Card>
        );
    }

  return (
    <>
    {editingHolding && <HoldingDetailModal holding={editingHolding} onClose={() => setEditingHolding(null)} onSave={handleSaveHolding} onDelete={handleDeleteHolding} />}

    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold dark:text-dark-text-primary">Welcome Back, John!</h2>
        <p className="text-brand-text-secondary dark:text-dark-text-secondary mt-1">Here's a summary of your community activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Loans" value={summary?.loans.value || '$0'} change={summary?.loans.change || '+0%'} icon={BanknotesIcon} color="blue" />
        <MetricCard title="Properties" value={summary?.properties.value || '0'} change={summary?.properties.change || '+0'} icon={BuildingOffice2Icon} color="green" />
        <MetricCard title="Rubbies" value={summary?.rubbies.value || '0 R'} change={summary?.rubbies.change || '+0%'} icon={CubeIcon} color="purple" />
        <MetricCard title="Projects" value={summary?.projects.value || '0'} change={summary?.projects.change || '+0'} icon={RocketLaunchIcon} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-bold text-lg dark:text-dark-text-primary">Portfolio Performance</h3>
                <div className="h-80 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-brand-border)" className="dark:stroke-dark-border" />
                            <XAxis dataKey="name" stroke="var(--color-brand-text-secondary)" className="dark:stroke-dark-text-secondary" />
                            <YAxis stroke="var(--color-brand-text-secondary)" className="dark:stroke-dark-text-secondary" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ color: 'var(--color-brand-text-primary)' }} />
                            <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                 <h3 className="text-xl font-bold mb-4 dark:text-dark-text-primary">My Properties</h3>
                 <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
                    {userProperties.map(prop => (
                        <div key={prop.id} className="group relative flex-shrink-0 w-64 bg-brand-surface rounded-lg shadow-sm overflow-hidden border border-brand-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="overflow-hidden rounded-t-lg">
                                <img src={`https://picsum.photos/seed/${prop.propertyId}/400/200`} alt={prop.propertyName} className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"/>
                            </div>
                            <div className="p-4">
                                <p className="font-bold truncate text-brand-text-primary dark:text-dark-text-primary">{prop.propertyName}</p>
                                <p className="text-xs text-brand-text-secondary dark:text-dark-text-secondary">{prop.units} unit(s) - {prop.variantName}</p>
                                <p className="text-xs text-brand-text-secondary dark:text-dark-text-secondary">in {prop.estateId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                                <Button variant="secondary" className="!py-1 !px-3 text-xs mt-3 w-full">Manage Property</Button>
                            </div>
                        </div>
                    ))}
                    <div 
                        onClick={() => setActiveView(AppView.MARKETPLACE)}
                        className="flex-shrink-0 w-64 bg-brand-surface dark:bg-dark-surface rounded-lg border-2 border-dashed border-brand-border dark:border-dark-border flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                            <BuildingOffice2Icon className="h-10 w-10 text-brand-text-secondary dark:text-dark-text-secondary mb-2"/>
                            <p className="font-semibold text-sm text-brand-text-primary dark:text-dark-text-primary">Acquire New Property</p>
                            <p className="text-xs text-brand-text-secondary dark:text-dark-text-secondary">Visit the Marketplace</p>
                    </div>
                </div>
            </Card>
            <OtherHoldingsPanel holdings={otherHoldings} onEditHolding={setEditingHolding} />
            <div>
                 <h3 className="text-xl font-bold mb-4 dark:text-dark-text-primary">Global Timeline</h3>
                 {globalPosts.map(post => <PostCard key={post.id} post={post} isSubscribed={true} />)}
            </div>
        </div>
        
        <div className="space-y-6">
            <PortfolioOverview portfolios={hubPortfolios} otherHoldings={otherHoldings} />
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-bold text-lg mb-4 flex items-center dark:text-dark-text-primary">
                    <CakeIcon className="h-6 w-6 mr-2 text-pink-500" />
                    Upcoming Birthdays
                </h3>
                <ul className="space-y-3">
                    {birthdays.map(b => (
                        <li key={b.name} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img src={b.avatar} alt={b.name} className="h-10 w-10 rounded-full mr-3"/>
                                <div>
                                    <p className="font-semibold text-sm dark:text-dark-text-primary">{b.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{b.date}</p>
                                </div>
                            </div>
                            <Button variant="secondary" className="!py-1 !px-2 text-xs">Say Hi</Button>
                        </li>
                    ))}
                </ul>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h3 className="font-bold text-lg mb-4 dark:text-dark-text-primary">Quick Actions</h3>
              <div className="space-y-3">
                <Button onClick={() => setActiveView(AppView.WALLETS)} className="w-full justify-center">Fund Wallet</Button>
                <Button onClick={() => showToast('Statement request feature is temporarily unavailable.', 'info')} variant="secondary" className="w-full justify-center"><DocumentChartBarIcon className="h-5 w-5 mr-2"/>Request Statement</Button>
                <Button onClick={() => setActiveView(AppView.COMMUNITY)} variant="secondary" className="w-full justify-center">View Community</Button>
              </div>
            </Card>
            <AdSection ad={mockGlobalAd} />
        </div>
      </div>
    </div>
    </>
  );
};