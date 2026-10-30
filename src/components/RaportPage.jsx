import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Search,
  VisibilityOutlined,
  EditOutlined,
  PrintOutlined,
  SchoolOutlined,
  MenuBook,
  Close,
  SaveOutlined,
  EmojiEventsOutlined,
} from "@mui/icons-material";

const dataAwal = [
  {
    nis: "RSQ001",
    nama: "Jauza Askana",
    kelas: "Pagi",
    pengajar: "Ustadzah Aisyah",
    nilai: [
      { pelajaran: "Bacaan Iqro / Al-Qur'an", nilai: 89, predikat: "B", catatan: "Bacaan sudah lancar dan makhraj huruf tepat." },
      { pelajaran: "Hafalan Doa Harian", nilai: 90, predikat: "A", catatan: "Hafalan lancar dan hafal arti dasarnya." },
      { pelajaran: "Hafalan Surat Pendek (Tahfidz)", nilai: 85, predikat: "B", catatan: "Perlu murojaah rutin untuk menjaga kelancaran." },
      { pelajaran: "Hafalan Hadits Pilihan", nilai: 88, predikat: "B", catatan: "Hafalan hadits kebersihan & menuntut ilmu lancar." },
      { pelajaran: "Adab dan Kedisiplinan", nilai: 92, predikat: "A", catatan: "Menunjukkan akhlak mulia dan sopan santun." },
    ],
  },
  {
    nis: "RSQ002",
    nama: "Dinda Azzahra",
    kelas: "Pagi",
    pengajar: "Ustadzah Aisyah",
    nilai: [
      { pelajaran: "Bacaan Iqro / Al-Qur'an", nilai: 92, predikat: "A", catatan: "Bacaan sangat baik, mad dan tajwid tepat." },
      { pelajaran: "Hafalan Doa Harian", nilai: 89, predikat: "B", catatan: "Hafalan berkembang dengan sangat baik." },
      { pelajaran: "Hafalan Surat Pendek (Tahfidz)", nilai: 90, predikat: "A", catatan: "Mutqin juz 30 surah An-Naba s/d An-Nas." },
      { pelajaran: "Hafalan Hadits Pilihan", nilai: 88, predikat: "B", catatan: "Lancar melafalkan hadits dan artinya." },
      { pelajaran: "Adab dan Kedisiplinan", nilai: 90, predikat: "A", catatan: "Sopan, ramah, dan tertib di halaqah." },
    ],
  },
  {
    nis: "RSQ003",
    nama: "Raffa Fadila",
    kelas: "Pagi",
    pengajar: "Ustadzah Aisyah",
    nilai: [
      { pelajaran: "Bacaan Iqro / Al-Qur'an", nilai: 85, predikat: "B", catatan: "Perlu latihan membaca secara rutin di rumah." },
      { pelajaran: "Hafalan Doa Harian", nilai: 84, predikat: "B", catatan: "Perlu mengulang hafalan doa sehari-hari." },
      { pelajaran: "Hafalan Surat Pendek (Tahfidz)", nilai: 80, predikat: "B", catatan: "Hafalan perlu terus diulang bersama orang tua." },
      { pelajaran: "Hafalan Hadits Pilihan", nilai: 84, predikat: "B", catatan: "Cukup baik dalam menyetor hadits." },
      { pelajaran: "Adab dan Kedisiplinan", nilai: 88, predikat: "B", catatan: "Aktif bertanya dan ceria." },
    ],
  },
  {
    nis: "RSQ004",
    nama: "Dede Ridho",
    kelas: "Pagi",
    pengajar: "Ustadzah Aisyah",
    nilai: [
      { pelajaran: "Bacaan Iqro / Al-Qur'an", nilai: 88, predikat: "B", catatan: "Bacaan cukup lancar, penguasaan tanda baca baik." },
      { pelajaran: "Hafalan Doa Harian", nilai: 90, predikat: "A", catatan: "Hafalan doa harian sangat baik." },
      { pelajaran: "Hafalan Surat Pendek (Tahfidz)", nilai: 86, predikat: "B", catatan: "Perlu murojaah rutin untuk surah panjang." },
      { pelajaran: "Hafalan Hadits Pilihan", nilai: 85, predikat: "B", catatan: "Hafalan hadits cukup lancar." },
      { pelajaran: "Adab dan Kedisiplinan", nilai: 91, predikat: "A", catatan: "Menunjukkan sikap santun dan patuh." },
    ],
  },
  {
    nis: "RSQ005",
    nama: "Kalila Haura",
    kelas: "Pagi",
    pengajar: "Ustadzah Aisyah",
    nilai: [
      { pelajaran: "Bacaan Iqro / Al-Qur'an", nilai: 90, predikat: "A", catatan: "Bacaan fasih dan bertajwid." },
      { pelajaran: "Hafalan Doa Harian", nilai: 89, predikat: "B", catatan: "Hafalan doa baik dan lancar." },
      { pelajaran: "Hafalan Surat Pendek (Tahfidz)", nilai: 90, predikat: "A", catatan: "Hafalan surah sangat bagus." },
      { pelajaran: "Hafalan Hadits Pilihan", nilai: 88, predikat: "B", catatan: "Perlu mempertahankan kelancaran." },
      { pelajaran: "Adab dan Kedisiplinan", nilai: 92, predikat: "A", catatan: "Sangat santun dan disiplin." },
    ],
  },
  {
    nis: "RSQ008",
    nama: "Aisyah Putri",
    kelas: "Sore",
    pengajar: "Ustadzah Aisyah",
    nilai: [
      { pelajaran: "Bacaan Iqro / Al-Qur'an", nilai: 92, predikat: "A", catatan: "Bacaan sangat baik dan lancar." },
      { pelajaran: "Hafalan Doa Harian", nilai: 89, predikat: "B", catatan: "Hafalan doa harian lancar." },
      { pelajaran: "Hafalan Surat Pendek (Tahfidz)", nilai: 90, predikat: "A", catatan: "Target hafalan tercapai dengan baik." },
      { pelajaran: "Hafalan Hadits Pilihan", nilai: 88, predikat: "B", catatan: "Lancar melafalkan hadits pilihan." },
      { pelajaran: "Adab dan Kedisiplinan", nilai: 90, predikat: "A", catatan: "Menunjukkan perilaku terpuji." },
    ],
  },
  {
    nis: "RSQ010",
    nama: "Zahra Nabila",
    kelas: "Sore",
    pengajar: "Ustadzah Aisyah",
    nilai: [
      { pelajaran: "Bacaan Iqro / Al-Qur'an", nilai: 90, predikat: "A", catatan: "Bacaan sudah sangat baik dan tartil." },
      { pelajaran: "Hafalan Doa Harian", nilai: 91, predikat: "A", catatan: "Hafalan doa lengkap dan fasih." },
      { pelajaran: "Hafalan Surat Pendek (Tahfidz)", nilai: 90, predikat: "A", catatan: "Hafalan berkembang memuaskan." },
      { pelajaran: "Hafalan Hadits Pilihan", nilai: 89, predikat: "B", catatan: "Lancar dan tepat intonasinya." },
      { pelajaran: "Adab dan Kedisiplinan", nilai: 92, predikat: "A", catatan: "Sopan, rajin, dan disiplin." },
    ],
  },
];

