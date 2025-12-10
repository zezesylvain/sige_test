import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { MOCK_STUDENTS } from '../constants';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.classGrade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Liste des Élèves</h2>
          <p className="text-gray-500 text-sm mt-1">Gérez les dossiers et les informations des élèves</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un élève..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter size={18} />
            Filtres
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-4">Élève</th>
              <th className="px-6 py-4">Classe</th>
              <th className="px-6 py-4">Contact Parent</th>
              <th className="px-6 py-4">Assiduité</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={student.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900">{student.firstName} {student.lastName}</p>
                      <p className="text-gray-500 text-xs">ID: {student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-medium border border-brand-100">
                    {student.classGrade}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Mail size={14} /> {student.parentEmail}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 w-24">
                      <div 
                        className={`h-2 rounded-full ${student.attendanceRate > 90 ? 'bg-green-500' : student.attendanceRate > 80 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${student.attendanceRate}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{student.attendanceRate}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-brand-600 p-1">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredStudents.length === 0 && (
        <div className="p-8 text-center text-gray-500">
            Aucun élève trouvé.
        </div>
      )}
    </div>
  );
};

export default Students;