const express = require('express'),
router = express.Router(),
bodyParser = require('body-parser'), // parse info from POST body
methodOverride = require('method-override');  // used to manipulate POST data

var admin = require("firebase-admin");

var serviceAccount = require("../bird-c0cb8-firebase-adminsdk-83f1n-86a90a9a5b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bird-c0cb8.firebaseio.com"
});

var auth = admin.auth();

const SHOW = require('../models/shows');
const USER = require('../models/users');

const weekKey = "5a05e7043177e84c786aa498";

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride( (req) => {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

/* Find the last element of given array and return it. */
function lastElementOf(arr) {
    return arr[arr.length - 1];
}

/*  Error handling function.  Invoke with error information. */
function handleError(err, res, msg, statusCode) {
    res.status(statusCode);
    err.status = statusCode;
    err.message = `${err.status}, ${msg}. ${err.message}`;
    res.json(err);
}

router.route('/register')
    .post( (req, res) => {
        const token = req.body.token;
        // console.log(token);

        auth.verifyIdToken(token).then(function(decodedToken) {
                var uid = decodedToken.uid;
                console.log("uid " + uid);

                USER.find({}, (err, user) => {
                    if (user.length) {
                        res.json({});

                    } else {
                        USER.create({
                            name : uid
                        }, (err, user) => {
                            if (err) {
                                handleError(err, res, 'Could not save the show in the database', 500);
                            } else {
                                res.json(user);
                            }
                        });

                    }
                });

            }).catch(function(error) {
                console.log(error);
                res.json({});

            });


    });

router.route('/:userId/getAll')
    .get( (req, res) => {
        SHOW.find({},  (err, shows) => {
            if (err) {
                handleError(err, res, 'Shows Not Found', 404);
            } else {
                SHOW.find({user_key : req.params.userId},  (err, birds) => {
                    if (err) {
                        handleError(err, res, 'Shows Not Found', 404);
                    } else {
                        res.json(birds);
                    }
                });

            }
        });
    });

router.route('/search')
    .post( (req, res) => {
        const term = req.body.term;
        SHOW.find({},  (err, birds) => {
            if (err) {
                handleError(err, res, 'Shows Not Found', 404);
            } else {
                var result = [];

                for (var i = 0; i < birds.length; i++) {
                    if (birds[i].name.toLowerCase().startsWith(term)) {
                        result.push(birds[i]);
                    }
                }

                res.json(result);
            }
        });
    });

router.route('/:birdId/getBird')
    .get( (req, res) => {
        SHOW.findById(req.params.birdId,  (err, bird) => {
            if (err) {
                handleError(err, res, 'Shows Not Found', 404);
            } else {
                res.json(bird);

            }
        });
    });

router.route('/all')
    .get( (req, res) => {
        SHOW.find({},  (err, shows) => {
            if (err) {
                handleError(err, res, 'Shows Not Found', 404);
            } else {
                SHOW.find({},  (err, birds) => {
                    if (err) {
                        handleError(err, res, 'Shows Not Found', 404);
                    } else {
                        res.json(birds);
                    }
                });

            }
        });
    });

router.route('/compare')
    .get( (req, res) => {
        SHOW.find({},  (err, shows) => {
            if (err) {
                handleError(err, res, 'Shows Not Found', 404);
            } else {
                SHOW.find({},  (err, birds) => {
                    if (err) {
                        handleError(err, res, 'Shows Not Found', 404);
                    } else {
                        const val1 = Math.floor(Math.random() * birds.length);
                        var compare = [];
                        compare.push(birds[val1]);
                        birds.splice(val1, 1);

                        const val2 = Math.floor(Math.random() * birds.length);
                        compare.push(birds[val2]);

                        res.json(compare);
                    }
                });

            }
        });
    })
    .post( (req, res) => {
        const down = req.body.upvote;
        const up = req.body.downvote;

        SHOW.findById(up._id, (err, bird) => {
            if (err) {
                handleError(err, res, 'Book Not Found', 404);
            } else {
                upvote(bird);
            }
        });

        SHOW.findById(down._id, (err, bird) => {
            if (err) {
                handleError(err, res, 'Book Not Found', 404);
            } else {
                downvote(bird);
            }
        });

        SHOW.find({},  (err, birds) => {
            if (err) {
                handleError(err, res, 'Shows Not Found', 404);
            } else {
                const val1 = Math.floor(Math.random() * birds.length);
                var compare = [];
                compare.push(birds[val1]);
                birds.splice(val1, 1);

                const val2 = Math.floor(Math.random() * birds.length);
                compare.push(birds[val2]);

                res.json(compare);
            }
        });

    });

function upvote(bird) {
    bird.upvotes += 1;
    bird.score += 5;
    bird.views += 1;
    bird.save((err, book) => {
                
    });
}


function downvote(bird) {
    bird.downvotes += 1;
    bird.score -= 3;
    bird.views += 1;
    bird.save((err, book) => {
                
    });
}

router.route('/week')
    .get( (req, res) => {
        SHOW.findById(weekKey, (err, bird) => {
            if (err) {
                handleError(err, res, 'Show Not Found', 404);
            } else {
                res.json(bird);
            }
        });
    });

router.route('/upload')
    .get( (req, res) => {
        res.json({})
    })
    .post((req, res) => {

        const token = req.body.token;
        console.log(token);

        auth.verifyIdToken(token).then(function(decodedToken) {
                var uid = decodedToken.uid;
                SHOW.create({
                    name: req.body.name,
                    url: req.body.url,
                    date_added: (new Date()).getTime(),
                    upvotes: 0,
                    downvotes: 0,
                    views: 0,
                    user_key: uid,
                    bio: req.body.bio,
                    score: 0
                }, (err, bird) => {
                    if (err) {
                        handleError(err, res, 'Could not save the show in the database', 500);
                    } else {
                        res.json(bird);
                    }
                });

            }).catch(function(error) {
                console.log(error);
                res.json({});

            });



    });


module.exports = router;
