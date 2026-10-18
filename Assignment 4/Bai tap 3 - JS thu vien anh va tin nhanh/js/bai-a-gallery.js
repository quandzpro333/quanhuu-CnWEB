/* BÀI A — ĐIỀN VÀO CHỖ TRỐNG: Thư viện ảnh tương tác (index.html)
   File đã được điền đủ 27 chỗ trống để chạy trực tiếp. */

// ---------- Phần 1: Tìm phần tử ----------
// Phần tử ĐẦU TIÊN khớp bộ chọn CSS:
const anhLon = document.querySelector("#gallery > div > img");
// TẤT CẢ phần tử khớp bộ chọn CSS:
const dsAnhNho = document.querySelectorAll("#gallery ul li img");
const khungAnhNho = document.querySelector("#gallery ul");
// Tìm theo id:
const oTimKiem = document.getElementById("o-tim-kiem");

console.log(dsAnhNho.length);                     // in ra: 6

// ---------- Phần 2: Đi lại trên cây DOM ----------
console.log(khungAnhNho.firstChild.nodeType);     // in ra: 3
console.log(khungAnhNho.childNodes.length);       // in ra: 13
// Đi từ <img> lên phần tử cha của nó:
console.log(dsAnhNho[0].parentNode.nodeName);      // in ra: LI

// ---------- Phần 3: Tạo và chèn phần tử ----------
const chuThich = document.createElement("p");
chuThich.id = "chu-thich";
// (9) Gán nội dung dạng VĂN BẢN THUẦN (trình duyệt không được diễn giải thẻ HTML nếu có):
chuThich.textContent = "Bấm vào ảnh nhỏ để đổi ảnh lớn.";
// (10) Chèn vào CUỐI thẻ <div> đang chứa ảnh lớn:
anhLon.parentNode.append(chuThich);

// ---------- Phần 4: MỘT trình lắng nghe cho cả 6 ảnh nhỏ ----------
function doiAnh(e) {
	// Người dùng có thể bấm trúng khoảng trống của <ul> hoặc mép <li>: khi đó không làm gì cả.
	if (e.target.nodeName !== "IMG") {
		return;
	}

	// Thuộc tính alt của ảnh nhỏ lưu tên file ảnh lớn tương ứng.
	anhLon.src = `images/${e.target.alt}.jpg`;
	chuThich.textContent = `Đang xem: ${e.target.alt}.jpg`;

	// Bỏ lớp "dang-chon" ở mọi <li>, rồi gán cho <li> chứa ảnh vừa bấm.
	for (const anh of dsAnhNho) {
		anh.parentNode.className = "";
	}
	e.target.parentNode.className = "dang-chon";
}

khungAnhNho.addEventListener("click", doiAnh);

// Nếu viết  khungAnhNho.addEventListener("click", doiAnh());  thì:
//   (A) chạy giống hệt   (B) báo TypeError ngay khi tải trang   (C) chạy đúng nhưng chỉ một lần
//   → (B)

// ---------- Phần 5: Thay inline JS của ô tìm kiếm ----------
// Mã nguồn gốc viết thẳng trong HTML:  onFocus="javascript:if(this.value==this.defaultValue){this.value='';}"
const GOI_Y = "Enter search query";
oTimKiem.addEventListener("focus", () => {       // khi ô được chọn để gõ
	if (oTimKiem.value === GOI_Y) {
		oTimKiem.value = "";
	}
});
oTimKiem.addEventListener("blur", () => {              // khi rời khỏi ô
	if (oTimKiem.value === "") {
		oTimKiem.value = GOI_Y;
	}
});

// ---------- Phần 6: Gỡ trình lắng nghe ----------
const nutKhoa = document.getElementById("nut-khoa");
nutKhoa.addEventListener("click", (e) => {
	khungAnhNho.removeEventListener("click", doiAnh);
	chuThich.textContent = "Thư viện ảnh đã khoá.";
	console.log(e.type);                           // in ra: "click"
	console.log(e.target.id);                      // in ra: "nut-khoa"
});
// Giả sử ở Phần 4 đăng ký bằng hàm mũi tên vô danh:   addEventListener("click", (e) => doiAnh(e))
// thì  removeEventListener("click", (e) => doiAnh(e))  có gỡ được không? (có / không)  → không

// ---------- Phần 7: Thêm một mục vào cột bên phải ----------
const dsBaiViet = document.querySelector("#posts ul");
const mucMoi = document.createElement("li");
const tieuDe = document.createElement("h5");
tieuDe.textContent = "Khuyến mãi <b>thiệp cưới</b>";
mucMoi.append(tieuDe);
// (25) Chèn vào ĐẦU danh sách:
dsBaiViet.prepend(mucMoi);

// Trên trang, hai chữ "thiệp cưới" hiện IN ĐẬM hay hiện NGUYÊN cả cặp thẻ <b>…</b>?  → nguyên
console.log(dsBaiViet.querySelectorAll("li").length);     // in ra: 4