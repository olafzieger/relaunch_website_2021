<template>
  <div class="OuterContainer_showcase">
    <div class="showcase">
      <img
        v-for="(logo, index) in article.logos"
        :key="index"
        :src="asset_url + logo.directus_files_id"
        alt=""
        class="logo_showcase"
      />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    asset_url() {
      return process.env.VUE_APP_ASSET_URL;
    },
  },
  created() {
    console.log("test logo showcase");
  },
  props: {
    article: Object,
  },
  mounted() {
    console.log("logo article", this.article);
  },
};
</script>
<style lang="scss">
.OuterContainer_showcase {
  background: white;
  padding-top: 80px;
  padding-bottom: 60px;
}
.showcase {
  display: flex;
  flex-wrap: wrap;
  width: 40%;
  margin: auto;
  justify-content: space-evenly;
  max-width: 600px;
}
.logo_showcase {
  margin-bottom: 30px;
  width: 45%;

  @media (min-width: 768px) {
    width: 22%;
  }
}
</style>