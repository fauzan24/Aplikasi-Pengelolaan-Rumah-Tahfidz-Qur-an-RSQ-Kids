import {
  Book as BookIcon,
  Assessment as AssessmentIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  EditNote as EditNoteIcon,
  Groups as GroupsIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const menuPengajar = [
  { label: "Dashboard", to: "/pengajar/dashboard", icon: DashboardIcon },
  { label: "Kelas Diampu", to: "/pengajar/kelas-diampu", icon: GroupsIcon },
  { label: "Input Nilai", to: "/pengajar/input-nilai", icon: EditNoteIcon },
  { label: "Progres Belajar", to: "/pengajar/progres-belajar", icon: AssessmentIcon },
  { label: "Raport Santri", to: "/pengajar/raport-santri", icon: DescriptionIcon },
];

const drawerWidth = 245;

export default function SidebarPengajar({ isOpen = false, onClose }) {
  const isMobile = useMediaQuery("(max-width:800px)");

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? isOpen : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: isMobile ? 255 : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          position: isMobile ? "fixed" : "relative",
          width: isMobile ? 255 : drawerWidth,
          height: "100dvh",
          boxSizing: "border-box",
          overflowX: "hidden",
          overflowY: "auto",
          border: 0,
          bgcolor: "#30442E",
          color: "#fff",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          scrollbarWidth: "thin",
          scrollbarColor: "#65785F transparent",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          p: isMobile ? "22px 16px 18px" : "27px 16px 18px",
          "@media (max-height:520px)": {
            pt: "16px",
            pb: "12px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            mb: "40px",
            px: "9px",
            "@media (max-height:520px)": { mb: "20px" },
          }}
        >
          <Box
            component={Link}
            to="/pengajar/dashboard"
            onClick={onClose}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              color: "inherit",
              textDecoration: "none",
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 45,
                height: 45,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                border: "1px solid rgba(255,255,255,.45)",
                borderRadius: "12px",
                color: "#F8F7EF",
              }}
            >
              <BookIcon sx={{ fontSize: 31 }} />
            </Box>
            <Box>
              <Typography sx={{ mb: "5px", fontSize: 19, fontWeight: 800, letterSpacing: "-.6px", lineHeight: 1.2 }}>
                RSQ-Kids
              </Typography>
              <Typography sx={{ color: "#D5DFCE", fontSize: 10, whiteSpace: "nowrap" }}>
                Rumah Tahfidz Qur&apos;an
              </Typography>
            </Box>
          </Box>
          {isMobile && (
            <IconButton
              aria-label="Tutup sidebar"
              onClick={onClose}
              sx={{ ml: "auto", color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <List component="nav" aria-label="Menu pengajar" disablePadding sx={{ display: "grid", gap: "7px", flexShrink: 0 }}>
          {menuPengajar.map(({ label, to, icon: Icon }) => (
            <ListItemButton
              key={label}
              component={NavLink}
              to={to}
              onClick={onClose}
              className={({ isActive }) => (isActive ? "active" : "")}
              sx={{
                minHeight: 46,
                px: "14px",
                gap: "12px",
                borderRadius: "10px",
                color: "#E1E8DC",
                transition: "background .2s ease",
                "& .MuiListItemIcon-root": { minWidth: 0, color: "inherit" },
                "& .MuiListItemText-primary": {
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                },
                "&:hover, &.active": { bgcolor: "#506748", color: "#fff" },
                "&.active": { boxShadow: "inset 3px 0 #D5E1CA" },
              }}
            >
              <ListItemIcon><Icon fontSize="small" /></ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ mt: "auto", pt: "20px", flexShrink: 0, "@media (max-height:520px)": { pt: "12px" } }}>
          <Box
            sx={{
              p: "15px 13px",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: "12px",
              bgcolor: "rgba(255,255,255,.07)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "7px", mb: "9px" }}>
              <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#A8C69A" }} />
              <Typography sx={{ color: "#DDE7D6", fontSize: 10, fontWeight: 700, letterSpacing: ".5px" }}>
                TAHUN AJARAN
              </Typography>
            </Box>
            <Typography sx={{ mb: "4px", fontSize: 13, fontWeight: 700 }}>
              2026 / 2027
            </Typography>
            <Typography sx={{ color: "#D3DDD0", fontSize: 10 }}>
              Semester Ganjil
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
