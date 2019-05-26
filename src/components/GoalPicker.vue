<template>
  <div style="width: 100%; height: 100%">
    <div class="swipe-wrapper">
      <div v-for="goal in goals" :key="goal.Id" :data-id="goal.TaskId" class="demo__card">
        <div class="demo__card__top">
          <div class="demo__card__cat"></div>
          <p class="demo__card__name">{{ goal.TaskDescription }}</p>
        </div>
        <div class="demo__card__btm"></div>
        <div class="demo__card__choice m--reject"></div>
        <div class="demo__card__choice m--like"></div>
        <div class="demo__card__drag">
          <i class="fas fa-info"></i>
          <i class="fas fa-question"></i>
        </div>
      </div>
    </div>
    <v-btn block class="mt-4" color="success" @click="getStarted">Let's go!</v-btn>
    <v-dialog v-model="isEditorOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar>
          <v-btn icon @click="isEditorOpen = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Goal</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click="addTask">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-form>
            <v-text-field v-model="editor.name" label="Task name" required class="mt-1"></v-text-field>
            <v-label>How often?</v-label>
            <div class="weekDays-selector">
              <input
                v-model="editor.weekday.monday"
                :checked="editor.weekday.monday"
                type="checkbox"
                id="weekday-mon"
                class="weekday"
              >
              <label for="weekday-mon">M</label>
              <input
                v-model="editor.weekday.tuesday"
                type="checkbox"
                id="weekday-tue"
                class="weekday"
              >
              <label for="weekday-tue">T</label>
              <input
                v-model="editor.weekday.wednesday"
                type="checkbox"
                id="weekday-wed"
                class="weekday"
              >
              <label for="weekday-wed">W</label>
              <input
                v-model="editor.weekday.thursday"
                type="checkbox"
                id="weekday-thu"
                class="weekday"
              >
              <label for="weekday-thu">T</label>
              <input
                v-model="editor.weekday.friday"
                type="checkbox"
                id="weekday-fri"
                class="weekday"
              >
              <label for="weekday-fri">F</label>
              <input
                v-model="editor.weekday.saturday"
                type="checkbox"
                id="weekday-sat"
                class="weekday"
              >
              <label for="weekday-sat">S</label>
              <input
                v-model="editor.weekday.sunday"
                type="checkbox"
                id="weekday-sun"
                class="weekday"
              >
              <label for="weekday-sun">S</label>
            </div>
            <v-btn @click="setWeekdays" color="info" class="ml-0">Weekdays</v-btn>
            <v-btn @click="setWeekends" color="info">Weekends</v-btn>

            <v-select v-model="editor.length" :items="howLongWeeks" label="How long?"></v-select>
            <v-select v-model="editor.when" :items="when" label="When?"></v-select>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import store from "../State";

var animating = false;
var cardsCounter = 0;
var numOfCards = 1000;
var decisionVal = 80;
var pullDeltaX = 0;
var deg = 0;
var $card, $cardReject, $cardLike;

let blankEditor = {
        name: "",
        weekday: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: true
        }
      };

