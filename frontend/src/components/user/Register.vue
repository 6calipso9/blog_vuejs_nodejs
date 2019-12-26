<template>
   <div>
     <div class="card mx-auto" style="width: 30rem;">
       <div class="card-header text-center">
          <h2> Register account </h2>
       </div>
       <div class="card-body">
        <div v-show="errorRepeatPass" class="alert alert-warning">
          Password dont confirmed
        </div>
        <div v-show="errorNameExist" class="alert alert-warning">
          Email exist, try 
        </div>
         <form id="create-post-form" @submit.prevent="RegisterUser">
              <div class="form-group col-md-12">
                  <label for="email"> Email </label>
                  <input type="text" id="email" v-model="email" name="email" class="form-control">
              </div>    
              <div class="form-group col-md-12">
                  <label for="password"> Password </label>
                  <input type="password" id="password" v-model="password" name="password" class="form-control">
              </div> 
              <div class="form-group col-md-12">
                  <label for="password"> Repeat password </label>
                  <input v-model="repeatPassword" type="password" class="form-control">
              </div> 
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Register </button>
              </div>    
          </form>
       </div>
     </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../../utils/helper";
//import router from "../../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorRepeatPass: false,
      errorNameExist: false
    };    
  },
  
  methods: {
    
    RegisterUser() {
      
      if(this.repeatPassword !== this.password){
        this.errorRepeatPass = true;
        return;
      }
      this.errorRepeatPass = false;
      this.errorNameExist = false;
        
      this.errors = [];
      let postData = {
        email: this.email,
        password: this.password,
      };
      this.__submitToServer(postData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/users`, data).then((response) => {
        if(response.data.message == 'email exist')
          this.errorNameExist = true;
        console.log(response.data);
      });
    }, 
  }
};
</script>

