<template>
    <AgendaFormSidebar
            @closeSidebar="closeSidebar"
            :isSidebarActive="showAddAgenda"
            :data="activeData" />

    <div class="agendas-panel">
        <div class="actions">
            <button @click="handleAddAgenda">New Agenda</button>
            <ul>
                <li @click="filter = 'all'" :class="{'active': filter == 'all'}">
                    <span class="material-icons-round icon">notes</span> All
                </li>
                <li @click="filter = 'ongoing'" :class="{'active': filter == 'ongoing'}">
                    <span class="material-icons-round icon">schedule</span> On Going
                </li>
                <li @click="filter = 'completed'" :class="{'active': filter == 'completed'}">
                    <span class="material-icons-round icon">check_circle</span> Completed
                </li>
                <li @click="filter = 'expired'" :class="{'active': filter == 'expired'}">
                    <span class="material-icons-round icon">highlight_off</span> Expired
                </li>
            </ul>
        </div>
        <div class="items">
            <div v-if="filteredAgendas">
                <AgendasListItem v-for="agenda in filteredAgendas" :key="agenda.id"
                        :agenda="agenda"
                        @edit="handleEditItem"/>
            </div>
            <div v-else>
                <h2>There is nothing</h2>
            </div>
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
        const activeData = ref({})

        const handleAddAgenda = () => {
            showAddAgenda.value = true
        }

        const handleEditItem = (agenda) => {
            activeData.value = agenda
            showAddAgenda.value = true
        }

        const filteredAgendas = computed(() => {
            return props.agendas
        })

        const closeSidebar = () => {
            showAddAgenda.value = false
            activeData.value = {}
        }

        return { filter, filteredAgendas, handleAddAgenda, handleEditItem, activeData, showAddAgenda, closeSidebar }
    }
}
</script>

<style lang="scss">
.agendas-panel {
    display: flex;

    .actions {
        width: 30%;
        padding: 10px;
        background: #fff;
        border-radius: 10px;

        ul {
            margin: 20px 0;

            li {
                list-style: none;
                padding: 6px 12px;
                margin: 6px 0;
                display: flex;
                align-items: center;
                color: var(--primary);
                border-left: 3px solid transparent;
                cursor: pointer;

                &:hover {
                    background: #eee;
                }

                &.active {
                    border-left: 3px solid var(--secondary);
                }

                .icon {
                    margin-right: 6px;
                    color: var(--primary);
                }
            }
        }
    }
    .items {
        width: 70%;
    }
}
</style>