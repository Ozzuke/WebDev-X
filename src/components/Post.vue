<script>
import {mapActions} from "vuex";

export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    userIconSrc() {
      return this.post.userIcon ? require(`@/assets/${this.post.userIcon}`) : '';
    },
    contentImages() {
      return this.post.content.images ? this.post.content.images.map(image => require(`@/assets/${image}`)) : [];
    }
  },
  methods: {
    ...mapActions(['updateReaction']),
    handleReaction(reaction) {
      this.updateReaction({postId: this.post.id, reaction})
    },
    formatDate(date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    // nextImage() {
    //   this.currentImageIndex = (this.currentImageIndex + 1) % this.post.content.images.length
    // },
    // prevImage() {
    //   this.currentImageIndex = (this.currentImageIndex - 1 + this.post.content.images.length) % this.post.content.images.length
    // }
  },
  data() {
    return {
      currentImageIndex: 0
    }
  }
}
</script>

<template>
  <article class="post">
    <div class="post-header">
       <img src="../assets/images/default-user-icon.svg" alt="User icon" class="user-icon">
      <span class="post-author">{{ post.author }}</span>
      <span class="post-date">
        <time>{{ post.time }}</time>
        {{ formatDate(new Date(post.date)) }} </span>
    </div>

    <div class="post-content">
      <p v-html="post.body"></p>
<!--      <div class="post-images">-->
<!--        <div class="carousel">-->
<!--          <button-->
<!--              v-if="post.content.images.length > 1"-->
<!--              @click="prevImage"-->
<!--              class="prev-button"-->
<!--              :disabled="currentImageIndex === 0"-->
<!--          >-->
<!--            &#8249;-->
<!--          </button>-->
<!--          <img :src="contentImages[currentImageIndex]" alt="Post image">-->
<!--          <button-->
<!--              v-if="post.content.images.length > 1"-->
<!--              @click="nextImage"-->
<!--              class="next-button"-->
<!--              :disabled="currentImageIndex === post.content.images.length - 1"-->
<!--          >-->
<!--            &#8250;-->
<!--          </button>-->
<!--          <div v-if="contentImages.length > 1" class="image-counter">-->
<!--            {{ currentImageIndex + 1 }} / {{ post.content.images.length }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <div class="post-footer">
      <div class="post-reactions">
        <div v-for="(count, reaction) in post.reactions" :key="reaction" class="reaction">
          <button @click="handleReaction(reaction)">
            <img :src="require(`@/assets/images/${reaction}.svg`)" :alt="`${reaction} button`">
          </button>
          <span class="reaction-count">{{ count }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  background-color: #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 30px 10px 30px;
  width: 100%;
  max-width: 500px;
  min-width: 250px;
}

.post-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
}

.post-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -webkit-user-drag: none;
}

.post-header img + span {
  margin-left: 10px;
  margin-right: auto;
  font-size: 1.1em;
  font-family: Futura, sans-serif;
}

.post-header span {
  font-family: monospace;
  font-size: 1.2em;
}

.post-header time {
  font-family: monospace;
  font-size: 0.8em;
  color: #666;
}

.post-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0;
}

.carousel {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.carousel img {
  width: auto;
  height: auto;
  max-width: 100%;
  min-width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.carousel button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 50%;
  font-size: 1.5em;
  cursor: pointer;
  text-align: center;
  z-index: 2;
}

.carousel button:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.carousel button:disabled {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: not-allowed;
}

.prev-button {
  left: 5px;
}

.next-button {
  right: 5px;
}

.image-counter {
  position: absolute;
  bottom: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.8em;
  color: #444;
  z-index: 2;
}

.post-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.post-reactions {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0;
}

.reaction {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0 10px 0 0;
}

.reaction button {
  width: auto;
  height: 32px;
  padding: 0 0;
  background-color: transparent;
  border: none;
  margin: 0 3px 0 0;
  cursor: pointer;
}

.reaction:last-of-type button {
  margin-right: 4px;
}

.reaction-count {
  color: #444;
  font-size: 1.2em;

}

button > img {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-user-drag: none;
}

.post-footer button:hover img {
  position: relative;
  bottom: 3px;
}

.post-footer button:active img {
  bottom: 5px;
}

main > div:last-of-type {
  color: #666;
}
</style>
