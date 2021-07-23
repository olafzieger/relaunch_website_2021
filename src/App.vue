<template>
  <navigation></navigation>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  <footer-test></footer-test>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import FooterTest from '@/components/FooterTest.vue'

export default {
  created(){
    console.log("App",this.$router.currentRoute._value.fullPath)
  },
  components:{
    Navigation,
    FooterTest
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

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}


.scale-slide-enter-from {
  left: -100%;
}


.scale-slide-enter-to {
  left: 0%;
}


.scale-slide-leave-from {
  transform: scale(1);
}


.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>
