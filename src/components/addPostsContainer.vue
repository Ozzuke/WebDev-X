<script>
import {mapActions} from "vuex";

export default {
  name: "addPostsContainer",
  data() {
    return {
      postText: ''
    };
  },
  methods: {
    ...mapActions(["addPost"]),
    async submitPost() {
      await this.addPost({body: this.postText});
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div id="addPost-layout">
    <form class="addPost-form" @submit.prevent="submitPost">
      <div>
        <label for="post-text" id="post-text-label">Post body:</label>
        <textarea v-model="postText" id="post-text" name="post-text" rows="6" cols="20" placeholder="Enter your post content"></textarea>
      </div>
      <div class="submit-button-div">
        <button type="submit" class="submit-button">Create Post</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
#addPost-layout {
  display: flex;
  justify-content: center;
  align-content: center;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  background-color: #f0f0f0;
  border-radius: 1em;
  width: 28vw;
  min-width: 300px;
  max-width: 500px;
  height: auto;
}

.addPost-form div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
}

.submit-button-div {
  display: flex;
  justify-content: center;
}

textarea {
  padding: 10px;
  border-radius: 4px;
  border-style: none;
  width: 100%;
  height: auto;
}

.submit-button {
  background-color: #343a8f;
  color: white;
  border-style: none;
  height: 2em;
  padding: 0.5vw 1vw;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
