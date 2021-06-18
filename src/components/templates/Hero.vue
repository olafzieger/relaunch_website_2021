<template>
    <div>
        <div class="OuterContainer">
            <div class="InnerContainer" v-if="article">
                <div class="hero" :class="customhero">
                    <div class="content">
                        <h1>{{article.titel}}</h1>
                        <h2>{{article.untertitel}}</h2>
                    </div>                    
                    <img :src="'http://localhost:8055/assets/'+this.article.bild" alt="" class="heroImage">
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            customhero:{
                backgroundImage:null
            }
        }
    },
    props:{
        article:Object
    },
    mounted() {
        if(this.article){
            this.customhero.backgroundImage="http://localhost:8055/assets/"+this.article.bild
            console.log(this.customhero)
        }        
    },
}
</script>
<style lang="css">
    .hero{
        background-size: cover;
        height: 80vh;
        width: 100%;
    }
    .heroImage{
        position: absolute;
        left: 0px;
        top:0;
        width: 100%;
        height: 500px;
        object-fit: cover;
    }

    .InnerContainer {
        display: inline-block;
        width: 100%;
    }
</style>