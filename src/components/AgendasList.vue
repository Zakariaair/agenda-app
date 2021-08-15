<template>
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
            <AgendasListItem v-for="agenda in filterdAgendas" :key="agenda.id" :agenda="agenda" />
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import AgendasListItem from './AgendasListItem.vue'

export default {
    props: ['agendas'],
    components: { AgendasListItem },
    setup(props) {
        const filter = ref('all')

        const handleAddAgenda = () => {
            console.log('new agenda');
        }

        const filterdAgendas = computed(() => {
            return props.agendas
        })

        return { filter, filterdAgendas, handleAddAgenda }
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