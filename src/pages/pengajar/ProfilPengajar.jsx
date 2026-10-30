import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert,
  Stack,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import {
  Person,
  PhotoCamera,
  Edit,
  Save,
  Close,
  SchoolOutlined,
  MenuBook,
  VerifiedUserOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

export default function ProfilPengajar({ pengguna, onNavigate, onLogout }) {
  const [nama, setNama] = useState(
    pengguna?.nama || pengguna?.namaLengkap || "Ustadzah Aisyah"
  );
  const [nip] = useState(pengguna?.nip || "19890412-202201-2-004");
  const [noHp, setNoHp] = useState(
    pengguna?.noHp || pengguna?.telepon || "0821-7281-9921"
  );
  const [email, setEmail] = useState("aisyah.tahfidz@rsqkids.sch.id");
  const [alamat, setAlamat] = useState(
    pengguna?.alamat || "Perumahan Buana Vista Indah Blok C No. 14, Batam"
  );
  const [spesialisasi, setSpesialisasi] = useState("Tahfidz Juz 30 & Metode Tartil Iqro");

  const [foto, setFoto] = useState("");
  const [modeEdit, setModeEdit] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const [dataAwal, setDataAwal] = useState({ noHp, email, alamat, spesialisasi });

  const handleUbahFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast({ open: true, message: "Harap pilih berkas gambar yang valid.", severity: "error" });
      return;
    }
    setFoto(URL.createObjectURL(file));
    setToast({ open: true, message: "Foto profil berhasil diperbarui!", severity: "success" });
  };

  const handleEdit = () => {
    setDataAwal({ noHp, email, alamat, spesialisasi });
    setModeEdit(true);
  };

  const handleBatal = () => {
    setNoHp(dataAwal.noHp);
    setEmail(dataAwal.email);
    setAlamat(dataAwal.alamat);
    setSpesialisasi(dataAwal.spesialisasi);
    setModeEdit(false);
  };

  const handleSimpan = () => {
    if (!noHp.trim() || !alamat.trim() || !email.trim()) {
      setToast({ open: true, message: "Semua data profil wajib diisi.", severity: "error" });
      return;
    }

    try {
      const dataLama = JSON.parse(sessionStorage.getItem("pengguna") || "{}");
      sessionStorage.setItem(
        "pengguna",
        JSON.stringify({
          ...dataLama,
          nama,
          nip,
          noHp,
          email,
          alamat,
          spesialisasi,
        })
      );
      setDataAwal({ noHp, email, alamat, spesialisasi });
      setModeEdit(false);
      setToast({ open: true, message: "Data profil berhasil disimpan!", severity: "success" });
    } catch {
      setToast({ open: true, message: "Gagal menyimpan data profil.", severity: "error" });
    }
  };

  return (
    <LayoutPengajar onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1180, mx: "auto", pb: 4 }}>
        {/* Header Title */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
            Profil Pengajar
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Informasi identitas asatidz, kontak pribadi, serta penugasan kelas tahfidz.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "340px 1fr" },
            gap: 3.5,
            alignItems: "start",
          }}
        >
          {/* Left Column: Avatar & Quick Info Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3.5,
              borderRadius: "20px",
              border: "1px solid #E5ECE4",
              backgroundColor: "#FFFFFF",
              textAlign: "center",
            }}
          >
            <Box sx={{ position: "relative", width: 140, height: 140, mx: "auto", mb: 2 }}>
              <Avatar
                src={foto}
                sx={{
                  width: 140,
                  height: 140,
                  backgroundColor: "#2E6F40",
                  fontSize: "3rem",
                  fontWeight: 800,
                  border: "4px solid #E3ECE4",
                  boxShadow: "0 8px 24px rgba(46, 111, 64, 0.15)",
                }}
              >
                {!foto && "UA"}
              </Avatar>

              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  backgroundColor: "#D97706",
                  color: "#FFF",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  "&:hover": { backgroundColor: "#B45309" },
                }}
              >
                <PhotoCamera fontSize="small" />
                <input type="file" accept="image/*" hidden onChange={handleUbahFoto} />
              </IconButton>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
              {nama}
            </Typography>

            <Chip
              label="Ustadzah Pengajar Tahfidz"
              size="small"
              sx={{
                mt: 1,
                mb: 2.5,
                backgroundColor: "#EBF5ED",
                color: "#2E6F40",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1.5} sx={{ textAlign: "left" }}>
              <Box>
                <Typography variant="caption" sx={{ color: "#7B8E7D", fontWeight: 600 }}>NIP RESMI:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#1B2A1E" }}>{nip}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#7B8E7D", fontWeight: 600 }}>STATUS MENGAJAR:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#166534" }}>Aktif Mengajar (Pagi & Sore)</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#7B8E7D", fontWeight: 600 }}>JUMLAH SANTRI BINAAN:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#1B2A1E" }}>10 Santri</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Right Column: Form Information */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: "20px",
              border: "1px solid #E5ECE4",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pb: 2.5, mb: 3, borderBottom: "1px solid #EEF3ED" }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1B2A1E" }}>
                  Informasi Data Diri
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Perbarui nomor telepon, email, dan alamat untuk korespondensi wali santri.
                </Typography>
              </Box>

              {!modeEdit && (
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  sx={{
                    borderColor: "#2E6F40",
                    color: "#2E6F40",
                    fontWeight: 700,
                    borderRadius: "10px",
                  }}
                >
                  Edit Profil
                </Button>
              )}
            </Stack>

            <Stack spacing={2.5}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5E4F", display: "block", mb: 0.6 }}>
                  NAMA LENGKAP & GELAR
                </Typography>
                <TextField
                  fullWidth
                  disabled={!modeEdit}
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  size="small"
                />
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5E4F", display: "block", mb: 0.6 }}>
                    NOMOR WHATSAPP / TELEPON
                  </Typography>
                  <TextField
                    fullWidth
                    disabled={!modeEdit}
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlined sx={{ fontSize: 18, color: "#7B8E7D" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5E4F", display: "block", mb: 0.6 }}>
                    ALAMAT EMAIL RESMI
                  </Typography>
                  <TextField
                    fullWidth
                    disabled={!modeEdit}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined sx={{ fontSize: 18, color: "#7B8E7D" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5E4F", display: "block", mb: 0.6 }}>
                  ALAMAT DOMISILI (BATAM)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  disabled={!modeEdit}
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  size="small"
                />
              </Box>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#4B5E4F", display: "block", mb: 0.6 }}>
                  BIDANG KEAHLIAN / SPESIALISASI
                </Typography>
                <TextField
                  fullWidth
                  disabled={!modeEdit}
                  value={spesialisasi}
                  onChange={(e) => setSpesialisasi(e.target.value)}
                  size="small"
                />
              </Box>

              {modeEdit && (
                <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ pt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Close />}
                    onClick={handleBatal}
                    sx={{ color: "#6A7D6E", borderColor: "#CBD5CD" }}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSimpan}
                    sx={{ backgroundColor: "#2E6F40", "&:hover": { backgroundColor: "#235933" } }}
                  >
                    Simpan Perubahan
                  </Button>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Box>
      </Stack>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={toast.severity} sx={{ borderRadius: "10px" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </LayoutPengajar>
  );
}
