<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Create Post </h2>
          <form id="create-post-form" @submit.prevent="createPost">
              <div v-show="sucessAdd" class="alert alert-success">
              <div class="btn-group">
                <router-link :to="{name: 'Posts', params: {id: id}}" class="btn btn-sm btn-primary ">View Post</router-link>
              </div>
                Post added!
              </div>
              
               <div class="form-group col-md-12">
                <label for="title"> Title </label>
                <input type="text" id="title" v-model="title" name="title" class="form-control" placeholder="Enter title">
               </div>
              <div class="form-group col-md-12">
                  <label for="body"> Write Content </label>
                  <textarea id="text" cols="30" rows="5" v-model="text" class="form-control"></textarea>
              </div>
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create Post </button>
              </div>          
          </form>
        </div>
    </div>
</template>

<script>
//import axios from "axios";
import { server } from "../../utils/helper";
//import router from "../../router";
import { headers } from "../../utils/helper"
export default {
  data() {
    return {
      title: "",
      text: "",
      sucessAdd: false,
      id: ""
    };
  },
  created() {
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {
    createPost() {
      this.sucessAdd = false
      let postData = {
        title: this.title,
        text: this.text,
      };
      let post = {post: postData}
      this.__submitToServer(post);
    },
    __submitToServer(data) {
      this.$http.post(`${server.baseURL}/posts`, data, headers).then(data => {
        console.log(data);
        this.sucessAdd = true
        this.id = data.data.post._id
        
      });
    }
  }
};
</script>

