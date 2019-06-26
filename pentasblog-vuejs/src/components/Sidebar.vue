<template>
<!-- Sidebar Widgets Column -->
<div class="col-md-4">
    <!-- Search Widget -->
    <div class="card my-4">
      <h5 class="card-header">Search</h5>
      <div class="card-body">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for...">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button">Go!</button>
          </span>
        </div>
      </div>
    </div>
    <!-- Categories Widget -->
    <div class="card my-4">
      <h5 class="card-header">Categories</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
              <li v-for="category in categories">
                <a href="#">{{ category.category }}</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
              <li>
                <a href="#">JavaScript</a>
              </li>
              <li>
                <a href="#">CSS</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        categories: []
      }
    },
    async created() {
      try {
        const result = await this.$http.get('http://localhost:3000/category');
        this.categories = result.data;
      } catch(err) {
        console.error(err);
      }
    },
  }
</script>