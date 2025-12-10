import React from 'react';
import { TIMETABLE_DATA } from '../constants';

const Timetable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold text-gray-900">Emploi du temps</h2>
            <p className="text-gray-500 text-sm">Classe: 3ème B - Semaine 42</p>
        </div>
        <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Précédent</button>
            <button className="px-3 py-1 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700">Aujourd'hui</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Suivant</button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b border-r border-gray-100 bg-gray-50 w-32 min-w-[120px]">Horaire</th>
              <th className="p-4 border-b border-gray-100 bg-gray-50 w-1/5 min-w-[150px]">Lundi</th>
              <th className="p-4 border-b border-gray-100 bg-gray-50 w-1/5 min-w-[150px]">Mardi</th>
              <th className="p-4 border-b border-gray-100 bg-gray-50 w-1/5 min-w-[150px]">Mercredi</th>
              <th className="p-4 border-b border-gray-100 bg-gray-50 w-1/5 min-w-[150px]">Jeudi</th>
              <th className="p-4 border-b border-gray-100 bg-gray-50 w-1/5 min-w-[150px]">Vendredi</th>
            </tr>
          </thead>
          <tbody>
            {TIMETABLE_DATA.map((row, index) => (
              <tr key={index}>
                <td className="p-4 border-b border-r border-gray-100 font-medium text-gray-500 text-center">{row.time}</td>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => {
                    const content = row[day as keyof typeof row];
                    const isPause = content === 'PAUSE';
                    return (
                        <td key={day} className={`p-4 border-b border-gray-100 ${isPause ? 'bg-gray-50/50' : 'hover:bg-blue-50/30 transition-colors'}`}>
                            {isPause ? (
                                <span className="text-gray-300 text-xs uppercase tracking-widest block text-center">Pause</span>
                            ) : (
                                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm border-l-4 border-l-brand-500">
                                    <p className="font-semibold text-gray-900">{content.split('(')[0]}</p>
                                    <p className="text-xs text-gray-500 mt-1">{content.match(/\((.*?)\)/)?.[1]}</p>
                                </div>
                            )}
                        </td>
                    );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;