
/*  TODO
    Fix average calculation -- FIXED, rounding caused issues
*/
(function() {

    'use strict';

    window.vueHttp = function vueHttp(url) {
        var core = {

            ajax: function(method, url, args) {
                var promise = new Promise(function(resolve, reject) {
                    var client = new XMLHttpRequest();
                    var uri = url;

                    if (args && (method === 'POST' || method === 'PUT')) {
                        uri += '?';
                        var argcount = 0;
                        for (var key in args) {
                            if (args.hasOwnProperty(key)) {
                                if (argcount++) {
                                    uri += '&';
                                }
                                uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                            }
                        }
                    }

                    client.open(method, uri);
                    client.send();

                    client.onload = function() {
                        if (this.status == 200) {
                            resolve(this.response);
                        } else {
                            reject(this.statusText);
                        }
                    };
                    client.onerror = function() {
                        reject(this.statusText);
                    };
                });
                return promise;
            }
        };
        return {
            'get': function(args) {
                return core.ajax('GET', url, args);
            },
            'post': function(args) {
                return core.ajax('POST', url, args);
            },
            'put': function(args) {
                return core.ajax('PUT', url, args);
            },
            'delete': function(args) {
                return core.ajax('DELETE', url, args);
            }
        };
    };

})();

const SERVER_ADRESS = 'http://localhost';
const PORT = 8080;
const LOCATION = '/api';
const HOST = SERVER_ADRESS + ":" + PORT + LOCATION;
var   CHAMPIONS = [];
google.charts.load('current', {
    'packages': ['corechart']
});

var app = new Vue({
    el: '#app',
    created: function(){
        this.getSummoners();
        this.getChampions();
    },
    data: {
        usersModel: 65002229,
        users : [],
        data: '',
        matchesData : [],
        champions : [],
        filterRole : "ALL",
        summonerDataLoaded : false
    },
    methods: {
        renderCharts: function() {
            renderUi({this:this});
        },
        getSummoners: function() {
            let _v = {this:this};
            vueHttp(HOST + '/getSummoners').get()
                .then(function(data){
                    _v.this.users = [];
                    data = JSON.parse(data);
                    data.forEach(function(user,index){
                        _v.this.users.push({
                            text: user.name,
                            value: user.id
                        })
                    })

                    setTimeout(function(){
                        _v.this.getSummonerData()
                    }, 1000)
                })
                .catch(function(data){
                    //console.log('error', JSON.parse(data));
                });
        },
        getChampions: function() {
            let _v = {this:this};
            vueHttp(HOST + '/getChampions').get()
                .then(function(data){
                    _v.this.champions = JSON.parse(data);
                    _v.this.champions.forEach(function(champ){
                        CHAMPIONS[champ.id] = champ;
                    });
                })
                .catch(function(data){
                    //console.log('error', JSON.parse(data));
                });
        },
        getSummonerData: function() {
            let _v = {this:this};
            let userid = this.usersModel;
            vueHttp(HOST + '/getSummonerMatchData?userId=' + userid).get()
                .then(function(data){
                    _v.this.matchesData = formatMatchesData( JSON.parse(data) ) ;
                    _v.this.summonerDataLoaded = true;
                    renderUi(_v);

                })
                .catch(function(data){
                    //console.log('error', JSON.parse(data));
                });

        },
        updateSummonerData: function() {
            let _v = {this:this};
            let userid = this.usersModel;
            vueHttp(HOST + '/updateSummonerMatchData?userId=' + userid).get()
                .then(function(data){
                    /*_v.this.matchesData = formatMatchesData( JSON.parse(data) ) ;
                    _v.this.summonerDataLoaded = true;
                    renderUi(_v);*/

                })
                .catch(function(data){
                    //console.log('error', JSON.parse(data));
                });
        }
    }
});


