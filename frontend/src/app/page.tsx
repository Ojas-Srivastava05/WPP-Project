'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-nav px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-primary flex items-center justify-center logo-glow">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">CLUBIFY</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-white text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Sign In</Link>
          <button className="bg-primary text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-tighter hover:brightness-110 transition-all">
            Sign Up
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative px-6 pt-12 pb-20 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-neon-lime/5 rounded-full blur-[100px]"></div>

          <div className="relative z-10 space-y-8 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-primary/40 text-[10px] font-black tracking-[0.2em] text-primary uppercase mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              The Campus Core
            </div>

            <h1 className="batman-text text-[4.5rem] leading-[0.8] text-white">
              IGNITE <br /> <span className="text-primary">THE</span> <br /> SQUAD
            </h1>

            <div className="relative w-full max-w-[280px] aspect-square mx-auto my-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary via-neon-purple to-neon-lime opacity-20 blur-3xl animate-pulse"></div>
              <div className="relative w-full h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                <span className="material-symbols-outlined text-7xl text-primary/50 logo-glow">rocket_launch</span>
              </div>
            </div>

            <p className="text-slate-400 text-lg font-medium leading-snug px-4">
              Elevate your college life. Discover elite student organizations and claim your spot in the spotlight.
            </p>

            <div className="pt-4 flex flex-col items-center gap-4">
              <Link href="/login" className="w-full max-w-[260px] bg-neon-purple text-white py-5 rounded-2xl font-black tracking-widest text-xl neon-glow-purple flex items-center justify-center hover:scale-105 transition-transform active:scale-95 uppercase">
                Join a Club
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-black/40 border-t border-white/5">
          <div className="px-6 mb-8 flex items-end justify-between">
            <div>
              <span className="text-neon-lime text-[10px] font-black uppercase tracking-[0.3em]">Trending Now</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Featured</h2>
            </div>
            <a className="text-primary text-xs font-bold flex items-center gap-1 uppercase tracking-widest pb-1" href="#explore">
              Explore <span className="material-symbols-outlined text-sm">trending_flat</span>
            </a>
          </div>

          <div className="flex overflow-x-auto pb-10 px-6 gap-6 no-scrollbar snap-x snap-mandatory">
            <div className="min-w-[300px] snap-center bg-zinc-950 rounded-2xl overflow-hidden neon-border-cyan flex flex-col">
              <div className="h-44 relative">
                <img alt="Engineering" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmtn-HU8w6hRYAoWkX2I9b1cepEeF6YcXxjcCqo8dB8P0Ca8g3nPG-Ypoc05Uneu1eg_g4WGQ6fpaxLd4VjLohY5eS9OEKrdDjP3gVJN5ElgNnkjsJAcKqOCbvyxeWdtPZ4K3DrL6sHABSIoV2RNmtkWO99CjrC77DrCaDJTW8q2yRDaV24gEmjqqIpn_zL5dO6baZvq5bNot7EyLMHnmq1BxdAhQWbTXtu-tfD2Csg1BnAUYdbTI5GJStzaIHizfD6A5ufekWTr1t" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary text-black text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Engineering</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">Robotics Club</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Building autonomous systems and competing in national championships.</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-primary text-lg font-black">150+</span>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Active Members</span>
                  </div>
                  <button className="bg-primary/10 text-primary border border-primary/40 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-colors">Join</button>
                </div>
              </div>
            </div>

            <div className="min-w-[300px] snap-center bg-zinc-950 rounded-2xl overflow-hidden neon-border-purple flex flex-col">
              <div className="h-44 relative">
                <img alt="Cinema" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWTdYwevU_jVAI1wxQdWgzAeVJCAs7GdvfSIziX7auWCgj3eGCUOrkMN7WgGdoCCN3bWARiMQOJO2wjzvswlR67753rT5L8XILJ85uyXUzoacy3mHUjnZbQYQjmccaacLdtZJV1_3Qoq96B7hd0N4VCnE-i9IdBhD2qylIR0qvPgyEyZPKhtpnV7MiM1NCOu7p6ITYJ98b8AZgsJJ_u3SlRievoTj9sj4QY8Ntwh4oW0-bBSZSq5uiUm_l3VXACDR99E0k3kjdMjs8" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-neon-purple text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Cinema</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">Film Society</h3>
                <p className="text-slate-400 text-sm leading-relaxed">The hub for directors, actors, and visionary storytellers.</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-neon-purple text-lg font-black">88+</span>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Creators</span>
                  </div>
                  <button className="bg-neon-purple/10 text-neon-purple border border-neon-purple/40 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neon-purple hover:text-white transition-colors">Join</button>
                </div>
              </div>
            </div>

            <div className="min-w-[300px] snap-center bg-zinc-950 rounded-2xl overflow-hidden neon-border-lime flex flex-col">
              <div className="h-44 relative">
                <img alt="Strategy" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvxFlVFwcqS_9G6ySeFHv723-HCBgkGRW0pyWl3DU9b-w_qc5RrPogpPGoV45tBN1ZB9gICtcom4pKZxEQV1NVA_oExzN6EmrmQ4CmGhoOLrUy3VbBrb8bN32SFmFebDMOv0TAL_yUEfSIYmrTgXZgDOEEWDCsEqB93pEzmGQVpuwTA3xErsgn67ZNy_19wR2sYDRi2c1VkbWg_0jazwZjRhPQjX9sy7nJo3ydFkoO1UK4d9_s2Sof_mB8Ja8Jy7Tid4vAGvgMW2Yq" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-neon-lime text-black text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Strategy</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">Chess Masters</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Sharpen your mind with high-stakes blitz tournaments and tactics.</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-neon-lime text-lg font-black">120+</span>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Tacticians</span>
                  </div>
                  <button className="bg-neon-lime/10 text-neon-lime border border-neon-lime/40 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neon-lime hover:text-black transition-colors">Join</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 text-center border-t border-white/5">
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="space-y-1">
              <div className="text-4xl font-black text-primary">50+</div>
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Campuses</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-neon-purple">12K+</div>
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Active Students</div>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-black text-white mb-4">STAY IN THE LOOP</h3>
            <div className="space-y-4">
              <input className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Enter campus email" type="email" />
              <button className="w-full bg-primary text-black font-black uppercase py-4 rounded-xl tracking-widest text-sm shadow-[0_0_20px_rgba(13,204,242,0.3)]">
                Subscribe
              </button>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-8 text-slate-600">
            <a className="hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-3xl">language</span></a>
            <a className="hover:text-neon-purple transition-colors" href="#"><span className="material-symbols-outlined text-3xl">podcasts</span></a>
            <a className="hover:text-neon-lime transition-colors" href="#"><span className="material-symbols-outlined text-3xl">alternate_email</span></a>
          </div>
          <p className="mt-8 text-[9px] text-slate-700 uppercase tracking-[0.4em] font-bold">© 2024 Clubify • Premium Campus Network</p>
        </section>
        <div className="h-28"></div>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="glass-nav border border-white/20 rounded-2xl px-6 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <a className="flex flex-col items-center gap-1" href="/dashboard">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
            <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Dash</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
            <span className="material-symbols-outlined">explore</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Browse</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
            <span className="material-symbols-outlined">favorite</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Saved</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}
