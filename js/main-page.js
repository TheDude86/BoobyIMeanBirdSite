(function () {
    function searchBird() {
        console.log("search button clicked");
    }

    $(document).ready(function () {
        const search = $('#search-button').on('click', searchBird)
    });
});