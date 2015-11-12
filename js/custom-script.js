var alphabet = ['A','B','C','D','E','F','G','H','I',
				'J','K','L','M','N','O','P','Q','R',
				'S','T','U','V','W','X','Y','Z'];
var words = [];
var n = 25;
var word_search;

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
		$('#get-words').hide();
		$('#entered-words').hide();
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
	word_search = new Array(n);
	for (var i = 0; i < n; i++) {
		word_search[i] = [];
		for(var j=0; j<n; j++)
			word_search[i].push('.');
	}

	// Place each word
	for(var i=0; i<words.length; i++){
		placeWord(words[i]);
	}

	// Fill the rest of the array with random letters
	hideLetters();
		
	// Display the word search
	displayWordSearch();
}

function placeWord(word){
	var success = false;
	while(!success){
		// Determine a random start coordinate
		// (at least a word length from right or bottom)
		var len = word.length;
		var start = {
			y: Math.floor(Math.random()*(n-len)),
			x: Math.floor(Math.random()*(n-len))
		};
		// Determine a random direction
		// 0: left to right
		// 1: top to bottom
		var direction = Math.floor(Math.random()*2);
		// Check for collisions with other words
		var collision = false;
		var current = '';
		for(var i=0; i<len; i++){
			if(direction == 0)
				current = word_search[start.y][start.x+i];
			else
				current = word_search[start.y+i][start.x];
			if(current != '.')
				collision = true;
		}
		// Place the word if no collision
		if(!collision){
			for(var i=0; i<len; i++){
				if(direction == 0)
					word_search[start.y][start.x+i] = word[i];
				else
					word_search[start.y+i][start.x] = word[i];
			}
			success = true;
		}
	}
	
}

function hideLetters(){
	for(var i=0; i<n; i++){
		for(var j=0; j<n; j++){
			if(word_search[i][j] == '.'){
				word_search[i][j] = 
					alphabet[Math.floor(Math.random()*alphabet.length)];
			}
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