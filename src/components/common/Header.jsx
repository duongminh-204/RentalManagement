import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Home, Building2, FileText, Car, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Phòng trọ', path: '/rooms', icon: Building2 },
    { label: 'Khách thuê', path: '/tenants', icon: Users },
    { label: 'Hợp đồng', path: '/contracts', icon: FileText },
    { label: 'Phương tiện', path: '/vehicles', icon: Car },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-20 px-4">
          {/* Logo with left spacing */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="text-blue-600" size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-semibold text-sm tracking-tight font-['Segoe_UI',sans-serif]">RentalManagement</h1>
              <p className="text-blue-100 text-xs">Quản lý phòng trọ</p>
            </div>
          </Link>

          {/* Desktop Menu - Center */}
          <nav className="hidden lg:flex gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'text-white hover:bg-blue-500 hover:bg-opacity-50'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section - Profile */}
          <div className="flex items-center gap-4">
            {/* Profile Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-blue-500 hover:bg-opacity-50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <User size={18} />
                </div>
                <span className="text-sm font-medium">Profile</span>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium rounded-lg transition-colors"
                    >
                      <LogOut size={18} />
                      Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 hover:bg-blue-500 hover:bg-opacity-50 rounded-lg transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4 space-y-2"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-white text-blue-600'
                        : 'text-white hover:bg-blue-500 hover:bg-opacity-50'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-white hover:bg-red-500 flex items-center gap-2 font-medium rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
