import { useState } from "react";
import {
  AssignmentTurnedIn,
  CheckCircleRounded,
  ClassOutlined,
  MenuBook,
  HourglassEmptyRounded,
  PeopleAltOutlined,
  SchoolOutlined,
  Search,
  Add,
  ArrowForward,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../components/admin/LayoutAdmin";

const initialRingkasan = [
  {
    label: "Total Santri",
    jumlah: 20,
    icon: PeopleAltOutlined,
    warna: "#2E6F40",
    latar: "#EBF5ED",
  },
  {
    label: "Total Pengajar",
    jumlah: 4,
    icon: SchoolOutlined,
    warna: "#2563EB",
    latar: "#EFF6FF",
  },
  {
    label: "Kelas Berjalan",
    jumlah: 2,
    icon: ClassOutlined,
    warna: "#D97706",
    latar: "#FEF3C7",
  },
  {
    label: "Daftar Tunggu",
    jumlah: 3,
    pertumbuhan: "Perlu konfirmasi",
    icon: HourglassEmptyRounded,
    warna: "#DC2626",
    latar: "#FEE2E2",
  },
];

const initialPendaftaran = [
  { id: 1, nama: "Raffa Fadilla", tanggal: "27 Maret 2026", kelas: "Pagi", status: "Menunggu" },
  { id: 2, nama: "Aisyah Putri", tanggal: "25 Maret 2026", kelas: "Sore", status: "Menunggu" },
  { id: 3, nama: "Nabila Rahma", tanggal: "15 Maret 2026", kelas: "Pagi", status: "Diterima" },
  { id: 4, nama: "Muhammad Abi", tanggal: "13 Maret 2026", kelas: "Sore", status: "Diterima" },
  { id: 5, nama: "Ahmad Nabil", tanggal: "10 Maret 2026", kelas: "Pagi", status: "Diterima" },
];

export default function DashboardAdmin({ onNavigate, onLogout }) {
  const navigate = useNavigate();
  const [tabFilter, setTabFilter] = useState("semua");
  const [search, setSearch] = useState("");
  const [pendaftaranList, setPendaftaranList] = useState(initialPendaftaran);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleTerima = (id) => {
    setPendaftaranList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Diterima" } : item))
    );
    setSnackbar({ open: true, message: "Status santri berhasil diperbarui menjadi Diterima!" });
  };

  const filteredPendaftaran = pendaftaranList.filter((item) => {
    const matchesTab =
      tabFilter === "semua" ||
      (tabFilter === "menunggu" && item.status === "Menunggu") ||
      (tabFilter === "diterima" && item.status === "Diterima");

    const matchesSearch = item.nama.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <LayoutAdmin onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {/* Welcome Hero Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            background: "linear-gradient(135deg, #2E6F40 0%, #1B4527 100%)",
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(30, 75, 42, 0.15)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2.5,
            }}
          >
            <Box>
              <Chip
                label="PUSAT KONTROL ADMINISTRATOR"
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
                Ahlan wa Sahlan, Administrator
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", maxWidth: 560 }}>
                Kelola data santri, absensi, rapor hafalan, dan administrasi keuangan Rumah Sahabat Qur'an RSQ-Kids Batam.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/admin/data-santri")}
              sx={{
                backgroundColor: "#F59E0B",
                color: "#1B2A1E",
                fontWeight: 700,
                fontSize: "0.88rem",
                px: 2.75,
                py: 1.25,
                borderRadius: "12px",
                boxShadow: "0 4px 14px rgba(245, 158, 11, 0.35)",
                "&:hover": {
                  backgroundColor: "#D97706",
                },
              }}
            >
              Kelola Data Santri
            </Button>
          </Box>
        </Paper>

        {/* 4 Interactive Stat Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {initialRingkasan.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                sx={{
                  width: "100%",
                  p: 2.5,
                  borderRadius: "16px",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 25px -4px rgba(0,0,0,0.08)",
                    borderColor: item.warna,
                  },
                }}
              >
                <CardContent sx={{ p: 0, width: "100%", "&:last-child": { pb: 0 } }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#6A7E6D", mb: 0.5 }}>
                        {item.label}
                      </Typography>

                      <Typography variant="h3" sx={{ fontWeight: 800, color: "#1A251D", mb: 0.5 }}>
                        {item.jumlah}
                      </Typography>

                      <Typography variant="caption" sx={{ color: "#6A7E6D", fontWeight: 500 }}>
                        {item.pertumbuhan}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "12px",
                        backgroundColor: item.latar,
                        color: item.warna,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                        ml: "auto",
                      }}
                    >
                      <Icon sx={{ fontSize: 22 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Registration Table with Interactive Tabs and Live Search */}
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
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ md: "center" }}
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                  Pendaftaran Santri Terbaru
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Daftar calon santri yang mendaftar ke Rumah Sahabat Qur'an.
                </Typography>
              </Box>

              <TextField
                size="small"
                placeholder="Cari nama santri..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: { xs: "100%", sm: 260 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#8E9E90", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Filter Tabs */}
            <Tabs
              value={tabFilter}
              onChange={(_, val) => setTabFilter(val)}
              sx={{
                mt: 2,
                minHeight: 40,
                "& .MuiTab-root": {
                  minHeight: 38,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#6A7D6E",
                  "&.Mui-selected": { color: "#2E6F40", fontWeight: 700 },
                },
                "& .MuiTabs-indicator": { backgroundColor: "#2E6F40", height: 3, borderRadius: "3px" },
              }}
            >
              <Tab value="semua" label={`Semua (${pendaftaranList.length})`} />
              <Tab
                value="menunggu"
                label={`Menunggu (${pendaftaranList.filter((x) => x.status === "Menunggu").length})`}
              />
              <Tab
                value="diterima"
                label={`Diterima (${pendaftaranList.filter((x) => x.status === "Diterima").length})`}
              />
            </Tabs>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: 60 }}>NO</TableCell>
                  <TableCell>NAMA SANTRI</TableCell>
                  <TableCell>TANGGAL DAFTAR</TableCell>
                  <TableCell>PILIHAN KELAS</TableCell>
                  <TableCell>STATUS</TableCell>
                  <TableCell align="center">AKSI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPendaftaran.length > 0 ? (
                  filteredPendaftaran.map((item, idx) => {
                    const isDiterima = item.status === "Diterima";
                    return (
                      <TableRow key={item.id} hover>
                        <TableCell align="center" sx={{ color: "#879B8A", fontWeight: 600 }}>
                          {idx + 1}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#1B2A1E" }}>
                          {item.nama}
                        </TableCell>
                        <TableCell sx={{ color: "#5F7463" }}>{item.tanggal}</TableCell>
                        <TableCell>
                          <Chip
                            label={`Kelas ${item.kelas}`}
                            size="small"
                            sx={{
                              backgroundColor: item.kelas === "Pagi" ? "#EDF5EE" : "#FFF7EB",
                              color: item.kelas === "Pagi" ? "#2E6F40" : "#B45309",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            icon={
                              isDiterima ? (
                                <CheckCircleRounded sx={{ fontSize: "14px !important" }} />
                              ) : (
                                <HourglassEmptyRounded sx={{ fontSize: "14px !important" }} />
                              )
                            }
                            label={item.status}
                            sx={{
                              backgroundColor: isDiterima ? "#DCFCE7" : "#FEF3C7",
                              color: isDiterima ? "#166534" : "#92400E",
                              fontWeight: 700,
                              fontSize: "0.78rem",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {isDiterima ? (
                            <Typography variant="caption" sx={{ color: "#166534", fontWeight: 700 }}>
                              ✓ Terverifikasi
                            </Typography>
                          ) : (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleTerima(item.id)}
                              sx={{
                                borderColor: "#2E6F40",
                                color: "#2E6F40",
                                py: 0.4,
                                px: 1.5,
                                fontSize: "0.78rem",
                                fontWeight: 700,
                                borderRadius: "8px",
                                "&:hover": {
                                  backgroundColor: "#2E6F40",
                                  color: "#FFF",
                                },
                              }}
                            >
                              Terima Santri
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: "#8E9E90" }}>
                      Tidak ada santri yang cocok dengan filter atau pencarian.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              p: 2,
              px: 3,
              backgroundColor: "#FCFDFC",
              borderTop: "1px solid #EEF3ED",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Menampilkan {filteredPendaftaran.length} dari {pendaftaranList.length} data pendaftaran
            </Typography>

            <Button
              endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
              onClick={() => navigate("/admin/data-santri")}
              sx={{ color: "#2E6F40", fontWeight: 700, fontSize: "0.82rem" }}
            >
              Lihat Seluruh Data Santri
            </Button>
          </Box>
        </Paper>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ borderRadius: "10px" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LayoutAdmin>
  );
}
