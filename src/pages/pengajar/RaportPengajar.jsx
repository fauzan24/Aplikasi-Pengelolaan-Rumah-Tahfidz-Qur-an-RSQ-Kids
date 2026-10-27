
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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

const dataAwal = [
  {
    nis: "RSQ001",
    nama: "Jauza Askana",
    kelas: "Pagi",
    pengajar: "Ust. Fatimah",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 89,
        predikat: "B",
        catatan: "Bacaan sudah baik dan lancar.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 90,
        predikat: "A",
        catatan: "Hafalan sudah baik dan lancar.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 85,
        predikat: "B",
        catatan: "Perlu mengulang hafalan secara rutin.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 88,
        predikat: "B",
        catatan: "Hafalan sudah cukup lancar.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 92,
        predikat: "A",
        catatan: "Menunjukkan sikap yang baik.",
      },
    ],
  },
  {
    nis: "RSQ002",
    nama: "Dinda Azzahra",
    kelas: "Pagi",
    pengajar: "Ust. Fatimah",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 92,
        predikat: "A",
        catatan: "Bacaan lancar.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 89,
        predikat: "B",
        catatan: "Hafalan perlu dilancarkan lagi.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 90,
        predikat: "A",
        catatan: "Hafalan berkembang dengan baik.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 88,
        predikat: "B",
        catatan: "Perlu latihan hafalan secara rutin.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 90,
        predikat: "A",
        catatan: "Sopan dan disiplin.",
      },
    ],
  },
  {
    nis: "RSQ003",
    nama: "Raffa Fadila",
    kelas: "Pagi",
    pengajar: "Ust. Fatimah",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 85,
        predikat: "B",
        catatan: "Perlu latihan membaca secara rutin.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 84,
        predikat: "B",
        catatan: "Perlu mengulang hafalan.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 80,
        predikat: "B",
        catatan: "Hafalan perlu ditingkatkan.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 84,
        predikat: "B",
        catatan: "Perlu latihan hafalan.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 88,
        predikat: "B",
        catatan: "Menunjukkan sikap yang baik.",
      },
    ],
  },
  {
    nis: "RSQ004",
    nama: "Dede Ridho",
    kelas: "Pagi",
    pengajar: "Ust. Fatimah",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 88,
        predikat: "B",
        catatan: "Bacaan cukup lancar.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 90,
        predikat: "A",
        catatan: "Hafalan sudah baik.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 86,
        predikat: "B",
        catatan: "Perlu latihan secara rutin.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 85,
        predikat: "B",
        catatan: "Hafalan cukup baik.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 91,
        predikat: "A",
        catatan: "Menunjukkan sikap yang baik.",
      },
    ],
  },
  {
    nis: "RSQ005",
    nama: "Kalila Haura",
    kelas: "Pagi",
    pengajar: "Ust. Fatimah",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 90,
        predikat: "A",
        catatan: "Bacaan sudah lancar.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 89,
        predikat: "B",
        catatan: "Hafalan cukup baik.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 90,
        predikat: "A",
        catatan: "Hafalan berkembang dengan baik.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 88,
        predikat: "B",
        catatan: "Perlu dipertahankan.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 92,
        predikat: "A",
        catatan: "Sopan dan disiplin.",
      },
    ],
  },
  {
    nis: "RSQ006",
    nama: "Fauzan Najib Ali",
    kelas: "Pagi",
    pengajar: "Ust. Fatimah",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 90,
        predikat: "A",
        catatan: "Bacaan sudah baik dan lancar.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 90,
        predikat: "A",
        catatan: "Hafalan sudah baik dan lancar.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 85,
        predikat: "B",
        catatan: "Perlu mengulang hafalan secara rutin.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 88,
        predikat: "B",
        catatan: "Hafalan sudah cukup lancar.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 92,
        predikat: "A",
        catatan: "Menunjukkan sikap yang baik.",
      },
    ],
  },
  {
    nis: "RSQ007",
    nama: "Muhammad Fikri",
    kelas: "Pagi",
    pengajar: "Ust. Fatimah",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 88,
        predikat: "B",
        catatan: "Bacaan cukup lancar.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 90,
        predikat: "A",
        catatan: "Hafalan sudah baik.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 86,
        predikat: "B",
        catatan: "Perlu latihan hafalan secara rutin.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 88,
        predikat: "B",
        catatan: "Hafalan cukup lancar.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 90,
        predikat: "A",
        catatan: "Sopan dan disiplin.",
      },
    ],
  },
  {
    nis: "RSQ008",
    nama: "Aisyah Putri",
    kelas: "Sore",
    pengajar: "Ust. Ahmad",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 92,
        predikat: "A",
        catatan: "Bacaan lancar.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 89,
        predikat: "B",
        catatan: "Hafalan perlu dilancarkan lagi.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 90,
        predikat: "A",
        catatan: "Hafalan berkembang dengan baik.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 88,
        predikat: "B",
        catatan: "Perlu ditingkatkan lagi hafalannya.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 90,
        predikat: "A",
        catatan: "Sopan dan disiplin.",
      },
    ],
  },
  {
    nis: "RSQ009",
    nama: "Ahmad Rizky",
    kelas: "Sore",
    pengajar: "Ust. Ahmad",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 85,
        predikat: "B",
        catatan: "Perlu latihan membaca.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 86,
        predikat: "B",
        catatan: "Hafalan perlu diulang.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 86,
        predikat: "B",
        catatan: "Hafalan perlu diulang.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 84,
        predikat: "B",
        catatan: "Perlu latihan hafalan.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 90,
        predikat: "A",
        catatan: "Menunjukkan sikap baik.",
      },
    ],
  },
  {
    nis: "RSQ010",
    nama: "Zahra Nabila",
    kelas: "Sore",
    pengajar: "Ust. Ahmad",
    nilai: [
      {
        pelajaran: "Bacaan Iqro / Al-Qur'an",
        nilai: 90,
        predikat: "A",
        catatan: "Bacaan sudah baik.",
      },
      {
        pelajaran: "Hafalan Doa",
        nilai: 91,
        predikat: "A",
        catatan: "Hafalan baik dan lancar.",
      },
      {
        pelajaran: "Hafalan Tahfidz",
        nilai: 90,
        predikat: "A",
        catatan: "Hafalan berkembang dengan baik.",
      },
      {
        pelajaran: "Hafalan Hadits",
        nilai: 89,
        predikat: "B",
        catatan: "Hafalan sudah cukup lancar.",
      },
      {
        pelajaran: "Adab dan Kedisiplinan",
        nilai: 92,
        predikat: "A",
        catatan: "Sopan dan disiplin.",
      },
    ],
  },
];


