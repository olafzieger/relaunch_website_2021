<template>
    <div>
        <div class="flexBoxInfoKacheln" :style="flexBoxInfoKacheln">
            <div class="width50">
                <h2 class="kachelTitel">{{article.titel}}</h2>    
                <div class="infoBilder">
                     <transition name="fade">
              <img
                :src="
                  asset_url+
                  article.bilder[image_index].directus_files_id
                "
                alt=""
                :key="image_index"
              />
            </transition>
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
            image_index:0,
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
        let res = this.$store.getters.getPage;
        if(res[0]){
           this.flexBoxInfoKacheln.backgroundColor =res[0].theme_color
        }
        setInterval(this.iterateImages, 5000);
        console.log("article infobilder",this.article)
        //console.log("article.kachel_template",this.article.kachel_template)
        //if(this.article.kacheln) this.kacheln=this.article.kacheln

    },
    props:{
        article:Object
    }
}
</script>


<style lang="scss">
    .infoBilder{
        width:60%;
        max-width: 500px;
        height:400px;
        padding-bottom: 20px;
        margin-right: 100px;
        margin-left: auto;
        position: relative;
        img{
            top: 0;
            left: 0;
            position: absolute;
            width:100%;
            height:400px;
            object-fit: cover;
        }
        @media(max-width:425px){
            width:90%;
            margin:auto;

        }
    }
</style>