import React from 'react';
import { DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { MOCK_FEES } from '../constants';

const Fees = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg shadow-indigo-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-indigo-100 font-medium">Revenu Total</p>
                        <h3 className="text-3xl font-bold mt-2">1,800 €</h3>
                    </div>
                    <div className="p-2 bg-indigo-500 rounded-lg">
                        <DollarSign size={24} />
                    </div>
                </div>
                <div className="mt-4 text-sm text-indigo-100 bg-indigo-700/50 inline-block px-2 py-1 rounded">
                    Mois de Octobre 2023
                </div>
            </div>
            
             <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 font-medium">En attente</p>
                        <h3 className="text-3xl font-bold mt-2 text-gray-900">450 €</h3>
                    </div>
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                        <Clock size={24} />
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                    1 paiement en cours
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-500 font-medium">Impayés</p>
                        <h3 className="text-3xl font-bold mt-2 text-red-600">450 €</h3>
                    </div>
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <AlertTriangle size={24} />
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                    Action requise
                </div>
            </div>
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Historique des transactions</h3>
          <button className="text-brand-600 text-sm font-medium hover:underline">Tout voir</button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4">ID Transaction</th>
              <th className="px-6 py-4">Élève</th>
              <th className="px-6 py-4">Date d'échéance</th>
              <th className="px-6 py-4">Montant</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_FEES.map((fee) => (
              <tr key={fee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-gray-500">{fee.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{fee.studentName}</td>
                <td className="px-6 py-4 text-gray-500">{fee.dueDate}</td>
                <td className="px-6 py-4 font-medium">{fee.amount} €</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit
                    ${fee.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                      fee.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {fee.status === 'PAID' && <CheckCircle size={12} />}
                    {fee.status === 'PENDING' && <Clock size={12} />}
                    {fee.status === 'OVERDUE' && <AlertTriangle size={12} />}
                    {fee.status === 'PAID' ? 'Payé' : fee.status === 'PENDING' ? 'En attente' : 'Impayé'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-900">Facture</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;