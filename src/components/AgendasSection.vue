<template>
    <AgendaFormSidebar
            @closeSidebar="showAddAgenda = false"
            :isSidebarActive="showAddAgenda"
            :data="{}" />

    <div class="agendas-panel">
        <div class="actions">
            <button @click="handleAddAgenda">New Agenda</button>
            <ul>
                <li @click="filter = 'all'">All</li>
                <li @click="filter = 'ongoing'">On Going</li>
                <li @click="filter = 'completed'">Completed</li>
                <li @click="filter = 'expired'">Expired</li>
            </ul>
        </div>
        <div class="items">
            <AgendasListItem v-for="agenda in filteredAgendas" :key="agenda.id" :agenda="agenda" />
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import AgendasListItem from './AgendasListItem.vue'
import AgendaFormSidebar from './AgendaFormSidebar.vue'

export default {
    props: ['agendas'],
    components: { AgendaFormSidebar, AgendasListItem },
    setup(props) {
        const filter = ref('all')
        const showAddAgenda = ref(false)

        const handleAddAgenda = () => {
            showAddAgenda.value = true
        }

        const filteredAgendas = computed(() => {
            return props.agendas
        })

        return { filter, filteredAgendas, handleAddAgenda, showAddAgenda }
    }
}
</script>

<style lang="scss">
.agendas-panel {
    display: flex;

    .actions {
        width: 30%;
    }
    .items {
        width: 70%;
    }
}
</style>