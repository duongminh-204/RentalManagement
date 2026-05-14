import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useRegister } from '../hooks/useRegister';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const { register, loading, error } = useRegister();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }
        register({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 w-full"
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Đăng Ký</h2>
                <p className="text-gray-600 mt-2">Tạo tài khoản mới</p>
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

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Họ và Tên</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Nhập họ và tên"
                        required
                    />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="email@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="03xxxxxxxx"
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
                            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            placeholder="Xác nhận mật khẩu"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                >
                    {loading ? "Đang đăng ký..." : "Đăng Ký"}
                    <UserPlus size={24} />
                </motion.button>
            </form>

            <p className="text-center mt-8 text-gray-600">
                Đã có tài khoản?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Đăng nhập ngay
                </Link>
            </p>
        </motion.div>
    );
}
