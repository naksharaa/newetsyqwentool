import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import CustomerMessages from './components/CustomerMessages';
import NicheHunter from './components/NicheHunter';
import ListingScorer from './components/ListingScorer';
import DesignStudio from './components/DesignStudio';
import MockupFactory from './components/MockupFactory';
import CompetitorSpy from './components/CompetitorSpy';
import ProfitCalculator from './components/ProfitCalculator';
import FullShopAudit from './components/FullShopAudit';
import AltTextOptimizer from './components/AltTextOptimizer';

export type PageId = 
  | 'dashboard' 
  | 'customer-messages' 
  | 'niche-hunter' 
  | 'listing-scorer' 
  | 'full-audit'
  | 'alt-text'
  | 'design-studio' 
  | 'mockup-factory' 
  | 'competitor-spy' 
  | 'profit-calculator'
  | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'customer-messages': return <CustomerMessages />;
      case 'niche-hunter': return <NicheHunter />;
      case 'listing-scorer': return <ListingScorer />;
      case 'full-audit': return <FullShopAudit />;
      case 'alt-text': return <AltTextOptimizer />;
      case 'design-studio': return <DesignStudio />;
      case 'mockup-factory': return <MockupFactory />;
      case 'competitor-spy': return <CompetitorSpy />;
      case 'profit-calculator': return <ProfitCalculator />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="animate-fade-in">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
