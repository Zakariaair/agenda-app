<template>
    <TheNavbar />
    <div class="container">
        <h1 class="page-title">Agendas List</h1>
        <AgendasSection :agendas="agendas" />
    </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue"
import AgendasSection from "@/components/AgendasSection.vue"

import getCollection from "@/composables/getCollection"

export default {
    components: { TheNavbar, AgendasSection },
    setup() {
        const { error, documents: agendas } = getCollection('agendas')

        return { error, agendas }
    }
}
</script>

<style>
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
.page-title {
    text-align: left;
    margin: 0 10px 40px;
}
</style>