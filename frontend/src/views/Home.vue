<template>
    <div>

      <div class="text-center">
        <h1>Nest Blog Tutorial</h1>
       <p> This is the description of the blog built with Nest.js, Vue.js and MongoDB</p>

       <div v-if="posts.length === 0">
            <h2> No post found at the moment </h2>
        </div>
      </div>
       
        <div class="row">
           <div class="col-md-3" v-for="post in posts" :key="post._id">
              <div class="card mb-4 shadow-sm">
                <div class="card-header">
                   <h2 class="card-img-top">{{ post.title }}</h2>
                </div>
                <div class="card-body">
                  <p class="card-text">{{ cutText(post.body, 150)}}</p>
                                 
                </div>
                  <div class="card-footer">
                    <div class="row align-items-center">
                      <div class="col-md-6">
                        <small class="text-muted">Posted on: {{ post.date_posted}}</small><br/>
                        <small class="text-muted">by: {{ post.author}}</small>
                      </div>
                      <div class="col-md-6">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <router-link :to="{name: 'Post', params: {id: post._id}}" class="btn btn-sm btn-primary ">View Post </router-link>
                            <router-link :to="{name: 'Edit', params: {id: post._id}}" class="btn btn-sm btn-warning">Edit Post </router-link>
                            <button class="btn btn-sm btn-danger" v-on:click="deletePost(post._id)">Delete Post</button>
                          </div>
                        </div>  
                      </div>
                    </div>
                  </div>
              </div>
            </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { server } from "@/utils/helper";
import axios from "axios";

export default {
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get(`${server.baseURL}/blog/posts`)
        .then(data => (this.posts = data.data));
    },
    cutText(value, symbolsCount) {
      return value.length > symbolsCount
        ? value.slice(0, symbolsCount - 3) + '...'
        : value
    },
    deletePost(id) {
      axios.delete(`${server.baseURL}/blog/delete?postID=${id}`).then(data => {
        console.log(data);
        window.location.reload();
      });
    }
  }
};
</script>

