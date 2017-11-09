$(document).ready(function () {
    
        let LoggedIn = false;
        let Username = "Username";
        displayUser();
    
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
    
        $('#search-button').click(function () {
            console.log("search button clicked");
        })
    
        
    
        $('#button').click(function(){
            window.location.href='/all-ratings';
        })
    
        $('#img1').click(function() {
            // add vote function
            var num1 = Math.ceil(Math.random()*6);
            var num2 = Math.ceil(Math.random()*6);
            while (num1 == num2) {
                var num2 = Math.ceil(Math.random()*6);
            }
            $('#img1').attr('src', `images/${num1}.jpg`);
            $('#img2').attr('src', `images/${num2}.jpg`);
        })
    
        $('#img2').click(function() {
            // add vote function
            var num1 = Math.ceil(Math.random()*6);
            var num2 = Math.ceil(Math.random()*6);
            while (num1 == num2) {
                var num2 = Math.ceil(Math.random()*6);
            }
            $('#img1').attr('src', `images/${num1}.jpg`);
            $('#img2').attr('src', `images/${num2}.jpg`);
        })
    });
    