import { Image, CheckCircle, AlertCircle, Wand2, ArrowRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface ListingImage {
  id: string;
  listingId: number;
  listingTitle: string;
  imageUrl: string;
  hasAltText: boolean;
  altText?: string;
}

const mockImages: ListingImage[] = [
  { id: 'img-1', listingId: 12847, listingTitle: 'Custom Metal Family Name Sign', imageUrl: '', hasAltText: true, altText: 'Rustic metal wall sign with custom family name in cursive script, farmhouse home decor' },
  { id: 'img-2', listingId: 12847, listingTitle: 'Custom Metal Family Name Sign', imageUrl: '', hasAltText: false },
  { id: 'img-3', listingId: 12846, listingTitle: 'Personalized Pet Portrait Art', imageUrl: '', hasAltText: true, altText: 'Custom metal pet portrait wall art featuring golden retriever, personalized gift for pet lovers' },
  { id: 'img-4', listingId: 12846, listingTitle: 'Personalized Pet Portrait Art', imageUrl: '', hasAltText: false },
  { id: 'img-5', listingId: 12846, listingTitle: 'Personalized Pet Portrait Art', imageUrl: '', hasAltText: false },
  { id: 'img-6', listingId: 12845, listingTitle: 'Modern House Number Sign', imageUrl: '', hasAltText: false },
  { id: 'img-7', listingId: 12845, listingTitle: 'Modern House Number Sign', imageUrl: '', hasAltText: true, altText: 'Contemporary metal house number plaque with modern font, outdoor address sign' },
  { id: 'img-8', listingId: 12844, listingTitle: 'Lake Life Metal Sign', imageUrl: '', hasAltText: false },
];

export default function AltTextOptimizer() {
  const [mode, setMode] = useState<'ai' | 'local'>('ai');
  const [generating, setGenerating] = useState<string | null>(null);
  const [images, setImages] = useState(mockImages);

  const missingCount = images.filter(img => !img.hasAltText).length;
  const totalCount = images.length;
  const coveragePercent = Math.round(((totalCount - missingCount) / totalCount) * 100);

  const handleGenerate = (imageId: string) => {
    setGenerating(imageId);
    setTimeout(() => {
      setImages(prev => prev.map(img => 
        img.id === imageId ? { 
          ...img, 
          hasAltText: true, 
          altText: 'AI-generated: Custom metal wall art with rustic farmhouse design, personalized home decor gift' 
        } : img
      ));
      setGenerating(null);
    }, 1500);
  };

  const handleGenerateAll = () => {
    const missing = images.filter(img => !img.hasAltText);
    missing.forEach((img, index) => {
      setTimeout(() => handleGenerate(img.id), index * 800);
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Image size={24} className="text-teal-500" />
          Alt Text Optimizer
        </h1>
        <p className="text-slate-500 mt-1">Generate SEO-friendly alt text for all listing images.</p>
      </div>

      {/* Coverage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Alt Text Coverage</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-800">{coveragePercent}%</span>
          </div>
          <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-teal-400 rounded-full" style={{ width: `${coveragePercent}%` }}></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Missing Alt Text</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{missingCount}</p>
          <p className="text-xs text-slate-400 mt-1">images need alt text</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total Images</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{totalCount}</p>
          <p className="text-xs text-slate-400 mt-1">across all listings</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Mode:</span>
              <button
                onClick={() => setMode('ai')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  mode === 'ai' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Wand2 size={12} className="inline mr-1" /> AI Vision
              </button>
              <button
                onClick={() => setMode('local')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  mode === 'local' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Local (Tags-based)
              </button>
            </div>
          </div>
          <button
            onClick={handleGenerateAll}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Wand2 size={14} /> Generate All Missing
          </button>
        </div>
      </div>

      {/* Images List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Listing Images</h2>
          <button className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {images.map((image) => (
            <div key={image.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                {/* Image placeholder */}
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image size={20} className="text-slate-300" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{image.listingTitle}</p>
                  <p className="text-xs text-slate-400">Listing #{image.listingId} • Image {image.id.split('-')[1]}</p>
                  {image.hasAltText ? (
                    <div className="mt-1 flex items-start gap-1">
                      <CheckCircle size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-600 truncate">{image.altText}</p>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center gap-1">
                      <AlertCircle size={12} className="text-amber-500" />
                      <p className="text-xs text-amber-600">Missing alt text</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {image.hasAltText ? (
                    <span className="px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded">
                      ✓ Optimized
                    </span>
                  ) : generating === image.id ? (
                    <div className="flex items-center gap-2 text-xs text-teal-600">
                      <div className="w-3 h-3 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
                      Generating...
                    </div>
                  ) : (
                    <button
                      onClick={() => handleGenerate(image.id)}
                      className="px-3 py-1.5 text-xs font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center gap-1"
                    >
                      Generate <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
