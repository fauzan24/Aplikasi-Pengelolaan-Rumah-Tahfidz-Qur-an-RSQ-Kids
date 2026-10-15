import { useMemo, useState } from "react";
import { Search, ChartNoAxesColumn, Eye } from "lucide-react";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

const dataSantri = [
  { id: "RSQ001", nama: "Jauza Askana", kelas: "Pagi A" },
  { id: "RSQ004", nama: "Dede Ridho", kelas: "Pagi A" },
  { id: "RSQ006", nama: "Fauzan", kelas: "Pagi A" },
];

export default function ProgresBelajar({
  onNavigate,
  onLogout,
  onDetail,
}) {
  const [keyword, setKeyword] = useState("");

  const dataTampil = useMemo(() => {
    const cari = keyword.toLowerCase().trim();

    return dataSantri.filter(
      (santri) =>
        santri.nama.toLowerCase().includes(cari) ||
        santri.id.toLowerCase().includes(cari)
    );
  }, [keyword]);

  return (
    <LayoutPengajar
      activeMenu="Progres Belajar"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="pb-page">
        <style>{`
          .pb-page {
            min-height: calc(100vh - 76px);
            padding: 30px;
            background: #FBF9F3;
            color: #28352C;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .pb-page * { box-sizing: border-box; }
          .pb-page h1 {
            margin: 0 0 28px;
            font-size: 26px;
            font-weight: 800;
          }
          .pb-search-row {
            display: flex;
            gap: 12px;
            margin-bottom: 28px;
          }
          .pb-search {
            flex: 1;
            height: 48px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 16px;
            border: 1px solid #E7E4DB;
            border-radius: 15px;
            background: white;
            color: #5A734E;
          }
          .pb-search input {
            width: 100%;
            border: 0;
            outline: none;
            background: transparent;
            font: inherit;
            font-size: 12px;
            color: #28352C;
          }
          .pb-show {
            min-width: 120px;
            border: 0;
            border-radius: 13px;
            background: #5A734E;
            color: white;
            font: inherit;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }
          .pb-card {
            overflow: hidden;
            padding: 12px 22px;
            border: 1px solid #EAE7DF;
            border-radius: 24px;
            background: white;
          }
          .pb-scroll { overflow-x: auto; }
          .pb-table {
            width: 100%;
            min-width: 570px;
            border-collapse: collapse;
            text-align: left;
          }
          .pb-table thead {
            background: #5A734E;
            color: white;
          }
          .pb-table th {
            height: 60px;
            padding: 0 20px;
            font-size: 12px;
          }
          .pb-table th:first-child { border-radius: 12px 0 0 0; }
          .pb-table th:last-child {
            border-radius: 0 12px 0 0;
            text-align: center;
          }
          .pb-table td {
            height: 89px;
            padding: 15px 20px;
            border-bottom: 1px solid #ECEAE3;
            color: #626B60;
            font-size: 13px;
          }
          .pb-table tbody tr:last-child td { border-bottom: 0; }
          .pb-table td:last-child { text-align: center; }
          .pb-detail-btn {
            min-width: 100px;
            padding: 12px 18px;
            border: 1px solid #30442E;
            border-radius: 30px;
            background: white;
            color: #30442E;
            font: inherit;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }
          .pb-detail-btn:hover {
            background: #5A734E;
            color: white;
          }
          .pb-empty {
            padding: 35px !important;
            text-align: center;
          }
          @media (max-width: 650px) {
            .pb-page { padding: 22px 14px; }
            .pb-page h1 { font-size: 23px; }
            .pb-search-row { gap: 8px; }
            .pb-show { min-width: 90px; padding: 0 10px; }
            .pb-card { padding: 8px; border-radius: 16px; }
            .pb-table th, .pb-table td { padding-left: 12px; padding-right: 12px; }
          }
        `}</style>

        <h1>Progres Belajar</h1>

        <div className="pb-search-row">
          <label className="pb-search">
            <input
              type="search"
              placeholder="Cari Santri"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Search size={20} />
          </label>

          <button
            className="pb-show"
            onClick={() => setKeyword(keyword.trim())}
          >
            Tampilkan
          </button>
        </div>

        <section className="pb-card">
          <div className="pb-scroll">
            <table className="pb-table">
              <thead>
                <tr>
                  <th style={{ width: "7%" }}>No</th>
                  <th style={{ width: "25%" }}>NIS</th>
                  <th style={{ width: "35%" }}>Nama</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((santri, index) => (
                    <tr key={santri.id}>
                      <td>{index + 1}.</td>
                      <td>{santri.id}</td>
                      <td>{santri.nama}</td>
                      <td>
                        <button
                          className="pb-detail-btn"
                          onClick={() => onDetail?.(santri)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="pb-empty">
                      <ChartNoAxesColumn
                        size={24}
                        style={{ display: "block", margin: "0 auto 8px" }}
                      />
                      Santri tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </LayoutPengajar>
  );
}