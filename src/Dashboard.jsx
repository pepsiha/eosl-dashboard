import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3,
  Bell,
  Target,
  AlertTriangle,
  ArrowDown,
  TrendingUp,
  FileText,
  Briefcase
} from 'lucide-react';

/**
 * 數據定義：嚴格對齊最新「測試.xlsx」檔案
 * 已修正 W組 Backlog: 目標 60,882 / 預估 60,448 (達成率 99.29%)
 */
const rawData = {
  // 全所總結數據 (Summary Cards)
  overall: [
    { id: 'business', title: '企業業務 (全所)', target: 1232499, actual: 1143092, rate: 92.75 },
    { id: 'surplus', title: '業務餘絀 (全所)', target: 357000, actual: 373053, rate: 104.50 },
    { id: 'research', title: '科專研發成果收入 (全所)', target: 481425, actual: 454628, rate: 94.43 },
    { id: 'backlog', title: '115 backlog (全所)', target: 616251, actual: 604206, rate: 98.05 },
  ],
  // 各組詳細數據 (數據精確至個位數)
  groups: {
    business: [
      { name: 'E組', target: 131422, actual: 113822, rate: 86.61 },
      { name: 'J組', target: 87938, actual: 87941, rate: 100.00 },
      { name: 'K組', target: 125602, actual: 125536, rate: 99.95 },
      { name: 'M組', target: 156297, actual: 140685, rate: 90.01 },
      { name: 'N組', target: 114804, actual: 107104, rate: 93.29 },
      { name: 'P組', target: 91577, actual: 91578, rate: 100.00 },
      { name: 'R組', target: 156109, actual: 172886, rate: 110.75 },
      { name: 'S組', target: 117948, actual: 106155, rate: 90.00 },
      { name: 'T組', target: 123038, actual: 97137, rate: 78.95 },
      { name: 'W組', target: 121764, actual: 100248, rate: 82.33 },
    ],
    surplus: [
      { name: 'E組', target: 38253, actual: 34500, rate: 90.19 },
      { name: 'J組', target: 26202, actual: 26248, rate: 100.18 },
      { name: 'K組', target: 42721, actual: 38400, rate: 89.89 },
      { name: 'M組', target: 51336, actual: 46100, rate: 89.80 },
      { name: 'N組', target: 33561, actual: 33700, rate: 100.41 },
      { name: 'P組', target: 30078, actual: 28300, rate: 94.09 },
      { name: 'R組', target: 35836, actual: 48000, rate: 133.94 },
      { name: 'S組', target: 31377, actual: 32737, rate: 104.33 },
      { name: 'T組', target: 31541, actual: 31500, rate: 99.87 },
      { name: 'W組', target: 33503, actual: 29000, rate: 86.56 },
    ],
    research: [
      { name: 'E組', target: 54331, actual: 51615, rate: 95.00 },
      { name: 'J組', target: 33555, actual: 33579, rate: 100.07 },
      { name: 'K組', target: 41000, actual: 28000, rate: 68.29 },
      { name: 'M組', target: 52000, actual: 38000, rate: 73.08 },
      { name: 'N組', target: 27128, actual: 27137, rate: 100.03 },
      { name: 'P組', target: 35836, actual: 36081, rate: 100.68 },
      { name: 'R組', target: 55000, actual: 56000, rate: 101.82 },
      { name: 'S組', target: 43465, actual: 37343, rate: 85.92 },
      { name: 'T組', target: 44000, actual: 41000, rate: 93.18 },
      { name: 'W組', target: 48000, actual: 29001, rate: 60.42 },
    ],
    backlog: [
      { name: 'E組', target: 65711, actual: 67279, rate: 102.39 },
      { name: 'J組', target: 43969, actual: 28091, rate: 63.89 },
      { name: 'K組', target: 72000, actual: 71800, rate: 99.72 },
      { name: 'M組', target: 85000, actual: 84000, rate: 98.82 },
      { name: 'N組', target: 57402, actual: 56126, rate: 97.78 },
      { name: 'P組', target: 45789, actual: 42400, rate: 92.60 },
      { name: 'R組', target: 78055, actual: 97168, rate: 124.49 },
      { name: 'S組', target: 58974, actual: 58000, rate: 98.35 },
      { name: 'T組', target: 63000, actual: 62000, rate: 98.41 },
      { name: 'W組', target: 60882, actual: 60448, rate: 99.29 },
    ]
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('business');

  const navItems = [
    { id: 'business', name: '114年度全所企業業務收入概況', icon: LayoutDashboard },
    { id: 'surplus', name: '業務餘絀概況', icon: TrendingUp },
    { id: 'research', name: '科專研發成果收入概況', icon: FileText },
    { id: 'backlog', name: '115 backlog 概況', icon: Briefcase },
  ];

  const currentGroupData = rawData.groups[currentView];
  const viewTitle = navItems.find(i => i.id === currentView)?.name.replace('概況', '').replace('114年度全所', '');

  // 篩選未達標組並由低至高排序
  const underperforming = [...currentGroupData]
    .filter(g => g.rate < 100)
    .sort((a, b) => a.rate - b.rate);

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans">
      {/* 側邊導覽 */}
      <aside className="w-72 bg-[#0f172a] text-white hidden md:flex flex-col shrink-0 shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">114</div>
          <h1 className="font-bold text-lg tracking-wider italic">EOSL 財務看板</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">指標維度切換</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-left leading-snug ${
                currentView === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="text-[10px] text-slate-500 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            精確數據源：測試.xlsx
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <h2 className="text-lg font-bold text-slate-800 uppercase flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            FY114 財務目標追蹤看板
          </h2>
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span className="bg-slate-100 px-2 py-1 rounded-md text-[11px] font-bold text-slate-600 border border-slate-200 uppercase tracking-tighter">單位：千元</span>
            <Bell size={18} />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 text-slate-900">
          {/* 四大全所指標卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {rawData.overall.map((item) => {
              const isTargetReached = item.rate >= 100;
              const isActive = currentView === item.id;
              return (
                <div key={item.id} className={`bg-white p-5 border shadow-sm rounded-xl transition-all duration-300 ${isActive ? 'border-blue-500 ring-4 ring-blue-50 scale-[1.03] shadow-md' : 'border-slate-200'}`}>
                  <p className="text-[11px] font-bold text-slate-400 uppercase mb-1 tracking-tight">{item.title}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900 tabular-nums">{item.target.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center border-t border-slate-50 pt-3">
                    <span className="text-[11px] text-slate-400 font-medium">預估達成率</span>
                    <span className={`text-sm font-black ${isTargetReached ? 'text-blue-600' : 'text-red-600'}`}>
                      {item.rate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 各組達成率圖表 */}
            <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Target size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">各組{viewTitle}達成率</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {currentGroupData.map((group, index) => {
                  const isReached = group.rate >= 100;
                  return (
                    <div key={index} className="group">
                      <div className="flex justify-between text-[11px] mb-2 px-1 transition-all group-hover:translate-x-1">
                        <span className="font-bold text-slate-700">{group.name}</span>
                        <span className="text-slate-400 font-medium tracking-tighter tabular-nums">
                          目標: {group.target.toLocaleString()} / 預估: {group.actual.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-[1.5px]">
                          <div 
                            className={`h-full transition-all duration-1000 ease-out rounded-full ${isReached ? 'bg-blue-600 shadow-sm' : 'bg-red-600 shadow-sm'}`} 
                            style={{ width: `${Math.min(group.rate, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-[12px] font-black w-16 text-right tabular-nums ${isReached ? 'text-blue-600' : 'text-red-600'}`}>
                          {group.rate.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 右側：未達標組追蹤 */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800">未達標組追蹤 ({viewTitle})</h3>
                </div>
                <ArrowDown size={14} className="text-slate-300 animate-bounce" />
              </div>
              
              <div className="space-y-3.5 flex-1 text-slate-900">
                {underperforming.map((group, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-red-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-black">
                        {i + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-800">{group.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-red-600 block tabular-nums">{group.rate.toFixed(2)}%</span>
                      <span className="text-[10px] text-slate-400 font-medium tabular-nums">差額: {(group.target - group.actual).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                
                {underperforming.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3 text-center py-24">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-2 border-2 border-blue-100">
                      <Target size={32} />
                    </div>
                    <p className="text-sm font-black text-slate-600">全數達標</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}