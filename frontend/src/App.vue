<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> 
      <router-link to="/about"> | About</router-link> 
      <router-link to="/create"> | Create</router-link>  
      <router-link v-if="!authed" to="/register"> | Register</router-link>  
      <router-link v-if="!authed" to="/login"> | Login</router-link>
      <router-link v-if="authed" to="/profile"> | Profile</router-link>
      <router-link v-if="authed" to="/login">
          <span v-on:click="this.logaut"> | Logout</span>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import router from "./router";
export default{
  data() {
    return {
      email: "",
      password: "",
      sucessSave: false,
      authed: false,
    };
  },
  created() {
    if(localStorage.getItem('jwt') == null)
      this.authed = false;
    else this.authed = true;

  },
  methods:{
    logaut(){
      localStorage.removeItem('jwt');
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      router.push('/login')
      location.reload()
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
