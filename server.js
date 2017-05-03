//TODO ADD HTTPS OR SSL!!!!!!
//var memwatch = require('memwatch-next');
let express = require('express');
let qs = require('querystring');
let mysql = require('mysql');
let app = express();
var apiKey = require('./api_key');
//var fs = require("fs");
let request = require('request');
const SUBDOMAIN = '/api';
const RIOT_API_KEY = apiKey.apiKey;
const RIOT_API_URL = 'https://na1.api.riotgames.com/lol/';
let   RIOT_API_REGION = 'na1';
//const RIOT_API_URL_MASTERY = 'https://na.api.riotgames.com/championmastery/location/NA1/';
const RIOT_API_URL_STATIC = 'https://na1.api.riotgames.com/lol/';
//TODO DEPRICATED API ENPOINTS BY JULY 24TH 2017!!!  ACCOUNTID: 226919565
const RIOT_API_QUERRIES = {
    summoner_by_name : 'summoner/v3/summoners/by-name/',    //TODO https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/
    summoner_by_id : 'summoner/v3/summoners/',              //TODO https://na1.api.riotgames.com/lol/summoner/v3/summoners/
    matchlist : 'match/v3/matchlists/by-account/',          //TODO https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/
    match : 'match/v3/matches/',                            //TODO https://na1.api.riotgames.com/lol/match/v3/matches/
    static : {
        champions : 'static-data/v3/champions',             //TODO https://na1.api.riotgames.com/lol/static-data/v3/champions
        items : 'v3/items'
    }
};

//memwatch.on('leak', function(info) { console.log(info) });
/*
 *  Create database connection
 */
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database: 'lolstat',
});//socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
connection.connect();


//==============================================================================
/*
 *  Test functions
 */
app.get(SUBDOMAIN + '/test', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
        test: "succes"
    }));
});



//==============================================================================
/*
 *  RIOT api functions
 */
let callRiotApiQueue = [];
let callRiotApi = function(url, queryObject, callback, priority=false) {
    let queryString = '?api_key=' + RIOT_API_KEY + '&' + createQueryUrl(queryObject);
    let fullUrl = url + queryString;
    if(searchArrayForMatchingCall(callRiotApiQueue,fullUrl) === false) {
        if(priority) {
            /*
             Add new call to the 2nd position within the array.
             It may never be the 1st position as when a call is
             finished it takes the callback from the 1st item.
             */

            let pos = 0;
            if(callRiotApiQueue.length > 0) pos = 1;
            callRiotApiQueue.splice(pos,0,{
                url:        fullUrl,
                callback:   callback,
                isCalled:   false,
                retryCount : 0
            });
        } else {
            callRiotApiQueue.push({
                url:        fullUrl,
                callback:   callback,
                isCalled:   false,
                retryCount : 0
            });
        }
    }
};
console.log('Started queue system');
let callRiotApiLoop = setInterval(function() {
    callRiotApiQueueLoop();
}, 1300);

let callRiotApiQueueLoop = function() {
    if(callRiotApiQueue.length > 0 ) {
        if(!callRiotApiQueue[0].isCalled){
            console.log('Queue size:',callRiotApiQueue.length);
            callRiotApiQueue[0].isCalled = true;

            request(callRiotApiQueue[0].url, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    callRiotApiQueue[0].callback(body, response);
                    callRiotApiQueue.shift();

                    if(callRiotApiQueue.length === 0 ) {
                        console.log('Queue empty');
                    }
                } else {
                    if (!error && response.statusCode === 503) {
                        //callRiotApiQueue =[];
                        console.log('==== RIOT API error ====');
                        console.log('API not available');
                        console.log('');
                        console.log(' - Clearing queue');
                        console.log('========================');
                        console.log('Queue empty');
                    } else {
                        console.log('==== RIOT API error ====');
                        console.log('Status code: ',response.statusCode);
                        if( response !== undefined ){
                            console.log(response.headers);//['x-rate-limit-count']
                        }
                        if(callRiotApiQueue[0].retryCount >= 5) {
                            callRiotApiQueue.shift();
                            console.log('Reached retry limit. Removing call from queue.')
                        } else {
                            callRiotApiQueue[0].isCalled = false;
                            callRiotApiQueue[0].retryCount++;
                            console.log(callRiotApiQueue[0].url);
                            console.log('Performing retry: '+ callRiotApiQueue[0].retryCount + ' of 5');
                        }
                        console.log('========================');
                    }

                }
            });
            //--------
        }
    }
};

//==============================================================================
/*
 *  Helper functions
 */
let createQueryUrl = function(params) {
    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return query;
}

let searchArrayForMatchingCall = function(arr,query) {
    let found = false;
    arr.forEach(function(data){
        if(data.url === query) {
            found = true;
        }
    });
    return found;
}


