import {
  MenuBook,
  DashboardOutlined,
  GroupsOutlined,
  EditNoteOutlined,
  AssessmentOutlined,
  DescriptionOutlined,
  Close,
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
  Chip,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const menuPengajar = [
  { label: "Dashboard", to: "/pengajar/dashboard", icon: DashboardOutlined },
  { label: "Kelas Diampu", to: "/pengajar/kelas-diampu", icon: GroupsOutlined },
  { label: "Input Nilai", to: "/pengajar/input-nilai", icon: EditNoteOutlined },
  { label: "Progres Belajar", to: "/pengajar/progres-belajar", icon: AssessmentOutlined },
  { label: "Raport Santri", to: "/pengajar/raport-santri", icon: DescriptionOutlined },
];

const drawerWidth = 260;

export default function SidebarPengajar({ isOpen = false, onClose }) {
  const isMobile = useMediaQuery("(max-width:900px)");

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2.5,
        backgroundColor: "#1E3D25",
        color: "#FFFFFF",
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3.5,
          px: 1,
        }}
      >
        <Box
          component={Link}
          to="/pengajar/dashboard"
          onClick={onClose}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3A8350 0%, #255C34 100%)",
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            }}
          >
            <MenuBook sx={{ color: "#FFF", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
              RSQ-Kids
            </Typography>
            <Typography variant="caption" sx={{ color: "#A7C4AD", fontWeight: 500, fontSize: "0.72rem" }}>
              Portal Pengajar
            </Typography>
          </Box>
        </Box>

        {isMobile && (
          <IconButton aria-label="Tutup sidebar" onClick={onClose} sx={{ color: "#FFF" }}>
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Navigation List */}
      <List component="nav" disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        {menuPengajar.map(({ label, to, icon: Icon }) => (
          <ListItemButton
            key={label}
            component={NavLink}
            to={to}
            onClick={onClose}
            sx={{
              minHeight: 46,
              px: 2,
              borderRadius: "12px",
              color: "#C2D9C7",
              transition: "all 0.2s ease",
              "& .MuiListItemIcon-root": {
                minWidth: 36,
                color: "#A2C1A8",
                transition: "color 0.2s ease",
              },
              "& .MuiListItemText-primary": {
                fontSize: "0.88rem",
                fontWeight: 500,
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
                "& .MuiListItemIcon-root": { color: "#FFFFFF" },
              },
              "&.active": {
                backgroundColor: "#2E6F40",
                color: "#FFFFFF",
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(46, 111, 64, 0.4)",
                "& .MuiListItemIcon-root": { color: "#FBBF24" },
                "& .MuiListItemText-primary": { fontWeight: 700 },
              },
            }}
          >
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>

      {/* Bottom Academic Year Widget */}
      <Box
        sx={{
          mt: "auto",
          p: 2,
          borderRadius: "14px",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Chip
          label="TAHUN AJARAN"
          size="small"
          sx={{
            height: 20,
            fontSize: "0.65rem",
            fontWeight: 800,
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            color: "#FBBF24",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            mb: 1,
          }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.9rem" }}>
          2026 / 2027
        </Typography>
        <Typography variant="caption" sx={{ color: "#B3CBBB", display: "block", fontSize: "0.75rem" }}>
          Semester Ganjil · Aktif
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? isOpen : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          backgroundColor: "#1E3D25",
        },
      }}
    >
      {content}
    </Drawer>
  );
}
