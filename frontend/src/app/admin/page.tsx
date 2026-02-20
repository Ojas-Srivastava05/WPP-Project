'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [targetClubId, setTargetClubId] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await api.post('/admin/broadcast', {
                title,
                message,
                target_club_id: targetClubId ? parseInt(targetClubId) : null
            });
            setStatus({ type: 'success', text: 'Broadcast sent successfully!' });
            setTitle('');
            setMessage('');
            setTargetClubId('');
        } catch (err: any) {
            setStatus({
                type: 'error',
                text: err.response?.data?.detail || 'Failed to send broadcast. Ensure you are an Admin.'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center text-white bg-black">Access Denied. Please Sign In.</div>;

    return (
        <div className="bg-background-dark font-display text-slate-100 min-h-screen p-8 relative overflow-hidden">
            {/* Background effects */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <main className="max-w-4xl mx-auto relative z-10 flex flex-col gap-12">

                {/* Header */}
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                    <div>
                        <span className="text-neon-lime text-xs font-black uppercase tracking-[0.3em]">Command Center</span>
                        <h1 className="text-5xl batman-text text-white mt-2">Admin Panel</h1>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Broadcast Notification Card */}
                    <div className="bg-black/40 border border-primary/30 rounded-2xl p-8 neon-glow-cyan backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary text-3xl">campaign</span>
                            <h2 className="text-2xl font-bold uppercase tracking-tighter">Broadcast Push</h2>
                        </div>

                        <form onSubmit={handleBroadcast} className="flex flex-col gap-4">
                            {status && (
                                <div className={`p-3 rounded-lg text-sm font-bold border ${status.type === 'success' ? 'bg-neon-lime/10 border-neon-lime/40 text-neon-lime' : 'bg-red-500/10 border-red-500/40 text-red-500'}`}>
                                    {status.text}
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Audience</label>
                                <select
                                    className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors appearance-none"
                                    value={targetClubId}
                                    onChange={(e) => setTargetClubId(e.target.value)}
                                >
                                    <option value="">Global (All Users)</option>
                                    <option value="1">Club #1 (Robotics)</option>
                                    <option value="2">Club #2 (Cinema)</option>
                                    <option value="3">Club #3 (Strategy)</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notification Title</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Urgent Update"
                                    className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors placeholder:text-slate-600"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message Body</label>
                                <textarea
                                    required
                                    placeholder="Enter your broadcast message..."
                                    rows={4}
                                    className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors placeholder:text-slate-600 resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="group relative mt-2 active:scale-95 transition-transform disabled:opacity-50"
                            >
                                <div className="absolute inset-0 bg-primary blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                                <div className="relative bg-primary hover:bg-[#25ff50] text-black font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                    {loading ? 'Sending...' : 'Fire Broadcast'}
                                    {!loading && <span className="material-symbols-outlined font-bold">send</span>}
                                </div>
                            </button>
                        </form>
                    </div>

                    {/* Pending Verification Card (Template for Phase 9) */}
                    <div className="bg-black/40 border border-neon-purple/30 rounded-2xl p-8 neon-glow-purple backdrop-blur-xl h-fit">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-neon-purple text-3xl">verified_user</span>
                            <h2 className="text-2xl font-bold uppercase tracking-tighter">User Approvals</h2>
                        </div>
                        <div className="text-center text-slate-500 py-12 flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-4xl opacity-50">inbox</span>
                            <p className="text-sm font-medium">No pending user verifications.</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
