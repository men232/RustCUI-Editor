import _set from 'lodash/set';
import _get from 'lodash/get';

const MEMORY_STORAGE = {};

export function set(key, value, inMemory) {
	let storage = inMemory ? MEMORY_STORAGE : $require('$localStorage');
	let rootScope = $require('$rootScope');

	_set(storage, 'temp.' + key, value);
	if (!rootScope.$$phase) rootScope.$apply();
}

export function get(key, inMemory) {
	let storage = inMemory ? MEMORY_STORAGE : $require('$localStorage');
	return _get(storage, 'temp.' + key);
}

export function remove(key, inMemory) {
	set(key, undefined, inMemory);
}

export function clean(inMemory) {
	let storage = inMemory ? MEMORY_STORAGE : $require('$localStorage');
	delete storage.temp;
}

export function setModel(key, model, inMemory) {
	let value = model ? (model._id || model) : null;
	set(key, value, inMemory);
}

export function has(key, inMemory) {
	let value = get(key, inMemory);
	return value !== undefined;
}

export function eq(key, compare, inMemory) {
	let value = get(key, inMemory);

	if (compare && compare._id && compare._id === value) {
		return true;
	}

	return compare === value; 
}