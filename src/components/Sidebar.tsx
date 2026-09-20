import { 
  LayoutDashboard, MessageSquare, Search, Star, Shield, Image, 
  Palette, Camera, Eye, Calculator, Settings, ChevronLeft, ChevronRight,
  Sparkles
} from 'lucide-react';
import type { PageId } from '../App';

interface SidebarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: { id: PageId; label: string; icon: React.ReactNode; section?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, section: 'Overview' },
  { id: 'customer-messages', label: 'Customer Messages', icon: <MessageSquare size={20} /> },
  { id: 'niche-hunter', label: 'Niche Hunter', icon: <Search size={20} />, section: 'Research' },
  { id: 'competitor-spy', label: 'Competitor Spy', icon: <Eye size={20} /> },
  { id: 'listing-scorer', label: 'Listing Scorer', icon: <Star size={20} />, section: 'SEO' },
  { id: 'full-audit', label: 'Full Shop Audit', icon: <Shield size={20} /> },
  { id: 'alt-text', label: 'Alt Text Optimizer', icon: <Image size={20} /> },
  { id: 'design-studio', label: 'Design Studio', icon: <Palette size={20} />, section: 'Creative' },
  { id: 'mockup-factory', label: 'Mockup Factory', icon: <Camera size={20} /> },
  { id: 'profit-calculator', label: 'Profit Calculator', icon: <Calculator size={20} />, section: 'Tools' },
  { id: 'settings', label: 'Settings & Credits', icon: <Settings size={20} /> },
];

export default function Sidebar({ currentPage, onPageChange, collapsed, onToggleCollapse }: SidebarProps) {
  let lastSection = '';

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 relative z-10`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div className="animate-slide-in">
              <h1 className="font-bold text-slate-800 text-lg leading-tight">Stylinsoul</h1>
              <p className="text-[10px] text-brand-600 font-medium -mt-0.5">PRO SUITE</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const showSection = item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          
          return (
            <div key={item.id}>
              {showSection && !collapsed && (
                <div className="px-4 pt-4 pb-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.section}
                  </p>
                </div>
              )}
              <button
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-100
                  ${currentPage === item.id 
                    ? 'bg-brand-50 text-brand-700 border-r-2 border-brand-600 active:bg-brand-100' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <span className={currentPage === item.id ? 'text-brand-600' : 'text-slate-400'}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all z-50"
      >
        {collapsed ? <ChevronRight size={14} className="text-slate-500" /> : <ChevronLeft size={14} className="text-slate-500" />}
      </button>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Stylinsoul Shop</p>
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Connected
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
