<template>
  <div class="slider">
    <div class="slider-bg">
      <div class="slider-progress"></div>
      <div v-on:drag.prevent="dragThumb($event)" class="slider-thumb"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSlider",
  methods: {
    dragThumb: function (e){
      console.log(e.target.style);
      e.target.style.left = e.clientX + 'px';
    }
  }
}
</script>

<style scoped>
.slider-bg{
  @apply relative w-full h-[10px] bg-dark-gray-400;
}
.slider-thumb{
  @apply absolute top-0 w-[25px] h-[25px] bg-white rounded-full;
}
.slider-progress{
  @apply w-full h-full bg-light-green;
}
</style>