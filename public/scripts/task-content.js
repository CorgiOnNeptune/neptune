$(() => {
  $(".complete-status").click(() => {
    $(".complete-status").fadeOut(250, function() {
      if ($(this).attr("src") === "images/not-completed.png") {
        $(this).attr("src", "images/completed.png");
        $(this).removeClass("not-completed");
        $(this).addClass("completed");
      } else {
        $(this).attr("src", "images/not-completed.png");
        $(this).removeClass("completed");
        $(this).addClass("not-completed");
      }
    }).fadeIn(250);
  });
});
