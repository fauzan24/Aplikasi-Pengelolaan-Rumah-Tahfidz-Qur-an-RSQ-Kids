import {
	BookOpen,
	ClipboardList,
	GraduationCap,
	UsersRound,
} from "lucide-react";
import LayoutAdmin from "../../components/admin/LayoutAdmin";

const ringkasan = [
	{ label: "Total Santri", jumlah: 20, icon: UsersRound, warna: "hijau" },
	{ label: "Total Pengajar", jumlah: 4, icon: GraduationCap, warna: "biru" },
	{ label: "Total Kelas", jumlah: 2, icon: BookOpen, warna: "kuning" },
	{ label: "Daftar Tunggu", jumlah: 3, icon: ClipboardList, warna: "jingga" },
];

const pendaftaranTerbaru = [
	{ nama: "Raffa Fadilla", tanggal: "27 Maret 2026", status: "Menunggu" },
	{ nama: "Aisyah Putri", tanggal: "25 Maret 2026", status: "Menunggu" },
	{ nama: "Nabila Rahma", tanggal: "15 Maret 2026", status: "Diterima" },
	{ nama: "Muhammad Abi", tanggal: "13 Maret 2026", status: "Diterima" },
	{ nama: "Ahmad Nabil", tanggal: "10 Maret 2026", status: "Diterima" },
];

export default function DashboardAdmin({ onNavigate, onLogout }) {
	return (
		<LayoutAdmin
			activeMenu="Beranda"
			onNavigate={onNavigate}
			onLogout={onLogout}
		>
			<div className="da-page">
				<style>{`
					.da-page { width: 100%; min-width: 0; padding-bottom: 24px; color: #28352C; }
					.da-page *, .da-page *::before, .da-page *::after { box-sizing: border-box; }
					.da-heading { margin-bottom: 24px; }
					.da-heading h1 { margin: 0 0 7px; font-size: clamp(22px, 2vw, 28px); font-weight: 800; line-height: 1.4; }
					.da-heading p { margin: 0; color: #879085; font-size: 12px; line-height: 1.7; }
					.da-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 24px; }
					.da-stat { min-width: 0; padding: 18px 17px 16px; border: 1px solid #E9E6DD; border-radius: 13px; background: #fff; box-shadow: 0 2px 5px rgba(40,53,44,.025); }
					.da-stat-top { display: flex; align-items: space-between; justify-content: space-between; gap: 8px; margin-bottom: 16px; }
					.da-stat-label { color: #778176; font-size: 11px; }
					.da-stat-icon { width: 38px; height: 38px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 11px; }
					.da-stat-icon.hijau { background: #EFF3EA; color: #5A734E; }
					.da-stat-icon.biru { background: #EDF2FB; color: #6483BD; }
					.da-stat-icon.kuning { background: #F8F1E2; color: #B18A4C; }
					.da-stat-icon.jingga { background: #FAEEE5; color: #C47B48; }
					.da-stat-number { color: #28352C; font-size: 30px; font-weight: 800; }
					.da-table-card { overflow: hidden; border: 1px solid #E9E6DD; border-radius: 13px; background: #fff; box-shadow: 0 2px 5px rgba(40,53,44,.025); }
					.da-table-head { padding: 20px 22px 17px; }
					.da-table-head h2 { margin: 0 0 6px; font-size: 17px; font-weight: 800; }
					.da-table-head p { margin: 0; color: #899287; font-size: 11px; line-height: 1.6; }
					.da-table-scroll { width: 100%; overflow-x: auto; }
					.da-table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
					.da-table thead { background: #5A734E; color: #fff; }
					.da-table th { height: 45px; padding: 0 16px; font-size: 10px; font-weight: 700; }
					.da-table th:first-child, .da-table td:first-child { padding-left: 22px; }
					.da-table td { height: 55px; padding: 9px 16px; border-bottom: 1px solid #ECEAE3; color: #5D685D; font-size: 12px; }
					.da-table tbody tr:last-child td { border-bottom: 0; }
					.da-table tbody tr:hover { background: #FCFBF7; }
					.da-index { color: #A1A69E !important; }
					.da-name { color: #28352C !important; font-weight: 600; }
					.da-status { display: inline-flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 600; }
					.da-status::before { width: 7px; height: 7px; border-radius: 50%; background: currentColor; content: ""; }
					.da-status.menunggu { color: #B77B1D; }
					.da-status.diterima { color: #218365; }
					.da-table-footer { padding: 13px 22px; border-top: 1px solid #ECEAE3; background: #FDFCF9; color: #899287; font-size: 10px; }
					@media (max-width: 1050px) { .da-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
					@media (max-width: 560px) {
						.da-heading { margin-bottom: 18px; }
						.da-stats { gap: 9px; margin-bottom: 18px; }
						.da-stat { padding: 13px 11px; }
						.da-stat-top { align-items: flex-start; flex-direction: column-reverse; gap: 9px; margin-bottom: 10px; }
						.da-stat-label { font-size: 10px; }
						.da-stat-icon { width: 32px; height: 32px; }
						.da-stat-icon svg { width: 18px; height: 18px; }
						.da-stat-number { font-size: 25px; }
						.da-table-head { padding: 16px 14px 13px; }
						.da-table th:first-child, .da-table td:first-child { padding-left: 14px; }
						.da-table th, .da-table td { padding-right: 12px; padding-left: 12px; }
						.da-table-footer { padding: 12px 14px; }
					}
				`}</style>

				<section className="da-heading">
					<h1>Selamat Datang, Admin</h1>
					<p>Ringkasan aktivitas Rumah Tahfidz Qur'an RSQ-Kids.</p>
				</section>

				<section className="da-stats" aria-label="Ringkasan data">
					{ringkasan.map(({ label, jumlah, icon: Icon, warna }) => (
						<article className="da-stat" key={label}>
							<div className="da-stat-top">
								<span className="da-stat-label">{label}</span>
								<div className={`da-stat-icon ${warna}`}><Icon size={21} /></div>
							</div>
							<div className="da-stat-number">{jumlah}</div>
						</article>
					))}
				</section>

				<section className="da-table-card">
					<div className="da-table-head">
						<h2>Pendaftaran Terbaru</h2>
						<p>Periksa status pendaftaran santri yang masuk.</p>
					</div>

					<div className="da-table-scroll">
						<table className="da-table">
							<thead>
								<tr><th>NO</th><th>NAMA SANTRI</th><th>TANGGAL DAFTAR</th><th>STATUS</th></tr>
							</thead>
							<tbody>
								{pendaftaranTerbaru.map((pendaftaran, index) => (
									<tr key={pendaftaran.nama}>
										<td className="da-index">{index + 1}.</td>
										<td className="da-name">{pendaftaran.nama}</td>
										<td>{pendaftaran.tanggal}</td>
										<td><span className={`da-status ${pendaftaran.status.toLowerCase()}`}>{pendaftaran.status}</span></td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="da-table-footer">Menampilkan {pendaftaranTerbaru.length} pendaftaran terbaru</div>
				</section>
			</div>
		</LayoutAdmin>
	);
}
