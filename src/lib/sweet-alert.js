import swal from 'sweetalert';

module.exports = swal;

swal.swal = function() {
	swal.apply(swal, arguments);
};

swal.success = (title, message) => lite(title, message, 'success');

swal.error = (title, message) => lite(title, message, 'error');

swal.warning = (title, message) => lite(title, message, 'warning');

swal.info = (title, message) => lite(title, message, 'info');

swal.warningDialog = (opts, cb) => {
	swal.swal({
		title: 'Вы уверены?',
		text: opts.title || 'Очень важно!',
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: opts.confirm || 'Да, Уверен!',
		cancelButtonText: 'Закрыть',
		closeOnConfirm: false,
		showLoaderOnConfirm: true,
		html: true
	}, cb);
};

function lite(title, msg, type) {
	swal({
		title: title,
		text: msg,
		type: type,
		html: true
	});
}