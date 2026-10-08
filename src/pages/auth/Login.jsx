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

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(isRegister ? 'Data Pendaftaran Dikirim:' : 'Data Login Dikirim:', formData);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#faf9f5',
        color: '#243021'
      }}
    >
      <Box
        component="header"
        sx={{
          minHeight: { xs: 56, sm: 48 },
          px: { xs: 2, md: 3.5 },
          py: { xs: 1, sm: 0 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          backgroundColor: '#fff',
          borderBottom: '1px solid #eeeee8'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              flex: '0 0 auto',
              display: 'grid',
              placeItems: 'center',
              border: '1px solid #e1e7db',
              borderRadius: 2,
              backgroundColor: '#f4f6f0'
            }}
          >
            <Settings sx={{ color: '#607858', fontSize: 21 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2, color: '#293528' }}>
              Rumah Sahabat Qur'an
            </Typography>
            <Typography sx={{ mt: 0.25, fontSize: 10, lineHeight: 1.2, color: '#7e8478' }}>
              Menginspirasi Generasi Qur'ani di Batam
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            py: 0.65,
            alignSelf: { xs: 'flex-start', sm: 'auto' },
            borderRadius: 10,
            backgroundColor: '#eef1e9',
            color: '#65735d',
            fontSize: 10,
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        >
          <Box component="span" sx={{ color: '#718760', fontSize: 9 }}>●</Box>
          Portal Khusus Santri &amp; Wali Santri
        </Box>
      </Box>

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 2, sm: 1.5, md: 4 }
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: { xs: '100%', sm: '86%' },
            position: 'relative',
            height: { xs: 900, sm: 560, md: 580 },
            overflow: 'hidden',
            border: '1px solid #efefe9',
            borderRadius: { xs: 3, md: 4 },
            boxShadow: '0 14px 36px rgba(48, 57, 42, 0.09)'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: isRegister ? '57%' : 0,
              width: { xs: '100%', sm: '43%' },
              height: { xs: '40%', sm: '100%' },
              transition: 'top 650ms cubic-bezier(0.22, 1, 0.36, 1), left 650ms cubic-bezier(0.22, 1, 0.36, 1)',
              '@media (max-width: 599.95px)': {
                top: isRegister ? '60%' : 0,
                left: 0
              },
              p: { xs: 3.5, sm: 3.5, md: 4.5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#fff',
              backgroundColor: '#526d4b',
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.11) 1px, transparent 1px), linear-gradient(135deg, #607b56, #405b3c)',
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
                  color: '#edf3e7',
                  fontSize: 10,
                  fontWeight: 700
                }}
              >
                <Box component="span" sx={{ color: '#f1c27b', mr: 0.75 }}>✦</Box>
                DIVISI ANAK &amp; TAHFIDZ CILIK
              </Box>

              <Typography
                component="h1"
                sx={{
                  maxWidth: 360,
                  mb: 1.5,
                  fontSize: { xs: 26, sm: 24, md: 31 },
                  lineHeight: 1.1,
                  fontWeight: 800,
                  color: '#fff'
                }}
              >
                Selamat Datang<br />
                Di Website<br />
                Rumah Sahabat<br />
                Qur'an – Kids
              </Typography>

              <Typography sx={{ maxWidth: 390, color: '#e1e9dc', fontSize: { xs: 12, sm: 11, md: 13 }, lineHeight: 1.5 }}>
                {isRegister
                  ? 'Silakan masuk untuk melanjutkan aktivitas dan menikmati layanan fitur lengkap kami.'
                  : 'Siap untuk pengalaman baru? Yuk, buat akunmu dan mulai jelajahi dunia ceria belajar Al-Qur\'an bersama para asatidz dan teman sebaya!'}
              </Typography>
            </Box>

            <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <Typography sx={{ mb: 1, color: '#dce6d7', fontSize: 11 }}>
                {isRegister ? 'Sudah memiliki akun?' : 'Belum memiliki akun santri?'}
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
                  color: '#40543a',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: '#f0f2ed', boxShadow: 'none' }
                }}
              >
                {isRegister ? 'Masuk Sekarang' : 'Daftar Sekarang'}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: { xs: isRegister ? 0 : '40%', sm: 0 },
              left: isRegister ? 0 : '43%',
              width: { xs: '100%', sm: '57%' },
              height: { xs: '60%', sm: '100%' },
              transition: 'top 650ms cubic-bezier(0.22, 1, 0.36, 1), left 650ms cubic-bezier(0.22, 1, 0.36, 1)',
              p: { xs: 3, sm: 3, md: 5 },
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff'
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
              <Typography component="h2" sx={{ mb: 0.5, fontSize: 40, lineHeight: 1.2, fontWeight: 900, color: '#20261f' }}>
                {isRegister ? 'DAFTAR' : 'MASUK'}
              </Typography>
              <Typography sx={{ mb: 3, color: '#777c73', fontSize: 13, lineHeight: 1.5 }}>
                {isRegister
                  ? 'Lengkapi data berikut untuk membuat akun santri.'
                  : 'Silakan masukkan nama pengguna dan kata sandi Anda untuk mengakses kelas.'}
              </Typography>

              <Typography component="label" htmlFor="username" sx={{ display: 'block', mb: 0.65, color: '#495344', fontSize: 13, fontWeight: 800 }}>
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
                sx={{ mb: 2.25, '& .MuiOutlinedInput-root': { height: 48, borderRadius: 2, backgroundColor: '#fdfdfc' }, '& input': { fontSize: 12, py: 1.15 } }}
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end"><Person sx={{ color: '#999b94', fontSize: 18 }} /></InputAdornment>
                  }
                }}
              />

              {isRegister && (
                <>
                  <Typography component="label" htmlFor="email" sx={{ display: 'block', mb: 0.65, color: '#495344', fontSize: 13, fontWeight: 800 }}>
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
                    sx={{ mb: 2.25, '& .MuiOutlinedInput-root': { height: 48, borderRadius: 2, backgroundColor: '#fdfdfc' }, '& input': { fontSize: 12, py: 1.15 } }}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end"><Email sx={{ color: '#999b94', fontSize: 18 }} /></InputAdornment>
                      }
                    }}
                  />
                </>
              )}

              <Typography component="label" htmlFor="password" sx={{ display: 'block', mb: 0.65, color: '#495344', fontSize: 13, fontWeight: 800 }}>
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
                sx={{ mb: 1, '& .MuiOutlinedInput-root': { height: 48, borderRadius: 2, backgroundColor: '#fdfdfc' }, '& input': { fontSize: 12, py: 1.15 } }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                          onClick={() => setShowPassword((visible) => !visible)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff sx={{ fontSize: 17 }} /> : <Visibility sx={{ fontSize: 17 }} />}
                        </IconButton>
                        <LockOutlined sx={{ ml: 0.5, color: '#999b94', fontSize: 17 }} />
                      </InputAdornment>
                    )
                  }
                }}
              />

              {!isRegister && <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <FormControlLabel
                  control={<Checkbox name="rememberMe" checked={formData.rememberMe} onChange={handleChange} size="small" sx={{ p: 0.5, mr: 0.25, color: '#bbc0b7', '&.Mui-checked': { color: '#526d4b' } }} />}
                  label={<Typography sx={{ color: '#737970', fontSize: 11 }}>Ingat saya</Typography>}
                  sx={{ m: 0 }}
                />
                <Link href="#" underline="none" sx={{ color: '#5c7053', fontSize: 11, fontWeight: 600 }}>
                  Lupa Password?
                </Link>
              </Box>}

              <Box sx={{ mb: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25 }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => isRegister && setIsRegister(false)}
                  sx={{ minHeight: 40, borderColor: '#e2e4de', borderRadius: 2, color: '#58634f', fontSize: 11, fontWeight: 800, '&:hover': { borderColor: '#526d4b', backgroundColor: '#f8f9f6' } }}
                >
                  KEMBALI
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ minHeight: 40, borderRadius: 2, backgroundColor: '#58734f', fontSize: 11, fontWeight: 800, boxShadow: '0 3px 8px rgba(43,64,37,0.18)', '&:hover': { backgroundColor: '#46613f' } }}
                >
                  {isRegister ? 'DAFTAR' : 'MASUK'}
                </Button>
              </Box>

              {!isRegister && <Box sx={{ pt: 1.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, borderTop: '1px solid #f0f1ed' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <Help sx={{ color: '#66805b', fontSize: 15 }} />
                  <Typography sx={{ color: '#777c73', fontSize: 10.5 }}>Butuh bantuan login?</Typography>
                </Box>
                <Link href="#" underline="none" sx={{ color: '#536b49', fontSize: 10.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  Hubungi Asatidz
                </Link>
              </Box>}
            </Box>
          </Box>
        </Card>
      </Container>

      <Box
        component="footer"
        sx={{
          minHeight: 36,
          px: { xs: 2, md: 3.5 },
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          borderTop: '1px solid #ecece5',
          backgroundColor: '#fff',
          color: '#84877e'
        }}
      >
        <Typography sx={{ fontSize: 9.5 }}>
          Portal Rumah Sahabat Qur'an • Membimbing Generasi Qur'ani Sejak Dini
        </Typography>
        <Typography sx={{ fontSize: 9.5, textAlign: 'right' }}>
          © 2024 Rumah Sahabat Qur'an Batam. Hak Cipta Dilindungi.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
