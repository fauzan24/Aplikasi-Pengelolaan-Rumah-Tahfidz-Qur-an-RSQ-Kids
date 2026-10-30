import { useMemo, useState } from "react";
import {
  AccessTime,
  ArrowForward,
  MenuBook,
  NightsStay,
  Search,
  WbSunny,
  PeopleAltOutlined,
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
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";
import { useNilai } from "../../context/NilaiContext";

const aspekPenilaian = ["bacaan", "doa", "tahfidz", "hadits", "adab"];

const daftarKelas = [
  {
    id: "Pagi",
    nama: "Kelas Pagi Tahfidz",
    jadwal: "Senin – Kamis · 08.00 – 10.00 WIB",
    ruang: "Ruang Abu Bakar",
    icon: WbSunny,
    color: "#D97706",
    bg: "#FEF3C7",
  },
  {
    id: "Sore",
    nama: "Kelas Sore Tahfidz",
    jadwal: "Senin – Kamis · 15.30 – 17.30 WIB",
    ruang: "Ruang Umar bin Khattab",
    icon: NightsStay,
    color: "#2563EB",
    bg: "#EFF6FF",
  },
];

export default function KelasDiampu({ onNavigate, onLogout }) {
  const navigate = useNavigate();
  const { santri } = useNilai();
  const [kelasAktif, setKelasAktif] = useState("Pagi");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");

  const hitungRataRata = (item) => {
    const total = aspekPenilaian.reduce((sum, aspek) => sum + Number(item[aspek] || 0), 0);
    return (total / aspekPenilaian.length).toFixed(1);
  };

  const cekStatus = (item) => {
    const lengkap = aspekPenilaian.every(
      (aspek) =>
        item[aspek] !== "" &&
        item[aspek] !== null &&
        item[aspek] !== undefined &&
        item[aspek] !== "-" &&
        Number.isFinite(Number(item[aspek]))
    );
    return lengkap ? "Lengkap" : "Belum Lengkap";
  };

  const santriKelas = useMemo(() => {
    return santri.filter((item) => item.kelas === kelasAktif);
  }, [santri, kelasAktif]);

  const santriDitampilkan = useMemo(() => {
    return santriKelas.filter((item) => {
      const cocokSearch = `${item.nis} ${item.nama}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const cocokStatus =
        filterStatus === "Semua Status" || cekStatus(item) === filterStatus;

      return cocokSearch && cocokStatus;
    });
  }, [santriKelas, search, filterStatus]);

  return (
    <LayoutPengajar onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {/* Header Title */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
            Kelas yang Diampu
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Pilih kelas untuk mengelola daftar santri, memeriksa jadwal, dan memantau status penilaian.
          </Typography>
        </Box>

        {/* 2 Interactive Class Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2.5,
          }}
        >
          {daftarKelas.map((kelas) => {
            const isSelected = kelasAktif === kelas.id;
            const jumlah = santri.filter((item) => item.kelas === kelas.id).length;
            const Icon = kelas.icon;

            return (
              <Card
                key={kelas.id}
                onClick={() => {
                  setKelasAktif(kelas.id);
                  setSearch("");
                }}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  borderRadius: "18px",
                  border: isSelected ? "2px solid #2E6F40" : "1px solid #E5ECE4",
                  backgroundColor: isSelected ? "#F4FAF5" : "#FFFFFF",
                  boxShadow: isSelected
                    ? "0 10px 25px -4px rgba(46, 111, 64, 0.12)"
                    : "0 2px 10px rgba(0,0,0,0.02)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: isSelected ? "#2E6F40" : "#A3C2A9",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Stack direction="row" spacing={2.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "14px",
                      backgroundColor: kelas.bg,
                      color: kelas.color,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.75}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E", fontSize: "1.05rem" }}>
                        {kelas.nama}
                      </Typography>
                      {isSelected && (
                        <Chip
                          label="Aktif Dipilih"
                          size="small"
                          sx={{
                            backgroundColor: "#2E6F40",
                            color: "#FFFFFF",
                            fontWeight: 700,
                            fontSize: "0.72rem",
                          }}
                        />
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#6A7D6E", mb: 0.5 }}>
                      <AccessTime sx={{ fontSize: 16 }} />
                      <Typography variant="body2" sx={{ fontSize: "0.82rem" }}>
                        {kelas.jadwal}
                      </Typography>
                    </Stack>

                    <Typography variant="caption" sx={{ color: "#8E9E90", display: "block" }}>
                      Ruangan: {kelas.ruang}
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        pt: 1.5,
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "#6A7D6E", fontWeight: 600 }}>
                        Santri Terdaftar:
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#2E6F40" }}>
                        {jumlah} Santri
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Card>
            );
          })}
        </Box>

        {/* Student Table in Active Class */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "18px",
            border: "1px solid #E5ECE4",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {/* Header & Controls */}
          <Box sx={{ p: { xs: 2.5, sm: 3 }, borderBottom: "1px solid #EEF3ED" }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ md: "center" }}
              justifyContent="space-between"
            >
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                    Daftar Santri Kelas {kelasAktif}
                  </Typography>
                  <Chip
                    label={`${santriKelas.length} Santri`}
                    size="small"
                    sx={{ backgroundColor: "#EBF5ED", color: "#2E6F40", fontWeight: 700 }}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Santri binaan kelas {kelasAktif.toLowerCase()} Rumah Sahabat Qur'an.
                </Typography>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  size="small"
                  placeholder="Cari nama atau NIS santri..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ width: { xs: "100%", sm: 240 } }}
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
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="Semua Status">Semua Status</MenuItem>
                  <MenuItem value="Lengkap">Nilai Lengkap</MenuItem>
                  <MenuItem value="Belum Lengkap">Belum Lengkap</MenuItem>
                </TextField>
              </Stack>
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
                  <TableCell>RATA-RATA</TableCell>
                  <TableCell>STATUS NILAI</TableCell>
                  <TableCell align="center">AKSI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {santriDitampilkan.length > 0 ? (
                  santriDitampilkan.map((item, idx) => {
                    const status = cekStatus(item);
                    const isOk = status === "Lengkap";
                    const avg = hitungRataRata(item);
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
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: Number(avg) >= 88 ? "#166534" : "#B45309" }}>
                            {avg}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={status}
                            sx={{
                              backgroundColor: isOk ? "#DCFCE7" : "#FEE2E2",
                              color: isOk ? "#166534" : "#991B1B",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => navigate("/pengajar/input-nilai")}
                            sx={{
                              py: 0.4,
                              px: 1.5,
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              borderRadius: "8px",
                              borderColor: isOk ? "#CBD5E1" : "#2E6F40",
                              color: isOk ? "#475569" : "#2E6F40",
                              backgroundColor: isOk ? "#F8FAFC" : "#F4FAF5",
                            }}
                          >
                            {isOk ? "Lihat Nilai" : "Input Nilai"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6, color: "#8E9E90" }}>
                      Tidak ada santri yang cocok dengan pencarian di kelas ini.
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
              Menampilkan {santriDitampilkan.length} dari {santriKelas.length} santri di Kelas {kelasAktif}
            </Typography>

            <Button
              endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
              onClick={() => navigate("/pengajar/input-nilai")}
              sx={{ color: "#2E6F40", fontWeight: 700, fontSize: "0.82rem" }}
            >
              Input Semua Nilai Kelas
            </Button>
          </Box>
        </Paper>
      </Stack>
    </LayoutPengajar>
  );
}
