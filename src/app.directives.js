import 'bootstrap/js/scrollspy';

angular
	.module('app')
	.directive('sideNavigation', sideNavigation)
	.directive('minimalizaMenu', minimalizaMenu)
	.directive('sparkline', sparkline)
	.directive('icheck', icheck)
	.directive('panelTools', panelTools)
	.directive('panelToolsFullscreen', panelToolsFullscreen)
	.directive('smallHeader', smallHeader)
	.directive('landingScrollspy', landingScrollspy)
	.directive('loader', loader);

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element) {
			// Call the metsiMenu plugin and plug it to sidebar navigation
			$(element).metisMenu();

			// Colapse menu in mobile mode after click on element
			var menuElement = $('#side-menu a:not([href$="\\#"])');
			menuElement.click(function() {

				if ($(window).width() < 769) {
					$("body").toggleClass("show-sidebar");
				}
			});
		}
	};
};

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaMenu($rootScope) {
	return {
		restrict: 'EA',
		template: '<div class="header-link hide-menu" ng-click="minimalize()"><i class="fa fa-bars"></i></div>',
		controller: function($scope, $element) {
			$scope.minimalize = function() {
				if ($(window).width() < 769) {
					$("body").toggleClass("show-sidebar");
				} else {
					$("body").toggleClass("hide-sidebar");
				}
			};
		}
	};
};


/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline() {
	return {
		restrict: 'A',
		scope: {
			sparkData: '=',
			sparkOptions: '=',
		},
		link: function(scope, element, attrs) {
			scope.$watch(scope.sparkData, function() {
				render();
			});
			scope.$watch(scope.sparkOptions, function() {
				render();
			});
			var render = function() {
				$(element).sparkline(scope.sparkData, scope.sparkOptions);
			};
		}
	};
};

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, element, $attrs, ngModel) {
			return $timeout(function() {
				var value;
				value = $attrs['value'];

				$scope.$watch($attrs['ngModel'], function(newValue) {
					$(element).iCheck('update');
				});

				return $(element).iCheck({
					checkboxClass: 'icheckbox_square-green',
					radioClass: 'iradio_square-green'

				}).on('ifChanged', function(event) {
					if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
						$scope.$apply(function() {
							return ngModel.$setViewValue(event.target.checked);
						});
					}
					if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
						return $scope.$apply(function() {
							return ngModel.$setViewValue(value);
						});
					}
				});
			});
		}
	};
}


/**
 * panelTools - Directive for panel tools elements in right corner of panel
 */
function panelTools($timeout) {
	return {
		restrict: 'A',
		scope: {
			onClose: '='
		},
		template: `
			<div class="panel-tools">
				<a ng-click="showhide()"><i class="fa fa-chevron-up"></i></a>
				<a ng-if="onClose" ng-click="closebox()"><i class="fa fa-times"></i></a>
			</div>
		`,
		controller: function($scope, $element) {
			// Function for collapse ibox
			$scope.showhide = function() {
					var hpanel = $element.closest('div.hpanel');
					var icon = $element.find('i:first');
					var body = hpanel.find('div.panel-body');
					var footer = hpanel.find('div.panel-footer');
					body.slideToggle(300);
					footer.slideToggle(200);
					// Toggle icon from up to down
					icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
					hpanel.toggleClass('').toggleClass('panel-collapse');
					$timeout(function() {
						hpanel.resize();
						hpanel.find('[id^=map-]').resize();
					}, 50);
				},

				// Function for close ibox
				$scope.closebox = function() {
					var hpanel = $element.closest('div.hpanel');
					hpanel.remove();
					$scope.onClose();
				};
		}
	};
};

/**
 * panelToolsFullscreen - Directive for panel tools elements in right corner of panel with fullscreen option
 */
function panelToolsFullscreen($timeout) {
	return {
		restrict: 'A',
		scope: true,
		templateUrl: 'views/common/panel_tools_fullscreen.html',
		controller: function($scope, $element) {
			// Function for collapse ibox
			$scope.showhide = function() {
				var hpanel = $element.closest('div.hpanel');
				var icon = $element.find('i:first');
				var body = hpanel.find('div.panel-body');
				var footer = hpanel.find('div.panel-footer');
				body.slideToggle(300);
				footer.slideToggle(200);
				// Toggle icon from up to down
				icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
				hpanel.toggleClass('').toggleClass('panel-collapse');
				$timeout(function() {
					hpanel.resize();
					hpanel.find('[id^=map-]').resize();
				}, 50);
			};

			// Function for close ibox
			$scope.closebox = function() {
				var hpanel = $element.closest('div.hpanel');
				hpanel.remove();
				if ($('body').hasClass('fullscreen-panel-mode')) {
					$('body').removeClass('fullscreen-panel-mode');
				}
			};

			// Function for fullscreen
			$scope.fullscreen = function() {
				var hpanel = $element.closest('div.hpanel');
				var icon = $element.find('i:first');
				$('body').toggleClass('fullscreen-panel-mode');
				icon.toggleClass('fa-expand').toggleClass('fa-compress');
				hpanel.toggleClass('fullscreen');
				setTimeout(function() {
					$(window).trigger('resize');
				}, 100);
			};
		}
	};
}

/**
 * smallHeader - Directive for page title panel
 */
function smallHeader() {
	return {
		restrict: 'A',
		scope: true,
		controller: function($scope, $element) {
			$scope.small = function() {
				var icon = $element.find('i:first');
				var breadcrumb = $element.find('#hbreadcrumb');
				$element.toggleClass('small-header');
				breadcrumb.toggleClass('m-t-lg');
				icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
			};
		}
	};
}

function landingScrollspy() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(element).scrollspy({
				target: '.navbar-fixed-top',
				offset: 80
			});
		}
	};
}

function loader() {
	return {
		restrict: 'EA',
		scope: {
			show: '=',
		},
		controller,
		template: '<div ng-class="{in: show, out: hide}" class="animated loader"><div class="spinner"><div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div></div>',
	};

	/*@ngInject*/
	function controller($scope, $element) {
		let hasDisplayed = false;
		$scope.hide = false;

		$element.children().on('webkitAnimationEnd oanimationend msAnimationEnd animationend', () => {
			hasDisplayed = false;
			$scope.hide = false;
		});

		$scope.$watch('show', (value) => {
			hasDisplayed = hasDisplayed || value;

			if (hasDisplayed) {
				$scope.hide = !value;
			}
		});
	}
}