import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Stack,
  Avatar,
  Chip,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  MenuBook,
  Logout,
  NotificationsOutlined,
  CheckCircleRounded,
  AccountBalanceWalletOutlined,
  CalendarTodayOutlined,
  WhatsApp,
  Download,
  SchoolOutlined,
  TrendingUpRounded,
  StarRounded,
} from "@mui/icons-material";

const aktivitasSantri = [
  { tanggal: "25 Okt 2026", materi: "Surah Al-Mulk ayat 1-10", capaian: "Sangat Baik (Mumtaz)", ustadzah: "Ust. Aisyah" },
  { tanggal: "22 Okt 2026", materi: "Muroja'ah Juz 30 (Surah An-Naba)", capaian: "Lancar (Jayyid Jiddan)", ustadzah: "Ust. Aisyah" },
  { tanggal: "19 Okt 2026", materi: "Iqro Jilid 4 Halaman 12-14", capaian: "Lancar & Makhraj Tepat", ustadzah: "Ust. Aisyah" },
  { tanggal: "15 Okt 2026", materi: "Hafalan Doa Sebelum & Sesudah Wudhu", capaian: "Hafal Lengkap", ustadzah: "Ust. Aisyah" },
  { tanggal: "12 Okt 2026", materi: "Hadits Menuntut Ilmu", capaian: "Lancar", ustadzah: "Ust. Aisyah" },
];

