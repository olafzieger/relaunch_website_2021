<template>
  <navigation></navigation>
  <router-view/>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
export default {
  components:{
    Navigation
  }  

}
</script>
<style lang="scss">
@import "./assets/style/scss/style.scss";


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding:0;
}
</style>
