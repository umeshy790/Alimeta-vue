<template>
  <div class="result" @click="handlClick()">
    <img :src="result.fields.thumbnail" alt="photo" />
    <div class="tile">
      <div class="headline">{{ result.webTitle }}</div>
      <div class="section-and-date" style="justify-content: space-between;">
        <div class="section">{{ result.sectionName }}</div>
        <span>{{ formateDate(result.webPublicationDate) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMonth } from "../utils/util";
export default {
  name: "Article",
  props: ["result"],
  methods: {
    formateDate: function(value) {
      const dateString = new Date(value);
      const month = dateString.getMonth();
      return `${dateString.getDate()} ${getMonth(month)} ${dateString.toTimeString().split(" ")[0]}`;
    },

    handlClick: function() {
      this.$emit("detailedArticle", this.result);
    },
  },
};
</script>

<style>
.tile {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
