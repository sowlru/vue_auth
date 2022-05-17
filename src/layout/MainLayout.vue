<template>
    <the-navbar></the-navbar>
    <div class="container with-nav">
        <!-- <div class="card"><h1>Main</h1></div> -->        
        <router-view />
    </div>    
</template>

<script>
import TheNavbar from "@/components/TheNavbar"
export default {
    components: {TheNavbar}
}
</script> 