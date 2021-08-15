<template>
    <div class="item" :class="{status}">
        <div class="status" :class="{status}">
            <span class="material-icons-round">{{ icons[status] }}</span>
        </div>
        <div class="info">
            <h3>{{ agenda.title }}</h3>
            <p>Created at {{ agenda.createdAt }}</p>
        </div>
        <div class="song-number">
            <p>{{ agenda.notes.length }}</p>
        </div>
        <div class="icons">
            <!-- <router-link :to="{ name: 'EditProject', params: {id: project.id} }">
                <span class="material-icons">edit</span>
            </router-link> -->
            <span class="material-icons-round" @click="deleteProject">delete</span>
            <span class="material-icons-round tick" @click="toggleComplete">done</span>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
/*
DATA:
createdAt 15 August 2021 at 00:00:00 UTC+2
(timestamp)
date 20 August 2021 at 00:00:00 UTC+2
description "this is test description for first task"
notes
0 "have a good day"
1 "raise your head"
status "1"
title "first task"
userId "TE3IvtMhsXMUVYQoUOjCyLjqnaw1" 
*/

export default {
    props: ['agenda'],
    setup(props) {
        const icons = {'ongoing':'check_circle', 'completed':'schedule', 'expired':'highlight_off',}
        const icon = computed(() => {
            if(props.status == 1) {
                return 'check_circle'
            } else {
                if(props.agenda.date) {
                    return 'schedule'
                } else {
                    return 'highlight_off'
                }
            }
        })
        const status = computed(() => {
            if(props.status == 1) {
                return 'ongoing'
            } else {
                if(props.agenda.date) {
                    return 'completed'
                } else {
                    return 'expired'
                }
            }
        })

        return { icons, status }
    }
}
</script>

<style lang="scss">
.item {
    display: flex;
    align-items: center;
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
    &.completed {
        border-left-color: var(--success);
    }
    &.completed .tick {
        color: var(--success);
    }
    
    &.expired {
        border-left-color: var(--danger);
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
    }
    .song-number {
        margin-left: auto;
    }

    .icons .material-icons-round {
        font-size: 24px;
        margin-left: 10px;
        color: #bbb;
        cursor: pointer;
        
        &:hover {
            color: #777;
        }
    }
}
</style>