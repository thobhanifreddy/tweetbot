var Twitter = require('twitter');
var fs = require('fs');
var sleep = require('sleep');
var readlineSync = require('readline-sync');
var user_limit = readlineSync.question("nos. users to detch(multiple of 200): ")
var client = new Twitter({
    "consumer_key": 'ZhS8wgd1LqOpOXtWIKfKl7gQF',
    "consumer_secret": 'adlY340PUSBuLiywawfzMOuHNMArFlmf4e6vD6VciirurZCGhc',
    "access_token_key": '851741824809152516-7HiY023K0r57taxk43uaB7iKsbOvRth',
    "access_token_secret": 'anmp3Kw2p593PtL1Psm5cLSQBj06MxjXE8keY9jkja9sH'
});
var next_cur = 0;
var followers = [];
var a = 1;
var params = {
    screen_name: 'swagbucks',
    count: 200
};
console.log(params);
getdata(params, function() {
    fs.writeFileSync("user.json", followers);
});

function getdata(params, callback) {
    client.get('followers/list', params, function(error, tweets, response) {
        console.log(error)
        if (!error) {
            tweets.users.forEach(function(obj) {
                console.log(a + " : " + obj.screen_name);
                // console.log(obj.screen_name);
                followers.push(obj.screen_name)
                a++;
            });
            console.log("--------------------------------");
            console.log(tweets.next_cursor);
            next_cur = tweets.next_cursor;
            // params = {screen_name: 'coldplay', count : 5, cursor:tweets.next_cursor};
        }
        if (a > user_limit) {
            callback();
            return;
        }
        sleep.sleep(60);
        if (tweets.next_cursor > 0) {
            params = {
                screen_name: 'coldplay',
                count: 200,
                cursor: tweets.next_cursor
            }
            getdata(params, callback);
        } else callback();
    });
}