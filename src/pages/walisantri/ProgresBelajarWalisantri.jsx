import { useState } from "react";
import {
  AutoStoriesOutlined,
  EmojiEventsOutlined,
  MenuBook,
  VolunteerActivismOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import LayoutWalisantri from "../../components/walisantri/LayoutWalisantri";
import { useProgresBelajar } from "../../context/ProgresBelajarContext";
import { dataSantriProgres } from "../../data/santriProgres";

const kategoriProgres = [
  {
    key: "tilawah",
    label: "Lembar Nilai Tilawah Al-Qur'an",
    icon: AutoStoriesOutlined,
    warna: "#2E6F40",
    latar: "#EBF5ED",
  },
  {
    key: "hafalan-quran",
    label: "Lembar Setoran Hafalan Al-Qur'an",
    icon: MenuBook,
    warna: "#D97706",
    latar: "#FEF3C7",
  },
  {
    key: "hafalan-doa",
    label: "Lembar Setoran Hafalan Do'a",
    icon: VolunteerActivismOutlined,
    warna: "#2563EB",
    latar: "#EFF6FF",
  },
  {
    key: "hafalan-hadist",
    label: "Lembar Penilaian Hadist",
    icon: EmojiEventsOutlined,
    warna: "#7C3AED",
    latar: "#F5F3FF",
  },
];

const penilaianDoa = [
  { kode: "B.L.", label: "Belum Lancar" },
  { kode: "L", label: "Lancar" },
  { kode: "L.D.A", label: "Lancar Dengan Arti" },
];

const penilaianHadist = [
  { kode: "B.L", label: "Belum Lancar" },
  { kode: "L", label: "Lancar" },
  { kode: "L.D.A.P", label: "Lancar Dengan Arti Dan Perawi" },
];

const formatTanggal = (tanggal) =>
  tanggal
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
        new Date(`${tanggal}T00:00:00`)
      )
    : "-";

const isLembarTilawah = (jenis) =>
  jenis === "tilawah" || jenis === "hafalan-quran";

