<template>
  <div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import {Options, Vue} from "vue-class-component"

@Options({
    props: {
      icon: String,
      title: String,
    }
})

export default class toast extends Vue {
  // $swal: any;
  // icon: any;
  // title: any;
  displayToast() {
    this.$swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({
      icon: this.icon,
      title: this.title,
    })
  }    
  mounted(){
    this.$swal = Swal;
    this.displayToast()
  }
}
</script>

