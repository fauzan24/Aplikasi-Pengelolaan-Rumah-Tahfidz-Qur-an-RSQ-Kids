import { useState } from "react";
import {
  NotificationsOutlined,
  ExpandMore,
  Logout,
  Menu as MenuIcon,
  SettingsOutlined,
} from "@mui/icons-material";
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
} from "@mui/material";
import SidebarPengajar from "./SidebarPengajar";

export default function LayoutPengajar({
  onLogout,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const isMobile = useMediaQuery("(max-width:800px)");

  const tutupProfil = () => setProfileAnchor(null);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100dvh",
        "@supports not (height: 100dvh)": { height: "100vh" },
        minHeight: 0,
        overflow: "hidden",
        bgcolor: "#FBF9F3",
        color: "#28352C",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

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
        <AppBar
          component="header"
          position="static"
          elevation={0}
          sx={{
            flexShrink: 0,
            bgcolor: "#fff",
            color: "#28352C",
            borderBottom: "1px solid #E8E6DE",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 66, sm: 76 },
              px: { xs: 1.25, sm: 2.75, lg: 3.75 },
              justifyContent: "flex-end",
              gap: { xs: 1, sm: 2.5 },
            }}
          >
            {isMobile && (
              <IconButton
                aria-label="Buka menu"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(true)}
                sx={{ mr: "auto", color: "#30442E" }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <IconButton
              aria-label="Notifikasi"
              title="Notifikasi"
              sx={{ color: "#5A734E" }}
            >
              <Badge
                variant="dot"
                color="warning"
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    top: 4,
                    right: 4,
                    border: "1px solid #fff",
                  },
                }}
              >
                <NotificationsOutlined />
              </Badge>
            </IconButton>

            <Box
              component="button"
              type="button"
              aria-haspopup="menu"
              aria-expanded={Boolean(profileAnchor)}
              onClick={(event) => setProfileAnchor(event.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0, sm: 1.25 },
                p: 0,
                border: 0,
                bgcolor: "transparent",
                color: "inherit",
                textAlign: "left",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              <Avatar
                sx={{
                  width: 39,
                  height: 39,
                  border: "2px solid #E1E8DA",
                  bgcolor: "#5A734E",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                UA
              </Avatar>
              <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", gap: 0.35 }}>
                <Typography component="strong" sx={{ fontSize: 11, fontWeight: 700 }}>
                  Ustadzah Aisyah
                </Typography>
                <Typography component="span" sx={{ color: "#838B82", fontSize: 10 }}>
                  Pengajar
                </Typography>
              </Box>
              <ExpandMore sx={{ display: { xs: "none", sm: "block" }, fontSize: 18 }} />
            </Box>

            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={tutupProfil}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 160,
                    border: "1px solid #E8E6DE",
                    borderRadius: 2,
                    boxShadow: "0 8px 24px rgba(30,45,30,.1)",
                  },
                },
              }}
            >
              <MenuItem
                onClick={tutupProfil}
                sx={{ gap: 1, fontSize: 12 }}
              >
                <SettingsOutlined fontSize="small" />
                Profil
              </MenuItem>
              <MenuItem
                onClick={() => {
                  tutupProfil();
                  onLogout?.();
                }}
                sx={{ gap: 1, fontSize: 12 }}
              >
                <Logout fontSize="small" />
                Keluar
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            width: "100%",
            p: { xs: "18px 12px 24px", sm: "22px 18px 28px", md: "24px 22px 28px", lg: "28px 30px 32px" },
            overflowX: "hidden",
            overflowY: "auto",
            overscrollBehaviorY: "contain",
            WebkitOverflowScrolling: "touch",
            "& > *": { minWidth: 0 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