export default function ProgresBelajarWalisantri({ pengguna, onLogout }) {
  const theme = useTheme();
  const { progres } = useProgresBelajar();
  const [jenisTerpilih, setJenisTerpilih] = useState(null);
  const santriId = pengguna?.santriId || (pengguna?.id === "WALI001" ? "RSQ006" : null);
  const santri = dataSantriProgres.find((item) => item.id === santriId);
  const daftarProgres = santriId
    ? progres.filter((item) => item.santriId === santriId)
    : [];
  const aspekTerpilih = kategoriProgres.find(
    (item) => item.key === jenisTerpilih
  );
  const progresTampil = daftarProgres
    .filter((item) => item.jenis === jenisTerpilih)
    .slice()
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));

  const renderHeaderTabel = () => {
    if (isLembarTilawah(jenisTerpilih)) {
      return (
        <TableRow>
          <TableCell align="center">NO</TableCell>
          <TableCell>TANGGAL</TableCell>
          <TableCell>HAL</TableCell>
          <TableCell>SURAT</TableCell>
          <TableCell>AYAT</TableCell>
          <TableCell>NILAI</TableCell>
          <TableCell>PARAF USTADZ/USTADZAH</TableCell>
          <TableCell>CATATAN</TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow>
        <TableCell align="center">NO</TableCell>
        <TableCell>
          {jenisTerpilih === "hafalan-doa" ? "JUDUL DO'A" : "JUDUL HADIST"}
        </TableCell>
        <TableCell>TANGGAL</TableCell>
        <TableCell align="center">PENILAIAN SETORAN</TableCell>
        {jenisTerpilih === "hafalan-doa" && (
          <TableCell>PARAF USTADZ/USTADZAH</TableCell>
        )}
        <TableCell>KETERANGAN</TableCell>
      </TableRow>
    );
  };

  const renderBaris = (item, index) => {
    if (isLembarTilawah(jenisTerpilih)) {
      return (
        <TableRow key={item.id} hover>
          <TableCell align="center">{index + 1}</TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>
            {formatTanggal(item.tanggal)}
          </TableCell>
          <TableCell>{item.hal || "-"}</TableCell>
          <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>
            {item.surah || "-"}
          </TableCell>
          <TableCell>{item.ayat || "-"}</TableCell>
          <TableCell>{item.nilai || "-"}</TableCell>
          <TableCell>{item.parafPengajar || "-"}</TableCell>
          <TableCell>{item.catatan || "-"}</TableCell>
        </TableRow>
      );
    }

    const isDoa = jenisTerpilih === "hafalan-doa";
    const pilihanPenilaian = isDoa ? penilaianDoa : penilaianHadist;
    const nilaiPenilaian = isDoa ? item.penilaianDoa : item.penilaianHadist;
    const penilaian = pilihanPenilaian.find(
      (pilihan) => pilihan.kode === nilaiPenilaian
    );

    return (
      <TableRow key={item.id} hover>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>
          {isDoa ? item.namaDoa || "-" : item.namaHadist || "-"}
        </TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {formatTanggal(item.tanggal)}
        </TableCell>
        <TableCell align="center">
          {nilaiPenilaian ? (
            <Stack spacing={0.25} sx={{ alignItems: "center" }}>
              <Chip
                size="small"
                label={nilaiPenilaian}
                color={nilaiPenilaian.startsWith("B.L") ? "warning" : "success"}
              />
              <Typography variant="caption" color="text.secondary">
                {penilaian?.label || ""}
              </Typography>
            </Stack>
          ) : (
            "-"
          )}
        </TableCell>
        {isDoa && <TableCell>{item.parafPengajar || "-"}</TableCell>}
        <TableCell>{item.catatan || "-"}</TableCell>
      </TableRow>
    );
  };

  return (
    <LayoutWalisantri pengguna={pengguna} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Progres Belajar Ananda
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Lihat catatan tilawah dan setoran hafalan yang diberikan oleh pengajar.
          </Typography>
        </Box>

        {!santri ? (
          <Alert severity="info">
            Data santri belum terhubung ke akun wali ini. Silakan hubungi
            administrator untuk menghubungkan akun dengan data santri.
          </Alert>
        ) : (
          <>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: `${theme.shape.borderRadius + 8}px`,
              }}
            >
              <Stack direction="row" spacing={2.5} sx={{ alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: { xs: 60, sm: 72 },
                    height: { xs: 60, sm: 72 },
                    bgcolor: "primary.main",
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 800,
                  }}
                >
                  {santri.nama
                    .split(" ")
                    .map((bagian) => bagian[0])
                    .slice(0, 2)
                    .join("")}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {santri.nama}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", flexWrap: "wrap", mt: 0.5 }}
                  >
                    <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 600 }}>
                      NIS: {santri.id}
                    </Typography>
                    <Chip
                      label={`Kelas ${santri.kelas}`}
                      size="small"
                      color={santri.kelas === "Pagi" ? "warning" : "info"}
                      variant="outlined"
                    />
                    <Chip label="Aktif Belajar" size="small" color="success" />
                  </Stack>
                </Box>
              </Stack>
            </Paper>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Pilih Lembar Perkembangan
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(4, minmax(0, 1fr))",
                  },
                  gap: 2.5,
                }}
              >
                {kategoriProgres.map((aspek) => {
                  const Icon = aspek.icon;
                  const jumlah = daftarProgres.filter(
                    (item) => item.jenis === aspek.key
                  ).length;
                  const aktif = jenisTerpilih === aspek.key;

                  return (
                    <Card
                      key={aspek.key}
                      sx={{
                        p: 2.5,
                        borderRadius: `${theme.shape.borderRadius + 4}px`,
                        border: aktif
                          ? `2px solid ${aspek.warna}`
                          : `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: `${theme.shape.borderRadius}px`,
                              bgcolor: aspek.latar,
                              color: aspek.warna,
                              display: "grid",
                              placeItems: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Icon sx={{ fontSize: 21 }} />
                          </Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                            {aspek.label}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {jumlah} data perkembangan
                        </Typography>
                        <Button
                          fullWidth
                          variant={aktif ? "contained" : "outlined"}
                          onClick={() => setJenisTerpilih(aspek.key)}
                          sx={{
                            borderColor: aspek.warna,
                            color: aktif ? "common.white" : aspek.warna,
                            bgcolor: aktif ? aspek.warna : "transparent",
                            "&:hover": {
                              borderColor: aspek.warna,
                              bgcolor: aktif ? aspek.warna : aspek.latar,
                            },
                          }}
                        >
                          {aktif ? "Lembar Dipilih" : "Lihat Lembar"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            {aspekTerpilih && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: `${theme.shape.borderRadius + 4}px`,
                  overflow: "hidden",
                }}
              >
                <Box sx={{ p: { xs: 2.5, sm: 3 }, borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {aspekTerpilih.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Riwayat perkembangan untuk {santri.nama}.
                  </Typography>
                </Box>
                <TableContainer>
                  <Table
                    sx={{
                      minWidth: isLembarTilawah(jenisTerpilih)
                        ? 950
                        : jenisTerpilih === "hafalan-doa"
                          ? 850
                          : 720,
                    }}
                  >
                    <TableHead>{renderHeaderTabel()}</TableHead>
                    <TableBody>
                      {progresTampil.length ? (
                        progresTampil.map(renderBaris)
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={isLembarTilawah(jenisTerpilih) ? 8 : jenisTerpilih === "hafalan-doa" ? 6 : 5}
                            align="center"
                            sx={{ py: 5, color: "text.secondary" }}
                          >
                            Belum ada catatan perkembangan pada lembar ini.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}
          </>
        )}
      </Stack>
    </LayoutWalisantri>
  );
}
