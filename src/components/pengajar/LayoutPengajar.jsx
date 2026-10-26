import { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import SidebarPengajar from "./SidebarPengajar";

export default function LayoutPengajar({ onNavigate, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);

  const navigate = (label) => {
    setProfileAnchor(null);
    setSidebarOpen(false);
    onNavigate?.(label);
  };

  const handleLogout = () => {
    setProfileAnchor(null);
    onLogout?.();
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        "@supports (height: 100dvh)": { height: "100dvh" },
        minHeight: 0,
        overflow: "hidden",
        bgcolor: "#FBF9F3",
        color: "#28352C",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <SidebarPengajar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Box
        component="main"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <Box
          component="header"
          sx={{
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexShrink: 0,
            height: { xs: 66, md: 76 },
            px: { xs: 1.25, sm: 2.75, md: 3.75 },
            borderBottom: "1px solid #E8E6DE",
            bgcolor: "#fff",
          }}
        >
          <IconButton
            aria-label="Buka menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            sx={{
              display: "none",
              "@media (max-width:800px)": { display: "inline-flex" },
              mr: "auto",
              color: "#30442E",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 } }}>
            <IconButton
              aria-label="Notifikasi"
              title="Notifikasi"
              sx={{ color: "#5A734E" }}
            >
              <Badge
                variant="dot"
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    top: 4,
                    right: 4,
                    border: "1px solid #fff",
                    bgcolor: "#D89B3D",
                  },
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              aria-label="Buka menu profil"
              aria-haspopup="menu"
              aria-expanded={Boolean(profileAnchor)}
              onClick={(event) => setProfileAnchor(event.currentTarget)}
              sx={{ display: "flex", gap: 1.25, borderRadius: 2 }}
            >
              <Avatar
                sx={{
                  width: 39,
                  height: 39,
                  border: "2px solid #E1E8DA",
                  bgcolor: "#5A734E",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                UA
              </Avatar>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 0.25,
                }}
              >
                <Typography sx={{ color: "#28352C", fontSize: 11, fontWeight: 700 }}>
                  Ustadzah Aisyah
                </Typography>
                <Typography sx={{ color: "#838B82", fontSize: 10 }}>
                  Pengajar
                </Typography>
              </Box>
              <ExpandMoreIcon
                sx={{ display: { xs: "none", sm: "block" }, fontSize: 18 }}
              />
            </IconButton>
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              MenuListProps={{ "aria-label": "Menu profil" }}
              sx={{
                "& .MuiPaper-root": {
                  minWidth: 155,
                  border: "1px solid #E8E6DE",
                  boxShadow: "0 8px 24px rgba(30,45,30,.1)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                },
                "& .MuiMenuItem-root": { gap: 1, fontSize: 12 },
              }}
            >
              <MenuItem onClick={() => navigate("Pengaturan")}>
                <SettingsIcon fontSize="small" />
                Pengaturan
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" />
                Keluar
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box
          component="section"
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflowX: "hidden",
            overflowY: "auto",
            overscrollBehaviorY: "contain",
            WebkitOverflowScrolling: "touch",
            "& > *": { minWidth: 0 },
            p: { xs: "18px 12px 24px", sm: "22px 18px 28px", md: "28px 30px 32px" },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
