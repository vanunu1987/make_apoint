<template>
  <dialog-container class="calendar-dialog">
    <header>
      <i class="fas fa-times close-btn" @click="emitCloseBtnClick"></i>
    </header>

    <main>
      <!-- <make-appoint-time-date-picker></make-appoint-time-date-picker> -->
      <make-appoint class="calendar"></make-appoint>
    </main>
  </dialog-container>
</template>

<script>
import DialogContainer from "@/components/General/DialogContainer.vue";
import MakeAppoint from '@/components/MakeAppoint'
// import MakeAppointTimeDatePicker from "@/components/Details/MakeAppointTimeDatePicker.vue";

export default {
  components: {
    DialogContainer,
    // MakeAppointTimeDatePicker,
    MakeAppoint,
  },
  methods: {
    emitCloseBtnClick() {
      this.$emit("closeBtnClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar-dialog {
  background-color: white;
  z-index: 6;
}

header {
  height: 56px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 26px;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 56px;
}

.close-btn {
  padding: 8px;
}
</style>
