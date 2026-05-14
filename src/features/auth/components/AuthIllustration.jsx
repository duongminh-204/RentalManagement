import { motion } from 'framer-motion';

export default function AuthIllustration({ title, subtitle, icon = '🏠' }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col justify-center items-center text-white"
        >
            <h1 className="text-5xl font-bold mb-8 text-center">{title}</h1>
            
            <p className="text-xl text-blue-200 text-center mb-20">
                {subtitle}
            </p>

            {/* Icon - tăng khoảng cách */}
            <div className="relative mt-16">
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                    className="text-[180px] opacity-20"
                >
                    {icon}
                </motion.div>
            </div>
        </motion.div>
    );
}