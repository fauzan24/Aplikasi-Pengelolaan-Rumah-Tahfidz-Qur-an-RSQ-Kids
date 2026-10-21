import { useState } from "react";
import {
  ChevronDown,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";
import SidebarAdmin from "./SidebarAdmin";

export default function LayoutAdmin({
  onNavigate,
  onLogout,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = (label) => {
    setProfileOpen(false);
    setSidebarOpen(false);
    onNavigate?.(label);
  };

  return (
    <div className="la-layout">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .la-layout {
          width: 100%; height: 100vh; height: 100dvh; display: flex;
          overflow: hidden; background: #FBF9F3; color: #28352C;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .la-layout, .la-layout * { box-sizing: border-box; }
        .la-main { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; }
        .la-topbar {
          position: relative; z-index: 900; height: 72px; min-height: 72px;
          display: flex; align-items: center; justify-content: flex-end;
          padding: 0 30px; border-bottom: 1px solid #E8E6DE; background: #fff;
        }
        .la-topbar-right { display: flex; align-items: center; gap: 18px; }
        .la-mobile-menu, .la-notification {
          display: flex; align-items: center; justify-content: center;
          padding: 7px; border: 0; background: transparent; color: #5A734E; cursor: pointer;
        }
        .la-mobile-menu { display: none; }
        .la-profile-wrap { position: relative; }
        .la-profile-button {
          display: flex; align-items: center; gap: 10px; padding: 0;
          border: 0; background: transparent; color: #28352C; text-align: left; cursor: pointer;
        }
        .la-avatar {
          width: 38px; height: 38px; display: grid; place-items: center;
          border: 2px solid #E1E8DA; border-radius: 50%; background: #5A734E;
          color: #fff; font-size: 11px; font-weight: 700;
        }
        .la-profile-info { display: flex; flex-direction: column; gap: 3px; }
        .la-profile-info strong { font-size: 11px; }
        .la-profile-info span { color: #838B82; font-size: 10px; }
        .la-dropdown {
          position: absolute; top: 47px; right: 0; z-index: 1100; width: 155px;
          padding: 6px; border: 1px solid #E8E6DE; border-radius: 9px;
          background: #fff; box-shadow: 0 8px 24px rgba(30,45,30,.1);
        }
        .la-dropdown button {
          width: 100%; display: flex; align-items: center; gap: 8px; padding: 10px;
          border: 0; border-radius: 6px; background: #fff; color: #28352C;
          text-align: left; font-family: inherit; font-size: 11px; cursor: pointer;
        }
        .la-dropdown button:hover { background: #FBF9F3; }
        .la-content { flex: 1; min-width: 0; min-height: 0; padding: 27px 30px 32px; overflow: auto; }
        .la-overlay { display: none; }

        @media (max-width: 1100px) {
          .la-content { padding: 24px 22px 28px; }
          .la-topbar { padding: 0 22px; }
        }
        @media (max-width: 800px) {
          .la-topbar { height: 64px; min-height: 64px; padding: 0 15px; }
          .la-mobile-menu { display: flex; margin-right: auto; }
          .la-overlay { position: fixed; inset: 0; z-index: 1000; display: block; border: 0; background: rgba(20,30,20,.4); }
          .la-content { padding: 21px 18px 26px; }
        }
        @media (max-width: 560px) {
          .la-topbar { padding: 0 10px; }
          .la-topbar-right { gap: 8px; }
          .la-profile-info, .la-profile-button > svg { display: none; }
          .la-content { padding: 18px 12px 24px; }
        }
      `}</style>

      {sidebarOpen && (
        <button
          type="button"
          className="la-overlay"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <SidebarAdmin
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="la-main">
        <header className="la-topbar">
          <button
            type="button"
            className="la-mobile-menu"
            aria-label="Buka menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div className="la-topbar-right">
            <div className="la-profile-wrap">
              <button
                type="button"
                className="la-profile-button"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((open) => !open)}
              >
                <div className="la-avatar">AD</div>
                <div className="la-profile-info"><strong>Administrator</strong><span>Admin</span></div>
                <ChevronDown size={15} />
              </button>
              {profileOpen && (
                <div className="la-dropdown">
                  <button type="button" onClick={() => navigate("Pengaturan")}><Settings size={15} />Pengaturan</button>
                  <button type="button" onClick={() => { setProfileOpen(false); onLogout?.(); }}><LogOut size={15} />Keluar</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="la-content">{children}</div>
      </main>
    </div>
  );
}