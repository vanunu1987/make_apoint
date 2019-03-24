<template>
  <div class="home-filter">
    <!-- <h1>{{ msg }}</h1> -->
    <input type="search" placeholder="Find your service" @keyup.enter="find">
  </div>
</template>

<script>
export default {
  name: 'HomeFilter',
  props: {
    msg: String
  },
  methods:{
    find(ev){
      ev.target.blur()
      console.log('emiting');
      this.$emit('find')
    },
    blur(ev){
      ev.target.blur()
    }
  }
}
</script>


<style scoped lang="scss">

</style>
