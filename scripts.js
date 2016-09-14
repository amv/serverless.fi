$(document).ready(function() {

    $('a[href*="#"]:not([href="#"])').click(smoothScroll);

    $.ajax({
        method: "GET",
        url: "https://api.meetup.com/Helsinki-serverless/events?&sign=true&photo-host=public",
        dataType: "jsonp",
        headers: {"Access-Control-Allow-Origin": "http://dev.serverless.fi"}
    })
        .done(function(data) {
            setEventData(data);
        })
        .fail(function() {
            setNoUpcomingEvents();
        });



    $('#presentation-toggle').click(showMore);

    if (window.matchMedia('(min-width: 1630px)').matches) {
        $('.presentation:nth-child(4)').show();
    }


});

var smoothScroll = function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
};

var setEventData = function(data) {
    var events=data.data;
    if(events.length!= 0 && events[0]){
        if(events[0].time){
            var date = new Date(events[0].time);
            $('#date').text(date.getDate()+ '.' + (date.getMonth()+1) + '.' + date.getFullYear() );
            $('#time').text(' at ' + date.getHours()+ ':' + date.getMinutes());
        }
        if(events[0].name){
            $('#event-title').text(events[0].name);
        }
        if(events[0].link){
            $('#event-url').attr('href', events[0].link );
        }

        if(events[0].venue){
            if(events[0].venue.name){
                $('#location').text('Location: ' + events[0].venue.name);
            }
        }
        if(events[0].rsvp_limit && events[0].yes_rsvp_count){
            $('#participants').text(events[0].yes_rsvp_count + '/' + events[0].rsvp_limit + ' participants');
        }
    } else {
        setNoUpcomingEvents();
    }

};

var setNoUpcomingEvents = function() {
    $('#next-event').html('<span >No upcoming events.</span>')
}

var showMore = function(){
    $('.presentation:nth-child(n+4)').show(); //heading + 2 presentations
    $('#presentation-toggle').text('View less').click(hide);
}

var hide = function(){
    $('#presentation-toggle').text('View all presentations').click(showMore);
    if (window.matchMedia('(min-width: 1630px)').matches) {
        $('.presentation:nth-child(n+5)').hide(); // heading + 2 presentations
    }else{
        $('.presentation:nth-child(n+4)').hide(); //heading + 3 presentations
    }
}
