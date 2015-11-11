var alphabet = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z];
var words = [];

$(document).ready(function(){
	$('#entered-words').hide();

	$('#get-words #submit').on('click', function(){
		var word = $('#get-words #word').val().toUpperCase();
		if(words.indexOf(word) == -1){
			words.push(word);
			$('#get-words #word').val('');
			refreshWordsList();
		}
		else{
			alert("You've already entered that word!");
		}		
	});

	$('#get-words #finished').on('click', function(){
		generateWordSearch();
	});
});

function refreshWordsList(){
	var display_list = "";
	for(var i=0; i<words.length; i++)
		display_list += "<li>"+words[i]+"</li>";
	$('#entered-words #words-list').html(display_list);
	$('#entered-words').show('fast');
}

function generateWordSearch(){

}