import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "raport-santri-v1";

const raportWaliDemo = {
  nis: "RSQ006",
  nama: "Fauzan Najib Ali",
  kelas: "Pagi",
  pengajar: "Ustadzah Aisyah",
  tahunAjaran: "2026/2027",
  semester: "Ganjil",
  nilai: [
    { pelajaran: "Bacaan Iqro / Al-Qur'an", nilai: 90, predikat: "A", catatan: "Bacaan lancar dengan makhraj yang semakin baik." },
    { pelajaran: "Hafalan Doa Harian", nilai: 90, predikat: "A", catatan: "Hafalan doa lancar dan pelafalan jelas." },
    { pelajaran: "Hafalan Surat Pendek (Tahfidz)", nilai: 90, predikat: "A", catatan: "Setoran surah pendek baik, terus tingkatkan murojaah." },
    { pelajaran: "Hafalan Hadits Pilihan", nilai: 88, predikat: "B", catatan: "Hafalan hadits lancar, perlu mengulang arti dan perawi." },
    { pelajaran: "Adab dan Kedisiplinan", nilai: 89, predikat: "B", catatan: "Menunjukkan sikap santun dan disiplin saat belajar." },
  ],
};

const RaportContext = createContext(null);

function bacaRaportTersimpan() {
  const tersimpan = localStorage.getItem(STORAGE_KEY);
  if (!tersimpan) return [raportWaliDemo];

  const data = JSON.parse(tersimpan);
  if (!Array.isArray(data)) {
    throw new Error("Data raport tersimpan harus berupa daftar.");
  }
  return data;
}

export function RaportProvider({ children }) {
  const [raport, setRaport] = useState(bacaRaportTersimpan);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(raport));
  }, [raport]);

  useEffect(() => {
    const sinkronkanTabLain = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      const data = JSON.parse(event.newValue);
      if (!Array.isArray(data)) {
        throw new Error("Data raport dari tab lain tidak valid.");
      }
      setRaport(data);
    };

    window.addEventListener("storage", sinkronkanTabLain);
    return () => window.removeEventListener("storage", sinkronkanTabLain);
  }, []);

  const tambahkanRaport = useCallback((dataBaru) => {
    setRaport((sebelumnya) => {
      const kunciAda = new Set(
        sebelumnya.map((item) => `${item.nis}-${item.tahunAjaran}-${item.semester}`)
      );
      const dataTambahan = dataBaru.filter(
        (item) => !kunciAda.has(`${item.nis}-${item.tahunAjaran}-${item.semester}`)
      );
      return dataTambahan.length ? [...sebelumnya, ...dataTambahan] : sebelumnya;
    });
  }, []);

  const simpanRaport = useCallback((raportBaru) => {
    setRaport((sebelumnya) =>
      sebelumnya.map((item) =>
        item.nis === raportBaru.nis &&
        item.tahunAjaran === raportBaru.tahunAjaran &&
        item.semester === raportBaru.semester
          ? raportBaru
          : item
      )
    );
  }, []);

  return (
    <RaportContext.Provider value={{ raport, tambahkanRaport, simpanRaport }}>
      {children}
    </RaportContext.Provider>
  );
}

export function useRaport() {
  const context = useContext(RaportContext);
  if (!context) {
    throw new Error("useRaport harus digunakan di dalam RaportProvider");
  }
  return context;
}
