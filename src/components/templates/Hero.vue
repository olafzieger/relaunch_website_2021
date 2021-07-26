<template>
  <div>
    <div class="OuterContainer hero">
      <div class="InnerContainer hero" v-if="article">
        <div class="hero" :class="customhero">
          <div class="content">
            <h1>{{ article.titel }}</h1>
            <h2>{{ article.untertitel }}</h2>
            <div v-if="article.navigation" class="hero_nav_wrapper">
              <span  v-for="item,index in article.navigation.inhalte" :key="index" class="hero_nav" @click="moveTo(item.page_navigations_id.internes_ziel)">
                {{item.page_navigations_id.titel}}</span>
            </div>           
          
          </div>
          <div v-if="this.article.bild">
            <img
              :src="asset_url + this.article.bild"
              alt=""
              class="heroImage"
            />
          </div>
          <div v-else-if="this.article.video">
            <video class="heroVideo" autoplay muted loop>
              <source
                :src="asset_url + this.article.video"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";

export default {
  data() {
    return {
      customhero: {
        backgroundImage: null,
        asset_url:null
      },
    };
  },
  methods:{
    moveTo(classIn){
      console.log("move to",classIn)
      gsap.registerPlugin(ScrollToPlugin);

      gsap.to(window, {duration: 2, scrollTo:"."+classIn });
    }
  },
  props: {
    article: Object,
  },
  mounted() {
    if (this.article) {
      this.customhero.backgroundImage =
        "http://localhost:8055/assets/" + this.article.bild;
      console.log(this.customhero);
    }
    console.log("hero process url",process.env.VUE_APP_BASE_URL)
    this.asset_url=process.env.VUE_APP_ASSET_URL

  },
};
</script>
<style lang="scss">

</style>