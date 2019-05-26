<style>
.foot {
  position: absolute;
  bottom: 0;
  display: none;
  left: 0;
}

.foot-right {
  transform: scaleX(-1);
  right: 0;
  left: unset;
}

#foot-cont {
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  min-height: 200px;
}

#foot-cont img:not(.added) {
  filter: brightness(0%);
}
</style>
<template>
  <div id="foot-cont"></div>
</template>

<script>
var printCount = 12;
var printOffset = 200;
var isLeft = true;

function printFoot(times, added = false) {
  console.log(times);
  if (times <= 0) {
    return;
  }
  var existing = $("#foot-cont img").length;
  if (existing % 2 == 0) {
    isLeft = true;
  } else {
    isLeft = false;
  }
  var bottom = existing * printOffset;
  var newFoot = $(
    '<img data-attr-step="' +
      (existing + 1) +
      '" class="foot ' +
      (added ? "added" : "") +
      '" src="/images/singleprint.png" />'
  ).css("bottom", bottom);
  newFoot.attr("data-bottom", bottom);
  if (!isLeft) {
    newFoot.addClass("foot-right");
  }
  $(newFoot)
    .hide()
    .appendTo("#foot-cont")
    .fadeIn(300);
  $("#foot-cont").height($("#foot-cont").height() + printOffset);
  $("#foot-cont").scrollTop(printOffset, { duration: 0 });
  $("#foot-cont").scrollTop(0, { duration: 200 });

  $("#foot-cont img").each(function(id, el) {
    $(el).css("bottom", $(el).attr("data-bottom"));
  });

  setTimeout(function() {
    printFoot(--times, added);
  }, 500);
}

printFoot(printCount);

function addNewFootprints(count) {
  $("#foot-cont img").removeClass("added");
  printFoot(count, true);
}
</script>