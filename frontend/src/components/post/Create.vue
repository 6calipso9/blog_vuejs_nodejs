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
              <select class="form-control" id="exampleFormControlSelect1" v-model="select">
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
                    value="Ready"
                    v-model="radio"
                  />
                  <label class="form-check-label" for="inlineRadio1">Ready</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="In process"
                    v-model="radio"
                  />
                  <label class="form-check-label" for="inlineRadio2">In process</label>
                </div>
              </div>
            </div>
            <div class="form-group col-md-12">
              <label for="body">Select background iamge</label>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="customFile"
                  @change="previewImage($event)"
                />
                <label class="custom-file-label" for="customFile">image...</label>
              </div>
            </div>
            <div class="form-group col-md-12">
              <label for="body">Select language</label>
              <vue-bootstrap-typeahead
                v-model="query"
                @hit="selectedAddress = $event"
                :data="['Russian', 'Ucraine', 'English']"
              />
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
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
export default {
  components: {
    VueBootstrapTypeahead
  },
  data() {
    return {
      title: "",
      text: "",
      sucessAdd: false,
      id: "",
      items: ["foo", "bar", "fizz", "buzz"],
      values: ["foo", "bar"],
      value: null,
      selectedAddress: null,
      image: null
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
        text: this.text,
        typePost: this.select,
        status: this.radio,
        language: this.selectedAddress,
        image: this.image
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
    },
    previewImage: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.image = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>