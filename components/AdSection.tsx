import React from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { GlobalAd } from '../types';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface AdSectionProps {
    ad: GlobalAd;
}

export const AdSection: React.FC<AdSectionProps> = ({ ad }) => {
    return (
        <Card className="border-l-4 border-brand-accent dark:border-dark-accent">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/3 flex-shrink-0">
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 sm:h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg text-brand-text-primary dark:text-dark-text-primary">{ad.title}</h4>
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full flex-shrink-0">Sponsored</span>
                    </div>
                    <p className="text-sm text-brand-text-secondary dark:text-dark-text-secondary mt-2 mb-4">{ad.content}</p>
                    <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="w-full sm:w-auto">
                            Learn More
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                        </Button>
                    </a>
                </div>
            </div>
        </Card>
    );
};
