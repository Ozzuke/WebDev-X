<template>
  <div id="single-post-wrapper">
    <div class="post-container">
      <h2>Post Details</h2>
      <div v-if="post" class="post">
        <p><strong>Post ID:</strong> {{ post.id }}</p>
        <p><strong>Body:</strong>
          <textarea v-model="updatedPost.body" rows="6"></textarea>
        </p>
        <button @click="updatePost" class="btn-update">Update</button>
        <button @click="deletePost" class="btn-delete">Delete</button>
      </div>
      <div v-else>
        <p>Loading post...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SinglePostView",
  data() {
    return {
      post: null,       // Store the current post
      updatedPost: {    // Store the updated post data
        body: ''
      }
    };
  },
  methods: {
    // Fetch the post based on ID
    async fetchPost() {
      try {
        const token = localStorage.getItem('token');
        const postId = this.$route.params.id;  // Get the post ID from the route params
        const response = await fetch(`http://localhost:42069/api/posts/${postId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
      });
        const data = await response.json();
        this.post = data;  // Set the post data
        this.updatedPost.body = data.body;  // Pre-fill the update textarea with the current body
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
    
    // Update the post's body
    async updatePost() {
      try {
        const token = localStorage.getItem('token');
        const postId = this.$route.params.id;
        const response = await fetch(`http://localhost:42069/api/posts/${postId}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(this.updatedPost),
        });
        
        if (response.ok) {
          const data = await response.json();
          this.post = data;
          alert('Post updated successfully!');
        } else {
          alert('Error updating post');
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },

    // Delete the post
    async deletePost() {
      try {
        const token = localStorage.getItem('token');
        const postId = this.$route.params.id;
        const response = await fetch(`http://localhost:42069/api/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.ok) {
          this.$router.push('/');  // Redirect to the homepage after deletion
          alert('Post deleted successfully!');
        } else {
          alert('Error deleting post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  },

  mounted() {
    this.fetchPost();  // Fetch the post when the component is mounted
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