export default {
  name: "GoalPicker",
  data() {
    return {
      //goals: store.goalsForSelectedCategories()
      isEditorOpen: false,
      editor: {
        name: "",
        weekday: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
        }
      },
      howLongWeeks: [
          "1 week",
          "2 weeks",
          "3 weeks",
          "4 weeks"
      ],
      when: [
          "Morning",
          "Afternoon",
          "Evening"
      ]
    };
  },
  mounted() {
    let $this = this;

    function pullChange() {
      animating = true;
      deg = pullDeltaX / 10;
      $card.css(
        "transform",
        "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)"
      );

      var opacity = pullDeltaX / 100;
      var rejectOpacity = opacity >= 0 ? 0 : Math.abs(opacity);
      var likeOpacity = opacity <= 0 ? 0 : opacity;
      $cardReject.css("opacity", rejectOpacity);
      $cardLike.css("opacity", likeOpacity);
    }

    function release() {
      let add = false;
      if (pullDeltaX >= decisionVal) {
        $card.addClass("to-right");
        add = true;
      } else if (pullDeltaX <= -decisionVal) {
        $card.addClass("to-left");
      }

      if (Math.abs(pullDeltaX) >= decisionVal) {
        $card.addClass("inactive");

        if (add) {
          $this.openEditor($card.data("id"));
        }

        setTimeout(function() {
          $card.addClass("below").removeClass("inactive to-left to-right");
          cardsCounter++;
          if (cardsCounter === numOfCards) {
            cardsCounter = 0;
            $(".demo__card").removeClass("below");
          }
        }, 300);
      }

      if (Math.abs(pullDeltaX) < decisionVal) {
        $card.addClass("reset");
      }

      setTimeout(function() {
        $card
          .attr("style", "")
          .removeClass("reset")
          .find(".demo__card__choice")
          .attr("style", "");

        pullDeltaX = 0;
        animating = false;
      }, 300);
    }

    $(document).on(
      "mousedown touchstart",
      ".demo__card:not(.inactive)",
      function(e) {
        if (animating) return;

        $card = $(this);
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        var startX = e.pageX || e.originalEvent.touches[0].pageX;

        $(document).on("mousemove touchmove", function(e) {
          var x = e.pageX || e.originalEvent.touches[0].pageX;
          pullDeltaX = x - startX;
          if (!pullDeltaX) return;
          pullChange();
        });

        $(document).on("mouseup touchend", function() {
          $(document).off("mousemove touchmove mouseup touchend");
          if (!pullDeltaX) return; // prevents from rapid click events
          release();
        });
      }
    );
  },
  computed: {
    goals() {
      return store.goalsForSelectedCategories;
    }
  },
  methods: {
    openEditor(id) {
      if (!id) return;


      var goal = store.db.Tasks.find(t => t.TaskId === id);
      this.editor = {...blankEditor};
      this.editor.name = goal.TaskDescription;
      this.isEditorOpen = true;
    },
    addTask() {
      store.addGoal({ ...this.editor });
      this.isEditorOpen = false;
    },
    getStarted() {
      store.setPage("goals");
    },
    setWeekdays() {
      this.editor.weekday.monday = true;
      this.editor.weekday.tuesday = true;
      this.editor.weekday.wednesday = true;
      this.editor.weekday.thursday = true;
      this.editor.weekday.friday = true;
      this.editor.weekday.saturday = false;
      this.editor.weekday.sunday = false;
    },
    setWeekends() {
      this.editor.weekday.monday = false;
      this.editor.weekday.tuesday = false;
      this.editor.weekday.wednesday = false;
      this.editor.weekday.thursday = false;
      this.editor.weekday.friday = false;
      this.editor.weekday.saturday = true;
      this.editor.weekday.sunday = true;
    }
  }
};
</script>

<style>
.swipe-wrapper {
  position: relative;
  height: 80%;
}

.demo {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 54rem;
  margin-top: -27rem;
  background: #f6f6f5;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

.demo__header {
  height: 6rem;
  background: #002942;
}

.demo__content {
  overflow: hidden;
  position: relative;
  height: 48rem;
  padding-top: 4.5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.demo__card-cont {
  position: relative;
  width: 24rem;
  height: 32rem;
  margin: 0 auto 5rem;
}

.demo__card {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: #999 1px 1px 1px;
  border-radius: 5px;
  padding: 5px;
}

.demo__card.reset {
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-transform: translateX(0) !important;
  transform: translateX(0) !important;
}

.demo__card.reset .demo__card__choice {
  transition: opacity 0.3s;
  opacity: 0 !important;
}

.demo__card.inactive {
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}

.demo__card.to-left {
  -webkit-transform: translateX(-30rem) rotate(-30deg) !important;
  transform: translateX(-30rem) rotate(-30deg) !important;
}

.demo__card.to-right {
  -webkit-transform: translate(30rem) rotate(30deg) !important;
  transform: translate(30rem) rotate(30deg) !important;
}

.demo__card.below {
  z-index: 1;
}

.demo__card__top {
  height: 20.5rem;
  padding-top: 4rem;
}

.demo__card__img {
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  border: 0.5rem solid #ffffff;
  background-size: cover;
}

.demo__card__cat {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #888;
  text-transform: uppercase;
}

.demo__card__name {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #000;
}

.demo__card__btm {
  background: #ffffff;
}

.demo__card__drag .fas {
  bottom: 20px;
  position: absolute;
  right: 20px;
  border-radius: 50%;
  border: 1px solid black;
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 4px;
  font-size: 20px;
}

.demo__card__drag .fas:hover {
  background-color: #ccc;
  cursor: pointer !important;
}
.demo__card__drag .fas.fa-info {
  right: 60px;
}

.demo__card__we {
  text-align: center;
  font-size: 2.2rem;
  line-height: 11.5rem;
}

.demo__card__choice {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.demo__card__drag {
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: -webkit-grab;
  cursor: grab;
}

.demo__tip {
  text-align: center;
  font-size: 2.2rem;
}

.demo__card__choice.m--reject {
  background: rgba(255, 22, 22, 0.2);
}

.demo__card__choice.m--like {
  background: rgba(22, 255, 22, 0.2);
}

.weekDays-selector input {
  display: none !important;
}

.weekDays-selector input[type="checkbox"] + label {
  display: inline-block;
  border-radius: 6px;
  background: #dddddd;
  height: 40px;
  width: 30px;
  margin-right: 3px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.weekDays-selector input[type="checkbox"]:checked + label {
  background: #2ad705;
  color: #ffffff;
}
</style>