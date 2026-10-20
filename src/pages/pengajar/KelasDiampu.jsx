import { useState } from "react";
import {
  AccessTime,
  ArrowForward,
  MenuBook,
  NightsStay,
  Search,
  WbSunny,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
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
} from "@mui/material";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

const dataSantri = [
  { nis: "RSQ001", nama: "Jauza Askana", nilai: 89, status: "Belum Lengkap" },
  { nis: "RSQ002", nama: "Dinda Azzahra", nilai: 90, status: "Lengkap" },
  { nis: "RSQ003", nama: "Raffa Fadilla", nilai: null, status: "Belum Lengkap" },
  { nis: "RSQ004", nama: "Dede Ridho", nilai: 88, status: "Lengkap" },
  { nis: "RSQ005", nama: "Kalila Haura", nilai: 92, status: "Lengkap" },
  { nis: "RSQ006", nama: "Aisyah Putri", nilai: null, status: "Belum Lengkap" },
  { nis: "RSQ007", nama: "Muhammad Fikri", nilai: 87, status: "Belum Lengkap" },
];

const kelas = [
  { id: "pagi", nama: "Kelas Pagi A", jadwal: "Jadwal pagi", jumlah: dataSantri.length, icon: WbSunny },
  { id: "sore", nama: "Kelas Sore A", jadwal: "Jadwal sore", jumlah: 0, icon: NightsStay },
];

