
import { useState } from "react";
import { CssBaseline } from "@mui/material";

import Login from "./pages/auth/Login";

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DataSantri from "./pages/admin/DataSantri";

import DashboardPengajar from "./pages/pengajar/DashboardPengajar";
import KelasDiampu from "./pages/pengajar/KelasDiampu";
import InputNilai from "./pages/pengajar/InputNilai";
import ProgresBelajar from "./pages/pengajar/ProgresBelajar";
import DetailProgresBelajar from "./pages/pengajar/DetailProgresBelajar";

import DashboardWalisantri from "./pages/walisantri/DashboardWalisantri";

function App() {
  const [pengguna, setPengguna] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");
  const [santriTerpilih, setSantriTerpilih] = useState(null);

  const handleLogout = () => {
    setPengguna(null);
    setActivePage("Dashboard");
    setSantriTerpilih(null);
  };

  const bukaDetailSantri = (santri) => {
    setSantriTerpilih(santri);
    setActivePage("Detail Progres Belajar");
  };

  const pageProps = {
    onNavigate: setActivePage,
    onLogout: handleLogout,
  };

  const renderPage = () => {
    // Halaman Admin
    if (pengguna?.role === "admin") {
      if (activePage === "Data Santri") {
        return <DataSantri {...pageProps} />;
      }

      return (
        <DashboardAdmin
          {...pageProps}
          pengguna={pengguna}
        />
      );
    }

    // Halaman Wali Santri
    if (pengguna?.role === "walisantri") {
      return (
        <DashboardWalisantri
          {...pageProps}
          pengguna={pengguna}
        />
      );
    }

    // Halaman Pengajar
    switch (activePage) {
      case "Kelas Diampu":
        return (
          <KelasDiampu
            {...pageProps}
            activeMenu="Kelas Diampu"
          />
        );

      case "Input Nilai":
        return (
          <InputNilai
            {...pageProps}
            activeMenu="Input Nilai"
          />
        );

      case "Progres Belajar":
        return (
          <ProgresBelajar
            {...pageProps}
            activeMenu="Progres Belajar"
            onDetail={bukaDetailSantri}
          />
        );

      case "Detail Progres Belajar":
        return (
          <DetailProgresBelajar
            {...pageProps}
            santri={santriTerpilih}
            onKembali={() =>
              setActivePage("Progres Belajar")
            }
          />
        );

      case "Raport Santri":
        return (
          <div style={{ padding: 30 }}>
            <h1>Halaman Raport Berhasil Dibuka</h1>
          </div>
        );

      case "Dashboard":
      default:
        return <DashboardPengajar {...pageProps} />;
    }
  };

  return (
    <>
      <CssBaseline />

      {!pengguna ? (
        <Login onLogin={setPengguna} />
      ) : (
        renderPage()
      )}
    </>
  );
}

export default App;
