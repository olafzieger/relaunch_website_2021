<template>
  <div>
    <div style="padding-top:40px;"></div>

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

import gsap from "gsap";
export default {
  components: {
    Hero,
    Mosaic,
    Teaser,
    InfoBox,
    EinzelBeitrag
  },
  data() {
    return {
      page_elements: null,
    };
  },
  async beforeCreate() {
    await this.$store.dispatch("serverStart");
    await this.$store.dispatch("loadPage", this.$route.params.slug);
    let res = this.$store.getters.getPage;
     console.log("page result", res);
    if(res[0]){
      this.page_elements = res[0].elemente;    
      gsap.to("body", { backgroundColor: res[0].theme_color });
    }
    
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