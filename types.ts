
export type AQICategory = 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';

export interface CityData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  currentAQI: number;
  currentCategory: AQICategory;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export interface ForecastDay {
  date: string;
  predictedAQI: number;
  category: AQICategory;
  confidence: number;
  pollutantBreakdown: {
    pm25: number;
    no2: number;
    so2: number;
  };
}

export interface PredictionResult {
  cityId: string;
  forecast: ForecastDay[];
  insights: string;
}

export interface HistoricDataPoint {
  date: string;
  aqi: number;
  pm25: number;
}
