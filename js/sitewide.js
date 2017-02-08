// 'use strict'; will help you write better code by being less lenient with syntax. Put the as the first line in all your js files.
'use strict';
      
// On DOM ready, create a new App. No need to store this to a var. Its more secure this way.         
$(function(){
	
	$('.modal, .close').on('click', function() {
		$('.modal, .picture, .close').fadeOut();
	});

    $.ajax({
		url: "https://www.reddit.com/r/EarthPorn/.json", 
		success: function(result) {
			var grid = result.data.children;
			console.log(grid);

			for (var i = 1; i < grid.length; i++) {
				var tile = grid[i].data;
				$(".grid").append(
					'<li>' + 
						'<a href="#" class="thumb" style="background-image: url('+ tile.thumbnail +')"></a>' +
						'<div class="info">' +
							'<a href="https://www.reddit.com/user/' + tile.author + '" class="title">posted by: <span>' + tile.author + '</span></a>' +
							'<p>' + cleanTitle(tile.title) + '</p>' +
							'<a href="https://www.reddit.com' + tile.permalink + '" class="post">go to Reddit post</a>' +
							'<a href="#" data-image="' + tile.preview.images[0].source.url + '" class="full">Full Image</a>' +
						'</div>' +
					'</li>'
				);
			}

			clickEvents();
    	}
	});
});

function cleanTitle(title) {
	//Clean up ugliness in the text
	return title.replace(/\[(.*?)\]/g, '');
}

function clickEvents() {
	$('.thumb').on('click', function() {
		var clicked = $(this).siblings('.info')
		if (clicked.hasClass('open')) {
			$(this).removeClass('open');
			clicked.removeClass('open');
		} else {
			$('.info, .thumb').removeClass('open');
			$(this).addClass('open');
			clicked.addClass('open');
		}
		return false;
	});

	$('.full').on('click', function() {
		var url = $(this).data('image');
		$('.picture').css({ 'background-image' : 'url(' + url + ')' });
		$('.modal, .picture, .close').fadeIn();
		return false;
	});
}