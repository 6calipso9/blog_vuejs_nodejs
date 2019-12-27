<template>
   <div>
     <div class="card mx-auto" style="width: 30rem;">
       <div class="card-header text-center">
          <h2> Login </h2>
       </div>
     
      <div class="card-body">

        <div v-show="errorNameOrPass" class="alert alert-warning">
          Email or pass not actual
        </div>

        <div v-show="errorServer" class="alert alert-danger">
          Server error
        </div>
        <div v-show="sucesslogin" class="alert alert-success">
          Sucess login
        </div>

        <form id="create-post-form" @submit.prevent="LoginUser">
                <div class="form-group col-md-12">
                    <label for="email"> Email </label>
                    <input type="text" id="email" v-model="email" name="email" class="form-control">
                </div>    
                <div class="form-group col-md-12">
                    <label for="password"> Password </label>
                    <input type="password" id="password" v-model="password" name="password" class="form-control">
                </div> 
                <div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" type="submit"> Login </button>
                </div>    
            </form>
      </div>
     </div>
    </div>
</template>

<script>
//import axios from "axios";
import { server } from "../../utils/helper";
import router from "../../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorServer: false,
      errorNameOrPass: false,
      sucesslogin: false
    };
  },
  created() {
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {
    LoginUser() {
      let postData = {
        email: this.email,
        password: this.password,
      };
      this.errorNameOrPass = false;
      this.errorServer = false;
      this.sucesslogin = false;

      let session = {session: postData};
      this.__submitToServer(session);
    },
    __submitToServer(data) {
      this.$http.post(`${server.baseURL}/session`, data)
        .then((response) => {
          localStorage.setItem('jwt', response.data.access)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('email', response.data.email)
          this.sucesslogin = true;
        console.log(localStorage.getItem('jwt'))
        router.push('Profile')
        location.reload()
        })
        .catch((error)=>{
          if(error.data.message.includes('Not authenticated'))
            this.errorNameOrPass = true;
          else  
           this.errorServer = true;
          console.log(error);
        })
    }
  }
};
</script>

