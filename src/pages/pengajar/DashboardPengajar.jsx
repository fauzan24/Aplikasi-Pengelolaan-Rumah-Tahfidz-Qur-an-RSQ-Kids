import { useMemo, useState } from "react";
import {
  Download,
  Plus,
  UsersRound,
  BookOpen,
  CircleCheck,
  CircleAlert,
  Search,
  ChevronDown,
  ClipboardCheck,
} from "lucide-react";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

const dataAwal = [
  {
    id: "RSQ001",
    nama: "Jauza Askana",
    kelas: "Pagi A",
    nilai: 89,
    lengkap: false,
  },
  {
    id: "RSQ002",
    nama: "Dinda Azzahra",
    kelas: "Pagi A",
    nilai: 90,
    lengkap: true,
  },
  {
    id: "RSQ003",
    nama: "Raffa Fadilla",
    kelas: "Pagi A",
    nilai: 0,
    lengkap: false,
  },
  {
    id: "RSQ004",
    nama: "Dede Ridho",
    kelas: "Pagi A",
    nilai: 88,
    lengkap: true,
  },
  {
    id: "RSQ005",
    nama: "Kalila Haura",
    kelas: "Pagi A",
    nilai: 92,
    lengkap: true,
  },
  {
    id: "RSQ006",
    nama: "Aisyah Putri",
    kelas: "Pagi A",
    nilai: 0,
    lengkap: false,
  },
  {
    id: "RSQ007",
    nama: "Muhammad Fikri",
    kelas: "Pagi A",
    nilai: 87,
    lengkap: false,
  },
];

