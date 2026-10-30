import { useState } from "react";
import {
  ArrowBack,
  Delete,
  EditOutlined,
  Add,
  AutoStoriesOutlined,
  EmojiEventsOutlined,
  MenuBook,
  VolunteerActivismOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
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
  Tooltip,
  Snackbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";
import { dataSantriProgres } from "../../data/santriProgres";
import { useProgresBelajar } from "../../context/ProgresBelajarContext";
import { usePengajar } from "../../context/PengajarContext";

const aspekCards = [
  { key: "tilawah", label: "Lembar Nilai Tilawah Al-Qur'an", icon: AutoStoriesOutlined, color: "#2E6F40", bg: "#EBF5ED" },
  { key: "hafalan-quran", label: "Lembar Setoran Hafalan Al-Qur'an", icon: MenuBook, color: "#D97706", bg: "#FEF3C7" },
  { key: "hafalan-doa", label: "Lembar Setoran Hafalan Do'a", icon: VolunteerActivismOutlined, color: "#2563EB", bg: "#EFF6FF" },
  { key: "hafalan-hadist", label: "Lembar Penilaian Hadist", icon: EmojiEventsOutlined, color: "#7C3AED", bg: "#F5F3FF" },
];

const pilihanPenilaianHadist = [
  { kode: "B.L", label: "B.L — Belum Lancar" },
  { kode: "L", label: "L — Lancar" },
  { kode: "L.D.A.P", label: "L.D.A.P — Lancar Dengan Arti Dan Perawi" },
];

const pilihanPenilaianDoa = [
  { kode: "B.L.", label: "B.L. — Belum Lancar" },
  { kode: "L", label: "L — Lancar" },
  { kode: "L.D.A", label: "L.D.A — Lancar Dengan Arti" },
];

const daftarSuratAlQuran = [
  "Al-Fatihah",
  "Al-Baqarah",
  "Ali 'Imran",
  "An-Nisa'",
  "Al-Ma'idah",
  "Al-An'am",
  "Al-A'raf",
  "Al-Anfal",
  "At-Taubah",
  "Yunus",
  "Hud",
  "Yusuf",
  "Ar-Ra'd",
  "Ibrahim",
  "Al-Hijr",
  "An-Nahl",
  "Al-Isra'",
  "Al-Kahf",
  "Maryam",
  "Ta-Ha",
  "Al-Anbiya",
  "Al-Hajj",
  "Al-Mu'minun",
  "An-Nur",
  "Al-Furqan",
  "Asy-Syu'ara",
  "An-Naml",
  "Al-Qasas",
  "Al-'Ankabut",
  "Ar-Rum",
  "Luqman",
  "As-Sajdah",
  "Al-Ahzab",
  "Saba'",
  "Fatir",
  "Ya-Sin",
  "As-Saffat",
  "Sad",
  "Az-Zumar",
  "Gafir",
  "Fussilat",
  "Asy-Syura",
  "Az-Zukhruf",
  "Ad-Dukhan",
  "Al-Jasiyah",
  "Al-Ahqaf",
  "Muhammad",
  "Al-Fath",
  "Al-Hujurat",
  "Qaf",
  "Az-Zariyat",
  "At-Tur",
  "An-Najm",
  "Al-Qamar",
  "Ar-Rahman",
  "Al-Waqi'ah",
  "Al-Hadid",
  "Al-Mujadilah",
  "Al-Hasyr",
  "Al-Mumtahanah",
  "As-Saff",
  "Al-Jumu'ah",
  "Al-Munafiqun",
  "At-Tagabun",
  "At-Talaq",
  "At-Tahrim",
  "Al-Mulk",
  "Al-Qalam",
  "Al-Haqqah",
  "Al-Ma'arij",
  "Nuh",
  "Al-Jinn",
  "Al-Muzzammil",
  "Al-Muddassir",
  "Al-Qiyamah",
  "Al-Insan",
  "Al-Mursalat",
  "An-Naba'",
  "An-Nazi'at",
  "'Abasa",
  "At-Takwir",
  "Al-Infitar",
  "Al-Mutaffifin",
  "Al-Insyiqaq",
  "Al-Buruj",
  "At-Tariq",
  "Al-A'la",
  "Al-Gasyiyah",
  "Al-Fajr",
  "Al-Balad",
  "Asy-Syams",
  "Al-Lail",
  "Ad-Duha",
  "Asy-Syarh",
  "At-Tin",
  "Al-'Alaq",
  "Al-Qadr",
  "Al-Bayyinah",
  "Az-Zalzalah",
  "Al-'Adiyat",
  "Al-Qari'ah",
  "At-Takasur",
  "Al-'Asr",
  "Al-Humazah",
  "Al-Fil",
  "Quraisy",
  "Al-Ma'un",
  "Al-Kausar",
  "Al-Kafirun",
  "An-Nasr",
  "Al-Lahab",
  "Al-Ikhlas",
  "Al-Falaq",
  "An-Nas",
];

const isLembarTilawah = (jenis) => jenis === "tilawah" || jenis === "hafalan-quran";

const tanggalHariIni = () => {
  const sekarang = new Date();
  const offset = sekarang.getTimezoneOffset() * 60000;
  return new Date(sekarang.getTime() - offset).toISOString().slice(0, 10);
};

const normalisasiNamaPengajar = (nama = "") =>
  nama.replace(/^(ustadzah|ustadz|ust\.?)\s*/i, "").trim().toLowerCase();

const buatFormKosong = (jenis) => ({
  id: crypto.randomUUID(),
  jenis,
  tanggal: tanggalHariIni(),
  hal: "",
  surah: "",
  ayat: "",
  nilai: "",
  parafPengajar: "",
  namaDoa: "",
  penilaianDoa: "B.L.",
  namaHadist: "",
  penilaianHadist: "B.L",
  nilaiKelancaran: "",
  nilaiTajwid: "",
  nilaiMakhraj: "",
  statusSetoran: "Lancar",
  catatan: "",
});

const formatTanggal = (tanggal) =>
  tanggal
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(`${tanggal}T00:00:00`))
    : "-";

