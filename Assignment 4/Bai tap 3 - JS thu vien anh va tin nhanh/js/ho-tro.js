/* ĐÃ CHO SẴN — KHÔNG SỬA FILE NÀY. */

// Trả về ngày hôm nay dạng "dd-mm-yyyy", cùng định dạng với các tin có sẵn.
function homNay() {
	const d = new Date();
	const ngay = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
	const thang = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1);
	return `${ngay}-${thang}-${d.getFullYear()}`;
}
