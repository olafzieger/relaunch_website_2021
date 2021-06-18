<template>
    <div>
        <div class="OuterContainer">
            <div class="InnerContainer mosaic" v-if="article" >
                <h2>{{article.titel}}</h2>
                <div v-for="part,index in kacheln" :key="index" :class="classArray[index]">
                    <div class="kachelWrapper">
                        <h1> {{part.titel}}</h1>
                        <img :src="'http://localhost:8055/assets/'+ part.bild" alt="" class="kachelimage">
                        <div class="kachel_link"><a :href="'/themen/'+part.link">{{part.link}}</a></div>
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
<style lang="css">
    .mosaic{
        width: 90%;
        margin-bottom: 120px;
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