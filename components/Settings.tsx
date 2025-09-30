import React, { useState } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { AppSettings, Theme, FontSize, UserPrivacySettings } from '../types';
import { SunIcon, MoonIcon, PaintBrushIcon, LanguageIcon, BellAlertIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface SettingsProps {
    settings: AppSettings;
    setSettings: (settings: AppSettings) => void;
}

const NotificationToggle: React.FC<{ label: string, description: string, enabled: boolean, onToggle: () => void; }> = ({ label, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="font-semibold dark:text-dark-text-primary">{label}</p>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{description}</p>
        </div>
        <button onClick={onToggle} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${enabled ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${enabled ? 'translate-x-6' : ''}`}/>
        </button>
    </div>
);

export const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
    
    const [privacySettings, setPrivacySettings] = useState<UserPrivacySettings>({
        isPhoneNumberPublic: false,
        isAddressPublic: false,
        isBirthYearPublic: true,
        messagePrivacy: 'members_only',
    });

    const [notificationSettings, setNotificationSettings] = useState({
        inApp: true,
        email: true,
        community: true,
        project: true,
        wallet: false,
    });

    const handleThemeChange = (theme: Theme) => {
        setSettings({ ...settings, theme });
    };

    const handleFontSizeChange = (size: FontSize) => {
        setSettings({ ...settings, fontSize: size });
    };
    
    const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, fontColor: e.target.value });
    };
    
    const handleResetFontColor = () => {
        const { fontColor, ...rest } = settings;
        setSettings(rest);
    };

    const themes = [
        { name: 'light', displayName: 'Default Light', isDark: false, colors: ['#1E3A8A', '#3B82F6', '#10B981'] },
        { name: 'coconut', displayName: 'Coconut', isDark: false, colors: ['#8B5E3C', '#D2B48C', '#4F7942'] },
        { name: 'forest', displayName: 'Forest', isDark: false, colors: ['#2d6a4f', '#74c69d', '#d95f02'] },
        { name: 'sunset', displayName: 'Sunset', isDark: false, colors: ['#d90429', '#ff9e00', '#ffc300'] },
        { name: 'rose', displayName: 'Rose', isDark: false, colors: ['#be185d', '#f9a8d4', '#6ee7b7'] },
        { name: 'mint', displayName: 'Mint', isDark: false, colors: ['#059669', '#6ee7b7', '#fb923c'] },
        { name: 'dark', displayName: 'Default Dark', isDark: true, colors: ['#3B82F6', '#1E3A8A', '#10B981'] },
        { name: 'royal', displayName: 'Royal', isDark: true, colors: ['#f59e0b', '#fcd34d', '#a855f7'] },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold dark:text-dark-text-primary">Settings</h2>

            <Card>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <PaintBrushIcon className="h-6 w-6 mr-3 text-brand-primary"/>
                    Appearance
                </h3>
                
                <div className="space-y-6">
                    {/* Theme Setting */}
                    <div>
                        <p className="font-semibold mb-2">Theme</p>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-3">Choose how Creeb looks to you. Select a theme from the options below.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {themes.map(theme => (
                                <button 
                                    key={theme.name}
                                    onClick={() => handleThemeChange(theme.name as Theme)} 
                                    className={`p-4 border-2 rounded-lg text-left transition-all ${settings.theme === theme.name ? 'border-brand-primary ring-2 ring-brand-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'} ${theme.isDark ? 'bg-gray-800' : 'bg-brand-surface'}`}
                                >
                                    <p className={`font-bold ${theme.isDark ? 'text-white' : ''}`}>{theme.displayName}</p>
                                    <div className="flex space-x-2 h-8 mt-2">
                                        {theme.colors.map(color => <div key={color} className="w-1/3 rounded" style={{ backgroundColor: color }}></div>)}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Font Color */}
                    <div>
                        <p className="font-semibold mb-2">Dynamic Font Color</p>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-3">Override the primary text color for any theme.</p>
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-dark-surface/50 rounded-lg">
                            <div className="relative">
                                <input
                                    type="color"
                                    value={settings.fontColor || '#000000'}
                                    onChange={handleFontColorChange}
                                    className="w-10 h-10 p-0 border-none cursor-pointer bg-transparent"
                                    title="Select font color"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-lg" style={{ color: settings.fontColor }}>Live Preview Text</p>
                                <p className="text-sm" style={{ color: settings.fontColor }}>This is how the primary font color will look.</p>
                            </div>
                            <Button variant="secondary" onClick={handleResetFontColor}>Reset</Button>
                        </div>
                    </div>

                    {/* Font Size Setting */}
                    <div>
                        <p className="font-semibold mb-2">Font Size</p>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-3">Adjust the font size for better readability across the application.</p>
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                            <Button onClick={() => handleFontSizeChange('sm')} variant={settings.fontSize === 'sm' ? 'primary' : 'secondary'} className="w-full">Small</Button>
                            <Button onClick={() => handleFontSizeChange('base')} variant={settings.fontSize === 'base' ? 'primary' : 'secondary'} className="w-full">Medium</Button>
                            <Button onClick={() => handleFontSizeChange('lg')} variant={settings.fontSize === 'lg' ? 'primary' : 'secondary'} className="w-full">Large</Button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-bold mb-6 flex items-center"><BellAlertIcon className="h-6 w-6 mr-3 text-brand-primary" />Notification Settings</h3>
                <div className="space-y-6">
                   <NotificationToggle onToggle={() => setNotificationSettings(s => ({...s, inApp: !s.inApp}))} label="In-App Notifications" description="Receive notifications directly within the app." enabled={notificationSettings.inApp} />
                   <NotificationToggle onToggle={() => setNotificationSettings(s => ({...s, email: !s.email}))} label="Email Notifications" description="Receive important updates via email." enabled={notificationSettings.email} />
                   <NotificationToggle onToggle={() => setNotificationSettings(s => ({...s, community: !s.community}))} label="Community Updates" description="Notifications about new posts and comments in your community." enabled={notificationSettings.community} />
                   <NotificationToggle onToggle={() => setNotificationSettings(s => ({...s, project: !s.project}))} label="Project Milestones" description="Get notified about progress on projects you've invested in." enabled={notificationSettings.project} />
                   <NotificationToggle onToggle={() => setNotificationSettings(s => ({...s, wallet: !s.wallet}))} label="Wallet Transactions" description="Alerts for any activity in your wallets." enabled={notificationSettings.wallet} />
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-bold mb-6 flex items-center"><ShieldCheckIcon className="h-6 w-6 mr-3 text-brand-primary" />Privacy Settings</h3>
                <p className="text-sm text-brand-text-secondary dark:text-dark-text-secondary mb-6">These settings control what personal information other members in your communities and estates can see. Partners and Administrators can always view your full details for management purposes.</p>
                <div className="space-y-6">
                   <NotificationToggle 
                        label="Make Phone Number Public" 
                        description="Allow other regular members to see your phone number." 
                        enabled={privacySettings.isPhoneNumberPublic} 
                        onToggle={() => setPrivacySettings({ ...privacySettings, isPhoneNumberPublic: !privacySettings.isPhoneNumberPublic })}
                    />
                   <NotificationToggle 
                        label="Make Address Public" 
                        description="Allow other regular members to see your physical address." 
                        enabled={privacySettings.isAddressPublic}
                        onToggle={() => setPrivacySettings({ ...privacySettings, isAddressPublic: !privacySettings.isAddressPublic })}
                    />
                   <NotificationToggle 
                        label="Make Birth Year Public" 
                        description="Allow other regular members to see your year of birth." 
                        enabled={privacySettings.isBirthYearPublic}
                        onToggle={() => setPrivacySettings({ ...privacySettings, isBirthYearPublic: !privacySettings.isBirthYearPublic })}
                    />
                    <div>
                        <p className="font-semibold mb-2">Messaging Privacy</p>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-3">Control who is allowed to send you direct messages.</p>
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                            <Button onClick={() => setPrivacySettings({ ...privacySettings, messagePrivacy: 'anyone' })} variant={privacySettings.messagePrivacy === 'anyone' ? 'primary' : 'secondary'} className="w-full">Anyone</Button>
                            <Button onClick={() => setPrivacySettings({ ...privacySettings, messagePrivacy: 'members_only' })} variant={privacySettings.messagePrivacy === 'members_only' ? 'primary' : 'secondary'} className="w-full">Members Only</Button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <LanguageIcon className="h-6 w-6 mr-3 text-brand-primary"/>
                    Language & Region
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Language</label>
                        <select className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">
                            <option>English (United States)</option>
                            <option>English (United Kingdom)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Time Zone</label>
                        <select className="w-full p-2 border rounded-md dark:bg-dark-surface dark:border-dark-border">
                            <option>(GMT+01:00) West Africa Time</option>
                            <option>(GMT+00:00) Greenwich Mean Time</option>
                        </select>
                    </div>
                </div>
            </Card>
        </div>
    );
};