'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import DashboardLayout from '@/app/dashboard/layout';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
    id: number;
    message: string;
    is_read: boolean;
    timestamp: string;
    club: {
        name: string;
        logo: string | null;
    };
}

export default function NotificationsPage() {
    const queryClient = useQueryClient();

    const { data: notifications, isLoading } = useQuery<Notification[]>({
        queryKey: ['notifications'],
        queryFn: async () => {
            const res = await api.get('/notifications/');
            return res.data;
        }
    });

    const markReadMutation = useMutation({
        mutationFn: async (id: number) => {
            await api.post(`/notifications/${id}/read`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-gray-800 h-24 rounded-2xl border border-gray-700"></div>
                    ))}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Bell className="text-purple-500 w-8 h-8" />
                        Your Notifications
                    </h1>
                </div>

                <div className="bg-gray-800 rounded-3xl border border-gray-700/50 shadow-xl overflow-hidden">
                    {notifications?.length === 0 ? (
                        <div className="p-16 text-center flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">You're all caught up!</h3>
                            <p className="text-gray-400">No new notifications from your clubs.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-700/50">
                            {notifications?.map((notif, i) => (
                                <motion.div
                                    key={notif.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`p-6 flex items-start gap-4 transition-colors ${!notif.is_read ? 'bg-gray-750/50' : ''
                                        }`}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        {notif.club.logo ? (
                                            <img src={notif.club.logo} alt={notif.club.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-700" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md border-2 border-gray-700">
                                                {notif.club.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                                                {notif.club.name}
                                                {!notif.is_read && (
                                                    <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                                                )}
                                            </h3>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className={`text-base ${!notif.is_read ? 'text-gray-200 font-medium' : 'text-gray-400'}`}>
                                            {notif.message}
                                        </p>

                                        {!notif.is_read && (
                                            <button
                                                onClick={() => markReadMutation.mutate(notif.id)}
                                                disabled={markReadMutation.isPending}
                                                className="mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1"
                                            >
                                                <CheckCircle className="w-4 h-4" /> Mark as read
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
