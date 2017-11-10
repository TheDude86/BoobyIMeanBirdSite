(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";
    var file;

    function uploadBird(url) {

        const bird = {
            name : $('#name').val(),
            bio : $('#bio').val(),
            url : url
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
                alert(error, status, request);
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
            console.log("TEST");
            if (file) {
                var storageRef = firebase.storage().ref(file.name);
                storageRef.put(file).then((snapshot) => {
                    uploadBird(snapshot.downloadURL);
                });
            }

        });


    });

})();