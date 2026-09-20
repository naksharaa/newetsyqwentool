import { Shield, CheckCircle, AlertTriangle, XCircle, Play, Pause, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const auditChecks = [
  { category: 'Title Optimization', checks: 15, passed: 12, status: 'good' },
  { category: 'Tag Relevance', checks: 13, passed: 9, status: 'warning' },
  { category: 'Photo Quality', checks: 10, passed: 7, status: 'warning' },
  { category: 'Description SEO', checks: 12, passed: 10, status: 'good' },
  { category: 'Pricing Strategy', checks: 8, passed: 5, status: 'warning' },
  { category: 'Shipping Setup', checks: 6, passed: 6, status: 'excellent' },
  { category: 'Category Selection', checks: 5, passed: 3, status: 'poor' },
  { category: 'Alt Text Coverage', checks: 10, passed: 4, status: 'poor' },
  { category: 'Materials & Attributes', checks: 8, passed: 6, status: 'good' },
  { category: 'Renewal Strategy', checks: 5, passed: 4, status: 'good' },
  { category: 'Shop Policies', checks: 4, passed: 4, status: 'excellent' },
  { category: 'About Section', checks: 4, passed: 3, status: 'good' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'excellent': return <CheckCircle size={16} className="text-emerald-500" />;
    case 'good': return <CheckCircle size={16} className="text-blue-500" />;
    case 'warning': return <AlertTriangle size={16} className="text-amber-500" />;
    case 'poor': return <XCircle size={16} className="text-red-500" />;
    default: return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'bg-emerald-50 border-emerald-200';
    case 'good': return 'bg-blue-50 border-blue-200';
    case 'warning': return 'bg-amber-50 border-amber-200';
    case 'poor': return 'bg-red-50 border-red-200';
    default: return 'bg-slate-50 border-slate-200';
  }
};

export default function FullShopAudit() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(true);

  const handleStartAudit = () => {
    setIsRunning(true);
    setCompleted(false);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setCompleted(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const totalChecks = auditChecks.reduce((sum, c) => sum + c.checks, 0);
  const totalPassed = auditChecks.reduce((sum, c) => sum + c.passed, 0);
  const overallScore = Math.round((totalPassed / totalChecks) * 100);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Shield size={24} className="text-indigo-500" />
          Full Shop Audit
        </h1>
        <p className="text-slate-500 mt-1">Comprehensive 100-point SEO audit for your entire Etsy shop.</p>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Overall Shop Health Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold text-slate-800">{overallScore}</span>
              <span className="text-lg text-slate-400">/100</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{totalPassed} of {totalChecks} checks passed</p>
          </div>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                strokeDasharray={`${overallScore * 2.64} 264`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${
                overallScore >= 80 ? 'text-emerald-600' : overallScore >= 60 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {overallScore >= 80 ? 'A' : overallScore >= 60 ? 'B' : 'C'}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar if running */}
        {isRunning && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-500">Auditing listings...</span>
              <span className="text-xs font-medium text-brand-600">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleStartAudit}
            disabled={isRunning}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Pause size={14} /> Pause Audit
              </>
            ) : (
              <>
                <Play size={14} /> {completed ? 'Re-run Audit' : 'Start Audit'}
              </>
            )}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
            <RefreshCw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* Audit Categories */}
      {completed && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Audit Results by Category</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {auditChecks.map((check, i) => (
              <div key={i} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <p className="text-sm font-medium text-slate-700">{check.category}</p>
                      <p className="text-xs text-slate-400">{check.passed}/{check.checks} checks passed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          check.status === 'excellent' || check.status === 'good' ? 'bg-emerald-400' :
                          check.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${(check.passed / check.checks) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(check.status)} font-medium capitalize`}>
                      {check.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {completed && (
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Priority Recommendations</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">Alt Text Coverage Critical</p>
                <p className="text-xs text-red-600 mt-0.5">Only 40% of images have alt text. This impacts accessibility and SEO. Use Alt Text Optimizer to fix.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">Category Selection Issues</p>
                <p className="text-xs text-red-600 mt-0.5">3 listings are in incorrect categories. This reduces visibility in search results.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Tag Optimization Needed</p>
                <p className="text-xs text-amber-600 mt-0.5">4 listings have irrelevant or duplicate tags. Consider using Niche Hunter for better tag suggestions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Photo Quality Improvements</p>
                <p className="text-xs text-amber-600 mt-0.5">3 listings have low-quality first photos. Better lighting and backgrounds can increase click-through rates.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
