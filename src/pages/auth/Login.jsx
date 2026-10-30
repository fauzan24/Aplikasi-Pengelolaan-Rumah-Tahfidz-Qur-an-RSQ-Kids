import React, { useState } from 'react';
import {
  ArrowForward,
  Email,
  Help,
  LockOutlined,
  Person,
  Settings,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { akunDummy } from '../../data/akunDummy';

const Login = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rememberMe: false
  });
  const [loginError, setLoginError] = useState('');

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setLoginError('');
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isRegister) {
      if (
        !formData.username.trim() ||
        !formData.email.trim() ||
        !formData.password
      ) {
        alert('Semua data pendaftaran wajib diisi!');
        return;
      }

      alert('Fitur pendaftaran belum terhubung ke database.');
      return;
    }

    if (!formData.username.trim() || !formData.password) {
      setLoginError('Nama pengguna dan kata sandi wajib diisi.');
      return;
    }

    const akun = akunDummy.find(
      (data) =>
        data.username === formData.username.trim().toLowerCase() &&
        data.password === formData.password
    );

    if (!akun) {
      setLoginError('Nama pengguna atau kata sandi tidak sesuai.');
      return;
    }

    const { password: _password, ...pengguna } = akun;
    onLogin?.(pengguna);
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F8FAF8',
        color: '#1A251D'
      }}
    >
      {/* HEADER */}
      <Box
        component="header"
        sx={{
          minHeight: { xs: 58, sm: 48 },
          px: { xs: 1.5, sm: 2, md: 3.5 },
          py: { xs: 1, sm: 0 },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 2 },
          backgroundColor: '#fff',
          borderBottom: '1px solid #E5ECE4'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.75, sm: 1.25 }, minWidth: 0 }}>
          <Box
            sx={{
              width: { xs: 32, sm: 36 },
              height: { xs: 32, sm: 36 },
              flex: '0 0 auto',
              display: 'grid',
              placeItems: 'center',
              border: '1px solid #E5ECE4',
              borderRadius: 2,
              backgroundColor: '#F4F7F3'
            }}
          >
            <Settings sx={{ color: '#2E6F40', fontSize: 21 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 11, sm: 14 },
                lineHeight: 1.2,
                color: '#1A251D',
                whiteSpace: 'nowrap'
              }}
            >
              Rumah Sahabat Qur'an
            </Typography>

            <Typography
              sx={{
                mt: 0.25,
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: 8, sm: 10 },
                lineHeight: 1.2,
                color: '#5E6F61',
                whiteSpace: 'nowrap'
              }}
            >
              Menginspirasi Generasi Qur'ani di Batam
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: { xs: 0.75, sm: 1.5 },
            py: 0.65,
            borderRadius: 10,
            backgroundColor: '#F4F7F3',
            color: '#5E6F61',
            fontSize: { xs: 8, sm: 10 },
            fontWeight: 600,
            whiteSpace: { xs: 'normal', sm: 'nowrap' },
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: { xs: 112, sm: 'none' },
            flexShrink: 0
          }}
        >
          <Box component="span" sx={{ color: '#2E6F40', fontSize: 9 }}>
            ●
          </Box>
          Portal Khusus Santri &amp; Wali Santri
        </Box>
      </Box>

      {/* KONTEN LOGIN */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 1.5, sm: 0 },
          py: { xs: 2, sm: 1.5, md: 4 }
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: { xs: '100%', sm: '86%' },
            position: 'relative',
            height: { xs: 'auto', sm: 600, md: 620 },
            minHeight: { xs: 0, sm: 600, md: 620 },
            display: { xs: 'flex', sm: 'block' },
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #E5ECE4',
            borderRadius: { xs: 2.5, md: 4 },
            boxShadow: '0 14px 36px rgba(26, 37, 29, 0.09)'
          }}
        >
          {/* PANEL HIJAU */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: isRegister ? '57%' : 0,
              width: { xs: '100%', sm: '43%' },
              height: { xs: '40%', sm: '100%' },
              transition:
                'top 650ms cubic-bezier(0.22, 1, 0.36, 1), left 650ms cubic-bezier(0.22, 1, 0.36, 1)',
              '@media (max-width: 599.95px)': {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                width: '100%',
                height: 'auto',
                minHeight: 0,
                flex: '0 0 auto',
                transition: 'none'
              },
              p: { xs: 2.5, sm: 3.5, md: 4.5 },
              gap: { xs: 2.5, sm: 0 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#fff',
              backgroundColor: '#2E6F40',
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.11) 1px, transparent 1px), linear-gradient(135deg, #4E8F5E, #1D4F2C)',
              backgroundSize: '16px 16px, 100% 100%'
            }}
          >
            <Box>
              <Box
                sx={{
                  width: 'fit-content',
                  px: 1.25,
                  py: 0.55,
                  mb: 1.5,
                  borderRadius: 1,
                  backgroundColor: 'rgba(255,255,255,0.16)',
                  color: '#F8FAF8',
                  fontSize: 10,
                  fontWeight: 700
                }}
              >
                <Box
                  component="span"
                  sx={{ color: '#F59E0B', mr: 0.75 }}
                >
                  ✦
                </Box>
                DIVISI ANAK &amp; TAHFIDZ CILIK
              </Box>

              <Typography
                component="h1"
                sx={{
                  maxWidth: 360,
                  mb: { xs: 1, sm: 1.5 },
                  fontSize: { xs: 23, sm: 24, md: 31 },
                  lineHeight: 1.1,
                  fontWeight: 800,
                  color: '#fff'
                }}
              >
                Selamat Datang
                <br />
                Di Website
                <br />
                Rumah Sahabat
                <br />
                Qur'an – Kids
              </Typography>

              <Typography
                sx={{
                  maxWidth: 390,
                  color: '#E5ECE4',
                  fontSize: { xs: 11, sm: 11, md: 13 },
                  lineHeight: 1.5
                }}
              >
                {isRegister
                  ? 'Silakan lengkapi data untuk membuat akun santri.'
                  : "Siap untuk pengalaman baru? Yuk, mulai jelajahi dunia ceria belajar Al-Qur'an bersama para asatidz dan teman sebaya!"}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: { xs: 0, sm: 2 },
                pt: { xs: 1.25, sm: 1.5 },
                borderTop: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <Typography
                sx={{ mb: 1, color: '#E5ECE4', fontSize: 11 }}
              >
                {isRegister
                  ? 'Sudah memiliki akun?'
                  : 'Belum memiliki akun santri?'}
              </Typography>

              <Button
                variant="contained"
                endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                onClick={() => setIsRegister((previous) => !previous)}
                sx={{
                  minHeight: 38,
                  px: 2,
                  borderRadius: 1.5,
                  backgroundColor: '#fff',
                  color: '#1D4F2C',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#F4F7F3',
                    boxShadow: 'none'
                  }
                }}
              >
                {isRegister ? 'Masuk Sekarang' : 'Daftar Sekarang'}
              </Button>
            </Box>
          </Box>

          {/* FORM LOGIN */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: isRegister ? 0 : '40%', sm: 0 },
              left: isRegister ? 0 : '43%',
              width: { xs: '100%', sm: '57%' },
              height: { xs: '60%', sm: '100%' },
              transition:
                'top 650ms cubic-bezier(0.22, 1, 0.36, 1), left 650ms cubic-bezier(0.22, 1, 0.36, 1)',
              p: { xs: 2.5, sm: 3, md: 5 },
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff',
              '@media (max-width: 599.95px)': {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                width: '100%',
                height: 'auto',
                flex: '0 0 auto',
                transition: 'none'
              }
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: '100%' }}
            >
              <Typography
                component="h2"
                sx={{
                  mb: 0.5,
                  fontSize: { xs: 32, sm: 40 },
                  lineHeight: 1.2,
                  fontWeight: 900,
                  color: '#1A251D'
                }}
              >
                {isRegister ? 'DAFTAR' : 'MASUK'}
              </Typography>

              <Typography
                sx={{
                  mb: { xs: 2, sm: 3 },
                  color: '#5E6F61',
                  fontSize: 13,
                  lineHeight: 1.5
                }}
              >
                {isRegister
                  ? 'Lengkapi data berikut untuk membuat akun santri.'
                  : 'Silakan masukkan nama pengguna dan kata sandi Anda untuk mengakses kelas.'}
              </Typography>

              {!isRegister && (
                <Typography sx={{ mb: 1.5, color: '#5E6F61', fontSize: { xs: 9.5, sm: 10 }, lineHeight: 1.6 }}>
                  Akun demo: admin / admin123 (Admin), pengajar / pengajar123 (Pengajar), wali / wali123 (Wali Santri).
                </Typography>
              )}

              <Typography
                component="label"
                htmlFor="username"
                sx={{
                  display: 'block',
                  mb: 0.65,
                  color: '#46594A',
                  fontSize: 13,
                  fontWeight: 800
                }}
              >
                NAMA PENGGUNA
              </Typography>

              <TextField
                id="username"
                fullWidth
                name="username"
                autoComplete="username"
                placeholder="Contoh: ahmad_hafiz / nomor santri"
                value={formData.username}
                onChange={handleChange}
                size="small"
                sx={{
                  mb: 2.25,
                  '& .MuiOutlinedInput-root': {
                    height: 48,
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF'
                  },
                  '& input': { fontSize: 12, py: 1.15 }
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Person sx={{ color: '#9EADA0', fontSize: 18 }} />
                      </InputAdornment>
                    )
                  }
                }}
              />

              {isRegister && (
                <>
                  <Typography
                    component="label"
                    htmlFor="email"
                    sx={{
                      display: 'block',
                      mb: 0.65,
                      color: '#46594A',
                      fontSize: 13,
                      fontWeight: 800
                    }}
                  >
                    EMAIL
                  </Typography>

                  <TextField
                    id="email"
                    fullWidth
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    size="small"
                    sx={{
                      mb: 2.25,
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: '#FFFFFF'
                      },
                      '& input': { fontSize: 12, py: 1.15 }
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email
                              sx={{ color: '#9EADA0', fontSize: 18 }}
                            />
                          </InputAdornment>
                        )
                      }
                    }}
                  />
                </>
              )}

              <Typography
                component="label"
                htmlFor="password"
                sx={{
                  display: 'block',
                  mb: 0.65,
                  color: '#46594A',
                  fontSize: 13,
                  fontWeight: 800
                }}
              >
                KATA SANDI
              </Typography>

              <TextField
                id="password"
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                size="small"
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    height: 48,
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF'
                  },
                  '& input': { fontSize: 12, py: 1.15 }
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? 'Sembunyikan kata sandi'
                              : 'Tampilkan kata sandi'
                          }
                          onClick={() =>
                            setShowPassword((visible) => !visible)
                          }
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ fontSize: 17 }} />
                          ) : (
                            <Visibility sx={{ fontSize: 17 }} />
                          )}
                        </IconButton>

                        <LockOutlined
                          sx={{
                            ml: 0.5,
                            color: '#9EADA0',
                            fontSize: 17
                          }}
                        />
                      </InputAdornment>
                    )
                  }
                }}
              />

              {loginError && !isRegister && (
                <Typography role="alert" sx={{ mt: 0.5, color: '#DC2626', fontSize: 11 }}>
                  {loginError}
                </Typography>
              )}

              {!isRegister && <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <FormControlLabel
                  control={<Checkbox name="rememberMe" checked={formData.rememberMe} onChange={handleChange} size="small" sx={{ p: 0.5, mr: 0.25, color: '#9EADA0', '&.Mui-checked': { color: '#2E6F40' } }} />}
                  label={<Typography sx={{ color: '#5E6F61', fontSize: 11 }}>Ingat saya</Typography>}
                  sx={{ m: 0 }}
                />
                <Link href="#" underline="none" sx={{ color: '#2E6F40', fontSize: 11, fontWeight: 600 }}>
                  Lupa Password?
                </Link>
              </Box>}

              <Box sx={{ mb: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: 1, sm: 1.25 } }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    if (isRegister) setIsRegister(false);
                  }}
                  sx={{
                    minHeight: 40,
                    borderColor: '#DCE5DC',
                    borderRadius: 2,
                    color: '#5E6F61',
                    fontSize: 11,
                    fontWeight: 800,
                    '&:hover': {
                      borderColor: '#2E6F40',
                      backgroundColor: '#F8FAF8'
                    }
                  }}
                >
                  KEMBALI
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    minHeight: 40,
                    borderRadius: 2,
                    backgroundColor: '#2E6F40',
                    fontSize: 11,
                    fontWeight: 800,
                    boxShadow: '0 3px 8px rgba(46,111,64,0.18)',
                    '&:hover': { backgroundColor: '#1D4F2C' }
                  }}
                >
                  {isRegister ? 'DAFTAR' : 'MASUK'}
                </Button>
              </Box>

              {!isRegister && (
                <Box
                  sx={{
                    pt: 1.75,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5,
                    borderTop: '1px solid #E5ECE4'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                    <Help sx={{ color: '#4E8F5E', fontSize: 15 }} />
                    <Typography sx={{ color: '#5E6F61', fontSize: 10.5 }}>
                      Butuh bantuan login?
                    </Typography>
                  </Box>

                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      color: '#2E6F40',
                      fontSize: 10.5,
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Hubungi Asatidz
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Container>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          minHeight: { xs: 52, sm: 36 },
          px: { xs: 2, md: 3.5 },
          py: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          borderTop: '1px solid #E5ECE4',
          backgroundColor: '#fff',
          color: '#5E6F61'
        }}
      >
        <Typography sx={{ fontSize: 9.5, textAlign: 'center' }}>
          Portal Rumah Sahabat Qur'an • Membimbing Generasi Qur'ani Sejak Dini
        </Typography>

        <Typography sx={{ fontSize: 9.5, textAlign: { xs: 'center', sm: 'right' } }}>
          © 2024 Rumah Sahabat Qur'an Batam. Hak Cipta Dilindungi.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;