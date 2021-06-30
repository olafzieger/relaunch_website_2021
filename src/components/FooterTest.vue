<template>
    <div id="footer">
        <div class="footer_content" v-if="content">
            <div class="infos">
                <h2>RUNZE & CASPER WERBEAGENTUR GMBH</h2>
                <p>Linienstraße 213</p>
                <p>10119 Berlin</p>
                <p>Telefon: {{content.telefon}} </p>
                <p>E-Mail: {{content.email}} </p>

            </div>
            <div class="links">
                <h2>LINKS</h2>
                <p v-for="link,index in content.links" :key="index">
                   <a :href="link.page_navigations_id.ziel">{{link.page_navigations_id.titel}}</a> 
                </p>
            </div>

        </div>


        
    </div>
</template>
<script>
export default {
    data(){
        return {
            content:null
        }
    },
    async created(){
        await this.$store.dispatch("serverStart");
        await this.$store.dispatch("loadMainFooter")
        this.content=this.$store.getters.getFooter
        console.log("footer content",this.content)
    }

}
</script>
<style lang="scss">
    #footer{
        margin: 0;
        width: 100%;
        padding-top: 120px;
        color: #FFF;
        width: 100%;
        height: 200px;
        background-color: #2D5682;
    }
    .footer_content{
        display: flex;
        justify-content: space-between;
        width: 50%;
        float: right;
        h2{
            font-size: 16px;
        }
        .infos,.links{
            text-align: left;
            width: 48%;
        }
        a{
            color: white;
        }
    }
</style>