const warnaHijau = "#5C7652";
const warnaEmas = "#C9A044";

export default function RaportPengajar() {
  const [santri, setSantri] = useState(dataAwal);
  const [pencarian, setPencarian] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [santriTerpilih, setSantriTerpilih] = useState(null);
  const [modeDialog, setModeDialog] = useState("");
  const [nilaiEdit, setNilaiEdit] = useState([]);

  const daftarSantri = useMemo(() => {
    return santri.filter((item) => {
      const cocokPencarian =
        item.nama.toLowerCase().includes(pencarian.toLowerCase()) ||
        item.nis.toLowerCase().includes(pencarian.toLowerCase());

      const cocokKelas =
        filterKelas === "Semua" || item.kelas === filterKelas;

      return cocokPencarian && cocokKelas;
    });
  }, [santri, pencarian, filterKelas]);

  const hitungRataRata = (dataNilai) => {
    if (!dataNilai.length) return 0;

    return (
      dataNilai.reduce((total, item) => total + Number(item.nilai || 0), 0) /
      dataNilai.length
    );
  };

  const bukaRaport = (item) => {
    setSantriTerpilih(item);
    setModeDialog("lihat");
  };

  const bukaEdit = (item) => {
    setSantriTerpilih(item);
    setNilaiEdit(item.nilai.map((nilai) => ({ ...nilai })));
    setModeDialog("edit");
  };

  const simpanNilai = () => {
    setSantri((sebelumnya) =>
      sebelumnya.map((item) =>
        item.nis === santriTerpilih.nis
          ? { ...item, nilai: nilaiEdit }
          : item
      )
    );

    setSantriTerpilih((sebelumnya) => ({
      ...sebelumnya,
      nilai: nilaiEdit,
    }));

    setModeDialog("lihat");
  };

  const cetakRaport = (item) => {
    setSantriTerpilih(item);
    setModeDialog("cetak");

    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <LayoutPengajar>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F7F8F4",
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Judul halaman */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#344B32", mb: 0.5 }}
          >
            Raport Santri
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Lihat hasil belajar dan perkembangan santri yang kamu ampu.
          </Typography>
        </Box>

        {/* Ringkasan */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
            mb: 3,
          }}
        >
          {[
            {
              label: "Total Santri",
              angka: santri.length,
              ikon: <AccountCircleIcon />,
              warna: "#E8EFE3",
            },
            {
              label: "Kelas Pagi",
              angka: santri.filter((item) => item.kelas === "Pagi").length,
              ikon: <AccountCircleIcon />,
              warna: "#F5EBCF",
            },
            {
              label: "Kelas Sore",
              angka: santri.filter((item) => item.kelas === "Sore").length,
              ikon: <AccountCircleIcon />,
              warna: "#E8EFE3",
            },
          ].map((item) => (
            <Paper
              key={item.label}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid #E5E9E0",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: item.warna,
                  color: warnaHijau,
                  width: 48,
                  height: 48,
                }}
              >
                {item.ikon}
              </Avatar>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#344B32", fontWeight: 700 }}
                >
                  {item.angka}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Tabel daftar santri */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E2E7DE",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: { xs: 2, md: 2.5 } }}>
            <Typography
              variant="h6"
              sx={{ color: "#344B32", fontWeight: 700, mb: 0.5 }}
            >
              Daftar Raport Santri
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2.5 }}
            >
              Pilih santri untuk melihat detail raport atau mengubah nilainya.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="space-between"
            >
              <TextField
                size="small"
                fullWidth
                placeholder="Cari nama atau NIS santri..."
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
                sx={{ maxWidth: { sm: 420 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#788773" }} />
                    </InputAdornment>
                  ),
                }}
              />


                <TextField
                select
                size="small"
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
                sx={{ minWidth: { sm: 160 } }}
                >
                <MenuItem value="Semua">Semua kelas</MenuItem>
                <MenuItem value="Pagi">Kelas Pagi</MenuItem>
                <MenuItem value="Sore">Kelas Sore</MenuItem>
                </TextField>
            </Stack>
          </Box>

          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#5C7652" }}>
                  {["No.", "Nama Santri", "Kelas", "Rata-rata", "Aksi"].map(
                    (judul) => (
                      <TableCell
                        key={judul}
                        align={judul === "Aksi" ? "center" : "left"}
                        sx={{
                          color: "white",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {judul}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {daftarSantri.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                      <Typography color="text.secondary">
                        Data santri tidak ditemukan.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  daftarSantri.map((item, index) => (
                    <TableRow
                      key={item.nis}
                      hover
                      sx={{
                        "&:nth-of-type(even)": {
                          backgroundColor: "#FAFBF8",
                        },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: "#E8EFE3",
                              color: warnaHijau,
                              width: 40,
                              height: 40,
                            }}
                          >
                            <AccountCircleIcon />
                          </Avatar>

                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                color: "#344B32",
                              }}
                            >
                              {item.nama}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              NIS: {item.nis}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={`Kelas ${item.kelas}`}
                          sx={{
                            bgcolor:
                              item.kelas === "Pagi" ? "#E8EFE3" : "#F7EFD9",
                            color:
                              item.kelas === "Pagi" ? "#4B6942" : "#87671F",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{ fontWeight: 700, color: warnaHijau }}
                        >
                          {hitungRataRata(item.nilai).toFixed(1)}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={0.5}
                          justifyContent="center"
                        >
                          <Tooltip title="Lihat raport">
                            <IconButton
                              size="small"
                              onClick={() => bukaRaport(item)}
                              sx={{
                                color: warnaHijau,
                                bgcolor: "#E8EFE3",
                                "&:hover": { bgcolor: "#D8E4D2" },
                              }}
                            >
                              <VisibilityOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit nilai">
                            <IconButton
                              size="small"
                              onClick={() => bukaEdit(item)}
                              sx={{
                                color: "#9A741C",
                                bgcolor: "#F7EFD9",
                                "&:hover": { bgcolor: "#EFE2BD" },
                              }}
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Cetak raport">
                            <IconButton
                              size="small"
                              onClick={() => cetakRaport(item)}
                              sx={{
                                color: "#52627A",
                                bgcolor: "#E9EDF3",
                                "&:hover": { bgcolor: "#DCE3ED" },
                              }}
                            >
                              <PrintOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              borderTop: "1px solid #E5E9E0",
              backgroundColor: "#FCFCFA",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Menampilkan {daftarSantri.length} dari {santri.length} santri
            </Typography>
          </Box>
        </Paper>

        {/* Dialog detail raport */}
        <Dialog
          open={modeDialog === "lihat"}
          onClose={() => setModeDialog("")}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ fontWeight: 700, color: "#344B32" }}>
            Detail Raport Santri
          </DialogTitle>

          <DialogContent dividers>
            {santriTerpilih && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#E8EFE3",
                      color: warnaHijau,
                      width: 56,
                      height: 56,
                    }}
                  >
                    <AccountCircleIcon sx={{ fontSize: 38 }} />
                  </Avatar>

                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {santriTerpilih.nama}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      NIS: {santriTerpilih.nis} · Kelas {santriTerpilih.kelas}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pengajar: {santriTerpilih.pengajar}
                    </Typography>
                  </Box>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#5C7652" }}>
                        {["No.", "Aspek Penilaian", "Nilai", "Predikat", "Catatan"].map(
                          (judul) => (
                            <TableCell
                              key={judul}
                              sx={{
                                color: "white",
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {judul}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {santriTerpilih.nilai.map((item, index) => (
                        <TableRow key={item.pelajaran}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.pelajaran}</TableCell>
                          <TableCell>{item.nilai}</TableCell>
                          <TableCell>{item.predikat}</TableCell>
                          <TableCell>{item.catatan}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography sx={{ mt: 2, fontWeight: 700, color: warnaHijau }}>
                  Rata-rata nilai:{" "}
                  {hitungRataRata(santriTerpilih.nilai).toFixed(1)}
                </Typography>
              </>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setModeDialog("")}>Tutup</Button>
            <Button
              variant="contained"
              startIcon={<EditOutlinedIcon />}
              onClick={() => bukaEdit(santriTerpilih)}
              sx={{
                bgcolor: warnaHijau,
                textTransform: "none",
                "&:hover": { bgcolor: "#455D3D" },
              }}
            >
              Edit Nilai
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog edit nilai */}
        <Dialog
          open={modeDialog === "edit"}
          onClose={() => setModeDialog("")}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ fontWeight: 700, color: "#344B32" }}>
            Edit Nilai Raport
          </DialogTitle>

          <DialogContent dividers>
            {santriTerpilih && (
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Santri: {santriTerpilih.nama}
              </Typography>
            )}

            {nilaiEdit.map((item, index) => (
              <Box
                key={item.pelajaran}
                sx={{
                  mb: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  {item.pelajaran}
                </Typography>

                <TextField
                  label="Nilai (0–100)"
                  type="number"
                  size="small"
                  value={item.nilai}
                  inputProps={{ min: 0, max: 100 }}
                  onChange={(e) => {
                    const nilaiBaru = e.target.value;
                    setNilaiEdit((sebelumnya) =>
                      sebelumnya.map((nilai, i) =>
                        i === index
                          ? {
                              ...nilai,
                              nilai:
                                nilaiBaru === ""
                                  ? ""
                                  : Math.max(
                                      0,
                                      Math.min(100, Number(nilaiBaru))
                                    ),
                              predikat:
                                Number(nilaiBaru) >= 90
                                  ? "A"
                                  : Number(nilaiBaru) >= 80
                                    ? "B"
                                    : Number(nilaiBaru) >= 70
                                      ? "C"
                                      : "D",
                            }
                          : nilai
                      )
                    );
                  }}
                />

                <TextField
                  label="Catatan perkembangan"
                  size="small"
                  multiline
                  minRows={2}
                  value={item.catatan}
                  onChange={(e) =>
                    setNilaiEdit((sebelumnya) =>
                      sebelumnya.map((nilai, i) =>
                        i === index
                          ? { ...nilai, catatan: e.target.value }
                          : nilai
                      )
                    )
                  }
                />
              </Box>
            ))}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setModeDialog("")}>Batal</Button>
            <Button
              variant="contained"
              onClick={simpanNilai}
              sx={{
                bgcolor: warnaHijau,
                textTransform: "none",
                "&:hover": { bgcolor: "#455D3D" },
              }}
            >
              Simpan Perubahan
            </Button>
          </DialogActions>
        </Dialog>

        {/* Tampilan cetak */}
        {modeDialog === "cetak" && santriTerpilih && (
          <Box
            id="area-cetak"
            sx={{
              display: "none",
              "@media print": {
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                p: 3,
              },
            }}
          >
            <Typography variant="h5" align="center" sx={{ fontWeight: 700 }}>
              RAPORT HASIL BELAJAR SANTRI
            </Typography>
            <Typography align="center" sx={{ mb: 3 }}>
              Rumah Tahfidz RSQ-Kids
            </Typography>

            <Typography>Nama: {santriTerpilih.nama}</Typography>
            <Typography>NIS: {santriTerpilih.nis}</Typography>
            <Typography>Kelas: {santriTerpilih.kelas}</Typography>
            <Typography>Pengajar: {santriTerpilih.pengajar}</Typography>

            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  {["No.", "Aspek Penilaian", "Nilai", "Predikat", "Catatan"].map(
                    (judul) => (
                      <TableCell key={judul} sx={{ fontWeight: 700 }}>
                        {judul}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {santriTerpilih.nilai.map((item, index) => (
                  <TableRow key={item.pelajaran}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.pelajaran}</TableCell>
                    <TableCell>{item.nilai}</TableCell>
                    <TableCell>{item.predikat}</TableCell>
                    <TableCell>{item.catatan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Typography sx={{ mt: 2 }}>
              Rata-rata nilai: {hitungRataRata(santriTerpilih.nilai).toFixed(1)}
            </Typography>
          </Box>
        )}

        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              #area-cetak,
              #area-cetak * {
                visibility: visible;
              }
              #area-cetak {
                display: block !important;
                position: absolute !important;
                top: 0;
                left: 0;
              }
              @page {
                size: A4 portrait;
                margin: 12mm;
              }
            }
          `}
        </style>
      </Box>
    </LayoutPengajar>
  );
}