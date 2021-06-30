<template>
  <div class="OuterContainer_showcase">
    <div class="showcase">
        <img v-for="logo,index in article.logos" :key="index" :src="'http://localhost:8055/assets/'+logo.directus_files_id" alt="" class="logo_showcase">
    </div>
    
  </div>
</template>
<script>
export default {
  created(){
      console.log("test logo showcase")
  },
  props: {
    article: Object,
  },
};
</script>
<style lang="scss">
    .OuterContainer_showcase{
        background: white;
        padding-top: 80px;
        padding-bottom: 60px;
    }
    .showcase{
        display: flex;
        flex-wrap: wrap;
        width: 60%;
        margin: auto;
        justify-content: space-evenly;
        
    }
    .logo_showcase{
        margin-bottom:30px;
        width:45%;

        @media(min-width: 768px){
             width:22%;
        }
       
    }
</style>