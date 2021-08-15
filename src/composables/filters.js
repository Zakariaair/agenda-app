
const twoDigitsDate = (date) => {
	if(!date) return '';
	let year  = date.getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let day   = date.getDate().toString().padStart(2, "0");
	return (year + '-' + month + '-' + day);
}

const truncate = (value, limit) => {
	return value.substring(0, limit)
}

const toDate = (value, fullDate = false) => {
	value = String(value)
	const date = value.slice(8,10).trim();
	const month = value.slice(4,7).trim();
	const year = value.slice(11,15);

	if(!fullDate) return date + ' ' + month;
	else return date + ' ' + month + ' ' + year;
}

export { twoDigitsDate, truncate, toDate }