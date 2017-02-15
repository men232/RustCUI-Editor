module.exports = (module) => {
	return angular
		.element(document.body)
		.injector()
		.get(module);
};