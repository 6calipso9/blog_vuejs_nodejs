<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Register account </h2>
          <form id="create-post-form" @submit.prevent="RegisterUser">
              <div class="form-group col-md-12">
                  <label for="email"> Email </label>
                  <input type="text" id="email" v-model="email" name="email" class="form-control">
              </div>    
              <div class="form-group col-md-12">
                  <label for="password"> Password </label>
                  <input type="text" id="password" v-model="password" name="password" class="form-control">
              </div> 
              <div class="form-group col-md-12">
                  <label for="password"> Repeat password </label>
                  <input type="text" class="form-control">
              </div> 
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Register </button>
              </div>    
          </form>
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
      password: ""
    };
  },
  created() {
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {
    RegisterUser() {
      let postData = {
        email: this.email,
        password: this.password,
      };
      this.__submitToServer(postData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/users`, data).then(data => {
        console.log(data + data.status);
        router.push({ name: "home" });
      });
    }
  }
};
</script>

