<template>
  <div class="main_style_1">
    <div class="home_title" style>
      <div style>
        <h1>BSTU Blog</h1>
        <p>This blog by student PV-41</p>
      </div>
      <div v-if="posts.length === 0" style="order: 2">
        <h2>No post found at the moment</h2>
      </div>
    </div>

    <div class="sp_row" style>
      <div class="col-md-4" v-for="post in posts" :key="post._id">
        <div class="card mb-4 shadow-sm sp_card">
          <div class="card-header" style="width: 100%;">
            <h2 class="card-img-top">{{ post.title }}</h2>
          </div>
          <div class="card-body" style="width: 100%;">
            <p class="card-text">{{ cutText(post.text, 150)}}</p>
          </div>
          <div class="card-footer" style="width: 100%; ">
            <div class="row align-items-center sp_card_footer">
              <div style="widht: 80%; order: 2">
                <small class="text-muted">Posted on: {{post.createdAt}}</small>
                <br />
                <small class="text-muted">by: {{post.author}}</small>
              </div>
              <div style="flex-grow: 1; ">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="btn-group">
                    <router-link
                      :to="{name: 'Posts', params: {id: post._id}}"
                      class="btn btn-sm btn-primary"
                    >View Post</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="...">
      <ul class="pagination pagination-lg justify-content-center">
        <div class="page-item" v-for="cp in countPage" :key="cp.id">
          <a class="page-link" v-on:click="fetchPosts(cp.id)">{{cp.id + 1}}</a>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
import { server } from "@/utils/helper";

export default {
  data() {
    return {
      posts: [],
      pageNumber: 0,
      countPage: []
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts(page = null) {
      //alert(page);
      if (page != null) this.pageNumber = page;
      this.$http
        .get(`${server.baseURL}/posts/list/${this.pageNumber}`, "", {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`
          }
        })
        .then(
          data => (
            (this.posts = data.data.posts),
            (this.countPage = data.data.countList),
            (this.pageNumber = data.data.nowList)
          )
        );
    },
    cutText(value, symbolsCount) {
      return value.length > symbolsCount
        ? value.slice(0, symbolsCount - 3) + "..."
        : value;
    }
  }
};
</script>

