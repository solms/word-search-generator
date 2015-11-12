var alphabet = ['A','B','C','D','E','F','G','H','I',
				'J','K','L','M','N','O','P','Q','R',
				'S','T','U','V','W','X','Y','Z'];
var words = [];
var n = 25;
var word_search = [];

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
	// Initialise an nxn array with ''s
	var row = [];
	for(var i=0; i<n; i++)
		row.push('.');
	for(var i=0; i<n; i++)
		word_search.push(row);
	// Place each word
	for(var i=0; i<words.length; i++){
		placeWord(words[i]);
	}
		
	// Display the word search
	displayWordSearch();
}

function placeWord(word){
	// Guess a random starting position at least
	// word.length from a side
	var l = word.length;
	var pos = [
		Math.floor(Math.random()*(n-2*l))+l,
		Math.floor(Math.random()*(n-2*l))+l
	];

	// Choose a random direction:
	// 0: left to right
	// 1: top to bottom
	var direction = Math.floor(Math.random()*2);

	// Check if there are any letters in the way in this direction
	var obstruction = false;
	var current = '';
	for(var i=0; i<l; i++){
		if(direction == 0)
			current = word_search[pos[0]][pos[1]+i];
		else
			current = word_search[pos[0]+i][pos[1]];
		if(current != '.')
			obstruction = true;			
	}

	// Retry placement if an obstruction is met
	if(obstruction)
		placeWord(word);
	// Otherwise place the word
	else{
		for(var i=0; i<l; i++){
			if(direction == 0){
				word_search[pos[0]][pos[1]+i] = word[i];

				console.log('Place word['+i+']('+word[i]+' of '+word+') at '+pos[0]+','+(pos[1]+i));
				console.log('word_search[pos[0]][pos[1]+i]: ' + word_search[pos[0]][pos[1]+i]);
			}
			else
				word_search[pos[0]+i][pos[1]] = word[i];
		}
	}
}

function displayWordSearch(){
	var ws_html = "";
	for(var i=0; i<n; i++){
		for(var j=0; j<n; j++){
			ws_html += word_search[i][j];
		}
		ws_html += '<br>'
	}
	$('#word-search').html(ws_html);
}