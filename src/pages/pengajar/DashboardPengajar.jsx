import { useMemo, useState } from "react";
import {
  Add,
  AssignmentTurnedIn,
  CheckCircleRounded,
  Download,
  MenuBook,
  PeopleAltOutlined,
  HourglassEmptyRounded,
  Search,
  SchoolOutlined,
  ArrowForward,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";
import { useNilai } from "../../context/NilaiContext";

export default function DashboardPengajar({ onLogout, onNavigate }) {
  const navigate = useNavigate();
  const { santri } = useNilai();
  const [keyword, setKeyword] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [toast, setToast] = useState({ open: false, message: "" });

  const aspekPenilaian = ["bacaan", "doa", "tahfidz", "hadits", "adab"];

  const hitungRataRata = (item) => {
    const total = aspekPenilaian.reduce((sum, aspek) => sum + Number(item[aspek] || 0), 0);
    return (total / aspekPenilaian.length).toFixed(1);
  };

  const isLengkap = (item) => {
    return aspekPenilaian.every(
      (aspek) =>
        item[aspek] !== "" &&
        item[aspek] !== null &&
        item[aspek] !== undefined &&
        item[aspek] !== "-" &&
        Number.isFinite(Number(item[aspek]))
    );
  };

  const jumlahLengkap = santri.filter(isLengkap).length;
  const jumlahBelum = santri.length - jumlahLengkap;

  const dataTampil = useMemo(() => {
    return santri.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
        item.nis.toLowerCase().includes(keyword.toLowerCase());

      const matchKelas = filterKelas === "Semua" || item.kelas === filterKelas;

      const lengkap = isLengkap(item);
      const matchStatus =
        filterStatus === "Semua" ||
        (filterStatus === "Lengkap" && lengkap) ||
        (filterStatus === "Belum" && !lengkap);

      return matchSearch && matchKelas && matchStatus;
    });
  }, [santri, keyword, filterKelas, filterStatus]);

  const unduhRekap = () => {
    const header = ["NIS", "Nama Santri", "Kelas", "Rata-rata", "Status"];
    const rows = dataTampil.map((item) => [
      item.nis,
      item.nama,
      item.kelas,
      hitungRataRata(item),
      isLengkap(item) ? "Lengkap" : "Belum Lengkap",
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rekap-nilai-santri-rsq-kids.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setToast({ open: true, message: "Rekap nilai CSV berhasil diunduh!" });
  };

  const kartuStat = [
    {
      label: "Total Santri Binaan",
      angka: santri.length,
      desc: "Santri aktif terdaftar",
      icon: PeopleAltOutlined,
      color: "#2E6F40",
      bg: "#EBF5ED",
    },
    {
      label: "Kelas Diampu",
      angka: "2",
      desc: "Kelas Pagi & Kelas Sore",
      icon: MenuBook,
      color: "#D97706",
      bg: "#FEF3C7",
    },
    {
      label: "Nilai Terinput Lengkap",
      angka: `${jumlahLengkap} / ${santri.length}`,
      desc: "Siap cetak rapor",
      icon: CheckCircleRounded,
      color: "#16A34A",
      bg: "#DCFCE7",
    },
    {
      label: "Perlu Dilengkapi",
      angka: jumlahBelum,
      desc: "Belum lengkap nilainya",
      icon: HourglassEmptyRounded,
      color: "#DC2626",
      bg: "#FEE2E2",
    },
  ];

  return (
    <LayoutPengajar onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {/* Welcome Hero Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            background: "linear-gradient(135deg, #2E6F40 0%, #1A4426 100%)",
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
                label="SEMESTER GANJIL · T.A 2026/2027"
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
                Selamat Datang, Ustadzah Aisyah
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", maxWidth: 560 }}>
                Pantau perkembangan hafalan santri, input nilai harian, dan pantau kelengkapan raport santri binaan ananda.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ width: { xs: "100%", md: "auto" } }}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={unduhRekap}
                sx={{
                  flex: { xs: 1, sm: "initial" },
                  color: "#FFFFFF",
                  borderColor: "rgba(255,255,255,0.4)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  fontWeight: 700,
                  fontSize: "0.86rem",
                  py: 1.15,
                  px: 2.2,
                  borderRadius: "12px",
                  "&:hover": {
                    borderColor: "#FFFFFF",
                    backgroundColor: "rgba(255,255,255,0.18)",
                  },
                }}
              >
                Unduh Rekap
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate("/pengajar/input-nilai")}
                sx={{
                  flex: { xs: 1, sm: "initial" },
                  backgroundColor: "#F59E0B",
                  color: "#1B2A1E",
                  fontWeight: 700,
                  fontSize: "0.86rem",
                  py: 1.15,
                  px: 2.5,
                  borderRadius: "12px",
                  boxShadow: "0 4px 14px rgba(245, 158, 11, 0.35)",
                  "&:hover": {
                    backgroundColor: "#D97706",
                  },
                }}
              >
                Input Nilai
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* 4 Stat Cards */}
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
          {kartuStat.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                sx={{
                  width: "100%",
                  p: 2.5,
                  borderRadius: "16px",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 25px -4px rgba(0,0,0,0.08)",
                    borderColor: item.color,
                  },
                }}
              >
              <CardContent sx={{ p: 0, width: "100%", "&:last-child": { pb: 0 } }}>
                {/* Stack utama yang membagi area Kiri (Teks) dan Kanan (Ikon) */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  {/* KELOMPOK KIRI: Semua Teks */}
                  <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#6A7E6D", mb: 0.5 }}>
                      {item.label}
                    </Typography>

                    <Typography variant="h3" sx={{ fontWeight: 800, color: "#1A251D", mb: 0.5 }}>
                      {item.angka}
                    </Typography>

                    <Typography variant="caption" sx={{ color: "#6A7E6D", fontWeight: 500 }}>
                      {item.desc}
                    </Typography>
                  </Box>

                  {/* KELOMPOK KANAN: Ikon */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      backgroundColor: item.bg,
                      color: item.color,
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

        {/* Interactive Santri Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "18px",
            border: "1px solid #E5ECE4",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {/* Filter and Search Bar */}
          <Box sx={{ p: { xs: 2, sm: 3 }, borderBottom: "1px solid #EEF3ED" }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ md: "center" }}
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                  Daftar Nilai & Santri Binaan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Periksa progres nilai setiap santri dan pantau kelengkapan nilai raport.
                </Typography>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  size="small"
                  placeholder="Cari nama atau NIS santri..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  sx={{ width: { xs: "100%", sm: 240 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "#8E9E90", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  select
                  size="small"
                  value={filterKelas}
                  onChange={(e) => setFilterKelas(e.target.value)}
                  sx={{ minWidth: 140 }}
                >
                  <MenuItem value="Semua">Semua Kelas</MenuItem>
                  <MenuItem value="Pagi">Kelas Pagi</MenuItem>
                  <MenuItem value="Sore">Kelas Sore</MenuItem>
                </TextField>

                <TextField
                  select
                  size="small"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="Semua">Semua Status</MenuItem>
                  <MenuItem value="Lengkap">Nilai Lengkap</MenuItem>
                  <MenuItem value="Belum">Belum Lengkap</MenuItem>
                </TextField>
              </Stack>
            </Stack>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: 60 }}>NO</TableCell>
                  <TableCell>NIS</TableCell>
                  <TableCell>NAMA SANTRI</TableCell>
                  <TableCell>KELAS</TableCell>
                  <TableCell>RATA-RATA</TableCell>
                  <TableCell>KELENGKAPAN</TableCell>
                  <TableCell align="center">AKSI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((item, idx) => {
                    const lengkap = isLengkap(item);
                    const avg = hitungRataRata(item);
                    const initials = item.nama
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("");

                    return (
                      <TableRow key={item.nis} hover>
                        <TableCell align="center" sx={{ color: "#8E9E90", fontWeight: 600 }}>
                          {idx + 1}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#2E6F40", fontSize: "0.84rem" }}>
                          {item.nis}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar
                              sx={{
                                width: 34,
                                height: 34,
                                fontSize: "0.78rem",
                                fontWeight: 700,
                                backgroundColor: "#E3EFE5",
                                color: "#2E6F40",
                              }}
                            >
                              {initials}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: "#1A251D" }}>
                              {item.nama}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`Kelas ${item.kelas}`}
                            size="small"
                            sx={{
                              backgroundColor: item.kelas === "Pagi" ? "#FEF3C7" : "#EFF6FF",
                              color: item.kelas === "Pagi" ? "#92400E" : "#1E40AF",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: Number(avg) >= 88 ? "#166534" : "#B45309" }}>
                            {avg}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={lengkap ? "Lengkap" : "Belum Lengkap"}
                            sx={{
                              backgroundColor: lengkap ? "#DCFCE7" : "#FEE2E2",
                              color: lengkap ? "#166534" : "#991B1B",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => navigate("/pengajar/input-nilai")}
                            sx={{
                              py: 0.4,
                              px: 1.5,
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              borderRadius: "8px",
                              borderColor: lengkap ? "#CBD5E1" : "#2E6F40",
                              color: lengkap ? "#475569" : "#2E6F40",
                              backgroundColor: lengkap ? "#F8FAFC" : "#F4FAF5",
                            }}
                          >
                            {lengkap ? "Lihat Nilai" : "Input Nilai"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6, color: "#8E9E90" }}>
                      Tidak ada santri yang sesuai dengan filter pencarian.
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
              Menampilkan {dataTampil.length} dari {santri.length} santri binaan
            </Typography>

            <Button
              endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
              onClick={() => navigate("/pengajar/raport-santri")}
              sx={{ color: "#2E6F40", fontWeight: 700, fontSize: "0.82rem" }}
            >
              Lihat Seluruh Raport Santri
            </Button>
          </Box>
        </Paper>
      </Stack>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ borderRadius: "10px" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </LayoutPengajar>
  );
}
