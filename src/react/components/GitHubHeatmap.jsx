import React, { useState, useEffect } from 'react';

const GITHUB_USERNAME = "Somya-05-design";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

export default function GitHubHeatmap() {
  const [contributions, setContributions] = useState([]);
  const [availableYears, setAvailableYears] = useState(['2026', '2025', '2024', '2023']);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContributions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use official GitHub GraphQL API if a secret token is provided in .env
      if (GITHUB_TOKEN) {
        const query = `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `;
        const res = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
        });

        if (res.ok) {
          const json = await res.json();
          const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
          if (calendar) {
            const daysList = [];
            calendar.weeks.forEach(week => {
              week.contributionDays.forEach(day => {
                let level = 0;
                if (day.contributionCount > 0 && day.contributionCount <= 2) level = 1;
                else if (day.contributionCount <= 4) level = 2;
                else if (day.contributionCount <= 6) level = 3;
                else if (day.contributionCount >= 7) level = 4;
                daysList.push({
                  date: day.date,
                  count: day.contributionCount,
                  level
                });
              });
            });
            setContributions(daysList);
            const years = Array.from(new Set(daysList.map(d => d.date.split('-')[0]))).sort((a, b) => b - a);
            if (years.length > 0) {
              setAvailableYears(years);
              if (!years.includes(selectedYear)) {
                setSelectedYear(years[0]);
              }
            }
            setLoading(false);
            return;
          }
        }
      }

      // Public API fallback
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`);
      if (!response.ok) {
        throw new Error('Failed to retrieve GitHub contributions');
      }
      const data = await response.json();
      
      // Save all contributions
      setContributions(data.contributions || []);
      
      // Determine available years dynamically if present
      if (data.total && Object.keys(data.total).length > 0) {
        const years = Object.keys(data.total).sort((a, b) => b - a);
        setAvailableYears(years);
        if (!years.includes(selectedYear)) {
          setSelectedYear(years[0]);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to connect to Github Contributions API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // Filter contributions by selected year
  const filteredData = contributions.filter(day => day.date.startsWith(selectedYear));

  // Determine background color level based on contribution level
  const getLevelClass = (level) => {
    switch (level) {
      case 1: return 'bg-gray-700 hover:scale-125';
      case 2: return 'bg-gray-600 hover:scale-125';
      case 3: return 'bg-gray-500 hover:scale-125';
      case 4: return 'bg-white hover:scale-125';
      default: return 'bg-gray-800 hover:bg-gray-700';
    }
  };

  // Group contributions by month to display headings dynamically
  const renderMonthHeadings = () => {
    if (loading || error || filteredData.length === 0) {
      return (
        <div className="flex justify-between text-[10px] text-gray-500 mb-2 px-1">
          <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
        </div>
      );
    }

    // Standard list of months
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Find unique months in the filtered data and estimate their placement index
    const headings = [];
    let currentMonth = -1;
    
    // Scan filteredData in steps to place headings
    filteredData.forEach((day, index) => {
      const dateObj = new Date(day.date);
      const month = dateObj.getMonth();
      
      if (month !== currentMonth) {
        currentMonth = month;
        // Group columns approximate: index / 7 is week index
        headings.push({
          name: monthNames[month],
          weekIdx: Math.floor(index / 7)
        });
      }
    });

    return (
      <div className="flex justify-between text-[10px] text-gray-500 mb-2 px-1 relative w-full h-4">
        {headings.map((h, i) => (
          <span 
            key={`${h.name}-${i}`} 
            style={{ 
              position: 'absolute', 
              left: `${(h.weekIdx / 53) * 100}%` 
            }}
            className="transform -translate-x-1/2"
          >
            {h.name}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full max-w-4xl mt-12 pb-10 font-mono text-center mx-auto px-4 select-none">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-white text-xl tracking-widest uppercase font-bold">Personal GitHub Activity</h2>
        <p className="text-gray-400 text-sm mt-1">(Work commits are hiding in private dimensions)</p>
      </div>

      {/* Main Heatmap Widget Container */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl p-6 shadow-2xl">
        {loading ? (
          /* Loading Skeleton */
          <div className="flex items-center justify-center flex-col gap-4 py-8">
            <div className="text-xs text-gray-500 animate-pulse mb-2">Loading contributions from GitHub...</div>
            <div className="flex items-center justify-center gap-4 overflow-x-auto w-full pb-4">
              <div className="grid grid-flow-col grid-rows-7 gap-1 animate-pulse">
                {Array.from({ length: 371 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-800/40 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          /* Error Fallback */
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <span className="material-symbols-outlined text-red-500 text-4xl">error</span>
            <div className="text-sm text-gray-400 font-bold">{error}</div>
            <button 
              onClick={fetchContributions}
              className="px-4 py-2 border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-black rounded text-xs transition-colors flex items-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-xs">refresh</span>
              Retry Connection
            </button>
          </div>
        ) : (
          /* Success Grid & Year Selector */
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            
            {/* Heatmap Grid */}
            <div className="flex flex-col overflow-x-auto w-full max-w-2xl pb-4">
              {renderMonthHeadings()}
              <div className="grid grid-flow-col grid-rows-7 gap-1 w-full min-w-[600px] justify-between">
                {filteredData.map((day) => (
                  <div 
                    key={day.date} 
                    title={`${day.date}: ${day.count} commits`}
                    className={`w-3 h-3 rounded-sm transition-transform duration-100 cursor-help ${getLevelClass(day.level)}`}
                  />
                ))}
              </div>
            </div>

            {/* Year Selector */}
            <div className="flex flex-row md:flex-col gap-1.5 text-xs text-gray-500 justify-center">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 border rounded transition-all whitespace-nowrap font-bold ${
                    selectedYear === year 
                      ? 'border-green-500 text-white bg-green-950/20' 
                      : 'border-transparent hover:text-gray-300 hover:border-gray-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        {!loading && !error && (
          <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-gray-400">
            <span>Less</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-gray-800 rounded-sm" title="0 commits"></div>
              <div className="w-3 h-3 bg-gray-700 rounded-sm" title="1-2 commits"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-sm" title="3-4 commits"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-sm" title="5-6 commits"></div>
              <div className="w-3 h-3 bg-white rounded-sm" title="7+ commits"></div>
            </div>
            <span>More</span>
          </div>
        )}
      </div>
    </section>
  );
}
