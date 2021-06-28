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
    .filter{
        list-style: none;
        display: flex;
        li{
            margin: 0 5px;
        }
    }
    .mosaic{
        width: 70%;
        margin-bottom: 120px;
    }
    .OuterContainer_mosaic{
        background: white;
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
    .gleich-gross{
        .kachel1, .kachel2, .kachel3{
            position: relative;
            width: 24%;
            margin: .25%;
            height: 15vw;
            padding-top: 10px;
            float: left;
        }
    
    }
    .zwei-groessen{
        .kachel1, .kachel2{
            position: relative;
            width: 24%;
            margin: .25%;
            height: 15vw;
            padding-top: 10px;
            float: left;
        }


        .kachel3{
            position: relative;
            width: 48%;
            margin: .25%;
            height: 15vw;
            padding-top: 10px;
            float: left;
        }
    }
    .drei-groessen{
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