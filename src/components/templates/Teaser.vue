<template>
  <div>
    <div class="OuterContainer">
      <div
        class="InnerContainerTeaser"
        :style="InnerContainerStyle"
        v-if="article && images"
      >
        <div class="hero_teaser">
          <div class="image_container_teaser">
            <transition name="slide-fade">
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
            <h2 class="titel_teaser">{{ article.titel }}</h2>
          </div>
          <div class="hero_content">
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
body{
    width:100%;
    margin:0;
}
.link_teaser{
    float:right;
    padding: 10px;
    font-size: 20px;
    color: white;
    text-decoration: none;
    border: 1px solid white;
}

.titel_teaser {
  z-index: 3;
  font-size: 60px;
  position: absolute;
  top: 350px;
  left: 20%;
  color: white;
}

.hero_teaser {
  display: flex;
  flex-direction: column;
  background-size: cover;
  width: 100%;
  min-height: 800px;
}

.slide-fade-enter-active {
  transition: all 2.8s ease;
}
.slide-fade-leave-active {
  transition: all 2.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  /*transform: translateX(10px);*/
  opacity: 0;
}
.OuterContainer {
  position: inherit;
}
.InnerContainerTeaser {
  position: relative;
}
.image {
  position: absolute;
  left: 0px;
  top: 0;
  width: 100%;
  height: 500px;
  object-fit: cover;
}
.image_container_teaser {
  margin-bottom: 520px;
  font-size: 14px;
}
.content {
  position: absolute;
  width: 100%;
  top: 0%;
  z-index: 2;
  color: white;
}

.hero_content {
  color: white;
  width: 60%;
  margin: auto;
  text-align: left;
}
</style>