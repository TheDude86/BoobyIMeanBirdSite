$(document).ready(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";
    var bird1;
    var bird2;

    $('#button').click(function(){
        window.location.href='all-ratings-page.html';
    })

    $.ajax({
        url: `${apiUrl}compare`,
        type: 'GET',
        dataType: 'JSON',
        success:  (data) => {
            bird1 = data[0];
            bird2 = data[1];

            $('#img1').attr('src', bird1.url);
            $('#img2').attr('src', bird2.url);

        },
        error:  (request, status, error) => {
            console.log(error, status, request);
        }
    });

    $('#img1').click(function() {
        const data = {
            upvote: bird2,
            downvote: bird1
        };

        $.ajax({
            url: `${apiUrl}compare`,
            type: 'POST',
            data: data,
            dataType: 'JSON',
            success:  (data) => {
                bird1 = data[0];
                bird2 = data[1];

                $('#img1').attr('src', bird1.url);
                $('#img2').attr('src', bird2.url);

            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    })

    $('#img2').click(function() {
        const data = {
            upvote: bird1,
            downvote: bird2
        };

        $.ajax({
            url: `${apiUrl}compare`,
            type: 'POST',
            data: data,
            dataType: 'JSON',
            success:  (data) => {
                bird1 = data[0];
                bird2 = data[1];

                $('#img1').attr('src', bird1.url);
                $('#img2').attr('src', bird2.url);

            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    })
});
