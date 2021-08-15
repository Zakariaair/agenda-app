<template>
    <div class="item" :class="status">
        <div class="single">
            <div class="status" :class="status">
                <span class="material-icons-round">{{ icons[status] }}</span>
            </div>
            <div class="info" @click="showDetails = !showDetails">
                <h3>{{ agenda.title }}</h3>
                <p class="badge">{{ deadline }}</p>
            </div>
            <div class="icons">
                <span class="material-icons-round tick" @click="toggleComplete">done</span>
                <span class="material-icons-round" @click="handleEdit">edit</span>
                <span class="material-icons-round delete" @click="handleDelete">delete</span>
            </div>
        </div>
        <div class="description" v-if="showDetails">
            <p><small>created at {{ createdAt }}</small></p>
            {{ agenda.description }}
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import useDocument from "@/composables/useDocument"
import { twoDigitsDate } from "@/composables/filters"

export default {
    props: ['agenda'],
    setup(props, context) {
        const icons = {'ongoing':'schedule', 'completed':'check_circle', 'expired':'highlight_off',}
        const showDetails = ref(false)

        const { deleteDoc, updateDoc, error } = useDocument('agendas', props.agenda.id)
        
        const status = computed(() => {
            if(props.agenda.status) {
                return 'completed'
            } else {
                if(props.agenda.date.toDate().getTime() > (new Date()).getTime()) {
                    return 'ongoing'
                } else {
                    return 'expired'
                }
            }
        })

        const createdAt = computed(() => {
            return twoDigitsDate(props.agenda.createdAt.toDate())
        })
        const deadline = computed(() => {
            return twoDigitsDate(props.agenda.date.toDate())
        })

        const handleEdit = () => {
            context.emit('edit', props.agenda)
        }

        const handleDelete = async () => {
            await deleteDoc()
        }

        const toggleComplete = async () => {
            await updateDoc({ status: !props.agenda.status })
            if(!error.value) {
                console.log(props.agenda.title+' updated');
            }
        }

        return { icons, status, createdAt, deadline, showDetails, handleEdit, toggleComplete, handleDelete }
    }
}
</script>

<style lang="scss">
.item {
    padding: 20px;
    border-radius: 4px;
    background: white;
    margin: 16px;
    transition: all ease 0.2s;
    border-left: #eee 4px solid;

    &:hover {
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
        border-left-color: var(--info);

        .status .material-icons-round {
            color: var(--info);
        }
        .status.completed .material-icons-round {
            color: var(--success);
        }
        .status.expired .material-icons-round {
            color: var(--danger);
        }
    }
    &.completed:hover {
        border-left-color: var(--success);
    }
    &.completed .material-icons-round.tick {
        color: var(--success);
    }
    &.expired:hover {
        border-left-color: var(--danger);
    }

    .single {
        display: flex;
        align-items: center;
    }


    .status {
        max-width: 30px;
        max-height: 30px;
        overflow: hidden;

        .material-icons-round {
            color: #bbb;
            font-size: 30px;
            cursor: default;
            transition: all ease 0.2s;
        }
    }
    .info {
        margin: 0 30px;
        cursor: pointer;
        max-width: 70%;
    }
    .badge {
        background: var(--primary);
        padding: 2px 8px;
        font-size: 13px;
        color: #fff;
        border-radius: 10px;
    }
    .description {
        margin: 4px 0 0;
        padding: 6px 0 0;
        border-top: 1px solid #eee;
    }

    .icons {
        margin-left: auto;

        .material-icons-round {
            font-size: 24px;
            margin-left: 10px;
            color: #bbb;
            cursor: pointer;
            
            &:hover {
                color: #777;
            }
            &.delete:hover {
                color: var(--danger);
            }
        }
    }
}
</style>