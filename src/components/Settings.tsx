import { Key, Zap, RefreshCw, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [geminiKeys, setGeminiKeys] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Settings & Credits</h1>
        <p className="text-slate-500 mt-1">Manage API keys, usage limits, and preferences.</p>
      </div>

      {/* API Usage */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Zap size={20} className="text-amber-500" />
            API Usage Today
          </h2>
          <button className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
            <RefreshCw size={14} /> Reset
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Used</p>
            <p className="text-2xl font-bold text-slate-800">782</p>
            <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Remaining</p>
            <p className="text-2xl font-bold text-emerald-600">218</p>
            <p className="text-xs text-slate-400 mt-2">of 1,000 daily limit</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Status</p>
            <div className="flex items-center gap-2 mt-1">
              <AlertTriangle size={16} className="text-amber-500" />
              <p className="text-sm font-medium text-amber-600">78% Used</p>
            </div>
            <p className="text-xs text-slate-400 mt-2">Resets at midnight UTC</p>
          </div>
        </div>
      </div>

      {/* Gemini API Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
          <Key size={20} className="text-brand-500" />
          Text / Vision API Settings (Gemini)
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">API Keys</label>
            <textarea
              value={geminiKeys}
              onChange={(e) => setGeminiKeys(e.target.value)}
              placeholder="Paste your Gemini API key(s) here, one per line..."
              className="w-full h-28 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">Multiple keys are rotated automatically for higher rate limits.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="auto">Auto (Recommended)</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
            </select>
          </div>
        </div>
      </div>

      {/* OpenAI Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
          <Key size={20} className="text-emerald-500" />
          OpenAI Settings (Image Generation)
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">API Key</label>
            <input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Model</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option>DALL-E 3</option>
                <option>DALL-E 2</option>
                <option>GPT-4o (Image)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Quality</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option>Standard</option>
                <option>HD</option>
              </select>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
            <Shield size={16} className="text-blue-500 mt-0.5" />
            <p className="text-xs text-blue-700">Estimated cost: ~$0.04 per image (Standard) or ~$0.08 (HD). Keys are stored securely in your Google account.</p>
          </div>
        </div>
      </div>

      {/* Etsy Connection */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
          <Shield size={20} className="text-orange-500" />
          Etsy Connection
        </h2>
        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-emerald-500" />
            <div>
              <p className="text-sm font-medium text-emerald-800">Connected to Stylinsoul Shop</p>
              <p className="text-xs text-emerald-600">OAuth token valid • Expires in 29 days</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors">
            Reconnect
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {saved ? (
            <>
              <CheckCircle size={16} /> Saved!
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </div>
  );
}
