<template>
    <div class="main" :class="{'darkmode': darkmode}">
        <TheNavbar @changeTheme="darkmode = !darkmode" :darkmode="darkmode" />
        <div class="container">
            <!-- <h1 class="page-title">Agendas List</h1> -->
            <AgendasSection :agendas="agendas" />
        </div>
    </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue"
import AgendasSection from "@/components/agendas/AgendasSection.vue"

import getCollection from "@/composables/getCollection"
import getUser from "@/composables/getUser"
import { ref } from 'vue'

export default {
    components: { TheNavbar, AgendasSection },
    setup() {
        const { user } = getUser()

        const { error, documents: agendas } = getCollection(
            'agendas',
            ['userId', '==', user.value.uid]
        )

        const darkmode = ref(false)

        return { error, agendas, darkmode }
    }
}
</script>

<style>
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 40px;
}
.page-title {
    text-align: left;
    margin: 0 10px 40px;
}
</style>