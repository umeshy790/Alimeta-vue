<template>
  <div v-if="response">
    <div class="upper-container">
      <img :src="response.results[0].fields.thumbnail" style="height:35vh; width : 100vw; object-fit : cover" alt="photo" srcset="" />
      <div id="block">
        <span id="title">{{ response.results[0].webTitle }}</span>
        <div class="section-and-date">
          <div class="section">{{ response.results[0].sectionName }}</div>
          <span>{{ formateDate(response.results[0].webPublicationDate) }}</span>
        </div>
      </div>
    </div>
    <div class="lower-container">
      <Article v-for="(result, index) in response.results" :key="index" v-on:detailedArticle="goToDetailedArticle($event)" v-bind:result="result"></Article>
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

export default {
  name: "Container",
  components: { Article },
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
  height: 48vh;
}

.lower-container {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  height: 50.8vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: #ffffff;
}

#block {
  padding: 10px;
  height: 12vh;
  overflow: hidden;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#title {
  font-size: 0.95em;
  text-align: start;
  display: block;
}
</style>
