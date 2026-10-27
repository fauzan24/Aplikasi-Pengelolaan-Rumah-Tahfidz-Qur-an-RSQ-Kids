
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import LayoutPengajar from "../../components/pengajar/LayoutPengajar";
import { useNilai } from "../../context/NilaiContext";

const warnaHijau = "#5C7652";

const aspekPenilaian = [
  { key: "bacaan", label: "Bacaan Iqro/Al-Qur'an" },
  { key: "doa", label: "Hafalan Doa" },
  { key: "tahfidz", label: "Hafalan Tahfidz" },
  { key: "hadits", label: "Hafalan Hadits" },
  { key: "adab", label: "Adab & Kedisiplinan" },
];

const hitungRataRata = (item) => {
  const total = aspekPenilaian.reduce(
    (jumlah, aspek) => jumlah + Number(item[aspek.key] || 0),
    0
  );

  return (total / aspekPenilaian.length).toFixed(1);
};

const gayaHeader = {
  color: "#FFFFFF",
  fontWeight: 700,
  fontSize: 12,
  whiteSpace: "nowrap",
  borderBottom: "none",
  py: 2,
};

const gayaIsi = {
  color: "#6D786C",
  fontSize: 12,
  whiteSpace: "nowrap",
};

export default function InputNilai({ onLogout, onNavigate }) {
  const { santri, setSantri } = useNilai();

  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [santriEdit, setSantriEdit] = useState(null);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [santriHapus, setSantriHapus] = useState(null);
  const [dialogHapus, setDialogHapus] = useState(false);

  // Filter berdasarkan nama, NIS, dan kelas
  const daftarSantri = useMemo(() => {
    const kata = keyword.trim().toLowerCase();

    return santri.filter((item) => {
      const cocokPencarian =
        item.nama.toLowerCase().includes(kata) ||
        item.nis.toLowerCase().includes(kata);

      const cocokKelas =
        filterKelas === "Semua" || item.kelas === filterKelas;

      return cocokPencarian && cocokKelas;
    });
  }, [santri, keyword, filterKelas]);

  const bukaEdit = (item) => {
    setSantriEdit({ ...item });
    setDialogEdit(true);
  };

  const simpanNilai = () => {
    if (!santriEdit) return;

    setSantri((sebelumnya) =>
      sebelumnya.map((item) =>
        item.nis === santriEdit.nis ? { ...santriEdit } : item
      )
    );

    setDialogEdit(false);
    setSantriEdit(null);
  };

  const konfirmasiHapus = () => {
    if (!santriHapus) return;

    setSantri((sebelumnya) =>
      sebelumnya.filter((item) => item.nis !== santriHapus.nis)
    );

    setDialogHapus(false);
    setSantriHapus(null);
  };

  return (
    <LayoutPengajar onLogout={onLogout} onNavigate={onNavigate}>
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          minHeight: "100vh",
          backgroundColor: "#FAF8F2",
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Judul halaman */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#303D32", mb: 0.5 }}
          >
            Input Nilai
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Kelola nilai bacaan Al-Qur'an, hafalan, dan Iqro santri yang kamu ampu.
          </Typography>
        </Box>

        {/* Pencarian dan filter kelas */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mb: 3 }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Cari nama atau NIS santri..."
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setKeyword(keywordInput);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#8A9386" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: 2.5,
              },
            }}
          />

          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "100%", sm: 160 },
              backgroundColor: "#FFFFFF",
              borderRadius: 2.5,
            }}
          >
            <InputLabel id="filter-kelas-label">Kelas</InputLabel>
            <Select
              labelId="filter-kelas-label"
              value={filterKelas}
              label="Kelas"
              onChange={(e) => setFilterKelas(e.target.value)}
            >
              <MenuItem value="Semua">Semua Kelas</MenuItem>
              <MenuItem value="Pagi">Kelas Pagi</MenuItem>
              <MenuItem value="Sore">Kelas Sore</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => setKeyword(keywordInput)}
            sx={{
              minWidth: 145,
              minHeight: 42,
              borderRadius: 2.5,
              backgroundColor: warnaHijau,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { backgroundColor: "#455D3D" },
            }}
          >
            Tampilkan
          </Button>
        </Stack>

        {/* Tabel nilai santri */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.25, md: 1.75 },
            border: "1px solid #EAE7DE",
            borderRadius: 3,
            backgroundColor: "#FFFFFF",
          }}
        >
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table
              sx={{ minWidth: 1360 }}
              aria-label="Tabel input nilai santri"
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: warnaHijau }}>
                  <TableCell rowSpan={2} align="center" sx={gayaHeader}>
                    No
                  </TableCell>

                  <TableCell rowSpan={2} align="center" sx={gayaHeader}>
                    NIS
                  </TableCell>

                  <TableCell
                    rowSpan={2}
                    sx={{ ...gayaHeader, minWidth: 170 }}
                  >
                    Nama Santri
                  </TableCell>

                  <TableCell
                    rowSpan={2}
                    align="center"
                    sx={{ ...gayaHeader, minWidth: 110 }}
                  >
                    Kelas
                  </TableCell>

                  <TableCell colSpan={5} align="center" sx={gayaHeader}>
                    Penilaian
                  </TableCell>

                  <TableCell rowSpan={2} align="center" sx={gayaHeader}>
                    Rata-rata
                  </TableCell>

                  <TableCell rowSpan={2} align="center" sx={gayaHeader}>
                    Aksi
                  </TableCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: warnaHijau }}>
                  {aspekPenilaian.map((aspek) => (
                    <TableCell
                      key={aspek.key}
                      align="center"
                      sx={{
                        ...gayaHeader,
                        minWidth: 135,
                        fontSize: 11,
                        whiteSpace: "normal",
                        lineHeight: 1.5,
                      }}
                    >
                      {aspek.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {daftarSantri.length > 0 ? (
                  daftarSantri.map((item, index) => (
                    <TableRow
                      key={item.nis}
                      hover
                      sx={{
                        "& td": {
                          borderBottom: "1px solid #ECE9E0",
                          py: 2.25,
                        },
                      }}
                    >
                      <TableCell align="center" sx={gayaIsi}>
                        {index + 1}.
                      </TableCell>

                      <TableCell align="center" sx={gayaIsi}>
                        {item.nis}
                      </TableCell>

                      <TableCell
                        sx={{
                          ...gayaIsi,
                          fontWeight: 700,
                          color: "#303D32",
                        }}
                      >
                        {item.nama}
                      </TableCell>

                      {/* Kolom kelas */}
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 1.5,
                            py: 0.75,
                            borderRadius: 2,
                            fontSize: 11,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            color:
                              item.kelas === "Pagi"
                                ? "#476640"
                                : item.kelas === "Sore"
                                ? "#8A6820"
                                : "#626B60",
                            backgroundColor:
                              item.kelas === "Pagi"
                                ? "#E8F0E4"
                                : item.kelas === "Sore"
                                ? "#FFF1D2"
                                : "#ECEEE7",
                          }}
                        >
                          {item.kelas ? `Kelas ${item.kelas}` : "-"}
                        </Box>
                      </TableCell>

                      {aspekPenilaian.map((aspek) => (
                        <TableCell
                          key={aspek.key}
                          align="center"
                          sx={{
                            ...gayaIsi,
                            fontWeight: 700,
                            color: "#303D32",
                          }}
                        >
                          {item[aspek.key]}
                        </TableCell>
                      ))}

                      <TableCell
                        align="center"
                        sx={{
                          ...gayaIsi,
                          fontWeight: 800,
                          color: "#303D32",
                        }}
                      >
                        {hitungRataRata(item)}
                      </TableCell>

                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          <Tooltip title="Edit nilai">
                            <IconButton
                              onClick={() => bukaEdit(item)}
                              aria-label={`Edit nilai ${item.nama}`}
                              sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 2,
                                backgroundColor: "#ECEEE7",
                                color: warnaHijau,
                                "&:hover": {
                                  backgroundColor: "#DDE4D5",
                                },
                              }}
                            >
                              <EditOutlinedIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Hapus santri">
                            <IconButton
                              onClick={() => {
                                setSantriHapus(item);
                                setDialogHapus(true);
                              }}
                              aria-label={`Hapus ${item.nama}`}
                              sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 2,
                                backgroundColor: "#FBE1E1",
                                color: "#C63832",
                                "&:hover": {
                                  backgroundColor: "#F5CCCC",
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      align="center"
                      sx={{ py: 5, color: "#7B8478" }}
                    >
                      Santri tidak ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Informasi jumlah data */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{
              justifyContent: "space-between",
              px: 1,
              pt: 2,
              pb: 0.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Menampilkan {daftarSantri.length} dari {santri.length} santri
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Semester Ganjil · Tahun Ajaran 2026/2027
            </Typography>
          </Stack>
        </Paper>

        {/* Dialog edit nilai */}
        <Dialog
          open={dialogEdit}
          onClose={() => {
            setDialogEdit(false);
            setSantriEdit(null);
          }}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ color: "#303D32", fontWeight: 700 }}>
            Edit Nilai Santri
          </DialogTitle>

          <DialogContent dividers>
            {santriEdit && (
              <>
                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                  {santriEdit.nama}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2.5 }}
                >
                  NIS: {santriEdit.nis} · Kelas: {santriEdit.kelas || "-"}
                </Typography>

                <Stack spacing={2}>
                  {aspekPenilaian.map((aspek) => (
                    <TextField
                      key={aspek.key}
                      fullWidth
                      type="number"
                      label={aspek.label}
                      size="small"
                      value={santriEdit[aspek.key]}
                      inputProps={{ min: 0, max: 100 }}
                      onChange={(e) => {
                        const nilai = e.target.value;

                        setSantriEdit((sebelumnya) => ({
                          ...sebelumnya,
                          [aspek.key]:
                            nilai === ""
                              ? ""
                              : Math.max(
                                  0,
                                  Math.min(100, Number(nilai))
                                ),
                        }));
                      }}
                    />
                  ))}
                </Stack>
              </>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => {
                setDialogEdit(false);
                setSantriEdit(null);
              }}
              sx={{ textTransform: "none", color: "#626B60" }}
            >
              Batal
            </Button>

            <Button
              variant="contained"
              onClick={simpanNilai}
              disabled={
                !santriEdit ||
                aspekPenilaian.some(
                  (aspek) =>
                    santriEdit[aspek.key] === "" ||
                    !Number.isFinite(Number(santriEdit[aspek.key])) ||
                    Number(santriEdit[aspek.key]) < 0 ||
                    Number(santriEdit[aspek.key]) > 100
                )
              }
              sx={{
                backgroundColor: warnaHijau,
                textTransform: "none",
                "&:hover": { backgroundColor: "#455D3D" },
              }}
            >
              Simpan Nilai
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog konfirmasi hapus */}
        <Dialog
          open={dialogHapus}
          onClose={() => {
            setDialogHapus(false);
            setSantriHapus(null);
          }}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle sx={{ fontWeight: 700 }}>
            Hapus Data Santri?
          </DialogTitle>

          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              Apakah kamu yakin ingin menghapus data nilai{" "}
              <strong>{santriHapus?.nama}</strong> dari daftar ini?
            </Typography>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => {
                setDialogHapus(false);
                setSantriHapus(null);
              }}
              sx={{ textTransform: "none", color: "#626B60" }}
            >
              Batal
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={konfirmasiHapus}
              sx={{ textTransform: "none" }}
            >
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LayoutPengajar>
  );
}