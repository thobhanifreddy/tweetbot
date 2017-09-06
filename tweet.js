var Twitter = require('twitter');
var fs = require('fs');
var sleep = require('sleep');
var client = new Twitter({
    "consumer_key": 'ZhS8wgd1LqOpOXtWIKfKl7gQF',
    "consumer_secret": 'adlY340PUSBuLiywawfzMOuHNMArFlmf4e6vD6VciirurZCGhc',
    "access_token_key": '851741824809152516-7HiY023K0r57taxk43uaB7iKsbOvRth',
    "access_token_secret": 'anmp3Kw2p593PtL1Psm5cLSQBj06MxjXE8keY9jkja9sH'
});

console.log("starting")
var tweeted_user = []
var sleepTime = [15,17,20,22,26,28,30]
fs.readFile('tweeted_user.json', 'utf8', function(err, users) {
    tweeted_user = users.split(",");
    tweeted_user.splice(-1, 1)
    
})

var users = [];
var ucount = 0;

function checkuser(){
    var tweet = '';
    

    if (tweeted_user.indexOf(user1) < 0 && tweeted_user.indexOf(user2) < 0 && tweeted_user.indexOf(user3) < 0) {

        tweet = "Get free giftcards at https://www.cinchbucks.com/reg/thobhani.freddy " + "@" + user1 + " " + "@" + user2 + " " + "@" + user3;

        fs.appendFileSync("tweeted_user.json", user1 + ",");
        fs.appendFileSync("tweeted_user.json", user2 + ",");
        fs.appendFileSync("tweeted_user.json", user3 + ",");
        console.log(tweet);

    } else if (tweeted_user.indexOf(user1) > -1 && tweeted_user.indexOf(user2) < 0 && tweeted_user.indexOf(user3) < 0) {
        console.log(user1 + " already in list");
        tweet = "Get free giftcards at https://www.cinchbucks.com/reg/thobhani.freddy  " + "@" + user2 + " " + "@" + user3;
        fs.appendFileSync("tweeted_user.json", user2 + ",");
        fs.appendFileSync("tweeted_user.json", user3 + ",");
    } else if (tweeted_user.indexOf(user2) > -1 && tweeted_user.indexOf(user1) < 0 && tweeted_user.indexOf(user3) < 0) {
        console.log(user2 + " already in list");
        tweet = "Get free giftcards at https://www.cinchbucks.com/reg/thobhani.freddy  " + "@" + user1 + " " + "@" + user3;
        fs.appendFileSync("tweeted_user.json", user2 + ",");
        fs.appendFileSync("tweeted_user.json", user3 + ",");
    } else if (tweeted_user.indexOf(user3) > -1 && tweeted_user.indexOf(user1) < 0 && tweeted_user.indexOf(user2) < 0) {
        console.log(user3 + " already in list");
        tweet = "Get free giftcards at https://www.cinchbucks.com/reg/thobhani.freddy  " + "@" + user1 + " " + "@" + user2;
        fs.appendFileSync("tweeted_user.json", user1 + ",");
        fs.appendFileSync("tweeted_user.json", user2 + ",");
    }else{
        return false;
    }

    return tweet; 
}

function postTweetNew(param, callback){
    client.post('statuses/update', param, function(error, tweet, response) {
        if (error) {
            console.log("Error:", error);
            callback();
        }else{
            console.log("Sucess:", tweet.text);
            sleep.sleep(60  * sleepTime[Math.floor(Math.random() * 4)])
            // sleep.sleep(60);
            ucount += 3;
            if (users.length >= ucount) {

                console.log(tweeted_user);
                user1 = users[ucount];
                user2 = users[ucount + 1];
                user3 = users[ucount + 2];
                console.log(user1);
                console.log(user2);
                console.log(user3);

                tweet = checkuser();
                var para = { status: tweet};
                postTweetNew(para, callback);
            }else{
                callback();
            }
        }

    });
}

fs.readFile('user.json', 'utf8', function(err, contents) {
    users = contents.split(",");
    console.log(tweeted_user);
    user1 = users[ucount];
    user2 = users[ucount + 1];
    user3 = users[ucount + 2];
    console.log(user1);
    console.log(user2);
    console.log(user3);

    while(!checkuser()) {
        ucount +=3;
        user1 = users[ucount];
        user2 = users[ucount + 1];
        user3 = users[ucount + 2];
    }

    tweet = checkuser();
    var param = { status: tweet};
    console.log("param: ",param);
    
    postTweetNew(param, function(){
        console.log("Finished.....");    
    });

    
});