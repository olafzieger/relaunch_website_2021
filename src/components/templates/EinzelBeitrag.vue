<template>
  <div>
    <div class="OuterContainer einzel_beitrag">
      <div
        class="InnerContainerTeaser einzel_beitrag"
        :style="InnerContainerStyle"
        v-if="article"
      >
        <div class="einzel_beitrag_content">
            <div class="beitrag_part_one">
              <div>
                <h2 class="titel_beitrag_content">{{ article.titel }}</h2>         
              </div>
              <div>
              </div>
            </div>
            <div class="beitrag_part">
              <div class="image_container_einzel_beitrag">
                  <transition name="fade">
                      <img
                          v-if="images"
                          :src="
                          asset_url +
                          this.images[image_index].directus_files_id
                          "
                          alt=""
                          :key="image_index"
                          class="image_einzel_beitrag"
                      />
                  </transition>
                  
              </div>
              <div class="text_beitrag">
                  <div class="text_beitrag_content">
                    <p v-html="article.text" class=""></p>
                    <div  class="link_box" v-if="article.link_box_link">
                      <p v-html="article.link_box"></p>

                      <a :href="article.link_box_link.ziel">{{article.link_box_link.titel}}</a>
                    </div>
                  </div>

                  
              </div>
             </div>
        </div>
 
      </div>
    </div>
  </div>
</template>
<script>
import gsap from "gsap";

export default {
  data() {
    return {
      image_index: 0,
      images: null,
      InnerContainerStyle: {
        backgroundColor: "none",
      },
      images:null
    };
  },
  computed:{
    asset_url(){
      return process.env.VUE_APP_ASSET_URL
    }
  },
  props: {
    article: Object,
  },
  async created() {
    if(this.article){
        console.log("einzel_beitrag",this.article.id)
        let payload={
            'collection':'einzel_beitrag',
            'id': this.article.id
        }
        await this.$store.dispatch("getImagesArray", payload);
        this.images= this.$store.getters.getImageArray[0].bilder
    }
    
    //this.images = this.$store.getters.getImagesBeitrag[0].bilder;
  },
  methods: {
    iterateImages() {
      if (this.image_index < this.article.bilder.length - 1) {
        this.image_index += 1;
      } else {
        this.image_index = 0;
      }
    },
  },
  mounted() {
    console.log("Teaser Images", this.images);
    var timer = setInterval(this.iterateImages, 5000);
    console.log(this.article.teaser_color);
    this.InnerContainerStyle.backgroundColor = this.article.teaser_color;
  },
};
</script>
<style lang="scss">


</style>