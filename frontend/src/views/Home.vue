<template>
    <div>

      <div class="text-center">
        <h1>BSTU Blog</h1>
       <p> This blog by student PV-41</p>

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
                  <p class="card-text">{{ cutText(post.text, 150)}}</p>                                 
                </div>
                  <div class="card-footer">
                    <div class="row align-items-center">
                      <div class="col-md-6">
                        <small class="text-muted">Posted on: {{ post.createdAt}}</small><br/>
                        <small class="text-muted">by: {{ post.author}}</small>
                      </div>
                      <div class="col-md-6">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <router-link :to="{name: 'Posts', params: {id: post._id}}" class="btn btn-sm btn-primary ">View Post</router-link>
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
      this.$http.get(`${server.baseURL}/posts`, "", {
            headers:{
                'Authorization': `${localStorage.getItem('jwt')}`
            }
        })
        .then(data => (this.posts = data.data.posts));
    },
    cutText(value, symbolsCount) {
      return value.length > symbolsCount
        ? value.slice(0, symbolsCount - 3) + '...'
        : value
    },
  }
};
</script>

