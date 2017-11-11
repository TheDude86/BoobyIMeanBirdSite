(function () {
    "use strict";
    // const apiUrl = "http://localhost:4500/api/shows/";
    const apiUrl = "https://bird-lairdjl.herokuapp.com/api/shows/";

    $(document).ready( () => {
        $("#login").click(() => {
            const email = $('#email').val();
            const password = $('#password').val();
            firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {

            });
        });

        $("#register").click(() => {

            const email = $('#email').val();
            const password = $('#password').val();
            firebase.auth().createUserWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {
                console.log(error);
            });
        });

        $("#logout").click(() => {
            firebase.auth().signOut();
        });

        $('#login-form').hide();
        $('#user').hide();


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                    const data = {
                        token : idToken,
                        uid : user.uid

                    };

                    $('#login-form').hide();
                    $('#user').show();

                    $.ajax({
                        url: `${apiUrl}${user.uid}/getAll`,
                        type: 'GET',
                        dataType: 'JSON',
                        success:  (data) => {
                            $("#boards").empty();

                            data.sort(function(a, b){return b.score - a.score});

                            var $div = $("<div>", {"class": "board"}).css({
                                "background": "#dddddd"
                            });
                            $div.append("<h3>Your birds</h3>")

                            for (var i = 0; i < data.length; i++) {
                                var bird = data[i];
                                $div.append(`
                                        <div class="list">
                                            <div class="list-line">
                                                <div class="list-image"><img src=${bird.url}></div>
                                                <div class="list-text"><p><b>${bird.name}</b></p> <p>Score: ${bird.score}</p><p>Views: ${bird.views}</p></div>
                                            </div>
                                            <hr>`);
                            }


                            $("#boards").append($div);
                            $("#boards").append("<br>");
                            $("#boards").append("<br>");
                        },
                        error:  (request, status, error) => {
                            console.log(error, status, request);
                        }
                    });

                    $.ajax({
                        url: `${apiUrl}register`,
                        type: 'POST',
                        data: data,
                        dataType: 'JSON',
                        success:  (data) => {

                        },
                        error:  (request, status, error) => {
                            console.log(error, status, request);
                            alert(error, status, request);
                        }
                    });


                }).catch(function(error) {

                });


            } else {
                $('#user').hide();
                $('#login-form').show();

            }
        });
    });



})();