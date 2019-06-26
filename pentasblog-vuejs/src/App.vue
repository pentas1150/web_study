<template>
  <div id="app">
    <Navigation/>
    <div class="container">
      <div class="row">
        <router-view></router-view>
        <Sidebar/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'
  import PostList from './components/PostList'
  import Content from './components/Content'
  import Sidebar from './components/Sidebar'
  import Footer from './components/Footer'
  
  export default {
    name: 'App',
    components: {
      Navigation,
      PostList,
      Content,
      Sidebar,
      Footer,
    },
  }
</script>

<style>
  #app {
    padding-top: 56px;
  }
</style>
