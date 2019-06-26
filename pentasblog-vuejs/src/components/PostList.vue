<template>
    <!-- Blog Entries Column -->
    <div class="col-md-8">
      <h1 class="my-4">All Posts</h1>
      <!--Blog Post using v-for-->
      <div v-for="post in posts" class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <router-link v-bind:to="'/post/'+post._id" class="btn btn-primary">Read More &rarr;</router-link>
        </div>
        <div class="card-footer text-muted">
          Posted by {{ post.author }}
        </div>
      </div>
      <!-- Pagination -->
      <ul class="pagination justify-content-center mb-4">
        <li class="page-item">
          <a class="page-link" href="#">&larr; Older</a>
        </li>
        <li class="page-item disabled">
          <a class="page-link" href="#">Newer &rarr;</a>
        </li>
      </ul>
    </div>
</template>

<<script>
    export default {
        data() {
            return {
                posts: []
            }
        },
        async created() {
            try {
                const result = await this.$http.get('http://localhost:3000/post');
                this.posts = result.data;
                console.log(this.posts);
            } catch(err) {
                console.error(err);
            }
        },
    }
</script>