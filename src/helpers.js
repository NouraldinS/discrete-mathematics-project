export const typeOf = (el) => el instanceof Array
	? 'Array'
	: el instanceof Object
		? 'Object'
		: !isNaN(el)
			? 'Number'
			: 'Unknown';

export const onlyUnique = (value, index, self) => self.indexOf(value) === index;
