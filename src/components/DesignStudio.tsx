import { Palette, Wand2, Download, Heart, RefreshCw, Layers } from 'lucide-react';
import { useState } from 'react';

const mockDesigns = [
  { id: 1, prompt: 'Rustic farmhouse "Home Sweet Home" with wildflowers', niche: 'Farmhouse Decor', style: 'Rustic', status: 'complete' },
  { id: 2, prompt: 'Modern geometric mountain landscape silhouette', niche: 'Mountain Theme', style: 'Modern', status: 'complete' },
  { id: 3, prompt: 'Vintage nautical anchor with rope border', niche: 'Coastal Decor', style: 'Vintage', status: 'generating' },
  { id: 4, prompt: 'Minimalist line art coffee cup with steam', niche: 'Kitchen Decor', style: 'Minimalist', status: 'complete' },
];

const colorPalettes = [
  ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2ECC71'],
  ['#8E44AD', '#F39C12', '#1ABC9C', '#E74C3C', '#34495E'],
  ['#D4A574', '#8B6F47', '#F5E6D3', '#A0522D', '#DEB887'],
];

export default function DesignStudio() {
  const [niche, setNiche] = useState('');
  const [style, setStyle] = useState('');
  const [count, setCount] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Palette size={24} className="text-violet-500" />
          AI Design Studio
        </h1>
        <p className="text-slate-500 mt-1">Generate unique metal sign designs with AI.</p>
      </div>

      {/* Generation Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Wand2 size={18} className="text-violet-500" />
          Generate New Designs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Niche / Theme</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g., Farmhouse, Coastal..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Any Style</option>
              <option value="rustic">Rustic</option>
              <option value="modern">Modern</option>
              <option value="vintage">Vintage</option>
              <option value="minimalist">Minimalist</option>
              <option value="boho">Boho</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Count</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value={1}>1 Design</option>
              <option value={2}>2 Designs</option>
              <option value={4}>4 Designs</option>
              <option value={6}>6 Designs</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full px-4 py-2 bg-violet-600 hover:bg-violet-700 active:scale-95 disabled:bg-violet-300 disabled:active:scale-100 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={16} /> Generate
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Color Palette Suggestions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Layers size={16} className="text-slate-400" />
          Suggested Color Palettes
        </h3>
        <div className="flex flex-wrap gap-4">
          {colorPalettes.map((palette, i) => (
            <div key={i} className="flex items-center gap-1 p-2 bg-slate-50 rounded-lg">
              {palette.map((color, j) => (
                <div key={j} className="w-6 h-6 rounded" style={{ backgroundColor: color }} title={color} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Generated Designs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Recent Designs</h2>
          <button className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockDesigns.map((design) => (
            <div key={design.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
              {/* Design Preview Placeholder */}
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                {design.status === 'generating' ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-3 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
                    <span className="text-xs text-slate-500">Generating...</span>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <div className="w-24 h-24 mx-auto bg-white/80 rounded-lg shadow-sm flex items-center justify-center mb-2">
                      <Palette size={32} className="text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-500 max-w-[200px] truncate">{design.prompt}</p>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-lg hover:bg-slate-100 active:scale-90 transition-all">
                    <Download size={16} className="text-slate-700" />
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-slate-100 active:scale-90 transition-all">
                    <Heart size={16} className="text-slate-700" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-700 truncate">{design.niche}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-400">{design.style}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    design.status === 'complete' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {design.status === 'complete' ? '✓ Ready' : '⏳ Processing'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
