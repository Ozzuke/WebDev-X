<template>
  <div class="home-layout">
    <LeftSidebar/>

    <button @click="handleLogout" id="logout-button">
      Logout
    </button>

    <main v-if="loading">
      <p>Loading...</p>
    </main>

    <main v-else-if="isError">
      <p>Error fetching posts: {{ error }}</p>
    </main>

    <main v-else>
      <div v-if="posts.length" id="posts-container">
        <Post
            v-for="post in posts"
            :key="post.id"
            :post="post"
        />
      </div>
      <div>
        <span id="page-end-text">
          &lt; No more posts to show,
          <RouterLink to="/add-post">
            create a post yourself!
          </RouterLink>
          &gt;
        </span>
<!--        <button @click="resetLikes" id="reset-likes">-->
<!--          Reset Reactions-->
<!--        </button>-->
        <button @click="deleteAllPosts" id="delete-all-posts">
          Delete All Posts
        </button>
      </div>
    </main>

    <RightSidebar/>
  </div>
</template>

<script>
import LeftSidebar from "../components/LeftSidebar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import Post from "../components/Post.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "Home",
  components: {
    RightSidebar,
    LeftSidebar,
    Post
  },
  data() {
    return {
      loading: true,
      isError: false,
      error: null
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts
    })
  },
  methods: {
    ...mapActions(['fetchPosts']),
    loadPosts() {
      try {
        this.fetchPosts()
        this.loading = false
      } catch (e) {
        this.isError = true
        this.error = e
        console.error('Error loading posts:', e)
      }
    },
    async handleLogout() {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      } catch (e) {
        console.error('Error logging out:', e)
      }
    },
    async deleteAllPosts() {
      const token = localStorage.getItem('token');
      try {
        await fetch('http://localhost:42069/api/posts', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        await this.fetchPosts(); // Refresh posts after deletion
      } catch (e) {
        console.error('Error deleting posts:', e);
      }
    }
  },
  created() {
    this.loadPosts()
  },
}
</script>

<style scoped>
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.home-layout {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  padding: 0;
}

aside {
  max-width: 300px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 15vw;
  margin: 0;
  padding: 30px 20px;
  background-color: lightgray;
}

#posts-container + div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

#posts-container + div span {
  color: #666;
  font-style: italic;
}

#reset-likes, #delete-all-posts {
  margin-top: 20px;
  padding: 10px;
  background-color: #f00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
