import React, { useState, useEffect } from 'react';

const GITHUB_USERNAME = "Somya-05-design";

// Format date string 'YYYY-MM-DD' into 'MMM DD, YYYY'
function formatDate(dateStr) {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr + 'T00:00:00Z');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[dateObj.getUTCMonth()]} ${dateObj.getUTCDate()}, ${dateObj.getUTCFullYear()}`;
}

// Map contribution level to GitHub's official dark mode calendar colors
function getLevelColor(level) {
  switch (level) {
    case 1: return '#0e4429';
    case 2: return '#006d32';
    case 3: return '#26a641';
    case 4: return '#39d353';
    default: return '#161b22';
  }
}

// Convert raw API contribution days array into GitHub's calendar grid structure
function buildCalendarGrid(days) {
  if (!days || days.length === 0) return { weeks: [], months: [], totalContributions: 0 };

  let totalContributions = 0;
  const weeks = [];
  let currentWeek = [];

  const firstDayObj = new Date(days[0].date + 'T00:00:00Z');
  const firstWeekday = firstDayObj.getUTCDay(); // 0 = Sunday, 6 = Saturday

  // Pad first week if it doesn't start on Sunday
  for (let i = 0; i < firstWeekday; i++) {
    currentWeek.push({ isPlaceholder: true, weekday: i });
  }

  days.forEach(day => {
    totalContributions += (day.count || 0);
    const dObj = new Date(day.date + 'T00:00:00Z');
    const weekday = dObj.getUTCDay();

    if (weekday === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push({ ...day, weekday });
  });

  if (currentWeek.length > 0) {
    // Pad last week if incomplete
    while (currentWeek.length < 7) {
      currentWeek.push({ isPlaceholder: true, weekday: currentWeek.length });
    }
    weeks.push(currentWeek);
  }

  // Calculate month labels and their week column indices
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const months = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIdx) => {
    const firstRealDay = week.find(d => !d.isPlaceholder);
    if (firstRealDay) {
      const month = new Date(firstRealDay.date + 'T00:00:00Z').getUTCMonth();
      if (month !== lastMonth) {
        months.push({ name: monthNames[month], weekIdx });
        lastMonth = month;
      }
    }
  });

  return { weeks, months, totalContributions };
}

export default function GitHubHeatmap() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [availableYears, setAvailableYears] = useState(['2026', '2025', '2024']);
  const [calendarData, setCalendarData] = useState({ weeks: [], months: [], totalContributions: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContributions = async (yearStr) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${yearStr}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch GitHub data (${res.status})`);
      }
      const data = await res.json();
      
      const parsedGrid = buildCalendarGrid(data.contributions || []);
      setCalendarData(parsedGrid);

      if (data.total && Object.keys(data.total).length > 0) {
        const years = Object.keys(data.total).sort((a, b) => b - a);
        setAvailableYears(years);
      }
    } catch (err) {
      console.error('GitHub fetch error:', err);
      setError(err.message || 'Unable to fetch GitHub contributions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions(selectedYear);
  }, [selectedYear]);

  const { weeks, months, totalContributions } = calendarData;

  const getYearLabel = (yr) => {
    if (yr === 'last') return 'Last year';
    return yr;
  };

  return (
    <section className="w-full max-w-4xl mt-12 pb-10 font-mono text-center mx-auto px-4 select-none">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white text-xl tracking-widest uppercase font-bold">Personal GitHub Activity</h2>
      </div>

      {/* Main Heatmap Container */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl p-6 shadow-2xl overflow-hidden">
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <span className="material-symbols-outlined text-green-400 animate-spin text-3xl">sync</span>
            <div className="text-xs text-gray-500 font-mono">Fetching actual GitHub contribution graph...</div>
          </div>
        ) : error ? (
          /* Error Fallback */
          <div className="py-8 flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-red-500 text-3xl">error</span>
            <div className="text-sm text-gray-400 font-bold">{error}</div>
            <button 
              onClick={() => fetchContributions(selectedYear)}
              className="px-4 py-2 border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-black rounded text-xs transition-colors flex items-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-xs">refresh</span>
              Retry Connection
            </button>
          </div>
        ) : (
          /* Calendar & Year Selector Layout */
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-x-auto">
            
            {/* Left side: Grid with weekday labels and month headers */}
            <div className="flex items-start gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              
              {/* Weekday Labels (Sun-Sat rows) */}
              <div className="flex flex-col gap-[3px] text-[9px] md:text-[10px] text-gray-500 pt-5 pr-1 select-none font-mono flex-shrink-0">
                <span className="h-2.5 md:h-3 leading-[10px] md:leading-3 opacity-0">Sun</span>
                <span className="h-2.5 md:h-3 leading-[10px] md:leading-3">Mon</span>
                <span className="h-2.5 md:h-3 leading-[10px] md:leading-3 opacity-0">Tue</span>
                <span className="h-2.5 md:h-3 leading-[10px] md:leading-3">Wed</span>
                <span className="h-2.5 md:h-3 leading-[10px] md:leading-3 opacity-0">Thu</span>
                <span className="h-2.5 md:h-3 leading-[10px] md:leading-3">Fri</span>
                <span className="h-2.5 md:h-3 leading-[10px] md:leading-3 opacity-0">Sat</span>
              </div>

              {/* Calendar Grid Container */}
              <div className="flex flex-col flex-shrink-0">
                
                {/* Month Headers */}
                <div className="flex gap-[3px] text-[10px] text-gray-400 mb-1 h-4 relative select-none font-mono">
                  {weeks.map((_, weekIdx) => {
                    const monthObj = months.find(m => m.weekIdx === weekIdx);
                    return (
                      <div key={weekIdx} className="w-2.5 md:w-3 flex-shrink-0 relative">
                        {monthObj && (
                          <span className="absolute left-0 top-0 text-[10px] text-gray-400 whitespace-nowrap">
                            {monthObj.name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 53-Week Grid (Columns = Weeks, Rows = Days 0..6) */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px] flex-shrink-0">
                      {week.map((day, dayIdx) => {
                        if (day.isPlaceholder) {
                          return (
                            <div 
                              key={`ph-${weekIdx}-${dayIdx}`} 
                              className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px] opacity-0 pointer-events-none" 
                            />
                          );
                        }

                        const count = day.count || 0;
                        const formattedDate = formatDate(day.date);
                        const tooltip = count === 0 
                          ? `No contributions on ${formattedDate}` 
                          : `${count} contribution${count === 1 ? '' : 's'} on ${formattedDate}`;

                        return (
                          <div
                            key={day.date}
                            title={tooltip}
                            style={{ 
                              backgroundColor: getLevelColor(day.level),
                              border: day.level === 0 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none'
                            }}
                            className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px] transition-transform duration-100 hover:scale-125 cursor-pointer"
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Year Switcher */}
            <div className="flex flex-row md:flex-col gap-1.5 text-xs text-gray-500 self-center md:self-start flex-shrink-0">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 border rounded transition-all whitespace-nowrap font-bold ${
                    selectedYear === yr 
                      ? 'border-green-500 text-white bg-green-950/30' 
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-800'
                  }`}
                >
                  {getYearLabel(yr)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        {!loading && !error && (
          <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-gray-400 select-none">
            <span>Less</span>
            <div className="flex gap-1 items-center">
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-gray-800" title="No contributions" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" title="1-2 contributions" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" title="3-4 contributions" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" title="5-6 contributions" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" title="7+ contributions" />
            </div>
            <span>More</span>
          </div>
        )}
      </div>
    </section>
  );
}
