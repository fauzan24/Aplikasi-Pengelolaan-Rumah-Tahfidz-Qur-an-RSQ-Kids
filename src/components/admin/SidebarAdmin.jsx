import {
  Book as BookIcon,
  Class as ClassIcon,
  CreditCard as CreditCardIcon,
  Home as HomeIcon,
  MenuBook as MenuBookIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Close as CloseIcon,
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

const menuAdmin = [
  { label: "Beranda", to: "/admin/dashboard", icon: HomeIcon },
  { label: "Data Santri", to: "/admin/data-santri", icon: PeopleIcon },
  { label: "Data Pengajar", to: "/admin/data-pengajar", icon: SchoolIcon },
  { label: "Daftar Kelas", to: "/admin/daftar-kelas", icon: ClassIcon },
  { label: "Progres Belajar", to: "/admin/progres-belajar", icon: AssessmentIcon },
  { label: "Pembayaran SPP", to: "/admin/pembayaran-spp", icon: CreditCardIcon },
  { label: "Raport", to: "/admin/raport", icon: MenuBookIcon },
];

const drawerWidth = 245;

export default function SidebarAdmin({ isOpen = false, onClose }) {
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
          border: 0,
          bgcolor: "#30442E",
          color: "#fff",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          p: isMobile ? "22px 15px 18px" : "25px 15px 18px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: "35px", px: "8px" }}>
          <Box
            component={Link}
            to="/admin/dashboard"
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
                width: 43,
                height: 43,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                border: "1px solid rgba(255,255,255,.42)",
                borderRadius: "11px",
                color: "#F8F7EF",
              }}
            >
              <BookIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography sx={{ mb: "4px", fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>
                RSQ-Kids
              </Typography>
              <Typography sx={{ color: "#D5DFCE", fontSize: 9, whiteSpace: "nowrap" }}>
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

        <List component="nav" aria-label="Menu admin" disablePadding sx={{ display: "grid", gap: "6px" }}>
          {menuAdmin.map(({ label, to, icon: Icon }) => (
            <ListItemButton
              key={label}
              component={NavLink}
              to={to}
              onClick={onClose}
              className={({ isActive }) => (isActive ? "active" : "")}
              sx={{
                minHeight: 44,
                px: "13px",
                gap: "12px",
                borderRadius: "9px",
                color: "#E1E8DC",
                transition: "background .18s ease",
                "& .MuiListItemIcon-root": { minWidth: 0, color: "inherit" },
                "& .MuiListItemText-primary": {
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
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

        <Typography sx={{ mt: "auto", px: "10px", pt: "15px", color: "#D5DFCE", fontSize: 10, lineHeight: 1.6 }}>
          Tahun Ajaran 2026 / 2027
          <br />
          Semester Ganjil
        </Typography>
      </Box>
    </Drawer>
  );
}
