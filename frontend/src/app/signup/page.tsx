'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // First register the user
            await api.post('/auth/register', { username, password, email });
            setSuccess('Account created! Logging you in...');

            // Then instantly log them in
            const res = await api.post('/token/pair', { username, password });
            login(res.data.access);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed. Try a different username.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-dark font-display text-slate-100 min-h-screen flex items-center justify-center p-4 overflow-x-hidden relative">
            {/* Decorative Glow Background Elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="fixed top-[20%] right-[-5%] w-[30%] h-[30%] bg-cyan-400/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative w-full max-w-md flex flex-col gap-8 z-10">
                {/* Logo Header */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/40 shadow-neon-lime">
                        <span className="material-symbols-outlined text-primary text-4xl leading-none">electric_bolt</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter text-slate-100 italic">
                        CLUB<span className="text-primary neon-glow-lime">IFY</span>
                    </h2>
                </div>

                {/* Main Card */}
                <div className="bg-black/60 backdrop-blur-xl border border-neon-cyan/30 rounded-xl p-8 neon-glow-cyan flex flex-col gap-8">
                    <div className="space-y-1">
                        <h1 className="text-4xl batman-text text-white leading-none">Sign Up</h1>
                        <p className="text-slate-400 text-sm font-medium">Claim your spot in the spotlight.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="flex flex-col gap-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-xl text-sm text-center">
                                {success}
                            </div>
                        )}
                        {/* Username Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-primary ml-4">Choose Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-primary text-xl">person</span>
                                </div>
                                <input
                                    className="w-full bg-black/40 border border-slate-700/50 rounded-full py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600 shadow-inner"
                                    placeholder="Enter username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-primary ml-4">Campus Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-primary text-xl">mail</span>
                                </div>
                                <input
                                    className="w-full bg-black/40 border border-slate-700/50 rounded-full py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600 shadow-inner"
                                    placeholder="you@campus.edu"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center ml-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-primary">Create Password</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-primary text-xl">lock</span>
                                </div>
                                <input
                                    className="w-full bg-black/40 border border-slate-700/50 rounded-full py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600 shadow-inner"
                                    placeholder="••••••••••••"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Primary CTA */}
                        <button className="group relative mt-4 cursor-pointer" type="submit" disabled={loading}>
                            <div className="absolute -inset-1 bg-neon-purple rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative flex items-center justify-center gap-2 w-full bg-neon-purple hover:bg-[#d05bf5] text-white font-bold py-4 rounded-full transition-all active:scale-95 disabled:opacity-50">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span className="uppercase tracking-tighter text-lg batman-text text-white">Join the Network</span>
                                        <span className="material-symbols-outlined font-bold text-white">arrow_forward</span>
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Secondary Footer CTA */}
                    <div className="text-center border-t border-white/5 pt-6">
                        <p className="text-slate-400 text-sm">
                            Already have an account?
                            <Link className="text-primary font-bold hover:text-white transition-colors ml-1" href="/login">SIGN IN</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
