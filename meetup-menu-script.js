// ==UserScript==
// @name         Meetup Menu Script
// @namespace    http://www.meetup.com/
// @version      1.0.0
// @description  Changes Meetup.com's truncation of Meetup groups to allow for all current groups to be displayed in a 3 column dropdown layout
// @author       Josh Frankel <joshmfrankel@gmail.com>
// @match        http://*.meetup.com/*
// @grant        none
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js
$(document).ready(function(){
    var scriptName = 'Meetup Menu Script';
    $.ajax({
     url: "http://www.meetup.com/find/?allMeetups=true&sort=recommended&allMyGroups=true&skipHeader=true",
     dataType: 'text'
    }).done(function(data) {
        var listing = getMeetupListing(data);
        outputMeetupListing(listing);
        if (listing.length == 0) 
            console.warn(scriptName + ': Whoops, something went wrong or Meetup.com\'s code was updated. Troubleshooting: Try signing into your account. Make sure you are a member in at least one group.'); 
        else
            console.info(scriptName + ': Meetup listing script active. Check out that sweet menu!');
    }).fail(function(e) {
        console.error(scriptName + ': Whoops, something went wrong. Site could be down or the code could have updated'); 
    });
});

function getMeetupListing(data) {
  var collection = [];
  var counter = 0;
  var x = 0;
  var perRow = 5;
  $(data).find('.yourMeetups .groupCard').each(function(index, value) {
    var $value    = $(value);
    var name      = $value.data('name');
    var url       = $value.find('a.nametag-photo').attr('href');
    if (counter % perRow == 0) { x++; collection[x] = ''; }
    collection[x] += '<li><a href="' + url + '">' + name + '</a></li>';
    counter++;
   });
   return collection;
}

function outputMeetupListing(listing) {
    $('#C_groupsMenu').empty().html('<h3 style="margin:5px 20px 0;">My Meetups</h3>');
    $(listing).each(function(index, value) {
        if (value !== undefined) {
          $('#C_groupsMenu').append('<ul class="myGroupsSection">' + value + '</ul>');
        }
    });
    //$('#C_groupsMenu').append('<div class="margin-left" style="  position: absolute;top: 10px;left: 170px;"><a class="see-more-groups-button nav-button--gray small" href="http://www.meetup.com/find/?sort=recommended&amp;skipHeader=true&amp;allMyGroups=true">See all your groups <i class="icon-disclosure-right"></i></a></div>');
  $('#C_groupsMenu').css('width', '80%');
  $('#C_userNav #C_userLinks #nav-profile .dropdown-menu #C_groupsMenu ul').css('width', '250px').css('float', 'left');
  $('#C_userNav #C_userLinks #nav-profile .dropdown-menu #C_groupsMenu li a').css('font-size', '13px');
  $('#C_userNav #C_userLinks #nav-profile .dropdown-menu').css('width', '946px');
}
