import React, { useState, useMemo, useEffect } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { PostCard } from './Community';
import { Post, PropertyHolding, GlobalAd, OtherHolding } from '../types';
import { ArrowUpRightIcon, BanknotesIcon, BuildingOffice2Icon, CubeIcon, RocketLaunchIcon, CakeIcon, DocumentChartBarIcon, XMarkIcon, PlusIcon, PhotoIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { AppView } from '../types';
import { AdSection } from './AdSection';
import { dashboardChartData, mockGlobalPosts, upcomingBirthdays, mockStatementData, mockUserProperties, mockGlobalAd, mockOtherHoldings as mockOtherHoldingsData } from '../data';


interface DashboardProps {
  setActiveView: (view: AppView) => void;
}

const StatementRequestModal: React.FC<{ onClose: () => void, data: typeof mockStatementData }> = ({ onClose, data }) => {
    const [options, setOptions] = useState({ loans: true, projects: true, savings: true, formalInvoices: false });
    const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, [e.target.name]: e.target.checked });

    const generateStatementHtml = () => {
        const theme = document.documentElement.className;

        const communitySection = `
            <div class="mb-8 p-4 border rounded dark:border-dark-border bg-brand-surface dark:bg-dark-surface">
                <div class="flex items-center mb-4"><img src="${data.community.logo}" alt="Community Logo" class="h-12 w-12 rounded-full mr-4"/><div><h3 class="text-xl font-bold">${data.community.name}</h3><p class="text-xs text-gray-500">${data.community.address}</p></div></div>
                ${options.loans ? `<h4 class="font-bold mb-2">Loan Summary</h4><table class="min-w-full text-sm mb-4"><tbody>${data.community.loans.map(l => `<tr class="border-t dark:border-dark-border"><td class="p-2">${l.type}</td><td class="p-2">₦${l.amount.toLocaleString()}</td><td class="p-2">${l.interest}% Interest</td><td class="p-2">Due: ${l.maturity}</td></tr>`).join('')}</tbody></table>` : ''}
                ${options.projects ? `<h4 class="font-bold mb-2">Project Summary</h4><table class="min-w-full text-sm mb-4"><tbody>${data.community.projects.map(p => `<tr class="border-t dark:border-dark-border"><td class="p-2">${p.name}</td><td class="p-2">Contribution: ₦${p.contribution.toLocaleString()}</td><td class="p-2">${p.status}</td></tr>`).join('')}</tbody></table>` : ''}
                ${options.savings ? `<h4 class="font-bold mb-2">Savings Summary</h4><table class="min-w-full text-sm"><tbody>${data.community.savings.map(s => `<tr class="border-t dark:border-dark-border"><td class="p-2">${s.productName}</td><td class="p-2">Principal: ₦${s.principal.toLocaleString()}</td><td class="p-2">${s.interestRate}% Interest</td><td class="p-2">Matures: ${s.maturity}</td></tr>`).join('')}</tbody></table>` : ''}
            </div>
        `;
        
        const invoicesSection = (options.formalInvoices && data.invoices) ? `
            <div class="mb-8 p-4 border rounded dark:border-dark-border bg-brand-surface dark:bg-dark-surface">
                <h3 class="text-xl font-bold mb-4">Formal Invoices</h3>
                <div class="space-y-4">${data.invoices.map(invoice => `<div class="p-3 border rounded dark:border-dark-border flex items-start justify-between"><div><p class="font-bold">${invoice.description}</p><p class="text-xs text-gray-500">ID: ${invoice.id} | Date: ${invoice.date}</p><p class="font-semibold text-brand-primary mt-1">₦${invoice.amount.toLocaleString()}</p></div><div class="text-right flex-shrink-0"><img src="${invoice.entity === 'community' ? data.community.logo : data.estate.logo}" alt="${invoice.entity} Logo" class="h-10 w-10 rounded-full ml-4" /><p class="text-xs text-gray-400 mt-1">${invoice.entity === 'community' ? data.community.name : data.estate.name}</p></div></div>`).join('')}</div>
            </div>` : '';

        return `
            <!DOCTYPE html><html lang="en" class="${theme}"><head><meta charset="UTF-8" /><title>Account Statement</title><script src="https://cdn.tailwindcss.com"></script>
            <style>
                html.light { --brand-primary: #1E3A8A; --brand-secondary: #3B82F6; --brand-accent: #10B981; --brand-background: #F9FAFB; --brand-surface: #FFFFFF; --brand-text-primary: #1F2937; --brand-text-secondary: #64748B; --brand-border: #E5E7EB; }
                html.ocean { --brand-primary: #006d77; --brand-secondary: #83c5be; --brand-accent: #ffddd2; --brand-background: #edf6f9; --brand-surface: #ffffff; --brand-text-primary: #2c3e50; --brand-text-secondary: #8e9aaf; --brand-border: #e0fbfc; }
                html.forest { --brand-primary: #2d6a4f; --brand-secondary: #74c69d; --brand-accent: #d95f02; --brand-background: #fdf0d5; --brand-surface: #f8f9fa; --brand-text-primary: #403d39; --brand-text-secondary: #7f7f7f; --brand-border: #d8f3dc; }
                html.sunset { --brand-primary: #d90429; --brand-secondary: #ff9e00; --brand-accent: #ffc300; --brand-background: #fff1e6; --brand-surface: #ffffff; --brand-text-primary: #212529; --brand-text-secondary: #6c757d; --brand-border: #fae0e4; }
                @media print { .no-print { display: none; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
            </style>
            <script>tailwind.config = { darkMode: 'class', theme: { extend: { colors: { 'brand-primary': 'var(--brand-primary)', 'brand-secondary': 'var(--brand-secondary)', 'brand-accent': 'var(--brand-accent)', 'brand-background': 'var(--brand-background)', 'brand-surface': 'var(--brand-surface)', 'brand-text-primary': 'var(--brand-text-primary)', 'brand-text-secondary': 'var(--brand-text-secondary)', 'brand-border': 'var(--brand-border)', dark: { primary: '#3B82F6', secondary: '#1E3A8A', accent: '#10B981', background: '#111827', surface: '#1F2937', 'text-primary': '#F9FAFB', 'text-secondary': '#94A3B8', border: '#374151' } }}},}</script></head>
            <body class="bg-brand-background dark:bg-dark-background text-brand-text-primary dark:text-dark-text-primary font-sans">
                <div class="max-w-4xl mx-auto my-8 p-8 bg-brand-surface dark:bg-dark-surface shadow-lg">
                    <header class="flex items-center justify-between mb-4 border-b pb-4 dark:border-dark-border"><div class="flex items-center"><svg class="h-8 w-8 text-brand-primary dark:text-dark-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg><h2 class="text-2xl font-bold ml-2">Account Statement</h2></div><div class="text-right"><p class="font-bold">John Doe</p><p class="text-xs text-gray-500">For period: ${startDate} to ${endDate}</p></div></header>
                    <main>${communitySection}${invoicesSection}</main>
                    <footer class="text-center text-xs text-gray-500 pt-6 border-t dark:border-dark-border mt-8"><p>This statement was generated electronically from the Creeb platform.</p><p>Powered by Creeb.vip</p></footer>
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

    const simplifiedOptions = { loans: options.loans, projects: options.projects, savings: options.savings, formalInvoices: options.formalInvoices };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold dark:text-dark-text-primary">Generate Statement of Account</h2><button onClick={onClose}><XMarkIcon className="h-6 w-6"/></button></div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="date" title="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" /><input type="date" title="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded dark:bg-dark-surface dark:border-dark-border" /></div>
                    <fieldset className="space-y-2 border p-3 rounded dark:border-dark-border"><legend className="text-sm font-semibold px-2">Include in statement:</legend>{Object.entries(simplifiedOptions).map(([key, value]) => (<label key={key} className="flex items-center"><input type="checkbox" name={key} checked={value} onChange={handleCheckboxChange} className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary" /><span className="ml-2 text-sm dark:text-dark-text-secondary">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span></label>))}</fieldset>
                    <Button onClick={handleGenerate} className="w-full">Generate Statement</Button>
                </div>
            </Card>
        </div>
    );
};


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

// FIX: The `TooltipProps` type from recharts is not suitable for custom tooltip components.
// It lacks `payload` and `label` properties. Replaced with an inline type that correctly defines the expected props.
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

interface HubPortfolio {
    hubId: string;
    hubName: string;
    hubType: 'Community' | 'Estate';
    assets: {
        rubbies: number;
        properties: number;
        projects: number;
        loans: number;
        savings: number;
    };
}

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
    onSave: (holding: OtherHolding) => void;
    onDelete?: (id: string) => void;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: isNew ? `oh-${Date.now()}` : (holding as OtherHolding).id,
            ...formData,
            value: Number(formData.value) || 0,
        });
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
                    {!isNew && onDelete && <Button variant="danger" onClick={() => onDelete((holding as OtherHolding).id)}>Delete Holding</Button>}
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

export const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
    const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
    const [otherHoldings, setOtherHoldings] = useState<OtherHolding[]>(mockOtherHoldingsData);
    const [editingHolding, setEditingHolding] = useState<OtherHolding | 'new' | null>(null);

    const userHubPortfolios: HubPortfolio[] = [
        {
            hubId: 'demo_community',
            hubName: 'Demo Community',
            hubType: 'Community',
            assets: {
                rubbies: 60000,
                properties: 15000000,
                projects: 1000000,
                loans: 50000,
                savings: 150000,
            }
        },
        {
            hubId: 'prime_estate',
            hubName: 'Prime Gardens Estate',
            hubType: 'Estate',
            assets: {
                rubbies: 0,
                properties: 85000000,
                projects: 0,
                loans: 0,
                savings: 250000,
            }
        }
    ];

    const handleSaveHolding = (holding: OtherHolding) => {
        setOtherHoldings(prev => {
            const exists = prev.some(h => h.id === holding.id);
            if (exists) {
                return prev.map(h => h.id === holding.id ? holding : h);
            }
            return [holding, ...prev];
        });
    };
    
    const handleDeleteHolding = (id: string) => {
        if (window.confirm('Are you sure you want to delete this holding?')) {
            setOtherHoldings(prev => prev.filter(h => h.id !== id));
            setEditingHolding(null);
        }
    };

  return (
    <>
    {isStatementModalOpen && <StatementRequestModal onClose={() => setIsStatementModalOpen(false)} data={mockStatementData} />}
    {editingHolding && <HoldingDetailModal holding={editingHolding} onClose={() => setEditingHolding(null)} onSave={handleSaveHolding} onDelete={handleDeleteHolding} />}

    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold dark:text-dark-text-primary">Welcome Back, John!</h2>
        <p className="text-brand-text-secondary dark:text-dark-text-secondary mt-1">Here's a summary of your community activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Loans" value="$12,500" change="+5.2%" icon={BanknotesIcon} color="blue" />
        <MetricCard title="Properties" value={`${mockUserProperties.length} Holdings`} change="+1" icon={BuildingOffice2Icon} color="green" />
        <MetricCard title="Rubbies" value="1,200 R" change="+10%" icon={CubeIcon} color="purple" />
        <MetricCard title="Projects" value="5 Active" change="+2" icon={RocketLaunchIcon} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-bold text-lg dark:text-dark-text-primary">Portfolio Performance</h3>
                <div className="h-80 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dashboardChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
                    {mockUserProperties.map(prop => (
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
                 {mockGlobalPosts.map(post => <PostCard key={post.id} post={post} isSubscribed={true} />)}
            </div>
        </div>
        
        <div className="space-y-6">
            <PortfolioOverview portfolios={userHubPortfolios} otherHoldings={otherHoldings} />
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="font-bold text-lg mb-4 flex items-center dark:text-dark-text-primary">
                    <CakeIcon className="h-6 w-6 mr-2 text-pink-500" />
                    Upcoming Birthdays
                </h3>
                <ul className="space-y-3">
                    {upcomingBirthdays.map(b => (
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
                <Button onClick={() => setIsStatementModalOpen(true)} variant="secondary" className="w-full justify-center"><DocumentChartBarIcon className="h-5 w-5 mr-2"/>Request Statement</Button>
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