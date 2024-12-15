<template>
  <div id="single-post-wrapper">
    <div class="post-container">
      <h2>Post Details</h2>
      <div v-if="post" class="post">
        <p><strong>Post ID:</strong> {{ post.id }}</p>
        <p><strong>Body:</strong>
          <textarea v-model="updatedPost.body" rows="6"></textarea>
        </p>
        <button @click="handleUpdate" class="btn-update">Update</button>
        <button @click="handleDelete" class="btn-delete">Delete</button>
      </div>
      <div v-else>
        <p>Loading post...</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SinglePostView",
  data() {
    return {
      post: null,     // Store the current post
      updatedPost: {    // Store the updated post data
        body: ''
      }
    };
  },
  methods: {
    ...mapActions(['updatePost', 'deletePost']),
    async handleUpdate() {
      await this.updatePost({id: this.post.id, postData: this.updatedPost});
      this.$router.push('/');
    },
    async handleDelete() {
      await this.deletePost(this.post.id);
      this.$router.push('/');
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts
    }),
  },
  mounted() {
    this.post = this.posts.find(post => post.id === parseInt(this.$route.params.id));
    this.updatedPost.body = this.post.body;
  }
};
</script>

<style scoped>
#single-post-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.post-container {
  max-width: 600px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  text-align: center;
}

textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: 10px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-update {
  background-color: #45a049;
  color: white;
  border: none;
}

.btn-update:hover {
  background-color: #388e3c;
}

.btn-delete {
  background-color: #e53935;
  color: white;
  border: none;
}

.btn-delete:hover {
  background-color: #c62828;
}
</style>
