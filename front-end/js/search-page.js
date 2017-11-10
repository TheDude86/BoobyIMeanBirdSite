$(document).ready(function () {
    "use-strict";
    let LoggedIn = false;
    let Username = "Username";
    let apiUrl = "http://localhost:3000/";

    function displayUser() {
        if (LoggedIn) {
            displayUsername();
        } else {
            login();
        }
    }

    function displayUsername() {
        let user = $(`<span>username</span>`).css({
            'float': 'right',
            'margin-right': '2%',
            'font-size': '20px'
        });
        $('#banner').append(user);
    }

    function login() {
        let login = $(`<button>Log in</button>`).addClass('login').css({
            'float': 'right',
            'font-size': '20px',
            'align-content': 'right',
            'border-radius': '5px',
            'margin-right': '2%'
        }).click(function () {
            $('.login').hide();
            let form = $(`<div></div>`).addClass('form');
            form.append($(`<label for="username">Username: </label>`));
            form.append($(`<input name="username" type="text">`).addClass('username-box'));
            form.append($(`<label for="password">Password: </label>`));
            form.append($(`<input name="password" type="text">`).addClass('password-box'));
            form.append($(`<button>submit</button>`).addClass('submit').click(function () {
                //connect to backend
                console.log("trying to log in");
                //if logged in successfully
                LoggedIn = true;
                $('.form').hide();
                displayUser();
            }));
            form.css({
                'font-size': '20px',
                'float': 'right',
                'align-content': 'right',
                'border-radius': '5px',
                'margin-right': '2%'
            });
            $('#banner').append(form);
        });
        $('#banner').append(login);
    }

    function updateResults(str) {
        $('#results').html('');
        $.ajax({
            url: apiUrl + 'bird/',
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    data.forEach(function(element) {
                        if (str == undefined) {
                            let result = $(`<div></div>`).addClass('result');
                            let img = $(`<img>`);
                            let name = $(`<span></span>`);
                            img.attr('src', element.url);
                            name.text(element.name);
                            result.append(img);
                            result.append(name);
                            $('#results').append(result);
                        } else if (element.name.indexOf(str) != -1) {
                            let result = $(`<div></div>`).addClass('result');
                            let img = $(`<img>`);
                            let name = $(`<span></span>`);
                            img.attr('src', element.url);
                            name.text(element.name);
                            result.append(img);
                            result.append(name);
                            $('#results').append(result);
                        }
                    });
                } else {
                    console.log("Bird not Found");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }    

    $('#search-box').on('focus', function () {
        updateResults();
        $('#results').show();
    });

    $('#search-box').on('focusout', function () {
        $('#results').hide();
    });

    $('#search-box').on('input', function () {
        searchString = $(this).val();
        if (searchString.length < 1) {
            searchString = undefined;
        }
        updateResults(searchString);
    });

    $('.result').on('click', function () {
        window.location.href='detail-page.html';
    })
});
