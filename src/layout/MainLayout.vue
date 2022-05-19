<template>
    <the-navbar></the-navbar>
    <div class="container with-nav">
        <app-message></app-message>
        <!-- <div class="card"><h1>Main</h1></div> -->        
        <router-view />
    </div>    
</template>

<script>
import TheNavbar from "@/components/TheNavbar"
import AppMessage from "@/components/ui/AppMessage"
export default {
    components: {TheNavbar, AppMessage}
}
</script> 