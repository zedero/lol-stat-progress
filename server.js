var express = require('express');
var qs = require('querystring');
var mysql = require('mysql');
var app = express();
var fs = require("fs");
var request = require('request');
const SUBDOMAIN = '/api';
const RIOT_API_KEY = 'RGAPI-1765509c-a68e-4e52-8bd7-0350a7211a3b';
const RIOT_API_URL = 'https://na.api.pvp.net/api/lol/na/';
const RIOT_API_URL_STATIC = 'https://global.api.pvp.net/api/lol/static-data/na/';
const RIOT_API_QUERRIES = {
    summoner_by_name : 'v1.4/summoner/by-name/',
    matchlist : 'v2.2/matchlist/by-summoner/',
    match : 'v2.2/match/',
    static : {
        champions : 'v1.2/champion'
    }
};

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'lolstat'
});//socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
connection.connect();


app.get(SUBDOMAIN + '/test', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    res.end( JSON.stringify( {test:"succes"} ) );
});

app.get(SUBDOMAIN + '/getSummoners', function (req, res) {
    //console.log(req)
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    var QUERY = 'SELECT * FROM summoners';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        res.end( JSON.stringify( rows ) );
    });
});

app.get(SUBDOMAIN + '/getChampions', function (req, res) {
    //console.log(req)
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    var QUERY = 'SELECT * FROM static_champions';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        res.end( JSON.stringify( rows ) );
    });
});

app.get(SUBDOMAIN + '/getSummonerMatchData', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    var queryData = qs.parse(req._parsedUrl.query)
    let userId = queryData.userId;

    formatSummonersAvailableMatchData(userId);
    var QUERY = 'SELECT * FROM formatted_match_data WHERE userId = ' + userId;
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        res.end( JSON.stringify( rows ) );
    });
});

app.get(SUBDOMAIN + '/updateSummonerMatchData', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    var queryData = qs.parse(req._parsedUrl.query)
    let userId = queryData.userId;
    requestLatestMatches(userId);
    res.end( JSON.stringify( {startedUpdate:true} ) );

});


var callRiotApi = function(url,queryObject,callback) {
    let queryString = '?api_key=' + RIOT_API_KEY + '&' + createQueryUrl(queryObject);
    console.log(url + queryString);
    request(url + queryString, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body, response);
        } else {
            //console.log(response)//.caseless.dict)
            console.log(response.headers);
            /*
            'x-rate-limit-count': '1:10,4:600',
            'content-length': '60',
            */
        }
    });
}

var requestUserData = function(username) {
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.summoner_by_name + username, {

    }, function(body) {
        console.log(body)
        body = JSON.parse(body);
        Object.keys(body).forEach(function(key) {
            connection.query('REPLACE INTO summoners SET ?', body[key], function(err, result) {
              if (err) throw err;
          });
        });
    });
}

var requestStaticChampionData = function() {
    callRiotApi(RIOT_API_URL_STATIC + RIOT_API_QUERRIES.static.champions, {
        dataById : true
    }, function(body) {
        body = JSON.parse(body)['data'];
        Object.keys(body).forEach(function(key) {
            connection.query('REPLACE INTO static_champions SET ?', body[key], function(err, result) {
              if (err) throw err;
          });
        });
    });
}


var requestLatestMatches = function(userid) {
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.matchlist + userid, {
        seasons: "SEASON2016"
    }, function(body) {
        let data = JSON.parse(body)['matches'];
        data.forEach(function(_data){
            _data.summonerId = userid;
            connection.query('REPLACE INTO matches SET ?', _data, function(err, result) {
                if (err) throw err;
                stopUpdateLoop();
                startUpdateLoop();
            });
        });
    });
}

var requestMatchData = function(matchid) {
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.match + matchid, {
        includeTimeline: false
    }, function(body) {
        let data = {
            matchId : matchid,
            data: body
        }
        connection.query('REPLACE INTO raw_match_data SET ?', data, function(err, result) {
            if (err) throw err;
        });
    });
}

var createQueryUrl = function(params) {
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return query;
}

