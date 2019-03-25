<template>
  <v-layout wrap>
      <div class="calendar-button-container">
      <button class="calendar" @click="$refs.calendar.prev()">
        <v-icon  dark left>keyboard_arrow_left</v-icon>
      </button>
      <button class="calendar" @click="$refs.calendar.next()">
        <v-icon  right dark>keyboard_arrow_right</v-icon>
      </button>
</div>
    <v-flex xs12 class="mb-3">
      <v-sheet height="500">
        <v-calendar ref="calendar" v-model="start" :type="type" :end="end" color="primary"></v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    type: "month",
    start: "2019-01-01",
    end: "2019-01-06",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "4 Day", value: "4day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" },
      { text: "Custom Daily", value: "custom-daily" },
      { text: "Custom Weekly", value: "custom-weekly" }
    ]
  })
};
</script>

<style lang="scss" scoped>
div.v-sheet{
    height: 360px !important;
}
.v-icon--right{
    margin-left: 0px !important;
}
</style>


<style lang="scss" >
$primary-color: rgb(0, 132, 137);


div.v-calendar-weekly__day{
    background-color:rgb(237, 246, 246);
    border: 1.5px solid white !important;
    border-radius:6px !important;
}
div.v-calendar-weekly__day:hover{
    cursor: pointer;
    background-color:rgb(167, 208, 208);
}

div.v-calendar-weekly__day-label{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color:$primary-color;
    font-size: 18px !important;
    font-weight:800;
    &:hover{
        text-decoration:none;
    }
}

div.v-outside  div.v-calendar-weekly__day-label{
    color:#d7d7d7 ;
}

div.v-past  div.v-calendar-weekly__day-label{
    color:#d7d7d7 ;
}
div.v-past{
 background-color: #f7f7f7 !important;
}

.theme--dark.v-icon{
    color:black !important;
}
button:focus{
    outline: none;
}
div.calendar-button-container{
    display:flex;
    justify-content:flex-end;
}

</style>

