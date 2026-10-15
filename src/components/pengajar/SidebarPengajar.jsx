import {
  BookOpen,
  Home,
  ClipboardList,
  UsersRound,
  ChartNoAxesColumn,
  FileText,
  X,
} from "lucide-react";

const menuPengajar = [
  { label: "Dashboard", icon: Home },
  { label: "Kelas Diampu", icon: UsersRound },
  { label: "Input Nilai", icon: ClipboardList },
  { label: "Progres Belajar", icon: ChartNoAxesColumn },
  { label: "Raport Santri", icon: FileText },
];

export default function SidebarPengajar({
  activeMenu = "Dashboard",
  onNavigate,
  isOpen = false,
  onClose,
}) {
  return (
    <>
      <style>{`
        .sp-sidebar {
          position: sticky;
          top: 0;
          left: 0;
          flex: 0 0 245px;
          width: 245px;
          min-width: 245px;
          height: 100vh;
          height: 100dvh;
          min-height: 0;
          display: flex;
          flex-direction: column;
          padding: 27px 16px 18px;
          overflow-y: auto;
          overflow-x: hidden;
          background: #30442E;
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-sizing: border-box;
          scrollbar-width: thin;
          scrollbar-color: #65785F transparent;
        }

        .sp-sidebar *,
        .sp-sidebar *::before,
        .sp-sidebar *::after {
          box-sizing: border-box;
        }

        .sp-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 9px;
          margin-bottom: 40px;
          flex-shrink: 0;
        }

        .sp-logo {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,.45);
          border-radius: 12px;
          color: #F8F7EF;
        }

        .sp-brand h2 {
          margin: 0 0 5px;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -.6px;
        }

        .sp-brand p {
          margin: 0;
          color: #D5DFCE;
          font-size: 10px;
          white-space: nowrap;
        }

        .sp-close {
          display: none;
          margin-left: auto;
          padding: 4px;
          border: none;
          background: transparent;
          color: white;
          cursor: pointer;
        }

        .sp-menu {
          display: flex;
          flex-direction: column;
          gap: 7px;
          flex-shrink: 0;
        }

        .sp-menu-item {
          width: 100%;
          min-height: 46px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
          border: none;
          border-radius: 10px;
          background: transparent;
          color: #E1E8DC;
          text-align: left;
          cursor: pointer;
          transition: background .2s ease;
        }

        .sp-menu-item span {
          font-family: inherit;
          font-size: 12px;
          font-weight: 500;
        }

        .sp-menu-item:hover,
        .sp-menu-item.active {
          background: #506748;
          color: white;
        }

        .sp-menu-item.active {
          box-shadow: inset 3px 0 #D5E1CA;
        }

        .sp-bottom {
          margin-top: auto;
          padding-top: 20px;
          flex-shrink: 0;
        }

        .sp-year {
          padding: 15px 13px;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 12px;
          background: rgba(255,255,255,.07);
        }

        .sp-year-label {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 9px;
          color: #DDE7D6;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .5px;
        }

        .sp-year-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #A8C69A;
        }

        .sp-year strong {
          display: block;
          margin-bottom: 4px;
          font-size: 13px;
        }

        .sp-year p {
          margin: 0;
          color: #D3DDD0;
          font-size: 10px;
        }

        @media (max-width: 800px) {
          .sp-sidebar {
            position: fixed;
            inset: 0 auto 0 0;
            z-index: 1001;
            flex: 0 0 255px;
            width: 255px;
            min-width: 255px;
            height: 100vh;
            height: 100dvh;
            padding-top: 22px;
            transform: translateX(-100%);
            transition: transform .25s ease;
            box-shadow: 8px 0 24px rgba(0,0,0,.12);
          }

          .sp-sidebar.sp-open {
            transform: translateX(0);
          }

          .sp-close {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (max-height: 520px) {
          .sp-brand {
            margin-bottom: 20px;
          }

          .sp-sidebar {
            padding-top: 16px;
            padding-bottom: 12px;
          }

          .sp-bottom {
            padding-top: 12px;
          }
        }
      `}</style>

      <aside
        className={`sp-sidebar ${isOpen ? "sp-open" : ""}`}
        aria-label="Menu pengajar"
      >
        <div className="sp-brand">
          <div className="sp-logo">
            <BookOpen size={31} />
          </div>

          <div>
            <h2>RSQ-Kids</h2>
            <p>Rumah Tahfidz Qur’an</p>
          </div>

          <button
            type="button"
            className="sp-close"
            onClick={onClose}
            aria-label="Tutup sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sp-menu">
          {menuPengajar.map(({ label, icon: Icon }) => (
            <button
              type="button"
              key={label}
              className={`sp-menu-item ${
                activeMenu === label ? "active" : ""
              }`}
              aria-current={activeMenu === label ? "page" : undefined}
              onClick={() => {
                onNavigate?.(label);
                onClose?.();
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sp-bottom">
          <div className="sp-year">
            <div className="sp-year-label">
              <span className="sp-year-dot" />
              TAHUN AJARAN
            </div>

            <strong>2026 / 2027</strong>
            <p>Semester Ganjil</p>
          </div>
        </div>
      </aside>
    </>
  );
}