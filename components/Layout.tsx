
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'forecast' | 'report';
  setActiveTab: (tab: 'dashboard' | 'forecast' | 'report') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const handleExport = () => {
    const csvContent = `City,Date,Predicted_AQI,Category,PM25,NO2,SO2,Forecast_Lead
Lahore,2024-05-20,195,Unhealthy,125.4,48.2,13.1,1 Day
Lahore,2024-05-21,210,Very Unhealthy,142.1,52.5,15.2,2 Days
Lahore,2024-05-22,180,Unhealthy,110.5,42.1,11.8,3 Days
Karachi,2024-05-20,85,Moderate,28.4,24.5,8.9,1 Day
Karachi,2024-05-21,92,Moderate,32.1,26.8,9.4,2 Days
Karachi,2024-05-22,78,Moderate,24.5,21.2,7.5,3 Days`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'pakair_pollutant_forecasts.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-2 rounded-lg shadow-emerald-200 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter">PakAir<span className="text-emerald-600">ML</span></span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => setActiveTab('dashboard')} className={`text-xs uppercase font-black tracking-widest transition-colors ${activeTab === 'dashboard' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'text-slate-400 hover:text-slate-900'}`}>Dashboard</button>
              <button onClick={() => setActiveTab('forecast')} className={`text-xs uppercase font-black tracking-widest transition-colors ${activeTab === 'forecast' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'text-slate-400 hover:text-slate-900'}`}>Forecast Engine</button>
              <button onClick={() => setActiveTab('report')} className={`text-xs uppercase font-black tracking-widest transition-colors ${activeTab === 'report' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'text-slate-400 hover:text-slate-900'}`}>ML Report</button>
            </nav>
            <button onClick={handleExport} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              <span>Export Predictions</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">{children}</main>
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center opacity-50">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">© 2024 PAKAIR-ML SENSOR NETWORKS</p>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] flex space-x-4">
            <a href="#">Documentation</a>
            <a href="#">Open Data</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
