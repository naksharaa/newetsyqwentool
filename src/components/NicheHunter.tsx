import { Search, TrendingUp, Sparkles, Target, ArrowRight, BarChart3 } from 'lucide-react';
import { useState } from 'react';

const nicheResults = [
  { keyword: 'rustic farmhouse kitchen sign', competition: 32, demand: 87, opportunity: 91, trend: 'up' },
  { keyword: 'personalized metal house number', competition: 28, demand: 74, opportunity: 88, trend: 'up' },
  { keyword: 'custom family name wall art', competition: 45, demand: 92, opportunity: 79, trend: 'stable' },
  { keyword: 'vintage barn wood metal sign', competition: 18, demand: 65, opportunity: 94, trend: 'up' },
  { keyword: 'modern minimalist address plaque', competition: 22, demand: 71, opportunity: 86, trend: 'up' },
  { keyword: 'lake house personalized decor', competition: 15, demand: 58, opportunity: 92, trend: 'stable' },
];

const vaultKeywords = [
  { keyword: 'metal yard art', searches: 2400, trend: 15 },
  { keyword: 'custom pet sign', searches: 1800, trend: 22 },
  { keyword: 'farmhouse welcome sign', searches: 3200, trend: 8 },
  { keyword: 'personalized gift for mom', searches: 5100, trend: -3 },
];

export default function NicheHunter() {
  const [seedCategory, setSeedCategory] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Search size={24} className="text-brand-500" />
          Infinite Niche Hunter
        </h1>
        <p className="text-slate-500 mt-1">AI-powered niche discovery for your Etsy shop.</p>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Seed Category</label>
            <input
              type="text"
              value={seedCategory}
              onChange={(e) => setSeedCategory(e.target.value)}
              placeholder="e.g., metal signs, wall art, personalized gifts..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-end">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 disabled:bg-brand-300 disabled:active:scale-100 text-white font-medium rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Find Niches
              </>
            )}
          </button>          </div>
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-fade-in">
          {/* Opportunity Board */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Target size={18} className="text-brand-500" />
                Niche Opportunities
              </h2>
              <span className="text-xs text-slate-400">Sorted by opportunity score</span>
            </div>
            <div className="space-y-3">
              {nicheResults.map((niche, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{niche.keyword}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-slate-500">Competition: <strong className={niche.competition < 30 ? 'text-emerald-600' : 'text-amber-600'}>{niche.competition}%</strong></span>
                      <span className="text-xs text-slate-500">Demand: <strong className="text-blue-600">{niche.demand}%</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      niche.trend === 'up' ? 'text-emerald-600' : 'text-slate-500'
                    }`}>
                      <TrendingUp size={12} className={niche.trend === 'up' ? '' : 'rotate-90'} />
                      {niche.trend === 'up' ? 'Rising' : 'Stable'}
                    </div>
                    <div className="w-16 text-center">
                      <div className="text-lg font-bold text-brand-600">{niche.opportunity}</div>
                      <div className="text-[10px] text-slate-400">Score</div>
                    </div>
                    <button className="px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 active:scale-95 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 shadow-sm">
                      Explore <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keyword Vault */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <BarChart3 size={18} className="text-violet-500" />
              Keyword Vault
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vaultKeywords.map((kw, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{kw.keyword}</p>
                    <p className="text-xs text-slate-400">{kw.searches.toLocaleString()} monthly searches</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    kw.trend > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {kw.trend > 0 ? '+' : ''}{kw.trend}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
