<template>
  <div class="about">
    <h1>About Us</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum incidunt est, officiis accusamus voluptates expedita nam fuga error, inventore harum dolores alias autem exercitationem fugiat! Ea rerum tenetur pariatur obcaecati?
    </p>
<div
    v-resize.count="onResize"
    class="kept"
  >
    <div>
      <b>Resize count : {{resizeCount}} </b>
    </div>
    <div class="ui-widget-content">
      <b>kept alive</b>
    </div>
  </div>
  </div>
</template>
<script>
import resize from 'vue-resize-directive'
export default {
  directives: {
    resize
  },
  data() {
    return {
      resizeCount: 0
    };
  },
  methods: {
    onResize() {
      this.resizeCount++;
    }
  }
};
</script>
<style>
.kept {
  width: 20%;
  height: 20%;
  background-color: antiquewhite;
}
</style>