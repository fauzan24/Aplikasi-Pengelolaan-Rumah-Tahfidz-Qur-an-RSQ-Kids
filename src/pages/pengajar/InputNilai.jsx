import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Search,
  EditOutlined,
  Delete,
  SaveOutlined,
} from "@mui/icons-material";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";
import { useNilai } from "../../context/NilaiContext";

const aspekPenilaian = [
  { key: "bacaan", label: "Bacaan Iqro / Al-Qur'an", short: "Bacaan" },
  { key: "doa", label: "Hafalan Doa Harian", short: "Doa" },
  { key: "tahfidz", label: "Hafalan Surat Pendek (Tahfidz)", short: "Tahfidz" },
  { key: "hadits", label: "Hafalan Hadits Pilihan", short: "Hadits" },
  { key: "adab", label: "Adab & Kedisiplinan", short: "Adab" },
];

const hitungRataRata = (item) => {
  const nilaiValid = aspekPenilaian
    .map((aspek) => item[aspek.key])
    .filter((nilai) => nilai !== "" && nilai !== "-" && Number.isFinite(Number(nilai)));
  if (!nilaiValid.length) return "0.0";
  const total = nilaiValid.reduce((sum, nilai) => sum + Number(nilai), 0);
  return (total / nilaiValid.length).toFixed(1);
};

const getPeriodeBerjalan = () => {
  const sekarang = new Date();
  const tahunMulai = sekarang.getMonth() >= 6 ? sekarang.getFullYear() : sekarang.getFullYear() - 1;
  return {
    tahunAjaran: `${tahunMulai}/${tahunMulai + 1}`,
    semester: sekarang.getMonth() >= 6 ? "Ganjil" : "Genap",
  };
};

const getPredikat = (score) => {
  const num = Number(score);
  if (num >= 90) return { grade: "A", label: "Sangat Baik", color: "#166534", bg: "#DCFCE7" };
  if (num >= 80) return { grade: "B", label: "Baik", color: "#0E7490", bg: "#CFFAFE" };
  if (num >= 70) return { grade: "C", label: "Cukup", color: "#B45309", bg: "#FEF3C7" };
  return { grade: "D", label: "Perlu Latihan", color: "#991B1B", bg: "#FEE2E2" };
};

