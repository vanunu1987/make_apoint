<template>
    
     <GmapMap
  :center="mapCenter"
  :zoom="16"
  map-type-id="terrain"
  style="width: 100vw; height:350px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
  />
</GmapMap>
</template>

<script>
export default {
    props:["loc"],
    data() {
    return {
      m: {
        position: { lat: 34.38, lng: 34.8 }
      },
      mapCenter: this.loc,
      markers: [
        {
          label: "a place",
          position: this.loc
        }
      ],
   
    }
  },
}
</script>

