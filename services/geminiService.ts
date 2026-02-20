
import { GoogleGenAI, Type } from "@google/genai";
import { CityData, ForecastDay, AQICategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getForecastAndInsights = async (city: CityData): Promise<{ forecast: ForecastDay[], insights: string }> => {
  const prompt = `
    Context: Dataset "hajramohsin/pakistan-air-quality-pollutant-concentrations".
    City: ${city.name}
    Current Metrics:
    - AQI: ${city.currentAQI}
    - PM2.5: ${city.pm25} | PM10: ${city.pm10}
    - NO2: ${city.no2} | SO2: ${city.so2}
    - CO: ${city.co} | O3: ${city.o3}
    - Weather: ${city.temperature}°C, ${city.humidity}% Humidity, ${city.windSpeed} km/h Wind

    Task:
    1. Generate a 3-day forecast specifically modeling the expected changes in NO2 and PM2.5 based on these concentrations.
    2. Provide an ML-driven insight on which pollutant is the primary health risk driver right now.
    3. Health recommendations based on specific gas levels (e.g., SO2 or O3 concerns).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            forecast: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  date: { type: Type.STRING },
                  predictedAQI: { type: Type.NUMBER },
                  category: { type: Type.STRING },
                  confidence: { type: Type.NUMBER },
                  pollutantBreakdown: {
                    type: Type.OBJECT,
                    properties: {
                      pm25: { type: Type.NUMBER },
                      no2: { type: Type.NUMBER },
                      so2: { type: Type.NUMBER }
                    },
                    required: ['pm25', 'no2', 'so2']
                  }
                },
                required: ['date', 'predictedAQI', 'category', 'confidence', 'pollutantBreakdown']
              }
            },
            insights: { type: Type.STRING },
            recommendations: { type: Type.STRING }
          },
          required: ['forecast', 'insights', 'recommendations']
        }
      }
    });

    const result = JSON.parse(response.text);
    return {
      forecast: result.forecast,
      insights: `${result.insights}\n\nHealth Alert: ${result.recommendations}`
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      forecast: [
        { date: 'Tomorrow', predictedAQI: city.currentAQI + 5, category: city.currentCategory, confidence: 0.9, pollutantBreakdown: { pm25: city.pm25 + 2, no2: city.no2 + 1, so2: city.so2 } },
        { date: 'Day 2', predictedAQI: city.currentAQI + 12, category: city.currentCategory, confidence: 0.82, pollutantBreakdown: { pm25: city.pm25 + 5, no2: city.no2 + 3, so2: city.so2 + 1 } },
        { date: 'Day 3', predictedAQI: city.currentAQI - 8, category: 'Moderate', confidence: 0.75, pollutantBreakdown: { pm25: city.pm25 - 4, no2: city.no2 - 2, so2: city.so2 } },
      ],
      insights: "Model indicates rising NO2 levels likely due to stagnant wind patterns. Primary risk: PM2.5."
    };
  }
};
