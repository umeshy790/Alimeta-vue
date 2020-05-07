<template>
  <div v-if="data">
    <div style="position : relative">
      <img v-bind:src="thumbnail" alt="photo" class="img" />
      <div class="body">
        <div style="height: 250px; background : transparent"></div>
        <div class="txt-body">
          <span>{{ data.getContent.content.fields.bodyText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "DetailedArticle",
  created: async function() {
    let { payload } = this.$route.query;
    if (payload) {
      payload = decodeURIComponent(payload);
      const { id, thumbnail } = JSON.parse(payload);
      this.thumbnail = thumbnail;
      const { data, loading } = await this.$apollo.query({
        query: gql`
          query Content($id: String!) {
            getContent(id: $id) {
              content {
                fields {
                  bodyText
                }
              }
            }
          }
        `,
        variables: {
          id: id,
        },
      });
      this.data = data;
      this.loading = loading;
    }
  },
  data: () => ({
    loading: true,
    data: null,
    thumbnail: null,
    timeout: null,
    opacity: 1,
  }),

  destroyed: function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
};
</script>
<style>
.img {
  height: 250px;
  object-fit: fill;
  width: 100%;
}

.body {
  box-sizing: border-box;
  font-size: 14px;
  line-height: 22px;
  position: absolute;
  top: 0px;
  background: transparent;
  z-index: 10;
  height: 100vh;
  left: 0px;
  right: 0px;
  overflow: auto;
  top: 0px;
  bottom: 0px;
}

.txt-body {
  padding: 16px;
  background: #ffffff;
}
</style>
