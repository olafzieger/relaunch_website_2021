<template>
    <div id="nav">
        <div class="icon">
            <a href="/"><img src="http://localhost:8055/assets/0b50d997-af18-471d-846b-1f51fede465a" alt="" class="logo"></a>
        </div>
        <div class="link" v-if="navigation">
            <a v-for="item,index in navigation" :key="index" :href="item.page_navigations_id.ziel">
                <span v-if="!item.page_navigations_id.icon" >
                    {{item.page_navigations_id.titel}} 
                </span>
                <span v-else>
                    <img :src="'http://localhost:8055/assets/'+item.page_navigations_id.icon" />
                </span>
            </a> 
       
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            navigation:null
        }
    },
    async created(){
        await this.$store.dispatch("serverStart");
        await this.$store.dispatch("loadMainNav")
        this.navigation=this.$store.getters.getMainNav[0].inhalte
        console.log("navigation",this.$store.getters.getMainNav)
    }

}
</script>
<style lang="scss">
#nav{
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    z-index: 5;
    background-color: white;
    width: 100%;
}
.link{
    display: flex;
    margin-top:15px;
    margin-right: 30px;
    a{
        color:black;
        text-decoration: none; 
        margin-left: 10px;
        margin-right: 5px;
    }
    a:hover{
        color: cadetblue;
        font-weight: bold;
    }
}

.logo{
    height: 40px;
    margin-left: 120px;
}
</style>