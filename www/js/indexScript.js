$(document).ready(function(){
    $(".toggle").click(function(){
//        if($(this).children("input").val()){}
      console.log($(this).children("input"));
        $(this).parent().parent().parent().addClass("focus-layout-active");
        $(this).parent().parent().parent().addClass("focus-layout-active");
    });
});
