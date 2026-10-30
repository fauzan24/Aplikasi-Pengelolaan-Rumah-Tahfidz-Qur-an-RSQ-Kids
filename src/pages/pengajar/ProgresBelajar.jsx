import { useMemo, useState } from "react";
import {
  Search,
  ArrowForward,
} from "@mui/icons-material";
import {
  Button,
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
  Chip,
  Avatar,
  Box,
} from "@mui/material";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";
import { dataSantriProgres } from "../../data/santriProgres";
import { useProgresBelajar } from "../../context/ProgresBelajarContext";

const kategoriProgres = [
  { key: "tilawah", label: "Tilawah" },
  { key: "hafalan-quran", label: "Hafalan Qur'an" },
  { key: "hafalan-doa", label: "Do'a" },
  { key: "hafalan-hadist", label: "Hadist" },
];

export default function ProgresBelajar({
  Layout = LayoutPengajar,
  onNavigate,
  onLogout,
  onDetail,
}) {
  const { progres } = useProgresBelajar();
  const [keyword, setKeyword] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");

  const dataTampil = useMemo(() => {
    const cari = keyword.toLowerCase().trim();
    return dataSantriProgres.filter((santri) => {
      const cocokPencarian =
        santri.nama.toLowerCase().includes(cari) || santri.id.toLowerCase().includes(cari);
      const cocokKelas = filterKelas === "Semua" || santri.kelas === filterKelas;
      return cocokPencarian && cocokKelas;
    });
  }, [keyword, filterKelas]);

  return (
    <Layout onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {/* Header Title */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
            Progres Belajar Santri
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Pantau nilai tilawah serta setoran hafalan Al-Qur'an dan do'a setiap santri.
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
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
            >
              <TextField
                size="small"
                placeholder="Cari nama atau NIS santri..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                sx={{ width: { xs: "100%", sm: 280 } }}
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

          {/* Table */}
          <TableContainer>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: 60 }}>NO</TableCell>
                  <TableCell align="center">NIS</TableCell>
                  <TableCell align="center">NAMA SANTRI</TableCell>
                  <TableCell align="center">KELAS</TableCell>
                  <TableCell align="center">STATUS CAPAIAN</TableCell>
                  <TableCell align="center">AKSI</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((santri, idx) => {
                    const initials = santri.nama
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("");
                    const progresSantri = progres.filter(
                      (item) => item.santriId === santri.id
                    );

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
                            <Typography variant="body2" sx={{ fontWeight: 700, color: "#1A251D" }}>
                              {santri.nama}
                            </Typography>
                          </Stack>
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
                        <TableCell>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                              gap: 0.5,
                            }}
                          >
                            {kategoriProgres.map((kategori) => {
                              const jumlah = progresSantri.filter(
                                (item) => item.jenis === kategori.key
                              ).length;
                              const adaProgres = jumlah > 0;

                              return (
                                <Chip
                                  key={kategori.key}
                                  size="small"
                                  label={`${kategori.label}: ${adaProgres ? `${jumlah} progres` : "Belum ada progres"}`}
                                  sx={{
                                    backgroundColor: adaProgres ? "#DCFCE7" : "#F1F5F1",
                                    color: adaProgres ? "#166534" : "#6A7D6E",
                                    fontWeight: 600,
                                    fontSize: "0.68rem",
                                  }}
                                />
                              );
                            })}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            size="small"
                            endIcon={<ArrowForward sx={{ fontSize: 15 }} />}
                            onClick={() => onDetail?.(santri)}
                            sx={{
                              borderRadius: "8px",
                              borderColor: "#2E6F40",
                              color: "#2E6F40",
                              py: 0.5,
                              px: 1.75,
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              "&:hover": {
                                backgroundColor: "#2E6F40",
                                color: "#FFF",
                              },
                            }}
                          >
                            Detail Progres
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: "#8E9E90" }}>
                      Santri tidak ditemukan.
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
              Menampilkan {dataTampil.length} dari {dataSantriProgres.length} santri
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </Layout>
  );
}
