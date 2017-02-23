/*
$(function () {
    $('.datepicker').datepicker();
});
*/

var Switchery = require('switchery');

var elem = document.querySelector('.js-switch');
if(elem){
var init = new Switchery(elem);
}


/*


$(document).ready(function(){
	$('.extend-link').click(function(e){
		e.preventDefault();
	});
});
*/
$(document).ready(function(){
	$('.nav-tabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
});