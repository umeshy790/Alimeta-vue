<template>
  <div style="position : relative">
    <img :src="this.articles[this.index].fields.thumbnail" class="article-img" alt="photo" srcset="" />
    <div id="block">
      <span id="title">{{ this.articles[this.index].webTitle }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopArticles",
  props: ["articles"],
  created: function() {
    let interval = null;
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      if (this.index === 4) {
        this.index = 0;
        return;
      }
      this.index = ++this.index;
    }, 5000);
  },
  data: () => ({ index: 0 }),
};
</script>

<style>
.article-img {
  height: 35vh;
  width: 100vw;
  object-fit: cover;
}

#block {
  position: absolute;
  padding: 12px;
  background: #ffffff;
  bottom: 13px;
  left: 13px;
  right: 13px;
  border-radius: 20px;
  opacity: 0.8;
}

#title {
  font-size: 0.9em;
  text-align: start;
  display: block;
}
</style>
