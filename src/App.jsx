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
import DataPengajar from "./pages/admin/DataPengajar";
import DaftarKelas from "./pages/admin/DaftarKelas";
import PembayaranSPP from "./pages/admin/PembayaranSPP";
import RaportAdmin from "./pages/admin/RaportAdmin";
import LayoutAdmin from "./components/admin/LayoutAdmin";

import DashboardPengajar from "./pages/pengajar/DashboardPengajar";
import KelasDiampu from "./pages/pengajar/KelasDiampu";
import InputNilai from "./pages/pengajar/InputNilai";
import ProgresBelajar from "./pages/pengajar/ProgresBelajar";
import DetailProgresBelajar from "./pages/pengajar/DetailProgresBelajar";
import RaportPengajar from "./pages/pengajar/RaportPengajar";
import ProfilPengajar from "./pages/pengajar/ProfilPengajar";

import DashboardWalisantri from "./pages/walisantri/DashboardWalisantri";
import PendaftaranWalisantri from "./pages/walisantri/PendaftaranWalisantri";
import ProgresBelajarWalisantri from "./pages/walisantri/ProgresBelajarWalisantri";
import PembayaranSPPWalisantri from "./pages/walisantri/PembayaranSPPWalisantri";
import RaportWalisantri from "./pages/walisantri/RaportWalisantri";

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
    "Profil Pengajar": "/pengajar/profil",
  },

  walisantri: {
    Dashboard: "/walisantri/dashboard",
    "Pendaftaran Baru": "/walisantri/pendaftaran",
    "Perkembangan Belajar": "/walisantri/progres-belajar",
    "Pembayaran SPP": "/walisantri/pembayaran-spp",
    Raport: "/walisantri/raport",
  },
};

function RequireRole({ pengguna, role }) {
  if (!pengguna) {
    return <Navigate to="/login" replace />;
  }

  if (pengguna.role !== role) {
    return (
      <Navigate
        to={halamanAwal[pengguna.role] ?? "/login"}
        replace
      />
    );
  }

  return <Outlet />;
}

function App() {
  const [pengguna, setPengguna] = useState(() => {
    try {
      const dataTersimpan = sessionStorage.getItem("pengguna");
      return dataTersimpan ? JSON.parse(dataTersimpan) : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  const handleLogin = (akun) => {
    sessionStorage.setItem("pengguna", JSON.stringify(akun));
    setPengguna(akun);

    navigate(halamanAwal[akun.role] ?? "/login", {
      replace: true,
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pengguna");
    setPengguna(null);

    navigate("/login", { replace: true });
  };

  const handleMenuNavigate = (label) => {
    const tujuan = ruteMenu[pengguna?.role]?.[label];

    if (tujuan) {
      navigate(tujuan);
    }
  };

  const pageProps = {
    pengguna,
    onNavigate: handleMenuNavigate,
    onLogout: handleLogout,
  };

  return (
    <>
      <CssBaseline />

      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            pengguna ? (
              <Navigate
                to={halamanAwal[pengguna.role] ?? "/login"}
                replace
              />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <RequireRole pengguna={pengguna} role="admin" />
          }
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<DashboardAdmin {...pageProps} />}
          />

          <Route
            path="data-santri"
            element={<DataSantri {...pageProps} />}
          />

          <Route
            path="data-pengajar"
            element={<DataPengajar {...pageProps} />}
          />

          <Route
            path="daftar-kelas"
            element={<DaftarKelas {...pageProps} />}
          />

          <Route path="progres-belajar">
            <Route
              index
              element={
                <ProgresBelajar
                  {...pageProps}
                  Layout={LayoutAdmin}
                  onDetail={(santri) =>
                    navigate(
                      `/admin/progres-belajar/${encodeURIComponent(santri.id)}`
                    )
                  }
                />
              }
            />
            <Route
              path=":santriId"
              element={
                <DetailProgresBelajar {...pageProps} Layout={LayoutAdmin} />
              }
            />
          </Route>

          <Route
            path="pembayaran-spp"
            element={<PembayaranSPP {...pageProps} />}
          />

          <Route
            path="pembayaran-spp/:santriId"
            element={<PembayaranSPP {...pageProps} />}
          />

          <Route
            path="raport"
            element={<RaportAdmin {...pageProps} />}
          />

          <Route
            path="pengaturan"
            element={<DashboardAdmin {...pageProps} />}
          />
        </Route>

        {/* PENGAJAR */}
        <Route
          path="/pengajar"
          element={
            <RequireRole pengguna={pengguna} role="pengajar" />
          }
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<DashboardPengajar {...pageProps} />}
          />

          <Route
            path="kelas-diampu"
            element={<KelasDiampu {...pageProps} />}
          />

          <Route
            path="input-nilai"
            element={<InputNilai {...pageProps} />}
          />

          {/* PROGRES BELAJAR */}
          <Route path="progres-belajar">
            <Route
              index
              element={
                <ProgresBelajar
                  {...pageProps}
                  onDetail={(santri) =>
                    navigate(
                      `/pengajar/progres-belajar/${encodeURIComponent(
                        santri.id
                      )}`
                    )
                  }
                />
              }
            />

            <Route
              path=":santriId"
              element={<DetailProgresBelajar {...pageProps} />}
            />
          </Route>

          {/* RAPORT PENGAJAR */}
          <Route 
              path="raport-santri"
              element={<RaportPengajar {...pageProps} />}
            />

          {/* PROFIL PENGAJAR */}
          <Route
            path="profil"
            element={<ProfilPengajar {...pageProps} />}
          />
        </Route>

        {/* WALI SANTRI */}
        <Route
          path="/walisantri"
          element={
            <RequireRole
              pengguna={pengguna}
              role="walisantri"
            />
          }
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={
              <DashboardWalisantri
                pengguna={pengguna}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="pendaftaran"
            element={
              <PendaftaranWalisantri
                pengguna={pengguna}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="progres-belajar"
            element={
              <ProgresBelajarWalisantri
                pengguna={pengguna}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="pembayaran-spp"
            element={
              <PembayaranSPPWalisantri
                pengguna={pengguna}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="raport"
            element={
              <RaportWalisantri
                pengguna={pengguna}
                onLogout={handleLogout}
              />
            }
          />
        </Route>

        {/* RUTE TIDAK DITEMUKAN */}
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