<template>
    <div>
        <div class="OuterContainer_info_box" :style="boxStyle">
            <div class="InnerContainer" v-if="article">
                <div class="info_box">
                    <div class="content_info_box">
                        <h1>{{article.titel}}</h1>
                        <p v-html="article.text"></p>
                    </div>                    
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            boxStyle:{
                backgroundColor:""
            }
        }
    },
    mounted() {
        let res = this.$store.getters.getPage;
        if(res[0]){
           this.boxStyle.backgroundColor =res[0].theme_color
        }
    },
    props:{
        article:Object
    }
}
</script>

<style lang="scss">
  

</style>