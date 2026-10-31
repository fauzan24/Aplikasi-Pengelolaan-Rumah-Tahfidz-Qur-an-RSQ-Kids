import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  KeyboardArrowDown,
  Logout,
  Menu as MenuIcon,
  Person,
} from "@mui/icons-material";
import SidebarWalisantri from "./SidebarWalisantri";

export default function LayoutWalisantri({ pengguna, onLogout, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const namaUser = pengguna?.nama || "Bapak Ahmad";
  const inisial = namaUser
    .split(" ")
    .map((bagian) => bagian[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Box sx={{ display: "flex", width: "100%", minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <SidebarWalisantri isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", minWidth: 0, minHeight: "100vh" }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: "text.primary",
            zIndex: (muiTheme) => muiTheme.zIndex.drawer - 1,
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 64, md: 70 }, px: { xs: 2, sm: 3, md: 4 }, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {isMobile && (
                <IconButton
                  aria-label="Buka navigasi"
                  onClick={() => setSidebarOpen(true)}
                  edge="start"
                  sx={{ color: "primary.main" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "primary.main", display: { xs: "none", sm: "block" } }}
              >
                Portal Wali Santri
              </Typography>
            </Box>

            <Box
              component="button"
              type="button"
              aria-label="Buka menu profil"
              aria-haspopup="menu"
              aria-expanded={Boolean(profileAnchor)}
              onClick={(event) => setProfileAnchor(event.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                cursor: "pointer",
                p: "4px 8px 4px 4px",
                borderRadius: "999px",
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
                color: "text.primary",
                font: "inherit",
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: "background.default", borderColor: "primary.light" },
              }}
            >
              <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: "0.85rem", fontWeight: 700 }}>
                {inisial}
              </Avatar>
              <Box sx={{ display: { xs: "none", sm: "block" }, pr: 0.5, textAlign: "left" }}>
                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.82rem", lineHeight: 1.2 }}>
                  {namaUser}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                  Wali Santri
                </Typography>
              </Box>
              <KeyboardArrowDown sx={{ fontSize: 18, color: "text.secondary" }} />
            </Box>
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              slotProps={{
                paper: {
                  sx: {
                    minWidth: 180,
                    mt: 1.5,
                    p: 1,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setProfileAnchor(null);
                  setProfileOpen(true);
                }}
                sx={{ borderRadius: 1, py: 1, fontSize: "0.86rem" }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: "text.secondary" }}>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profil Wali
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={() => {
                  setProfileAnchor(null);
                  onLogout?.();
                }}
                sx={{ borderRadius: 1, py: 1, fontSize: "0.86rem", color: "error.main" }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: "error.main" }}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Keluar
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 }, overflowY: "auto" }}>
          {children}
        </Box>
      </Box>
      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>{inisial}</Avatar>
            <Typography variant="h6">{namaUser}</Typography>
            <Typography variant="body2" color="text.secondary">Wali Santri</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
