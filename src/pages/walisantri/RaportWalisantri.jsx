import { useMemo, useState } from "react";
import {
  Close,
  EmojiEventsOutlined,
  MenuBook,
  PrintOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { useRaport } from "../../context/RaportContext";

const hitungRataRata = (nilai) =>
  nilai.length
    ? (
        nilai.reduce((total, item) => total + Number(item.nilai || 0), 0) /
        nilai.length
      ).toFixed(1)
    : "0.0";

export default function RaportWalisantri({ pengguna, onLogout }) {
  const theme = useTheme();
  const santriId = pengguna?.santriId || (pengguna?.id === "WALI001" ? "RSQ006" : null);
  const { raport: semuaRaport } = useRaport();
  const riwayatRaport = useMemo(
    () =>
      semuaRaport
        .filter((item) => item.nis === santriId)
        .sort((a, b) => {
          const tahun = b.tahunAjaran.localeCompare(a.tahunAjaran);
          if (tahun) return tahun;
          const urutanSemester = { Genap: 2, Ganjil: 1 };
          return (urutanSemester[b.semester] || 0) - (urutanSemester[a.semester] || 0);
        }),
    [semuaRaport, santriId]
  );
  const raport = riwayatRaport[0];
  const [dialogTerbuka, setDialogTerbuka] = useState(false);
  const [raportTerpilih, setRaportTerpilih] = useState(null);
  const rataRata = useMemo(
    () => (raport ? hitungRataRata(raport.nilai) : "0.0"),
    [raport]
  );
  const inisial = raport?.nama
    .split(" ")
    .map((bagian) => bagian[0])
    .slice(0, 2)
    .join("");

  const cetakRaport = () => window.print();

  return (
    <LayoutWalisantri pengguna={pengguna} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Raport & Laporan Belajar Ananda
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Lihat rangkuman nilai dan catatan perkembangan belajar santri.
          </Typography>
        </Box>

        {!raport ? (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: `${theme.shape.borderRadius + 4}px`,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Raport belum tersedia
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Raport untuk santri yang terhubung ke akun wali ini belum tersedia.
              Silakan hubungi pengajar atau administrator.
            </Typography>
          </Paper>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2.5,
              }}
            >
              {[
                {
                  label: "Raport Ananda",
                  nilai: riwayatRaport.length,
                  keterangan: "Tahun ajaran tersimpan",
                  icon: MenuBook,
                  color: theme.palette.primary.main,
                  bg: theme.palette.success.light,
                },
                {
                  label: "Aspek Penilaian",
                  nilai: raport.nilai.length,
                  keterangan: "Mata pelajaran",
                  icon: EmojiEventsOutlined,
                  color: theme.palette.secondary.dark,
                  bg: theme.palette.warning.light,
                },
                {
                  label: "Rata-rata Nilai",
                  nilai: rataRata,
                  keterangan: "Predikat keseluruhan",
                  icon: EmojiEventsOutlined,
                  color: theme.palette.info.main,
                  bg: theme.palette.info.light,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label} sx={{ p: 2.5 }}>
                    <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {item.label}
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            {item.nilai}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.keterangan}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: `${theme.shape.borderRadius}px`,
                            color: item.color,
                            bgcolor: item.bg,
                          }}
                        >
                          <Icon />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            <Paper
              elevation={0}
              sx={{
                borderRadius: `${theme.shape.borderRadius + 4}px`,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "primary.main", fontWeight: 700 }}>
                    {inisial}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {raport.nama}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {raport.nis} · Kelas {raport.kelas}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  startIcon={<VisibilityOutlined />}
                  onClick={() => {
                    setRaportTerpilih(raport);
                    setDialogTerbuka(true);
                  }}
                >
                  Lihat Raport Terbaru
                </Button>
              </Box>

              <TableContainer>
                <Table sx={{ minWidth: 680 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ width: 60 }}>
                        NO
                      </TableCell>
                      <TableCell>ASPEK PENILAIAN</TableCell>
                      <TableCell align="center">NILAI</TableCell>
                      <TableCell align="center">PREDIKAT</TableCell>
                      <TableCell>CATATAN PERKEMBANGAN</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {raport.nilai.map((item, index) => (
                      <TableRow key={item.pelajaran} hover>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {item.pelajaran}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>
                          {item.nilai}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={item.predikat}
                            size="small"
                            color={item.predikat === "A" ? "success" : "info"}
                          />
                        </TableCell>
                        <TableCell>{item.catatan}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} sx={{ fontWeight: 800 }}>
                        Rata-rata Nilai Keseluruhan
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, color: "primary.main" }}>
                        {rataRata}
                      </TableCell>
                      <TableCell align="center">
                        <Chip label="A" size="small" color="success" />
                      </TableCell>
                      <TableCell>
                        Tahun Ajaran {raport.tahunAjaran} · Semester {raport.semester}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                borderRadius: `${theme.shape.borderRadius + 4}px`,
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: { xs: 2.5, sm: 3 }, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Riwayat Raport
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Arsip raport ananda berdasarkan tahun ajaran dan semester.
                </Typography>
              </Box>
              <TableContainer>
                <Table sx={{ minWidth: 620 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tahun Ajaran</TableCell>
                      <TableCell>Semester</TableCell>
                      <TableCell align="center">Rata-rata</TableCell>
                      <TableCell align="center">Aspek</TableCell>
                      <TableCell align="center">Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {riwayatRaport.map((item) => (
                      <TableRow key={`${item.tahunAjaran}-${item.semester}`} hover>
                        <TableCell sx={{ fontWeight: 700 }}>{item.tahunAjaran}</TableCell>
                        <TableCell>{item.semester}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>
                          {hitungRataRata(item.nilai)}
                        </TableCell>
                        <TableCell align="center">{item.nilai.length}</TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            startIcon={<VisibilityOutlined />}
                            onClick={() => {
                              setRaportTerpilih(item);
                              setDialogTerbuka(true);
                            }}
                          >
                            Lihat
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}

        <Dialog
          open={dialogTerbuka}
          onClose={() => setDialogTerbuka(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ pr: 7 }}>
            Raport Hasil Belajar Tahfidz & Agama Islam
            <IconButton
              aria-label="Tutup raport"
              onClick={() => setDialogTerbuka(false)}
              sx={{ position: "absolute", right: 12, top: 12 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {raportTerpilih && (
              <Stack spacing={2.5}>
                <Typography variant="body2" color="text.secondary">
                  Nama Santri: <strong>{raportTerpilih.nama}</strong> · NIS:{" "}
                  <strong>{raportTerpilih.nis}</strong> · Kelas {raportTerpilih.kelas}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tahun Ajaran {raportTerpilih.tahunAjaran} ({raportTerpilih.semester}) · Pengajar: {raportTerpilih.pengajar}
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>ASPEK PENILAIAN</TableCell>
                        <TableCell align="center">NILAI</TableCell>
                        <TableCell align="center">PREDIKAT</TableCell>
                        <TableCell>CATATAN</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {raportTerpilih.nilai.map((item) => (
                        <TableRow key={item.pelajaran}>
                          <TableCell>{item.pelajaran}</TableCell>
                          <TableCell align="center">{item.nilai}</TableCell>
                          <TableCell align="center">{item.predikat}</TableCell>
                          <TableCell>{item.catatan}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="h6" sx={{ textAlign: "right", color: "primary.main" }}>
                  Rata-rata: {hitungRataRata(raportTerpilih.nilai)}
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, pt: 2, textAlign: "center" }}>
                  <Box>
                    <Typography variant="body2">Orang Tua / Wali Santri</Typography>
                    <Box sx={{ height: 56 }} />
                    <Typography variant="body2">( ................................ )</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">Pengajar Pembimbing</Typography>
                    <Box sx={{ height: 56 }} />
                    <Typography variant="body2">( {raportTerpilih.pengajar} )</Typography>
                  </Box>
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setDialogTerbuka(false)}>Tutup</Button>
            <Button
              variant="contained"
              startIcon={<PrintOutlined />}
              onClick={cetakRaport}
            >
              Cetak Raport
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </LayoutWalisantri>
  );
}
