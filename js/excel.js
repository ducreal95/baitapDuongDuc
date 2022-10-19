function exportToExcel() {
	if (info_electric.length === 0) {
		return;
	}
	let wb;
	const ws = XLSX.utils.json_to_sheet(info_electric);
	wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws);
	console.log('wb', wb);
	XLSX.writeFile(wb, `infor_user_electricity.xlsx`);
}
document.querySelector('#excel-export').addEventListener('click', () => {
	exportToExcel();
})