<template>
    <div id="nav">
        <div class="icon">
            <a href="/"><img src="http://localhost:8055/assets/2f575ac5-7356-4113-ba1d-f071f65a7fa2" alt="" class="logo"></a>
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
        <div class="burgermenu" v-if="navigation">
            <div class="menu__btn-open" id="burgerMenuClose" @click="closeNav">
                <span class="bar1"></span>
                <span class="bar2"></span>
                <span class="bar3"></span>
            </div>
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

</style>