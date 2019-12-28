<template>
   <div>
     <div class="card mx-auto" style="width: 30rem;">
       <div class="card-header text-center">
          <h2> Profile </h2>
       </div>
     
      <div class="card-body">
          <div v-show="sucessSave" class="alert alert-success">
          Profile update
        </div>
        <form id="create-post-form" @submit.prevent="SaveUser">
                <div class="form-group col-md-12">
                    <label for="email"> Email </label>
                    <input type="text" id="email" v-model="email" name="email" class="form-control">
                </div>    
                <div class="form-group col-md-12">
                    <label for="password"> Password </label>
                    <input type="password" id="password" v-model="password" name="password" class="form-control">
                </div> 
                <div class="form-group col-md-12">
                    <label for="text"> Created: {{createdDate}} </label>
                </div>   
                <div class="form-group col-md-12">
                    <label for="text"> Last Update: {{lastUpdate}} </label>
                </div>  
                
            </form>
      </div>
       <div class="card-footer">
                <div class="form-group col-md-12 pull-right">
                    <button class="btn btn-success col-md-12" type="submit"> Save </button>
                </div>    
                </div>
     </div>
     <div class="card mx-auto mt-3" style="width: 60rem;">
       <div class="card-header text-center">
          <h2> My posts </h2>
       </div>
     
      <div class="card-body ">
        <div id="create-post-form" @submit.prevent="SaveUser">
                   <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">C.C.</th>
      <th scope="col">Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>    
  </tbody>
</table>
            </div>
      </div>
     </div>
    </div>
</template>

<script>
//import axios from "axios";
import { server } from "../../utils/helper";
import { headers } from "../../utils/helper"
//import router from '../../router';
//import router from "../../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      sucessSave: false
    };
  },
  created() {
    this.fetchInfo();
  },
  methods: {
      fetchInfo(){
        this.$http.get(`${server.baseURL}/users/${localStorage.getItem('id')}`, "", {
            headers:{
                'Authorization': `${localStorage.getItem('jwt')}`
            }
        })
        .then((response) => {
            this.email = response.data.user.email;
            this.password = response.data.user.password;
            this.createdDate = response.data.user.createdAt;
            this.lastUpdate = response.data.user.updatedAt;
        })
        .catch((error)=>{
          console.log(error.data);
        })
      },
    SaveUser() {
      let postData = {
        email: this.email,
        password: this.password,
      };
      this.sucessSave = false;

      let user = {user: postData};
      this.__submitToServer(user);
    },
    __submitToServer(data) {
      this.$http.patch(`${server.baseURL}/users/${localStorage.getItem('id')}`, data, headers)
        .then(() => {
          this.sucessSave = true;
        console.log(localStorage.getItem('jwt'))
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

