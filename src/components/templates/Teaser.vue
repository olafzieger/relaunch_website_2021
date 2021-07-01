<template>
  <div>
    <div class="OuterContainer">
      <div
        class="InnerContainerTeaser"
        
        :style="InnerContainerStyle"
        v-if="article && images"
      >
        <div class="hero_teaser" :class="article.bezeichnung">
          <div class="image_container_teaser">
            <transition name="fade">
              <img
                :src="
                  'http://localhost:8055/assets/' +
                  this.images[image_index].directus_files_id
                "
                alt=""
                :key="image_index"
                class="image"
              />
            </transition>
            <h2 class="titel_teaser content_width">{{ article.titel }}</h2>
          </div>
          <div class="hero_content content_width">
            <p v-html="article.text"></p>
            <a :href="'/themen/'+article.link" class="link_teaser">{{article.link}}</a>
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
    };
  },
  props: {
    article: Object,
  },
  async created() {
    await this.$store.dispatch("getImagesTeaser", this.article.id);
    this.images = this.$store.getters.getImagesTeaser[0].bilder;
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