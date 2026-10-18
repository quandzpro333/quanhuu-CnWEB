/* ĐÃ CHO SẴN — KHÔNG SỬA FILE NÀY.
   Bộ kiểm tra tự động cho Bài B. Bấm nút "Chạy kiểm tra Bài B" ở cuối trang News,
   hoặc gõ kiemTra() trong Console. Bộ kiểm tra giả lập thao tác người dùng bằng dispatchEvent()
   và có đăng vài tin thử — hãy tải lại trang (F5) sau khi xem kết quả. */
function kiemTra() {
	const ketQua = [];
	const o = document.getElementById("o-tim-kiem");
	const ds = document.getElementById("list");
	const boDem = document.getElementById("bo-dem");
	const khongThay = document.getElementById("khong-thay");
	const oTieuDe = document.getElementById("tin-tieu-de");
	const oNoiDung = document.getElementById("tin-noi-dung");
	const nutDang = document.getElementById("nut-dang");
	const baoLoi = document.getElementById("bao-loi");

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

	// Giả lập người dùng gõ từ khoá rồi nhả phím.
	function go(tuKhoa) {
		o.value = tuKhoa;
		o.dispatchEvent(new Event("keyup"));
	}
	// Giả lập người dùng điền form và bấm "Đăng".
	function dang(tieuDe, noiDung) {
		oTieuDe.value = tieuDe;
		oNoiDung.value = noiDung;
		nutDang.dispatchEvent(new Event("click", { bubbles: true }));
	}
	function cacMuc() {
		return Array.from(ds.querySelectorAll("li"));
	}
	function biAn(phanTu) {
		return phanTu.classList.contains("an");
	}
	// Một <li> có khớp từ khoá không (theo đặc tả: tìm trong h3 và p, không phân biệt hoa thường).
	function khop(muc, tuKhoa) {
		const vanBan = muc.querySelector("h3").textContent + " " + muc.querySelector("p").textContent;
		return vanBan.toLowerCase().includes(tuKhoa.toLowerCase());
	}
	// Trạng thái ẩn/hiện của mọi <li> có đúng với từ khoá không.
	function locDung(tuKhoa) {
		return cacMuc().every(muc => biAn(muc) === !khop(muc, tuKhoa));
	}
	function soHien() {
		return cacMuc().filter(muc => !biAn(muc)).length;
	}
	function chuDem() {
		return `Đang hiển thị ${soHien()}/${cacMuc().length} tin`;
	}

	go("");
	const N = cacMuc().length;

	// --- F1 + F2: bộ đếm và lọc ---
	kiem("T1  không có từ khoá: hiện tất cả, bộ đếm \"Đang hiển thị N/N tin\"", () =>
		soHien() === N && boDem.textContent === `Đang hiển thị ${N}/${N} tin`);
	kiem("T2  gõ \"cotton\": chỉ còn các tin có chữ cotton trong tiêu đề hoặc nội dung", () => {
		go("cotton");
		return locDung("cotton") && soHien() >= 2 && soHien() < N;
	});
	kiem("T3  không phân biệt hoa thường: \"CoTToN\" cho kết quả như \"cotton\"", () => {
		go("CoTToN");
		return locDung("cotton") && soHien() >= 2;
	});
	kiem("T4  từ khoá chỉ có trong nội dung (\"phong bì\") vẫn tìm thấy", () => {
		go("phong bì");
		return locDung("phong bì") && soHien() >= 1;
	});
	kiem("T5  bộ đếm cập nhật theo kết quả lọc", () => {
		go("letterpress");
		return soHien() < N && boDem.textContent === chuDem();
	});

	// --- F3: thông báo không tìm thấy ---
	kiem("T6  không tin nào khớp: #khong-thay hiện ra với đúng nội dung, bộ đếm 0/N", () => {
		go("zzzz");
		return soHien() === 0 && !biAn(khongThay) &&
			khongThay.textContent === 'Không tìm thấy tin nào cho "zzzz"' &&
			boDem.textContent === `Đang hiển thị 0/${N} tin`;
	});
	kiem("T7  từ khoá chứa thẻ HTML được hiện nguyên văn, không thành phần tử", () => {
		go("<b>x</b>");
		return khongThay.querySelector("b") === null && khongThay.textContent === 'Không tìm thấy tin nào cho "<b>x</b>"';
	});
	kiem("T8  xoá từ khoá: hiện lại tất cả, #khong-thay ẩn, cả trang chỉ có một #khong-thay", () => {
		go("");
		return soHien() === N && biAn(khongThay) && document.querySelectorAll("#khong-thay").length === 1;
	});

	// --- F4: Read more ---
	kiem("T9  bấm \"Read more >>\": đoạn văn có lớp day-du, nút đổi thành \"Thu gọn <<\"; bấm lần nữa thì trở lại", () => {
		const muc = cacMuc()[0];
		const nut = muc.querySelector(".more");
		const doan = muc.querySelector("p");
		nut.click();
		const mo = doan.classList.contains("day-du") && nut.textContent === "Thu gọn <<";
		nut.click();
		const dong = !doan.classList.contains("day-du") && nut.textContent === "Read more >>";
		return mo && dong;
	});
	kiem("T10 bấm vào tiêu đề hoặc đoạn văn (không phải nút) thì không có gì thay đổi", () => {
		const muc = cacMuc()[1];
		const truoc = muc.innerHTML;
		muc.querySelector("h3").click();
		muc.querySelector("p").click();
		muc.click();
		return muc.innerHTML === truoc && muc.className === "";
	});
	kiem("T11 mở tin thứ nhất không làm tin thứ hai mở theo", () => {
		const hai = cacMuc();
		hai[0].querySelector(".more").click();
		const dung = hai[0].querySelector("p").classList.contains("day-du") && !hai[1].querySelector("p").classList.contains("day-du");
		hai[0].querySelector(".more").click();
		return dung;
	});

	// --- F5: đăng tin ---
	kiem("T12 thiếu tiêu đề hoặc thiếu nội dung: báo lỗi đúng câu, không thêm tin", () => {
		dang("", "Có nội dung");
		const a = baoLoi.textContent === "Vui lòng nhập đủ tiêu đề và nội dung." && cacMuc().length === N;
		dang("Có tiêu đề", "");
		return a && baoLoi.textContent === "Vui lòng nhập đủ tiêu đề và nội dung." && cacMuc().length === N;
	});
	kiem("T13 đăng hợp lệ: <li> mới nằm ĐẦU danh sách, đủ span.time, h3, p, button.more", () => {
		dang("Tin thử số 1", "Nội dung thử số 1.");
		const muc = ds.firstElementChild;
		const nut = muc.querySelector("button.more");
		return cacMuc().length === N + 1 &&
			muc.querySelector("span.time").textContent === homNay() &&
			muc.querySelector("h3").textContent === "Tin thử số 1" &&
			muc.querySelector("p").textContent === "Nội dung thử số 1." &&
			nut !== null && nut.textContent === "Read more >>" && nut.type === "button";
	});
	kiem("T14 sau khi đăng: hai ô nhập trống, hết báo lỗi, bộ đếm tăng", () =>
		oTieuDe.value === "" && oNoiDung.value === "" && baoLoi.textContent === "" &&
		boDem.textContent === `Đang hiển thị ${N + 1}/${N + 1} tin`);
	kiem("T15 nội dung người dùng nhập được hiện nguyên văn, không thành thẻ HTML", () => {
		const tieuDe = '<img src="x" alt="chen-the">';
		const noiDung = "<i>nghiêng</i> & <script>1</script>";
		dang(tieuDe, noiDung);
		const muc = ds.firstElementChild;
		return muc.querySelector("img") === null && muc.querySelector("i") === null && muc.querySelector("script") === null &&
			muc.querySelector("h3").textContent === tieuDe && muc.querySelector("p").textContent === noiDung;
	});
	kiem("T16 nút \"Read more >>\" của tin VỪA ĐĂNG cũng hoạt động", () => {
		const muc = ds.firstElementChild;
		const nut = muc.querySelector(".more");
		nut.click();
		const mo = muc.querySelector("p").classList.contains("day-du") && nut.textContent === "Thu gọn <<";
		nut.click();
		return mo && nut.textContent === "Read more >>";
	});
	kiem("T17 đang lọc \"cotton\" mà đăng tin không chứa cotton: tin mới bị ẩn, bộ đếm vẫn đúng", () => {
		go("cotton");
		dang("Tin thử số 3", "Không liên quan.");
		const muc = ds.firstElementChild;
		return muc.querySelector("h3").textContent === "Tin thử số 3" && biAn(muc) && locDung("cotton") && boDem.textContent === chuDem();
	});
	kiem("T18 đang lọc \"cotton\" mà đăng tin CÓ chữ Cotton: tin mới hiện ra", () => {
		dang("Giấy Cotton về hàng", "Lô mới.");
		const muc = ds.firstElementChild;
		return !biAn(muc) && locDung("cotton") && boDem.textContent === chuDem();
	});

	go("");

	const soDat = ketQua.filter(k => k["Kết quả"] === "✅ Đạt").length;
	const tomTat = "KIỂM TRA BÀI B: " + soDat + "/" + ketQua.length + " đạt  (tải lại trang để xoá các tin thử)";
	console.table(ketQua);
	console.log(tomTat);
	const khung = document.getElementById("ket-qua");
	khung.textContent = tomTat + "\n" +
		ketQua.map(k => k["Kết quả"] + "  " + k["Kiểm tra"] + (k["Lỗi"] ? "  → " + k["Lỗi"] : "")).join("\n");
	return soDat;
}

document.getElementById("nut-kiem-tra").addEventListener("click", kiemTra);
