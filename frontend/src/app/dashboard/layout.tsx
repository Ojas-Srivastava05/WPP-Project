'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Calendar as CalendarIcon, Bell, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Premium Navbar */}
            <nav className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link href="/dashboard" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Clubify
                            </Link>

                            <div className="hidden md:flex items-center space-x-1">
                                <NavLink href="/dashboard" icon={<Compass className="w-4 h-4" />}>Discover</NavLink>
                                <NavLink href="/calendar" icon={<CalendarIcon className="w-4 h-4" />}>Calendar</NavLink>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/notifications" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-gray-800"></span>
                            </Link>

                            <div className="h-8 w-px bg-gray-700 mx-2"></div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-300 hidden sm:block">
                                    {user.username}
                                </span>
                                <button
                                    onClick={logout}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}

function NavLink({ href, children, icon }: { href: string, children: React.ReactNode, icon: React.ReactNode }) {
    // A real app would check path for active state
    return (
        <Link href={href} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all">
            {icon}
            {children}
        </Link>
    );
}
