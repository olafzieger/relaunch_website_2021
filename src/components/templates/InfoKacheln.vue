<template>
    <div>
        <div class="flexBoxInfoKacheln" :style="flexBoxInfoKacheln">
            <div class="width50">
                <h2 class="kachelTitel">{{article.titel}}</h2>    
                <div class="infoKacheln">
                    <div v-for="part,index in kacheln" :key="index" :class="classArray[article.kachel_template][index]">
                    <div class="kachelWrapper">
                        <img :src="asset_url+ part.kachel_id.bild" alt="" class="kachelimage">
                        <div class="kachel_content">
                            <h2> {{part.kachel_id.titel}}</h2>
                           <div class="kachel_link" v-if="part.kachel_id.seite"><a :href="part.kachel_id.seite.ziel">{{part.kachel_id.seite.beschreibung}}</a></div>
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>
            <div class="outerContainerInfoKacheln width50" :style="boxStyle">
                <h2> &nbsp; </h2>
                <p v-html="article.text"></p>
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
            },
            kacheln:null,
             classArray:{
                "zwei-groessen":[
                    'kachel1',
                    'kachel1',
                    'kachel2',
                    'kachel3',
                    'kachel1',
                    'kachel2',
                    'kachel2',
                    'kachel2',
                    'kachel3'
                ],
                 "drei-groessen":[
                    'kachel2',
                    'kachel2',
                    'kachel1',
                    'kachel3',
                    'kachel1',
                    'kachel2',
                    'kachel2'
                ],
                "gleich-gross":[
                    'kachel1',
                    'kachel1',
                    'kachel1',
                    'kachel3',
                    'kachel1',
                    'kachel2',
                    'kachel2'
                ]

            },
            flexBoxInfoKacheln:{
                backgroundColor:""
            }
        }
    },
    computed:{
        asset_url(){
            return process.env.VUE_APP_ASSET_URL
        }
    },
    mounted() {
        let res = this.$store.getters.getPage;
        if(res[0]){
           this.flexBoxInfoKacheln.backgroundColor =res[0].theme_color
        }
        console.log("article infokacheln",this.article)
        console.log("article.kachel_template",this.article.kachel_template)
        if(this.article.kacheln) this.kacheln=this.article.kacheln

    },
    props:{
        article:Object
    }
}
</script>

<style lang="scss">
    $widthKachel1: calc(50% -1px);


    .outerContainerInfoKacheln{
        margin: 0px;
        p{
            width:70%;
            max-width: 400px;
            margin: 20px auto 20px 100px;
            text-align: left;
            color: white;
            font-size: 18px;
            line-height: 36px;
        }
        
    }

    .flexBoxInfoKacheln{
        display: flex;
        background: linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(0,0,0,0) 50%);
        .kachelTitel{
            text-align: right;
            margin-right: 100px;
        }

    }

   

    .infoKacheln{
        display: flex;
        width: 70%;
        max-width: 500px;
        margin: 20px 100px 20px auto;
        align-items: space-between;
        justify-content: space-between;
        flex-wrap: wrap;

    }


    .kachel1{
        width: 49%; 
        width: $widthKachel1;
        height:200px;
        margin-bottom: 2%;
        img{
            width:100%;
            height:100%;    
            object-fit: cover;
        }
    }

    .kachel2{
        width:100%;
        height:200px;
        img{
            width:100%;
            height:100%;    
            object-fit: cover;
        }
    }
</style>