<template>
    <div class="container mb-2 btngroup">
        <div class="row justify-content-center">
            <div class="btn-group col-md-4">
                <router-link :to="{name: 'alltodos'}" class="btn btn-primary allbtn shadow" active-class="text-dark fw-bold sh">All</router-link>
                <router-link :to="{name: 'undone'}" class="btn btn-danger undonebtn shadow" active-class="text-dark fw-bold sh">Undone</router-link>
                <router-link :to="{name: 'taskdone'}" class="btn btn-success donebtn shadow" active-class="text-dark fw-bold sh">Done</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .allbtn:hover, .undonebtn:hover, .donebtn:hover{
        background-color: transparent !important;
        color: black;
        font-weight: bolder;
        font-size: 17px;
        text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    .sh{
        text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    @media (min-width: 322px) and (max-width:767px) {
        .btngroup{
            width: 70%;
        }
    }
</style>