var formatMatchesData = function(arr) {
    let matches = []
    arr.forEach(function(data,index){
        let match = data;
        let timeInMin = (data.matchDuration / 60);
        match.tlane = data.lane;
        match.trole = data.role;
        match.role = getRole(data.lane,data.role);
        match.goldPerMin = data.goldEarned / timeInMin;
        match.kda = (data.kills + data.assists) / data.deaths;
        match.wardsPerMin = data.wardsPlaced / timeInMin;
        match.cs = ( data.minionsKilled + data.neutralMinionsKilled );
        match.csPerMin = ( data.minionsKilled + data.neutralMinionsKilled ) / timeInMin;
        match.champion = CHAMPIONS[data.champion];
        //------
        matches.push(match);
    });

    return matches;
}

var getRole = function(lane,role) {
    if(lane == "JUNGLE") {
        return "JUNGLE";
    } else if(lane == "MID") {
        return "MID";
    } else if(lane == "TOP") {
        return "TOP";
    } else if(role == "DUO_SUPPORT") {
        return "SUPPORT";
    } else {
        return "CARRY";
    }
}

var renderUi = function(_v) {
    gametimeChart(_v);
    gamesWonChart(_v);
    wardsPerMinChart(_v);
    csChart(_v);
    goldChart(_v);
    kdaChart(_v);
    killPressenceChart(_v);
}
var chartOptions = {
    titleTextStyle: { color: '#FFF' },
    backgroundColor: '#263646',
    colors: ['#01689b','#6bdb8d'],

    hAxis: {
        textStyle: {
            color: '#FFF'
        }
    },
    vAxis: {
        textStyle: {
            color: '#FFF'
        }
    },
    title: {
        textStyle: {
            color: '#FFF'
        }
    },
    title: 'placeholder text',
    legend: {
        position: 'bottom',
        position: 'none',
        textStyle: {
            color: '#FFF'
        }
    }
};

function gametimeChart(_v) {
    var dataArr = [['Match', 'Gametime','Average']];
    var average = 0;
    var index = 0;
    _v.this.matchesData.forEach(function(data){
        if(data.role == _v.this.filterRole || _v.this.filterRole == "ALL") {
            var gametime = Math.round(data.matchDuration / 60);
            average = ((average * index) + gametime) / (index + 1);
            if(index == 0) average = gametime;
            dataArr.push([index, gametime, Math.round( average ) ]);
            index++;
        }
    });

    var data = google.visualization.arrayToDataTable(dataArr);
    var options = {
        title: 'Gametime in minutes',
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('gametime'));
    chartOptions.title = 'Gametime in minutes';
    chart.draw(data, chartOptions);
}

function gamesWonChart(_v) {

    var dataTable = new google.visualization.DataTable();
    var average = .5;
    var index = 100;

    dataTable.addColumn('number', 'Match');
    dataTable.addColumn('number', 'Winrate');
    dataTable.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}})
    dataTable.addColumn({type: 'string', role: 'style'});

    _v.this.matchesData.forEach(function(data){
        if(data.role == _v.this.filterRole || _v.this.filterRole == "ALL") {
            var won = parseInt(data.winner);

            average = ((average * index) + won) / (index + 1);
            if(index == 0) average = .5;
            if(won == 0) { won = 'No'} else {won = "Yes"}
            dataTable.addRows([
              [index-100, average*100, getTooltip(data.matchId,'Winrate',(Math.round(average * 10000) / 100) +'%'),'color: #6bdb8d']
            ]);
            index++;
        }
    });
    var options = {
        title: 'Winrate',
        tooltip: {isHtml: true},
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('gameswon'));
    chartOptions.title = 'Winrate';
    chartOptions.tooltip = {isHtml: true};
    chart.draw(dataTable, chartOptions);

}

function getTooltip(matchId,type,value) {
    return `<div class="tooltip">
                <div><b>${matchId}</b></div>
                <div>${type}: ${value}</div>
            </div>`
}

