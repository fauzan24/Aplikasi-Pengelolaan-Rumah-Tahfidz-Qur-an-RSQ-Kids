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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [santriTerpilih, setSantriTerpilih] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
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
    if (pengguna?.role === "admin") {
      if (activePage === "Data Santri") {
        return <DataSantri {...pageProps} />;
      }

      return <DashboardAdmin {...pageProps} pengguna={pengguna} />;
    }

    if (pengguna?.role === "walisantri") {
      return <DashboardWalisantri {...pageProps} pengguna={pengguna} />;
    }

    switch (activePage) {
      case "Kelas Diampu":
        return <KelasDiampu {...pageProps} />;

      case "Input Nilai":
        return <InputNilai {...pageProps} />;

      case "Progres Belajar":
        return (
          <ProgresBelajar
            {...pageProps}
            onDetail={bukaDetailSantri}
          />
        );

      case "Detail Progres Belajar":
        return (
          <DetailProgresBelajar
            {...pageProps}
            santri={santriTerpilih}
            onKembali={() => setActivePage("Progres Belajar")}
          />
        );

      case "Dashboard":
      default:
        return <DashboardPengajar {...pageProps} />;
    }
  };

  return (
    <>
      <CssBaseline />
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        renderPage()
      )}
    </>
  );
}

export default App;