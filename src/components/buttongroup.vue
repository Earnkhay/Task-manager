<template>
    <div class="container mb-2">
        <div class="row justify-content-center">
            <div class="btn-group col-md-4">
                <router-link :to="{name: 'alltodos'}" class="btn btn-primary active" aria-current="page">All</router-link>
                <router-link :to="{name: 'undone'}" class="btn btn-danger">Undone</router-link>
                <router-link :to="{name: 'taskdone'}" class="btn btn-success">Done</router-link>
            </div>
        </div>
    </div>
</template>