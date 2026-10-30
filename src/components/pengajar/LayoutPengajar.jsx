import { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  NotificationsOutlined,
  Logout,
  SettingsOutlined,
  KeyboardArrowDown,
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SidebarPengajar from "./SidebarPengajar";

export default function LayoutPengajar({ pengguna: propPengguna, onNavigate, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  const pengguna = propPengguna || (() => {
    try {
      return JSON.parse(sessionStorage.getItem("pengguna") || "null");
    } catch {
      return null;
    }
  })();

  const namaUser = pengguna?.nama || "Ustadzah Aisyah";
  const inisial = namaUser
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "UA";

  const handleProfileOpen = (e) => setProfileAnchor(e.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);

  const handleNotifOpen = (e) => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F8FAF8",
        color: "#1A251D",
      }}
    >
      <SidebarPengajar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          minWidth: 0,
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Modern Top App Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #E5ECE4",
            color: "#1A251D",
            zIndex: (theme) => theme.zIndex.drawer - 1,
          }}
        >
          <Toolbar
            sx={{
              minHeight: { xs: 64, md: 70 },
              px: { xs: 2, sm: 3, md: 4 },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {isMobile && (
                <IconButton
                  aria-label="Buka menu navigasi"
                  onClick={() => setSidebarOpen(true)}
                  edge="start"
                  sx={{ color: "#2E6F40" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: "#2E6F40",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Portal Pengajar Tahfidz
              </Typography>
            </Box>

            {/* Topbar Right Controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
              {/* Notifications */}
              <IconButton
                aria-label="Notifikasi"
                onClick={handleNotifOpen}
                sx={{
                  color: "#46594A",
                  backgroundColor: "#F0F5F0",
                  "&:hover": { backgroundColor: "#E3ECE3" },
                }}
              >
                <Badge badgeContent={2} color="warning">
                  <NotificationsOutlined sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>

              <Menu
                anchorEl={notifAnchor}
                open={Boolean(notifAnchor)}
                onClose={handleNotifClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                  paper: {
                    sx: {
                      width: 280,
                      p: 1,
                      mt: 1.5,
                      borderRadius: "14px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                      border: "1px solid #E5ECE4",
                    },
                  },
                }}
              >
                <Box sx={{ px: 1.5, py: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Pemberitahuan
                  </Typography>
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleNotifClose} sx={{ borderRadius: "8px", py: 1 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.82rem" }}>
                      Waktu Setoran Hafalan
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Kelas Pagi A dimulai pukul 08.00 WIB
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleNotifClose} sx={{ borderRadius: "8px", py: 1 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.82rem" }}>
                      Input Nilai Belum Lengkap
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      1 santri perlu dilengkapi nilainya
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>

              {/* Profile Menu */}
              <Box
                onClick={handleProfileOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  cursor: "pointer",
                  p: "4px 8px 4px 4px",
                  borderRadius: "999px",
                  border: "1px solid #E2EAE1",
                  backgroundColor: "#FFFFFF",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#F5F8F5",
                    borderColor: "#C5D8C7",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#2E6F40",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  {inisial}
                </Avatar>
                <Box sx={{ display: { xs: "none", sm: "block" }, pr: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.82rem", lineHeight: 1.2 }}>
                    {namaUser}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6A7D6E", fontSize: "0.72rem" }}>
                    Pengajar Tahfidz
                  </Typography>
                </Box>
                <KeyboardArrowDown sx={{ fontSize: 18, color: "#6A7D6E" }} />
              </Box>

              <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={handleProfileClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                  paper: {
                    sx: {
                      minWidth: 180,
                      mt: 1.5,
                      borderRadius: "14px",
                      p: 1,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                      border: "1px solid #E5ECE4",
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    navigate("/pengajar/profil");
                  }}
                  sx={{ borderRadius: "8px", py: 1, fontSize: "0.86rem" }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: "#46594A" }}>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Profil Pengajar
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    onLogout?.();
                  }}
                  sx={{ borderRadius: "8px", py: 1, fontSize: "0.86rem", color: "#DC2626" }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: "#DC2626" }}>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Keluar
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content Body */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3, md: 4 },
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
