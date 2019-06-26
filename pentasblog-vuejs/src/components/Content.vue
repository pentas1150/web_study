<template>
<!-- Post Content Column -->
<div class="col-lg-8">
    <!-- Title -->
    <h3 class="mt-4">{{ post.title }}</h3>
    <!-- Author -->
    <p class="lead">
      by {{ post.author }}
    </p>
    <hr>
    <!-- Date/Time -->
    {{ post.createdAt }}
    <hr>
    <!-- Post Content -->
    <p v-html="post.content"></p>
    <hr>
    <!-- Comments Form -->
    <div class="card my-4">
      <h5 class="card-header">Leave a Comment:</h5>
      <div class="card-body">
        <form>
          <div class="form-group">
            <textarea class="form-control" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <!-- Single Comment -->
    <div v-for="comment in comments" class="media mb-4">
      <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
      <div class="media-body">
        <h5 class="mt-0">{{ comment.author }}</h5>
        {{ comment.comment }}
      </div>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        post: {},
        comments: []
      }
    },
    async created() {
      try {
        const postRes = await this.$http.get(`http://localhost:3000/post/${this.$route.params.id}`);
        this.post = postRes.data;

        const commentRes = await this.$http.get(`http://localhost:3000/comment/${this.$route.params.id}`);
        this.comments = commentRes.data;
      } catch(err) {
        console.error(err);
      }
    },
  }
</script>