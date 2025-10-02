import { DashboardSummary, PortfolioPerformanceDataPoint, HubPortfolio, OtherHolding, Post, Birthday, PropertyHolding } from './types';

const API_BASE_URL = '/api/v1'; // This will be proxied to your Laravel backend

/**
 * A generic fetch wrapper to handle API requests and errors.
 * @param endpoint The API endpoint to call (e.g., '/dashboard/summary').
 * @param options Optional fetch options (method, body, etc.).
 * @returns A promise that resolves with the JSON response.
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        // In a real app, you'd add authorization headers here.
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        // Handle responses that might not have a body (e.g., DELETE).
        if (response.status === 204 || response.headers.get('Content-Length') === '0') {
            return {} as T;
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`API fetch error for endpoint ${endpoint}:`, error);
        // Re-throw the error so component-level error handlers can catch it.
        throw error;
    }
}


// --- API Functions ---

// Dashboard
export const getDashboardSummary = () => apiFetch<DashboardSummary>('/dashboard/summary');
export const getPortfolioPerformance = () => apiFetch<PortfolioPerformanceDataPoint[]>('/dashboard/performance');
export const getPortfolioOverview = () => apiFetch<HubPortfolio[]>('/dashboard/portfolio-overview');
export const getGlobalTimeline = () => apiFetch<Post[]>('/dashboard/global-timeline');
export const getUpcomingBirthdays = () => apiFetch<Birthday[]>('/dashboard/birthdays');

// Portfolio
export const getUserProperties = () => apiFetch<PropertyHolding[]>('/portfolio/properties');
export const getOtherHoldings = () => apiFetch<OtherHolding[]>('/portfolio/other-holdings');

/**
 * Saves an "Other Holding". Performs a POST for new holdings and a PUT for existing ones.
 * @param holding The holding data to save.
 */
export const saveOtherHolding = (holding: Omit<OtherHolding, 'id'> | OtherHolding) => {
    if ('id' in holding) {
        // This is an existing holding, so we use PUT to update.
        return apiFetch<OtherHolding>(`/portfolio/other-holdings/${holding.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(holding),
        });
    }
    // This is a new holding, so we use POST to create.
    return apiFetch<OtherHolding>('/portfolio/other-holdings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(holding),
    });
};

/**
 * Deletes an "Other Holding" by its ID.
 * @param id The ID of the holding to delete.
 */
export const deleteOtherHolding = (id: string) => {
    return apiFetch<{}>(`/portfolio/other-holdings/${id}`, {
        method: 'DELETE',
    });
};
