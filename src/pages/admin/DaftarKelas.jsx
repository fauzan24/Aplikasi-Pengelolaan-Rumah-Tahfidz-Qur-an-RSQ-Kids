import { useState } from "react";
import {
  Add,
  Clear,
  Delete,
  EditOutlined,
  Search,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import LayoutAdmin from "../../components/admin/LayoutAdmin";

const initialKelas = [
  {
    id: 1,
    nama: "Kelas Pagi",
    waktu: "Pagi",
    pengajar: "Ust. Ahmad",
    jadwal: "Senin - Kamis, 08.00 - 10.00",
    ruangan: "Ruang Abu Bakar",
  },
  {
    id: 2,
    nama: "Kelas Sore",
    waktu: "Sore",
    pengajar: "Ust. Hasan",
    jadwal: "Senin - Kamis, 13.00 - 15.00",
    ruangan: "Ruang Umar bin Khattab",
  },
];

const formKosong = {
  nama: "",
  waktu: "Pagi",
  pengajar: "",
  jadwal: "",
  ruangan: "",
};

export default function DaftarKelas({ onNavigate, onLogout }) {
  const [dataKelas, setDataKelas] = useState(initialKelas);
  const [keyword, setKeyword] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [dialogTerbuka, setDialogTerbuka] = useState(false);
  const [kelasDiedit, setKelasDiedit] = useState(null);
  const [kelasDihapus, setKelasDihapus] = useState(null);
  const [form, setForm] = useState(formKosong);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const dataTampil = dataKelas.filter((kelas) => {
    const pencarian = keyword.trim().toLowerCase();
    const cocokPencarian = [
      kelas.nama,
      kelas.pengajar,
      kelas.jadwal,
      kelas.ruangan,
    ].some((nilai) => nilai.toLowerCase().includes(pencarian));
    const cocokKategori = kategori === "Semua" || kelas.waktu === kategori;

    return cocokPencarian && cocokKategori;
  });

  const bukaFormTambah = () => {
    setKelasDiedit(null);
    setForm(formKosong);
    setDialogTerbuka(true);
  };

  const bukaFormEdit = (kelas) => {
    setKelasDiedit(kelas);
    setForm({
      nama: kelas.nama,
      waktu: kelas.waktu,
      pengajar: kelas.pengajar,
      jadwal: kelas.jadwal,
      ruangan: kelas.ruangan,
    });
    setDialogTerbuka(true);
  };

  const simpanKelas = (event) => {
    event.preventDefault();
    const nilaiKelas = {
      ...form,
      nama: form.nama.trim(),
      pengajar: form.pengajar.trim(),
      jadwal: form.jadwal.trim(),
      ruangan: form.ruangan.trim(),
    };

    if (
      !nilaiKelas.nama ||
      !nilaiKelas.pengajar ||
      !nilaiKelas.jadwal ||
      !nilaiKelas.ruangan
    ) {
      return;
    }

    if (kelasDiedit) {
      setDataKelas((data) =>
        data.map((kelas) =>
          kelas.id === kelasDiedit.id ? { ...kelas, ...nilaiKelas } : kelas
        )
      );
      setToast({
        open: true,
        message: `Data ${nilaiKelas.nama} berhasil diperbarui.`,
        severity: "success",
      });
    } else {
      const idBerikutnya =
        Math.max(...dataKelas.map((kelas) => kelas.id), 0) + 1;
      setDataKelas((data) => [...data, { id: idBerikutnya, ...nilaiKelas }]);
      setToast({
        open: true,
        message: `${nilaiKelas.nama} berhasil ditambahkan.`,
        severity: "success",
      });
    }

    setDialogTerbuka(false);
  };

  const hapusKelas = () => {
    if (!kelasDihapus) return;
    setDataKelas((data) =>
      data.filter((kelas) => kelas.id !== kelasDihapus.id)
    );
    setToast({
      open: true,
      message: `Data ${kelasDihapus.nama} berhasil dihapus.`,
      severity: "info",
    });
    setKelasDihapus(null);
  };

  return (
    <LayoutAdmin onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={2.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
          Daftar Kelas
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems={{ md: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={bukaFormTambah}
            sx={{ minHeight: 44, flexShrink: 0 }}
          >
            Tambah Data Kelas
          </Button>

          <TextField
            size="small"
            fullWidth
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Cari nama kelas, pengajar, atau jadwal"
            inputProps={{ "aria-label": "Cari nama kelas, pengajar, atau jadwal" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {keyword ? (
                    <IconButton
                      size="small"
                      aria-label="Hapus pencarian"
                      onClick={() => setKeyword("")}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  ) : (
                    <Search sx={{ color: "text.secondary", fontSize: 20 }} />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            size="small"
            label="Kategori"
            value={kategori}
            onChange={(event) => setKategori(event.target.value)}
            sx={{ width: { xs: "100%", md: 160 }, flexShrink: 0 }}
          >
            <MenuItem value="Semua">Semua</MenuItem>
            <MenuItem value="Pagi">Kelas Pagi</MenuItem>
            <MenuItem value="Siang">Kelas Sore</MenuItem>
          </TextField>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 760 }}>
              <TableHead>
                <TableRow
                  sx={{
                    "& .MuiTableCell-head": {
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontSize: "0.78rem",
                    },
                  }}
                >
                  <TableCell align="center" sx={{ width: 64 }}>No</TableCell>
                  <TableCell>Nama Kelas</TableCell>
                  <TableCell>Pengajar</TableCell>
                  <TableCell>Jadwal</TableCell>
                  <TableCell>Ruangan</TableCell>
                  <TableCell align="center" sx={{ width: 120 }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((kelas, index) => (
                    <TableRow key={kelas.id} hover>
                      <TableCell align="center" sx={{ color: "text.secondary" }}>
                        {index + 1}.
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.75} alignItems="flex-start">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {kelas.nama}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{kelas.pengajar}</TableCell>
                      <TableCell sx={{ color: "text.secondary" }}>
                        {kelas.jadwal}
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary" }}>
                        {kelas.ruangan}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.75} justifyContent="center">
                          <Tooltip title="Edit kelas">
                            <IconButton
                              size="small"
                              aria-label={`Edit ${kelas.nama}`}
                              onClick={() => bukaFormEdit(kelas)}
                              sx={{
                                color: "primary.main",
                                backgroundColor: "action.hover",
                                "&:hover": { backgroundColor: "success.light" },
                              }}
                            >
                              <EditOutlined fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus kelas">
                            <IconButton
                              size="small"
                              aria-label={`Hapus ${kelas.nama}`}
                              onClick={() => setKelasDihapus(kelas)}
                              sx={{
                                color: "error.main",
                                backgroundColor: "error.light",
                                "&:hover": {
                                  backgroundColor: "error.light",
                                  filter: "brightness(0.96)",
                                },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Tidak ada data kelas yang cocok.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ px: 2.5, py: 1.5, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="caption" color="text.secondary">
              Menampilkan {dataTampil.length} dari {dataKelas.length} kelas
            </Typography>
          </Box>
        </Paper>
      </Stack>

      <Dialog
        open={dialogTerbuka}
        onClose={() => setDialogTerbuka(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={simpanKelas}>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {kelasDiedit ? "Edit Data Kelas" : "Tambah Data Kelas"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                autoFocus
                required
                label="Nama Kelas"
                value={form.nama}
                onChange={(event) =>
                  setForm((nilai) => ({ ...nilai, nama: event.target.value }))
                }
                fullWidth
              />
              <TextField
                select
                required
                label="Kategori Waktu"
                value={form.waktu}
                onChange={(event) =>
                  setForm((nilai) => ({ ...nilai, waktu: event.target.value }))
                }
                fullWidth
              >
                <MenuItem value="Pagi">Kelas Pagi</MenuItem>
                <MenuItem value="Siang">Kelas Siang</MenuItem>
              </TextField>
              <TextField
                required
                label="Nama Pengajar"
                value={form.pengajar}
                onChange={(event) =>
                  setForm((nilai) => ({
                    ...nilai,
                    pengajar: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                required
                label="Jadwal"
                placeholder="Contoh: Senin - Kamis, 08.00 - 10.00"
                value={form.jadwal}
                onChange={(event) =>
                  setForm((nilai) => ({ ...nilai, jadwal: event.target.value }))
                }
                fullWidth
              />
              <TextField
                required
                label="Ruangan"
                value={form.ruangan}
                onChange={(event) =>
                  setForm((nilai) => ({ ...nilai, ruangan: event.target.value }))
                }
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={() => setDialogTerbuka(false)} color="inherit">
              Batal
            </Button>
            <Button type="submit" variant="contained">
              Simpan
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={Boolean(kelasDihapus)}
        onClose={() => setKelasDihapus(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Hapus Data Kelas?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Data {kelasDihapus?.nama} akan dihapus dari daftar.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={() => setKelasDihapus(null)} color="inherit">
            Batal
          </Button>
          <Button onClick={hapusKelas} variant="contained" color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={() => setToast((nilai) => ({ ...nilai, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((nilai) => ({ ...nilai, open: false }))}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </LayoutAdmin>
  );
}
