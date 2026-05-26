import React from 'react';
import { useApp } from '../context/AppContext';
import { products, adminAnalytics } from '../services/mockData';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Clock, 
  ArrowUpRight, 
  LayoutDashboard, 
  Shirt
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';

const Admin = () => {
  const { tryOnCount, productTryOnStats } = useApp();

  // Inject active user stats with our actual workspace count
  const updatedSummary = [
    { 
      title: 'Total Try-Ons', 
      value: tryOnCount.toLocaleString(), 
      change: '+18.4%', 
      isPositive: true,
      icon: Activity,
      color: 'from-purple-500 to-indigo-500'
    },
    { 
      title: 'Active Users Today', 
      value: '849', 
      change: '+12.3%', 
      isPositive: true,
      icon: Users,
      color: 'from-indigo-500 to-blue-500'
    },
    { 
      title: 'Fitting Conversion', 
      value: '24.6%', 
      change: '+3.1%', 
      isPositive: true,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Avg. Fit Time', 
      value: '1.74s', 
      change: '-8.2%', 
      isPositive: true,
      icon: Clock,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  // Map products to include their actual try-on counts from the state
  const productPerformance = products.map(product => ({
    ...product,
    tryOnCount: productTryOnStats[product.id] || 0
  })).sort((a, b) => b.tryOnCount - a.tryOnCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 text-left space-y-10 relative">
      {/* Glow background decoration */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none"></div>

      {/* Header Title */}
      <div className="border-b border-slate-900 pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-7 w-7 text-purple-400" />
            Admin Analytics Panel
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time fitting workspace statistics, device split breakdowns, and product popularity reports.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wide">
          Live Tracking Enabled
        </span>
      </div>

      {/* Row 1: Summary Indicator Cards (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {updatedSummary.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx} 
              className="glass p-6 rounded-3xl border border-slate-900 shadow-md flex items-center justify-between hover:border-slate-800 transition-all duration-300 group"
            >
              <div className="space-y-2 text-left">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.title}</p>
                <h3 className="text-2xl font-black text-white tracking-tight">{kpi.value}</h3>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-green-400">
                  {kpi.change}
                  <span className="text-slate-500 font-medium ml-1">since yesterday</span>
                </span>
              </div>
              <span className={`h-12 w-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-purple-400 group-hover:scale-105 transition-all duration-300`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>
          );
        })}
      </div>

      {/* Row 2: Try-On Volume & Device Split Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Try-on Volume Over Time (Area Chart) */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl border border-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider">Try-On Activity Volume</h3>
            <span className="text-[10px] text-slate-500 font-medium">Daily totals (last 15 days)</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adminAnalytics.volumeOverTime} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#f1f5f9' }}
                  labelStyle={{ fontWeight: 'bold', color: '#8b5cf6' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Splits Chart (Pie Chart) */}
        <div className="glass p-6 rounded-3xl border border-slate-900 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider">Device Split</h3>
            <span className="text-[10px] text-slate-500 font-medium">By active sessions</span>
          </div>
          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={adminAnalytics.deviceSplit}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {adminAnalytics.deviceSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#f1f5f9' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-white">3.4k</span>
              <span className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">Sessions</span>
            </div>
          </div>
          
          <div className="flex justify-around items-center pt-2.5 border-t border-slate-900/60 text-xs">
            {adminAnalytics.deviceSplit.map((entry, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  {entry.name}
                </span>
                <span className="text-[10px] text-slate-500 font-bold mt-0.5">
                  {Math.round((entry.value / 3482) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Product Leaderboard & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Conversion Leaderboard */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl border border-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider">Garment Try-On Leaderboard</h3>
            <span className="text-[10px] text-slate-500 font-medium">Ranked by count</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="py-3 px-2">Style</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Popularity Index</th>
                  <th className="py-3 px-4 text-right">Try-On Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/40">
                {productPerformance.slice(0, 5).map((product, idx) => (
                  <tr key={product.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="py-3 px-2 flex items-center gap-2.5">
                      <div className="h-9 w-9 bg-slate-900 rounded-lg p-1 shrink-0 flex items-center justify-center">
                        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-200">{product.name}</p>
                        <p className="text-[10px] text-slate-500">{product.price}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-400 capitalize">{product.category}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${product.popularity}%` }}></div>
                        </div>
                        <span className="font-bold text-slate-300">{product.popularity}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-black text-purple-400">{product.tryOnCount} Fits</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Breakdown (Bar Chart) */}
        <div className="glass p-6 rounded-3xl border border-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider">Category Split</h3>
            <span className="text-[10px] text-slate-500 font-medium">Try-ons per category</span>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminAnalytics.categoryBreakdown} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#f1f5f9' }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]}>
                  {adminAnalytics.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
