(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";

    $(document).ready( () => {
        $("#register").click(() => {
            firebase.auth().createUserWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {

            });
        });

    });

})();