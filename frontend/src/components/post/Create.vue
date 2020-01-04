<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <form id="create-post-form" @submit.prevent="createPost">
        <div class="card mx-auto" style="width: 30rem;">
          <div class="card-header text-center">
            <h2>Create post</h2>
          </div>
          <div class="card-body">
            <div v-show="sucessAdd" class="alert alert-success">
              <div class="btn-group">
                <router-link
                  :to="{name: 'Posts', params: {id: id}}"
                  class="btn btn-sm btn-primary"
                >View Post</router-link>
              </div>Post added!
            </div>

            <div class="form-group col-md-12">
              <label for="title">Title</label>
              <input
                type="text"
                id="title"
                v-model="title"
                name="title"
                class="form-control"
                placeholder="Enter title"
                required="required"
                pattern="[A-Za-z0-9]{1,20}"
              />
            </div>
            <div class="form-group col-md-12">
              <label for="body">Write Content</label>
              <textarea
                id="text"
                cols="30"
                rows="5"
                v-model="text"
                class="form-control"
                required="required"
                pattern="[A-Za-z0-9]{1,20}"
              ></textarea>
            </div>
            <div class="form-group col-md-12">
              <label for="body">Select type</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>Post</option>
                <option>Guide</option>
                <option>Text</option>
              </select>
            </div>
            <div class="form-group col-md-12">
              <label for="body">Select status</label>
              <div class>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label class="form-check-label" for="inlineRadio1">Ready</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label class="form-check-label" for="inlineRadio2">In process</label>
                </div>
              </div>
            </div>
            <div class="form-group col-md-12">
              <label for="body">Select background iamge</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" />
                <label class="custom-file-label" for="customFile">image...</label>
              </div>
            </div>
            <div class="form-group col-md-12">
              <label for="body">Select tags</label>
              <v-col cols="12">
                <v-autocomplete v-model="value" :items="items" dense filled label="Filled"></v-autocomplete>
              </v-col>
            </div>
          </div>
          <div class="card-footer">
            <div class="form-group col-md-12 pull-right">
              <button class="btn btn-success col-md-12" type="submit">Create Post</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import { server } from "../../utils/helper";
//import router from "../../router";
import { headers } from "../../utils/helper";
export default {
  data() {
    return {
      title: "",
      text: "",
      sucessAdd: false,
      id: "",
      items: ["foo", "bar", "fizz", "buzz"],
      values: ["foo", "bar"],
      value: null
    };
  },
  created() {
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {
    createPost() {
      this.sucessAdd = false;
      let postData = {
        title: this.title,
        text: this.text
      };
      let post = { post: postData };
      this.__submitToServer(post);
    },
    __submitToServer(data) {
      this.$http.post(`${server.baseURL}/posts`, data, headers).then(data => {
        console.log(data);
        this.sucessAdd = true;
        this.id = data.data.post._id;
      });
    }
  }
};
</script>