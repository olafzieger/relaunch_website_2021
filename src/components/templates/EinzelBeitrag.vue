<template>
  <div>
    <div class="OuterContainer einzel_beitrag">
      <div
        class="InnerContainerTeaser einzel_beitrag"
        :style="InnerContainerStyle"
        v-if="article"
      >
        <div class="einzel_beitrag_content">
            <div class="image_container_einzel_beitrag">
                <h2 class="titel_beitrag_content">{{ article.titel }}</h2>         
            </div>
            <div class="content_einzel_beitrag">
            </div>
            <div class="image_container_einzel_beitrag">
                <transition name="fade">
                    <img
                        v-if="images"
                        :src="
                        'http://localhost:8055/assets/' +
                        this.images[image_index].directus_files_id
                        "
                        alt=""
                        :key="image_index"
                        class="image_einzel_beitrag"
                    />
                </transition>
                
            </div>
            <div class="content_einzel_beitrag">
                <p v-html="article.text" class="text_einzel_beitrag"></p>
                <div  class="link_box">
                   <p v-html="article.link_box"></p>

                   <a :href="article.link_box_link[0].page_navigations_id.ziel">{{article.link_box_link[0].page_navigations_id.titel}}</a>
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

.link_box{
  border: gold 2px solid;
  padding: 12px;
  a{
    color:white;
    text-decoration:none;
  }
}

.OuterContainer.einzel_beitrag{
    background: linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(0,0,0,0) 50%);
}
.InnerContainerTeaser.einzel_beitrag{
    padding-top: 20px;
    padding-bottom: 100px;
}

.fade-enter-active{
  transition: opacity 1.5s;
}
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.titel_beitrag_content{
    color: black;
    text-align: right;
    margin-right: 20px;
}
.einzel_beitrag_content{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
}
.image_container_einzel_beitrag{
    width: 50%;
    position: relative;
}

.content_einzel_beitrag{
    width: 30%;
    color: white;
    text-align: left;
    margin-left: 5%;
    margin-right: auto;
}

.image_einzel_beitrag{
    position: absolute;
    right: 20px;
    width:70%;
    height:400px;
    object-fit: cover;
}
</style>