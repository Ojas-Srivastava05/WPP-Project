'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { Layers, Users, PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Club {
    id: number;
    name: string;
    description: string;
    logo: string | null;
    created_at: string;
}

export default function DashboardPage() {
    const { user } = useAuth();

    const { data: clubs, isLoading } = useQuery<Club[]>({
        queryKey: ['clubs'],
        queryFn: async () => {
            const res = await api.get('/clubs/');
            return res.data;
        }
    });

    const handleJoin = async (clubId: number) => {
        try {
            await api.post(`/clubs/${clubId}/join`);
            alert("Successfully joined the club!"); // In a premium app, replace with a toast
        } catch (e) {
            alert("Failed to join club.");
        }
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-800 h-64 rounded-2xl border border-gray-700"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Layers className="text-blue-500 w-8 h-8" />
                        Discover Campus Clubs
                    </h1>
                    <p className="text-gray-400 mt-2">Find your community and get involved.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs?.map((club, i) => (
                    <motion.div
                        key={club.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group bg-gray-800 rounded-3xl overflow-hidden border border-gray-700/50 shadow-lg hover:shadow-blue-500/20 transition-all flex flex-col h-full relative"
                    >
                        {/* Visual Header */}
                        <div className="h-32 bg-gradient-to-br from-blue-600/80 to-purple-600/80 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/20" />
                            {club.logo ? (
                                <img src={club.logo} alt={club.name} className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
                            ) : (
                                <Users className="w-12 h-12 text-white/50" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-grow flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                                    {club.name}
                                </h3>
                                <p className="text-gray-400 mt-2 text-sm line-clamp-3">
                                    {club.description}
                                </p>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => handleJoin(club.id)}
                                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Join {club.name}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {clubs?.length === 0 && (
                <div className="text-center py-20 bg-gray-800/50 rounded-3xl border border-gray-700 border-dashed">
                    <p className="text-gray-400">No clubs are currently registered.</p>
                </div>
            )}
        </div>
    );
}
