$(document).ready(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";

    $(document).ready( () => {

        $('#search-box').on('input', function () {
            const searchString = $(this).val().toLowerCase();
            console.log("Test " + searchString);

            if (searchString.length > 0) {
                const data = {term : searchString};

                    $.ajax({
                        url: `${apiUrl}search`,
                        type: 'POST',
                        data: data,
                        dataType: 'JSON',
                        success:  (data) => {
                    var $div = $("<div>", {"class": "board"});
                    $("#boards").empty();
                    $div.append("<h3>Results</h3>")

                    for (var i = 0; i < data.length; i++) {
                        var bird = data[i];

                        var $list = $("<div>", {"class": "list"});
                        const $id = $(`<div>${i}</div>`);

                        $list.append(`
                                    <div class="list-line">
                                        <div class="list-image"><img src=${bird.url}></div>
                                        <div class="list-text">
                                            <p>${bird.name}</p> 
                                            <p>Score: ${bird.score}</p>
                                        </div>
                                    </div>`);
                        $id.hide();
                        $list.append($id);

                        $list.click(() => {
                            birds.sort(function(a, b){return b.score - a.score});
                            modal.style.display = "block";
                            $("#modal-name").text($list.find("div")[0]);
                        });

                        $div.append($list);
                        $div.append(`<hr>`);
                    }


                    $("#boards").append($div);
                    $("#boards").append("<br>");
                    $("#boards").append("<br>");
                    $("#boards").append("<br>");

                    },
                    error:  (request, status, error) => {
                        console.log(error, status, request);
                    }
                });
            }
        });

    });

});
