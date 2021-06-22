<template>
    <div>
        <div class="OuterContainer_mosaic">
            <div class="InnerContainer mosaic" v-if="article" >
                <h2>{{article.titel}}</h2>
                <div v-for="part,index in kacheln" :key="index" :class="classArray[index]">
                    <div class="kachelWrapper">
                        <h1> {{part.titel}}</h1>
                        <img :src="'http://localhost:8055/assets/'+ part.bild" alt="" class="kachelimage">
                        <div class="kachel_link" v-if="part.slug_seite"><a :href="part.slug_seite.ziel">{{part.slug_seite.beschreibung}}</a></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            images:null,
            kacheln:null,
            customhero:{
                backgroundImage:null
            },
            classArray:[
                'kachel1',
                'kachel2',
                'kachel2',
                'kachel3',
                'kachel3',
                'kachel3',
                'kachel2'

            ]
        }
    },
    async created() {
        await this.$store.dispatch("getMosaicKacheln",this.article.id)
        this.kacheln=this.$store.getters.getKacheln[0].bestandteile
        console.log("Kacheln",this.kacheln)
        
    },
    props:{
        article:Object,
    },
    mounted() {
        console.log("Mosaic",this.article)
             
    },
}
</script>
<style lang="scss">
    .mosaic{
        width: 70%;
        margin-bottom: 120px;
    }
    .OuterContainer_mosaic{
        background: white;
    }
    .kachel1{
        position: relative;
        display: block;
        width: 49%;
        height: 510px;
        margin-right: 1%;
        padding-top: 10px;

        float:right
    }
    .kachel_link{
        position: absolute;
        bottom: 0px;
        left: 0px;
        color:white;
        width:100%;
        text-align: left;
        padding-left: 0px;
        padding-bottom: 30px;
        background: rgba(0,0,0,0.3);    
        a{
            margin-left:20px;
            margin-top:5px;
            color:white;
            font-size: 25px;
            text-decoration: none;
        }
    }
    .kachel2{
        position: relative;
        display: block;
        width: 24.5%;
        margin-left: .25%;
        height: 250px;
        padding-top: 10px;
        float:left
    }
    .kachel3{
        position: relative;
        display: block;
        width: 49%;
        margin-left: .5%;
        height: 250px;
        padding-top: 10px;
        float:left
    }
    .InnerContainer{
        display:inline-block;
    }

    .kachelimage{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        left: 0;
        top: 0;
         border-radius: 5px;
    }
    .kachelWrapper{
        position: relative;
        width: 100%;
        height: 100%;
       
    }
</style>