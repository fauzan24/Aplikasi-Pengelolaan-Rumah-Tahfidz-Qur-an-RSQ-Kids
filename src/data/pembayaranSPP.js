export const nominalSPP = 50000;

export const bulanIndonesia = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const dataSantriSPP = [
  { id: "RSQ001", nama: "Jauza Askana", bulanBelumDibayar: [4, 8] },
  { id: "RSQ002", nama: "Dinda Azzahra", bulanBelumDibayar: [2, 5, 10] },
  { id: "RSQ004", nama: "Dede Ridho", bulanBelumDibayar: [6] },
  { id: "RSQ005", nama: "Kalila Haura", bulanBelumDibayar: [1, 10] },
  { id: "RSQ006", nama: "Fauzan", bulanBelumDibayar: [3, 9] },
];

export const formatRupiah = (nilai) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);

export function buatStatusPembayaran(
  santri,
  pembayaran,
  tahun,
  bulanSekarang
) {
  return bulanIndonesia.map((namaBulan, index) => {
    const bulan = index + 1;
    const sudahDibayar =
      pembayaran[santri.id]?.[bulan] ??
      (bulan <= bulanSekarang && !santri.bulanBelumDibayar.includes(bulan));

    let status;
    if (bulan > bulanSekarang) {
      status = "Belum Jatuh Tempo";
    } else if (sudahDibayar) {
      status = "Lunas";
    } else if (bulan === bulanSekarang) {
      status = "Belum Lunas";
    } else {
      status = "Menunggak";
    }

    return { bulan, namaBulan, tahun, status };
  });
}
