import { Camera, Image, Video, Upload, CheckCircle, Play } from 'lucide-react';
import { useState } from 'react';

const mockupTemplates = [
  { id: 1, name: 'Person Holding Sign - Living Room', type: 'lifestyle', status: 'ready' },
  { id: 2, name: 'Wall Mount - Kitchen Background', type: 'scene', status: 'ready' },
  { id: 3, name: 'Gift Box Presentation', type: 'product', status: 'ready' },
  { id: 4, name: 'Outdoor Hanging - Porch Scene', type: 'lifestyle', status: 'generating' },
];

const mockListings = [
  { id: 12847, title: 'Custom Metal Family Name Sign', mockups: 5, status: 'complete' },
  { id: 12846, title: 'Personalized Pet Portrait Art', mockups: 3, status: 'partial' },
  { id: 12845, title: 'Modern House Number Sign', mockups: 0, status: 'none' },
];

export default function MockupFactory() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateMockup = () => {
    setIsCreating(true);
    setTimeout(() => setIsCreating(false), 2500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Camera size={24} className="text-pink-500" />
          Mockup Factory
        </h1>
        <p className="text-slate-500 mt-1">Create professional product mockups and listing images.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
            <Image size={18} className="text-pink-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">24</p>
            <p className="text-xs text-slate-500">Mockups Created</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Video size={18} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">8</p>
            <p className="text-xs text-slate-500">Videos Generated</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <CheckCircle size={18} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">12</p>
            <p className="text-xs text-slate-500">Listings Updated</p>
          </div>
        </div>
      </div>

      {/* Create Mockup Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Create New Mockup</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Design</label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-brand-300 transition-colors cursor-pointer">
              <Upload size={24} className="mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">Upload design image or select from library</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Background Template</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 mb-3">
              <option>Person Holding - Living Room</option>
              <option>Wall Mount - Kitchen</option>
              <option>Gift Box Presentation</option>
              <option>Outdoor - Porch Scene</option>
              <option>Desk Setup - Office</option>
            </select>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Holder Role (for lifestyle)</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 mb-4">
              <option>Woman (25-35)</option>
              <option>Man (25-35)</option>
              <option>Couple</option>
              <option>None (no person)</option>
            </select>
            <button
              onClick={handleCreateMockup}
              disabled={isCreating}
              className="w-full px-4 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Mockup...
                </>
              ) : (
                <>
                  <Camera size={16} /> Generate Mockup
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Background Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockupTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center">
                <Camera size={24} className="text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700 truncate">{template.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-400 capitalize">{template.type}</span>
                <span className={`text-xs ${template.status === 'ready' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {template.status === 'ready' ? '✓ Ready' : '⏳'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listing Mockup Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Listing Mockup Status</h2>
        <div className="space-y-3">
          {mockListings.map((listing) => (
            <div key={listing.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  listing.status === 'complete' ? 'bg-emerald-50' : listing.status === 'partial' ? 'bg-amber-50' : 'bg-slate-100'
                }`}>
                  {listing.status === 'complete' ? <CheckCircle size={16} className="text-emerald-500" /> :
                   listing.status === 'partial' ? <Image size={16} className="text-amber-500" /> :
                   <Camera size={16} className="text-slate-400" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{listing.title}</p>
                  <p className="text-xs text-slate-400">{listing.mockups} mockups</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {listing.status !== 'complete' && (
                  <button className="px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors">
                    Create Mockups
                  </button>
                )}
                {listing.mockups > 0 && (
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                    <Play size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
