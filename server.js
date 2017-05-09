//TODO ADD HTTPS OR SSL!!!!!!
let apiKey = require('./api_key');
let config = require('./config');

let express = require('express');
let qs = require('querystring');
let mysql = require('mysql');
let app = express();

let request = require('request');
const SUBDOMAIN = '/api';
const RIOT_API_KEY = apiKey.apiKey;
const RIOT_API_REGION = 'na1';
const RIOT_API_URL = 'https://'+RIOT_API_REGION+'.api.riotgames.com/lol/';
const RIOT_API_URL_STATIC = 'https://na1.api.riotgames.com/lol/';

const RIOT_API_QUERRIES = {
    summoner_by_name : 'summoner/v3/summoners/by-name/',
    summoner_by_id : 'summoner/v3/summoners/',
    matchlist : 'match/v3/matchlists/by-account/',
    match : 'match/v3/matches/',
    active_game : 'spectator/v3/active-games/by-summoner/',
    static : {
        champions : 'static-data/v3/champions',
        versions : 'static-data/v3/versions',
        items : 'v3/items'
    }
};

//https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/390600

/*
 *  Create database connection
 */
/*let connection = mysql.createConnection(config.database);
connection.connect();*/

let pool = mysql.createPool(config.database);
let connection = {
    query: function(){
        let sql_args = [];
        let args = [];
        for(let i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        let callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
            if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
            connection.query(args[0], sql_args, function(err, results) {
                connection.release(); // always put connection back in pool after last query
                if(err){
                    console.log(err);
                    return callback(err);
                }
                callback(null, results);
            });
        });
    }
};




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
let callRiotApi = function(url, queryArray, callback, priority=false) {
    let queryString = '?api_key=' + RIOT_API_KEY + '&' + createQueryUrl(queryArray);
    let fullUrl = url + queryString;
    let errorFallback =  function(){};
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
                errorFallback: errorFallback,
                isCalled:   false,
                retryCount : 0
            });
        } else {
            callRiotApiQueue.push({
                url:        fullUrl,
                callback:   callback,
                errorFallback: errorFallback,
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
                    if (!error && response.statusCode === 500) {
                        callRiotApiQueue.push(callRiotApiQueue.shift());
                        console.log('==== RIOT API error ====');
                        console.log('API not available');
                        console.log('');
                        console.log(' - Clearing queue');
                        console.log('========================');
                        clearApiQueue();
                        //console.log('Queue empty');
                    } else if (!error && response.statusCode === 503) {
                        //callRiotApiQueue.push(callRiotApiQueue.shift());
                        console.log('==== RIOT API error ====');
                        console.log('API not available');
                        console.log('');
                        //console.log(callRiotApiQueue[0]);
                        console.log(' - Removing call in the queue');
                        callRiotApiQueue.shift();
                        console.log('========================');
                        //console.log('Queue empty');
                    } else if(!error && response.statusCode === 404){
                        console.log('==== RIOT API error ====');
                        console.log('Status code: ',response.statusCode);
                        console.log(callRiotApiQueue[0]);
                        callRiotApiQueue.shift();
                        console.log('Data not found. Removing call from queue.');
                        console.log('========================');
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

let clearApiQueue = function() {
    callRiotApiQueue = [];
    console.log('Queue empty');
};

let removeFirstItemFromQueue = function() {

};


//==============================================================================
/*
 *  Helper functions
 */
let createQueryUrl = function(params) {
    let esc = encodeURIComponent;
    let query = [];
    params.forEach(data => {
        query.push(Object.keys(data).map(k => esc(k) + '=' + esc(data[k]))[0]);
    });
    return query.join('&');
};

let searchArrayForMatchingCall = function(arr,query) {
    let found = false;
    arr.forEach(function(data){
        if(data.url === query) {
            found = true;
        }
    });
    return found;
};


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

app.get(SUBDOMAIN + '/getLiveGameData', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    let queryData = qs.parse(req._parsedUrl.query);
    let userId = queryData.userId;
    userId = 35590582;

    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.active_game + userId, [],
        function(body) {
        res.end( body );
    },true);
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

app.get(SUBDOMAIN + '/getVersion', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    let QUERY = 'SELECT * FROM version WHERE id = 1';
    connection.query(QUERY, function(err, rows) {
        if (err) throw err;
        rows[0].id = undefined;
        res.end( JSON.stringify( rows[0] ) );
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
    let queryData = qs.parse(req._parsedUrl.query);
    let userId = queryData.userId;
    if(userId === undefined) {
        res.writeHead(400, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end();
        return;
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
    }

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
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.summoner_by_name + username, [

    ], function(body) {
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
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.summoner_by_id + id, [

    ], function(body) {
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
    callRiotApi(RIOT_API_URL_STATIC + RIOT_API_QUERRIES.static.champions, [
        {dataById : true},
        {champListData : "tags"},
        {champListData : "stats"}
    ], function(body) {
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

let requestVersionData = function() {
    callRiotApi(RIOT_API_URL_STATIC + RIOT_API_QUERRIES.static.versions, [], function(body) {
        let _data = [{ id:1, version: JSON.parse(body)[0] }];
        connection.query('REPLACE INTO version SET ?', _data, function(err, data) {
            if (err) throw err;
        });
    },true);
};

let getMissingDataCounter = 0;
let requestLatestMatches = function(userid,callback = function(){}) {
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.matchlist + userid, [

        ], function(body) {
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
                    if(getMissingDataCounter===0) {
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
    callRiotApi(RIOT_API_URL + RIOT_API_QUERRIES.match + matchid, [
        {includeTimeline: false}
        ], function(body) {
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
                    matchDuration : rawdata.gameDuration,
                    goldEarned : rawdata.participants[arrPos].stats.goldEarned,
                    visionWardsBoughtInGame: rawdata.participants[arrPos].stats.visionWardsBoughtInGame,
                    wardsPlaced: rawdata.participants[arrPos].stats.wardsPlaced,
                    wardsKilled: rawdata.participants[arrPos].stats.wardsKilled,
                    kills : rawdata.participants[arrPos].stats.kills,
                    deaths : rawdata.participants[arrPos].stats.deaths,
                    assists : rawdata.participants[arrPos].stats.assists,
                    minionsKilled : rawdata.participants[arrPos].stats.totalMinionsKilled,//minionsKilled,
                    neutralMinionsKilled : rawdata.participants[arrPos].stats.neutralMinionsKilled,
                    champLevel : rawdata.participants[arrPos].stats.champLevel,
                    champion : rawdata.participants[arrPos].championId,
                    lane : row[0].lane,
                    role : row[0].role,
                    queue : row[0].queue,
                    season : row[0].season,
                    matchCreation : rawdata.gameCreation,
                    teamKills : teamscore.teamKills,
                    teamDeaths : teamscore.teamDeaths,
                    teamAssists : teamscore.teamAssists,
                    timeline : JSON.stringify(rawdata.participants[arrPos].timeline),
                    winner : teamwin,
                    visionScore : rawdata.participants[arrPos].stats.visionScore,
                    timeCCingOthers : rawdata.participants[arrPos].stats.timeCCingOthers,
                    damageDealtToObjectives : rawdata.participants[arrPos].stats.damageDealtToObjectives,
                    damageDealtToTurrets : rawdata.participants[arrPos].stats.damageDealtToTurrets,
                    objectivePlayerScore : rawdata.participants[arrPos].stats.objectivePlayerScore,
                    combatPlayerScore : rawdata.participants[arrPos].stats.combatPlayerScore,
                    totalPlayerScore : rawdata.participants[arrPos].stats.totalPlayerScore,
                    totalScoreRank : rawdata.participants[arrPos].stats.totalScoreRank,

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
     *  TODO MAKE QUERY TAKE ACCOUNTID SO WE DONT HAVE TO FILL THE userID FIELD WITH ACCOUNTID DATA
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
        if(participant.player.currentAccountId === userId) {
            id = participant.participantId;
        }
    });
    return id;
};

let getTeamScore = function(participants, pId) {
    let teamSize = participants.length / 2;
    let team = {
        teamKills: 0,
        teamDeaths: 0,
        teamAssists: 0
    }
    if(pId > teamSize) {
        pId = teamSize;
    } else {
        pId = 0;
    }
    for (i = pId; i <= pId + teamSize - 1; i++) {
        team.teamKills += participants[i].stats.kills;
        team.teamAssists += participants[i].stats.assists;
        team.teamDeaths += participants[i].stats.deaths;
    }
    return team;
};
let getHasTeamWon = function(teams, pId) {

    if(pId > 5) {
        pId = 1;
    } else {
        pId = 0;
    }

    if(teams[pId].win === "Win") {
        return 1;
    } else {
        return 0;
    }
};

let getMissingRawData = function() {
    let QUERY = 'SELECT distinct matchId FROM matches WHERE NOT EXISTS (SELECT raw_match_data.matchId FROM raw_match_data WHERE matches.matchId = raw_match_data.matchId)';
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

        if(rows.length === 0) {
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
            formatSummonersAvailableMatchData(data.accountId);
        })
    });
};


//==============================================================================
/*
 * Server initialization
 */
let server = app.listen(13370, '0.0.0.0', function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Api listening at http://%s:%s", host, port);

    /*
     *   Update static data
     */
    requestVersionData();
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


/*
 https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/390600 (uses summoner ID, not account id!!)

 {
 "gameId": 2495806242,
 "gameStartTime": 1494311660455,
 "platformId": "NA1",
 "gameMode": "CLASSIC",
 "mapId": 11,
 "gameType": "MATCHED_GAME",
 "gameQueueConfigId": 420,
 "observers": {
 "encryptionKey": "ywyhhAjXGiF2CUfh5B/N8t6l5P4p9jCj"
 },
 "participants": [
 {
 "profileIconId": 1439,
 "championId": 236,
 "summonerName": "MyPetTurtle",
 "runes": [
 {
 "count": 9,
 "runeId": 5245
 },
 {
 "count": 9,
 "runeId": 5289
 },
 {
 "count": 9,
 "runeId": 5317
 },
 {
 "count": 3,
 "runeId": 5337
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6111,
 "rank": 5
 },
 {
 "masteryId": 6122,
 "rank": 1
 },
 {
 "masteryId": 6131,
 "rank": 2
 },
 {
 "masteryId": 6134,
 "rank": 3
 },
 {
 "masteryId": 6143,
 "rank": 1
 },
 {
 "masteryId": 6151,
 "rank": 5
 },
 {
 "masteryId": 6162,
 "rank": 1
 },
 {
 "masteryId": 6312,
 "rank": 5
 },
 {
 "masteryId": 6323,
 "rank": 1
 },
 {
 "masteryId": 6331,
 "rank": 5
 },
 {
 "masteryId": 6343,
 "rank": 1
 }
 ],
 "spell2Id": 7,
 "teamId": 100,
 "spell1Id": 4,
 "summonerId": 20390161
 },
 {
 "profileIconId": 25,
 "championId": 26,
 "summonerName": "Hungry Like",
 "runes": [
 {
 "count": 9,
 "runeId": 5247
 },
 {
 "count": 9,
 "runeId": 5289
 },
 {
 "count": 9,
 "runeId": 5317
 },
 {
 "count": 3,
 "runeId": 5347
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6211,
 "rank": 5
 },
 {
 "masteryId": 6223,
 "rank": 1
 },
 {
 "masteryId": 6232,
 "rank": 5
 },
 {
 "masteryId": 6241,
 "rank": 1
 },
 {
 "masteryId": 6252,
 "rank": 5
 },
 {
 "masteryId": 6261,
 "rank": 1
 },
 {
 "masteryId": 6311,
 "rank": 5
 },
 {
 "masteryId": 6322,
 "rank": 1
 },
 {
 "masteryId": 6332,
 "rank": 5
 },
 {
 "masteryId": 6342,
 "rank": 1
 }
 ],
 "spell2Id": 4,
 "teamId": 100,
 "spell1Id": 3,
 "summonerId": 19062645
 },
 {
 "profileIconId": 1156,
 "championId": 2,
 "summonerName": "Meteos",
 "runes": [
 {
 "count": 9,
 "runeId": 5245
 },
 {
 "count": 9,
 "runeId": 5295
 },
 {
 "count": 9,
 "runeId": 5316
 },
 {
 "count": 3,
 "runeId": 5335
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6111,
 "rank": 5
 },
 {
 "masteryId": 6121,
 "rank": 1
 },
 {
 "masteryId": 6134,
 "rank": 5
 },
 {
 "masteryId": 6142,
 "rank": 1
 },
 {
 "masteryId": 6151,
 "rank": 5
 },
 {
 "masteryId": 6162,
 "rank": 1
 },
 {
 "masteryId": 6212,
 "rank": 5
 },
 {
 "masteryId": 6221,
 "rank": 1
 },
 {
 "masteryId": 6231,
 "rank": 5
 },
 {
 "masteryId": 6243,
 "rank": 1
 }
 ],
 "spell2Id": 6,
 "teamId": 100,
 "spell1Id": 11,
 "summonerId": 390600
 },
 {
 "profileIconId": 1606,
 "championId": 103,
 "summonerName": "Gold458",
 "runes": [
 {
 "count": 9,
 "runeId": 5273
 },
 {
 "count": 9,
 "runeId": 5290
 },
 {
 "count": 9,
 "runeId": 5317
 },
 {
 "count": 3,
 "runeId": 5357
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6114,
 "rank": 5
 },
 {
 "masteryId": 6121,
 "rank": 1
 },
 {
 "masteryId": 6134,
 "rank": 5
 },
 {
 "masteryId": 6143,
 "rank": 1
 },
 {
 "masteryId": 6312,
 "rank": 5
 },
 {
 "masteryId": 6323,
 "rank": 1
 },
 {
 "masteryId": 6331,
 "rank": 5
 },
 {
 "masteryId": 6343,
 "rank": 1
 },
 {
 "masteryId": 6351,
 "rank": 5
 },
 {
 "masteryId": 6362,
 "rank": 1
 }
 ],
 "spell2Id": 4,
 "teamId": 100,
 "spell1Id": 14,
 "summonerId": 51570237
 },
 {
 "profileIconId": 665,
 "championId": 98,
 "summonerName": "Never Vote Yes",
 "runes": [
 {
 "count": 5,
 "runeId": 5245
 },
 {
 "count": 4,
 "runeId": 5247
 },
 {
 "count": 9,
 "runeId": 5289
 },
 {
 "count": 9,
 "runeId": 5317
 },
 {
 "count": 1,
 "runeId": 5335
 },
 {
 "count": 2,
 "runeId": 5337
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6212,
 "rank": 5
 },
 {
 "masteryId": 6223,
 "rank": 1
 },
 {
 "masteryId": 6231,
 "rank": 5
 },
 {
 "masteryId": 6241,
 "rank": 1
 },
 {
 "masteryId": 6252,
 "rank": 5
 },
 {
 "masteryId": 6261,
 "rank": 1
 },
 {
 "masteryId": 6312,
 "rank": 5
 },
 {
 "masteryId": 6323,
 "rank": 1
 },
 {
 "masteryId": 6331,
 "rank": 4
 },
 {
 "masteryId": 6332,
 "rank": 1
 },
 {
 "masteryId": 6343,
 "rank": 1
 }
 ],
 "spell2Id": 12,
 "teamId": 100,
 "spell1Id": 4,
 "summonerId": 35755352
 },
 {
 "profileIconId": 1616,
 "championId": 13,
 "summonerName": "Sharpter",
 "runes": [
 {
 "count": 9,
 "runeId": 5273
 },
 {
 "count": 6,
 "runeId": 5295
 },
 {
 "count": 3,
 "runeId": 5296
 },
 {
 "count": 5,
 "runeId": 5316
 },
 {
 "count": 4,
 "runeId": 5317
 },
 {
 "count": 3,
 "runeId": 5357
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6114,
 "rank": 5
 },
 {
 "masteryId": 6122,
 "rank": 1
 },
 {
 "masteryId": 6131,
 "rank": 5
 },
 {
 "masteryId": 6141,
 "rank": 1
 },
 {
 "masteryId": 6312,
 "rank": 5
 },
 {
 "masteryId": 6321,
 "rank": 1
 },
 {
 "masteryId": 6331,
 "rank": 1
 },
 {
 "masteryId": 6332,
 "rank": 4
 },
 {
 "masteryId": 6343,
 "rank": 1
 },
 {
 "masteryId": 6352,
 "rank": 5
 },
 {
 "masteryId": 6361,
 "rank": 1
 }
 ],
 "spell2Id": 4,
 "teamId": 200,
 "spell1Id": 6,
 "summonerId": 179215
 },
 {
 "profileIconId": 6,
 "championId": 81,
 "summonerName": "Sharp Point",
 "runes": [
 {
 "count": 9,
 "runeId": 5245
 },
 {
 "count": 9,
 "runeId": 5289
 },
 {
 "count": 9,
 "runeId": 5317
 },
 {
 "count": 3,
 "runeId": 5337
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6111,
 "rank": 5
 },
 {
 "masteryId": 6121,
 "rank": 1
 },
 {
 "masteryId": 6134,
 "rank": 5
 },
 {
 "masteryId": 6142,
 "rank": 1
 },
 {
 "masteryId": 6151,
 "rank": 5
 },
 {
 "masteryId": 6162,
 "rank": 1
 },
 {
 "masteryId": 6312,
 "rank": 5
 },
 {
 "masteryId": 6322,
 "rank": 1
 },
 {
 "masteryId": 6331,
 "rank": 5
 },
 {
 "masteryId": 6343,
 "rank": 1
 }
 ],
 "spell2Id": 7,
 "teamId": 200,
 "spell1Id": 4,
 "summonerId": 599327
 },
 {
 "profileIconId": 1616,
 "championId": 54,
 "summonerName": "On my own",
 "runes": [
 {
 "count": 9,
 "runeId": 5273
 },
 {
 "count": 9,
 "runeId": 5289
 },
 {
 "count": 9,
 "runeId": 5317
 },
 {
 "count": 3,
 "runeId": 5357
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6114,
 "rank": 5
 },
 {
 "masteryId": 6122,
 "rank": 1
 },
 {
 "masteryId": 6134,
 "rank": 5
 },
 {
 "masteryId": 6143,
 "rank": 1
 },
 {
 "masteryId": 6212,
 "rank": 5
 },
 {
 "masteryId": 6223,
 "rank": 1
 },
 {
 "masteryId": 6232,
 "rank": 5
 },
 {
 "masteryId": 6241,
 "rank": 1
 },
 {
 "masteryId": 6251,
 "rank": 5
 },
 {
 "masteryId": 6261,
 "rank": 1
 }
 ],
 "spell2Id": 12,
 "teamId": 200,
 "spell1Id": 4,
 "summonerId": 29710909
 },
 {
 "profileIconId": 22,
 "championId": 23,
 "summonerName": "16 f cali",
 "runes": [
 {
 "count": 9,
 "runeId": 5247
 },
 {
 "count": 3,
 "runeId": 5290
 },
 {
 "count": 6,
 "runeId": 5296
 },
 {
 "count": 9,
 "runeId": 5317
 },
 {
 "count": 3,
 "runeId": 5337
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6111,
 "rank": 5
 },
 {
 "masteryId": 6121,
 "rank": 1
 },
 {
 "masteryId": 6131,
 "rank": 5
 },
 {
 "masteryId": 6143,
 "rank": 1
 },
 {
 "masteryId": 6151,
 "rank": 5
 },
 {
 "masteryId": 6162,
 "rank": 1
 },
 {
 "masteryId": 6211,
 "rank": 5
 },
 {
 "masteryId": 6223,
 "rank": 1
 },
 {
 "masteryId": 6231,
 "rank": 5
 },
 {
 "masteryId": 6243,
 "rank": 1
 }
 ],
 "spell2Id": 6,
 "teamId": 200,
 "spell1Id": 11,
 "summonerId": 20494327
 },
 {
 "profileIconId": 513,
 "championId": 63,
 "summonerName": "snakbox",
 "runes": [
 {
 "count": 9,
 "runeId": 5273
 },
 {
 "count": 9,
 "runeId": 5289
 },
 {
 "count": 9,
 "runeId": 5317
 },
 {
 "count": 3,
 "runeId": 5357
 }
 ],
 "bot": false,
 "masteries": [
 {
 "masteryId": 6114,
 "rank": 5
 },
 {
 "masteryId": 6123,
 "rank": 1
 },
 {
 "masteryId": 6134,
 "rank": 5
 },
 {
 "masteryId": 6142,
 "rank": 1
 },
 {
 "masteryId": 6154,
 "rank": 5
 },
 {
 "masteryId": 6164,
 "rank": 1
 },
 {
 "masteryId": 6311,
 "rank": 5
 },
 {
 "masteryId": 6322,
 "rank": 1
 },
 {
 "masteryId": 6332,
 "rank": 5
 },
 {
 "masteryId": 6342,
 "rank": 1
 }
 ],
 "spell2Id": 14,
 "teamId": 200,
 "spell1Id": 4,
 "summonerId": 20054964
 }
 ],
 "gameLength": 686,
 "bannedChampions": [
 {
 "teamId": 100,
 "championId": 114,
 "pickTurn": 1
 },
 {
 "teamId": 200,
 "championId": 51,
 "pickTurn": 2
 },
 {
 "teamId": 100,
 "championId": 113,
 "pickTurn": 3
 },
 {
 "teamId": 200,
 "championId": 427,
 "pickTurn": 4
 },
 {
 "teamId": 100,
 "championId": 40,
 "pickTurn": 5
 },
 {
 "teamId": 200,
 "championId": 104,
 "pickTurn": 6
 }
 ]
 }


*/