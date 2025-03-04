import React, { useState } from 'react';
import { Wallet, CreditCard, PieChart, TrendingUp, DollarSign, Building, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Account {
  id: string;
  type: 'checking' | 'savings' | 'investment' | 'credit';
  name: string;
  balance: number;
  institution: string;
  lastUpdated: string;
  accountNumber: string;
  transactions?: Transaction[];
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface Asset {
  id: string;
  name: string;
  value: number;
  type: string;
  growth: number;
  lastUpdated: string;
}

interface CreditScore {
  score: number;
  change: number;
  factors: {
    positive: string[];
    negative: string[];
  };
  history: {
    date: string;
    score: number;
  }[];
}

const FinanceDashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      type: 'checking',
      name: 'Primary Checking',
      balance: 5234.56,
      institution: 'Chase Bank',
      lastUpdated: '2024-03-15T10:30:00Z',
      accountNumber: '****1234'
    },
    {
      id: '2',
      type: 'savings',
      name: 'Emergency Fund',
      balance: 15000.00,
      institution: 'Ally Bank',
      lastUpdated: '2024-03-15T10:30:00Z',
      accountNumber: '****5678'
    },
    {
      id: '3',
      type: 'investment',
      name: '401(k)',
      balance: 85750.23,
      institution: 'Fidelity',
      lastUpdated: '2024-03-15T10:30:00Z',
      accountNumber: '****9012'
    }
  ]);

  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Stock Portfolio',
      value: 50000,
      type: 'investment',
      growth: 12.5,
      lastUpdated: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Real Estate',
      value: 350000,
      type: 'property',
      growth: 5.2,
      lastUpdated: '2024-03-15T10:30:00Z'
    }
  ]);

  const [creditScore, setCreditScore] = useState<CreditScore>({
    score: 745,
    change: 15,
    factors: {
      positive: [
        'Long credit history',
        'On-time payments',
        'Low credit utilization'
      ],
      negative: [
        'High number of credit inquiries'
      ]
    },
    history: [
      { date: '2024-02', score: 730 },
      { date: '2024-03', score: 745 }
    ]
  });

  const [aiSuggestions, setAiSuggestions] = useState([
    {
      id: '1',
      type: 'savings',
      title: 'Increase Emergency Fund',
      description: 'Based on your monthly expenses, consider increasing your emergency fund by $5,000',
      impact: 'High',
      timeframe: '6 months',
      steps: [
        'Set up automatic transfer of $200/week',
        'Reduce discretionary spending by 15%',
        'Allocate 50% of bonuses to savings'
      ]
    }
  ]);

  const calculateNetWorth = () => {
    const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalAccounts = accounts.reduce((sum, account) => sum + account.balance, 0);
    return totalAssets + totalAccounts;
  };

  const handleConnectAccount = () => {
    // In a real implementation, this would open a Plaid or similar integration
    console.log('Connecting new account...');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Overview Cards */}
      <div className="lg:col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium">Net Worth</h3>
            </div>
            <p className="text-2xl font-bold">
              ${calculateNetWorth().toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mt-2 text-green-500">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm">+8.5% this month</span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-indigo-500" />
              <h3 className="font-medium">Total Assets</h3>
            </div>
            <p className="text-2xl font-bold">
              ${assets.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mt-2 text-green-500">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm">+5.2% this month</span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium">Credit Score</h3>
            </div>
            <p className="text-2xl font-bold">{creditScore.score}</p>
            <div className="flex items-center gap-2 mt-2 text-green-500">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm">+{creditScore.change} points</span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-5 h-5 text-green-500" />
              <h3 className="font-medium">Savings Rate</h3>
            </div>
            <p className="text-2xl font-bold">23.5%</p>
            <div className="flex items-center gap-2 mt-2 text-green-500">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm">+2.1% this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts and Assets */}
      <div className="lg:col-span-8 space-y-6">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Connected Accounts</h3>
            <button
              onClick={handleConnectAccount}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
            >
              Connect Account
            </button>
          </div>

          <div className="space-y-4">
            {accounts.map(account => (
              <div
                key={account.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{account.name}</h4>
                    <p className="text-sm text-gray-500">
                      {account.institution} • {account.accountNumber}
                    </p>
                  </div>
                  <p className="text-lg font-bold">
                    ${account.balance.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>
                    Last updated: {new Date(account.lastUpdated).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Assets</h3>
          <div className="space-y-4">
            {assets.map(asset => (
              <div
                key={asset.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{asset.name}</h4>
                    <p className="text-sm text-gray-500">{asset.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${asset.value.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-green-500">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="text-sm">+{asset.growth}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions and Credit Score */}
      <div className="lg:col-span-4 space-y-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Financial Insights</h3>
          <div className="space-y-4">
            {aiSuggestions.map(suggestion => (
              <div
                key={suggestion.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <h4 className="font-medium">{suggestion.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {suggestion.description}
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Impact: {suggestion.impact}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{suggestion.timeframe}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {suggestion.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Credit Score Factors</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-green-600 mb-2">
                Positive Factors
              </h4>
              <div className="space-y-2">
                {creditScore.factors.positive.map((factor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-red-600 mb-2">
                Areas for Improvement
              </h4>
              <div className="space-y-2">
                {creditScore.factors.negative.map((factor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;