<template>
  <div v-if="response">
    <div class="upper-container">
      <TopArticles v-bind:articles="response.results.slice(0, 5)"></TopArticles>
    </div>
    <div class="lower-container">
      <Article v-for="(result, index) in response.results.slice(5, response.results.length)" :key="index" v-on:detailedArticle="goToDetailedArticle($event)" v-bind:result="result"></Article>
      <div style="padding : 16px">
        <button v-on:click="loadMore">Load More</button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { getMonth } from "../utils/util";
import Article from "./Article";
import TopArticles from "./TopArticles";

export default {
  name: "Container",
  components: { Article, TopArticles },
  data: () => ({
    page: 1,
  }),
  apollo: {
    response: {
      query: gql`
        query FetchResponse($page: Int!) {
          response(page: $page) {
            results {
              id
              webTitle
              sectionName
              webPublicationDate
              fields {
                thumbnail
              }
            }
          }
        }
      `,
      variables: {
        page: 1,
      },
    },
  },
  methods: {
    formateDate: function(value) {
      const dateString = new Date(value);
      const month = dateString.getMonth();
      return `${dateString.getDate()} ${getMonth(month)} ${dateString.toTimeString().split(" ")[0]}`;
    },

    goToDetailedArticle: function(value) {
      this.$router.push({ name: "article", query: { payload: encodeURIComponent(JSON.stringify({ id: value.id, thumbnail: value.fields.thumbnail })) } });
    },

    loadMore: function() {
      this.page++;

      this.$apollo.queries.response.fetchMore({
        variables: {
          page: this.page,
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          const response = fetchMoreResult.response;
          return {
            response: {
              __typename: previousResult.response.__typename,
              results: [...previousResult.response.results, ...response.results],
            },
          };
        },
      });
    },
  },
};
</script>

<style>
.upper-container {
  background-color: #ffffff;
  height: 33vh;
}

.lower-container {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  height: 65.5vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: #ffffff;
}
</style>
