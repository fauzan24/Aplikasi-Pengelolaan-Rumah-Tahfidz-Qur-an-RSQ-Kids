
import { useState } from "react";
import {
  Sun,
  Moon,
  Clock,
  BookOpen,
  Search,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

const dataSantri = [
  { nis: "RSQ001", nama: "Jauza Askana", nilai: 89, status: "Belum Lengkap" },
  { nis: "RSQ002", nama: "Dinda Azzahra", nilai: 90, status: "Lengkap" },
  { nis: "RSQ003", nama: "Raffa Fadilla", nilai: null, status: "Belum Lengkap" },
  { nis: "RSQ004", nama: "Dede Ridho", nilai: 88, status: "Lengkap" },
  { nis: "RSQ005", nama: "Kalila Haura", nilai: 92, status: "Lengkap" },
  { nis: "RSQ006", nama: "Aisyah Putri", nilai: null, status: "Belum Lengkap" },
  { nis: "RSQ007", nama: "Muhammad Fikri", nilai: 87, status: "Belum Lengkap" },
];

export default function KelasDiampu({ onNavigate, onLogout }) {
  const [kelasAktif, setKelasAktif] = useState("pagi");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");

  const santriKelas = kelasAktif === "pagi" ? dataSantri : [];

  const santriDitampilkan = santriKelas.filter((santri) => {
    const cocokSearch = `${santri.nis} ${santri.nama}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const cocokStatus =
      filterStatus === "Semua Status" ||
      santri.status === filterStatus;

    return cocokSearch && cocokStatus;
  });

  return (
    <LayoutPengajar
      activeMenu="Kelas Diampu"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="kd-page">
        <style>{`
          .kd-page {
            width: 100%;
            min-width: 0;
            padding: 0 0 24px;
            color: #2d3f2c;
            font-family: inherit;
            box-sizing: border-box;
          }

          .kd-page *,
          .kd-page *::before,
          .kd-page *::after {
            box-sizing: border-box;
          }

          .kd-heading {
            margin: 0 0 26px;
          }

          .kd-eyebrow {
            margin: 0 0 8px;
            color: #7a8775;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
          }

          .kd-heading h1 {
            margin: 0 0 8px;
            color: #2d3f2c;
            font-size: 27px;
            line-height: 1.35;
            font-weight: 700;
          }

          .kd-description {
            margin: 0;
            color: #7b8578;
            font-size: 14px;
            line-height: 1.6;
          }

          .kd-year {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            width: 100%;
            min-height: 150px;
            padding: 24px 28px;
            margin: 0 0 28px;
            border-radius: 15px;
            background: #30442e;
            color: #fff;
          }

          .kd-year-label {
            margin: 0 0 9px;
            color: #dce4d8;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.2px;
          }

          .kd-year h2 {
            margin: 0 0 8px;
            color: #fff;
            font-size: 25px;
            line-height: 1.3;
          }

          .kd-year-semester {
            margin: 0;
            color: #dce4d8;
            font-size: 13px;
          }

          .kd-year-icon {
            display: grid;
            place-items: center;
            width: 54px;
            height: 54px;
            flex-shrink: 0;
            border-radius: 14px;
            background: #ffffff1c;
          }

          .kd-section-title {
            margin: 0 0 16px;
            color: #2d3f2c;
            font-size: 18px;
            font-weight: 700;
          }

          .kd-class-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            margin-bottom: 26px;
          }

          .kd-class-card {
            display: flex;
            align-items: center;
            gap: 15px;
            min-width: 0;
            min-height: 105px;
            padding: 18px 20px;
            border: 1px solid #e7ebe2;
            border-radius: 14px;
            background: #fff;
            color: #30442e;
            text-align: left;
            cursor: pointer;
            transition: border-color .2s, background .2s;
          }

          .kd-class-card:hover {
            border-color: #9aaa91;
          }

          .kd-class-card.selected {
            border: 1.5px solid #536e4c;
            background: #f5f7f1;
          }

          .kd-class-icon {
            display: grid;
            place-items: center;
            width: 48px;
            height: 48px;
            flex-shrink: 0;
            border-radius: 13px;
            background: #eaf0e5;
            color: #30442e;
          }

          .kd-class-info {
            flex: 1;
            min-width: 0;
          }

          .kd-class-info h3 {
            margin: 0 0 7px;
            font-size: 16px;
            font-weight: 700;
          }

          .kd-class-info p {
            display: flex;
            align-items: center;
            gap: 5px;
            margin: 0;
            color: #7d8778;
            font-size: 12px;
          }

          .kd-class-count {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3px;
            min-width: 45px;
          }

          .kd-class-count strong {
            font-size: 24px;
            line-height: 1.2;
          }

          .kd-class-count span {
            color: #7d8778;
            font-size: 11px;
          }

          .kd-table-card {
            width: 100%;
            overflow: hidden;
            border: 1px solid #e8ebe4;
            border-radius: 14px;
            background: #fff;
          }

          .kd-table-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            flex-wrap: wrap;
            padding: 21px 22px;
          }

          .kd-table-header h2 {
            margin: 0 0 7px;
            color: #2d3f2c;
            font-size: 19px;
            font-weight: 700;
          }

          .kd-table-header p {
            margin: 0;
            color: #7d8778;
            font-size: 13px;
          }

          .kd-table-tools {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .kd-search {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 225px;
            min-height: 40px;
            padding: 10px 12px;
            border: 1px solid #e1e6dc;
            border-radius: 9px;
            color: #7d8778;
          }

          .kd-search input {
            width: 100%;
            min-width: 0;
            padding: 0;
            border: none;
            outline: none;
            background: transparent;
            color: #30442e;
            font: inherit;
            font-size: 12px;
          }

          .kd-filter {
            display: flex;
            align-items: center;
            gap: 8px;
            min-height: 40px;
            padding: 9px 12px;
            border: 1px solid #e1e6dc;
            border-radius: 9px;
            background: #fff;
            color: #66735f;
          }

          .kd-filter select {
            appearance: none;
            -webkit-appearance: none;
            max-width: 145px;
            border: none;
            outline: none;
            background: transparent;
            color: #455441;
            font: inherit;
            font-size: 12px;
            cursor: pointer;
          }

          .kd-table-wrap {
            width: 100%;
            overflow-x: auto;
          }

          .kd-table {
            width: 100%;
            border-collapse: collapse;
            white-space: nowrap;
          }

          .kd-table th {
            padding: 13px 16px;
            background: #5a734e;
            color: #fff;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: .6px;
            text-align: left;
          }

          .kd-table td {
            padding: 14px 16px;
            border-bottom: 1px solid #edf0e9;
            color: #485247;
            font-size: 12px;
          }

          .kd-table tbody tr:last-child td {
            border-bottom: none;
          }

          .kd-table tbody tr:hover {
            background: #fafbf8;
          }

          .kd-name {
            color: #30442e !important;
            font-weight: 600;
          }

          .kd-status {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 9px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 600;
          }

          .kd-status::before {
            content: "";
            width: 6px;
            height: 6px;
            flex-shrink: 0;
            border-radius: 50%;
            background: currentColor;
          }

          .kd-status.complete {
            background: #eaf3e8;
            color: #417546;
          }

          .kd-status.incomplete {
            background: #fff2df;
            color: #a16d20;
          }

          .kd-action {
            padding: 7px 10px;
            border: 1px solid #dce5d7;
            border-radius: 7px;
            background: #f4f7f1;
            color: #30442e;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          }

          .kd-action:hover {
            background: #e7eee2;
          }

          .kd-empty {
            padding: 35px 16px !important;
            text-align: center;
            color: #7b8577 !important;
          }

          .kd-table-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 15px 22px;
            border-top: 1px solid #edf0e9;
            color: #7b8577;
            font-size: 12px;
          }

          .kd-next {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 8px 11px;
            border: 1px solid #e1e6dc;
            border-radius: 8px;
            background: #fff;
            color: #52624e;
            font-size: 12px;
            cursor: pointer;
          }

          .kd-next:hover {
            background: #f4f6f0;
          }

          @media (max-width: 1050px) {
            .kd-table-tools {
              width: 100%;
            }

            .kd-search {
              flex: 1;
              width: auto;
            }
          }

          @media (max-width: 700px) {
            .kd-heading {
              margin-bottom: 20px;
            }

            .kd-heading h1 {
              font-size: 23px;
            }

            .kd-year {
              min-height: 125px;
              padding: 20px;
              margin-bottom: 24px;
            }

            .kd-year h2 {
              font-size: 22px;
            }

            .kd-class-grid {
              grid-template-columns: 1fr;
            }

            .kd-table-header {
              padding: 18px;
            }

            .kd-table-tools {
              align-items: stretch;
              flex-direction: column;
              width: 100%;
            }

            .kd-search {
              width: 100%;
              flex: auto;
            }

            .kd-filter {
              justify-content: space-between;
            }

            .kd-table-footer {
              padding: 14px 16px;
            }
          }
        `}</style>

        <div className="kd-heading">
          <h1>Kelas Diampu</h1>
          <p className="kd-description">
            Kelola kelas dan pantau santri yang kamu ampu.
          </p>
        </div>

        <section className="kd-year">
          <div>
            <p className="kd-year-label">TAHUN AJARAN</p>
            <h2>2026 / 2027</h2>
            <p className="kd-year-semester">Semester Ganjil</p>
          </div>

          <div className="kd-year-icon">
            <BookOpen size={25} />
          </div>
        </section>

        <h2 className="kd-section-title">Kelas Saya</h2>

        <div className="kd-class-grid">
          <button
            type="button"
            className={`kd-class-card ${
              kelasAktif === "pagi" ? "selected" : ""
            }`}
            onClick={() => {
              setKelasAktif("pagi");
              setSearch("");
              setFilterStatus("Semua Status");
            }}
          >
            <div className="kd-class-icon">
              <Sun size={23} />
            </div>

            <div className="kd-class-info">
              <h3>Kelas Pagi A</h3>
              <p><Clock size={14} /> Jadwal pagi</p>
            </div>

            <div className="kd-class-count">
              <strong>7</strong>
              <span>Santri</span>
            </div>
          </button>

          <button
            type="button"
            className={`kd-class-card ${
              kelasAktif === "sore" ? "selected" : ""
            }`}
            onClick={() => {
              setKelasAktif("sore");
              setSearch("");
              setFilterStatus("Semua Status");
            }}
          >
            <div className="kd-class-icon">
              <Moon size={23} />
            </div>

            <div className="kd-class-info">
              <h3>Kelas Sore A</h3>
              <p><Clock size={14} /> Jadwal sore</p>
            </div>

            <div className="kd-class-count">
              <strong>0</strong>
              <span>Santri</span>
            </div>
          </button>
        </div>

        <section className="kd-table-card">
          <div className="kd-table-header">
            <div>
              <h2>Daftar Santri</h2>
              <p>
                {kelasAktif === "pagi" ? "Kelas Pagi A" : "Kelas Sore A"}
                {" · "}
                {santriKelas.length} santri
              </p>
            </div>

            <div className="kd-table-tools">
              <label className="kd-search">
                <Search size={16} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama atau NIS..."
                />
              </label>

              <label className="kd-filter">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  aria-label="Filter status santri"
                >
                  <option>Semua Status</option>
                  <option>Lengkap</option>
                  <option>Belum Lengkap</option>
                </select>
                <ChevronDown size={14} />
              </label>
            </div>
          </div>

          <div className="kd-table-wrap">
            <table className="kd-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>NIS</th>
                  <th>NAMA SANTRI</th>
                  <th>KELAS</th>
                  <th>NILAI</th>
                  <th>STATUS</th>
                  <th>AKSI</th>
                </tr>
              </thead>

              <tbody>
                {santriDitampilkan.length > 0 ? (
                  santriDitampilkan.map((santri, index) => (
                    <tr key={santri.nis}>
                      <td>{index + 1}.</td>
                      <td>{santri.nis}</td>
                      <td className="kd-name">{santri.nama}</td>
                      <td>{kelasAktif === "pagi" ? "Pagi A" : "Sore A"}</td>
                      <td>{santri.nilai ?? "-"}</td>
                      <td>
                        <span
                          className={`kd-status ${
                            santri.status === "Lengkap"
                              ? "complete"
                              : "incomplete"
                          }`}
                        >
                          {santri.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="kd-action"
                          onClick={() => onNavigate?.("Input Nilai")}
                        >
                          {santri.status === "Lengkap"
                            ? "Lihat Nilai"
                            : "Lengkapi"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="kd-empty">
                      {kelasAktif === "sore"
                        ? "Belum ada santri di kelas ini."
                        : "Santri tidak ditemukan."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="kd-table-footer">
            <span>
              Menampilkan {santriDitampilkan.length} dari{" "}
              {santriKelas.length} santri
            </span>

            <button
              type="button"
              className="kd-next"
              onClick={() => onNavigate?.("Input Nilai")}
            >
              Input Nilai <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </LayoutPengajar>
  );
}
