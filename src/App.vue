<template>
  <div id="app">
    <Container></Container>
  </div>
</template>

<script>
import Container from "../src/components/Container";
export default {
  name: "App",
  components: { Container }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Merriweather&display=swap");
#app {
  font-family: "Merriweather", serif;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background: rgb(245, 248, 250);
  overflow: hidden;
}
</style>
