$(document).ready(function () {
    $('#results').hide();

    $('#search-box').on('focus', function () {
        $('#results').show();
    });

    $('.result').on('click', function () {
        window.location.href='detail-page.html';
    })
});
