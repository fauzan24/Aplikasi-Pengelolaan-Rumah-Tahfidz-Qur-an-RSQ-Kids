import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  LogOut,
  Settings,
} from "lucide-react";
import SidebarPengajar from "./SidebarPengajar";

export default function LayoutPengajar({
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
    <div className="lp-layout">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .lp-layout {
          display: flex;
          height: 100vh;
          height: 100dvh;
          min-height: 0;
          width: 100%;
          overflow: hidden;
          background: #FBF9F3;
          color: #28352C;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .lp-layout,
        .lp-layout * {
          box-sizing: border-box;
        }

        /* AREA UTAMA */
        .lp-main {
          display: flex;
          flex: 1;
          flex-direction: column;
          min-width: 0;
          min-height: 0;
          width: 0;
          overflow: hidden;
        }

        /* TOP BAR TETAP DI ATAS */
        .lp-topbar {
          position: relative;
          z-index: 900;
          flex-shrink: 0;
          height: 76px;
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 30px;
          gap: 20px;
          border-bottom: 1px solid #E8E6DE;
          background: #FFFFFF;
        }

        .lp-topbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .lp-mobile-menu {
          display: none;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border: none;
          background: transparent;
          color: #30442E;
          cursor: pointer;
        }

        .lp-notification {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7px;
          border: none;
          background: transparent;
          color: #5A734E;
          cursor: pointer;
        }

        .lp-notification-dot {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 8px;
          height: 8px;
          border: 1px solid white;
          border-radius: 50%;
          background: #D89B3D;
        }

        .lp-profile-wrap {
          position: relative;
        }

        .lp-profile-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          border: none;
          background: transparent;
          color: #28352C;
          text-align: left;
          cursor: pointer;
        }

        .lp-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          border: 2px solid #E1E8DA;
          border-radius: 50%;
          background: #5A734E;
          color: white;
          font-size: 12px;
          font-weight: 700;
        }

        .lp-profile-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lp-profile-info strong {
          font-size: 11px;
        }

        .lp-profile-info span {
          color: #838B82;
          font-size: 10px;
        }

        .lp-dropdown {
          position: absolute;
          top: 48px;
          right: 0;
          z-index: 1100;
          width: 155px;
          padding: 6px;
          border: 1px solid #E8E6DE;
          border-radius: 10px;
          background: white;
          box-shadow: 0 8px 24px rgba(30,45,30,.1);
        }

        .lp-dropdown button {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 7px;
          background: white;
          color: #28352C;
          text-align: left;
          font-family: inherit;
          font-size: 11px;
          cursor: pointer;
        }

        .lp-dropdown button:hover {
          background: #FBF9F3;
        }

        /* HANYA BAGIAN KONTEN INI YANG SCROLL */
        .lp-content {
          flex: 1;
          min-width: 0;
          min-height: 0;
          width: 100%;
          padding: 28px 30px 32px;
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior-y: contain;
          -webkit-overflow-scrolling: touch;
          box-sizing: border-box;
        }

        .lp-content > * {
          min-width: 0;
        }

        /* OVERLAY MENU MOBILE */
        .lp-overlay {
          display: none;
        }

        @media (max-width: 1100px) {
          .lp-content {
            padding: 24px 22px 28px;
          }

          .lp-topbar {
            padding: 0 22px;
          }
        }

        @media (max-width: 800px) {
          .lp-topbar {
            height: 66px;
            min-height: 66px;
            padding: 0 15px;
            gap: 12px;
          }

          .lp-mobile-menu {
            display: flex;
            margin-right: auto;
          }

          .lp-overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 1000;
            border: none;
            background: rgba(20,30,20,.4);
          }

          .lp-topbar-right {
            gap: 12px;
          }

          .lp-content {
            padding: 22px 18px 28px;
          }
        }

        @media (max-width: 560px) {
          .lp-topbar {
            padding: 0 10px;
            gap: 8px;
          }

          .lp-topbar-right {
            gap: 7px;
          }

          .lp-profile-info,
          .lp-profile-button > svg {
            display: none;
          }

          .lp-content {
            padding: 18px 12px 24px;
          }
        }
      `}</style>

      {/* OVERLAY UNTUK MENU MOBILE */}
      {sidebarOpen && (
        <button
          type="button"
          className="lp-overlay"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <SidebarPengajar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* KONTEN UTAMA */}
      <main className="lp-main">
        {/* TOP BAR */}
        <header className="lp-topbar">
          <button
            type="button"
            className="lp-mobile-menu"
            aria-label="Buka menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="lp-topbar-right">
            <button
              type="button"
              className="lp-notification"
              aria-label="Notifikasi"
              title="Notifikasi"
            >
              <Bell size={20} />
              <span className="lp-notification-dot" />
            </button>

            <div className="lp-profile-wrap">
              <button
                type="button"
                className="lp-profile-button"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                <div className="lp-avatar">UA</div>

                <div className="lp-profile-info">
                  <strong>Ustadzah Aisyah</strong>
                  <span>Pengajar</span>
                </div>

                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="lp-dropdown">
                  <button
                    type="button"
                    onClick={() => navigate("Pengaturan")}
                  >
                    <Settings size={15} />
                    Pengaturan
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      onLogout?.();
                    }}
                  >
                    <LogOut size={15} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* AREA SCROLL HALAMAN */}
        <div className="lp-content">
          {children}
        </div>
      </main>
    </div>
  );
}