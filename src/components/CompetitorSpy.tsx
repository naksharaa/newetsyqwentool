import { Eye, Search, TrendingUp, BarChart3, Target, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const competitorData = [
  { shop: 'RusticMetalCrafts', listings: 234, avgPrice: '$42.50', avgViews: 1850, avgFavs: 120, topTags: ['farmhouse', 'metal sign', 'rustic'], score: 88 },
  { shop: 'ModernHomeDecor', listings: 189, avgPrice: '$55.00', avgViews: 2100, avgFavs: 145, topTags: ['modern', 'wall art', 'minimalist'], score: 82 },
  { shop: 'PersonalizedGiftsCo', listings: 312, avgPrice: '$38.99', avgViews: 1600, avgFavs: 98, topTags: ['personalized', 'gift', 'custom'], score: 76 },
  { shop: 'FarmhouseFinds', listings: 156, avgPrice: '$47.00', avgViews: 1400, avgFavs: 87, topTags: ['farmhouse', 'vintage', 'home decor'], score: 71 },
  { shop: 'ArtisanMetalWorks', listings: 98, avgPrice: '$65.00', avgViews: 980, avgFavs: 62, topTags: ['handmade', 'metal art', 'custom'], score: 65 },
];

const keywordMarket = [
  { keyword: 'metal wall art', avgPrice: '$45', competition: 'High', monthlySales: '~2,400', opportunity: 'Medium' },
  { keyword: 'farmhouse sign', avgPrice: '$38', competition: 'High', monthlySales: '~3,100', opportunity: 'Medium' },
  { keyword: 'personalized house sign', avgPrice: '$52', competition: 'Medium', monthlySales: '~1,800', opportunity: 'High' },
  { keyword: 'custom pet metal art', avgPrice: '$58', competition: 'Low', monthlySales: '~950', opportunity: 'Very High' },
];

export default function CompetitorSpy() {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 2500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Eye size={24} className="text-cyan-500" />
          Competitor Spy
        </h1>
        <p className="text-slate-500 mt-1">Analyze competitor shops and discover market opportunities.</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Search Query or Shop URL</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'metal wall art' or etsy.com/shop/ShopName"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-300 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search size={16} /> Scan Market
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showResults && (
        <div className="space-y-6 animate-fade-in">
          {/* AI Summary */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100 p-6">
            <h3 className="text-sm font-semibold text-cyan-800 mb-2 flex items-center gap-2">
              <Target size={16} /> AI Market Analysis
            </h3>
            <p className="text-sm text-cyan-700 leading-relaxed">
              The metal sign market shows strong demand with moderate competition. Top sellers focus on personalization and farmhouse aesthetics. 
              There's an underserved niche in <strong>custom pet portraits on metal</strong> with low competition and high margins. 
              Average listing age is 18 months, suggesting room for fresh designs to gain traction quickly.
            </p>
          </div>

          {/* Competitor Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <BarChart3 size={18} className="text-cyan-500" />
                Top Competitors
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Shop</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Listings</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Avg Price</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Avg Views</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Top Tags</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {competitorData.map((comp) => (
                    <tr key={comp.shop} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-700">{comp.shop}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{comp.listings}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-700">{comp.avgPrice}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{comp.avgViews.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {comp.topTags.map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 text-[10px] bg-slate-100 text-slate-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                          comp.score >= 80 ? 'bg-emerald-50 text-emerald-700' :
                          comp.score >= 70 ? 'bg-amber-50 text-amber-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {comp.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Keyword Market Data */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" />
              Keyword Market Data
            </h2>
            <div className="space-y-3">
              {keywordMarket.map((kw, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{kw.keyword}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500">Avg: {kw.avgPrice}</span>
                      <span className="text-xs text-slate-500">Sales: {kw.monthlySales}/mo</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      kw.competition === 'Low' ? 'bg-emerald-50 text-emerald-700' :
                      kw.competition === 'Medium' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {kw.competition} comp.
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      kw.opportunity === 'Very High' ? 'bg-emerald-100 text-emerald-800' :
                      kw.opportunity === 'High' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {kw.opportunity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5" />
              <p className="text-xs text-amber-700">
                "Custom pet metal art" shows the highest opportunity with low competition. Consider creating listings in this niche first.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
