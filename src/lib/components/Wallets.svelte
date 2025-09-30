<script lang="ts">
    import Card from '$lib/components/common/Card.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import { ArrowDownIcon as ArrowDown, ArrowUpIcon as ArrowUp, ArrowsRightLeftIcon as ArrowsRightLeft, PlusIcon as Plus } from 'heroicons-svelte/24/outline';
    import type { Wallet, Transaction } from '$lib/types';

    let wallets: Wallet[] = [
        {
            id: 'wallet1',
            currency: 'Naira',
            symbol: 'NGN',
            balance: 1250000.5,
            history: [
                { date: 'Jan', value: 500000 },
                { date: 'Feb', value: 750000 },
                { date: 'Mar', value: 650000 },
                { date: 'Apr', value: 850000 },
                { date: 'May', value: 1100000 },
                { date: 'Jun', value: 1250000 }
            ]
        },
        {
            id: 'wallet2',
            currency: 'Rubby',
            symbol: 'RBY',
            balance: 50000,
            history: [
                { date: 'Jan', value: 10000 },
                { date: 'Feb', value: 15000 },
                { date: 'Mar', value: 25000 },
                { date: 'Apr', value: 20000 },
                { date: 'May', value: 40000 },
                { date: 'Jun', value: 50000 }
            ]
        }
    ];

    let transactions: Transaction[] = [
        {
            id: 'txn1',
            type: 'deposit',
            status: 'completed',
            amount: 50000,
            currency: 'NGN',
            date: new Date('2023-10-26T10:00:00Z'),
            description: 'Bank Deposit'
        },
        {
            id: 'txn2',
            type: 'withdrawal',
            status: 'completed',
            amount: 25000,
            currency: 'NGN',
            date: new Date('2023-10-25T15:30:00Z'),
            description: 'Withdrawal to GTBank'
        },
        {
            id: 'txn3',
            type: 'transfer',
            status: 'pending',
            amount: 1000,
            currency: 'RBY',
            date: new Date('2023-10-24T12:00:00Z'),
            description: 'Transfer to @jemima'
        },
        {
            id: 'txn4',
            type: 'investment',
            status: 'completed',
            amount: 100000,
            currency: 'NGN',
            date: new Date('2023-10-22T09:00:00Z'),
            description: 'Investment in "Lekki Gardens"'
        }
    ];

    let selectedWallet = wallets[0];

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'deposit':
                return { icon: ArrowDown, class: 'text-green-500' };
            case 'withdrawal':
                return { icon: ArrowUp, class: 'text-red-500' };
            case 'transfer':
                return { icon: ArrowsRightLeft, class: 'text-blue-500' };
            default:
                return { icon: Plus, class: 'text-gray-500' };
        }
    };
</script>

<div class="p-4 sm:p-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 class="text-2xl font-bold text-brand-text-primary mb-4 sm:mb-0">Wallets</h1>
        <div class="flex items-center space-x-2">
            <Button type="button" variant="secondary" aria-label="Deposit funds">
                <ArrowDown class="w-5 h-5 mr-2" aria-hidden="true" focusable="false" />
                Deposit
            </Button>
            <Button type="button" variant="secondary" aria-label="Withdraw funds">
                <ArrowUp class="w-5 h-5 mr-2" aria-hidden="true" focusable="false" />
                Withdraw
            </Button>
            <Button type="button" aria-label="Send funds">
                <ArrowsRightLeft class="w-5 h-5 mr-2" aria-hidden="true" focusable="false" />
                Send
            </Button>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
            <Card aria-label="Wallet balance card">
                <div class="p-4">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <p class="text-sm text-brand-text-secondary">{selectedWallet.currency} Balance</p>
                            <p class="text-3xl font-bold text-brand-text-primary">
                                {selectedWallet.symbol}{selectedWallet.balance.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </p>
                        </div>
                        <div class="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1" role="tablist" aria-label="Wallet selector">
                            {#each wallets as wallet}
                                                            <Button
                                                                type="button"
                                                                on:click={() => (selectedWallet = wallet)}
                                                                on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectedWallet = wallet } }}
                                                                aria-pressed={selectedWallet.id === wallet.id}
                                                                aria-label={`Select ${wallet.currency} wallet`}
                                                                class="!text-xs !py-1 !px-3 {selectedWallet.id === wallet.id
                                                                        ? 'bg-brand-surface dark:bg-dark-surface shadow'
                                                                        : 'bg-transparent border-transparent'}"
                                                            >
                                                                {wallet.currency}
                                                            </Button>
                            {/each}
                        </div>
                    </div>
                    <div class="h-64">
                        <!-- Chart placeholder: Recharts isn't available by default in Svelte; keep placeholder -->
                        <div class="h-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-lg"></div>
                    </div>
                </div>
            </Card>
        </div>

        <div class="space-y-6">
            <Card>
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-4 text-brand-text-primary">Quick Actions</h3>
                    <div class="space-y-3">
                        <Button type="button" aria-label="Fund wallet" class="w-full justify-center">Fund Wallet</Button>
                        <Button type="button" variant="secondary" aria-label="Buy Rubby" class="w-full justify-center">Buy Rubby</Button>
                        <Button type="button" variant="secondary" aria-label="Sell Rubby" class="w-full justify-center">Sell Rubby</Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>

    <div class="mt-6">
        <Card aria-label="Transaction history">
            <div class="p-4">
                <h3 class="font-bold text-lg mb-4 text-brand-text-primary">Transaction History</h3>
            </div>
            <div class="overflow-x-auto" role="region" aria-label="Transaction history table">
                <table class="w-full text-left" aria-describedby="transaction-help">
                    <thead class="border-b border-brand-border dark:border-dark-border">
                        <tr class="text-sm text-brand-text-secondary">
                            <th scope="col" class="p-4 font-medium">Transaction</th>
                            <th scope="col" class="p-4 font-medium hidden md:table-cell">Date</th>
                            <th scope="col" class="p-4 font-medium hidden sm:table-cell">Amount</th>
                            <th scope="col" class="p-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-brand-border dark:divide-dark-border">
                        {#each transactions as tx (tx.id)}
                            <tr class="text-brand-text-primary">
                                <td class="p-4">
                                    <div class="flex items-center">
                                        <div
                                            class="w-8 h-8 rounded-full flex items-center justify-center mr-3 {getTransactionIcon(
                                                tx.type
                                            ).class.replace('text-', 'bg-') + '/20'}"
                                        >
                                            <svelte:component
                                                this={getTransactionIcon(tx.type).icon}
                                                class="w-5 h-5 {getTransactionIcon(tx.type).class}"
                                            />
                                        </div>
                                        <div>
                                            <p class="font-semibold capitalize">{tx.type}</p>
                                            <p class="text-sm text-brand-text-secondary">{tx.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="p-4 text-sm text-brand-text-secondary hidden md:table-cell">
                                    {new Intl.DateTimeFormat('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }).format(tx.date)}
                                </td>
                                <td class="p-4 font-semibold hidden sm:table-cell">
                                    {tx.currency === 'NGN' ? '₦' : ''}{tx.amount.toLocaleString()}{tx.currency !==
                                    'NGN'
                                        ? ` ${tx.currency}`
                                        : ''}
                                </td>
                                <td class="p-4">
                                    <span
                                        class="text-xs font-medium px-2 py-1 rounded-full capitalize {getStatusClass(
                                            tx.status
                                        )}"
                                    >
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
</div>
