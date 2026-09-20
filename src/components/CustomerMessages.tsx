import { MessageSquare, Send, Clock, CheckCircle, AlertCircle, Filter } from 'lucide-react';
import { useState } from 'react';

type MessageType = 'SALE' | 'SHIP' | 'ARRIVE' | 'REVIEW';

interface MessageTask {
  id: string;
  receiptId: string;
  customer: string;
  type: MessageType;
  orderDate: string;
  dueDate: string;
  status: 'pending' | 'sent' | 'overdue';
  item: string;
}

const mockTasks: MessageTask[] = [
  { id: '1', receiptId: 'R-4821', customer: 'Sarah M.', type: 'SHIP', orderDate: 'Jan 18', dueDate: 'Today', status: 'pending', item: 'Custom Metal Sign' },
  { id: '2', receiptId: 'R-4819', customer: 'Emily R.', type: 'ARRIVE', orderDate: 'Jan 12', dueDate: 'Jan 22', status: 'pending', item: 'Metal House Sign' },
  { id: '3', receiptId: 'R-4815', customer: 'David L.', type: 'REVIEW', orderDate: 'Jan 5', dueDate: 'Jan 20', status: 'overdue', item: 'Personalized Gift' },
  { id: '4', receiptId: 'R-4810', customer: 'Anna K.', type: 'SALE', orderDate: 'Jan 3', dueDate: 'Jan 18', status: 'sent', item: 'Wall Art Set' },
  { id: '5', receiptId: 'R-4808', customer: 'Tom W.', type: 'SHIP', orderDate: 'Jan 17', dueDate: 'Today', status: 'pending', item: 'Farmhouse Sign' },
];

const typeColors: Record<MessageType, string> = {
  SALE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  SHIP: 'bg-blue-50 text-blue-700 border-blue-200',
  ARRIVE: 'bg-violet-50 text-violet-700 border-violet-200',
  REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function CustomerMessages() {
  const [filter, setFilter] = useState<'all' | MessageType>('all');
  const [tasks] = useState(mockTasks);

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.type === filter);
  const pending = tasks.filter(t => t.status === 'pending').length;
  const overdue = tasks.filter(t => t.status === 'overdue').length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Customer Messages</h1>
        <p className="text-slate-500 mt-1">Track and send automated order messages.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Clock size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{pending}</p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertCircle size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{overdue}</p>
              <p className="text-xs text-slate-500">Overdue</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{tasks.length - pending - overdue}</p>
              <p className="text-xs text-slate-500">Sent Today</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <MessageSquare size={18} className="text-brand-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{tasks.length}</p>
              <p className="text-xs text-slate-500">Total Tasks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4">
        <Filter size={16} className="text-slate-400" />
        {(['all', 'SALE', 'SHIP', 'ARRIVE', 'REVIEW'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === f ? 'bg-brand-100 text-brand-700' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filtered.map((task) => (
          <div key={task.id} className={`bg-white rounded-xl border p-4 hover:shadow-sm transition-all ${
            task.status === 'overdue' ? 'border-red-200 bg-red-50/30' : 'border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${typeColors[task.type]}`}>
                  {task.type}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-800">{task.customer}</p>
                  <p className="text-xs text-slate-500">{task.item} • {task.receiptId}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Due: {task.dueDate}</p>
                  <p className={`text-xs font-medium ${
                    task.status === 'overdue' ? 'text-red-600' :
                    task.status === 'sent' ? 'text-emerald-600' :
                    'text-amber-600'
                  }`}>
                    {task.status === 'sent' ? '✓ Sent' : task.status === 'overdue' ? '⚠ Overdue' : '⏳ Pending'}
                  </p>
                </div>
                {task.status !== 'sent' && (
                  <button className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium rounded-lg flex items-center gap-1 transition-colors">
                    <Send size={12} /> Send
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
