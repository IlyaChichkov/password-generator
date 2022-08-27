<template>
  <div v-if="moduleVisible" class="modal-copy-success">
    <div class="bg-dark-gray-400 p-5 px-8 rounded drop-shadow-lg">
      <p>Password copied!</p>
    </div>
  </div>
</template>

<script>


export default {
  name: "CopiedModule",
  props: {
    setModuleVisible: { type: Boolean, default: true }
  },
  data(){
    return{
      moduleVisible: this.setModuleVisible
    }
  },
  created() {
    setTimeout(() => {
      this.moduleVisible = false;
      this.$emit('closed');
    }, 1000)
  }
}
</script>

<style scoped>
.modal-copy-success{
  @apply fixed top-20;
}
</style>