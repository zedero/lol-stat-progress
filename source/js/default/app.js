
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
//const SERVER_ADRESS = 'http://85.214.156.29';
const PORT = 8080;
const LOCATION = '/api';
const HOST = SERVER_ADRESS + ":" + PORT + LOCATION;
//const HOST = SERVER_ADRESS + LOCATION;
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
        summonerDataLoaded : false,
        avgGameTime : 0,
        winrate : 0,
        wardsplaced : 0,
        creepScore : 0,
        goldPerMin : 0,
        KDA : 0,
        killPressence : 0,
        userIcon : '',
        updating : false,
        apiError : false,
        activeTab : 1,
        summonerLevel : 30
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
                    console.log(data)
                    data.forEach(function(user,index){
                        _v.this.users.push({
                            text: user.name,
                            value: user.id,
                            icon: user.profileIconId
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
                    _v.this.setIconUrl();
                    renderUi(_v);

                })
                .catch(function(data){
                    //console.log('error', JSON.parse(data));
                });
        },
        setIconUrl: function(){
            let userid = this.usersModel;
            let iconId = 588;
            this.users.forEach(function(data){
                if(data.value == userid) {
                    iconId = data.icon;
                }
            })
            this.userIcon = 'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/profileicon/'+iconId+'.png';
        },
        updateSummonerData: function() {
            let _v = {this:this};
            let userid = this.usersModel;
            this.updating = true;
            vueHttp(HOST + '/updateSummonerMatchData?userId=' + userid).get()
                .then(function(data){
                    /*_v.this.matchesData = formatMatchesData( JSON.parse(data) ) ;
                    _v.this.summonerDataLoaded = true;
                    renderUi(_v);*/
                    _v.this.updating = false;
                    _v.this.apiError = false;
                    _v.this.getSummonerData();

                })
                .catch(function(data){
                    //console.log('error', JSON.parse(data));
                    _v.this.apiError = true;
                    _v.this.updating = false;
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
    /*
     *  Only render charts when google chart is available
     */

    google.charts.setOnLoadCallback(function(){
        gametimeChart(_v);
        gamesWonChart(_v);
        wardsPerMinChart(_v);
        csChart(_v);
        goldChart(_v);
        kdaChart(_v);
        killPressenceChart(_v);
        timeline(_v);
    });
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
        title: 'Gametime in minutes ( avg: '+ Math.round( average ) +' minutes )',
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('gametime'));
    chartOptions.title = 'Gametime in minutes';
    chart.draw(data, chartOptions);
    _v.this.avgGameTime = Math.round( average );
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
    _v.this.winrate = (Math.round(average * 10000) / 100);
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
    _v.this.wardsplaced = Math.round(average * 100) / 100;
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
    _v.this.creepScore = Math.round(average * 100 ) / 100;
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
    _v.this.goldPerMin = Math.round(average * 100) / 100;
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
    _v.this.KDA = Math.round(average*100) / 100;
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
    _v.this.killPressence = Math.round(average * 100 ) / 100;
    var chart = new google.visualization.LineChart(document.getElementById('kill-pressence'));
    chartOptions.title = 'Kill pressence';
    chart.draw(data, chartOptions);
}
function timeline(_v) {
    let type = 'creepsPerMinDeltas';

    let dataArr = [['Match', type ,'Average']];
    let average = 1;
    let index = 0;

    if(_v.this.matchesData.length > 0) {
        let data = JSON.parse(_v.this.matchesData[_v.this.matchesData.length-1].timeline);

        if(data.hasOwnProperty(type)){
            dataArr.push([0, 0 , average])
            if(data[type].hasOwnProperty('zeroToTen')) {
                dataArr.push([10, Math.round(data[type].zeroToTen * 100) / 100 , average])
            }
            if(data[type].hasOwnProperty('tenToTwenty')) {
                dataArr.push([20, Math.round(data[type].tenToTwenty * 100) / 100 , average])
            }
            if(data[type].hasOwnProperty('twentyToThirty')) {
                dataArr.push([30, Math.round(data[type].twentyToThirty * 100) / 100 , average])
            }
            if(data[type].hasOwnProperty('thirtyToEnd')) {
                dataArr.push([40, Math.round(data[type].thirtyToEnd * 100) / 100 , average])
            }
        }

        //console.log(_v.this.matchesData[_v.this.matchesData.length-1].csPerMin)

        var _data = google.visualization.arrayToDataTable(dataArr);
        var chart = new google.visualization.BarChart(document.getElementById('timeline'));
        chartOptions.title = 'Creeps per minute timeline';
        chart.draw(_data, chartOptions);
    }

}

var limitData = function(arr) {
    var newArr = arr;
    var limit = 100;
    if(arr.length > limit) {
        newArr = arr.splice(arr.length - limit)
    }
    return newArr
}
