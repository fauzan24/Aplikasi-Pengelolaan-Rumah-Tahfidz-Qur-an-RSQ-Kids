import { BookOpen, Home, LogOut } from "lucide-react";

export default function LayoutPengajar({ onNavigate, onLogout, children }) {
  return (
    <div className="lp-layout">
      <style>{`
        .lp-layout { width: 100%; height: 100vh; height: 100dvh; display: flex; overflow: hidden; background: #FBF9F3; color: #28352C; font-family: 'Plus Jakarta Sans', sans-serif; }
        .lp-layout *, .lp-layout *::before, .lp-layout *::after { box-sizing: border-box; }
        .lp-sidebar { width: 245px; flex: 0 0 245px; display: flex; flex-direction: column; padding: 25px 15px 18px; background: #30442E; color: #fff; }
        .lp-brand { display: flex; align-items: center; gap: 11px; padding: 0 8px; margin-bottom: 35px; }
        .lp-logo { width: 43px; height: 43px; display: grid; place-items: center; flex: 0 0 auto; border: 1px solid rgba(255,255,255,.42); border-radius: 11px; }
        .lp-brand strong { display: block; margin-bottom: 4px; font-size: 16px; }
        .lp-brand span { color: #D5DFCE; font-size: 9px; }
        .lp-menu button { width: 100%; min-height: 44px; display: flex; align-items: center; gap: 12px; padding: 0 13px; border: 0; border-radius: 9px; background: #506748; color: #fff; font: inherit; font-size: 11px; text-align: left; cursor: pointer; }
        .lp-main { display: flex; flex: 1; min-width: 0; min-height: 0; flex-direction: column; }
        .lp-topbar { height: 72px; min-height: 72px; display: flex; align-items: center; justify-content: flex-end; padding: 0 30px; border-bottom: 1px solid #E8E6DE; background: #fff; }
        .lp-user { display: flex; align-items: center; gap: 10px; color: #28352C; font-size: 11px; font-weight: 700; }
        .lp-avatar { width: 38px; height: 38px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 50%; background: #5A734E; color: #fff; }
        .lp-logout { display: inline-flex; align-items: center; gap: 7px; margin-left: 8px; padding: 8px 10px; border: 1px solid #E2E0D6; border-radius: 8px; background: #fff; color: #566752; font: inherit; font-size: 10px; cursor: pointer; }
        .lp-content { flex: 1; min-width: 0; min-height: 0; padding: 27px 30px 32px; overflow: auto; }
        @media (max-width: 800px) { .lp-sidebar { width: 190px; flex-basis: 190px; } .lp-content { padding: 22px 18px 28px; } .lp-topbar { height: 64px; min-height: 64px; padding: 0 18px; } }
        @media (max-width: 560px) { .lp-sidebar { display: none; } .lp-content { padding: 18px 12px 24px; } .lp-topbar { padding: 0 12px; } .lp-logout { font-size: 0; } }
      `}</style>

      <aside className="lp-sidebar" aria-label="Menu pengajar">
        <div className="lp-brand">
          <div className="lp-logo"><BookOpen size={26} /></div>
          <div><strong>RSQ-Kids</strong><span>Rumah Tahfidz Qur'an</span></div>
        </div>
        <nav className="lp-menu">
          <button type="button" onClick={() => onNavigate?.("Dashboard")}>
            <Home size={18} /> Beranda
          </button>
        </nav>
      </aside>

      <main className="lp-main">
        <header className="lp-topbar">
          <div className="lp-user">
            <div className="lp-avatar">UA</div>
            Ustadzah Aisyah
            <button type="button" className="lp-logout" onClick={onLogout}>
              <LogOut size={14} /> Keluar
            </button>
          </div>
        </header>
        <div className="lp-content">{children}</div>
      </main>
    </div>
  );
}