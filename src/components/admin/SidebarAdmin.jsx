import {
  BookOpen,
  ChartNoAxesColumn,
  ClipboardList,
  CreditCard,
  GraduationCap,
  Home,
  UsersRound,
  X,
} from "lucide-react";

const menuAdmin = [
  { label: "Beranda", icon: Home },
  { label: "Data Santri", icon: UsersRound },
  { label: "Data Pengajar", icon: GraduationCap },
  { label: "Daftar Kelas", icon: BookOpen },
  { label: "Progres Belajar", icon: ChartNoAxesColumn },
  { label: "Pembayaran SPP", icon: CreditCard },
  { label: "Raport", icon: ClipboardList },
];

export default function SidebarAdmin({
  activeMenu = "Beranda",
  onNavigate,
  isOpen = false,
  onClose,
}) {
  return (
    <>
      <style>{`
        .sa-sidebar {
          position: sticky;
          top: 0;
          left: 0;
          z-index: 1001;
          flex: 0 0 245px;
          width: 245px;
          min-width: 245px;
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          padding: 25px 15px 18px;
          overflow-y: auto;
          background: #30442E;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-sizing: border-box;
        }

        .sa-sidebar *,
        .sa-sidebar *::before,
        .sa-sidebar *::after { box-sizing: border-box; }

        .sa-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 8px;
          margin-bottom: 35px;
        }

        .sa-logo {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border: 1px solid rgba(255,255,255,.42);
          border-radius: 11px;
          color: #F8F7EF;
        }

        .sa-brand h2 { margin: 0 0 4px; font-size: 17px; font-weight: 800; }
        .sa-brand p { margin: 0; color: #D5DFCE; font-size: 9px; white-space: nowrap; }
        .sa-close { display: none; margin-left: auto; padding: 4px; border: 0; background: transparent; color: #fff; cursor: pointer; }
        .sa-menu { display: flex; flex-direction: column; gap: 6px; }

        .sa-menu-item {
          width: 100%;
          min-height: 44px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 13px;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: #E1E8DC;
          text-align: left;
          font-family: inherit;
          cursor: pointer;
          transition: background .18s ease;
        }

        .sa-menu-item span { font-size: 11px; font-weight: 500; }
        .sa-menu-item:hover, .sa-menu-item.active { background: #506748; color: #fff; }
        .sa-menu-item.active { box-shadow: inset 3px 0 #D5E1CA; }

        .sa-footer {
          margin-top: auto;
          padding: 15px 10px 0;
          color: #D5DFCE;
          font-size: 10px;
          line-height: 1.6;
        }

        @media (max-width: 800px) {
          .sa-sidebar {
            position: fixed;
            inset: 0 auto 0 0;
            width: 255px;
            min-width: 255px;
            padding-top: 22px;
            transform: translateX(-100%);
            transition: transform .25s ease;
            box-shadow: 8px 0 24px rgba(0,0,0,.12);
          }

          .sa-sidebar.sa-open { transform: translateX(0); }
          .sa-close { display: flex; align-items: center; justify-content: center; }
        }
      `}</style>

      <aside
        className={`sa-sidebar ${isOpen ? "sa-open" : ""}`}
        aria-label="Menu admin"
      >
        <div className="sa-brand">
          <div className="sa-logo"><BookOpen size={27} /></div>
          <div>
            <h2>RSQ-Kids</h2>
            <p>Rumah Tahfidz Qur'an</p>
          </div>
          <button
            type="button"
            className="sa-close"
            onClick={onClose}
            aria-label="Tutup sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sa-menu">
          {menuAdmin.map(({ label, icon: Icon }) => (
            <button
              type="button"
              key={label}
              className={`sa-menu-item ${activeMenu === label ? "active" : ""}`}
              aria-current={activeMenu === label ? "page" : undefined}
              onClick={() => {
                onNavigate?.(label);
                onClose?.();
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sa-footer">Tahun Ajaran 2026 / 2027<br />Semester Ganjil</div>
      </aside>
    </>
  );
}