<template>
    <div class="text-center">
        <div class="col-sm-12">
      <h4 style="margin-top: 30px;"><small><button class="btn btn-success" v-on:click="navigate()"> View All Posts </button></small></h4>
      <hr>
      <h2>{{ post.title }}</h2>
      <h5><span class="glyphicon glyphicon-time"></span> Post by {{post.author}}, {{post.createdAt}}.</h5>
      <p> {{ post.text }} </p>
  
    </div>
    <div class="card mx-auto" style="width: 40rem;">
      <div class="card-header text-center">
        <h6> Write comment </h6>
        <div v-show="sucessAdded" class="alert alert-success">
                Comment added!
              </div>
      </div>
      <div class="card-body">
        <textarea class="form-control" v-model="mycomment" placeholder="write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <button class="btn btn-success col-md-12" v-on:click="sendComment" type="submit"> Commit </button>
      </div>
      <div class="card-body">
        <div v-for="commentar in comments" :key="commentar._id" class="media-body">
          <span class="text-muted pull-right">
                                    <small class="text-muted">{{commentar.createdAt.slice(0,10)}} - </small>
                                </span>
                                <strong class="text-success">{{commentar.author}}</strong>
                                <div class="alert alert-secondary text-left" role="alert">
                                  {{commentar.text}}
                                </div>
      </div>
      </div>
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
      mycomment: "",
      sucessAdded: false,
      comments: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPost();
    this.getComments();
  },
  methods: {
    sendComment(){
      let text = {text : this.mycomment}
      let commentik = {comment: text}
      this.sucessAdded = false;
      this.__submitCommentToServer(commentik)
    },
    getComments() {
      axios
        .get(`${server.baseURL}/posts/${this.id}/comments`)
        .then(data => {(this.comments = data.data.comments), console.log(this.comments)});
    },
    getPost() {
      axios
        .get(`${server.baseURL}/posts/${this.id}`)
        .then(data => {(this.post = data.data.post)});
    },
    navigate() {
      router.push('/home');
    },
    __submitCommentToServer(data) {
      this.$http.post(`${server.baseURL}/posts/${this.id}/comments`, data, headers).then(data => {
        console.log(data);
        this.sucessAdd = true
        this.sucessAdded = true
        location.reload()
      });
    }
  }
};
</script>

<style  scoped>
body{margin-top:20px;}

.comment-wrapper .panel-body {
    max-height:650px;
    overflow:auto;
}

.comment-wrapper .media-list .media img {
    width:64px;
    height:64px;
    border:2px solid #e5e7e8;
}

.comment-wrapper .media-list .media {
    border-bottom:1px dashed #efefef;
    margin-bottom:25px;
}
</style>
