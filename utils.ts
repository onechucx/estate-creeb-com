// Helper function to generate a date in the past
export const pastDate = (days: number): string => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

// Helper function to generate a date in the future
export const futureDate = (days: number): string => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();


// Card generation helpers
export const generateCardNumber = (): string => `4${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
export const generateCVV = (): string => `${Math.floor(100 + Math.random() * 900)}`;
export const generateExpiry = (): string => {
    const month = String(Math.floor(1 + Math.random() * 12)).padStart(2, '0');
    const year = new Date().getFullYear() + Math.floor(3 + Math.random() * 3);
    return `${month}/${String(year).slice(2)}`;
};

export const generateMembershipNumber = (format: string | undefined, joinDateStr: string, index: number): string => {
    const defaultPrefix = '25-09';
    const number = (index + 1).toString().padStart(4, '0');
    
    if (!format) {
        return `${defaultPrefix}-${number}`;
    }

    const joinDate = new Date(joinDateStr);
    const year = joinDate.getFullYear().toString().slice(-2);
    const month = (joinDate.getMonth() + 1).toString().padStart(2, '0');
    
    return format
        .replace('YY', year)
        .replace('MM', month)
        .replace('NNNN', number);
};
