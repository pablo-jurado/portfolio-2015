// CODE BY MAFLORAL 2011

// GLOBAL VARIABLES FOR AUDIO PLAYER
var jpPlayTime, jpTotalTime, jpTitle, jpAlbum, player, messageTimerID;
var currentTrack = 0;

var firstLoad = true;


jQuery(document).ready(function($) {

	// AUDIO PLAYER
	jpPlayTime = $("#jplayer_play_time");
	jpTotalTime = $("#jplayer_total_time");
	jpInfo = $('#info');

	$("#jquery_jplayer").jPlayer({
	    // J PLAYER SWF PATH IN JS FOLDER
		swfPath: 'js/',
		ready: function() {			
			playListChange(Math.floor(Math.random() * playList.length));
		}
	})
	.jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
		jpPlayTime.text($.jPlayer.convertTime(playedTime));
		jpTotalTime.text($.jPlayer.convertTime(totalTime));		
	})
	.jPlayer("onSoundComplete", function() {
		playListNext();
	});

	$('.tracks a').live('click', function() {		
		var file = $(this).attr('href');
		var title = $(this).text();
		var album = $(this).parents('.tracks').children('h3').text();
		
		playListChange(file, title, album);
		
		return false;
	});
	
	$('.song').live('click', function() {
		var file = $(this).attr('href');
		var title = $(this).text();
		
		playListChange(file, title, '');
		
		return false;
	});
	
	$("#next").click(function() { playListNext(); }); // LISTEN FOR NEXT TRACK BUTTON CLICK	
	$("#previous").click(function() { playListPrev(); }); //LISTEN FOR PREVIOUS TRACK BUTTON CLICK

	// CHANGE CURRENT SONG
	function playListChange(track, title, album) {		
		if (typeof track === 'number') {			
			currentTrack = track;
		} else {	
			var i = 0;
			var found = false;
			for (i=0; i < playList.length; i++) {
				if (playList[i].file === track) {
					currentTrack = i;
					found = true;
					break;
				}
			}
			
			if (found === false) {
				var info = [];
				info.title = title;
				info.album = album;
				info.file = track;
				playList.push(info);
				currentTrack = (playList.length - 1);
			}
		}
		
		$('#jquery_jplayer').jPlayer("setFile", playList[currentTrack].file);
		$('#jquery_jplayer').jPlayer("play");
		
		if (playList[currentTrack].album.length > 0)
			jpInfo.html('Song Playing: <span class="title">' + playList[currentTrack].title + 
				'</span> Album: <span class="album">' + playList[currentTrack].album + '</span>');
		else
			jpInfo.html('Song Playing: <span class="title">' + playList[currentTrack].title + '</span>');
			
		showMessage('<small>Song Playing:</small> <strong><em>&quot;' + playList[currentTrack].title + '&quot;</em></strong>');
	}
	
	// PLAY NEXT TRACK IF ON LAST IT WILL PLAY FIRST TRACK
	function playListNext() {
		var index = (currentTrack + 1 < playList.length) ? currentTrack + 1 : 0;
		playListChange(index);
	}
	
	//PLAY PREVIOUS TRACK IF ON LAST IT WILL PLAY FIRST TRACK
	function playListPrev() {
		var index = (currentTrack - 1 >= 0) ? currentTrack - 1 : playList.length-1;
		playListChange(index);
	}	
	

	// SHOW TITLE MESSAGE ABOVE THE PLAYER
	function showMessage(message1) {
		var rightPos;
		var message1Box = $('#message1');
		
		if (message1Box.length > 0) {
			clearInterval(message1TimerID);
			message1Box.html(message1);
		} else {
			rightPos = (screen.width - 1120) /2;				
			$('<div id="message1" style="display: none;">' + message1 + '</div>').appendTo('#player .wrapper');		
			$('#message1').css('right', rightPos).show(500);			
		}

		message1TimerID = setInterval(hideMessages, 6000);
	}
	
	function hideMessages() {
		clearInterval(message1TimerID);
		$('#message1').hide(500, deleteMessages);
	}
	
	function deleteMessages() {
		$('#message1').remove();
	}
	
});