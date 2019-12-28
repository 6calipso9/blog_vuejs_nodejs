<template>
<div>
      <h4 class="text-center mt-20">
       <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Posts </button>
       </small>
    </h4>
        <div class="col-md-12 form-wrapper">
          <h2> Edit Post </h2>
          <div v-show="sucessEdit" class="alert alert-success">
              <div class="btn-group">
                <router-link :to="{name: 'Posts', params: {id: id}}" class="btn btn-sm btn-primary ">View Post</router-link>
              </div>
                Post edited!
              </div>
          <form id="edit-post-form" @submit.prevent="editPost">
            <div class="form-group col-md-12">
                <label for="title"> Title </label>
                <input type="text" id="title" v-model="post.title" name="title" class="form-control" placeholder="Enter title">
            </div>
            <div class="form-group col-md-12">
                <label for="text"> Write Content </label>
                <textarea id="text" cols="30" rows="5" v-model="post.text" class="form-control"></textarea>
            </div>
            <div class="form-group col-md-4 pull-right">
                <button class="btn btn-success" type="submit"> Edit Post </button>
            </div>
          </form>
        </div>
    </div>
</template>

<script>
import { server } from "../../utils/helper";
import axios from "axios";
import router from "../../router";
import { headers } from "../../utils/helper"
export default {
  data() {
    return {
      id: 0,
      post: {},
      sucessEdit : false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPost();
  },
  methods: {
    editPost() {
      let postData = {
        ... this.post,
        title: this.post.title,
        text: this.post.text,
      };
      let postik = {post: postData}
      this.sucessEdit = false

      this.$http.patch(`${server.baseURL}/posts/${this.id}`, postik, headers).then(data => {
        console.log(data);
        this.sucessEdit = true
        this.id = data.data.post._id
        this.sucessEdit = true
        
      });
    },
    getPost() {
      axios
        .get(`${server.baseURL}/posts/${this.id}`)
        .then(data => {(this.post = data.data.post)});
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

