<template>
  <div>


    <!--<component v-bind:is="currentTabComponent" class="tab"></component>-->
    <div v-for="(part, index) in page_elements" :key="index">
      <component
        v-bind:is="part.item.template_name"
        :article="part.item"
        class="tab"
      ></component>
    </div>
  </div>
</template>
<script>
import Hero from "@/components/templates/Hero.vue";
import Mosaic from "@/components/templates/Mosaic.vue";
import Teaser from "@/components/templates/Teaser.vue";
import InfoBox from "@/components/templates/InfoBox.vue";
import EinzelBeitrag from "@/components/templates/EinzelBeitrag.vue";
import LogoShowcase from "@/components/templates/LogoShowcase.vue";

import gsap from "gsap";
export default {
  components: {
    Hero,
    Mosaic,
    Teaser,
    InfoBox,
    EinzelBeitrag,LogoShowcase,
  },
  data() {
    return {
      page_elements: null,
    };
  },
  async beforeCreate() {
    await this.$store.dispatch("serverStart");
    await this.$store.dispatch("loadPage", 'home');
    let res = this.$store.getters.getPage;
    console.log("änderungen übernommen",res)
    if(res[0]){
      this.page_elements = res[0].elemente;
    }
    
  },
  mounted(){

  },
  computed: {
    test() {
      console.log("test router", this.$router);
      return this.$route.params.slug;
    },
  },
};
</script>
<style lang="">
</style>