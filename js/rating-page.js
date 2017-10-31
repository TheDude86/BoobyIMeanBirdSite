$(document).ready(function () {
    $('#button').click(function(){
        window.location.href='all-ratings-page.html';
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
