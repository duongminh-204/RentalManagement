import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">RentalManagement</h3>
                <p className="text-xs text-gray-400">Quản lý phòng trọ</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Giải pháp quản lý phòng trọ toàn diện, chuyên nghiệp và hiệu quả cho các chủ phòng trọ.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                title="Facebook"
              >
                <span className="text-white font-bold">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                title="Twitter"
              >
                <span className="text-white font-bold">𝕏</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                title="LinkedIn"
              >
                <span className="text-white font-bold">in</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                title="Github"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Trực Tiếp Truy Cập</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-blue-400 transition-colors">
                  Quản lý phòng
                </Link>
              </li>
              <li>
                <Link to="/tenants" className="hover:text-blue-400 transition-colors">
                  Khách thuê
                </Link>
              </li>
              <li>
                <Link to="/contracts" className="hover:text-blue-400 transition-colors">
                  Hợp đồng
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Liên hệ chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Liên Hệ</h4>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">+84 (0) 123 456 789</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">support@rentalpro.com</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">123 Đường ABC, TP HCM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} RentalManagement. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Điều khoản dịch vụ
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
