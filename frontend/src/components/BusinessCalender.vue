<template>
  <div class="calender">

    <v-btn color="indigo" @click="emitClose">close</v-btn>
    <v-btn color="orange" @click="addEvent()">makeAppoint!</v-btn>
    <br>
    <input type="text" placeholder="title" v-model=" currEvent.title">
    <input type="text" placeholder="date" v-model=" currEvent.date">
    <input type="text" placeholder="time" v-model=" currEvent.time">
    <input type="text" placeholder="duration" v-model=" currEvent.duration">
    

  <v-layout>
    <v-flex>
      <v-sheet height="400">
        <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          color="primary"
          type="week"
          
        >
         
          <!-- the events at the bottom (timed) -->
          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.time"
                :key="event.title"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                :class="{ available: event.status == 'available' }"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>

  </div>
</template>

<script>
  export default {
    data: () => ({
        time: null,
        menu2: false,
        modal2: false,
      today: '2019-01-08',
      currEvent:{
          title:'ff',
          date: '2019-01-07',
          time:'13:00',
          duration: 60
      },
      events: [
        {
          title: 'Weekly Meeting',
          date: '2019-01-07',
          time: '09:00',
          duration: 45,
          status: 'available',
        },
        {
          title: 'haircut',
          date: '2019-01-08',
          time: '09:00',
          duration: 60,
          status: 'available',
        },
        {
          title: 'Mash Potatoes',
          date: '2019-01-09',
          time: '12:30',
          duration: 180,
          status: 'available',
        }
      ]
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    mounted () {
      this.$refs.calendar.scrollToTime('08:00')
    },
    methods: {
        emitClose(){
            console.log('activated')
            this.$emit('closecalender')
        },
      open (event) {
        alert(event.title)
        console.log(event)
      },
       addEvent(){
        this.events.push(this.currEvent)
        console.log('hi')
    },
    getTime(){
        console.log(this.time)
    }
    },
  }
</script>

<style lang="stylus" scoped>
input{
    background-color:white;
    margin-bottom:20px;
    margin-right:8px;
}

div.v-calendar-daily__day-interval{
    background-color:red;
}
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;

    &.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }

    &.available{
        background-color:green;
    }

  }
</style>
