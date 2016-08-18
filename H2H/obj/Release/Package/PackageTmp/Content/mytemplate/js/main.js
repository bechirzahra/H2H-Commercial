$(document).ready(function() {

/* Reset des input */
resetForm();

/* Gestion des textes des inputs */
$('input[type=text], textarea').focus(function() {
var defaultValue = $(this).attr('alt');
$(this).css({color:"#998876",fontStyle:'normal'});
if($(this).val() == defaultValue) {
$(this).val('');
}
$(this).prev('.error').fadeOut(200);
});
$('input[type=text], textarea').blur(function() {
var defaultValue = $(this).attr('alt');
if($(this).val() == '') {
$(this).val(defaultValue);
$(this).css({color:'#BEB4A9',fontStyle:'italic'});
}
});
/* Gestion du hover sur le submit */
$('#envoyer').hover(function() {
$(this).stop(true,true).animate({
opacity:1
},500,'easeOutExpo');
},function() {
$(this).stop(true,true).animate({
opacity:0.8
},500,'easeOutExpo');
});
/* Gestion des hover sur les mailto */
$('.mailto').hover(function() {
$(this).stop(true,true).animate({
opacity:1
},500,'easeOutExpo');
},function() {
$(this).stop(true,true).animate({
opacity:0.9
},500,'easeOutExpo');
});

/* Envoyer le mail */
$("#envoyer").click(function() {
	$('.msg-error').animate({opacity:"0"},250);
	resetForm();
	if($('#prenom').val() != "Prénom" && $('#nom').val() != "Nom" && $('#objet').val() != "Objet" && $('#mail').val() != "E-mail" && $('#message').val() != "Ecrivez ici votre message") {
	var data = "prenom="+$('#prenom').val();
	data += "&nom="+$('#nom').val();
	data += "&objet="+$('#objet').val();
	data += "&mail="+$('#mail').val();
	data += "&message="+$('#message').val();
	res = $.ajax({
	type: "POST",
	url: "mailer.php",
	data: data,
	async: false
	}).responseText;
	if(res=='ok'){
	$('#prenom').val($('#prenom').attr('alt'));
	$('#nom').val($('#nom').attr('alt'));
	$('#mail').val($('#mail').attr('alt'));
	$('#objet').val($('#objet').attr('alt'));
	$('#message').val($('#message').attr('alt'));
	$('.msg-error').attr('src','img/msg-valid.png');
	$('.msg-error').animate({opacity:"1"},250);
	}
}
else {
$('.msg-error').attr('src','img/msg-error.png');
if($('#prenom').val() == "Prénom") {
$('#prenom').addClass('input-text-198-error');
$('.msg-error').animate({opacity:"1"},250);
}
if($('#nom').val() == "Nom") {
$('#nom').addClass('input-text-217-error');
$('.msg-error').animate({opacity:"1"},250);
}
if($('#mail').val() == "E-mail") {
$('#mail').addClass('input-text-445-error');
$('.msg-error').animate({opacity:"1"},250);
}
if($('#objet').val() == "Objet") {
$('#objet').addClass('input-text-445-error');
$('.msg-error').animate({opacity:"1"},250);
}
if($('#message').val() == "Ecrivez ici votre message") {
$('#message').addClass('textarea-error');
$('.msg-error').animate({opacity:"1"},250);
}
}
return false;
});
});
function resetForm() {
$('#prenom').removeClass('input-text-198-error');
$('#nom').removeClass('input-text-217-error');
$('#mail').removeClass('input-text-445-error');
$('#objet').removeClass('input-text-445-error');
$('#message').removeClass('textarea-error');
}