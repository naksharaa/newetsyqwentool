import { TrendingUp, Package, DollarSign, ShoppingCart, AlertCircle, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const stats = [
  { label: 'Total Sales', value: '$12,847', change: '+12.5%', up: true, icon: <DollarSign size={20} />, color: 'emerald' },
  { label: 'Active Listings', value: '156', change: '+3', up: true, icon: <Package size={20} />, color: 'blue' },
  { label: 'Unfulfilled Orders', value: '8', change: '-2', up: false, icon: <ShoppingCart size={20} />, color: 'amber' },
  { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', up: true, icon: <TrendingUp size={20} />, color: 'violet' },
];

const recentOrders = [
  { id: '#4821', customer: 'Sarah M.', item: 'Custom Metal Sign - Family Name', amount: '$45.99', status: 'Processing', date: '2 min ago' },
  { id: '#4820', customer: 'John D.', item: 'Personalized Wall Art', amount: '$62.50', status: 'Shipped', date: '1 hr ago' },
  { id: '#4819', customer: 'Emily R.', item: 'Metal House Sign', amount: '$38.00', status: 'Delivered', date: '3 hrs ago' },
  { id: '#4818', customer: 'Mike T.', item: 'Custom Pet Portrait Sign', amount: '$55.00', status: 'Processing', date: '5 hrs ago' },
  { id: '#4817', customer: 'Lisa K.', item: 'Farmhouse Metal Sign', amount: '$42.99', status: 'Shipped', date: '8 hrs ago' },
];

const alerts = [
  { type: 'warning', message: '3 orders need shipping messages sent', time: '1h ago' },
  { type: 'info', message: 'Niche Hunter found 5 new opportunities', time: '3h ago' },
  { type: 'success', message: 'Listing #12847 SEO score improved to 92/100', time: '5h ago' },
  { type: 'error', message: 'API usage at 78% - consider upgrading', time: '1d ago' },
];

const salesData = [
  { day: 'Mon', sales: 420 },
  { day: 'Tue', sales: 380 },
  { day: 'Wed', sales: 510 },
  { day: 'Thu', sales: 470 },
  { day: 'Fri', sales: 620 },
  { day: 'Sat', sales: 750 },
  { day: 'Sun', sales: 580 },
];

const maxSales = Math.max(...salesData.map(d => d.sales));

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's your shop overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                'bg-violet-50 text-violet-600'
              }`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Weekly Sales</h2>
              <p className="text-sm text-slate-500">Last 7 days performance</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 active:scale-95 transition-all">Week</button>
              <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg active:scale-95 transition-all">Month</button>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {salesData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative group">
                  <div 
                    className="w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-md transition-all duration-300 hover:from-brand-600 hover:to-brand-500 cursor-pointer"
                    style={{ height: `${(d.sales / maxSales) * 160}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${d.sales}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-500" />
            Recent Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.type === 'warning' ? 'bg-amber-400' :
                  alert.type === 'info' ? 'bg-blue-400' :
                  alert.type === 'success' ? 'bg-emerald-400' :
                  'bg-red-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{alert.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock size={10} /> {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Recent Orders</h2>
          <button className="text-sm text-brand-600 hover:text-brand-700 hover:underline font-medium active:scale-95 transition-all">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Order</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Customer</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Item</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Amount</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Status</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4 text-sm font-medium text-slate-700">{order.id}</td>
                  <td className="py-3 pr-4 text-sm text-slate-600">{order.customer}</td>
                  <td className="py-3 pr-4 text-sm text-slate-600 max-w-[200px] truncate">{order.item}</td>
                  <td className="py-3 pr-4 text-sm font-medium text-slate-700">{order.amount}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Processing' ? 'bg-amber-50 text-amber-700' :
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-slate-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