//==============================================================================
/*
 * i/o functions for the site
 */
app.get(SUBDOMAIN + '/getSummoners', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    let QUERY = 'SELECT * FROM summoners';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        res.end( JSON.stringify( rows ) );
    });
});

app.get(SUBDOMAIN + '/getChampions', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    let QUERY = 'SELECT * FROM static_champions';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        res.end( JSON.stringify( rows ) );
    });
});

app.get(SUBDOMAIN + '/getItems', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    let QUERY = 'SELECT * FROM static_items';
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
    let queryData = qs.parse(req._parsedUrl.query);
    let userId = queryData.userId;

    formatSummonersAvailableMatchData(userId);
    let QUERY = 'SELECT * FROM formatted_match_data WHERE userId = ' + userId;
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
    let queryData = qs.parse(req._parsedUrl.query);
    let userId = queryData.userId;
    requestLatestMatches(userId,function(){
        res.end( JSON.stringify( {startedUpdate:true} ) );
    });
});

app.get(SUBDOMAIN + '/updateSummonerData', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    let queryData = qs.parse(req._parsedUrl.query);
    let userId = queryData.userId;

    requestSummonerData(userId,function(){
        //res.end( JSON.stringify( {startedUpdate:true} ) );

        let QUERY = 'SELECT * FROM summoners';
        connection.query(QUERY, function(err, rows) {
            if (err) throw err;
            res.end( JSON.stringify( rows ) );
        });
    });
});

//==============================================================================
/*
 * LOL data request and format functions
 */

let requestUserData = function(username) {
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.summoner_by_name + username, {

    }, function(body) {
        //console.log(body);
        body = JSON.parse(body);
        connection.query('REPLACE INTO summoners SET ?', body, function(err, result) {
            if (err) throw err;
        });
        /*Object.keys(body).forEach(function(key) {
            connection.query('REPLACE INTO summoners SET ?', body[key], function(err, result) {
                if (err) throw err;
            });
        });*/
    },true);
};

let requestSummonerData = function(id,callback = function(){}) {
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.summoner_by_id + id, {

    }, function(body) {
        body = JSON.parse(body);
        connection.query('REPLACE INTO summoners SET ?', body, function(err, result) {
            if (err) throw err;
            callback();
        });
        /*
        Object.keys(body).forEach(function(key) {
            connection.query('REPLACE INTO summoners SET ?', body[key], function(err, result) {
                if (err) throw err;
                callback();
            });
        });
        */
    },true);
};



let requestStaticChampionData = function() {
    callRiotApi(RIOT_API_URL_STATIC + RIOT_API_QUERRIES.static.champions, {
        dataById : true,
        champListData : "tags,stats"
    }, function(body) {
        body = JSON.parse(body)['data'];
        Object.keys(body).forEach(function(key) {
            body[key].tags = JSON.stringify(body[key].tags);
            body[key].stats = JSON.stringify(body[key].stats);
            connection.query('INSERT INTO static_champions SET ? ON DUPLICATE KEY UPDATE id=VALUES(id),name=VALUES(name),title=VALUES(title),tags=VALUES(tags),`key`=VALUES(`key`),`stats`=VALUES(`stats`)', body[key], function(err, result) {
                if (err) throw err;
            });
        });
    },true);
};

let getMissingDataCounter = 0;
let requestLatestMatches = function(userid,callback = function(){}) {
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.matchlist + userid, {
        //seasons: ""
    }, function(body) {
        let temp = JSON.parse(body);
        callback();
        if(temp.totalGames > 0) {
            let data = temp['matches'];
            getMissingDataCounter += data.length;
            data.forEach(function(_data){
                _data.summonerId = userid; //TODO: Depricated REMOVE THIS IN A LATER STAGE.
                _data.accountId = userid;
                _data.matchId = _data.gameId;
                connection.query('REPLACE INTO matches SET ?', _data, function(err, result) {
                    if (err) throw err;
                    getMissingDataCounter--;
                    if(getMissingDataCounter==0) {
                        getMissingRawData();
                    }
                });
            });
        } else {
            console.log("No recorded matches available for " + userid + " during season SEASON2017")
        }
        temp = null;
    },true);
};

let requestMatchData = function(matchid) {
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.match + matchid, {
        includeTimeline: false
    }, function(body) {
        let data = {
            matchId : matchid,
            data: body
        };
        connection.query('REPLACE INTO raw_match_data SET ?', data, function(err, result) {
            if (err) throw err;
            formatAllChampionData()
        });
    },false);
};



