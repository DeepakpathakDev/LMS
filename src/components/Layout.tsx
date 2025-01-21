import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  MessageSquare,
  Users,
  Calendar,
  Settings,
  FolderOpen,
  Menu,
  X,
  Search,
  Bell,
  School,
  ChevronDown,
  Sun,
  Moon,
  FlaskRound as Flask
} from 'lucide-react';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard,
  },
  { 
    name: 'All Courses', 
    href: '/courses', 
    icon: BookOpen,
  },
  { 
    name: 'Messages', 
    href: '/messages', 
    icon: MessageSquare,
    badge: '3'
  },
  { 
    name: 'Friends', 
    href: '/friends', 
    icon: Users,
    badge: '5'
  },
  { 
    name: 'Schedule', 
    href: '/schedule', 
    icon: Calendar 
  },
  { 
    name: 'College Predictor', 
    href: '/predictor', 
    icon: School,
    badge: 'New'
  },
  {
    name: 'R&D Projects',
    href: '/rd',
    icon: Flask,
    badge: 'New'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings 
  },
  { 
    name: 'Directory', 
    href: '/directory', 
    icon: FolderOpen 
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-40
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          bg-white dark:bg-gray-800 shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            {!isSidebarCollapsed && (
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Bright Future LMS</span>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:block p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronDown
              className={`h-5 w-5 transform transition-transform ${isSidebarCollapsed ? 'rotate-90' : '-rotate-90'}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-3 my-1 text-sm font-medium rounded-lg
                  transition-colors duration-200
                  ${isActive 
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isSidebarCollapsed && (
                  <>
                    <span className="ml-3 flex-1">{item.name}</span>
                    {item.badge && (
                      <span className={`
                        px-2 py-0.5 text-xs rounded-full
                        ${item.badge === 'New' 
                          ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`
              flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg
              ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}
              text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors duration-200
            `}
          >
            {!isSidebarCollapsed && <span>Theme</span>}
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div 
        className={`
          transition-all duration-300
          ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}