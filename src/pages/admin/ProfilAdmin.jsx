
import { useState } from "react";

import {
  AccountCircleOutlined,
  AdminPanelSettingsOutlined,
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

import LayoutAdmin from "../../components/admin/LayoutAdmin";

const warnaUtama = "#2E6F40";

export default function ProfilAdmin({
  onNavigate,
  onLogout,
  pengguna,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const [profil, setProfil] = useState({
    nama: pengguna?.nama || "Administrator RSQ-Kids",
    email: pengguna?.email || "admin@rsqkids.com",
    telepon: pengguna?.telepon || "081234567890",
    jabatan: "Administrator",
  });

  const [password, setPassword] = useState({
    lama: "admin123",
    baru: "",
    konfirmasi: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    tampilkanPesan("Profil berhasil diperbarui!");
  };

  const handleBatalEdit = () => {
    setProfil({
      nama: pengguna?.nama || "Administrator RSQ-Kids",
      email: pengguna?.email || "admin@rsqkids.com",
      telepon: pengguna?.telepon || "081234567890",
      jabatan: "Administrator",
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
    <LayoutAdmin
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
            Profil Admin
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#6A7E6D" }}
          >
            Kelola informasi akun dan keamanan administrator RSQ-Kids.
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
            position: "relative",
            overflow: "hidden",
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
                PROFIL ADMINISTRATOR
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
                <AdminPanelSettingsOutlined sx={{ fontSize: 17 }} />

                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700 }}
                >
                  Administrator
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

            {/* JUDUL DAN TOMBOL EDIT */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                justifyContent: "space-between",
                width: "100%",
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
                  Informasi akun administrator Rumah Sahabat Qur'an.
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

            {/* FORM INFORMASI PRIBADI */}
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
                <LabelInput>Jabatan</LabelInput>

                <TextField
                  fullWidth
                  name="jabatan"
                  value={profil.jabatan}
                  disabled
                  sx={inputSx}
                />
              </Box>
            </Box>

            {/* TOMBOL SIMPAN */}
            {isEdit && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 3,
                  gap: 1,
                }}
              >
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

        {/* KEAMANAN AKUN */}
        <Card
          elevation={0}
          sx={{
            border: "1px solid #E5ECE4",
            borderRadius: "18px",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 1 }}
            >
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
                  sx={{
                    fontWeight: 800,
                    color: "#1B2A1E",
                  }}
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
              {/* PASSWORD SAAT INI */}
              <Box>
                <LabelInput>Password Saat Ini</LabelInput>

                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={password.lama}
                  onChange={(e) =>
                    setPassword((prev) => ({
                      ...prev,
                      lama: e.target.value,
                    }))
                  }
                  placeholder="Masukkan password saat ini"
                  sx={inputSx}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword((prev) => !prev)
                            }
                            edge="end"
                            aria-label="Tampilkan password saat ini"
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* PASSWORD BARU DAN KONFIRMASI */}
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
                  <LabelInput>Password Baru</LabelInput>

                  <TextField
                    fullWidth
                    type={showPasswordBaru ? "text" : "password"}
                    value={password.baru}
                    onChange={(e) =>
                      setPassword((prev) => ({
                        ...prev,
                        baru: e.target.value,
                      }))
                    }
                    placeholder="Masukkan password baru"
                    sx={inputSx}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPasswordBaru((prev) => !prev)
                              }
                              edge="end"
                              aria-label="Tampilkan password baru"
                            >
                              {showPasswordBaru ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>

                <Box>
                  <LabelInput>Konfirmasi Password Baru</LabelInput>

                  <TextField
                    fullWidth
                    type={showKonfirmasi ? "text" : "password"}
                    value={password.konfirmasi}
                    onChange={(e) =>
                      setPassword((prev) => ({
                        ...prev,
                        konfirmasi: e.target.value,
                      }))
                    }
                    placeholder="Ulangi password baru"
                    sx={inputSx}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowKonfirmasi((prev) => !prev)
                              }
                              edge="end"
                              aria-label="Tampilkan konfirmasi password"
                            >
                              {showKonfirmasi ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
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
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
          sx={{ borderRadius: "10px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LayoutAdmin>
  );
}