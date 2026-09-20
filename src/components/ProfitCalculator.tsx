import { Calculator, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ProfitCalculator() {
  const [sellingPrice, setSellingPrice] = useState(45.00);
  const [materialCost, setMaterialCost] = useState(12.00);
  const [shippingCost, setShippingCost] = useState(6.50);
  const [etsyFees, setEtsyFees] = useState(0);
  const [laborHours, setLaborHours] = useState(0.5);
  const [hourlyRate, setHourlyRate] = useState(15);

  // Calculate Etsy fees (6.5% transaction + $0.20 listing + 3% + $0.25 payment)
  const transactionFee = sellingPrice * 0.065;
  const listingFee = 0.20;
  const paymentFee = sellingPrice * 0.03 + 0.25;
  const totalEtsyFees = transactionFee + listingFee + paymentFee;

  const laborCost = laborHours * hourlyRate;
  const totalCosts = materialCost + shippingCost + totalEtsyFees + laborCost;
  const profit = sellingPrice - totalCosts;
  const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  const getMarginColor = () => {
    if (margin >= 50) return 'text-emerald-600';
    if (margin >= 30) return 'text-amber-600';
    return 'text-red-600';
  };

  const getMarginBg = () => {
    if (margin >= 50) return 'from-emerald-500 to-emerald-600';
    if (margin >= 30) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Calculator size={24} className="text-emerald-500" />
          Profit Calculator
        </h1>
        <p className="text-slate-500 mt-1">Calculate your true profit per listing including all Etsy fees.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Listing Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Selling Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Material Cost ($)</label>
              <input
                type="number"
                step="0.01"
                value={materialCost}
                onChange={(e) => setMaterialCost(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Shipping Cost ($)</label>
              <input
                type="number"
                step="0.01"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Labor (hours)</label>
              <input
                type="number"
                step="0.25"
                value={laborHours}
                onChange={(e) => setLaborHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your Hourly Rate ($)</label>
              <input
                type="number"
                step="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Profit Summary */}
          <div className={`bg-gradient-to-br ${getMarginBg()} rounded-xl p-6 text-white`}>
            <p className="text-sm opacity-80">Profit Per Sale</p>
            <p className="text-4xl font-bold mt-1">${profit.toFixed(2)}</p>
            <p className="text-sm mt-2 opacity-80">Margin: {margin.toFixed(1)}%</p>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white/60 rounded-full transition-all" style={{ width: `${Math.min(margin, 100)}%` }}></div>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Etsy Fee Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Transaction Fee (6.5%)</span>
                <span className="font-medium text-slate-700">${transactionFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Listing Fee</span>
                <span className="font-medium text-slate-700">${listingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Payment Processing</span>
                <span className="font-medium text-slate-700">${paymentFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">Total Etsy Fees</span>
                <span className="font-bold text-red-600">${totalEtsyFees.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Total Cost Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Materials</span>
                <span className="font-medium text-slate-700">${materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-medium text-slate-700">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Etsy Fees</span>
                <span className="font-medium text-slate-700">${totalEtsyFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Labor ({laborHours}h × ${hourlyRate})</span>
                <span className="font-medium text-slate-700">${laborCost.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">Total Costs</span>
                <span className="font-bold text-slate-800">${totalCosts.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Projection */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" />
              Monthly Projection
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[10, 25, 50].map((qty) => (
                <div key={qty} className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">{qty} sales/mo</p>
                  <p className={`text-lg font-bold ${getMarginColor()}`}>${(profit * qty).toFixed(0)}</p>
                  <p className="text-[10px] text-slate-400">profit</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
