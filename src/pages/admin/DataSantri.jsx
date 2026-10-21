import { useState } from "react";
import {
  Add,
  Delete,
  EditOutlined,
  Search,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
} from "@mui/material";
import LayoutAdmin from "../../components/admin/LayoutAdmin";

const dataSantriAwal = [
  { id: "RSQ001", nama: "Jauza Askana", kelas: "Pagi", status: "Aktif" },
  { id: "RSQ002", nama: "Dinda Azzahra", kelas: "Siang", status: "Aktif" },
  { id: "RSQ003", nama: "Raffa Fadilla", kelas: "Pagi", status: "Waiting list" },
  { id: "RSQ004", nama: "Dede Ridho", kelas: "Pagi", status: "Aktif" },
  { id: "RSQ005", nama: "Kalila Haura", kelas: "Siang", status: "Aktif" },
  { id: "RSQ006", nama: "Fauzan", kelas: "Pagi", status: "Aktif" },
  { id: "RSQ007", nama: "Raino", kelas: "Siang", status: "Waiting list" },
];

const formKosong = { nama: "", kelas: "Pagi", status: "Aktif" };

const warnaStatus = {
  Aktif: { backgroundColor: "#EAF5EE", color: "#28734D" },
  "Waiting list": { backgroundColor: "#FFF4E5", color: "#A46313" },
};

