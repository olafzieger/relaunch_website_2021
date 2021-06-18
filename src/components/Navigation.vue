<template>
    <div id="nav">
        <div class="icon"></div>
        <div class="link">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        
    </div>
</template>
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
    margin-right: 30px;
}
</style>