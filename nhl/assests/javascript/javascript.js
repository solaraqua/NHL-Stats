var teamListElement = $("#team-list");
var teamElement = $("#team");
var playerListElement = $("#player-list");
var playerElement = $("#player");

// create a list of all team IDs for later
var teamIDList = [];
var playerIDList = [];

// link to the NHL API
var queryURL = "https://statsapi.web.nhl.com/api/v1/teams/"

// use ajax to get and return the data 
$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(data) {

    // for each team in the data, get the name and id
    for (i = 0; i < data.teams.length; i++) {
        var teamName = data.teams[i].name;
        var teamID = data.teams[i].id;

        var team = $("<li><button id='btn-" + teamID + "'>" + teamName + "</button></li>");
        teamListElement.append(team);
        teamIDList.push(teamID);
    };
    // when button is clicked pull up team JSON data
    for (i = 0; i < teamIDList.length; i++) {
        $("#btn-" + teamIDList[i]).on("click", function () {

            teamElement.html("");
            playerListElement.html("");
            playerElement.html("");
            playerIDList = [];
            
            // access target team api
            var teamID = $(this).attr("id");
            teamID = teamID.replace("btn-", "");
            var queryURL = "https://statsapi.web.nhl.com/api/v1/teams/" + teamID + "?hydrate=stats(splits=statsSingleSeason)/";

            // get and return the data with ajax
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(data) {

                // get stats about team name, win/losses, etc. 
                var abbrName = data.teams[0].abbreviation;
                var teamName = data.teams[0].name;
                var venue = data.teams[0].venue.name;
                var city = data.teams[0].venue.city;
                var site = data.teams[0].officialSiteUrl;
                var gamesPlayed = data.teams[0].teamStats[0].splits[0].stat.gamesPlayed;
                var wins = data.teams[0].teamStats[0].splits[0].stat.wins;
                var losses = data.teams[0].teamStats[0].splits[0].stat.losses;
                var points = data.teams[0].teamStats[0].splits[0].stat.pts;
                var rank = data.teams[0].teamStats[0].splits[1].stat.pts;

                // create stat elements
                var teamNameElement = $("<li>" + abbrName + " - " + teamName + "</li>");
                var venueElement = $("<li>" + venue + ", " + city + "</li>");
                var websiteElement = $("<a href='" + site + "'><li>" + site + "</li></a>");
                var gamesPlayedElement = $("<li>Games Played: " + gamesPlayed + "</li>");
                var winsElement = $("<li>Wins: " + wins + "</li>");
                var lossesElement = $("<li>Losses: " + losses + "</li>");
                var pointsElement = $("<li>Points: " + points + "</li>");
                var rankElement = $("<li>Rank: " + rank + "</li>");

                // append stat elements to the team element
                teamElement.append(teamNameElement);
                teamElement.append(venueElement);
                teamElement.append(websiteElement);
                teamElement.append(gamesPlayedElement);
                teamElement.append(winsElement);
                teamElement.append(lossesElement);
                teamElement.append(pointsElement);
                teamElement.append(rankElement);
            });
            // access the roster api
            var teamID = $(this).attr("id");
            teamID = teamID.replace("btn-", "");
            var queryURL = "https://statsapi.web.nhl.com/api/v1/teams/" + teamID + "/roster?hydrate=stats(splits=statsSingleSeason)/";
            console.log(queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(data) {

                // for each player in the data get their name and id
                for (i = 0; i < data.roster.length; i++) {
                    var playerName = data.roster[i].person.fullName;
                    var playerID = data.roster[i].person.id;
                    var jerseyNumber = data.roster[i].jerseyNumber;

                    var player = $("<li><button id='btn-" + playerID + "'>" + playerName + " (" + jerseyNumber + ")" + "</button></li>");
                    playerListElement.append(player);
                    playerIDList.push(playerID);
                };
                
          
                for (i = 0; i < playerIDList.length; i++) {
                    $("#btn-" + playerIDList[i]).on("click", function () {
                        playerElement.html("");

                        var playerID = $(this).attr("id");
                        playerID = playerID.replace("btn-", "");
                        var queryURL = "https://statsapi.web.nhl.com/api/v1/people/" + playerID + "?hydrate=stats(splits=statsSingleSeason)/";
                        console.log(queryURL);
                        var newQuery = "https://statsapi.web.nhl.com/api/v1/people/" + playerID + "/stats?stats=gameLog&season=20202021";

                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).done(function(data) {
                            var playerName = data.people[0].fullName;
                            var number = data.people[0].primaryNumber;
                            var age = data.people[0].currentAge;
                            var height = data.people[0].height;
                            var weight = data.people[0].weight;
                            var position = data.people[0].primaryPosition.name;

                            var nationality = data.people[0].nationality;
                            var goals = data.people[0].stats[0].splits[0].stat.goals;
                            var assists = data.people[0].stats[0].splits[0].stat.assists;
                            var plusMinus = data.people[0].stats[0].splits[0].stat.plusMinus;

                            if(goals == null){
                                goals = 0;
                            }
                            if(assists == null){
                                assists = 0;
                            }
                            if(plusMinus == null){
                                plusMinus = 0;
                            }
                            // create stat elements
                            var playerNameElement = $("<li>" + playerName + "</li>");
                            var numberElement = $("<li>(" + number + ")</li>");
                            var ageElement = $("<li>Age: " + age + "</li>");
                            var heightElement = $("<li>Height: " + height + "</li>");
                            var weightElement = $("<li>Weight: " + weight + "</li>");
                            var positionElement = $("<li>Position: " + position + "</li>");
                            var nationElement = $("<li>Nationality: " + nationality + "</li>");

                            var goalsElement = $("<li>Goals: " + goals + "</li>");
                            var assistsElement = $("<li>Assists: " + assists + "</li>");
                            var plusMinusElement = $("<li>Plus/Minus: " + plusMinus + "</li>");

                            // append stat elements to the team element
                            playerElement.append(playerNameElement);
                            playerElement.append(numberElement);
                            playerElement.append(ageElement);
                            playerElement.append(heightElement);
                            playerElement.append(weightElement);
                            playerElement.append(positionElement);
                            playerElement.append(nationElement);

                            playerElement.append(goalsElement);
                            playerElement.append(assistsElement);
                            playerElement.append(plusMinusElement);
                        }); //end assemble player html
                    });     //end player button click
                };   //end player json
            });     // end assemble team hmtl
        }); // end team button click
    };      // end team json
});
