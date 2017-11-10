(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";

    $(document).ready( () => {
        $("#register").click(() => {
            firebase.auth().createUserWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {

            });
        });

        $("#login").click(() => {
            firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {

            });
        });

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                    const data = {
                        token : idToken,
                        uid : user.uid

                    };

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

            }
        });


    });

})();