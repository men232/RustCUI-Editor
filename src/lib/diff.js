export default function diff(value, compare) {
	let result = {};
	let keys = Object.keys(compare);
	let hasDiff = false;

	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];

		if (Array.isArray(compare[key])) {
			if (!angular.equals(compare[key], value[key])) {
				result[key] = compare[key];
				hasDiff     = true;
			}
		} else if (compare[key] !== value[key]) {
			result[key] = compare[key];
			hasDiff     = true;
		}
	}

	return hasDiff ? result : null;
}