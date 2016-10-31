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

var app = new Vue({
    el: '#app',
    created: function(){
        this.getSummoners();
    },
    data: {
        usersModel: 64882059,
        users : [],
        data: ''
    },
    methods: {
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
                    console.log(data)
                    //_v.this.message = JSON.parse(data).test;
                })
                .catch(function(data){
                    //console.log('error', JSON.parse(data));
                });
        }
    }
});
