/* ĐÃ CHO SẴN — KHÔNG SỬA FILE NÀY.
   Các hàm trợ giúp để bạn nhìn thấy kết quả trên trang mà chưa cần học DOM. */

// In một dòng văn bản vào khung "Kết quả".
function hienThi(noiDung) {
	const khung = document.getElementById("ket-qua");
	khung.textContent = khung.textContent + noiDung + "\n";
}

// Bài A: vẽ lại danh sách tin (#list) từ một mảng object có title, date và phương thức tomTat().
function veDanhSachTin(dsBai) {
	const danhSach = document.getElementById("list");
	if (danhSach === null || !Array.isArray(dsBai)) {
		return;
	}
	danhSach.innerHTML = "";
	for (const bai of dsBai) {
		const muc = document.createElement("li");
		const ngay = document.createElement("span");
		const tieuDe = document.createElement("h3");
		const tomTat = document.createElement("p");
		ngay.className = "time";
		ngay.textContent = bai.date;
		tieuDe.textContent = bai.title;
		tomTat.textContent = bai.tomTat();
		muc.append(ngay, tieuDe, tomTat);
		danhSach.append(muc);
	}
}

// Bài B: vẽ giỏ hàng vào ô bên phải (#posts) từ mảng các dòng { ten, soLuong, thanhTien } và tổng tiền.
function veGioHang(dsDong, tongTien) {
	const o = document.getElementById("gio-hang");
	if (o === null || !Array.isArray(dsDong)) {
		return;
	}
	o.innerHTML = "";
	for (const dong of dsDong) {
		const muc = document.createElement("li");
		const ten = document.createElement("h5");
		const chiTiet = document.createElement("p");
		ten.textContent = dong.ten;
		chiTiet.textContent = `${dong.soLuong} cái — ${dong.thanhTien} đ`;
		muc.append(ten, chiTiet);
		o.append(muc);
	}
	const tong = document.createElement("li");
	tong.textContent = `Tổng: ${tongTien} đ`;
	o.append(tong);
}
