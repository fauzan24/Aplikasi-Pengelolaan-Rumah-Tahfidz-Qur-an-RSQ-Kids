import { useState } from "react";

import {
  AccountCircleOutlined,
  ChildCareOutlined,
  CameraAltOutlined,
  LockOutlined,
  SaveOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LayoutWaliSantri from "../../components/walisantri/LayoutWalisantri";
import { dataSantriProgres } from "../../data/santriProgres";

const warnaUtama = "#2E6F40";
const KUNCI_PENDAFTARAN = "pendaftaranSantriBaru";

export default function ProfilWalisantri({
  onNavigate,
  onLogout,
  pengguna,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const [profil, setProfil] = useState({
    nama: pengguna?.nama || "Nama Wali Santri",
    email: pengguna?.email || "ahmad@gmail.com",
    telepon: pengguna?.telepon || "082534262725",
    alamat: pengguna?.alamat || "Batam, Kepulauan Riau",
    hubungan: pengguna?.hubungan || "Orang Tua",
    namaAnak: pengguna?.namaAnak || "Fauzan Najib Ali",
    kelas: pengguna?.kelas || "Kelas Pagi A",
  });

  const [password, setPassword] = useState({
    lama: "wali123",
    baru: "",
    konfirmasi: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [hasilPendaftaran] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(KUNCI_PENDAFTARAN);
      if (!tersimpan) {
        return { data: null, error: "" };
      }

      const daftarPendaftaran = JSON.parse(tersimpan);
      if (!Array.isArray(daftarPendaftaran)) {
        throw new Error("Format data pendaftaran tidak valid.");
      }

      const pendaftaranWali = daftarPendaftaran
        .filter((data) => data?.idWali === pengguna?.id)
        .slice(-1)[0];
      return { data: pendaftaranWali || null, error: "" };
    } catch (error) {
      return {
        data: null,
        error:
          error instanceof Error
            ? `Data pendaftaran gagal dibaca: ${error.message}`
            : "Data pendaftaran gagal dibaca.",
      };
    }
  });
  const pendaftaranSantri = hasilPendaftaran.data;

  const santriId =
    pengguna?.santriId || (pengguna?.id === "WALI001" ? "RSQ006" : null);
  const santriTerhubung = dataSantriProgres.find(
    (santri) => santri.id === santriId
  );
  const informasiSantri = [
    {
      label: "NAMA SANTRI",
      value:
        pendaftaranSantri?.namaSantri ||
        pengguna?.namaAnak ||
        santriTerhubung?.nama ||
        "-",
    },
    { label: "TEMPAT LAHIR", value: pendaftaranSantri?.tempatLahir || "-" },
    { label: "TANGGAL LAHIR", value: pendaftaranSantri?.tanggalLahir || "-" },
    { label: "SEKOLAH", value: pendaftaranSantri?.sekolah || "-" },
    {
      label: "KELAS",
      value:
        pendaftaranSantri?.kelas ||
        pengguna?.kelas ||
        santriTerhubung?.kelas ||
        "-",
    },
    { label: "NAMA AYAH", value: pendaftaranSantri?.namaAyah || "-" },
    { label: "NAMA IBU", value: pendaftaranSantri?.namaIbu || "-" },
    {
      label: "NOMOR HP",
      value: pendaftaranSantri?.nomorHandphone || "-",
    },
    {
      label: "ALAMAT",
      value: pendaftaranSantri?.alamatTempatTinggal || "-",
    },
    { label: "STATUS", value: pendaftaranSantri?.status || "-" },
  ];

  const tampilkanPesan = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleChangeProfil = (e) => {
    setProfil((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSimpanProfil = () => {
    if (
      !profil.nama.trim() ||
      !profil.email.trim() ||
      !profil.telepon.trim()
    ) {
      tampilkanPesan(
        "Nama, email, dan nomor telepon wajib diisi.",
        "error"
      );
      return;
    }

    setIsEdit(false);
    tampilkanPesan("Profil wali santri berhasil diperbarui!");
  };

  const handleBatalEdit = () => {
    setProfil({
      nama: pengguna?.nama || "Nama Wali Santri",
      email: pengguna?.email || "wali@rsqkids.com",
      telepon: pengguna?.telepon || "",
      alamat: pengguna?.alamat || "Batam, Kepulauan Riau",
      hubungan: pengguna?.hubungan || "Orang Tua",
      namaAnak: pengguna?.namaAnak || "Nama Santri",
      kelas: pengguna?.kelas || "Kelas Tahfidz",
    });

    setIsEdit(false);
  };

  const handleSimpanPassword = () => {
    if (!password.lama || !password.baru || !password.konfirmasi) {
      tampilkanPesan(
        "Semua kolom password wajib diisi.",
        "error"
      );
      return;
    }

    if (password.baru.length < 8) {
      tampilkanPesan(
        "Password baru minimal 8 karakter.",
        "error"
      );
      return;
    }

    if (password.baru !== password.konfirmasi) {
      tampilkanPesan(
        "Konfirmasi password baru tidak sesuai.",
        "error"
      );
      return;
    }

    setPassword({
      lama: "",
      baru: "",
      konfirmasi: "",
    });

    tampilkanPesan(
      "Validasi berhasil. Hubungkan ke backend untuk menyimpan password baru."
    );
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#FFFFFF",
      "& fieldset": {
        borderColor: "#DCE6DC",
      },
      "&:hover fieldset": {
        borderColor: "#8EAD91",
      },
      "&.Mui-focused fieldset": {
        borderColor: warnaUtama,
      },
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#526354",
    },
  };

  const LabelInput = ({ children }) => (
    <Typography
      variant="body2"
      sx={{
        fontWeight: 700,
        color: "#344638",
        mb: 1,
      }}
    >
      {children}
    </Typography>
  );

  return (
    <LayoutWaliSantri
      onNavigate={onNavigate}
      onLogout={onLogout}
      pengguna={pengguna}
    >
      <Stack
        spacing={3.5}
        sx={{
          width: "100%",
          maxWidth: 1280,
          mx: "auto",
          pb: 4,
        }}
      >
        {/* HEADER HALAMAN */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#1B2A1E",
              mb: 0.75,
            }}
          >
            Profil Wali Santri
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#6A7E6D" }}
          >
            Kelola informasi pribadi dan akun wali santri RSQ-Kids.
          </Typography>
        </Box>

        {/* PROFILE HERO */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #2E6F40 0%, #1B4527 100%)",
            color: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(30, 75, 42, 0.12)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#E8F3E9",
                  color: warnaUtama,
                  border: "4px solid rgba(255,255,255,0.35)",
                }}
              >
                <AccountCircleOutlined sx={{ fontSize: 78 }} />
              </Avatar>

              <IconButton
                size="small"
                aria-label="Ubah foto profil"
                onClick={() =>
                  tampilkanPesan(
                    "Fitur unggah foto dapat ditambahkan berikutnya."
                  )
                }
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "#F59E0B",
                  color: "#1B2A1E",
                  "&:hover": {
                    bgcolor: "#D97706",
                  },
                }}
              >
                <CameraAltOutlined fontSize="small" />
              </IconButton>
            </Box>

            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "#FBBF24",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                }}
              >
                PROFIL WALI SANTRI
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 0.5,
                  overflowWrap: "anywhere",
                }}
              >
                {profil.nama}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  overflowWrap: "anywhere",
                }}
              >
                {profil.email}
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  mt: 1.5,
                  px: 1.5,
                  py: 0.6,
                  borderRadius: "20px",
                  bgcolor: "rgba(255,255,255,0.15)",
                }}
              >
                <ChildCareOutlined sx={{ fontSize: 17 }} />

                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700 }}
                >
                  Wali Santri RSQ-Kids
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>

        {/* INFORMASI PRIBADI */}
        <Card
          elevation={0}
          sx={{
            border: "1px solid #E5ECE4",
            borderRadius: "18px",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                justifyContent: "space-between",
                mb: 3,
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: "#1B2A1E",
                  }}
                >
                  Informasi Pribadi
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#6A7E6D",
                    mt: 0.5,
                  }}
                >
                  Informasi akun dan data pribadi wali santri.
                </Typography>
              </Box>

              <Button
                variant={isEdit ? "outlined" : "contained"}
                onClick={() => {
                  if (isEdit) {
                    handleBatalEdit();
                  } else {
                    setIsEdit(true);
                  }
                }}
                sx={{
                  borderRadius: "10px",
                  px: 2.5,
                  fontWeight: 700,
                  bgcolor: isEdit ? "transparent" : warnaUtama,
                  color: isEdit ? warnaUtama : "#FFFFFF",
                  borderColor: warnaUtama,
                  alignSelf: { xs: "flex-end", sm: "center" },
                  flexShrink: 0,
                  "&:hover": {
                    bgcolor: isEdit ? "#EDF5EE" : "#245B34",
                  },
                }}
              >
                {isEdit ? "Batal" : "Edit Profil"}
              </Button>
            </Box>

            <Divider sx={{ mb: 3, borderColor: "#EEF3ED" }} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2.5,
              }}
            >
              <Box>
                <LabelInput>Nama Lengkap</LabelInput>
                <TextField
                  fullWidth
                  name="nama"
                  value={profil.nama}
                  onChange={handleChangeProfil}
                  disabled={!isEdit}
                  placeholder="Masukkan nama lengkap"
                  sx={inputSx}
                />
              </Box>

              <Box>
                <LabelInput>Alamat Email</LabelInput>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  value={profil.email}
                  onChange={handleChangeProfil}
                  disabled={!isEdit}
                  placeholder="Masukkan alamat email"
                  sx={inputSx}
                />
              </Box>

              <Box>
                <LabelInput>Nomor Telepon</LabelInput>
                <TextField
                  fullWidth
                  name="telepon"
                  value={profil.telepon}
                  onChange={handleChangeProfil}
                  disabled={!isEdit}
                  placeholder="Masukkan nomor telepon"
                  sx={inputSx}
                />
              </Box>

              <Box>
                <LabelInput>Hubungan dengan Santri</LabelInput>
                <TextField
                  fullWidth
                  name="hubungan"
                  value={profil.hubungan}
                  onChange={handleChangeProfil}
                  disabled={!isEdit}
                  placeholder="Contoh: Ayah / Ibu"
                  sx={inputSx}
                />
              </Box>

              <Box sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}>
                <LabelInput>Alamat Lengkap</LabelInput>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  name="alamat"
                  value={profil.alamat}
                  onChange={handleChangeProfil}
                  disabled={!isEdit}
                  placeholder="Masukkan alamat lengkap"
                  sx={inputSx}
                />
              </Box>
            </Box>

            {isEdit && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveOutlined />}
                  onClick={handleSimpanProfil}
                  sx={{
                    bgcolor: warnaUtama,
                    borderRadius: "10px",
                    px: 3,
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: "#245B34",
                    },
                  }}
                >
                  Simpan Perubahan
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* INFORMASI SANTRI */}
        <Card
          elevation={0}
          sx={{
            border: "1px solid #E5ECE4",
            borderRadius: "18px",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "12px",
                  bgcolor: "#EDF5EE",
                  color: warnaUtama,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <ChildCareOutlined />
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: "#1B2A1E" }}
                >
                  Informasi Santri
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#6A7E6D" }}
                >
                  Informasi anak yang terdaftar di RSQ-Kids.
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3, borderColor: "#EEF3ED" }} />

            {hasilPendaftaran.error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {hasilPendaftaran.error}
              </Alert>
            )}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2.5,
              }}
            >
              {informasiSantri.map(({ label, value }) => (
                <Box key={label}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: "#344638", mb: 0.75 }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#526354",
                      overflowWrap: "anywhere",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* KEAMANAN AKUN */}
        <Card
          elevation={0}
          sx={{
            border: "1px solid #E5ECE4",
            borderRadius: "18px",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "12px",
                  bgcolor: "#EDF5EE",
                  color: warnaUtama,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <LockOutlined />
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: "#1B2A1E" }}
                >
                  Keamanan Akun
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#6A7E6D" }}
                >
                  Perbarui password untuk menjaga keamanan akun.
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3, borderColor: "#EEF3ED" }} />

            <Stack spacing={2.5}>
              {[
                {
                  label: "Password Saat Ini",
                  key: "lama",
                  visible: showPassword,
                  toggle: () => setShowPassword((prev) => !prev),
                },
                {
                  label: "Password Baru",
                  key: "baru",
                  visible: showPasswordBaru,
                  toggle: () => setShowPasswordBaru((prev) => !prev),
                },
                {
                  label: "Konfirmasi Password Baru",
                  key: "konfirmasi",
                  visible: showKonfirmasi,
                  toggle: () => setShowKonfirmasi((prev) => !prev),
                },
              ].map((item) => (
                <Box key={item.key}>
                  <LabelInput>{item.label}</LabelInput>

                  <TextField
                    fullWidth
                    type={item.visible ? "text" : "password"}
                    value={password[item.key]}
                    onChange={(e) =>
                      setPassword((prev) => ({
                        ...prev,
                        [item.key]: e.target.value,
                      }))
                    }
                    placeholder={`Masukkan ${item.label.toLowerCase()}`}
                    sx={inputSx}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={item.toggle}
                            edge="end"
                          >
                            {item.visible ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              ))}

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  startIcon={<LockOutlined />}
                  onClick={handleSimpanPassword}
                  sx={{
                    bgcolor: warnaUtama,
                    borderRadius: "10px",
                    px: 3,
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: "#245B34",
                    },
                  }}
                >
                  Ubah Password
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* NOTIFIKASI */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() =>
          setSnackbar((prev) => ({ ...prev, open: false }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar((prev) => ({ ...prev, open: false }))
          }
          sx={{ borderRadius: "10px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LayoutWaliSantri>
  );
}