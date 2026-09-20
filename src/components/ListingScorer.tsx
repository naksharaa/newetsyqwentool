import { Star, AlertTriangle, CheckCircle, TrendingUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const mockListings = [
  { id: 12847, title: 'Custom Metal Family Name Sign - Rustic Farmhouse Decor', score: 92, views: 1240, favorites: 89, issues: 0 },
  { id: 12846, title: 'Personalized Pet Portrait Metal Wall Art', score: 87, views: 890, favorites: 62, issues: 1 },
  { id: 12845, title: 'Modern House Number Sign - Address Plaque', score: 78, views: 650, favorites: 34, issues: 2 },
  { id: 12844, title: 'Lake Life Metal Sign - Lake House Gift', score: 71, views: 420, favorites: 28, issues: 3 },
  { id: 12843, title: 'Welcome Farm Sign - Wooden Metal Combo', score: 65, views: 380, favorites: 19, issues: 4 },
  { id: 12842, title: 'Custom Dog Name Metal Art', score: 58, views: 290, favorites: 15, issues: 5 },
];

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-emerald-600 bg-emerald-50';
  if (score >= 70) return 'text-amber-600 bg-amber-50';
  return 'text-red-600 bg-red-50';
};

const getScoreLabel = (score: number) => {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Needs Work';
  return 'Poor';
};

export default function ListingScorer() {
  const [selectedListing, setSelectedListing] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (id: number) => {
    setSelectedListing(id);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 1500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Star size={24} className="text-amber-500" />
          Listing Scorer
        </h1>
        <p className="text-slate-500 mt-1">AI-powered SEO analysis for your Etsy listings.</p>
      </div>

      {/* Shop Average */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Shop Average SEO Score</p>
            <p className="text-3xl font-bold text-slate-800">75<span className="text-lg text-slate-400">/100</span></p>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">+5 from last week</span>
          </div>
        </div>
        <div className="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all" style={{ width: '75%' }}></div>
        </div>
      </div>

      {/* Listings */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Your Listings</h2>
          <span className="text-xs text-slate-400">{mockListings.length} listings</span>
        </div>
        <div className="divide-y divide-slate-100">
          {mockListings.map((listing) => (
            <div key={listing.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${getScoreColor(listing.score)}`}>
                  {listing.score}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{listing.title}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-slate-500">👁 {listing.views} views</span>
                    <span className="text-xs text-slate-500">❤️ {listing.favorites} favs</span>
                    {listing.issues > 0 && (
                      <span className="text-xs text-amber-600 flex items-center gap-0.5">
                        <AlertTriangle size={10} /> {listing.issues} issues
                      </span>
                    )}
                    {listing.issues === 0 && (
                      <span className="text-xs text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle size={10} /> Optimized
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getScoreColor(listing.score)}`}>
                    {getScoreLabel(listing.score)}
                  </span>
                  <button
                    onClick={() => handleAnalyze(listing.id)}
                    className="px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
                  >
                    Analyze
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              
              {/* Expanded Analysis */}
              {selectedListing === listing.id && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg animate-fade-in">
                  {isAnalyzing ? (
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="w-5 h-5 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
                      <span className="text-sm">Analyzing with AI...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-slate-700">AI Recommendations:</h4>
                      <ul className="space-y-2">
                        {listing.issues <= 1 ? (
                          <li className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            Listing is well optimized. Consider adding 1-2 more relevant tags.
                          </li>
                        ) : (
                          <>
                            <li className="flex items-start gap-2 text-sm text-slate-600">
                              <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                              Title could be more descriptive - add material and use case keywords.
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-600">
                              <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                              Missing long-tail keywords in tags. Consider adding "personalized gift for her".
                            </li>
                            <li className="flex items-start gap-2 text-sm text-slate-600">
                              <AlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                              First photo could be improved - use brighter lighting and lifestyle context.
                            </li>
                          </>
                        )}
                      </ul>
                      <div className="flex gap-2 pt-2">
                        <button className="px-3 py-1.5 text-xs font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                          Apply Suggestions
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                          View Full Report
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
