<template>
    <div class="item">
        <div class="icon">
            <span class="material-icons-round">{{ icon }}</span>
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

        return { icon }
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

        .icon .material-icons-round {
            color: var(--info);
        }
    }
    &.complete {
    border-left-color: #00ce89;
    }
    &.complete .tick {
        color: #00ce89;
    }

    .icon {
        max-width: 30px;
        max-height: 30px;
        overflow: hidden;

        .material-icons-round {
            font-size: 30px;
            margin: 0;
            transition: all ease 0.2s;
        }
    }
    .info {
        margin: 0 30px;
    }
    .song-number {
        margin-left: auto;
    }

    .material-icons-round {
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