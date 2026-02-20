
import React from 'react';
import { PAK_CITIES, getAQIColor, getAQIBGColor, getAQIDescription } from '../constants';
import { CityData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  selectedCity: CityData;
  setSelectedCity: (city: CityData) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedCity, setSelectedCity }) => {
  const chartData = PAK_CITIES.map(c => ({
    name: c.name,
    aqi: c.currentAQI,
    color: getAQIColor(c.currentCategory)
  })).sort((a, b) => b.aqi - a.aqi);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* City Selector */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-4">Monitoring Stations</label>
            <div className="space-y-2">
              {PAK_CITIES.map(city => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    selectedCity.id === city.id 
                    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100' 
                    : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: getAQIColor(city.currentCategory) }}></div>
                    <span className={`text-sm font-medium ${selectedCity.id === city.id ? 'text-emerald-900' : 'text-slate-700'}`}>{city.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">AQI: {city.currentAQI}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bonus Ranking */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center uppercase tracking-widest opacity-60">
              Risk Ranking
            </h3>
            <div className="space-y-4">
              {chartData.map((city, idx) => (
                <div key={city.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-slate-300 w-4">{idx + 1}</span>
                    <span className="text-xs font-semibold text-slate-700">{city.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-600">AQI {city.aqi}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Pollutant Data */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedCity.name} <span className="text-emerald-600">Pollutant Analysis</span></h2>
                <p className="text-slate-500 text-sm font-medium">Detailed concentrations derived from Kaggle Datasets</p>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 text-emerald-700 font-bold text-xs mt-4 md:mt-0">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>DATA UPDATED: TODAY</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
              <MetricCard label="PM2.5" value={selectedCity.pm25} unit="µg/m³" color="#10b981" />
              <MetricCard label="PM10" value={selectedCity.pm10} unit="µg/m³" color="#f59e0b" />
              <MetricCard label="NO2" value={selectedCity.no2} unit="ppb" color="#ef4444" />
              <MetricCard label="SO2" value={selectedCity.so2} unit="ppb" color="#3b82f6" />
              <MetricCard label="CO" value={selectedCity.co} unit="ppm" color="#8b5cf6" />
              <MetricCard label="O3" value={selectedCity.o3} unit="ppb" color="#f97316" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[300px]">
                <h4 className="text-xs font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Cross-City AQI Comparison</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" fontSize={10} axisLine={false} tickLine={false} width={80} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="aqi" radius={[0, 4, 4, 0]} barSize={20}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-6">
                <div className={`p-6 rounded-2xl ${getAQIBGColor(selectedCity.currentCategory)} border border-white/20 shadow-inner`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-4xl font-black">{selectedCity.currentAQI} <span className="text-base font-normal opacity-70">AQI</span></div>
                    <span className="text-sm font-bold uppercase tracking-widest">{selectedCity.currentCategory}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed opacity-90">{getAQIDescription(selectedCity.currentCategory)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Humidity</div>
                    <div className="text-xl font-black text-slate-800">{selectedCity.humidity}%</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Temp</div>
                    <div className="text-xl font-black text-slate-800">{selectedCity.temperature}°C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, unit, color }: { label: string, value: number, unit: string, color: string }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-2" style={{ color }}>{label}</div>
    <div>
      <div className="text-xl font-black text-slate-900">{value}</div>
      <div className="text-[9px] font-bold text-slate-400 uppercase">{unit}</div>
    </div>
  </div>
);

export default Dashboard;
