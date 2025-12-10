import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Grades from './components/Grades';
import Fees from './components/Fees';
import Timetable from './components/Timetable';
import { ViewState } from './types';
import { ClipboardList } from 'lucide-react';

const AttendancePlaceholder = () => (
    <div className="bg-white p-12 rounded-xl text-center border border-gray-100 shadow-sm animate-fade-in">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Module Absences</h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Ce module permet de faire l'appel en classe et d'envoyer des notifications SMS automatiques aux parents.
        </p>
        <button className="mt-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
            Faire l'appel (Demo)
        </button>
    </div>
)

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'STUDENTS':
        return <Students />;
      case 'GRADES':
        return <Grades />;
      case 'FEES':
        return <Fees />;
      case 'TIMETABLE':
        return <Timetable />;
      case 'ATTENDANCE':
        return <AttendancePlaceholder />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;