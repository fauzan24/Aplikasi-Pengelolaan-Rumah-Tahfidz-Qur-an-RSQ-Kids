import { useState } from "react";
import { CssBaseline } from "@mui/material";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DataSantri from "./pages/admin/DataSantri";
import DashboardPengajar from "./pages/pengajar/DashboardPengajar";
import KelasDiampu from "./pages/pengajar/KelasDiampu";
import InputNilai from "./pages/pengajar/InputNilai";
import ProgresBelajar from "./pages/pengajar/ProgresBelajar";
import DetailProgresBelajar from "./pages/pengajar/DetailProgresBelajar";
import DashboardWalisantri from "./pages/walisantri/DashboardWalisantri";

const halamanAwal = {
  admin: "/admin/dashboard",
  pengajar: "/pengajar/dashboard",
  walisantri: "/walisantri/dashboard",
};

const ruteMenu = {
  admin: {
    Beranda: "/admin/dashboard",
    "Data Santri": "/admin/data-santri",
    "Data Pengajar": "/admin/data-pengajar",
    "Daftar Kelas": "/admin/daftar-kelas",
    "Progres Belajar": "/admin/progres-belajar",
    "Pembayaran SPP": "/admin/pembayaran-spp",
    Raport: "/admin/raport",
    Pengaturan: "/admin/pengaturan",
  },
  pengajar: {
    Dashboard: "/pengajar/dashboard",
    "Kelas Diampu": "/pengajar/kelas-diampu",
    "Input Nilai": "/pengajar/input-nilai",
    "Progres Belajar": "/pengajar/progres-belajar",
    "Raport Santri": "/pengajar/raport-santri",
  },
};

function RequireRole({ pengguna, role }) {
  if (!pengguna) {
    return <Navigate to="/login" replace />;
  }

  if (pengguna.role !== role) {
    return <Navigate to={halamanAwal[pengguna.role] ?? "/login"} replace />;
  }

  return <Outlet />;
}

function App() {
  const [pengguna, setPengguna] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (akun) => {
    setPengguna(akun);
    navigate(halamanAwal[akun.role] ?? "/login", { replace: true });
  };

  const handleLogout = () => {
    setPengguna(null);
    navigate("/login", { replace: true });
  };

  const handleMenuNavigate = (label) => {
    const tujuan = ruteMenu[pengguna?.role]?.[label];
    if (tujuan) navigate(tujuan);
  };

  const pageProps = {
    onNavigate: handleMenuNavigate,
    onLogout: handleLogout,
  };

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route
          path="/login"
          element={
            pengguna ? (
              <Navigate to={halamanAwal[pengguna.role] ?? "/login"} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/admin"
          element={<RequireRole pengguna={pengguna} role="admin" />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardAdmin {...pageProps} />} />
          <Route path="data-santri" element={<DataSantri {...pageProps} />} />
          <Route
            path="data-pengajar"
            element={<DashboardAdmin {...pageProps} />}
          />
          <Route
            path="daftar-kelas"
            element={<DashboardAdmin {...pageProps} />}
          />
          <Route
            path="progres-belajar"
            element={<DashboardAdmin {...pageProps} />}
          />
          <Route
            path="pembayaran-spp"
            element={<DashboardAdmin {...pageProps} />}
          />
          <Route
            path="raport"
            element={<DashboardAdmin {...pageProps} />}
          />
          <Route
            path="pengaturan"
            element={<DashboardAdmin {...pageProps} />}
          />
        </Route>

        <Route
          path="/pengajar"
          element={<RequireRole pengguna={pengguna} role="pengajar" />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPengajar {...pageProps} />} />
          <Route path="kelas-diampu" element={<KelasDiampu {...pageProps} />} />
          <Route path="input-nilai" element={<InputNilai {...pageProps} />} />
          <Route path="progres-belajar">
            <Route
              index
              element={
                <ProgresBelajar
                  {...pageProps}
                  onDetail={(santri) =>
                    navigate(
                      `/pengajar/progres-belajar/${encodeURIComponent(santri.id)}`,
                    )
                  }
                />
              }
            />
            <Route path=":santriId" element={<DetailProgresBelajar {...pageProps} />} />
          </Route>
          <Route
            path="raport-santri"
            element={
              <div style={{ padding: 30 }}>
                <h1>Halaman Raport Berhasil Dibuka</h1>
              </div>
            }
          />
        </Route>

        <Route
          path="/walisantri"
          element={<RequireRole pengguna={pengguna} role="walisantri" />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <DashboardWalisantri pengguna={pengguna} onLogout={handleLogout} />
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to={halamanAwal[pengguna?.role] ?? "/login"}
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
