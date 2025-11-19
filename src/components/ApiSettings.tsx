import { useState } from 'react';
import { Key, CheckCircle, XCircle, Info } from 'lucide-react';
import { getApiStatus, updateApiConfig } from '../services/sportsApi';

export function ApiSettings() {
  const [apiKeys, setApiKeys] = useState({
    football: '',
    odds: '',
    sportsData: '',
  });

  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = (service: 'football' | 'odds' | 'sportsData') => {
    updateApiConfig(service, apiKeys[service]);
    setSaved(service);
    setTimeout(() => setSaved(null), 3000);
  };

  const apiStatus = getApiStatus();

  const apiConfigs = [
    {
      id: 'football' as const,
      name: 'API-Football',
      description: 'Live football scores, fixtures, and statistics',
      website: 'https://www.api-football.com/',
      freeLimit: '100 requests/day',
      instructions: [
        'Sign up at api-football.com',
        'Get your API key from dashboard',
        'Paste it below and save',
      ],
    },
    {
      id: 'odds' as const,
      name: 'The Odds API',
      description: 'Real-time betting odds from multiple bookmakers',
      website: 'https://the-odds-api.com/',
      freeLimit: '500 requests/month',
      instructions: [
        'Sign up at the-odds-api.com',
        'Copy your API key',
        'Enter it below',
      ],
    },
    {
      id: 'sportsData' as const,
      name: 'SportsData.io',
      description: 'Comprehensive sports data and statistics',
      website: 'https://sportsdata.io/',
      freeLimit: 'Trial available',
      instructions: [
        'Register at sportsdata.io',
        'Get API key from account',
        'Configure below',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-white mb-2">How to Configure Sports APIs</h3>
            <p className="text-sm text-blue-200">
              To enable real-time sports data, you need to sign up for free API keys from the providers below. 
              Without API keys, the system will use mock/demo data.
            </p>
          </div>
        </div>
      </div>

      {apiConfigs.map((config) => (
        <div
          key={config.id}
          className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl text-white">{config.name}</h3>
                {apiStatus[config.id] ? (
                  <span className="flex items-center space-x-1 px-2 py-1 bg-green-900 text-green-400 rounded text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 px-2 py-1 bg-red-900 text-red-400 rounded text-xs">
                    <XCircle className="w-3 h-3" />
                    <span>Inactive</span>
                  </span>
                )}
              </div>
              <p className="text-sm text-purple-300 mb-3">{config.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <a
                  href={config.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline"
                >
                  {config.website}
                </a>
                <span className="text-purple-400">• {config.freeLimit}</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4 mb-4">
            <div className="text-sm text-purple-200 mb-2">Setup Instructions:</div>
            <ol className="list-decimal list-inside space-y-1 text-sm text-purple-300">
              {config.instructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div className="space-y-2">
            <label className="text-purple-200 text-sm flex items-center space-x-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>API Key</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={apiKeys[config.id]}
                onChange={(e) =>
                  setApiKeys({ ...apiKeys, [config.id]: e.target.value })
                }
                className="flex-1 bg-black/50 border-2 border-purple-700 rounded-lg px-4 py-3 text-white placeholder-purple-500 focus:border-amber-500 focus:outline-none"
                placeholder="Enter your API key"
              />
              <button
                onClick={() => handleSave(config.id)}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black transition-all"
              >
                {saved === config.id ? (
                  <span className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Saved!</span>
                  </span>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-amber-900/30 border border-amber-700 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-white mb-2">Important Notes</h3>
            <ul className="text-sm text-amber-200 space-y-1 list-disc list-inside">
              <li>API keys are stored in browser memory only (not saved to database in demo)</li>
              <li>Free tier limits apply - monitor your usage to avoid rate limits</li>
              <li>Without API keys, the site will use mock/demo data</li>
              <li>For production use, implement secure backend storage for API keys</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
