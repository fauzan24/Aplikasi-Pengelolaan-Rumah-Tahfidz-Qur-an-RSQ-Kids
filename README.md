# Aplikasi Pengelolaan Rumah Tahfidz RSQ-Kids

Aplikasi web untuk pengelolaan Rumah Tahfidz RSQ-Kids, dibangun menggunakan React dan Vite.

## Menjalankan aplikasi

```sh
npm install
npm run dev
```

Untuk membuat build produksi, jalankan `npm run build`. Gunakan `npm run lint` untuk memeriksa kode.

## Routing

Navigasi menggunakan API deklaratif React Router: `BrowserRouter` berada di entry point, sedangkan `Routes` dan `Route` mendefinisikan rute bertingkat per peran. `Protected Routes` membatasi akses admin, pengajar, dan wali santri. Sidebar menggunakan `Link` dan `NavLink`; `useNavigate` menangani perpindahan setelah login/logout dan navigasi dari aksi halaman, sementara `useParams` membaca ID santri pada rute detail progres. Setelah login, pengguna diarahkan ke dashboard sesuai perannya; halaman yang tidak diizinkan dialihkan ke login atau dashboard sesuai peran.

Rute utama:

| Peran | Rute |
| --- | --- |
| Umum | `/login` |
| Admin | `/admin/dashboard`, `/admin/data-santri` |
| Pengajar | `/pengajar/dashboard`, `/pengajar/kelas-diampu`, `/pengajar/input-nilai`, `/pengajar/progres-belajar`, `/pengajar/progres-belajar/:santriId`, `/pengajar/raport-santri` |
| Wali santri | `/walisantri/dashboard`, `/walisantri/pendaftaran`, `/walisantri/progres-belajar`, `/walisantri/pembayaran-spp`, `/walisantri/raport` |

Rute menu admin yang halamannya belum tersedia tetap diarahkan ke dashboard admin. ID santri untuk rute detail progres diambil dari parameter URL, sehingga detail tetap dapat dibuka langsung menggunakan URL.

Raport admin dan pengajar dikelola per tahun ajaran dan semester, dengan arsip lama tetap tersedia saat periode diganti. Data raport disimpan bersama di `localStorage` agar halaman wali dapat menampilkan seluruh riwayat raport santri yang terhubung ke akunnya; wali hanya dapat melihat dan mencetak raport.

Halaman Input Nilai pengajar juga menyimpan nilai per tahun ajaran dan semester. Gunakan pemilih periode untuk meninjau atau memperbarui arsip sebelumnya, atau mulai periode penilaian baru tanpa mengubah nilai pada periode lain.
