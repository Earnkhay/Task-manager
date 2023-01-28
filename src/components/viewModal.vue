<template>
    <!-- View Modal -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel">Info</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h2 class="fw-bold mb-4"> {{ viewTitle }} </h2>
                <div class="row justify-content-center">
                    <div class="col-md-3">
                        <h6 class="fw-bold">Description </h6>
                    </div>
                    <div class="col-md-9">
                        <p> {{viewDesc}} </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <h6 class="fw-bold">Priority </h6>
                    </div>
                    <div class="col-md-9">
                        <p> {{viewPriority}}  </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <h6 class="fw-bold">Status </h6>
                    </div>
                    <div class="col-md-9">
                        <p class="badge rounded-pill p-2" :class="[viewStatus == 'Not started' ? 'bg-primary' : viewStatus == 'In progress' ? 'bg-warning' : viewStatus == 'Completed' ? 'bg-success' : viewStatus == 'Overdue' ? 'bg-danger' : 'bg-transparent' ]"> {{viewStatus}} </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { db } from "@/firebase.js"
import { doc, getDoc} from "firebase/firestore"

@Options({
    components: {
    },
})
export default class viewModal extends Vue {
    viewTitle = ""
    viewPriority = ""
    viewStatus = ""
    viewDesc = ""
    id: any;

    async viewTask(id: string){
        const docRef = doc(db, `users/${this.id}/tasks`, id );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            this.viewTitle = docSnap.data().title
            this.viewPriority = docSnap.data().priority
            this.viewStatus = docSnap.data().status
            this.viewDesc = docSnap.data().desc
        }
    }
}
</script>
