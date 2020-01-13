

var friends = require('../data/friends.js');


module.exports = function (app) {
    // Displays all friends
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });



    // Add New User - takes in JSON input and returns their match!
    app.post("/api/friends", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newFriend = req.body;
        var score_comparisons = [];
        // console.log('here is the current list of friends', friends);
        friends.forEach(element => {
            indiv_comparisons = [];
            for (let index = 0; index < newFriend.scores.length; index++) {
                const cur = element.scores[index];
                const new_cur = newFriend.scores[index];
                indiv_comparisons.push(Math.abs(cur - new_cur))

            }
            score_comparisons.push({
                score: indiv_comparisons.reduce((a, b) => a + b, 0),
                thing: element
            });
        })

        var lowest_diff = null;
        console.log('score comparisons',score_comparisons);
        score_comparisons.forEach(element => {
            // console.log('lowest_diff.scores',lowest_diff.scores);
            console.log('element.score',element.score, element)
            if (lowest_diff === null || lowest_diff.score > element.score) {
                lowest_diff = element
            }
            console.log(lowest_diff);
            console.log('lowest diff',lowest_diff);

        })


        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newFriend.name = newFriend.name.replace(/\s+/g, "").toLowerCase();

        // console.log(newFriend);

        friends.push(newFriend);

        res.json(lowest_diff.thing);
    });
}
