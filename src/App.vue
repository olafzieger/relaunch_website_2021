<template>
  <navigation></navigation>
    <div class="transitionClass">
      <img src="http://109.239.58.167:8057/assets/3f5e8ded-8216-42f4-a923-d2ac6bf92e1f" alt="" class="transitionLogo">
    </div>
    <router-view v-slot="{ Component }">
      <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @enter-cancelled="enterCancelled"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @leave-cancelled="leaveCancelled"
        :css="false">
        <component :is="Component" />
      </transition>
    </router-view>
  <footer-test></footer-test>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import FooterTest from '@/components/FooterTest.vue'
import transition from '@/mixins/transition.js'
export default {
  mixins:[transition],
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


.transitionClass{
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  background-color: #7C7C7C;
  opacity: 1;
}

.transitionLogo{
  position: absolute;
  top: 40%
}
</style>