export default function DetailProgresBelajar({
  Layout = LayoutPengajar,
  pengguna,
  onNavigate,
  onLogout,
}) {
  const { santriId } = useParams();
  const navigate = useNavigate();
  const { progres, setProgres } = useProgresBelajar();
  const { dataPengajar } = usePengajar();
  const santri = dataSantriProgres.find((item) => String(item.id) === String(santriId));
  const pengajarAktif = dataPengajar.find(
    (item) => normalisasiNamaPengajar(item.nama) === normalisasiNamaPengajar(pengguna?.nama)
  );
  const namaParafOtomatis = pengguna?.role === "pengajar"
    ? pengajarAktif?.nama || pengguna.nama
    : "";
  const daftarPath = pengguna?.role === "admin" ? "/admin/progres-belajar" : "/pengajar/progres-belajar";
  const [jenisTerpilih, setJenisTerpilih] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [isTambah, setIsTambah] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "" });
  const daftarProgres = progres.filter((item) => item.santriId === santriId);
  const aspekTerpilih = aspekCards.find((item) => item.key === jenisTerpilih);
  const progresTampil = daftarProgres.filter((item) => item.jenis === jenisTerpilih);

  const bukaTambah = () => {
    if (!jenisTerpilih) return;
    setIsTambah(true);
    setDataEdit({
      ...buatFormKosong(jenisTerpilih),
      parafPengajar: namaParafOtomatis,
    });
    setModalOpen(true);
  };

  const bukaEdit = (item) => {
    setIsTambah(false);
    setDataEdit({ ...item });
    setModalOpen(true);
  };

  const simpanForm = (e) => {
    e.preventDefault();
    if (!isLembarTilawah(dataEdit.jenis) && !dataEdit.catatan.trim()) return;
    const dataSimpan = {
      ...dataEdit,
      santriId,
      parafPengajar:
        isTambah && pengguna?.role === "pengajar" && (isLembarTilawah(dataEdit.jenis) || dataEdit.jenis === "hafalan-doa")
          ? namaParafOtomatis
          : dataEdit.parafPengajar,
      dibuatOleh: pengguna?.nama || pengguna?.role || "Pengguna",
    };

    if (isTambah) {
      setProgres((prev) => [dataSimpan, ...prev]);
      setToast({ open: true, message: "Data perkembangan berhasil ditambahkan!" });
    } else {
      setProgres((prev) =>
        prev.map((item) => (item.id === dataEdit.id ? dataSimpan : item))
      );
      setToast({ open: true, message: "Data perkembangan berhasil diperbarui!" });
    }
    setModalOpen(false);
  };

  const hapusProgres = (id) => {
    if (!window.confirm("Hapus catatan progres ini?")) return;
    setProgres((prev) => prev.filter((item) => item.id !== id));
    setToast({ open: true, message: "Data perkembangan berhasil dihapus." });
  };

  if (!santri) {
    return (
      <Layout onNavigate={onNavigate} onLogout={onLogout}>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Alert severity="error">Santri dengan ID {santriId} tidak ditemukan.</Alert>
          <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
            Kembali
          </Button>
        </Stack>
      </Layout>
    );
  }

  return (
    <Layout onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {/* Top Back Navigation */}
        <Box>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(daftarPath)}
            sx={{
              color: "#2E6F40",
              fontWeight: 700,
              fontSize: "0.86rem",
              borderRadius: "10px",
              mb: 1,
            }}
          >
            Kembali ke Daftar Santri
          </Button>
        </Box>

        {/* Student Profile Hero Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: "20px",
            border: "1px solid #E5ECE4",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Avatar
                sx={{
                  width: { xs: 60, sm: 72 },
                  height: { xs: 60, sm: 72 },
                  backgroundColor: "#2E6F40",
                  color: "#FFF",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 800,
                }}
              >
                {santri.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </Avatar>

              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                  {santri.nama}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#2E6F40" }}>
                    NIS: {santri.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">·</Typography>
                  <Chip
                    label={`Kelas ${santri.kelas}`}
                    size="small"
                    sx={{
                      backgroundColor: santri.kelas === "Pagi" ? "#FEF3C7" : "#EFF6FF",
                      color: santri.kelas === "Pagi" ? "#92400E" : "#1E40AF",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  />
                  <Chip
                    label="Aktif Belajar"
                    size="small"
                    sx={{ backgroundColor: "#DCFCE7", color: "#166534", fontWeight: 700, fontSize: "0.72rem" }}
                  />
                </Stack>
              </Box>
            </Stack>

          </Stack>
        </Paper>

        {/* Pilihan Lembar Perkembangan */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E", mb: 2 }}>
            Pilih Lembar Perkembangan
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, minmax(0, 1fr))",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2.5,
            }}
          >
            {aspekCards.map((aspek) => {
              const Icon = aspek.icon;
              const jumlah = daftarProgres.filter((item) => item.jenis === aspek.key).length;
              const aktif = jenisTerpilih === aspek.key;

              return (
                <Card
                  key={aspek.key}
                  sx={{
                    p: 2.5,
                    borderRadius: "16px",
                    border: aktif ? `2px solid ${aspek.color}` : "1px solid #E5ECE4",
                  }}
                >
                  <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                      <Box sx={{ width: 40, height: 40, borderRadius: "12px", backgroundColor: aspek.bg, color: aspek.color, display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <Icon sx={{ fontSize: 21 }} />
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1A251D" }}>
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
                        borderColor: aspek.color,
                        color: aktif ? "#fff" : aspek.color,
                        backgroundColor: aktif ? aspek.color : "transparent",
                        "&:hover": { borderColor: aspek.color, backgroundColor: aktif ? aspek.color : aspek.bg },
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

        {aspekTerpilih && <Paper
          elevation={0}
          sx={{
            borderRadius: "18px",
            border: "1px solid #E5ECE4",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: { xs: 2.5, sm: 3 }, borderBottom: "1px solid #EEF3ED", display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                {aspekTerpilih.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Riwayat perkembangan untuk {santri.nama}.
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<Add />} onClick={bukaTambah} sx={{ backgroundColor: "#2E6F40", "&:hover": { backgroundColor: "#245A33" } }}>
              Tambah Data
            </Button>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: isLembarTilawah(jenisTerpilih) ? 1150 : jenisTerpilih === "hafalan-doa" || jenisTerpilih === "hafalan-hadist" ? 1050 : 780 }}>
              <TableHead>
                {isLembarTilawah(jenisTerpilih) ? (
                  <TableRow>
                    <TableCell align="center" sx={{ width: 60 }}>NO</TableCell>
                    <TableCell>TGL</TableCell>
                    <TableCell>HAL</TableCell>
                    <TableCell>SURAT</TableCell>
                    <TableCell>AYAT</TableCell>
                    <TableCell>NILAI</TableCell>
                    <TableCell>PARAF USTADZ/USTADZAH</TableCell>
                    <TableCell>CATATAN</TableCell>
                    <TableCell align="center">AKSI</TableCell>
                  </TableRow>
                ) : jenisTerpilih === "hafalan-doa" || jenisTerpilih === "hafalan-hadist" ? (
                  <>
                    <TableRow>
                      <TableCell align="center" rowSpan={2} sx={{ width: 60, verticalAlign: "middle" }}>NO</TableCell>
                      <TableCell rowSpan={2} sx={{ verticalAlign: "middle" }}>
                        {jenisTerpilih === "hafalan-doa" ? "JUDUL DO'A" : "JUDUL HADIST"}
                      </TableCell>
                      <TableCell rowSpan={2} sx={{ verticalAlign: "middle" }}>TGL</TableCell>
                      <TableCell align="center" colSpan={3}>PENILAIAN SETORAN</TableCell>
                      {jenisTerpilih === "hafalan-doa" && (
                        <TableCell rowSpan={2} sx={{ verticalAlign: "middle" }}>PARAF USTADZ/USTADZAH</TableCell>
                      )}
                      <TableCell rowSpan={2} sx={{ verticalAlign: "middle" }}>KETERANGAN</TableCell>
                      <TableCell align="center" rowSpan={2} sx={{ verticalAlign: "middle" }}>AKSI</TableCell>
                    </TableRow>
                    <TableRow>
                      {(jenisTerpilih === "hafalan-doa" ? pilihanPenilaianDoa : pilihanPenilaianHadist).map((pilihan) => (
                        <TableCell key={pilihan.kode} align="center">{pilihan.kode}</TableCell>
                      ))}
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell align="center" sx={{ width: 60 }}>NO</TableCell>
                    <TableCell>TANGGAL</TableCell>
                    <TableCell>
                      {jenisTerpilih === "hafalan-doa"
                        ? "NAMA DOA"
                        : jenisTerpilih === "hafalan-hadist"
                          ? "NAMA HADIST"
                          : "SURAH & AYAT"}
                    </TableCell>
                    <TableCell>
                      {jenisTerpilih === "hafalan-hadist" ? "PENILAIAN" : "STATUS SETORAN"}
                    </TableCell>
                    <TableCell>CATATAN</TableCell>
                    <TableCell align="center">AKSI</TableCell>
                  </TableRow>
                )}
              </TableHead>

              <TableBody>
                {progresTampil.length > 0 ? progresTampil.map((item, idx) => (
                  <TableRow key={item.id} hover>
                    <TableCell align="center" sx={{ color: "#8E9E90", fontWeight: 600 }}>
                      {idx + 1}
                    </TableCell>
                    {isLembarTilawah(jenisTerpilih) ? (
                      <>
                        <TableCell sx={{ fontWeight: 600, color: "#1A251D", whiteSpace: "nowrap" }}>{formatTanggal(item.tanggal)}</TableCell>
                        <TableCell>{item.hal || "-"}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#2E6F40" }}>{item.surah || "-"}</TableCell>
                        <TableCell>{item.ayat || "-"}</TableCell>
                        <TableCell>{item.nilai || "-"}</TableCell>
                        <TableCell>{item.parafPengajar || "-"}</TableCell>
                        <TableCell sx={{ color: "#4B5E4F" }}>{item.catatan || "-"}</TableCell>
                      </>
                    ) : jenisTerpilih === "hafalan-doa" || jenisTerpilih === "hafalan-hadist" ? (
                      <>
                        <TableCell sx={{ fontWeight: 700, color: "#2E6F40" }}>
                          {jenisTerpilih === "hafalan-doa" ? item.namaDoa || "-" : item.namaHadist || "-"}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>{formatTanggal(item.tanggal)}</TableCell>
                        {(jenisTerpilih === "hafalan-doa" ? pilihanPenilaianDoa : pilihanPenilaianHadist).map((pilihan) => (
                          <TableCell
                            key={pilihan.kode}
                            align="center"
                            sx={{
                              fontWeight: 800,
                              color: (jenisTerpilih === "hafalan-doa" ? item.penilaianDoa : item.penilaianHadist) === pilihan.kode
                                ? "#2E6F40"
                                : "#CBD5CD",
                            }}
                          >
                            {(jenisTerpilih === "hafalan-doa" ? item.penilaianDoa : item.penilaianHadist) === pilihan.kode ? "✓" : "—"}
                          </TableCell>
                        ))}
                        {jenisTerpilih === "hafalan-doa" && <TableCell>{item.parafPengajar || "-"}</TableCell>}
                        <TableCell sx={{ color: "#4B5E4F" }}>{item.catatan || "-"}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell sx={{ fontWeight: 600, color: "#1A251D", whiteSpace: "nowrap" }}>{formatTanggal(item.tanggal)}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#2E6F40" }}>
                          {jenisTerpilih === "hafalan-doa"
                            ? item.namaDoa
                            : jenisTerpilih === "hafalan-hadist"
                              ? item.namaHadist
                              : `${item.surah} · Ayat ${item.ayat}`}
                        </TableCell>
                        <TableCell>
                          {jenisTerpilih === "hafalan-hadist" ? (
                            <Stack spacing={0.25}>
                              <Chip
                                size="small"
                                label={item.penilaianHadist}
                                sx={{ width: "fit-content", backgroundColor: "#F5F3FF", color: "#6D28D9", fontWeight: 800 }}
                              />
                              <Typography variant="caption" sx={{ maxWidth: 250 }}>
                                {pilihanPenilaianHadist.find((pilihan) => pilihan.kode === item.penilaianHadist)?.label.split(" — ")[1]}
                              </Typography>
                            </Stack>
                          ) : (
                            <Chip
                              size="small"
                              label={item.statusSetoran}
                              sx={{
                                backgroundColor: item.statusSetoran === "Lancar" ? "#DCFCE7" : "#FEF3C7",
                                color: item.statusSetoran === "Lancar" ? "#166534" : "#92400E",
                                fontWeight: 700,
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{ color: "#4B5E4F" }}>{item.catatan}</TableCell>
                      </>
                    )}
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title="Edit Catatan">
                          <IconButton
                            size="small"
                            onClick={() => bukaEdit(item)}
                            sx={{ color: "#2563EB", backgroundColor: "#EFF6FF" }}
                          >
                            <EditOutlined fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus Catatan">
                          <IconButton
                            size="small"
                            onClick={() => hapusProgres(item.id)}
                            sx={{ color: "#DC2626", backgroundColor: "#FEF2F2" }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={isLembarTilawah(jenisTerpilih) ? 9 : jenisTerpilih === "hafalan-doa" ? 9 : jenisTerpilih === "hafalan-hadist" ? 8 : 6} align="center" sx={{ py: 5, color: "#8E9E90" }}>
                      Belum ada data pada lembar ini. Klik "Tambah Data" untuk mengisi perkembangan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>}
      </Stack>

      {/* Modal Add / Edit Progres */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={simpanForm}>
          <DialogTitle sx={{ fontWeight: 800, color: "#1B2A1E", pt: 3, px: 3 }}>
            {isTambah ? "Tambah Data Perkembangan" : "Edit Data Perkembangan"}
          </DialogTitle>
          <DialogContent sx={{ px: 3, pt: 1 }}>
            <Stack spacing={2.25} sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                type="date"
                label={isLembarTilawah(dataEdit?.jenis) ? "Tgl" : "Tanggal"}
                value={dataEdit?.tanggal || ""}
                onChange={(e) => setDataEdit({ ...dataEdit, tanggal: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              {isLembarTilawah(dataEdit?.jenis) ? (
                <>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      required
                      fullWidth
                      label="Hal"
                      placeholder="Nomor halaman"
                      value={dataEdit?.hal || ""}
                      onChange={(e) => setDataEdit({ ...dataEdit, hal: e.target.value })}
                    />
                    <Autocomplete
                      fullWidth
                      options={
                        dataEdit?.surah && !daftarSuratAlQuran.includes(dataEdit.surah)
                          ? [dataEdit.surah, ...daftarSuratAlQuran]
                          : daftarSuratAlQuran
                      }
                      value={dataEdit?.surah || null}
                      onChange={(_, surah) => setDataEdit({ ...dataEdit, surah: surah || "" })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Surat"
                          placeholder="Cari atau pilih surat"
                        />
                      )}
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      required
                      fullWidth
                      label="Ayat"
                      placeholder="Nomor atau rentang ayat"
                      value={dataEdit?.ayat || ""}
                      onChange={(e) => setDataEdit({ ...dataEdit, ayat: e.target.value })}
                    />
                    <TextField
                      required
                      fullWidth
                      label="Nilai"
                      placeholder={dataEdit?.jenis === "tilawah" ? "Masukkan nilai tilawah" : "Masukkan nilai setoran hafalan"}
                      value={dataEdit?.nilai || ""}
                      onChange={(e) => setDataEdit({ ...dataEdit, nilai: e.target.value })}
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Autocomplete
                      fullWidth
                      options={dataPengajar.map((item) => item.nama)}
                      value={dataEdit?.parafPengajar || null}
                      disabled={pengguna?.role === "pengajar"}
                      onChange={(_, nama) => setDataEdit({ ...dataEdit, parafPengajar: nama || "" })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Paraf Ustadz/Ustadzah"
                          placeholder="Pilih dari data pengajar"
                        />
                      )}
                    />
                  </Stack>
                </>
              ) : dataEdit?.jenis === "hafalan-doa" ? (
                <TextField
                  required
                  fullWidth
                  label="Nama Do'a"
                  placeholder="Contoh: Do'a sebelum makan"
                  value={dataEdit?.namaDoa || ""}
                  onChange={(e) => setDataEdit({ ...dataEdit, namaDoa: e.target.value })}
                />
              ) : dataEdit?.jenis === "hafalan-hadist" ? (
                <TextField
                  required
                  fullWidth
                  label="Nama Hadist"
                  placeholder="Contoh: Hadist tentang menuntut ilmu"
                  value={dataEdit?.namaHadist || ""}
                  onChange={(e) => setDataEdit({ ...dataEdit, namaHadist: e.target.value })}
                />
              ) : (
                <>
                  <Autocomplete
                    fullWidth
                    options={
                      dataEdit?.surah && !daftarSuratAlQuran.includes(dataEdit.surah)
                        ? [dataEdit.surah, ...daftarSuratAlQuran]
                        : daftarSuratAlQuran
                    }
                    value={dataEdit?.surah || null}
                    onChange={(_, surah) => setDataEdit({ ...dataEdit, surah: surah || "" })}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Nama Surah"
                        placeholder="Cari atau pilih surat"
                      />
                    )}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Rentang Ayat"
                    placeholder="Contoh: 1-7"
                    value={dataEdit?.ayat || ""}
                    onChange={(e) => setDataEdit({ ...dataEdit, ayat: e.target.value })}
                  />
                </>
              )}

              {dataEdit?.jenis === "hafalan-hadist" ? (
                <TextField
                  select
                  required
                  fullWidth
                  label="Penilaian Hadist"
                  value={dataEdit?.penilaianHadist || "B.L"}
                  onChange={(e) => setDataEdit({ ...dataEdit, penilaianHadist: e.target.value })}
                >
                  {pilihanPenilaianHadist.map((pilihan) => (
                    <MenuItem key={pilihan.kode} value={pilihan.kode}>
                      {pilihan.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : dataEdit?.jenis === "hafalan-doa" ? (
                <>
                  <TextField
                  select
                  required
                  fullWidth
                  label="Penilaian Setoran Do'a"
                  value={dataEdit?.penilaianDoa || "B.L."}
                  onChange={(e) => setDataEdit({ ...dataEdit, penilaianDoa: e.target.value })}
                  >
                  {pilihanPenilaianDoa.map((pilihan) => (
                    <MenuItem key={pilihan.kode} value={pilihan.kode}>
                      {pilihan.label}
                    </MenuItem>
                  ))}
                  </TextField>
                  <Autocomplete
                  fullWidth
                  options={dataPengajar.map((item) => item.nama)}
                  value={dataEdit?.parafPengajar || null}
                  disabled={pengguna?.role === "pengajar"}
                  onChange={(_, nama) => setDataEdit({ ...dataEdit, parafPengajar: nama || "" })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Paraf Ustadz/Ustadzah"
                      placeholder="Pilih dari data pengajar"
                    />
                  )}
                  />
                </>
              ) : dataEdit?.jenis !== "tilawah" ? (
                <TextField
                  select
                  required
                  fullWidth
                  label="Status Setoran"
                  value={dataEdit?.statusSetoran || "Lancar"}
                  onChange={(e) => setDataEdit({ ...dataEdit, statusSetoran: e.target.value })}
                >
                  <MenuItem value="Lancar">Lancar</MenuItem>
                  <MenuItem value="Perlu Murojaah">Perlu Murojaah</MenuItem>
                </TextField>
              ) : null}

              {dataEdit?.jenis === "hafalan-hadist" && (
                <Alert severity="info">
                  B.L = Belum Lancar · L = Lancar · L.D.A.P = Lancar Dengan Arti Dan Perawi
                </Alert>
              )}
              {dataEdit?.jenis === "hafalan-doa" && (
                <Alert severity="info">
                  B.L. = Belum Lancar · L = Lancar · L.D.A = Lancar Dengan Arti
                </Alert>
              )}

              <TextField
                required={!isLembarTilawah(dataEdit?.jenis)}
                fullWidth
                multiline
                rows={3}
                label={dataEdit?.jenis === "hafalan-doa" ? "Keterangan" : "Catatan Perkembangan"}
                placeholder={dataEdit?.jenis === "hafalan-doa" ? "Tambahkan keterangan setoran do'a" : "Tambahkan catatan perkembangan santri"}
                value={dataEdit?.catatan || ""}
                onChange={(e) => setDataEdit({ ...dataEdit, catatan: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button onClick={() => setModalOpen(false)} sx={{ color: "#6A7D6E" }}>
              Batal
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#2E6F40", "&:hover": { backgroundColor: "#245A33" } }}
            >
              Simpan Data
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ borderRadius: "10px" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
}