export default function DataSantri({ onNavigate, onLogout }) {
  const [dataSantri, setDataSantri] = useState(dataSantriAwal);
  const [keyword, setKeyword] = useState("");
  const [kategori, setKategori] = useState("Semua Kategori");
  const [dialogTerbuka, setDialogTerbuka] = useState(false);
  const [dialogHapusTerbuka, setDialogHapusTerbuka] = useState(false);
  const [form, setForm] = useState(formKosong);
  const [idDiedit, setIdDiedit] = useState(null);
  const [idDihapus, setIdDihapus] = useState(null);

  const dataTampil = dataSantri.filter((santri) => {
    const pencarian = keyword.trim().toLowerCase();
    const cocokPencarian =
      santri.nama.toLowerCase().includes(pencarian) ||
      santri.id.toLowerCase().includes(pencarian);
    const cocokKategori =
      kategori === "Semua Kategori" ||
      (kategori === "Daftar Tunggu"
        ? santri.status === "Waiting list"
        : santri.kelas === kategori);

    return cocokPencarian && cocokKategori;
  });

  const bukaFormTambah = () => {
    setIdDiedit(null);
    setForm(formKosong);
    setDialogTerbuka(true);
  };

  const bukaFormEdit = (santri) => {
    setIdDiedit(santri.id);
    setForm({ nama: santri.nama, kelas: santri.kelas, status: santri.status });
    setDialogTerbuka(true);
  };

  const simpanSantri = (event) => {
    event.preventDefault();
    const nama = form.nama.trim();
    if (!nama) return;

    if (idDiedit) {
      setDataSantri((data) =>
        data.map((santri) =>
          santri.id === idDiedit ? { ...santri, ...form, nama } : santri
        )
      );
    } else {
      const nomorBerikutnya =
        Math.max(...dataSantri.map((santri) => Number(santri.id.slice(3))), 0) + 1;
      const id = `RSQ${String(nomorBerikutnya).padStart(3, "0")}`;
      setDataSantri((data) => [...data, { id, ...form, nama }]);
    }

    setDialogTerbuka(false);
  };

  const hapusSantri = () => {
    setDataSantri((data) => data.filter((santri) => santri.id !== idDihapus));
    setDialogHapusTerbuka(false);
    setIdDihapus(null);
  };

  return (
    <LayoutAdmin
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Stack spacing={2.5} sx={{ width: "100%", minWidth: 0, pb: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={2}
          sx={{
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography component="h1" variant="h5" fontWeight={800} color="#28352C">
              Daftar Santri
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Kelola data dan status santri RSQ-Kids.
            </Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={bukaFormTambah}
            sx={{
              alignSelf: { xs: "stretch", sm: "auto" },
              backgroundColor: "#5A734E",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#40583A" },
            }}
          >
            Tambah Data Santri
          </Button>
        </Stack>

        <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
            alignItems: { xs: "stretch", sm: "center" },
            // Menambahkan spacing manual agar tidak terkena bentrokan CSS/Tailwind
            "& > :not(style) ~ :not(style)": {
            ml: { xs: 0, sm: 2 }, // Jarak horizontal di layar desktop (16px)
            mt: { xs: 1.5, sm: 0 }, // Jarak vertikal di layar HP
            },
        }}
        >
        <TextField
            size="small"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Cari nama atau NIS santri"
            sx={{
            width: { xs: "100%", sm: 340 },
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                height: "40px", // Mengunci tinggi pasti
            },
            }}
            slotProps={{
            htmlInput: { "aria-label": "Cari santri" },
            input: {
                startAdornment: (
                <Search sx={{ mr: 1, color: "#7A8378", fontSize: 19 }} />
                ),
            },
            }}
        />
        <TextField
            select
            size="small"
            value={kategori}
            onChange={(event) => setKategori(event.target.value)}
            sx={{
            width: { xs: "100%", sm: 190 },
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                height: "40px", // Mengunci tinggi yang persis sama
            },
            "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
            },
            }}
        >
            <MenuItem value="Semua Kategori">Semua Kategori</MenuItem>
            <MenuItem value="Pagi">Kelas Pagi</MenuItem>
            <MenuItem value="Siang">Kelas Siang</MenuItem>
            <MenuItem value="Daftar Tunggu">Daftar Tunggu</MenuItem>
        </TextField>
        </Stack>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            overflowX: "auto",
            border: "1px solid #E6E8E1",
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Table aria-label="Data santri" sx={{ minWidth: 680 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#5A734E" }}>
                {["No", "NIS", "Nama Santri", "Kelas", "Status", "Aksi"].map((judul) => (
                  <TableCell
                    key={judul}
                    align={judul === "No" || judul === "Aksi" ? "center" : "left"}
                    sx={{ color: "#fff", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}
                  >
                    {judul}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTampil.map((santri, index) => (
                <TableRow key={santri.id} hover>
                  <TableCell align="center" sx={{ color: "#7D867B", width: 54 }}>
                    {index + 1}.
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", fontSize: 12 }}>{santri.id}</TableCell>
                  <TableCell sx={{ minWidth: 160, fontSize: 12, fontWeight: 600, color: "#28352C" }}>
                    {santri.nama}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{santri.kelas}</TableCell>
                  <TableCell>
                    <Typography
                      component="span"
                      sx={{
                        display: "inline-flex",
                        px: 1,
                        py: 0.45,
                        borderRadius: 5,
                        fontSize: 10,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        ...warnaStatus[santri.status],
                      }}
                    >
                      {santri.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      aria-label={`Edit ${santri.nama}`}
                      title="Edit santri"
                      size="small"
                      onClick={() => bukaFormEdit(santri)}
                      sx={{ color: "#536F9B", mr: 0.5 }}
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label={`Hapus ${santri.nama}`}
                      title="Hapus santri"
                      size="small"
                      onClick={() => {
                        setIdDihapus(santri.id);
                        setDialogHapusTerbuka(true);
                      }}
                      sx={{ color: "#A75249" }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {dataTampil.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5, color: "text.secondary" }}>
                    Santri tidak ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="caption" color="text.secondary">
          Menampilkan {dataTampil.length} dari {dataSantri.length} santri
        </Typography>
      </Stack>

      <Dialog open={dialogTerbuka} onClose={() => setDialogTerbuka(false)} fullWidth maxWidth="xs">
        <form onSubmit={simpanSantri}>
          <DialogTitle>{idDiedit ? "Edit Data Santri" : "Tambah Data Santri"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                autoFocus
                required
                fullWidth
                label="Nama santri"
                value={form.nama}
                onChange={(event) => setForm((data) => ({ ...data, nama: event.target.value }))}
              />
              <TextField
                select
                fullWidth
                label="Kelas"
                value={form.kelas}
                onChange={(event) => setForm((data) => ({ ...data, kelas: event.target.value }))}
              >
                <MenuItem value="Pagi">Pagi</MenuItem>
                <MenuItem value="Siang">Siang</MenuItem>
              </TextField>
              <TextField
                select
                fullWidth
                label="Status"
                value={form.status}
                onChange={(event) => setForm((data) => ({ ...data, status: event.target.value }))}
              >
                <MenuItem value="Aktif">Aktif</MenuItem>
                <MenuItem value="Waiting list">Waiting list</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogTerbuka(false)} sx={{ color: "#5D685D", textTransform: "none" }}>
              Batal
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#5A734E", textTransform: "none" }}>
              Simpan
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={dialogHapusTerbuka}
        onClose={() => setDialogHapusTerbuka(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Hapus data santri?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Data santri yang dihapus akan hilang dari daftar ini.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogHapusTerbuka(false)} sx={{ color: "#5D685D", textTransform: "none" }}>
            Batal
          </Button>
          <Button onClick={hapusSantri} color="error" variant="contained" sx={{ textTransform: "none" }}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </LayoutAdmin>
  );
}