var formatMatchData = function(matchId,userId) {
    var QUERY = 'SELECT * FROM raw_match_data';
        QUERY += ' LEFT JOIN matches ON raw_match_data.matchId =  ' + matchId;
        QUERY += ' AND raw_match_data.matchId=matches.matchId AND matches.summonerId = '+ userId;
        QUERY += ' WHERE raw_match_data.matchId = ' + matchId;
        QUERY += ' AND matches.summonerId = ' + userId;
    //console.log(QUERY);
    connection.query(QUERY, function(err, row) {
        if (err) throw err;
        if(row.length > 0) {
            let rawdata = JSON.parse(row[0].data);
            let pId = getParticipantId(rawdata.participantIdentities , userId);
            let teamwin = getHasTeamWon(rawdata.teams,pId);
            let teamscore = getTeamScore(rawdata.participants , pId);
            let arrPos = pId -1;
            let data = {
                userId : userId,
                matchId : matchId,
                participantId : pId,
                matchDuration : rawdata.matchDuration,
                goldEarned : rawdata.participants[arrPos].stats.goldEarned,
                visionWardsBoughtInGame: rawdata.participants[arrPos].stats.visionWardsBoughtInGame,
                wardsPlaced: rawdata.participants[arrPos].stats.wardsPlaced,
                wardsKilled: rawdata.participants[arrPos].stats.wardsKilled,
                kills : rawdata.participants[arrPos].stats.kills,
                deaths : rawdata.participants[arrPos].stats.deaths,
                assists : rawdata.participants[arrPos].stats.assists,
                minionsKilled : rawdata.participants[arrPos].stats.minionsKilled,
                neutralMinionsKilled : rawdata.participants[arrPos].stats.neutralMinionsKilled,
                champLevel : rawdata.participants[arrPos].stats.champLevel,
                champion : rawdata.participants[arrPos].championId,
                lane : row[0].lane,
                role : row[0].role,
                queue : row[0].queue,
                season : row[0].season,
                date : row[0].timestamp,
                teamKills : teamscore.teamKills,
                teamDeaths : teamscore.teamDeaths,
                teamAssists : teamscore.teamAssists,
                timeline : JSON.stringify(rawdata.participants[arrPos].timeline),
                winner : teamwin
            }
            //console.log(data)
            connection.query('REPLACE INTO formatted_match_data SET ?', data, function(err, result) {
                if (err) throw err;
            });
        }
    });
}

var formatSummonersAvailableMatchData = function (userId) {
    var QUERY = 'SELECT matchId FROM matches WHERE summonerId = ' + userId;
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        rows.forEach(function(row){
            formatMatchData(row.matchId , userId)
        })
    });
}

var getParticipantId = function(participantIdentities , userId) {
    var id = -1;
    Object.keys(participantIdentities).forEach(function(element, index, array){
        var participant = participantIdentities[index];
        if(participant.player.summonerId == userId) {
            id = participant.participantId;
        };
    })
    return id;
}

var getTeamScore = function(participants, pId) {
    let team = {
        teamKills: 0,
        teamDeaths: 0,
        teamAssists: 0
    }
    if(pId > 5) {
        pId = 5;
    } else {
        pId = 0;
    }
    for (i = pId; i <= pId + 4; i++) {
        team.teamKills += participants[i].stats.kills
        team.teamAssists += participants[i].stats.assists
        team.teamDeaths += participants[i].stats.deaths
    }
    return team;
}
var getHasTeamWon = function(teams, pId) {

    if(pId > 5) {
        pId = 1;
    } else {
        pId = 0;
    }

    return teams[pId].winner;
}

var getMissingRawData = function() {
    var QUERY = 'SELECT distinct matchId FROM matches';
    QUERY = 'SELECT distinct matchId FROM matches WHERE NOT EXISTS (SELECT raw_match_data.matchId FROM raw_match_data WHERE matches.matchId = raw_match_data.matchId)';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        var limit = 1;
        var limCount = 0;

        rows.forEach(function(row){
            console.log('Total requests left:',rows.length)
            if(limCount < limit) {
                requestMatchData(row.matchId);
            }
            limCount++;
        });

        if(rows.length == 0) {
            stopUpdateLoopAndFormat()
        }
    });
}

var formatAllChampionData = function() {
    var QUERY = 'SELECT * FROM summoners';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        rows.forEach(function(data){
            formatSummonersAvailableMatchData(data.id);
        })
    });
}

var updateLoop;

var startUpdateLoop = function() {
    updateLoop = setInterval(function(){
        getMissingRawData();
    }, 2000);
}

var stopUpdateLoop = function () {
    clearInterval(updateLoop);
}

var stopUpdateLoopAndFormat = function () {
    formatAllChampionData();
    clearInterval(updateLoop);
}

var server = app.listen(8080, 'localhost', function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Api listening at http://%s:%s", host, port);

   startUpdateLoop();
   formatAllChampionData();
});
