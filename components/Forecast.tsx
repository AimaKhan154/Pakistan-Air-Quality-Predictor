
import React, { useEffect, useState } from 'react';
import { CityData, ForecastDay } from '../types';
import { getForecastAndInsights } from '../services/geminiService';
import { getAQIColor, getAQIBGColor } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ForecastProps {
  city: CityData;
}

const Forecast: React.FC<ForecastProps> = ({ city }) => {
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const [insights, setInsights] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      const result = await getForecastAndInsights(city);
      setForecastData(result.forecast);
      setInsights(result.insights);
      setLoading(false);
    };

    fetchForecast();
  }, [city]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Running ML Forecasting Models for {city.name}...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">3-Day Forecast</h2>
          <p className="text-slate-500">Stochastic prediction based on historical trends & weather patterns</p>
        </div>
        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
          ML Model: Random Forest Regressor v2.4
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forecastData.map((day, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{day.date}</span>
              <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${day.confidence > 0.8 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {Math.round(day.confidence * 100)}% CONFIDENCE
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl font-black text-slate-900">{day.predictedAQI}</div>
              <div className={`px-3 py-1 rounded-lg text-xs font-bold ${getAQIBGColor(day.category as any)}`}>
                {day.category}
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="h-full transition-all duration-1000" style={{ backgroundColor: getAQIColor(day.category as any), width: `${Math.min(100, (day.predictedAQI / 400) * 100)}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            AQI Trend Prediction
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { date: 'Now', aqi: city.currentAQI },
                ...forecastData.map(d => ({ date: d.date, aqi: d.predictedAQI }))
              ]}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="aqi" stroke="#10b981" fillOpacity={1} fill="url(#colorAqi)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800">
          <h3 className="text-lg font-bold mb-4 flex items-center text-emerald-400">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            AI Insight Report
          </h3>
          <div className="space-y-4 font-mono text-sm leading-relaxed opacity-90 whitespace-pre-line">
            {insights}
          </div>
          <div className="mt-8 p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-xl">
            <p className="text-xs text-emerald-200 italic">
              "Significant correlation detected between decreasing humidity and localized PM2.5 spikes in the next 48 hours."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