let formatMatchData = function(matchId,userId) {
    //TODO create a worker for this task in the future

    let QUERY = 'SELECT * FROM raw_match_data';
    QUERY += ' LEFT JOIN matches ON raw_match_data.matchId =  ' + matchId;
    QUERY += ' AND raw_match_data.matchId=matches.matchId AND matches.summonerId = '+ userId;
    QUERY += ' WHERE raw_match_data.matchId = ' + matchId;
    QUERY += ' AND matches.summonerId = ' + userId;
    //console.log(QUERY);
    connection.query(QUERY, function(err, row) {
        if (err) throw err;
        if(row.length > 0) {
            let rawdata = JSON.parse(row[0].data);
            if(rawdata.participantIdentities[0].hasOwnProperty("player") ) {
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
                    matchCreation : rawdata.matchCreation,
                    teamKills : teamscore.teamKills,
                    teamDeaths : teamscore.teamDeaths,
                    teamAssists : teamscore.teamAssists,
                    timeline : JSON.stringify(rawdata.participants[arrPos].timeline),
                    winner : teamwin
                };
                connection.query('REPLACE INTO formatted_match_data SET ?', data, function(err, result) {
                    if (err) throw err;

                });
                rawdata = "";
            }   else {
                console.log('Corrupt data: ',matchId,userId);
            }
        }
    });
};

let formatSummonersAvailableMatchData = function (userId) {
    /*
     *  TODO Make query more efficient by checking if an formatted match exists.
     */
    let QUERY = 'SELECT matchId FROM matches WHERE summonerId = ' + userId;
    QUERY = 'SELECT distinct matchId FROM raw_match_data WHERE NOT EXISTS (SELECT formatted_match_data.matchId FROM formatted_match_data WHERE raw_match_data.matchId = formatted_match_data.matchId)';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        rows.forEach(function(row){
            setTimeout(function(){
                formatMatchData(row.matchId , userId)
            }, 10);
            //formatMatchData(row.matchId , userId);
        })
    });
};

let formatAllSummonersAvailableMatchData = function (userId) {
    /*
     *  WARNING This method formats all available data from a summoner. This is an expensive task. Use with care!!!
     */
    let QUERY = 'SELECT matchId FROM matches WHERE summonerId = ' + userId;
    connection.query(QUERY, function (err, rows) {
        if (err) throw err;
        rows.forEach(function (row) {
            setTimeout(function () {
                formatMatchData(row.matchId, userId)
            }, 10);
            //formatMatchData(row.matchId , userId);
        })
    });
};

let getParticipantId = function(participantIdentities , userId) {
    /*
     TODO add an extra method to get the pId when identity list is empty
     */
    let id = -1;
    Object.keys(participantIdentities).forEach(function(element, index, array){
        let participant = participantIdentities[index];
        if(participant.player.summonerId == userId) {
            id = participant.participantId;
        }
    });
    return id;
};

let getTeamScore = function(participants, pId) {
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
};
let getHasTeamWon = function(teams, pId) {

    if(pId > 5) {
        pId = 1;
    } else {
        pId = 0;
    }

    return teams[pId].winner;
};

let getMissingRawData = function() {
    let QUERY = 'SELECT distinct matchId FROM matches';
    QUERY = 'SELECT distinct matchId FROM matches WHERE NOT EXISTS (SELECT raw_match_data.matchId FROM raw_match_data WHERE matches.matchId = raw_match_data.matchId)';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        let limit = 1;
        let limCount = 0;

        rows.forEach(function(row){

            //if(limCount < limit) {
            //console.log('Total requests left:',rows.length)
            requestMatchData(row.matchId);
            //}
            //limCount++;
        });

        if(rows.length == 0) {
            formatAllChampionData();
        }
    });
};

let formatAllChampionData = function() {
    let QUERY = 'SELECT * FROM summoners';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        rows.forEach(function(data){
            formatSummonersAvailableMatchData(data.id);
        })
    });
};


//==============================================================================
/*
 * Server initialization
 */
let server = app.listen(8080, 'localhost', function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Api listening at http://%s:%s", host, port);

    /*
     *   Update static data
     */
    requestStaticChampionData();


    /*
     *   Format any matches that is not yet formatted
     */
    formatAllChampionData();

    /*
     *   Start the update cycle. This gets missing match data
     */

    getMissingRawData();

});

/*TODO

 GET TOTAL OBJECTIVES
 GET OBJECTIVES / MINUTE or 10 minutes

 "teamId": 100,
 "winner": false,
 "firstBlood": false,
 "firstTower": true,
 "firstInhibitor": false,
 "firstBaron": false,
 "firstDragon": true,
 "firstRiftHerald": true,
 "towerKills": 2,
 "inhibitorKills": 0,
 "baronKills": 0,
 "dragonKills": 1,
 "riftHeraldKills": 1,
 "vilemawKills": 0,
 "dominionVictoryScore": 0
 */

/*
 Get all champion mastery entries sorted by number of champion points descending (RPC)
 /championmastery/location/{location}/player/{playerId}/champions







 */