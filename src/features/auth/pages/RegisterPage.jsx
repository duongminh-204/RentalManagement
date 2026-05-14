import RegisterForm from '../components/RegisterForm';
import AuthIllustration from '../components/AuthIllustration';

export default function RegisterPage() {
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 overflow-hidden fixed inset-0">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff15_0%,transparent_70%)]" />

            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Phần Hình Ảnh + Illustration */}
                <AuthIllustration 
                    title="Bắt Đầu Quản Lý Ngay"                  
                    icon="📋"
                />

                {/* Form Đăng Ký */}
                <RegisterForm />
            </div>
        </div>
    );
}
