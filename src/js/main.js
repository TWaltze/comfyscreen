$(function() {
	$('.slideout-toggle').click(function() {
		if($('.slideout').hasClass('active')) {
			$('.slideout').removeClass('active')
		} else {
			$('.slideout').addClass('active')
		}
	});
});