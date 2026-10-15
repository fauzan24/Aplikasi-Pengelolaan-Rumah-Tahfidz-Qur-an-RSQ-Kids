import { useState } from "react";
import { CssBaseline } from "@mui/material";

import Login from "./pages/auth/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardPengajar from "./pages/pengajar/DashboardPengajar";
import DashboardWalisantri from "./pages/walisantri/DashboardWalisantri";

function App() {
  const [pengguna, setPengguna] = useState(null);

  const handleLogout = () => {
    setPengguna(null);
  };

  const pageProps = {
    onNavigate: () => {},
    onLogout: handleLogout,
  };

  const renderPage = () => {
    if (pengguna?.role === "admin") {
      return <DashboardAdmin {...pageProps} pengguna={pengguna} />;
    }

    if (pengguna?.role === "walisantri") {
      return <DashboardWalisantri {...pageProps} pengguna={pengguna} />;
    }

    return <DashboardPengajar {...pageProps} />;
  };

  return (
    <>
      <CssBaseline />
      {!pengguna ? <Login onLogin={setPengguna} /> : renderPage()}
    </>
  );
}

export default App;