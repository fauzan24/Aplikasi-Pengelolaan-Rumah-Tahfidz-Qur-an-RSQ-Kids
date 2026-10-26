import { useState } from "react";
import {
  Avatar,
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
  Settings as SettingsIcon,
} from "@mui/icons-material";
import SidebarAdmin from "./SidebarAdmin";

export default function LayoutAdmin({ onNavigate, onLogout, children }) {
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
        overflow: "hidden",
        bgcolor: "#FBF9F3",
        color: "#28352C",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <SidebarAdmin
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
            height: { xs: 64, md: 72 },
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
              color: "#5A734E",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <IconButton
              aria-label="Buka menu profil"
              aria-haspopup="menu"
              aria-expanded={Boolean(profileAnchor)}
              onClick={(event) => setProfileAnchor(event.currentTarget)}
              sx={{ display: "flex", gap: 1.25, borderRadius: 2 }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  border: "2px solid #E1E8DA",
                  bgcolor: "#5A734E",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                AD
              </Avatar>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 0.25,
                  fontFamily: "inherit",
                }}
              >
                <Typography sx={{ color: "#28352C", fontSize: 11, fontWeight: 700 }}>
                  Administrator
                </Typography>
                <Typography sx={{ color: "#838B82", fontSize: 10 }}>
                  Admin
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
            overflow: "auto",
            p: { xs: "18px 12px 24px", sm: "21px 18px 26px", md: "27px 30px 32px" },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
