<style>
.foot {
  position: absolute;
  bottom: 0;
  display: none;
  left: 0;
  width: 50%;
}

.foot-right {
  transform: scaleX(-1);
  right: 0;
  left: unset;
}

#foot-cont {
  width: 100%;
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

function printFoot(times, added = false, immediate = false) {
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
  if(!immediate){
  $(newFoot)
    .hide()
    .appendTo("#foot-cont")
    .fadeIn(300);
          $("#foot-cont").height($("#foot-cont").height() + printOffset);
  $("#foot-cont").scrollTop(0);

  }else{
    $(newFoot).appendTo("#foot-cont").show();
      $("#foot-cont").height($("#foot-cont").height() + printOffset);
  $("#foot-cont").scrollTop(printOffset, { duration: 0 });
  $("#foot-cont").scrollTop(0, { duration: 200 });

  }

  $("#foot-cont img").each(function(id, el) {
    $(el).css("bottom", $(el).attr("data-bottom"));
  });

if(!immediate){
  setTimeout(function() {
    printFoot(--times, added, immediate);
  }, 500);
}else{
      printFoot(--times, added, immediate);

}
}

printFoot(printCount);

function addNewFootprints(count) {
  $("#foot-cont img").removeClass("added");
  printFoot(count, true);
}

export default {
  name: 'Journey',
  mounted() {
    printFoot(10, false, true);
    addNewFootprints(2);
  }
}
</script>