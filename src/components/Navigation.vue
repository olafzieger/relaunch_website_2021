<template>
    <div id="nav" class="nav_bar">
        <div class="icon">
            <router-link to="/"><img :src="logo" alt="" class="logo"></router-link>
        </div>
        <div class="link" v-if="navigation">
            <router-link v-for="item,index in navigation" :key="index" :to="item.ziel">
                <span v-if="!item.icon" class="text_nav">
                    {{item.titel}} 
                </span>
                <span v-else class="image_nav">
                    <img :src="'http://109.239.58.167:8057/assets/'+item.icon" />
                </span>
            </router-link> 
       
        </div>
        <div class="burgermenu" v-if="navigation" @click="openNav()">
            <div class="menu__btn-open"  >
                <span class="bar1"></span>
                <span class="bar2"></span>
                <span class="bar3"></span>
            </div>
        </div>
        <div class="navModal">
            <div class="container" @click="closeNav()">
                <div class="menu__btn-close" >
                <span class="bar1"></span>
                <span class="bar2"></span>
            </div>
            <div class="openNavLinks">
                <ul>
                    <li v-for="item,index in navigation" :key="index">
                        <router-link :to="item.ziel"> {{item.titel}} </router-link>
                    </li>
                </ul>
            </div>

            </div>
            
        </div>
        
    </div>
</template>
<script>
import gsap from 'gsap'
import logo from"@/assets/rc_logo_schwarz.png"
export default {
    methods:{
        closeNav(){
            gsap.set('.navModal',{display:'none'})
        },
        openNav(){
            console.log("openening Nav")
            gsap.set('.navModal',{display:'block'})

        },
        navBarMod() {
            if(this.$router.currentRoute._value.fullPath==="/"){
                if (document.documentElement.scrollTop > 400) {
                gsap.set(".nav_bar", {
                boxShadow: "0px 11px 26px -9px rgba(0,0,0,0.75)",
                duration: 1,
                zIndex: 3,
                ease: "Power1.easeout",
                opacity:1,
                });
                } else {
                    gsap.set(".nav_bar", {
                    opacity:0,    
                    boxShadow: "",
                    duration: 1,
                    zIndex: 1,
                    });
                }
            }
            
        },
    },
    data(){
        return {
            navigation:null,
            logo
        }
    },
    async created(){    
        //http://109.239.58.167:8057/assets/79755f5c-30e8-4682-8923-fcb44858d0c3
        window.addEventListener("scroll", this.navBarMod);        
        await this.$store.dispatch("serverStart");
        await this.$store.dispatch("loadMainNav")
        this.navigation=this.$store.getters.getMainNav[0].inhalte
        console.log("navigation", this.navigation)

        if(this.$router.currentRoute._value.fullPath === "/"){

            gsap.set(".nav_bar", {opacity:0})
        }       
    }

}
</script>
<style lang="scss">
    .navModal{
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: brown;
        z-index: 10;
        .container{
            position: relative;
            width: 100%;
            height: 100%;
        }
    }

    .menu__btn-close{
        position: absolute;
        top:25px;
        right: 25px;
        span {
            display: block;
            width: 22px;
            height: 2px;
            background: #FFF;
            transition: 0.3s;
        }
        .bar1{
            transform: rotate(45deg);
        }
        .bar2{
            transform: rotate(-45deg);
            margin-top: -2px;
        }
    }

    .openNavLinks{
        li{
            list-style: none;
            text-align: left;
        }
        a{
            text-decoration: none;
            color: #FFF;
        }
    }
    .image_nav{
        img{
            width: 40px;
        }
    }
    .text_nav{
        display: block;
        padding-top: 5px;
    }
</style>