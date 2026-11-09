export const pilihanNilaiQuran = [
  { kode: "A", kesalahan: "Betul Semua", keterangan: "Lanjut ke halaman berikutnya" },
  { kode: "B+", kesalahan: "Salah 1", keterangan: "Lanjut ke halaman berikutnya" },
  { kode: "B", kesalahan: "Salah 2", keterangan: "Lanjut ke halaman berikutnya" },
  { kode: "B-", kesalahan: "Salah 3", keterangan: "Naik tetapi diulangi halaman tersebut" },
  { kode: "C+", kesalahan: "Salah 4", keterangan: "Diulang halaman tersebut" },
  { kode: "C", kesalahan: "Salah 5", keterangan: "Diulang halaman tersebut" },
  { kode: "C-", kesalahan: "Salah 6", keterangan: "Diulang halaman tersebut" },
  { kode: "D", kesalahan: "Salah >6", keterangan: "Diulang halaman tersebut" },
];

export function dapatkanPeriodeAkademik(tanggal) {
  const cocokTanggal = /^(\d{4})-(\d{2})/.exec(tanggal || "");
  const sekarang = new Date();
  const tahun = cocokTanggal ? Number(cocokTanggal[1]) : sekarang.getFullYear();
  const bulan = cocokTanggal ? Number(cocokTanggal[2]) : sekarang.getMonth() + 1;
  const tahunMulai = bulan >= 7 ? tahun : tahun - 1;

  return {
    tahunAjaran: `${tahunMulai}/${tahunMulai + 1}`,
    semester: bulan >= 7 ? "Ganjil" : "Genap",
  };
}