export default function RaportPage({ Layout, ...layoutProps }) {
  const [santri, setSantri] = useState(dataAwal);
  const [pencarian, setPencarian] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [santriTerpilih, setSantriTerpilih] = useState(null);
  const [modeDialog, setModeDialog] = useState("");
  const [nilaiEdit, setNilaiEdit] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "" });

  const daftarSantri = useMemo(() => {
    return santri.filter((item) => {
      const cocokPencarian =
        item.nama.toLowerCase().includes(pencarian.toLowerCase()) ||
        item.nis.toLowerCase().includes(pencarian.toLowerCase());
      const cocokKelas = filterKelas === "Semua" || item.kelas === filterKelas;
      return cocokPencarian && cocokKelas;
    });
  }, [santri, pencarian, filterKelas]);

  const hitungRataRata = (dataNilai) => {
    if (!dataNilai || !dataNilai.length) return "0.0";
    const total = dataNilai.reduce((sum, item) => sum + Number(item.nilai || 0), 0);
    return (total / dataNilai.length).toFixed(1);
  };

  const bukaRaport = (item) => {
    setSantriTerpilih(item);
    setModeDialog("lihat");
  };

  const bukaEdit = (item) => {
    setSantriTerpilih(item);
    setNilaiEdit(item.nilai.map((n) => ({ ...n })));
    setModeDialog("edit");
  };

  const simpanNilai = () => {
    setSantri((prev) =>
      prev.map((item) =>
        item.nis === santriTerpilih.nis ? { ...item, nilai: nilaiEdit } : item
      )
    );
    setSantriTerpilih((prev) => ({ ...prev, nilai: nilaiEdit }));
    setModeDialog("lihat");
    setToast({ open: true, message: `Raport santri ${santriTerpilih.nama} berhasil diperbarui!` });
  };

  const cetakRaport = (item) => {
    setSantriTerpilih(item);
    setModeDialog("lihat");
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <Layout {...layoutProps}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {/* Header Title */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
            Raport & Laporan Belajar Santri
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Pantau rangkuman nilai rapor, cetak sertifikat capaian hafalan, dan berikan catatan evaluasi santri.
          </Typography>
        </Box>

        {/* 3 Metric Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {[
            { label: "Total Raport Tersedia", count: `${santri.length} Santri`, icon: MenuBook, color: "#2E6F40", bg: "#EBF5ED" },
            { label: "Raport Kelas Pagi", count: `${santri.filter((x) => x.kelas === "Pagi").length} Santri`, icon: SchoolOutlined, color: "#D97706", bg: "#FEF3C7" },
            { label: "Raport Kelas Sore", count: `${santri.filter((x) => x.kelas === "Sore").length} Santri`, icon: EmojiEventsOutlined, color: "#2563EB", bg: "#EFF6FF" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                sx={{
                  p: 2.5,
                  position: "relative",
                  borderRadius: "16px",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <CardContent sx={{ p: 0, width: "100%", "&:last-child": { pb: 0 } }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Box sx={{ minWidth: 0, pr: 7 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#6A7D6E", mb: 0.75 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                        {item.count}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        right: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        backgroundColor: item.bg,
                        color: item.color,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Paper Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "18px",
            border: "1px solid #E5ECE4",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {/* Controls Bar */}
          <Box sx={{ p: { xs: 2, sm: 2.75 }, borderBottom: "1px solid #EEF3ED" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
            >
              <TextField
                size="small"
                placeholder="Cari nama atau NIS santri..."
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
                sx={{ width: { xs: "100%", sm: 300 } }}
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
                sx={{ minWidth: 160 }}
              >
                <MenuItem value="Semua">Semua Kelas</MenuItem>
                <MenuItem value="Pagi">Kelas Pagi</MenuItem>
                <MenuItem value="Sore">Kelas Sore</MenuItem>
              </TextField>
            </Stack>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: 60 }}>NO</TableCell>
                  <TableCell>NIS</TableCell>
                  <TableCell>NAMA SANTRI</TableCell>
                  <TableCell>KELAS</TableCell>
                  <TableCell>RATA-RATA NILAI</TableCell>
                  <TableCell align="center">AKSI</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {daftarSantri.map((item, idx) => {
                  const avg = hitungRataRata(item.nilai);
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
                            fontSize: "0.74rem",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#2E6F40" }}>
                          {avg}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Tooltip title="Lihat & Cetak Raport">
                            <IconButton
                              size="small"
                              onClick={() => bukaRaport(item)}
                              sx={{ color: "#2E6F40", backgroundColor: "#EBF5ED" }}
                            >
                              <VisibilityOutlined fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit Nilai Raport">
                            <IconButton
                              size="small"
                              onClick={() => bukaEdit(item)}
                              sx={{ color: "#D97706", backgroundColor: "#FEF3C7" }}
                            >
                              <EditOutlined fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Cetak Langsung">
                            <IconButton
                              size="small"
                              onClick={() => cetakRaport(item)}
                              sx={{ color: "#2563EB", backgroundColor: "#EFF6FF" }}
                            >
                              <PrintOutlined fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ p: 2, px: 3, backgroundColor: "#FCFDFC", borderTop: "1px solid #EEF3ED" }}>
            <Typography variant="caption" color="text.secondary">
              Menampilkan {daftarSantri.length} dari {santri.length} santri
            </Typography>
          </Box>
        </Paper>
      </Stack>

      {/* Modal View Raport */}
      <Dialog
        open={modeDialog === "lihat"}
        onClose={() => setModeDialog("")}
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
            Pratinjau Raport Hasil Belajar Santri
          </Typography>
          <IconButton size="small" onClick={() => setModeDialog("")}>
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: { xs: 2.5, sm: 4 } }}>
          {santriTerpilih && (
            <Box id="area-cetak-raport">
              {/* Certificate / Report Card Header */}
              <Box
                sx={{
                  textAlign: "center",
                  pb: 3,
                  mb: 3,
                  borderBottom: "2px solid #2E6F40",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#2E6F40", letterSpacing: "0.02em" }}>
                  RUMAH SAHABAT QUR'AN – RSQ KIDS BATAM
                </Typography>
                <Typography variant="caption" sx={{ color: "#5F7463", display: "block", mt: 0.25 }}>
                  Jl. R. Soeprapto No. 12, Batu Aji, Kota Batam · Telp: (0778) 456-789
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    color: "#1B2A1E",
                    mt: 1.5,
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: "8px",
                    backgroundColor: "#EBF5ED",
                  }}
                >
                  RAPORT HASIL BELAJAR TAHFIDZ & AGAMA ISLAM
                </Typography>
              </Box>

              {/* Santri Bio Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.5,
                  mb: 3,
                  p: 2,
                  borderRadius: "12px",
                  backgroundColor: "#F9FAF8",
                  border: "1px solid #E5ECE4",
                }}
              >
                <Typography variant="body2">
                  <strong>Nama Santri:</strong> {santriTerpilih.nama}
                </Typography>
                <Typography variant="body2">
                  <strong>Tahun Ajaran:</strong> 2026/2027 (Ganjil)
                </Typography>
                <Typography variant="body2">
                  <strong>NIS:</strong> {santriTerpilih.nis}
                </Typography>
                <Typography variant="body2">
                  <strong>Kelas / Halaqah:</strong> Kelas {santriTerpilih.kelas}
                </Typography>
                <Typography variant="body2">
                  <strong>Ustadzah Pembimbing:</strong> {santriTerpilih.pengajar}
                </Typography>
                <Typography variant="body2">
                  <strong>Status Raport:</strong> Sangat Baik
                </Typography>
              </Box>

              {/* Grades Table */}
              <TableContainer sx={{ border: "1px solid #E5ECE4", borderRadius: "10px", mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#2E6F40" }}>
                      <TableCell sx={{ color: "#FFF", fontWeight: 700, width: 50 }}>No</TableCell>
                      <TableCell sx={{ color: "#FFF", fontWeight: 700 }}>Aspek Penilaian</TableCell>
                      <TableCell align="center" sx={{ color: "#FFF", fontWeight: 700 }}>Nilai</TableCell>
                      <TableCell align="center" sx={{ color: "#FFF", fontWeight: 700 }}>Predikat</TableCell>
                      <TableCell sx={{ color: "#FFF", fontWeight: 700 }}>Catatan Perkembangan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {santriTerpilih.nilai.map((n, idx) => (
                      <TableRow key={n.pelajaran} hover>
                        <TableCell sx={{ fontWeight: 600 }}>{idx + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1A251D" }}>{n.pelajaran}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>{n.nilai}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={n.predikat}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              height: 22,
                              backgroundColor: n.predikat === "A" ? "#DCFCE7" : "#CFFAFE",
                              color: n.predikat === "A" ? "#166534" : "#0E7490",
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: "#4B5E4F" }}>{n.catatan}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Average Box */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderRadius: "10px",
                  backgroundColor: "#EBF5ED",
                  mb: 4,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#2E6F40" }}>
                  Rata-rata Nilai Keseluruhan:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#2E6F40" }}>
                  {hitungRataRata(santriTerpilih.nilai)} (Predikat A)
                </Typography>
              </Box>

              {/* Signatures */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                  pt: 2,
                  px: 2,
                }}
              >
                <Box>
                  <Typography variant="caption" sx={{ color: "#6A7D6E" }}>Mengetahui,</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>Orang Tua / Wali Santri</Typography>
                  <Box sx={{ height: 60 }} />
                  <Typography variant="body2">( ........................................ )</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: "#6A7D6E" }}>Batam, 27 Oktober 2026</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>Ustadzah Pembimbing</Typography>
                  <Box sx={{ height: 60 }} />
                  <Typography variant="body2">( {santriTerpilih.pengajar} )</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2.5, px: 3, gap: 1 }}>
          <Button onClick={() => setModeDialog("")} sx={{ color: "#6A7D6E" }}>
            Tutup
          </Button>
          <Button
            variant="outlined"
            startIcon={<EditOutlined />}
            onClick={() => bukaEdit(santriTerpilih)}
            sx={{ borderColor: "#2E6F40", color: "#2E6F40" }}
          >
            Edit Nilai Raport
          </Button>
          <Button
            variant="contained"
            startIcon={<PrintOutlined />}
            onClick={() => window.print()}
            sx={{ backgroundColor: "#2E6F40", "&:hover": { backgroundColor: "#235933" } }}
          >
            Cetak Raport Ini
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Edit Nilai */}
      <Dialog
        open={modeDialog === "edit"}
        onClose={() => setModeDialog("")}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#1B2A1E", pt: 3, px: 3 }}>
          Ubah Nilai & Catatan Raport
        </DialogTitle>
        <DialogContent dividers sx={{ px: 3, py: 2.5 }}>
          {santriTerpilih && (
            <Stack spacing={2.5}>
              <Box sx={{ p: 2, borderRadius: "10px", backgroundColor: "#F4FAF5" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#2E6F40" }}>
                  {santriTerpilih.nama} ({santriTerpilih.nis})
                </Typography>
              </Box>

              {nilaiEdit.map((n, idx) => (
                <Stack key={n.pelajaran} spacing={1} sx={{ p: 1.5, border: "1px solid #E5ECE4", borderRadius: "10px" }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#1B2A1E" }}>
                    {n.pelajaran}
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    <TextField
                      size="small"
                      type="number"
                      label="Nilai"
                      value={n.nilai}
                      inputProps={{ min: 0, max: 100 }}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setNilaiEdit((prev) =>
                          prev.map((item, i) =>
                            i === idx
                              ? {
                                  ...item,
                                  nilai: val,
                                  predikat: val >= 90 ? "A" : val >= 80 ? "B" : val >= 70 ? "C" : "D",
                                }
                              : item
                          )
                        );
                      }}
                      sx={{ width: 100 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Catatan Perkembangan"
                      value={n.catatan}
                      onChange={(e) => {
                        const text = e.target.value;
                        setNilaiEdit((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, catatan: text } : item))
                        );
                      }}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, px: 3, gap: 1 }}>
          <Button onClick={() => setModeDialog("lihat")} sx={{ color: "#6A7D6E" }}>
            Batal
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveOutlined />}
            onClick={simpanNilai}
            sx={{ backgroundColor: "#2E6F40", "&:hover": { backgroundColor: "#235933" } }}
          >
            Simpan Perubahan
          </Button>
        </DialogActions>
      </Dialog>

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

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #area-cetak-raport,
            #area-cetak-raport * {
              visibility: visible;
            }
            #area-cetak-raport {
              display: block !important;
              position: absolute !important;
              left: 0;
              top: 0;
              width: 100%;
              padding: 24px;
            }
            @page {
              size: A4 portrait;
              margin: 10mm;
            }
          }
        `}
      </style>
    </Layout>
  );
}
