<template>
  <div>
    <div class="card mx-auto" style="width: 30rem;">
      <div class="card-header text-center">
        <h2>Register</h2>
      </div>
      <div class="card-body">
        <div v-show="errorRepeatPass" class="alert alert-warning">Password dont confirmed</div>
        <div v-show="errorNameExist" class="alert alert-warning">Email exist, try</div>
        <div v-show="errorServer" class="alert alert-danger">Server error</div>
        <div
          v-show="sucessRegistr"
          class="alert alert-success"
          id="sucessStatus"
        >Sucess registration</div>
        <form id="create-post-form" @submit.prevent="RegisterUser">
          <div class="form-group col-md-12">
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              v-model="email"
              name="email"
              class="form-control"
              required="required"
              pattern="[A-Za-z0-9]{1,20}"
            />
          </div>
          <div class="form-group col-md-12">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              name="password"
              class="form-control"
              required="required"
              pattern="[A-Za-z0-9]{1,20}"
            />
          </div>
          <div class="form-group col-md-12">
            <label for="password">Repeat password</label>
            <input
              id="repeatPass"
              v-model="repeatPassword"
              type="password"
              class="form-control"
              required="required"
              pattern="[A-Za-z0-9]{1,20}"
            />
          </div>
          <div class="form-group col-md-4 pull-right">
            <button id="registrBTN" class="btn btn-success" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { server } from "../../utils/helper";
//import router from "../../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorRepeatPass: false,
      errorNameExist: false,
      errorServer: false,
      sucessRegistr: false
    };
  },

  methods: {
    RegisterUser() {
      if (this.repeatPassword !== this.password) {
        this.errorRepeatPass = true;
        return;
      }
      this.errorRepeatPass = false;
      this.errorNameExist = false;
      this.errorServer = false;
      this.sucessRegistr = false;

      this.errors = [];
      let postData = {
        email: this.email,
        password: this.password
      };
      let user = { user: postData };
      this.__submitToServer(user);
    },
    __submitToServer(data) {
      this.$http
        .post(`${server.baseURL}/users`, data)
        .then(response => {
          this.sucessRegistr = true;
          console.log(response.data);
        })
        .catch(error => {
          if (error.data.message.includes("E11000")) this.errorNameExist = true;
          else this.errorServer = true;
          console.log(error);
        });
    }
  }
};
</script>

