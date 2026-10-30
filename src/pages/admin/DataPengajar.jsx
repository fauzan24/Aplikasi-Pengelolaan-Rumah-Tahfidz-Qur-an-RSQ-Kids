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
import { usePengajar } from "../../context/PengajarContext";

const formKosong = { nama: "", jabatan: "Pagi", noHp: "" };

export default function DataPengajar({ onNavigate, onLogout }) {
  const { dataPengajar, setDataPengajar } = usePengajar();
  const [keyword, setKeyword] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [dialogTerbuka, setDialogTerbuka] = useState(false);
  const [pengajarDiedit, setPengajarDiedit] = useState(null);
  const [pengajarDihapus, setPengajarDihapus] = useState(null);
  const [form, setForm] = useState(formKosong);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const dataTampil = dataPengajar.filter((pengajar) => {
    const pencarian = keyword.trim().toLowerCase();
    const cocokPencarian =
      pengajar.nama.toLowerCase().includes(pencarian) ||
      pengajar.noHp.toLowerCase().includes(pencarian);
    const cocokKategori =
      kategori === "Semua" || pengajar.jabatan === kategori;

    return cocokPencarian && cocokKategori;
  });

  const bukaFormTambah = () => {
    setPengajarDiedit(null);
    setForm(formKosong);
    setDialogTerbuka(true);
  };

  const bukaFormEdit = (pengajar) => {
    setPengajarDiedit(pengajar);
    setForm({
      nama: pengajar.nama,
      jabatan: pengajar.jabatan,
      noHp: pengajar.noHp,
    });
    setDialogTerbuka(true);
  };

  const simpanPengajar = (event) => {
    event.preventDefault();
    const nama = form.nama.trim();
    const noHp = form.noHp.trim();
    if (!nama || !noHp) return;

    if (pengajarDiedit) {
      setDataPengajar((data) =>
        data.map((pengajar) =>
          pengajar.id === pengajarDiedit.id
            ? { ...pengajar, ...form, nama, noHp }
            : pengajar
        )
      );
      setToast({
        open: true,
        message: `Data ${nama} berhasil diperbarui.`,
        severity: "success",
      });
    } else {
      const idBerikutnya =
        Math.max(...dataPengajar.map((pengajar) => pengajar.id), 0) + 1;
      setDataPengajar((data) => [
        ...data,
        { id: idBerikutnya, ...form, nama, noHp },
      ]);
      setToast({
        open: true,
        message: `${nama} berhasil ditambahkan ke daftar pengajar.`,
        severity: "success",
      });
    }

    setDialogTerbuka(false);
  };

  const hapusPengajar = () => {
    if (!pengajarDihapus) return;
    setDataPengajar((data) =>
      data.filter((pengajar) => pengajar.id !== pengajarDihapus.id)
    );
    setToast({
      open: true,
      message: `Data ${pengajarDihapus.nama} berhasil dihapus.`,
      severity: "info",
    });
    setPengajarDihapus(null);
  };

  return (
    <LayoutAdmin onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={2.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
          Daftar Pengajar
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
            Tambah Data Pengajar
          </Button>

          <TextField
            size="small"
            fullWidth
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Cari nama atau nomor HP pengajar"
            inputProps={{ "aria-label": "Cari nama atau nomor HP pengajar" }}
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
            <MenuItem value="Pagi">Pengajar Pagi</MenuItem>
            <MenuItem value="Sore">Pengajar Sore</MenuItem>
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
            <Table sx={{ minWidth: 620 }}>
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
                  <TableCell>Nama Pengajar</TableCell>
                  <TableCell>Jabatan</TableCell>
                  <TableCell>No HP</TableCell>
                  <TableCell align="center" sx={{ width: 120 }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((pengajar, index) => (
                    <TableRow key={pengajar.id} hover>
                      <TableCell align="center" sx={{ color: "text.secondary" }}>
                        {index + 1}.
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {pengajar.nama}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={`Pengajar ${pengajar.jabatan}`}
                          sx={{
                            backgroundColor:
                              pengajar.jabatan === "Pagi"
                                ? "success.light"
                                : "warning.light",
                            color:
                              pengajar.jabatan === "Pagi"
                                ? "success.dark"
                                : "warning.dark",
                            fontSize: "0.75rem",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary" }}>
                        {pengajar.noHp}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.75} justifyContent="center">
                          <Tooltip title="Edit pengajar">
                            <IconButton
                              size="small"
                              aria-label={`Edit ${pengajar.nama}`}
                              onClick={() => bukaFormEdit(pengajar)}
                              sx={{
                                color: "primary.main",
                                backgroundColor: "action.hover",
                                "&:hover": { backgroundColor: "success.light" },
                              }}
                            >
                              <EditOutlined fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus pengajar">
                            <IconButton
                              size="small"
                              aria-label={`Hapus ${pengajar.nama}`}
                              onClick={() => setPengajarDihapus(pengajar)}
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
                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Tidak ada data pengajar yang cocok.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ px: 2.5, py: 1.5, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="caption" color="text.secondary">
              Menampilkan {dataTampil.length} dari {dataPengajar.length} pengajar
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
        <Box component="form" onSubmit={simpanPengajar}>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {pengajarDiedit ? "Edit Data Pengajar" : "Tambah Data Pengajar"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                autoFocus
                required
                label="Nama Pengajar"
                value={form.nama}
                onChange={(event) =>
                  setForm((nilai) => ({ ...nilai, nama: event.target.value }))
                }
                fullWidth
              />
              <TextField
                select
                required
                label="Jabatan"
                value={form.jabatan}
                onChange={(event) =>
                  setForm((nilai) => ({
                    ...nilai,
                    jabatan: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="Pagi">Pengajar Pagi</MenuItem>
                <MenuItem value="Sore">Pengajar Sore</MenuItem>
              </TextField>
              <TextField
                required
                label="No HP"
                type="tel"
                value={form.noHp}
                onChange={(event) =>
                  setForm((nilai) => ({ ...nilai, noHp: event.target.value }))
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
        open={Boolean(pengajarDihapus)}
        onClose={() => setPengajarDihapus(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Hapus Data Pengajar?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Data {pengajarDihapus?.nama} akan dihapus dari daftar.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={() => setPengajarDihapus(null)} color="inherit">
            Batal
          </Button>
          <Button onClick={hapusPengajar} variant="contained" color="error">
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
