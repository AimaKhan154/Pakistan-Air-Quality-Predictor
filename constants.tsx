
import React from 'react';
import { CityData, AQICategory } from './types';

export const PAK_CITIES: CityData[] = [
  { id: 'lahore', name: 'Lahore', lat: 31.5204, lng: 74.3587, currentAQI: 185, currentCategory: 'Unhealthy', pm25: 120.5, pm10: 210.2, no2: 45.3, so2: 12.1, co: 2.4, o3: 38.5, temperature: 28, humidity: 45, windSpeed: 12 },
  { id: 'karachi', name: 'Karachi', lat: 24.8607, lng: 67.0011, currentAQI: 82, currentCategory: 'Moderate', pm25: 26.8, pm10: 65.4, no2: 22.1, so2: 8.4, co: 1.1, o3: 42.1, temperature: 32, humidity: 65, windSpeed: 18 },
  { id: 'islamabad', name: 'Islamabad', lat: 33.6844, lng: 73.0479, currentAQI: 55, currentCategory: 'Moderate', pm25: 14.2, pm10: 32.1, no2: 12.5, so2: 4.2, co: 0.6, o3: 35.8, temperature: 24, humidity: 40, windSpeed: 8 },
  { id: 'peshawar', name: 'Peshawar', lat: 34.0151, lng: 71.5249, currentAQI: 162, currentCategory: 'Unhealthy', pm25: 76.4, pm10: 145.8, no2: 38.2, so2: 15.6, co: 2.1, o3: 30.2, temperature: 27, humidity: 50, windSpeed: 10 },
  { id: 'faisalabad', name: 'Faisalabad', lat: 31.4504, lng: 73.1350, currentAQI: 145, currentCategory: 'Unhealthy for Sensitive Groups', pm25: 55.2, pm10: 110.5, no2: 32.1, so2: 10.2, co: 1.8, o3: 33.4, temperature: 29, humidity: 42, windSpeed: 11 },
  { id: 'multan', name: 'Multan', lat: 30.1575, lng: 71.5249, currentAQI: 130, currentCategory: 'Unhealthy for Sensitive Groups', pm25: 48.5, pm10: 95.0, no2: 28.4, so2: 9.1, co: 1.5, o3: 31.8, temperature: 31, humidity: 35, windSpeed: 14 },
];

export const getAQIColor = (category: AQICategory): string => {
  switch (category) {
    case 'Good': return '#10b981';
    case 'Moderate': return '#f59e0b';
    case 'Unhealthy for Sensitive Groups': return '#f97316';
    case 'Unhealthy': return '#ef4444';
    case 'Very Unhealthy': return '#8b5cf6';
    case 'Hazardous': return '#7f1d1d';
    default: return '#94a3b8';
  }
};

export const getAQIBGColor = (category: AQICategory): string => {
  switch (category) {
    case 'Good': return 'bg-emerald-100 text-emerald-800';
    case 'Moderate': return 'bg-amber-100 text-amber-800';
    case 'Unhealthy for Sensitive Groups': return 'bg-orange-100 text-orange-800';
    case 'Unhealthy': return 'bg-red-100 text-red-800';
    case 'Very Unhealthy': return 'bg-purple-100 text-purple-800';
    case 'Hazardous': return 'bg-rose-900 text-white';
    default: return 'bg-slate-100 text-slate-800';
  }
};

export const getAQIDescription = (category: AQICategory): string => {
  switch (category) {
    case 'Good': return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
    case 'Moderate': return 'Air quality is acceptable; however, for some pollutants, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
    case 'Unhealthy for Sensitive Groups': return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
    case 'Unhealthy': return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
    case 'Very Unhealthy': return 'Health alert: everyone may experience more serious health effects.';
    case 'Hazardous': return 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
    default: return '';
  }
};
