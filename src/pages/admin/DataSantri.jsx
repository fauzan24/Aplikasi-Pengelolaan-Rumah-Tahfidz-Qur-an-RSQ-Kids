import { useState } from "react";
import {
  Add,
  Delete,
  EditOutlined,
  Search,
  FilterList,
  Clear,
  PeopleAltOutlined,
  WbSunnyOutlined,
  NightsStayOutlined,
  HourglassEmptyRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import LayoutAdmin from "../../components/admin/LayoutAdmin";

const initialSantri = [
  { id: "RSQ001", nama: "Jauza Askana", tempatLahir: "Bandung", tanggalLahir: "2017-03-12", sekolah: "SD Islam Al-Azhar", kelas: "Pagi", status: "Aktif", namaAyah: "Hendra Saputra", namaIbu: "Siti Aminah", kontak: "0812-3456-7890", alamat: "Jl. Melati No. 12, Bandung" },
  { id: "RSQ002", nama: "Dinda Azzahra", tempatLahir: "Bandung", tanggalLahir: "2018-07-24", sekolah: "SDIT Insan Teladan", kelas: "Sore", status: "Aktif", namaAyah: "Rizki Rahman", namaIbu: "Rahmawati", kontak: "0813-4567-8901", alamat: "Jl. Cempaka No. 8, Bandung" },
  { id: "RSQ003", nama: "Raffa Fadilla", tempatLahir: "Cimahi", tanggalLahir: "2016-11-05", sekolah: "SD Negeri Cibabat", kelas: "Pagi", status: "Waiting list", namaAyah: "Faisal Hidayat", namaIbu: "Nur Hasanah", kontak: "0814-5678-9012", alamat: "Jl. Karya Bakti No. 5, Cimahi" },
  { id: "RSQ004", nama: "Dede Ridho", tempatLahir: "Bandung", tanggalLahir: "2017-01-19", sekolah: "SD Muhammadiyah 7", kelas: "Pagi", status: "Aktif", namaAyah: "Ridwan Kamil", namaIbu: "Dewi Lestari", kontak: "0815-6789-0123", alamat: "Jl. Sukamaju No. 21, Bandung" },
  { id: "RSQ005", nama: "Kalila Haura", tempatLahir: "Sumedang", tanggalLahir: "2018-09-30", sekolah: "SDIT Al-Fitrah", kelas: "Sore", status: "Aktif", namaAyah: "Fajar Nugraha", namaIbu: "Nurul Hidayah", kontak: "0816-7890-1234", alamat: "Jl. Anggrek No. 4, Sumedang" },
];

const buatFormKosong = () => ({
  nama: "",
  tempatLahir: "",
  tanggalLahir: "",
  sekolah: "",
  kelas: "Pagi",
  status: "Aktif",
  namaAyah: "",
  namaIbu: "",
  kontak: "",
  alamat: "",
});

const formatTanggalLahir = (tanggal) => {
  if (!tanggal) return "-";
  const [tahun, bulan, hari] = tanggal.split("-");
  return tahun && bulan && hari ? `${hari}/${bulan}/${tahun}` : tanggal;
};

export default function DataSantri({ onNavigate, onLogout }) {
  const [dataSantri, setDataSantri] = useState(initialSantri);
  const [keyword, setKeyword] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [dialogTerbuka, setDialogTerbuka] = useState(false);
  const [dialogHapusTerbuka, setDialogHapusTerbuka] = useState(false);
  const [form, setForm] = useState(buatFormKosong);
  const [idDiedit, setIdDiedit] = useState(null);
  const [santriDihapus, setSantriDihapus] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const totalSantri = dataSantri.length;
  const santriPagi = dataSantri.filter((s) => s.kelas === "Pagi").length;
  const santriSore = dataSantri.filter((s) => s.kelas === "Sore").length;
  const waitingList = dataSantri.filter((s) => s.status === "Waiting list").length;

  const dataTampil = dataSantri.filter((santri) => {
    const pencarian = keyword.trim().toLowerCase();
    const cocokPencarian =
      santri.nama.toLowerCase().includes(pencarian) ||
      santri.id.toLowerCase().includes(pencarian) ||
      (santri.namaAyah || santri.wali || "").toLowerCase().includes(pencarian) ||
      (santri.namaIbu || "").toLowerCase().includes(pencarian);

    const cocokKategori =
      kategori === "Semua" ||
      (kategori === "Waiting list"
        ? santri.status === "Waiting list"
        : santri.kelas === kategori);

    return cocokPencarian && cocokKategori;
  });

  const bukaFormTambah = () => {
    setIdDiedit(null);
    setForm(buatFormKosong());
    setDialogTerbuka(true);
  };

  const bukaFormEdit = (santri) => {
    setIdDiedit(santri.id);
    setForm({
      nama: santri.nama,
      tempatLahir: santri.tempatLahir || "",
      tanggalLahir: santri.tanggalLahir || "",
      sekolah: santri.sekolah || "",
      kelas: santri.kelas,
      status: santri.status,
      namaAyah: santri.namaAyah || santri.wali || "",
      namaIbu: santri.namaIbu || "",
      kontak: santri.kontak || "",
      alamat: santri.alamat || "",
    });
    setDialogTerbuka(true);
  };

  const simpanSantri = (e) => {
    e.preventDefault();
    const nama = form.nama.trim();
    if (!nama) return;

    if (idDiedit) {
      setDataSantri((data) =>
        data.map((santri) =>
          santri.id === idDiedit ? { ...santri, ...form, nama } : santri
        )
      );
      setToast({ open: true, message: `Data santri ${nama} berhasil diperbarui!`, severity: "success" });
    } else {
      const nomorBerikutnya =
        Math.max(...dataSantri.map((santri) => Number(santri.id.slice(3))), 0) + 1;
      const id = `RSQ${String(nomorBerikutnya).padStart(3, "0")}`;
      setDataSantri((data) => [...data, { id, ...form, nama }]);
      setToast({ open: true, message: `Santri baru ${nama} berhasil ditambahkan!`, severity: "success" });
    }

    setDialogTerbuka(false);
  };

  const hapusSantri = () => {
    if (!santriDihapus) return;
    setDataSantri((data) => data.filter((santri) => santri.id !== santriDihapus.id));
    setToast({ open: true, message: `Data santri ${santriDihapus.nama} berhasil dihapus.`, severity: "info" });
    setDialogHapusTerbuka(false);
    setSantriDihapus(null);
  };

  return (
    <LayoutAdmin onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {/* Header Title & Action */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
              Data & Manajemen Santri
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pantau status santri, pembagian kelas, serta kontak wali santri RSQ-Kids.
            </Typography>
          </Box>

        </Stack>

        {/* 4 Interactive Summary Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {[
            { label: "Total Terdaftar", count: totalSantri, icon: PeopleAltOutlined, color: "#2E6F40", bg: "#EBF5ED" },
            { label: "Kelas Pagi", count: santriPagi, icon: WbSunnyOutlined, color: "#D97706", bg: "#FEF3C7" },
            { label: "Kelas Sore", count: santriSore, icon: NightsStayOutlined, color: "#2563EB", bg: "#EFF6FF" },
            { label: "Waiting List", count: waitingList, icon: HourglassEmptyRounded, color: "#DC2626", bg: "#FEE2E2" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                sx={{
                  p: 2,
                  borderRadius: "14px",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={1.5}
                    sx={{ width: "100%" }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: "#6A7D6E" }}>
                        {item.label}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "#1B2A1E" }}>
                        {item.count}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        backgroundColor: item.bg,
                        color: item.color,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Filter and Table Container */}
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
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ md: "center" }}
              justifyContent="space-between"
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ width: { xs: "100%", md: "auto" } }}
              >
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={bukaFormTambah}
                  sx={{
                    flexShrink: 0,
                    backgroundColor: "#2E6F40",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    py: 1.15,
                    px: 2.5,
                    borderRadius: "12px",
                    boxShadow: "0 4px 14px rgba(46, 111, 64, 0.25)",
                    "&:hover": {
                      backgroundColor: "#245A33",
                    },
                  }}
                >
                  Tambah Santri Baru
                </Button>

                <TextField
                  size="small"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Cari berdasarkan nama, NIS, atau wali..."
                  sx={{ width: { xs: "100%", sm: 360 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "#7A8E7D", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: keyword && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setKeyword("")}>
                          <Clear fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              {/* Category Pills Filter */}
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                {[
                  { id: "Semua", label: "Semua Data" },
                  { id: "Pagi", label: "Kelas Pagi" },
                  { id: "Sore", label: "Kelas Sore" },
                  { id: "Waiting list", label: "Waiting List" },
                ].map((cat) => {
                  const active = kategori === cat.id;
                  return (
                    <Chip
                      key={cat.id}
                      label={cat.label}
                      onClick={() => setKategori(cat.id)}
                      clickable
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        py: 0.5,
                        backgroundColor: active ? "#2E6F40" : "#F1F5F1",
                        color: active ? "#FFFFFF" : "#4A5E4E",
                        "&:hover": {
                          backgroundColor: active ? "#245A33" : "#E2EBE2",
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Stack>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table sx={{ minWidth: 1500 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: 60 }}>NO</TableCell>
                  <TableCell>NIS</TableCell>
                  <TableCell>NAMA SANTRI</TableCell>
                  <TableCell>TEMPAT LAHIR</TableCell>
                  <TableCell>TANGGAL LAHIR</TableCell>
                  <TableCell>SEKOLAH</TableCell>
                  <TableCell>KELAS</TableCell>
                  <TableCell>NAMA AYAH</TableCell>
                  <TableCell>NAMA IBU</TableCell>
                  <TableCell>NOMOR HP</TableCell>
                  <TableCell>ALAMAT</TableCell>
                  <TableCell>STATUS</TableCell>
                  <TableCell align="center">AKSI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((santri, idx) => {
                    const isAktif = santri.status === "Aktif";
                    const initials = santri.nama
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("");

                    return (
                      <TableRow key={santri.id} hover>
                        <TableCell align="center" sx={{ color: "#8E9E90", fontWeight: 600 }}>
                          {idx + 1}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#2E6F40", fontSize: "0.84rem" }}>
                          {santri.id}
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
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#1A251D" }}>
                                {santri.nama}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: "#5E6E60", fontSize: "0.85rem" }}>
                          {santri.tempatLahir || "-"}
                        </TableCell>
                        <TableCell sx={{ color: "#5E6E60", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                          {formatTanggalLahir(santri.tanggalLahir)}
                        </TableCell>
                        <TableCell sx={{ color: "#5E6E60", fontSize: "0.85rem" }}>
                          {santri.sekolah || "-"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`Kelas ${santri.kelas}`}
                            size="small"
                            sx={{
                              backgroundColor: santri.kelas === "Pagi" ? "#FEF3C7" : "#EFF6FF",
                              color: santri.kelas === "Pagi" ? "#92400E" : "#1E40AF",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: "#5E6E60", fontSize: "0.85rem" }}>
                          {santri.namaAyah || santri.wali || "-"}
                        </TableCell>
                        <TableCell sx={{ color: "#5E6E60", fontSize: "0.85rem" }}>
                          {santri.namaIbu || "-"}
                        </TableCell>
                        <TableCell sx={{ color: "#5E6E60", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                          {santri.kontak || "-"}
                        </TableCell>
                        <TableCell sx={{ color: "#5E6E60", fontSize: "0.85rem", minWidth: 200, maxWidth: 280 }}>
                          {santri.alamat || "-"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={santri.status}
                            sx={{
                              backgroundColor: isAktif ? "#DCFCE7" : "#FEE2E2",
                              color: isAktif ? "#166534" : "#991B1B",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <Tooltip title="Edit data">
                              <IconButton
                                size="small"
                                onClick={() => bukaFormEdit(santri)}
                                sx={{
                                  color: "#2563EB",
                                  backgroundColor: "#EFF6FF",
                                  "&:hover": { backgroundColor: "#DBEAFE" },
                                }}
                              >
                                <EditOutlined fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Hapus santri">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSantriDihapus(santri);
                                  setDialogHapusTerbuka(true);
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
                    <TableCell colSpan={7} align="center" sx={{ py: 6, color: "#8E9E90" }}>
                      Santri tidak ditemukan dengan kriteria pencarian ini.
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
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Menampilkan {dataTampil.length} dari total {dataSantri.length} santri terdaftar
            </Typography>
          </Box>
        </Paper>
      </Stack>

      {/* Modal Tambah / Edit */}
      <Dialog
        open={dialogTerbuka}
        onClose={() => setDialogTerbuka(false)}
        fullWidth
        maxWidth="md"
      >
        <Box component="form" onSubmit={simpanSantri}>
          <DialogTitle sx={{ fontWeight: 800, color: "#1B2A1E", pt: 3, px: 3 }}>
            {idDiedit ? "Perbarui Data Santri" : "Tambah Data Santri Baru"}
          </DialogTitle>
          <DialogContent sx={{ px: 3, pt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              Lengkapi data santri dan data wali santri.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) 1px minmax(0, 1fr)" },
                columnGap: { xs: 0, sm: 3 },
              }}
            >
              <Stack spacing={1.5} sx={{ gridColumn: { xs: "1", sm: "1" } }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Data Santri
                </Typography>
                <TextField
                  required
                  fullWidth
                  label="Nama Santri"
                  placeholder="Nama lengkap santri"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Tempat Lahir"
                  placeholder="Kota tempat lahir"
                  value={form.tempatLahir}
                  onChange={(e) => setForm({ ...form, tempatLahir: e.target.value })}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Tanggal Lahir"
                  value={form.tanggalLahir}
                  onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  fullWidth
                  label="Sekolah"
                  placeholder="Nama sekolah"
                  value={form.sekolah}
                  onChange={(e) => setForm({ ...form, sekolah: e.target.value })}
                />
                <TextField
                  select
                  fullWidth
                  label="Pilihan Kelas"
                  value={form.kelas}
                  onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                >
                  <MenuItem value="Pagi">Kelas Pagi (08:00 - 10:00)</MenuItem>
                  <MenuItem value="Sore">Kelas Sore (16:00 - 18:00)</MenuItem>
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Status Santri"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <MenuItem value="Aktif">Aktif</MenuItem>
                  <MenuItem value="Waiting list">Waiting List</MenuItem>
                </TextField>
              </Stack>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  gridColumn: { xs: "1", sm: "2" },
                  display: { xs: "none", sm: "block" },
                }}
              />

              <Stack spacing={1.5} sx={{ gridColumn: { xs: "1", sm: "3" } }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Data Wali Santri
                </Typography>
                <TextField
                  fullWidth
                  label="Nama Ayah"
                  placeholder="Nama ayah"
                  value={form.namaAyah}
                  onChange={(e) => setForm({ ...form, namaAyah: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Nama Ibu"
                  placeholder="Nama ibu"
                  value={form.namaIbu}
                  onChange={(e) => setForm({ ...form, namaIbu: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Nomor Handphone"
                  placeholder="Contoh: 0812-3456-7890"
                  value={form.kontak}
                  onChange={(e) => setForm({ ...form, kontak: e.target.value })}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Alamat Tempat Tinggal"
                  placeholder="Alamat lengkap"
                  value={form.alamat}
                  onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                />
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button onClick={() => setDialogTerbuka(false)} sx={{ color: "#6A7D6E" }}>
              Kembali
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#2E6F40",
                px: 3,
                "&:hover": { backgroundColor: "#235933" },
              }}
            >
              {idDiedit ? "Simpan Perubahan" : "Simpan Data Santri"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Modal Hapus */}
      <Dialog
        open={dialogHapusTerbuka}
        onClose={() => setDialogHapusTerbuka(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#1B2A1E", pt: 3, px: 3 }}>
          Hapus Data Santri?
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Apakah Anda yakin ingin menghapus data santri{" "}
            <strong>{santriDihapus?.nama} ({santriDihapus?.id})</strong>? Tindakan ini tidak dapat dibatalkan.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setDialogHapusTerbuka(false)} sx={{ color: "#6A7D6E" }}>
            Batal
          </Button>
          <Button onClick={hapusSantri} color="error" variant="contained">
            Ya, Hapus Data
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={toast.severity} sx={{ borderRadius: "10px" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </LayoutAdmin>
  );
}