export default function KelasDiampu({ onNavigate, onLogout }) {
  const [kelasAktif, setKelasAktif] = useState("pagi");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");

  const santriKelas = kelasAktif === "pagi" ? dataSantri : [];
  const santriDitampilkan = santriKelas.filter((santri) => {
    const cocokSearch = `${santri.nis} ${santri.nama}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const cocokStatus =
      filterStatus === "Semua Status" || santri.status === filterStatus;

    return cocokSearch && cocokStatus;
  });

  const pilihKelas = (id) => {
    setKelasAktif(id);
    setSearch("");
    setFilterStatus("Semua Status");
  };

  return (
    <LayoutPengajar
      activeMenu="Kelas Diampu"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Stack spacing={3} sx={{ width: "100%", minWidth: 0, pb: 3 }}>
        <Box>
          <Typography component="h1" variant="h5" fontWeight={800} color="#2D3F2C">
            Kelas Diampu
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Kelola kelas dan pantau santri yang kamu ampu.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            minHeight: { xs: 135, sm: 150 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: { xs: 2.5, sm: 3.5 },
            py: 3,
            borderRadius: 2,
            backgroundColor: "#30442E",
            color: "#fff",
          }}
        >
          <Box>
            <Typography
              variant="overline"
              fontWeight={700}
              letterSpacing={1.2}
              sx={{ color: "#DCE4D8" }}
            >
              TAHUN AJARAN
            </Typography>
            <Typography component="h2" variant="h5" fontWeight={800} sx={{ mt: 0.25 }}>
              2026 / 2027
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, color: "#DCE4D8" }}>
              Semester Ganjil
            </Typography>
          </Box>
          <Box
            aria-hidden="true"
            sx={{
              width: 54,
              height: 54,
              display: "grid",
              placeItems: "center",
              flex: "0 0 auto",
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,.11)",
            }}
          >
            <MenuBook />
          </Box>
        </Paper>

        <Box>
          <Typography component="h2" variant="h6" fontWeight={800} color="#2D3F2C" sx={{ mb: 1.5 }}>
            Kelas Saya
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            {kelas.map(({ id, nama, jadwal, jumlah, icon: Icon }) => {
              const selected = kelasAktif === id;

              return (
                <Card
                  key={id}
                  variant="outlined"
                  sx={{
                    minWidth: 0,
                    borderColor: selected ? "#536E4C" : "#E7EBE2",
                    borderWidth: selected ? 1.5 : 1,
                    borderRadius: 2,
                    backgroundColor: selected ? "#F5F7F1" : "#fff",
                    transition: "border-color .2s, background-color .2s",
                    "&:hover": { borderColor: "#9AAA91" },
                  }}
                >
                  <Button
                    onClick={() => pilihKelas(id)}
                    aria-pressed={selected}
                    fullWidth
                    sx={{
                      minHeight: 105,
                      justifyContent: "flex-start",
                      gap: 1.75,
                      px: { xs: 2, sm: 2.5 },
                      py: 2,
                      color: "#30442E",
                      textAlign: "left",
                      textTransform: "none",
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: "grid",
                        placeItems: "center",
                        flex: "0 0 auto",
                        borderRadius: 2,
                        backgroundColor: "#EAF0E5",
                      }}
                    >
                      <Icon />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {nama}
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mt: 0.25 }}>
                        <AccessTime sx={{ fontSize: 15, color: "#7D8778" }} />
                        <Typography variant="caption" color="text.secondary">
                          {jadwal}
                        </Typography>
                      </Stack>
                    </Box>
                    <Stack spacing={0.25} sx={{ alignItems: "center", flex: "0 0 auto" }}>
                      <Typography variant="h5" fontWeight={800} lineHeight={1.2}>
                        {jumlah}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Santri
                      </Typography>
                    </Stack>
                  </Button>
                </Card>
              );
            })}
          </Box>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            overflow: "hidden",
            borderColor: "#E8EBE4",
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            sx={{
              alignItems: { lg: "center" },
              justifyContent: "space-between",
              px: { xs: 2, sm: 2.75 },
              py: 2,
            }}
          >
            <Box>
              <Typography component="h2" variant="h6" fontWeight={800} color="#2D3F2C">
                Daftar Santri
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 13 }}>
                {kelasAktif === "pagi" ? "Kelas Pagi A" : "Kelas Sore A"}
                {" · "}
                {santriKelas.length} santri
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ width: { xs: "100%", lg: "auto" } }}
            >
              <TextField
                size="small"
                placeholder="Cari nama atau NIS..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                inputProps={{ "aria-label": "Cari nama atau NIS santri" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: 225 },
                  "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#fff" },
                  "& .MuiInputBase-input": { fontSize: 12 },
                }}
              />
              <TextField
                select
                size="small"
                label="Status"
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
                inputProps={{ "aria-label": "Filter status santri" }}
                sx={{
                  minWidth: { xs: "100%", sm: 165 },
                  "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#fff" },
                  "& .MuiInputBase-input": { fontSize: 12 },
                }}
              >
                <MenuItem value="Semua Status">Semua Status</MenuItem>
                <MenuItem value="Lengkap">Lengkap</MenuItem>
                <MenuItem value="Belum Lengkap">Belum Lengkap</MenuItem>
              </TextField>
            </Stack>
          </Stack>

          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="Daftar santri di kelas" sx={{ minWidth: 760 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#5A734E" }}>
                  {["NO", "NIS", "NAMA SANTRI", "KELAS", "NILAI", "STATUS", "AKSI"].map((judul) => (
                    <TableCell
                      key={judul}
                      sx={{
                        px: 2,
                        py: 1.5,
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0.6,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {judul}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {santriDitampilkan.length > 0 ? (
                  santriDitampilkan.map((santri, index) => {
                    const lengkap = santri.status === "Lengkap";

                    return (
                      <TableRow key={santri.nis} hover>
                        <TableCell sx={{ px: 2, color: "#7B8577", fontSize: 12 }}>
                          {index + 1}.
                        </TableCell>
                        <TableCell sx={{ px: 2, color: "#485247", fontSize: 12 }}>
                          {santri.nis}
                        </TableCell>
                        <TableCell sx={{ px: 2, color: "#30442E", fontSize: 12, fontWeight: 600 }}>
                          {santri.nama}
                        </TableCell>
                        <TableCell sx={{ px: 2, color: "#485247", fontSize: 12 }}>
                          {kelasAktif === "pagi" ? "Pagi A" : "Sore A"}
                        </TableCell>
                        <TableCell sx={{ px: 2, color: "#485247", fontSize: 12 }}>
                          {santri.nilai ?? "-"}
                        </TableCell>
                        <TableCell sx={{ px: 2 }}>
                          <Chip
                            size="small"
                            label={santri.status}
                            sx={{
                              height: 26,
                              backgroundColor: lengkap ? "#EAF3E8" : "#FFF2DF",
                              color: lengkap ? "#417546" : "#A16D20",
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ px: 2 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => onNavigate?.("Input Nilai")}
                            sx={{
                              borderColor: "#DCE5D7",
                              borderRadius: 1.5,
                              backgroundColor: "#F4F7F1",
                              color: "#30442E",
                              fontSize: 11,
                              textTransform: "none",
                              whiteSpace: "nowrap",
                              "&:hover": { borderColor: "#9AAA91", backgroundColor: "#E7EEE2" },
                            }}
                          >
                            {lengkap ? "Lihat Nilai" : "Lengkapi"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#7B8577", fontSize: 13 }}>
                      {kelasAktif === "sore"
                        ? "Belum ada santri di kelas ini."
                        : "Santri tidak ditemukan."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              px: { xs: 2, sm: 2.75 },
              py: 1.5,
              borderTop: "1px solid #EDF0E9",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Menampilkan {santriDitampilkan.length} dari {santriKelas.length} santri
            </Typography>
            <Button
              variant="outlined"
              endIcon={<ArrowForward fontSize="small" />}
              onClick={() => onNavigate?.("Input Nilai")}
              sx={{
                borderColor: "#E1E6DC",
                borderRadius: 2,
                color: "#52624E",
                fontSize: 12,
                textTransform: "none",
                "&:hover": { backgroundColor: "#F4F6F0", borderColor: "#C7D0C1" },
              }}
            >
              Input Nilai
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </LayoutPengajar>
  );
}