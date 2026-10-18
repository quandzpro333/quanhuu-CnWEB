/* ĐÃ CHO SẴN — KHÔNG SỬA FILE NÀY.
   Bộ kiểm tra tự động cho Bài B. Kết quả in ở tab Console (F12) và ở cuối khung "Kết quả". */
(function () {
	const ketQua = [];

	function kiem(ten, ham) {
		let dat = false;
		let loi = "";
		try {
			dat = ham() === true;
		} catch (e) {
			loi = e.message;
		}
		ketQua.push({ "Kiểm tra": ten, "Kết quả": dat ? "✅ Đạt" : "❌ Chưa đạt", "Lỗi": loi });
	}

	// Sản phẩm dùng riêng cho kiểm tra (không đụng tới DANH_MUC).
	function sp(id, loai, gia) {
		return { id: id, ten: "SP " + id, loai: loai, gia: gia };
	}

	// Giỏ mẫu: A 100 × 1500 = 150000; B 200 × 500 = 100000; C 100 × 900 = 90000 → tổng 340000.
	function gioMau() {
		const g = new GioHang();
		g.them(sp("A", "thiep cuoi", 1500), 100);
		g.them(sp("B", "phu kien", 500), 200);
		g.them(sp("C", "thiep cuoi", 900), 100);
		return g;
	}

	// --- khởi tạo, them ---
	kiem("T1  giỏ mới: tongTien() là 0, layDanhSach() là mảng rỗng", () => {
		const g = new GioHang();
		return g.tongTien() === 0 && Array.isArray(g.layDanhSach()) && g.layDanhSach().length === 0;
	});
	kiem("T2  them trả về true, dòng mới có đủ id, ten, loai, gia, soLuong", () => {
		const g = new GioHang();
		const ok = g.them(sp("A", "thiep cuoi", 1500), 100);
		const d = g.layDanhSach()[0];
		return ok === true && d.id === "A" && d.ten === "SP A" && d.loai === "thiep cuoi" && d.gia === 1500 && d.soLuong === 100;
	});
	kiem("T3  thêm cùng một sản phẩm hai lần → vẫn 1 dòng, số lượng cộng dồn (100 + 50 = 150)", () => {
		const g = new GioHang();
		g.them(sp("A", "thiep cuoi", 1500), 100);
		g.them(sp("A", "thiep cuoi", 1500), 50);
		return g.layDanhSach().length === 1 && g.layDanhSach()[0].soLuong === 150;
	});
	kiem("T4  số lượng 0, âm, lẻ (2.5), NaN, null, undefined → false, giỏ không đổi", () => {
		const g = new GioHang();
		const p = sp("A", "thiep cuoi", 1500);
		const kq = [g.them(p, 0), g.them(p, -5), g.them(p, 2.5), g.them(p, NaN), g.them(p, null), g.them(p, undefined)];
		return kq.every(k => k === false) && g.layDanhSach().length === 0;
	});
	kiem("T5  số lượng là CHUỖI \"50\" → false; số lượng cũ vẫn là number 100", () => {
		const g = new GioHang();
		const p = sp("A", "thiep cuoi", 1500);
		g.them(p, 100);
		const ok = g.them(p, "50");
		return ok === false && g.layDanhSach()[0].soLuong === 100 && g.tongTien() === 150000;
	});
	kiem("T6  DANH_MUC không bị thay đổi sau khi thêm vào giỏ", () => {
		const g = new GioHang();
		g.them(DANH_MUC[0], 10);
		g.them(DANH_MUC[0], 5);
		return DANH_MUC.length === 4 && Object.keys(DANH_MUC[0]).length === 4 && DANH_MUC[0].soLuong === undefined;
	});
	kiem("T7  giỏ không giữ tham chiếu tới object sản phẩm bên ngoài", () => {
		const g = new GioHang();
		const p = sp("A", "thiep cuoi", 1500);
		g.them(p, 100);
		p.gia = 1;
		p.ten = "đã sửa";
		return g.tongTien() === 150000 && g.layDanhSach()[0].ten === "SP A";
	});

	// --- xoa, tongTien ---
	kiem("T8  xoa: có → true và mất dòng; không có → false và giữ nguyên", () => {
		const g = gioMau();
		const a = g.xoa("B");
		const b = g.xoa("KHONG-CO");
		return a === true && b === false && g.layDanhSach().length === 2 && g.tongTien() === 240000;
	});
	kiem("T9  tongTien của giỏ mẫu là 340000", () => gioMau().tongTien() === 340000);

	// --- thongKeTheoLoai ---
	kiem("T10 thongKeTheoLoai: { \"thiep cuoi\": 240000, \"phu kien\": 100000 }, không thừa khoá", () => {
		const tk = gioMau().thongKeTheoLoai();
		return Object.keys(tk).length === 2 && tk["thiep cuoi"] === 240000 && tk["phu kien"] === 100000;
	});
	kiem("T11 thongKeTheoLoai của giỏ rỗng là object rỗng", () => Object.keys(new GioHang().thongKeTheoLoai()).length === 0);

	// --- dongDatNhat ---
	kiem("T12 dongDatNhat: dòng A, thanhTien 150000; giỏ rỗng → null", () => {
		const d = gioMau().dongDatNhat();
		return d.id === "A" && d.thanhTien === 150000 && new GioHang().dongDatNhat() === null;
	});
	kiem("T13 dongDatNhat: hai dòng bằng nhau → lấy dòng ĐỨNG TRƯỚC", () => {
		const g = new GioHang();
		g.them(sp("X", "khac", 1000), 10);
		g.them(sp("Y", "khac", 500), 20);
		return g.dongDatNhat().id === "X";
	});

	// --- layDanhSach: bản sao ---
	kiem("T14 layDanhSach có thanhTien cho từng dòng", () => {
		const ds = gioMau().layDanhSach();
		return ds.length === 3 && ds[0].thanhTien === 150000 && ds[1].thanhTien === 100000 && ds[2].thanhTien === 90000;
	});
	kiem("T15 sửa kết quả của layDanhSach / dongDatNhat KHÔNG làm đổi giỏ", () => {
		const g = gioMau();
		const ds = g.layDanhSach();
		ds[0].soLuong = 9999;
		ds[0].gia = 1;
		ds.pop();
		g.dongDatNhat().soLuong = 1;
		return g.tongTien() === 340000 && g.layDanhSach().length === 3 && g.layDanhSach()[0].soLuong === 100;
	});

	// --- JSON ---
	kiem("T16 xuatJSON trả về chuỗi; parse ra mảng, mỗi phần tử có ĐÚNG 5 khoá id, ten, loai, gia, soLuong", () => {
		const chuoi = gioMau().xuatJSON();
		const mang = JSON.parse(chuoi);
		return typeof chuoi === "string" && Array.isArray(mang) && mang.length === 3 &&
			mang.every(d => Object.keys(d).length === 5 && "id" in d && "ten" in d && "loai" in d && "gia" in d && "soLuong" in d);
	});
	kiem("T17 napGioHang trả về giỏ dùng được phương thức: tongTien() là 340000", () =>
		napGioHang(gioMau().xuatJSON()).tongTien() === 340000);
	kiem("T18 giỏ nạp lại vẫn cộng dồn đúng và độc lập với giỏ gốc", () => {
		const goc = gioMau();
		const moi = napGioHang(goc.xuatJSON());
		moi.them(sp("A", "thiep cuoi", 1500), 50);
		return moi.layDanhSach().length === 3 && moi.tongTien() === 415000 && goc.tongTien() === 340000;
	});
	kiem("T19 napGioHang(\"[]\") → giỏ rỗng, tongTien() là 0", () => napGioHang("[]").tongTien() === 0);
	kiem("T20 xuất → nạp → xuất cho ra đúng chuỗi ban đầu", () => {
		const chuoi = gioMau().xuatJSON();
		return napGioHang(chuoi).xuatJSON() === chuoi;
	});

	const soDat = ketQua.filter(k => k["Kết quả"] === "✅ Đạt").length;
	const tomTat = "KIỂM TRA BÀI B: " + soDat + "/" + ketQua.length + " đạt";
	console.table(ketQua);
	console.log(tomTat);
	if (typeof hienThi === "function") {
		hienThi("");
		hienThi(tomTat);
		for (const k of ketQua) {
			hienThi(k["Kết quả"] + "  " + k["Kiểm tra"] + (k["Lỗi"] ? "  → " + k["Lỗi"] : ""));
		}
	}
})();
