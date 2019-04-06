<template>
  <div class="dialog-container" @click="emitDialogClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DialogContainer",
  methods: {
    emitDialogClick() {
      this.$emit("dialogClick");
    }
  }
};
</script>

<style lang="scss">
.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
</style>
