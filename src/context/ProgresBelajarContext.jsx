import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "progres-belajar-santri-v1";
const WALI_DEMO_SEED_KEY = "progres-belajar-wali-demo-seed-v1";

const dataDummyWali = [
  {
    id: "RSQ006-tilawah-demo-1",
    santriId: "RSQ006",
    jenis: "tilawah",
    tanggal: "2026-10-27",
    hal: "1",
    surah: "Al-Fatihah",
    ayat: "1-7",
    nilai: "90",
    parafPengajar: "Ust. Aisyah",
    nilaiKelancaran: 90,
    nilaiTajwid: 88,
    nilaiMakhraj: 92,
    catatan: "Bacaan lancar, tajwid dan makhraj sudah baik.",
    dibuatOleh: "Pengajar",
  },
  {
    id: "RSQ006-hafalan-quran-demo-1",
    santriId: "RSQ006",
    jenis: "hafalan-quran",
    tanggal: "2026-10-28",
    hal: "2",
    surah: "An-Nas",
    ayat: "1-6",
    nilai: "Lancar",
    parafPengajar: "Ust. Aisyah",
    statusSetoran: "Lancar",
    catatan: "Setoran lancar. Tetap rutin murojaah di rumah.",
    dibuatOleh: "Pengajar",
  },
  {
    id: "RSQ006-hafalan-doa-demo-1",
    santriId: "RSQ006",
    jenis: "hafalan-doa",
    tanggal: "2026-10-29",
    namaDoa: "Doa sebelum makan",
    penilaianDoa: "L.D.A",
    parafPengajar: "Ust. Aisyah",
    statusSetoran: "Lancar",
    catatan: "Hafalan lancar dan sudah dapat menyebutkan artinya.",
    dibuatOleh: "Pengajar",
  },
  {
    id: "RSQ006-hafalan-hadist-demo-1",
    santriId: "RSQ006",
    jenis: "hafalan-hadist",
    tanggal: "2026-10-30",
    namaHadist: "Hadist kebersihan",
    penilaianHadist: "L",
    statusSetoran: "Lancar",
    catatan: "Lafal hadist sudah lancar. Perlu mengulang arti dan perawi.",
    dibuatOleh: "Pengajar",
  },
];

const dataProgresAwal = [
  {
    id: "RSQ001-tilawah-1",
    santriId: "RSQ001",
    jenis: "tilawah",
    tanggal: "2026-04-05",
    hal: "1",
    surah: "Al-Fatihah",
    ayat: "1-7",
    nilai: "90",
    parafPengajar: "Ust. Aisyah",
    nilaiKelancaran: 90,
    nilaiTajwid: 88,
    nilaiMakhraj: 89,
    catatan: "Bacaan lancar dan makhraj semakin jelas.",
    dibuatOleh: "Pengajar",
  },
  {
    id: "RSQ001-hafalan-quran-1",
    santriId: "RSQ001",
    jenis: "hafalan-quran",
    tanggal: "2026-04-13",
    hal: "2",
    surah: "An-Nas",
    ayat: "1-6",
    nilai: "Lancar",
    parafPengajar: "Ust. Aisyah",
    statusSetoran: "Lancar",
    catatan: "Setoran lancar, lanjutkan murojaah mandiri.",
    dibuatOleh: "Pengajar",
  },
  {
    id: "RSQ001-hafalan-doa-1",
    santriId: "RSQ001",
    jenis: "hafalan-doa",
    tanggal: "2026-04-15",
    namaDoa: "Doa sebelum makan",
    penilaianDoa: "L",
    parafPengajar: "Ust. Aisyah",
    statusSetoran: "Lancar",
    catatan: "Hafalan sudah lancar dan pelafalan jelas.",
    dibuatOleh: "Pengajar",
  },
  ...dataDummyWali,
];

const ProgresBelajarContext = createContext(null);

function normalisasiProgres(data) {
  return data.map((item) => {
    const dataBersih = { ...item };
    delete dataBersih.parafWali;
    if (item.jenis === "hafalan-doa") {
      return {
        ...dataBersih,
        penilaianDoa:
          item.penilaianDoa ||
          (item.statusSetoran === "Lancar" ? "L" : "B.L."),
        parafPengajar: item.parafPengajar ?? "",
      };
    }
    if (item.jenis !== "tilawah" && item.jenis !== "hafalan-quran") return dataBersih;
    return {
      ...dataBersih,
      hal: item.hal ?? "",
      nilai: item.nilai ?? item.statusSetoran ?? "",
      parafPengajar: item.parafPengajar ?? "",
    };
  });
}

function bacaDataTersimpan() {
  const dataTersimpan = localStorage.getItem(STORAGE_KEY);
  if (!dataTersimpan) {
    localStorage.setItem(WALI_DEMO_SEED_KEY, "true");
    return normalisasiProgres(dataProgresAwal);
  }

  const data = JSON.parse(dataTersimpan);
  if (!Array.isArray(data)) {
    throw new Error("Data progres belajar tersimpan harus berupa daftar.");
  }

  if (localStorage.getItem(WALI_DEMO_SEED_KEY) === "true") {
    return normalisasiProgres(data);
  }

  const idTersimpan = new Set(data.map((item) => item.id));
  const dataDenganDummyWali = [
    ...data,
    ...dataDummyWali.filter((item) => !idTersimpan.has(item.id)),
  ];
  localStorage.setItem(WALI_DEMO_SEED_KEY, "true");
  return normalisasiProgres(dataDenganDummyWali);
}

export function ProgresBelajarProvider({ children }) {
  const [progres, setProgres] = useState(bacaDataTersimpan);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progres));
  }, [progres]);

  useEffect(() => {
    const sinkronkanTabLain = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      const data = JSON.parse(event.newValue);
      if (!Array.isArray(data)) {
        throw new Error("Data progres belajar dari tab lain tidak valid.");
      }
      setProgres(data);
    };

    window.addEventListener("storage", sinkronkanTabLain);
    return () => window.removeEventListener("storage", sinkronkanTabLain);
  }, []);

  return (
    <ProgresBelajarContext.Provider value={{ progres, setProgres }}>
      {children}
    </ProgresBelajarContext.Provider>
  );
}

export function useProgresBelajar() {
  const context = useContext(ProgresBelajarContext);
  if (!context) {
    throw new Error("useProgresBelajar harus digunakan di dalam ProgresBelajarProvider");
  }
  return context;
}
