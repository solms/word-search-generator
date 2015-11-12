var alphabet = ['A','B','C','D','E','F','G','H','I',
				'J','K','L','M','N','O','P','Q','R',
				'S','T','U','V','W','X','Y','Z'];
var words = [];
var word_pos;
word_count = 0;
var n = 10;
var word_search;
var title = '';

$(document).ready(function(){
 	$('#continue').on('click', function(){
 		$('#welcome').hide();
 		$('#get-title').fadeIn('slow');
 	});
 	// Read enter keypress for title enter textbox
 	$(document).on('keypress', '#get-title #title', function(e) {
        if ( e.keyCode == 13 ) {  // detect the enter key
            title = $('#get-title #title').val().toUpperCase();
			if(title != ''){
				$('#get-title').hide();
 				$('#get-words').fadeIn('slow');
			}
        }
    });

	// Read enter keypress for word enter textbox
 	$(document).on('keypress', '#get-words #word', function(e) {
        if ( e.keyCode == 13 ) {  // detect the enter key
            var word = $('#get-words #word').val().toUpperCase();
			if(words.indexOf(word) == -1 && word != ''){
				words.push(word);
				$('#get-words #word').val('');
				refreshWordsList();
			}
			else{
				alert("You've already entered that word!");
			}	
        }
    });

	$('#get-words #finished').on('click', function(){
		$('#get-words').hide();
		generateWordSearch();
	});

	$('#show-secrets').on('click', function(){
		if($('#show-secrets').text() == 'Show secret words'){
			$('.secret-word').css({
			      'color': '#F26C4F',
			      'font-size': '22px'
			    });
			$('#show-secrets').text('Hide secret words');	
		}
		else{
			$('.secret-word').css({
			      'color': '#1B325F',
			      'font-size': '20px'
			    });
			$('#show-secrets').text('Show secret words');
		}
			
	});
});

function refreshWordsList(){
	var display_list = "";
	for(var i=0; i<words.length; i++){
		display_list += words[i];
		if(i != words.length-1)
			display_list += ' | '
	}
		
	$('#entered-words #words-list').html('<p>'+display_list+'</p>');
	$('#entered-words').fadeIn('fast');
}

function generateWordSearch(){
	// Initialise an nx2n array with ''s
	word_search = new Array(n);
	for (var i = 0; i < n; i++) {
		word_search[i] = [];
		for(var j=0; j<2*n; j++)
			word_search[i].push('.');
	}

	// Place each word
	word_pos = new Array(words.length);
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
			x: Math.floor(Math.random()*(2*n-len))
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
				if(direction == 0){
					word_search[start.y][start.x+i] = ['<span class="secret-word"> '+word[i]+'</span>'];
				}
				else{
					word_search[start.y+i][start.x] = ['<span  class="secret-word"> '+word[i]+'</span>'];
				}					
			}
			
			success = true;
		}
	}
	
}

function hideLetters(){
	for(var i=0; i<n; i++){
		for(var j=0; j<2*n; j++){
			if(word_search[i][j] == '.'){
				word_search[i][j] = 
					' ' + alphabet[Math.floor(Math.random()*alphabet.length)];
			}
		}
	}
}

function displayWordSearch(){
	var ws_html = "";
	for(var i=0; i<n; i++){
		for(var j=0; j<2*n; j++){
			ws_html += word_search[i][j];
		}
		ws_html += '<br>'
	}
	$('#word-search').html(ws_html);
	$('#word-search-container').show();
	$('#title').text(title);
}