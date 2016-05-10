$(document).ready(function() {
    goToByScroll("switch-container");
    $(".toggle").click(function() {
        if ($(this).children("input").is(":checked"))
            $(this).parent().parent().parent().addClass("focus-layout-active");
        else
            $(this).parent().parent().parent().removeClass("focus-layout-active");
        // $("#submit").trigger("click");
    });

    // $('#submit').click(function() {
    //     return true;
    // });

    // $.get("currentstatus", function(data) {
    //     //    console.log(data);
    //     $.each(data, function(index, value) {
    //         if (index != '_id') {
    //             var x = '[name="' + index + '"]';
    //             $(x).prop('checked', value);
    //             console.log(x, value);
    //         }
    //     });
    // });
    // var upd = setTimeout(update, 100);
    // // update();
    //
    // function update() {
    //     $("input[type=checkbox]").each(function() {
    //         //    console.log(this,$(this).is(":checked"));
    //         if ($(this).is(":checked"))
    //             $(this).parent().parent().parent().parent().addClass("focus-layout-active");
    //         else
    //             $(this).parent().parent().parent().parent().removeClass("focus-layout-active");
    //     });
    // }

    function goToByScroll(id) {
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        }, 1);
    }
});
