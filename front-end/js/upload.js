(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";
    var file;
    var token;

    function uploadBird(url) {

        const bird = {
            name : $('#name').val(),
            bio : $('#bio').val(),
            url : url,
            token: token
        };

        console.log(bird);

        $.ajax({
            url: `${apiUrl}upload`,
            type: 'POST',
            data: bird,
            dataType: 'JSON',
            success:  (data) => {
                console.log(data.name);

            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    $(document).ready( () => {
        $("#register").click(() => {
            
        });

        $('#fileButton').change(function(e){
            file = e.target.files[0];

        });

        $('#upload').click(() => {
            if (file) {
                var storageRef = firebase.storage().ref(file.name);
                storageRef.put(file).then((snapshot) => {
                    uploadBird(snapshot.downloadURL);
                });
            }

        });

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                    token = idToken;
                    console.log(idToken);
                }).catch(function(error) {

                });

            } else {
                $('#upload').hide();
            }
        });

    });

})();