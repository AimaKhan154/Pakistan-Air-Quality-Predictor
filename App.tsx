
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Forecast from './components/Forecast';
import Report from './components/Report';
import { PAK_CITIES } from './constants';
import { CityData } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'forecast' | 'report'>('dashboard');
  const [selectedCity, setSelectedCity] = useState<CityData>(PAK_CITIES[0]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <Dashboard 
          selectedCity={selectedCity} 
          setSelectedCity={setSelectedCity} 
        />
      )}
      {activeTab === 'forecast' && (
        <Forecast city={selectedCity} />
      )}
      {activeTab === 'report' && (
        <Report />
      )}
    </Layout>
  );
};

export default App;
