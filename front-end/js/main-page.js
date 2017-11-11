(function () {
    "use-strict";
    let LoggedIn = false;
    let Username = "Username";
    // let apiUrl = "http://localhost:3000/";
    // const apiUrl = "https://bird-lairdjl.herokuapp.com/";
    const apiUrl = "https://bird-lairdjl.herokuapp.com/api/shows/";    

    $.ajax({
        url: apiUrl + 'bird/',
        type: 'GET',
        dataType: 'JSON',
        success:  (data) => {
            if (data) {
                let bird = data[0];
                console.log(bird);
                
                $('#name').text(bird.name);
            } else {
                console.log("Bird not Found");
            }
        },
        error:  (request, status, error) => {
            console.log(error, status, request);
        }
    });

    $.ajax({
        url: apiUrl + 'bird/',
        type: 'GET',
        dataType: 'JSON',
        success:  (data) => {
            if (data) {
                let bird = data[0];
                console.log(bird);
                
                $('#description').text(bird.bio);
            } else {
                console.log("Bird not Found");
            }
        },
        error:  (request, status, error) => {
            console.log(error, status, request);
        }
    });

    $.ajax({
        url: apiUrl + 'bird/',
        type: 'GET',
        dataType: 'JSON',
        success:  (data) => {
            if (data) {
                let bird = data[0];
                console.log(bird);
                
                $('#img').attr("src", bird.url);
            } else {
                console.log("Bird not Found");
            }
        },
        error:  (request, status, error) => {
            console.log(error, status, request);
        }
    });

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

    $(document).ready( () => {
        // get contacts from api
        $('#search-button').click(function () {
            window.location.href='search-page.html';
        });
        $.ajax({
            url: apiUrl + 'bird/',
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    let bird = data[0];
                    console.log(bird);
                    
                    $('#description').text(bird.bio);
                } else {
                    console.log("Contact not Found");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
        displayUser();
    });


})();