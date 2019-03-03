<template>
  <div id="app">
    <uploader-dropzone />
  </div>
</template>

<script>
import UploaderDropzone from './components/UploaderDropzone';

export default {
  name: 'app',
  components: {
    UploaderDropzone,
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
