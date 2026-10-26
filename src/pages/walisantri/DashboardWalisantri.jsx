import {
	Box,
	Button,
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import {
	Bell,
	BookOpen,
	CalendarDays,
	CheckCircle2,
	LogOut,
	Wallet,
} from "lucide-react";

const aktivitasSantri = [
	{ tanggal: "15 Okt 2026", materi: "Surah Al-Mulk ayat 1-5", nilai: "Sangat baik" },
	{ tanggal: "13 Okt 2026", materi: "Murajaah Juz 30", nilai: "Baik" },
	{ tanggal: "10 Okt 2026", materi: "Surah An-Naba ayat 1-10", nilai: "Baik" },
];

const warna = {
	teks: "#28352C",
	hijau: "#5A734E",
	abu: "#879085",
	garis: "#E9E6DD",
};

const panelSx = {
	minWidth: 0,
	padding: "20px",
	border: `1px solid ${warna.garis}`,
	borderRadius: "12px",
	backgroundColor: "#fff",
};

export default function DashboardWalisantri({ pengguna, onLogout }) {
	const namaPengguna = pengguna?.nama ?? "Wali Santri";

	return (
		<Box
			component="main"
			sx={{
				minHeight: "100vh",
				backgroundColor: "#FBF9F3",
				color: warna.teks,
				fontFamily: "'Plus Jakarta Sans', sans-serif",
				"& .MuiTypography-root": {
					fontFamily: "inherit",
					lineHeight: "normal",
				},
			}}
		>
			<Box
				component="header"
				sx={{
					height: "72px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "16px",
					padding: "0 5vw",
					borderBottom: "1px solid #E8E6DE",
					backgroundColor: "#fff",
					"@media (max-width: 520px)": {
						height: "64px",
						padding: "0 14px",
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						fontSize: "14px",
						fontWeight: 800,
						"@media (max-width: 520px)": { fontSize: "12px" },
					}}
				>
					<Box
						component="span"
						sx={{
							width: "36px",
							height: "36px",
							display: "grid",
							placeItems: "center",
							borderRadius: "9px",
							backgroundColor: "#EFF3EA",
							color: warna.hijau,
						}}
					>
						<BookOpen size={20} />
					</Box>
					Rumah Sahabat Qur'an
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
					<Bell size={18} color={warna.hijau} aria-label="Notifikasi" />
					<Box
						sx={{
							"@media (max-width: 520px)": {
								display: "none",
							},
						}}
					>
						<Typography
							sx={{ fontSize: "11px", fontWeight: 700, lineHeight: 1.2 }}
						>
							{namaPengguna}
						</Typography>
						<Typography sx={{ mt: "3px", color: "#838B82", fontSize: "10px" }}>
							Wali Santri
						</Typography>
					</Box>
					<Button
						type="button"
						onClick={onLogout}
						startIcon={<LogOut size={15} />}
						sx={{
							minWidth: 0,
							display: "inline-flex",
							alignItems: "center",
							gap: "7px",
							padding: "8px 11px",
							border: "1px solid #E2E0D6",
							borderRadius: "8px",
							backgroundColor: "#fff",
							color: "#566752",
							fontFamily: "inherit",
							fontSize: "11px",
							fontWeight: 400,
							lineHeight: 1.2,
							textTransform: "none",
							boxShadow: "none",
							"& .MuiButton-startIcon": { margin: 0 },
							"&:hover": {
								borderColor: "#E2E0D6",
								backgroundColor: "#fff",
								boxShadow: "none",
							},
							"@media (max-width: 520px)": {
								padding: "8px",
								fontSize: 0,
								"& .MuiButton-startIcon": { margin: 0 },
							},
						}}
					>
						Keluar
					</Button>
				</Box>
			</Box>

			<Box
				sx={{
					width: "min(1080px, calc(100% - 48px))",
					margin: "0 auto",
					padding: "34px 0 48px",
					"@media (max-width: 520px)": {
						width: "calc(100% - 28px)",
						paddingTop: "24px",
					},
				}}
			>
				<Box sx={{ mb: "24px" }}>
					<Typography
						component="h1"
						sx={{
							margin: "0 0 6px",
							fontSize: "26px",
							fontWeight: 800,
							lineHeight: 1.3,
							"@media (max-width: 520px)": { fontSize: "22px" },
						}}
					>
						Selamat Datang, {namaPengguna}
					</Typography>
					<Typography
						component="p"
						sx={{ margin: 0, color: warna.abu, fontSize: "12px", lineHeight: 1.6 }}
					>
						Pantau perkembangan belajar dan informasi administrasi ananda.
					</Typography>
				</Box>

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "minmax(0, 1.4fr) minmax(250px, .8fr)",
						gap: "16px",
						"@media (max-width: 700px)": { gridTemplateColumns: "1fr" },
					}}
				>
					<Paper component="section" elevation={0} sx={panelSx}>
						<Typography
							component="h2"
							sx={{ margin: "0 0 17px", fontSize: "15px", fontWeight: 800 }}
						>
							Profil Santri
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
							<Box
								sx={{
									width: "48px",
									height: "48px",
									display: "grid",
									placeItems: "center",
									flex: "0 0 auto",
									borderRadius: "50%",
									backgroundColor: "#EFF3EA",
									color: warna.hijau,
									fontSize: "13px",
									fontWeight: 800,
								}}
							>
								AA
							</Box>
							<Box>
								<Typography component="strong" sx={{ fontSize: "13px", fontWeight: 700 }}>
									Ahmad Al-Fatih
								</Typography>
								<Typography
									component="p"
									sx={{ margin: "5px 0 0", color: warna.abu, fontSize: "11px" }}
								>
									NIS RSQ020 · Kelas Pagi A
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								gap: "12px",
								margin: "20px 0 8px",
								color: "#6C7669",
								fontSize: "11px",
							}}
						>
							<span>Progres belajar semester ini</span>
							<strong>64%</strong>
						</Box>
						<LinearProgress
							variant="determinate"
							value={64}
							sx={{
								height: "9px",
								overflow: "hidden",
								borderRadius: "9px",
								backgroundColor: "#EDF0E7",
								"& .MuiLinearProgress-bar": {
									borderRadius: "inherit",
									backgroundColor: "#68835D",
									transition: "none",
								},
							}}
						/>
					</Paper>

					<Paper component="section" elevation={0} sx={panelSx}>
						<Typography
							component="h2"
							sx={{ margin: "0 0 17px", fontSize: "15px", fontWeight: 800 }}
						>
							Informasi
						</Typography>
						{[
							{
								Icon: CheckCircle2,
								label: "Status belajar",
								value: "Aktif",
							},
							{
								Icon: Wallet,
								label: "Pembayaran SPP",
								value: "Oktober · Lunas",
								wallet: true,
							},
							{
								Icon: CalendarDays,
								label: "Jadwal berikutnya",
								value: "Besok, 08.00",
							},
						].map(({ Icon, label, value, wallet }) => (
							<Box
								key={label}
								sx={{
									display: "flex",
									alignItems: "center",
									gap: "13px",
									padding: "15px 0",
									borderBottom: "1px solid #ECEAE3",
									"&:last-child": { paddingBottom: 0, borderBottom: 0 },
								}}
							>
								<Box
									sx={{
										width: "36px",
										height: "36px",
										display: "grid",
										placeItems: "center",
										flex: "0 0 auto",
										borderRadius: "10px",
										backgroundColor: wallet ? "#F8F1E2" : "#EFF3EA",
										color: wallet ? "#B18A4C" : warna.hijau,
									}}
								>
									<Icon size={19} />
								</Box>
								<Box>
									<Typography
										component="span"
										sx={{ display: "block", color: warna.abu, fontSize: "10px" }}
									>
										{label}
									</Typography>
									<Typography
										component="strong"
										sx={{
											display: "block",
											mt: "4px",
											fontSize: "12px",
											fontWeight: 700,
										}}
									>
										{value}
									</Typography>
								</Box>
							</Box>
						))}
					</Paper>

					<Paper
						component="section"
						elevation={0}
						sx={{
							...panelSx,
							gridColumn: "1 / -1",
							"@media (max-width: 700px)": { gridColumn: "auto" },
							"@media (max-width: 520px)": { padding: "16px 13px" },
						}}
					>
						<Typography
							component="h2"
							sx={{ margin: "0 0 17px", fontSize: "15px", fontWeight: 800 }}
						>
							Aktivitas Belajar Terbaru
						</Typography>
						<Box sx={{ overflowX: "auto" }}>
							<Table
								sx={{
									width: "100%",
									borderCollapse: "collapse",
									textAlign: "left",
									whiteSpace: "nowrap",
									"& th": {
										padding: "11px 12px",
										backgroundColor: warna.hijau,
										color: "#fff",
										fontSize: "10px",
										fontWeight: 700,
										lineHeight: 1.4,
									},
									"& td": {
										padding: "13px 12px",
										borderBottom: "1px solid #ECEAE3",
										color: "#5D685D",
										fontSize: "11px",
									},
									"& th, & td": { fontFamily: "inherit" },
									"& tbody tr:last-child td": { borderBottom: 0 },
									"& td:last-child": {
										color: "#218365",
										fontWeight: 700,
									},
								}}
							>
								<TableHead>
									<TableRow>
										<TableCell>TANGGAL</TableCell>
										<TableCell>MATERI</TableCell>
										<TableCell>HASIL</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{aktivitasSantri.map((aktivitas) => (
										<TableRow key={aktivitas.tanggal}>
											<TableCell>{aktivitas.tanggal}</TableCell>
											<TableCell>{aktivitas.materi}</TableCell>
											<TableCell>{aktivitas.nilai}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
}
