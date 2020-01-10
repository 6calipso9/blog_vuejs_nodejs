<template>
  <div>
    <div class="card mx-auto" style="width: 30rem;">
      <div class="card-header text-center">
        <h2>Profile</h2>
      </div>

      <div class="card-body">
        <div v-show="sucessSave" class="alert alert-success" id="StatusGoodUpdate">Profile update</div>

        <div
          v-show="plsLogin"
          class="alert alert-danger"
          id="statusNotAuth"
        >Login please, after check state</div>
        <form id="create-post-form" @submit.prevent="SaveUser">
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
            <label for="text">Created: {{createdDate}}</label>
          </div>
          <div class="form-group col-md-12">
            <label for="text">Last Update: {{lastUpdate}}</label>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <div class="form-group col-md-12 pull-right">
          <button
            id="SaveBTN"
            class="btn btn-success col-md-12"
            v-on:click="SaveUser"
            type="submit"
          >Save</button>
        </div>
      </div>
    </div>
    <div class="card mx-auto mt-3" style="width: 60rem;">
      <div class="card-header text-center">
        <h2>My posts</h2>
      </div>

      <div class="card-body">
        <div v-show="sucessDel" class="alert alert-success">Sucess delete</div>
        <div id="create-post-form" @submit.prevent="SaveUser">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Use</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts" :key="post._id">
                <th>{{post._id}}</th>
                <td>{{post.title}}</td>
                <td>
                  <div class="btn-group">
                    <router-link
                      :to="{name: 'Posts', params: {id: post._id}}"
                      class="btn btn-sm btn-primary"
                    >View</router-link>
                    <router-link
                      :to="{name: 'Edit', params: {id: post._id}}"
                      class="btn btn-sm btn-warning"
                    >Edit Post</router-link>
                    <button
                      class="btn btn-sm btn-danger"
                      v-on:click="deletePost(post._id)"
                    >Delete Post</button>
                  </div>
                </td>
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
import { headers } from "../../utils/helper";
//import router from '../../router';
//import router from "../../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      sucessSave: false,
      posts: [],
      sucessDel: false,
      commentsCount: [],
      plsLogin: false
    };
  },
  created() {
    this.fetchInfo();
    this.fetchPosts();
  },
  methods: {
    deletePost(id) {
      this.sucessDel = false;
      this.$http
        .delete(`${server.baseURL}/posts/${id}`, "", {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`
          }
        })
        .then(
          (this.sucessDel = true),
          (this.posts = this.posts.filter(function(obj) {
            return obj._id !== id;
          }))
        );
    },
    fetchPosts() {
      this.$http
        .get(`${server.baseURL}/myposts`, "", {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`
          }
        })
        .then(
          data => ((this.posts = data.data.posts), (this.posts.post.cc = ""))
        );
    },
    fetchInfo() {
      if (localStorage.getItem("jwt") == null) this.plsLogin = true;
      this.$http
        .get(`${server.baseURL}/users/${localStorage.getItem("id")}`, "", {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`
          }
        })
        .then(response => {
          this.email = response.data.user.email;
          this.password = response.data.user.password;
          this.createdDate = response.data.user.createdAt;
          this.lastUpdate = response.data.user.updatedAt;
        })
        .catch(error => {
          console.log(error.data);
        });
    },
    SaveUser() {
      let postData = {
        email: this.email,
        password: this.password
      };
      this.sucessSave = false;

      let user = { user: postData };
      this.__submitToServer(user);
    },
    __submitToServer(data) {
      this.$http
        .patch(
          `${server.baseURL}/users/${localStorage.getItem("id")}`,
          data,
          headers
        )
        .then(() => {
          this.sucessSave = true;
          console.log(localStorage.getItem("jwt"));
        })
        .catch(error => {
          if (error.data.message.includes("Not authenticated"))
            this.errorNameOrPass = true;
          else this.errorServer = true;
          console.log(error);
        });
    }
  }
};
</script>

