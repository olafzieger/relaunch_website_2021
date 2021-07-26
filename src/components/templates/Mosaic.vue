<template>
    <div>
        <div class="OuterContainer_mosaic">
            <div class="InnerContainer mosaic" :class="article.kachel_template" v-if="article" >
                <h2>{{article.titel}}</h2>
                <div v-if="article.filter_einschalten">
                   <ul class="filter">
                       <li @click="unset_filter()">Alle</li>
                       <li v-for="item,index in article.kategorie_auswahl" :key="index" @click="filter_kacheln(item)">{{filterArray[item]}}</li>

                   </ul>
                </div>
                <div v-for="part,index in filtered_kacheln" :key="index" :class="classArray[article.kachel_template][index]">
                    <div class="kachelWrapper">
                        <img :src="asset_url+ part.bild" alt="" class="kachelimage">
                        <div class="kachel_content">
                            <h2> {{part.titel}}</h2>
                            <div class="kachel_link" v-if="part.slug_seite"><a :href="part.slug_seite.ziel">{{part.slug_seite.beschreibung}}</a></div>
                        </div>
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
            filtered_kacheln:null,
            customhero:{
                backgroundImage:null
            },
            filterArray:{
                "gruenmarketing":"Grünmarketing",
                "events":"Events",
                "kampagnen":"Kampagnen",
                "mediaplanung":"Mediaplanung"
            },
            classArray:{
                "zwei-groessen":[
                    'kachel1',
                    'kachel2',
                    'kachel3',
                    'kachel3',
                    'kachel1',
                    'kachel2',
                    'kachel2'
                ],
                 "drei-groessen":[
                    'kachel1',
                    'kachel2',
                    'kachel2',
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

            }
        }
    },
    computed:{
        asset_url(){
            return process.env.VUE_APP_ASSET_URL
        }
    },
    methods:{
        unset_filter(){
            this.filtered_kacheln=this.kacheln
        },
        filter_kacheln(item){
            console.log("filter")
            console.log(this.kacheln)
            console.log(item)
            console.log(typeof this.kacheln[0].kategorien)
            console.log(Object.values(this.kacheln[0].kategorien).indexOf(item)  > -1)
        
            this.filtered_kacheln=this.kacheln.filter(el=>  Object.values(el.kategorien).indexOf(item) > -1 )
        }
    },
    async created() {
        await this.$store.dispatch("getMosaicKacheln",this.article.id)
        this.kacheln=this.$store.getters.getKacheln[0].bestandteile
        this.filtered_kacheln=this.kacheln
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
 
</style>