(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";

    $(document).ready( () => {
        $.ajax({
            url: `${apiUrl}week`,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                $('#bio').text(data.bio);
                $('#name').text(data.name);
                $('#picture').attr("src", data.url);
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
                alert(error, status, request);
            }
        });

    });

})();