<template>
    <div class="container mb-2">
        <div class="row justify-content-center">
            <div class="btn-group col-md-3">
                <router-link to="/todo" class="btn btn-primary active" aria-current="page">All</router-link>
                <router-link to="/" class="btn btn-danger">Undone</router-link>
                <router-link to="/todo/taskdone" class="btn btn-success">Done</router-link>
            </div>
        </div>
    </div>
</template>