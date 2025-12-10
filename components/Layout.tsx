import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Wallet, 
  Calendar, 
  CheckSquare, 
  Bell, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  children: React.ReactNode;
}

const SidebarItem = ({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-brand-50 text-brand-600' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ currentView, setCurrentView, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          E
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">EduManager</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <SidebarItem 
          icon={<LayoutDashboard size={20} />} 
          label="Tableau de bord" 
          active={currentView === 'DASHBOARD'} 
          onClick={() => { setCurrentView('DASHBOARD'); setIsMobileMenuOpen(false); }}
        />
        <SidebarItem 
          icon={<Users size={20} />} 
          label="Élèves" 
          active={currentView === 'STUDENTS'} 
          onClick={() => { setCurrentView('STUDENTS'); setIsMobileMenuOpen(false); }}
        />
        <SidebarItem 
          icon={<GraduationCap size={20} />} 
          label="Notes & Bulletins" 
          active={currentView === 'GRADES'} 
          onClick={() => { setCurrentView('GRADES'); setIsMobileMenuOpen(false); }}
        />
        <SidebarItem 
          icon={<Wallet size={20} />} 
          label="Finances" 
          active={currentView === 'FEES'} 
          onClick={() => { setCurrentView('FEES'); setIsMobileMenuOpen(false); }}
        />
        <SidebarItem 
          icon={<Calendar size={20} />} 
          label="Emploi du temps" 
          active={currentView === 'TIMETABLE'} 
          onClick={() => { setCurrentView('TIMETABLE'); setIsMobileMenuOpen(false); }}
        />
        <SidebarItem 
          icon={<CheckSquare size={20} />} 
          label="Absences" 
          active={currentView === 'ATTENDANCE'} 
          onClick={() => { setCurrentView('ATTENDANCE'); setIsMobileMenuOpen(false); }}
        />
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <NavContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 hidden md:block">
              {currentView === 'DASHBOARD' ? 'Vue d\'ensemble' : 
               currentView === 'STUDENTS' ? 'Gestion des Élèves' : 
               currentView === 'GRADES' ? 'Notes et Évaluations' : 
               currentView === 'FEES' ? 'Comptabilité' : 
               currentView === 'TIMETABLE' ? 'Emploi du Temps' : 'Gestion des Absences'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">M. Thomas Dupont</p>
                <p className="text-xs text-gray-500">Administrateur</p>
              </div>
              <img 
                src="https://picsum.photos/100/100?random=admin" 
                alt="Admin" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;