// ==UserScript==
// @description Adds a one-click-spam button
// @include https://ticket.wikimedia.org/*
// @name OneClickSpam
// @version 0.1
// @author Kunal Mehta <legoktm@gmail.com>
// @license Public domain
// @updateURL https://raw.github.com/legoktm/ocs/master/ocs.user.js
// ==/UserScript==

function OMGSPAM( ticketid ) {
	// I'm not sure what this is for.
	var challengetoken = $('[name=ChallengeToken]').val();
	// This is the QueueID that we're currently in.
	var queueid = $('[title=Small]').attr('href').match(/QueueID=(\d+)/)[1];

	// 3 is the QueueID for "Junk"
	// I guess hardcoding it is fine.
	var url = 'https://ticket.wikimedia.org/otrs/index.pl?ChallengeToken=' + challengetoken + '&Action=AgentTicketMove&QueueID=' + queueid + '&TicketID=' + ticketid + '&DestQueueID=3';
	$.get(url, function () {
		// TODO: Implement error handling here.
		$('#TicketID_' + ticketid ).hide();
	});
}

function blah() {
	//no-op
	// There's probably a better way to do this, except I don't know JavaScript.
}
$( document ).ready(function() {
	$('.MasterAction').each( function() {
		$this = $( this );
		var ticket = $this.attr('id').match(/TicketID_(\d+)/)[1];
		$this.find( 'ul.Actions').append('<li><button class="one-click-spam" onclick="blah()" ticket="' + ticket + '">1-click spam</button></li>');
	});

	$('.one-click-spam').click( function( event ){
		event.preventDefault();
		event.stopPropagation();
		OMGSPAM($(this).attr('ticket'));
	});
});
