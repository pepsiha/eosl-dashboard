import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3,
  Bell,
  Target,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  TrendingUp,
  FileText,
  Briefcase,
  Trophy,
  ChevronRight
} from 'lucide-react';

/**
 * 數據定義：嚴格對齊最新「測試.xlsx」檔案內容
 */
const rawData = {
  // 全所總結數據 (Summary Cards)
  overall: [
    { id: 'business', title: '企業業務 (全所)', target: 1232500, actual: 1100729, rate: 89.31 },
    { id: 'surplus', title: '業務餘絀 (全所)', target: 357000, actual: 364931, rate: 102.22 },
    { id: 'research', title: '科專研發成果收入 (全所)', target: 481426, actual: 457923, rate: 95.12 },
    { id: 'backlog', title: '115 backlog (全所)', target: 616250, actual: 559093, rate: 90.73 },
  ],
  // 各組詳細數據 (數據精確至個位數)
  groups: {
    business: [
      { name: 'E組', target: 131422, actual: 113931, rate: 86.69 },
      { name: 'J組', target: 87938, actual: 90062, rate: 102.41 },
      { name: 'K組', target: 125602, actual: 125101, rate: 99.68 },
      { name: 'M組', target: 156297, actual: 141519, rate: 90.54 },
      { name: 'N組', target: 114804, actual: 71318, rate: 62.12 },
      { name: 'P組', target: 72577, actual: 80041, rate: 110.28 },
      { name: 'R組', target: 156109, actual: 173783, rate: 111.32  },
      { name: 'S組', target: 117948, actual: 106414, rate: 90.22 },
      { name: 'T組', target: 123038, actual: 92314, rate: 75.03 },
      { name: 'W組', target: 121764, actual: 100046, rate: 82.16 },
    ],
    surplus: [
      { name: 'E組', target: 38253, actual: 35081, rate: 91.71 },
      { name: 'J組', target: 26202, actual: 26219, rate: 100.07 },
      { name: 'K組', target: 36019, actual: 37433, rate: 103.93 },
      { name: 'M組', target: 47093, actual: 68650, rate: 145.77 },
      { name: 'N組', target: 33561, actual: 21032, rate: 62.67 },
      { name: 'P組', target: 30078, actual: 28829, rate: 95.85 },
      { name: 'R組', target: 42754, actual: 42869, rate: 100.27 },
      { name: 'S組', target: 31377, actual: 34971, rate: 111.45 },
      { name: 'T組', target: 37650, actual: 48301, rate: 128.29 },
      { name: 'W組', target: 34013, actual: 27701, rate: 81.44 },
    ],
    research: [
      { name: 'E組', target: 54331, actual: 52574, rate: 96.77 },
      { name: 'J組', target: 33555, actual: 36928, rate: 100.05 },
      { name: 'K組', target: 47764, actual: 45938, rate: 96.18 },
      { name: 'M組', target: 62466, actual: 65618, rate: 105.05 },
      { name: 'N組', target: 41128, actual: 27827, rate: 67.66 },
      { name: 'P組', target: 41836, actual: 36082, rate: 86.25 },
      { name: 'R組', target: 62883, actual: 61622, rate: 98.00 },
      { name: 'S組', target: 43645, actual: 34155, rate: 78.26 },
      { name: 'T組', target: 47637, actual: 52435, rate: 110.07 },
      { name: 'W組', target: 46180, actual: 44609, rate: 96.60 },
    ],
    backlog: [
      { name: 'E組', target: 65711, actual: 50914, rate: 77.48 },
      { name: 'J組', target: 43969, actual: 18666, rate: 42.45 },
      { name: 'K組', target: 72000, actual: 77072, rate: 122.72 },
      { name: 'M組', target: 85000, actual: 77598, rate: 99.30 },
      { name: 'N組', target: 57402, actual: 52267, rate: 91.05 },
      { name: 'P組', target: 45789, actual: 38609, rate: 79.13 },
      { name: 'R組', target: 78055, actual: 102394, rate: 131.18 },
      { name: 'S組', target: 58974, actual: 39781, rate: 67.45 },
      { name: 'T組', target: 63000, actual: 41144, rate: 66.88 },
      { name: 'W組', target: 60882, actual: 60648, rate: 99.62 },
    ]
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('business');

  const navItems = [
    { id: 'business', name: '企業業務收入', icon: LayoutDashboard },
    { id: 'surplus', name: '業務餘絀', icon: TrendingUp },
    { id: 'research', name: '科專研發收入', icon: FileText },
    { id: 'backlog', name: '115 backlog', icon: Briefcase },
  ];

  const currentGroupData = rawData.groups[currentView];
  const activeLabel = navItems.find(i => i.id === currentView)?.name;

  const underperforming = [...currentGroupData]
    .filter(g => g.rate < 100)
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 3);

  const topPerforming = [...currentGroupData]
    .filter(g => g.rate >= 100)
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 3);

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-900 overflow-hidden">
      {/* 側邊導覽 - 僅在電腦版顯示 */}
      <aside className="w-72 bg-[#0f172a] text-white hidden lg:flex flex-col shrink-0 shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">114</div>
          <h1 className="font-bold text-lg tracking-wider italic">財務看板</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                currentView === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}概況</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* 主要內容區 */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* 頂部 Header & 手機版導覽 */}
        <header className="bg-white border-b shrink-0 z-20">
          <div className="h-14 lg:h-16 flex items-center justify-between px-4 lg:px-8">
            <h2 className="text-sm lg:text-lg font-bold text-slate-800 truncate uppercase flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-full hidden lg:block"></span>
              FY114 財務追蹤
            </h2>
            <div className="flex items-center gap-3 text-slate-500">
              <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">單位：千元</span>
              <Bell size={18} />
            </div>
          </div>

          {/* 手機版指標切換列 - 水平滑動 */}
          <div className="lg:hidden flex overflow-x-auto no-scrollbar border-t bg-slate-50 px-2 py-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  currentView === item.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                  : 'bg-white text-slate-500 border-slate-200 shadow-sm'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </header>

        {/* 捲動區域 */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
          
          {/* 全所四大指標卡片 - 已移除百萬國字，顯示完整數字 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {rawData.overall.map((item) => {
              const isTargetReached = item.rate >= 100;
              const isActive = currentView === item.id;
              return (
                <div 
                  key={item.id} 
                  className={`bg-white p-3 lg:p-5 border rounded-xl transition-all duration-300 ${
                    isActive ? 'border-blue-500 ring-2 ring-blue-50 shadow-md' : 'border-slate-100'
                  }`}
                >
                  <p className="text-[9px] lg:text-[11px] font-bold text-slate-400 uppercase mb-0.5 lg:mb-1 truncate">{item.title}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm lg:text-xl font-black text-slate-900 tabular-nums">
                      {item.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 lg:mt-3 flex justify-between items-center border-t border-slate-50 pt-2 lg:pt-3">
                    <span className="text-[8px] lg:text-[10px] text-slate-400 font-medium font-bold">達成</span>
                    <span className={`text-[11px] lg:text-sm font-black ${isTargetReached ? 'text-blue-600' : 'text-red-600'}`}>
                      {item.rate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* 左側：排行榜 (電腦版佔 1/3, 手機版排在上方) */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6 order-1">
              
              {/* 達標優選 */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm border-t-4 border-t-blue-500">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Trophy className="text-blue-600" size={18} />
                    <h3 className="font-bold text-sm lg:text-base">達標優選 (TOP 3)</h3>
                  </div>
                  <ArrowUp size={12} className="text-blue-400" />
                </div>
                <div className="space-y-2.5">
                  {topPerforming.map((group, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 bg-blue-50/40 rounded-lg border border-blue-100/50">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                        <span className="text-sm font-bold text-slate-700">{group.name}</span>
                      </div>
                      <span className="text-sm font-black text-blue-600 tabular-nums">{group.rate.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 未達標追蹤 */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm border-t-4 border-t-red-500">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="text-red-600" size={18} />
                    <h3 className="font-bold text-sm lg:text-base">關注追蹤 (底 3)</h3>
                  </div>
                  <ArrowDown size={12} className="text-red-400" />
                </div>
                <div className="space-y-2.5">
                  {underperforming.map((group, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 bg-red-50/40 rounded-lg border border-red-100/50">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                        <span className="text-sm font-bold text-slate-700">{group.name}</span>
                      </div>
                      <span className="text-sm font-black text-red-600 tabular-nums">{group.rate.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 右側：詳細圖表 (電腦版佔 2/3, 手機版排在下方) */}
            <div className="w-full lg:w-2/3 bg-white border border-slate-200 p-5 lg:p-6 rounded-2xl shadow-sm order-2 overflow-hidden">
              <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-blue-500" size={20} />
                  <h3 className="font-bold text-slate-800 text-sm lg:text-base">各組{activeLabel}達成率</h3>
                </div>
              </div>
              
              <div className="space-y-4 lg:space-y-5">
                {currentGroupData.map((group, index) => {
                  const isReached = group.rate >= 100;
                  return (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between text-[10px] lg:text-[11px] mb-1.5 px-0.5">
                        <span className="font-bold text-slate-600">{group.name}</span>
                        <span className="text-slate-400 tabular-nums">
                          目標: {group.target.toLocaleString()} / 達成: {group.rate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 lg:gap-4">
                        <div className="flex-1 h-2.5 bg-slate-50 rounded-full border border-slate-100 overflow-hidden p-[1px]">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${isReached ? 'bg-blue-600' : 'bg-red-600'}`} 
                            style={{ width: `${Math.min(group.rate, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-[11px] lg:text-[12px] font-black w-12 text-right tabular-nums ${isReached ? 'text-blue-600' : 'text-red-600'}`}>
                          {group.rate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 隱藏原生捲軸 (手機滑動優化) */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}