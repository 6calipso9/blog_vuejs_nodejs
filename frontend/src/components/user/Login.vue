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
import axios from "axios";
import { server } from "../../utils/helper";
import router from "../../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorServer: false,
      errorNameOrPass: false
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
      this.__submitToServer(postData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/auth`, data).then(data => {
        console.log(data + data.status);
        router.push({ name: "home" });
      }).catch(() => {
        this.errorNameOrPass = true;
      });
    }
  }
};
</script>