export default function DashboardPengajar({
  onLogout,
  onNavigate,
}) {
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");

  const jumlahLengkap = dataAwal.filter(
    (santri) => santri.lengkap
  ).length;

  const jumlahBelum = dataAwal.length - jumlahLengkap;

  const dataTampil = useMemo(() => {
    return dataAwal.filter((santri) => {
      const cocokNama =
        santri.nama.toLowerCase().includes(keyword.toLowerCase()) ||
        santri.id.toLowerCase().includes(keyword.toLowerCase());

      const cocokStatus =
        filterStatus === "Semua Status" ||
        (filterStatus === "Lengkap" && santri.lengkap) ||
        (filterStatus === "Belum Lengkap" && !santri.lengkap);

      return cocokNama && cocokStatus;
    });
  }, [keyword, filterStatus]);

  const unduhRekap = () => {
    const header = [
      "NIS",
      "Nama Santri",
      "Kelas",
      "Nilai",
      "Status",
    ];

    const rows = dataTampil.map((santri) => [
      santri.id,
      santri.nama,
      santri.kelas,
      santri.nilai || "-",
      santri.lengkap ? "Lengkap" : "Belum Lengkap",
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "rekap-santri-rsq-kids.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const kartu = [
    {
      label: "Total Santri",
      angka: dataAwal.length,
      deskripsi: "Santri dalam kelas",
      badge: "Aktif",
      icon: UsersRound,
      warna: "hijau",
    },
    {
      label: "Kelas Diampu",
      angka: 1,
      deskripsi: "Kelas Pagi A",
      icon: BookOpen,
      warna: "kuning",
    },
    {
      label: "Nilai Lengkap",
      angka: `${jumlahLengkap}/${dataAwal.length}`,
      deskripsi: "Data nilai santri",
      badge: "Tersimpan",
      icon: CircleCheck,
      warna: "biru",
    },
    {
      label: "Belum Lengkap",
      angka: jumlahBelum,
      deskripsi: "Perlu ditindaklanjuti",
      badge: "Periksa",
      icon: CircleAlert,
      warna: "jingga",
    },
  ];

  return (
    <LayoutPengajar
      activeMenu="Dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="dp-page">
        <style>{`
          .dp-page {
            width: 100%;
            min-width: 0;
            padding: 0 0 24px;
            color: #28352C;
            font-family: inherit;
          }

          .dp-page *,
          .dp-page *::before,
          .dp-page *::after {
            box-sizing: border-box;
          }

          .dp-heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 26px;
          }

          .dp-heading h1 {
            margin: 0 0 8px;
            color: #28352C;
            font-size: clamp(23px, 2vw, 29px);
            font-weight: 800;
            letter-spacing: -.8px;
            line-height: 1.4;
          }

          .dp-heading p {
            margin: 0;
            color: #879085;
            font-size: 13px;
            line-height: 1.7;
          }

          .dp-actions {
            display: flex;
            align-items: center;
            gap: 9px;
            flex-shrink: 0;
          }

          .dp-button {
            min-height: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 0 13px;
            border: 1px solid #E2E0D6;
            border-radius: 10px;
            background: white;
            color: #566752;
            font-family: inherit;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: background .2s ease;
          }

          .dp-button:hover {
            background: #F3F5EF;
          }

          .dp-button.primary {
            border-color: #5A734E;
            background: #5A734E;
            color: white;
          }

          .dp-button.primary:hover {
            background: #30442E;
          }

          .dp-stats {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 15px;
            margin-bottom: 26px;
          }

          .dp-stat {
            min-width: 0;
            padding: 19px 17px 17px;
            border: 1px solid #E9E6DD;
            border-radius: 16px;
            background: #FFFFFF;
            box-shadow: 0 2px 5px rgba(40,53,44,.025);
          }

          .dp-stat-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 17px;
          }

          .dp-stat-label {
            color: #778176;
            font-size: 12px;
            font-weight: 500;
          }

          .dp-stat-icon {
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border-radius: 13px;
          }

          .dp-stat-icon.hijau {
            background: #EFF3EA;
            color: #5A734E;
          }

          .dp-stat-icon.kuning {
            background: #F8F1E2;
            color: #B18A4C;
          }

          .dp-stat-icon.biru {
            background: #EDF2FB;
            color: #6483BD;
          }

          .dp-stat-icon.jingga {
            background: #FAEEE5;
            color: #C47B48;
          }

          .dp-stat-number {
            margin-bottom: 9px;
            color: #28352C;
            font-size: 30px;
            font-weight: 800;
            letter-spacing: -1px;
          }

          .dp-stat-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 7px;
          }

          .dp-stat-desc {
            color: #9AA297;
            font-size: 11px;
          }

          .dp-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 6px 9px;
            border-radius: 20px;
            background: #EEF3E8;
            color: #628255;
            font-size: 10px;
            white-space: nowrap;
          }

          .dp-badge.warning {
            border: 1px solid #F6D58A;
            background: #FFF9EA;
            color: #A96A09;
          }

          .dp-table-card {
            width: 100%;
            overflow: hidden;
            border: 1px solid #E9E6DD;
            border-radius: 16px;
            background: white;
            box-shadow: 0 2px 5px rgba(40,53,44,.025);
          }

          .dp-table-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 21px 22px;
          }

          .dp-table-title {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 7px;
          }

          .dp-table-title h2 {
            margin: 0;
            font-size: 18px;
            font-weight: 800;
            letter-spacing: -.4px;
          }

          .dp-count {
            padding: 6px 10px;
            border-radius: 20px;
            background: #F0F3EB;
            color: #5A734E;
            font-size: 10px;
            white-space: nowrap;
          }

          .dp-table-subtitle {
            margin: 0;
            color: #899287;
            font-size: 12px;
            line-height: 1.6;
          }

          .dp-filters {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .dp-search {
            width: 230px;
            height: 42px;
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 0 12px;
            border: 1px solid #E3E0D6;
            border-radius: 11px;
            color: #879287;
            background: #FCFBF8;
          }

          .dp-search input {
            width: 100%;
            min-width: 0;
            border: none;
            outline: none;
            background: transparent;
            color: #28352C;
            font-family: inherit;
            font-size: 12px;
          }

          .dp-search input::placeholder {
            color: #A1A69E;
          }

          .dp-select {
            height: 42px;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 12px;
            border: 1px solid #E3E0D6;
            border-radius: 11px;
            background: #FCFBF8;
            color: #5D685B;
          }

          .dp-select select {
            appearance: none;
            -webkit-appearance: none;
            max-width: 130px;
            border: none;
            outline: none;
            background: transparent;
            color: inherit;
            font-family: inherit;
            font-size: 12px;
            cursor: pointer;
          }

          .dp-table-scroll {
            width: 100%;
            overflow-x: auto;
          }

          .dp-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            white-space: nowrap;
          }

          .dp-table thead {
            background: #5A734E;
            color: white;
          }

          .dp-table th {
            height: 49px;
            padding: 0 15px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: .4px;
          }

          .dp-table th:first-child,
          .dp-table td:first-child {
            padding-left: 22px;
          }

          .dp-table td {
            height: 68px;
            padding: 10px 15px;
            border-bottom: 1px solid #ECEAE3;
            color: #5D685D;
            font-size: 12px;
          }

          .dp-table tbody tr:last-child td {
            border-bottom: none;
          }

          .dp-table tbody tr:hover {
            background: #FCFBF7;
          }

          .dp-number {
            color: #A1A69E;
          }

          .dp-santri {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #28352C;
            font-weight: 600;
          }

          .dp-initial {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border-radius: 50%;
            background: #EDF0E7;
            color: #4E6745;
            font-size: 11px;
            font-weight: 700;
          }

          .dp-status {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 7px 10px;
            border: 1px solid #F4D78B;
            border-radius: 20px;
            background: #FFF9EA;
            color: #A56A0B;
            font-size: 11px;
          }

          .dp-status.lengkap {
            border-color: #A9E7D1;
            background: #EDFBF5;
            color: #14805E;
          }

          .dp-status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: currentColor;
          }

          .dp-empty {
            padding: 35px !important;
            color: #899287 !important;
            text-align: center;
          }

          .dp-table-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 15px 22px;
            border-top: 1px solid #ECEAE3;
            background: #FDFCF9;
            color: #899287;
            font-size: 11px;
          }

          @media (max-width: 1150px) {
            .dp-stats {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .dp-table-head {
              align-items: flex-start;
              flex-direction: column;
            }

            .dp-filters {
              width: 100%;
            }

            .dp-search {
              flex: 1;
              width: auto;
            }
          }

          @media (max-width: 650px) {
            .dp-heading {
              align-items: flex-start;
              flex-direction: column;
            }

            .dp-actions {
              width: 100%;
            }

            .dp-button {
              flex: 1;
              padding: 0 9px;
              font-size: 11px;
            }

            .dp-stats {
              gap: 10px;
            }

            .dp-stat {
              padding: 14px 11px;
            }

            .dp-stat-top {
              align-items: flex-start;
              flex-direction: column-reverse;
              margin-bottom: 12px;
            }

            .dp-stat-number {
              font-size: 25px;
            }

            .dp-stat-label,
            .dp-stat-desc {
              font-size: 10px;
            }

            .dp-stat-icon {
              width: 34px;
              height: 34px;
            }

            .dp-stat-bottom {
              align-items: flex-start;
              flex-direction: column;
            }

            .dp-table-head {
              padding: 17px 14px;
            }

            .dp-filters {
              align-items: stretch;
              flex-direction: column;
            }

            .dp-search,
            .dp-select {
              width: 100%;
            }

            .dp-select select {
              max-width: none;
              flex: 1;
            }

            .dp-table-footer {
              padding: 13px;
            }
          }
        `}</style>

        <section className="dp-heading">
          <div>
            <h1>Selamat Datang, Pengajar 👋</h1>
            <p>
              Pantau perkembangan santri, nilai, dan jadwal mengajar kamu hari ini.
            </p>
          </div>

          <div className="dp-actions">
            <button
              type="button"
              className="dp-button"
              onClick={unduhRekap}
            >
              <Download size={16} />
              Unduh Rekap
            </button>

            <button
              type="button"
              className="dp-button primary"
              onClick={() => onNavigate?.("Input Nilai")}
            >
              <Plus size={17} />
              Input Nilai
            </button>
          </div>
        </section>

        <section className="dp-stats">
          {kartu.map((item) => {
            const Icon = item.icon;

            return (
              <article className="dp-stat" key={item.label}>
                <div className="dp-stat-top">
                  <span className="dp-stat-label">
                    {item.label}
                  </span>

                  <div className={`dp-stat-icon ${item.warna}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <div className="dp-stat-number">
                  {item.angka}
                </div>

                <div className="dp-stat-bottom">
                  <span className="dp-stat-desc">
                    {item.deskripsi}
                  </span>

                  {item.badge && (
                    <span
                      className={`dp-badge ${
                        item.label === "Belum Lengkap"
                          ? "warning"
                          : ""
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section className="dp-table-card">
          <div className="dp-table-head">
            <div>
              <div className="dp-table-title">
                <h2>Daftar Santri</h2>
                <span className="dp-count">
                  {dataAwal.length} Santri
                </span>
              </div>

              <p className="dp-table-subtitle">
                Pantau nilai dan kelengkapan data santri yang kamu ampu.
              </p>
            </div>

            <div className="dp-filters">
              <label className="dp-search">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Cari nama santri..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </label>

              <label className="dp-select">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  aria-label="Filter status nilai"
                >
                  <option>Semua Status</option>
                  <option>Lengkap</option>
                  <option>Belum Lengkap</option>
                </select>

                <ChevronDown size={14} />
              </label>
            </div>
          </div>

          <div className="dp-table-scroll">
            <table className="dp-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>NIS</th>
                  <th>NAMA SANTRI</th>
                  <th>KELAS</th>
                  <th>NILAI</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((santri, index) => (
                    <tr key={santri.id}>
                      <td className="dp-number">
                        {index + 1}.
                      </td>

                      <td>{santri.id}</td>

                      <td>
                        <div className="dp-santri">
                          <span className="dp-initial">
                            {santri.nama
                              .split(" ")
                              .map((kata) => kata[0])
                              .slice(0, 2)
                              .join("")}
                          </span>

                          {santri.nama}
                        </div>
                      </td>

                      <td>{santri.kelas}</td>

                      <td>{santri.nilai || "-"}</td>

                      <td>
                        <span
                          className={`dp-status ${
                            santri.lengkap ? "lengkap" : ""
                          }`}
                        >
                          <span className="dp-status-dot" />

                          {santri.lengkap
                            ? "Lengkap"
                            : "Belum Lengkap"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="dp-empty">
                      <ClipboardCheck
                        size={22}
                        style={{
                          display: "block",
                          margin: "0 auto 8px",
                        }}
                      />

                      Santri tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="dp-table-footer">
            <span>
              Menampilkan {dataTampil.length} dari {dataAwal.length} santri
            </span>
          </div>
        </section>
      </div>
    </LayoutPengajar>
  );
}
