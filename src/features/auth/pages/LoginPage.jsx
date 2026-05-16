import LoginForm from '../components/LoginForm';
import AuthIllustration from '../components/AuthIllustration';

export default function LoginPage() {
    return (
        <div className="auth-canvas flex min-h-screen items-center justify-center p-4">
            <div className="relative z-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-2">
                <AuthIllustration
                    title="Quản lý nhà trọ"
                    highlight="thông minh"
                    icon="🏠"
                />
                <LoginForm />
            </div>
        </div>
    );
}