export default function InputNilai({ onLogout, onNavigate }) {
  const { nilai, setNilai } = useNilai();
  const periodeBerjalan = getPeriodeBerjalan();
  const [tahunAjaran, setTahunAjaran] = useState(periodeBerjalan.tahunAjaran);
  const [semester, setSemester] = useState(periodeBerjalan.semester);
  const [keyword, setKeyword] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [santriEdit, setSantriEdit] = useState(null);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [santriHapus, setSantriHapus] = useState(null);
  const [dialogHapus, setDialogHapus] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "" });

  const tahunAjaranTersedia = useMemo(() => {
    const tahunMulaiBerjalan = Number(periodeBerjalan.tahunAjaran.slice(0, 4));
    const tahun = new Set(
      Array.from({ length: 7 }, (_, index) => {
        const tahunMulai = tahunMulaiBerjalan + index - 4;
        return `${tahunMulai}/${tahunMulai + 1}`;
      })
    );
    nilai.forEach((item) => tahun.add(item.tahunAjaran));
    return [...tahun].sort((a, b) => b.localeCompare(a));
  }, [nilai, periodeBerjalan.tahunAjaran]);

  const nilaiPeriode = useMemo(
    () =>
      nilai.filter(
        (item) => item.tahunAjaran === tahunAjaran && item.semester === semester
      ),
    [nilai, tahunAjaran, semester]
  );

  const daftarSantriDasar = useMemo(
    () => [...new Map(nilai.map((item) => [item.nis, item])).values()],
    [nilai]
  );

  const daftarSantri = useMemo(() => {
    const kata = keyword.trim().toLowerCase();
    return nilaiPeriode.filter((item) => {
      const cocokPencarian =
        item.nama.toLowerCase().includes(kata) || item.nis.toLowerCase().includes(kata);
      const cocokKelas = filterKelas === "Semua" || item.kelas === filterKelas;
      return cocokPencarian && cocokKelas;
    });
  }, [nilaiPeriode, keyword, filterKelas]);

  const mulaiPenilaianPeriode = () => {
    const nisTersimpan = new Set(nilaiPeriode.map((item) => item.nis));
    const barisBaru = daftarSantriDasar
      .filter((item) => !nisTersimpan.has(item.nis))
      .map((item) => ({
        nis: item.nis,
        nama: item.nama,
        kelas: item.kelas,
        tahunAjaran,
        semester,
        ...Object.fromEntries(aspekPenilaian.map((aspek) => [aspek.key, "-"])),
      }));
    setNilai((sebelumnya) => [...sebelumnya, ...barisBaru]);
    setToast({
      open: true,
      message: `Periode penilaian ${tahunAjaran} semester ${semester} berhasil disiapkan.`,
    });
  };

  const bukaEdit = (item) => {
    setSantriEdit({ ...item });
    setDialogEdit(true);
  };

  const simpanNilai = () => {
    if (!santriEdit) return;

    setNilai((prev) =>
      prev.map((item) =>
        item.nis === santriEdit.nis &&
        item.tahunAjaran === tahunAjaran &&
        item.semester === semester
          ? { ...santriEdit, tahunAjaran, semester }
          : item
      )
    );
    setDialogEdit(false);
    setSantriEdit(null);
    setToast({ open: true, message: `Nilai untuk santri ${santriEdit.nama} berhasil disimpan!` });
  };

  const konfirmasiHapus = () => {
    if (!santriHapus) return;

    setNilai((prev) =>
      prev.filter(
        (item) =>
          item.nis !== santriHapus.nis ||
          item.tahunAjaran !== tahunAjaran ||
          item.semester !== semester
      )
    );
    setDialogHapus(false);
    setSantriHapus(null);
    setToast({ open: true, message: `Data nilai santri ${santriHapus.nama} berhasil dihapus.` });
  };

  return (
    <LayoutPengajar onLogout={onLogout} onNavigate={onNavigate}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1380, mx: "auto", pb: 4 }}>
        {/* Header Title */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
            Input & Penilaian Santri
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Kelola nilai hafalan Al-Qur'an, doa, hadits, dan adab santri secara akurat dan terintegrasi.
          </Typography>
        </Box>

        {/* Paper Container */}
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
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="space-between">
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <TextField
                    select
                    size="small"
                    label="Tahun Ajaran"
                    value={tahunAjaran}
                    onChange={(event) => setTahunAjaran(event.target.value)}
                    sx={{ minWidth: 160 }}
                  >
                    {tahunAjaranTersedia.map((tahun) => (
                      <MenuItem key={tahun} value={tahun}>{tahun}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="Semester"
                    value={semester}
                    onChange={(event) => setSemester(event.target.value)}
                    sx={{ minWidth: 130 }}
                  >
                    <MenuItem value="Ganjil">Ganjil</MenuItem>
                    <MenuItem value="Genap">Genap</MenuItem>
                  </TextField>
                </Stack>
                {!nilaiPeriode.length && (
                  <Button variant="outlined" onClick={mulaiPenilaianPeriode}>
                    Mulai Penilaian Periode Ini
                  </Button>
                )}
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ md: "center" }}
                justifyContent="space-between"
              >
                  <Tabs
                    value={filterKelas}
                    onChange={(_, val) => setFilterKelas(val)}
                    sx={{
                      minHeight: 40,
                      "& .MuiTab-root": {
                        minHeight: 38,
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: "#6A7D6E",
                        "&.Mui-selected": { color: "#2E6F40" },
                      },
                      "& .MuiTabs-indicator": { backgroundColor: "#2E6F40", height: 3, borderRadius: "3px" },
                    }}
                  >
                    <Tab value="Semua" label={`Semua Kelas (${nilaiPeriode.length})`} />
                    <Tab value="Pagi" label={`Kelas Pagi (${nilaiPeriode.filter((x) => x.kelas === "Pagi").length})`} />
                    <Tab value="Sore" label={`Kelas Sore (${nilaiPeriode.filter((x) => x.kelas === "Sore").length})`} />
                  </Tabs>

                <TextField
                  size="small"
                  placeholder="Cari nama atau NIS santri..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
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
            </Stack>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table sx={{ minWidth: 1050 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: 55 }}>NO</TableCell>
                  <TableCell>NIS</TableCell>
                  <TableCell sx={{ minWidth: 170 }}>NAMA SANTRI</TableCell>
                  <TableCell align="center">KELAS</TableCell>
                  <TableCell align="center">BACAAN</TableCell>
                  <TableCell align="center">DOA</TableCell>
                  <TableCell align="center">TAHFIDZ</TableCell>
                  <TableCell align="center">HADITS</TableCell>
                  <TableCell align="center">ADAB</TableCell>
                  <TableCell align="center">RATA-RATA</TableCell>
                  <TableCell align="center">PREDIKAT</TableCell>
                  <TableCell align="center">AKSI</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {daftarSantri.length > 0 ? (
                  daftarSantri.map((item, idx) => {
                    const avg = hitungRataRata(item);
                    const pred = getPredikat(avg);
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
                        <TableCell align="center">
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

                        {/* Aspek Penilaian */}
                        {aspekPenilaian.map((a) => {
                          const val = item[a.key];
                          const isValid = val !== "" && val !== null && val !== "-";
                          return (
                            <TableCell key={a.key} align="center">
                              <Box
                                sx={{
                                  display: "inline-block",
                                  px: 1.25,
                                  py: 0.35,
                                  borderRadius: "6px",
                                  fontWeight: 700,
                                  fontSize: "0.82rem",
                                  backgroundColor: isValid ? "#F1F5F2" : "#FEE2E2",
                                  color: isValid ? "#2E4733" : "#DC2626",
                                }}
                              >
                                {isValid ? val : "-"}
                              </Box>
                            </TableCell>
                          );
                        })}

                        <TableCell align="center">
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                            {avg}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Chip
                            size="small"
                            label={`${pred.grade} (${pred.label})`}
                            sx={{
                              backgroundColor: pred.bg,
                              color: pred.color,
                              fontWeight: 700,
                              fontSize: "0.74rem",
                            }}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <Tooltip title="Input / Edit Nilai">
                              <IconButton
                                size="small"
                                onClick={() => bukaEdit(item)}
                                sx={{
                                  color: "#2E6F40",
                                  backgroundColor: "#EBF5ED",
                                  "&:hover": { backgroundColor: "#D7EBDC" },
                                }}
                              >
                                <EditOutlined fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Hapus dari daftar">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSantriHapus(item);
                                  setDialogHapus(true);
                                }}
                                sx={{
                                  color: "#DC2626",
                                  backgroundColor: "#FEF2F2",
                                  "&:hover": { backgroundColor: "#FEE2E2" },
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center" sx={{ py: 6, color: "#8E9E90" }}>
                      {nilaiPeriode.length
                        ? "Santri tidak ditemukan pada filter ini."
                        : `Belum ada riwayat penilaian untuk ${tahunAjaran} semester ${semester}.`}
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
              Menampilkan {daftarSantri.length} dari {nilaiPeriode.length} santri
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Riwayat penilaian · Semester {semester} · T.A {tahunAjaran}
            </Typography>
          </Box>
        </Paper>
      </Stack>

      {/* Modal Edit Nilai */}
      <Dialog
        open={dialogEdit}
        onClose={() => setDialogEdit(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#1B2A1E", pt: 3, px: 3 }}>
          Input & Edit Nilai Santri
        </DialogTitle>

        <DialogContent dividers sx={{ px: 3, py: 2.5 }}>
          {santriEdit && (
            <Stack spacing={2.5}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  backgroundColor: "#F4FAF5",
                  border: "1px solid #D8EAD9",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#2E6F40" }}>
                  {santriEdit.nama}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  NIS: {santriEdit.nis} · Kelas {santriEdit.kelas} · T.A {tahunAjaran} ({semester})
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5E4F" }}>
                MASUKKAN NILAI (SKALA 0 - 100):
              </Typography>

              {aspekPenilaian.map((aspek) => (
                <Stack
                  key={aspek.key}
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ sm: "center" }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#2A3D2F" }}>
                    {aspek.label}
                  </Typography>

                  <TextField
                    type="number"
                    size="small"
                    value={santriEdit[aspek.key] === "-" ? "" : santriEdit[aspek.key]}
                    placeholder="0-100"
                    inputProps={{ min: 0, max: 100 }}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSantriEdit((prev) => ({
                        ...prev,
                        [aspek.key]: val === "" ? "" : Math.max(0, Math.min(100, Number(val))),
                      }));
                    }}
                    sx={{ width: { xs: "100%", sm: 110 } }}
                  />
                </Stack>
              ))}

              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  backgroundColor: "#F9FAF8",
                  border: "1px solid #E5ECE4",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#1B2A1E" }}>
                  Estimasi Rata-rata:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#2E6F40" }}>
                  {hitungRataRata(santriEdit)}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2.5, px: 3, gap: 1 }}>
          <Button onClick={() => setDialogEdit(false)} sx={{ color: "#6A7D6E" }}>
            Batal
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveOutlined />}
            onClick={simpanNilai}
            sx={{
              backgroundColor: "#2E6F40",
              "&:hover": { backgroundColor: "#235933" },
            }}
          >
            Simpan Nilai Santri
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Hapus */}
      <Dialog
        open={dialogHapus}
        onClose={() => setDialogHapus(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#1B2A1E", pt: 3, px: 3 }}>
          Hapus Data Nilai?
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Apakah Anda yakin ingin menghapus catatan nilai untuk santri{" "}
            <strong>{santriHapus?.nama}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setDialogHapus(false)} sx={{ color: "#6A7D6E" }}>
            Batal
          </Button>
          <Button onClick={konfirmasiHapus} color="error" variant="contained">
            Ya, Hapus
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
    </LayoutPengajar>
  );
}
