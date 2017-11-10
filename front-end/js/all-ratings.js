(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";

    $(document).ready( () => {
        $.ajax({
            url: `${apiUrl}all`,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {

                data.sort(function(a, b){return b.score - a.score});

                for (var i = 0; i < data.length; i++) {
                    var bird = data[i];
                    $("#display").append(`<div> <img src="${bird.url}" alt="${bird.name}"> 
                        <p><span class="upvote">${bird.upvotes}</span><span class="mid-bar">|</span><span class="downvote">${bird.downvotes}</span></p>
                        </div>`);
                }
                
                

            },
            error:  (request, status, error) => {
                console.log(error, status, request);
                alert(error, status, request);
            }
        });

    });

})();