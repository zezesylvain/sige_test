import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, BookOpen, AlertCircle, DollarSign } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_FEES } from '../constants';

const KPICard = ({ title, value, icon, color, subtext }: { title: string, value: string, icon: React.ReactNode, color: string, subtext: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtext}</p>
    </div>
    <div className={`p-3 rounded-lg ${color} text-white`}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const totalStudents = MOCK_STUDENTS.length;
  const totalRevenue = MOCK_FEES.filter(f => f.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingRevenue = MOCK_FEES.filter(f => f.status !== 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
  
  // Data for charts
  const attendanceData = [
    { name: 'Présents', value: 92 },
    { name: 'Absents', value: 5 },
    { name: 'Retards', value: 3 },
  ];
  
  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

  const gradeDistribution = [
    { subject: 'Maths', avg: 14.5 },
    { subject: 'Français', avg: 13.2 },
    { subject: 'Histoire', avg: 15.8 },
    { subject: 'Physique', avg: 12.1 },
    { subject: 'Anglais', avg: 14.0 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Élèves" 
          value={totalStudents.toString()} 
          icon={<Users size={20} />} 
          color="bg-brand-600"
          subtext="+12% vs année dernière"
        />
        <KPICard 
          title="Taux de Présence" 
          value="95.4%" 
          icon={<BookOpen size={20} />} 
          color="bg-emerald-500"
          subtext="Moyenne sur 7 jours"
        />
        <KPICard 
          title="Frais Recouvrés" 
          value={`${totalRevenue} €`} 
          icon={<DollarSign size={20} />} 
          color="bg-indigo-500"
          subtext={`${pendingRevenue} € en attente`}
        />
        <KPICard 
          title="Alertes" 
          value="3" 
          icon={<AlertCircle size={20} />} 
          color="bg-rose-500"
          subtext="Absences non justifiées"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Moyenne par Matière</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" tick={{fontSize: 12}} />
                <YAxis />
                <Tooltip cursor={{fill: '#eff6ff'}} />
                <Bar dataKey="avg" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Répartition des Présences (Aujourd'hui)</h3>
          <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            {attendanceData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                    <span>{item.name}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;