<template>
  <form class="uploader">
    <input ref="input" type="file" @change="onChange" />
  </form>
</template>



<script>
export default {
  name: 'Uploader-Dropzone',

  methods: {
    onChange (event) {
      this.$store.dispatch('Files/upload',event.target.files);
      this.$refs.input.value = null;
    }
  }
}
</script>


<style>
.uploader {
  width: 100%;
  height: 400px;
  border: 1px solid #cdcdcd;
}
</style>
