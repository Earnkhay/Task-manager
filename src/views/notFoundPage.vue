<template>
    <div class=" bg mt-0">
    <div class="container p-5">
      <div class="row justify-content-center text-center mt-5 p-5">
            <div class="card text-bg-secondary col-md-12 py-3" style="max-width: 24rem;">
                <div class="card-header"><h1>404</h1></div>
                <div class="card-body">
                    <h5 class="card-title">Page Not Found</h5>
                    <p class="card-text"><router-link :to="{name: 'homepage'}" id="todolink" class="fs-6 link-dark"><span><i class="fa-solid fa-arrow-left-long"></i></span> Click here to go back</router-link></p>
                </div>
            </div>
      </div>
    </div>
    </div>
</template>

<style scoped>
    #todolink:hover{
        color: green !important;
        font-weight: bold;
        text-decoration: none;
    }

    *{
        margin: 0;
        padding: 0;
    }
    .bg{
        min-height: 100vh;
        background-color: darkslategray;
    }
</style>