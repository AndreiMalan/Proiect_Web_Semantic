$(document).ready(function() {
    $("#get-data-btn").click(function() {
        $.ajax({
            type: "GET",
            url: "scrapping.php",
            success: function(response) {
                $("#data-container").html(response);
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    });
});