function wardsPerMinChart(_v) {
    var dataArr = [['Match', 'Wards per min','Average']];
    var average = 0;
    var index = 0;
    _v.this.matchesData.forEach(function(data){
        if(data.role == _v.this.filterRole || _v.this.filterRole == "ALL") {
            average = ((average * index) + data.wardsPerMin) / (index + 1);
            if(index == 0) average = data.wardsPerMin;
            dataArr.push([index,data.wardsPerMin,average])
            index++;
        }
    });

    var data = google.visualization.arrayToDataTable(dataArr);
    var options = {
        title: 'Warding statistics',
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('wards-per-min'));
    chartOptions.title = 'Warding statistics';
    chart.draw(data, chartOptions);
}

function csChart(_v) {
    var dataArr = [['Match', 'Creep score per min','Average']];
    var average = 0;
    var index = 0;
    _v.this.matchesData.forEach(function(data){
        if(data.role == _v.this.filterRole || _v.this.filterRole == "ALL") {
            average = ((average * index) + data.csPerMin) / (index + 1);
            if(index == 0) average = data.csPerMin;
            dataArr.push([index,data.csPerMin,average])
            index ++;
        }
    });

    var data = google.visualization.arrayToDataTable(dataArr);
    var options = {
        title: 'Creep score per minute',
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('CS'));
    chartOptions.title = 'Creep score per minute';
    chart.draw(data, chartOptions);
}

function goldChart(_v) {
    var dataArr = [['Match', 'Gold per min','Average']];
    var average = 0;
    var index = 0;
    _v.this.matchesData.forEach(function(data){
        if(data.role == _v.this.filterRole || _v.this.filterRole == "ALL") {
            average = ((average * index) + data.goldPerMin) / (index + 1);
            if(index == 0) average = data.goldPerMin;
            dataArr.push([index,data.goldPerMin,average])
            index ++;
        }
    });

    var data = google.visualization.arrayToDataTable(dataArr);
    var options = {
        title: 'Gold per minute',
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('GOLD'));
    chartOptions.title = 'Gold per minute';
    chart.draw(data, chartOptions);
}

function kdaChart(_v) {
    var dataArr = [['Match', 'KDA' ,'Average']];
    var average = 0;
    var index = 0;

    _v.this.matchesData.forEach(function(data){
        if(data.role == _v.this.filterRole || _v.this.filterRole == "ALL") {
            var KDA = 0;

            if (data.deaths == 0) {
                KDA = data.kills + data.assists;
            } else {
                KDA = (data.kills + data.assists) / data.deaths;
            }
            average = ((average * index) + KDA ) / (index + 1);
            if(index == 0) average = KDA;
            dataArr.push([index, KDA, average])
            index ++;
        }
    });

    var data = google.visualization.arrayToDataTable(dataArr);
    var options = {
        title: 'KDA',
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('KDA'));
    chartOptions.title = 'KDA';
    chart.draw(data, chartOptions);
}
function killPressenceChart(_v) {
    var dataArr = [['Match', 'Pressence' ,'Average']];
    var average = 0;
    var index = 0;

    _v.this.matchesData.forEach(function(data){
        if(data.role == _v.this.filterRole || _v.this.filterRole == "ALL") {
            var pressence = (data.kills + data.assists) / (data.teamKills);
            pressence *= 100;
            if(data.kills == 0 && data.assists == 0) {
                pressence = 0;
                if(data.teamKills == 0) pressence = average;
            }
            if(pressence > 100) {
                console.log(data.matchId)
            }
            average = ((average * index) + pressence ) / (index + 1);
            if(index == 0) average = pressence;
            dataArr.push([index, pressence , average])
            index ++;
        }
    });

    var data = google.visualization.arrayToDataTable(dataArr);
    var options = {
        title: 'Kill pressence',
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('kill-pressence'));
    chartOptions.title = 'Kill pressence';
    chart.draw(data, chartOptions);
}

var limitData = function(arr) {
    var newArr = arr;
    var limit = 100;
    if(arr.length > limit) {
        newArr = arr.splice(arr.length - limit)
    }
    return newArr
}