export default function DashboardWalisantri({ pengguna, onLogout }) {
  const [filter, setFilter] = useState("Semua");

  const unduhLaporan = () => {
    alert("Mengunduh rangkuman capaian hafalan ananda Fauzan Najib Ali (PDF)...");
  };

  const hubungiUstadzah = () => {
    window.open("https://wa.me/6282172819921?text=Assalamu'alaikum%20Ustadzah%20Aisyah,%20saya%20wali%20santri%20dari%20Fauzan%20Najib%20Ali", "_blank");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F8FAF8",
        color: "#1A251D",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E5ECE4",
          color: "#1A251D",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 72 },
            px: { xs: 2, sm: 4, md: 6 },
            justifyContent: "space-between",
          }}
        >
          {/* Logo Brand */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2E6F40 0%, #1A4426 100%)",
                display: "grid",
                placeItems: "center",
                color: "#FFF",
                boxShadow: "0 4px 12px rgba(46, 111, 64, 0.25)",
              }}
            >
              <MenuBook sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#1B2A1E", lineHeight: 1.2 }}>
                RSQ-Kids Batam
              </Typography>
              <Typography variant="caption" sx={{ color: "#6A7D6E", fontWeight: 500 }}>
                Portal Pantau Wali Santri
              </Typography>
            </Box>
          </Stack>

          {/* User & Logout */}
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              sx={{
                color: "#46594A",
                backgroundColor: "#F0F5F0",
                "&:hover": { backgroundColor: "#E3ECE3" },
              }}
            >
              <Badge badgeContent={1} color="warning">
                <NotificationsOutlined sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>

            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  backgroundColor: "#D97706",
                  color: "#FFF",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                {pengguna?.nama ? pengguna.nama.slice(0, 2).toUpperCase() : "WA"}
              </Avatar>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#1B2A1E", lineHeight: 1.2 }}>
                  {pengguna?.nama || "Bapak Ahmad"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#6A7D6E" }}>
                  Wali dari Fauzan
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="outlined"
              size="small"
              startIcon={<Logout />}
              onClick={onLogout}
              sx={{
                borderRadius: "10px",
                borderColor: "#E0E8DF",
                color: "#DC2626",
                "&:hover": {
                  borderColor: "#DC2626",
                  backgroundColor: "#FEF2F2",
                },
              }}
            >
              Keluar
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 3, md: 4.5 }, px: { xs: 2, sm: 3 } }}>
        <Stack spacing={3.5}>
          {/* Welcome Banner */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "20px",
              background: "linear-gradient(135deg, #2E6F40 0%, #173E22 100%)",
              color: "#FFFFFF",
              boxShadow: "0 10px 30px rgba(30, 75, 42, 0.15)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2.5,
            }}
          >
            <Box>
              <Chip
                label="PORTAL SANTRI TAHFIDZ"
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#FBBF24",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  letterSpacing: "0.06em",
                  mb: 1.5,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#FFF", mb: 0.75 }}>
                Ahlan wa Sahlan, {pengguna?.nama || "Bapak Ahmad"} 👋
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", maxWidth: 540 }}>
                Pantau langsung capaian ayat hafalan, absensi halaqah, dan evaluasi raport ananda secara berkala dari mana saja.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={unduhLaporan}
                sx={{
                  color: "#FFF",
                  borderColor: "rgba(255,255,255,0.4)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "#FFF",
                    backgroundColor: "rgba(255,255,255,0.18)",
                  },
                }}
              >
                Unduh Rapor Ananda
              </Button>
              <Button
                variant="contained"
                startIcon={<WhatsApp />}
                onClick={hubungiUstadzah}
                sx={{
                  backgroundColor: "#22C55E",
                  color: "#FFF",
                  borderRadius: "12px",
                  fontWeight: 700,
                  boxShadow: "0 4px 14px rgba(34, 197, 94, 0.35)",
                  "&:hover": { backgroundColor: "#16A34A" },
                }}
              >
                Hubungi Asatidz
              </Button>
            </Stack>
          </Paper>

          {/* Grid: Child Progress Card + Info Widgets */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" },
              gap: 3,
            }}
          >
            {/* Child Profile & Progress Card */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: "20px",
                border: "1px solid #E5ECE4",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E", mb: 2.5 }}>
                Profil & Capaian Belajar Ananda
              </Typography>

              <Stack direction="row" spacing={2.5} alignItems="center" mb={3}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#2E6F40",
                    color: "#FFF",
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    boxShadow: "0 4px 12px rgba(46, 111, 64, 0.25)",
                  }}
                >
                  FN
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                    Fauzan Najib Ali
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    NIS: RSQ006 · Kelas Pagi A
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#2E6F40", fontWeight: 700, display: "block", mt: 0.25 }}>
                    Pembimbing: Ustadzah Aisyah
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ p: 2.5, borderRadius: "14px", backgroundColor: "#F9FAF8", border: "1px solid #E5ECE4" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#2E6F40" }}>
                    Progres Target Hafalan Semester Ini (Juz 30)
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#2E6F40" }}>
                    78%
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={78}
                  sx={{
                    height: 10,
                    borderRadius: "999px",
                    backgroundColor: "#E2ECE2",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: "999px",
                      backgroundColor: "#2E6F40",
                    },
                  }}
                />

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
                  <StarRounded sx={{ color: "#D97706", fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: "#5F7463", fontWeight: 600 }}>
                    Capaian Terakhir: Surah Al-Mulk ayat 1-10 & Muroja'ah Surah An-Naba
                  </Typography>
                </Stack>
              </Box>
            </Paper>

            {/* Academic & Administrative Status */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: "20px",
                border: "1px solid #E5ECE4",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E", mb: 2.5 }}>
                Informasi & Status
              </Typography>

              <Stack spacing={2}>
                <Card sx={{ p: 2, borderRadius: "14px", backgroundColor: "#FBFDFB" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "10px",
                        backgroundColor: "#DCFCE7",
                        color: "#166534",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <CheckCircleRounded sx={{ fontSize: 22 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">STATUS BELAJAR</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#166534" }}>
                        Aktif Mengikuti Halaqah
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                <Card sx={{ p: 2, borderRadius: "14px", backgroundColor: "#FBFDFB" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "10px",
                        backgroundColor: "#FEF3C7",
                        color: "#B45309",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <AccountBalanceWalletOutlined sx={{ fontSize: 22 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">STATUS SPP TAHFIDZ</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#B45309" }}>
                        Bulan Oktober · Lunas ✓
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                <Card sx={{ p: 2, borderRadius: "14px", backgroundColor: "#FBFDFB" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "10px",
                        backgroundColor: "#EFF6FF",
                        color: "#2563EB",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <CalendarTodayOutlined sx={{ fontSize: 20 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">JADWAL KELAS SELANJUTNYA</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1E40AF" }}>
                        Rabu, 08.00 WIB (Ruang Abu Bakar)
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Stack>
            </Paper>
          </Box>

          {/* Activity Log Table */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "18px",
              border: "1px solid #E5ECE4",
              backgroundColor: "#FFFFFF",
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: { xs: 2.5, sm: 3 }, borderBottom: "1px solid #EEF3ED" }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                Aktivitas & Catatan Setoran Terbaru Ananda
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Catatan mutaba'ah harian dari Ustadzah pembimbing.
              </Typography>
            </Box>

            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ width: 60 }}>NO</TableCell>
                    <TableCell>TANGGAL</TableCell>
                    <TableCell>MATERI / SURAH SETORAN</TableCell>
                    <TableCell>CAPAIAN & HASIL</TableCell>
                    <TableCell>PEMBIMBING</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aktivitasSantri.map((item, idx) => (
                    <TableRow key={item.tanggal} hover>
                      <TableCell align="center" sx={{ color: "#8E9E90", fontWeight: 600 }}>
                        {idx + 1}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#1A251D" }}>
                        {item.tanggal}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#2E6F40" }}>
                        {item.materi}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.capaian}
                          size="small"
                          sx={{
                            backgroundColor: "#DCFCE7",
                            color: "#166534",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#5F7463", fontWeight: 500 }}>
                        {item.ustadzah}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
