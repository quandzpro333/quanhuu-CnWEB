/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------
const list = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const oTimKiem = document.getElementById("o-tim-kiem");
const khongThay = document.getElementById("khong-thay");
const nutDang = document.getElementById("nut-dang");
const tinTieuDe = document.getElementById("tin-tieu-de");
const tinNoiDung = document.getElementById("tin-noi-dung");
const baoLoi = document.getElementById("bao-loi");

function capNhatTrangThai() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	const cacMuc = Array.from(list.querySelectorAll("li"));
	let soHien = 0;

	cacMuc.forEach(muc => {
		const tieuDe = muc.querySelector("h3").textContent.toLowerCase();
		const noiDung = muc.querySelector("p").textContent.toLowerCase();
		
		if (tieuDe.includes(tuKhoa) || noiDung.includes(tuKhoa)) {
			muc.classList.remove("an");
			soHien++;
		} else {
			muc.classList.add("an");
		}
	});

	boDem.textContent = `Đang hiển thị ${soHien}/${cacMuc.length} tin`;

	if (soHien === 0 && cacMuc.length > 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
	} else {
		khongThay.classList.add("an");
	}
}

// Gọi hàm cập nhật lần đầu khi trang load xong
capNhatTrangThai();

// F2: Bắt sự kiện gõ phím vào ô tìm kiếm
oTimKiem.addEventListener("keyup", capNhatTrangThai);

// F4: Sự kiện đóng/mở nội dung tin
list.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON" && e.target.classList.contains("more")) {
		const nut = e.target;
		const doanVan = nut.previousElementSibling;
		
		doanVan.classList.toggle("day-du");
		if (doanVan.classList.contains("day-du")) {
			nut.textContent = "Thu gọn <<";
		} else {
			nut.textContent = "Read more >>";
		}
	}
});

// F5: Sự kiện đăng tin mới
nutDang.addEventListener("click", () => {
	const giaTriTieuDe = tinTieuDe.value;
	const giaTriNoiDung = tinNoiDung.value;

	if (giaTriTieuDe === "" || giaTriNoiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const liMoi = document.createElement("li");
	
	const theNgay = document.createElement("span");
	theNgay.className = "time";
	theNgay.textContent = homNay();
	
	const theTieuDe = document.createElement("h3");
	theTieuDe.textContent = giaTriTieuDe;
	
	const theNoiDung = document.createElement("p");
	theNoiDung.textContent = giaTriNoiDung;
	
	const nutXemThem = document.createElement("button");
	nutXemThem.type = "button";
	nutXemThem.className = "more";
	nutXemThem.textContent = "Read more >>";

	liMoi.append(theNgay, theTieuDe, theNoiDung, nutXemThem);
	list.prepend(liMoi);

	tinTieuDe.value = "";
	tinNoiDung.value = "";
	baoLoi.textContent = "";

	capNhatTrangThai();
});