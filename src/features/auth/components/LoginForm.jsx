import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ phoneOrEmail: '', password: '' });
    const { login, loading, error } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData.phoneOrEmail, formData.password);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 w-full"
        >
            <div className="text-center mb-8">
            
                <p className="text-gray-600 mt-2">Đăng Nhập</p>
            </div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6"
                >
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Số điện thoại hoặc Email</label>
                    <input
                        type="text"
                        value={formData.phoneOrEmail}
                        onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                        className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="email@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-between text-sm">
                    <Link to="/forgot-password" className="text-blue-600 hover:underline">
                        Quên mật khẩu?
                    </Link>
                </div>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                    <LogIn size={24} />
                </motion.button>
            </form>

            <p className="text-center mt-8 text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                    Đăng ký ngay
                </Link>
            </p>
        </motion.div>
    );
}
