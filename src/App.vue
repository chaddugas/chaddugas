<template lang="pug">
  router-view
</template>

<script>
export default {
  name: "Portfolio"
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=#{str-replace($headings, ' ', '+')}:700,400|#{str-replace($body, ' ', '+')}:300,400,700&display=swap");

:root {
	--palette: #{$paletteJSON};
	--paletteFull: #{$paletteFullJSON};
}

html {
  font-size: 16px;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: $onyx;
}

body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: $body, sans-serif;
  font-weight: $b_weight;
  font-size: $b_size;
  line-height: 1.6;
	background: $onyx;
	color: darken($white, 15%);
  position: relative;
}

main {
  z-index: 1;
  overflow-x: hidden;
  min-height: 100vh;
}

section {
  margin-top: 50px;
  margin-bottom: 80px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: $headings, sans-serif;
  font-weight: $h_weight;
}
</style>