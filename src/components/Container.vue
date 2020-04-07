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
      <div v-for="result in response.results" :key="result.id" class="result">
        <img :src="result.fields.thumbnail" alt="photo" srcset="" />
        <div class="tile">
          <div class="headline">{{ result.webTitle }}</div>
          <div class="section-and-date" style="justify-content: space-between;">
            <div class="section">{{ result.sectionName }}</div>
            <span>{{ formateDate(result.webPublicationDate) }}</span>
          </div>
        </div>
      </div>
      <div style="padding : 16px">
        <button v-on:click="loadMore">Load More</button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { getMonth } from "../utils/util";

export default {
  name: "Container",
  data: () => ({
    page: 1
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
        page: 1
      },
      fetchPolicy: "cache-and-network"
    }
  },
  methods: {
    formateDate: function(value) {
      const dateString = new Date(value);
      const month = dateString.getMonth();
      return `${dateString.getDate()} ${getMonth(month)} ${dateString.toTimeString().split(" ")[0]}`;
    },

    loadMore: function() {
      this.page++;

      this.$apollo.queries.response.fetchMore({
        variables: {
          page: this.page
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          const response = fetchMoreResult.response;
          return {
            response: {
              __typename: previousResult.response.__typename,
              results: [...previousResult.response.results, ...response.results]
            }
          };
        }
      });
    }
  }
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

.result {
  min-height: 110px;
  background: #ffffff;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  background-position: center;
  transition: background 0.8s;
}

.result:hover {
  background: #ffffff radial-gradient(circle, transparent 1%, #ffffff 1%) center/15000%;
}

.result:active {
  background-color: #8080801f;
  background-size: 100%;
  transition: background 0s;
}

.result img {
  height: 90px;
  min-height: 90px;
  width: 90px;
  min-width: 90px;
  object-fit: cover;
}

.tile {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.headline {
  font-size: 0.8em;
  text-align: start;
}

.section {
  height: 20px;
  font-size: 0.7em;
  color: #ffffff;
  background: rgba(29, 161, 242, 1);
  line-height: 20px;
  padding: 0px 10px;
  width: fit-content;
}

.section-and-date {
  display: flex;
  align-items: center;
}

.section-and-date span {
  margin-left: 10px;
  font-size: 0.7em;
  color: rgb(101, 119, 135);
}
</style>
