var twitter = require('ntwitter')
var twit = new twitter({
    "consumer_key": 'PFs0Qka8jfMrUGyeoOu2RunLe',
    "consumer_secret": 'joWXsLeXg0ROTaBfg3elBe6tT1P53tEGhVAFY6mhpVvlJzjdeP',
    "access_token_key": '443623634-FalxxnymVtAn6eLXCdaW4KCL0PBS6VC7A0xrRLIT',
    "access_token_secret": 'rI2v3OAKksnM5wDiI0WoJv5t4eYhOX9iEyCE3jUjjwGeI'
});
// // Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter', {
    track: '#Hrithik, #fun, #tweet, #bollywood'
}, function(stream) {
    console.log("------------------------------");
    stream.on('data', function(data) {
        // Construct a new tweet object
        console.log(data.id);
        console.log(data.text);
        console.log("********************");
    });
});