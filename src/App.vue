<template lang="pug">
  router-view
</template>

<static-query>
</static-query>

<script>
export default {
  name: "Portfolio"
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=#{str-replace($headings, ' ', '+')}:700,400|#{str-replace($body, ' ', '+')}:300,400,700&display=swap");

html {
  font-size: 16px;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: $body, sans-serif;
  font-weight: $b_weight;
  font-size: $b_size;
  line-height: 1.4;
  background: $gray;
	color: $onyx;
}

main {
	z-index: 1;
	overflow-x: hidden;
	min-height: 100vh;
	// max-height: 100vh;
	// overflow-y: auto;
	scroll-snap-type: y proximity;
	scroll-snap-points-y: 85vh;
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

[class*="wysiwyg"] {
	line-height: 1.6;
	font-size: 18px;
	img {
		max-width: 100%;
	}
  a {
    text-decoration: none;
  }
  a:hover {
    border-bottom: 1px solid;
  }
  abbr {
    border-bottom: 1px dotted;
    cursor: help;
  }
  cite {
    font-style: italic;
  }
  hr {
    background: #e6e6e6;
    border: none;
    display: block;
    height: 1px;
    margin-bottom: 1.4em;
    margin-top: 1.4em;
  }
  img {
    vertical-align: text-bottom;
  }
  ins {
    background-color: lime;
    text-decoration: none;
  }
  mark {
    background-color: #ff0;
  }
  small {
    font-size: 0.8em;
  }
  strong {
    font-weight: 700;
  }
  sub,
  sup {
    font-size: 0.8em;
  }
  sub {
    vertical-align: sub;
  }
  sup {
    vertical-align: super;
  }
  p,
  dl,
  ol,
  ul,
  blockquote,
  pre,
  table {
    margin-bottom: 1.4em;
  }
  p:last-child,
  dl:last-child,
  ol:last-child,
  ul:last-child,
  blockquote:last-child,
  pre:last-child,
  table:last-child {
    margin-bottom: 0;
  }
  p:empty {
    display: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
		font-weight:700;
		line-height:1.2;
		color: $onyx;
  }
  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child {
    margin-top: 0;
  }
  h1 {
    font-size: 1.8em;
    margin-bottom: 0.58333em;
    margin-top: 0.58333em;
    line-height: 1;
		@media (min-width: $md) {
			font-size: 2.4em;
		}
  }
  h2 {
    font-size: 1.4em;
    margin-bottom: 0.875em;
    margin-top: 1.75em;
    line-height: 1.1;
		@media (min-width: $md) {
			font-size: 1.6em;
		}
  }
  h3 {
    font-size: 1.3em;
    margin-bottom: 1.07692em;
    margin-top: 1.07692em;
  }
  h4 {
    font-size: 1.2em;
    margin-bottom: 1.16667em;
    margin-top: 1.16667em;
  }
  h5 {
    font-size: 1.1em;
    margin-bottom: 1.27273em;
    margin-top: 1.27273em;
  }
  h6 {
    font-size: 1em;
    margin-bottom: 1.4em;
    margin-top: 1.4em;
  }
  dd {
    margin-left: 1.4em;
  }
  ol,
  ul {
    list-style-position: outside;
    margin-left: 1.4em;
  }
  ol {
    list-style-type: decimal;
  }
  ol ol {
    list-style-type: lower-alpha;
  }
  ol ol ol {
    list-style-type: lower-roman;
  }
  ol ol ol ol {
    list-style-type: lower-greek;
  }
  ol ol ol ol ol {
    list-style-type: decimal;
  }
  ol ol ol ol ol ol {
    list-style-type: lower-alpha;
  }
  ul {
    list-style-type: disc;
  }
  ul ul {
    list-style-type: circle;
  }
  ul ul ul {
    list-style-type: square;
  }
  ul ul ul ul {
    list-style-type: circle;
  }
  ul ul ul ul ul {
    list-style-type: disc;
  }
  ul ul ul ul ul ul {
    list-style-type: circle;
  }
  blockquote {
		padding: 0.4em 1.5em 0.4em 0;
		text-align: right;
		font-family: $headings, sans-serif;
		position: relative;
		z-index: 1;
		color: lighten($onyx, 20%);
		font-style: italic;
		font-size: 1.1rem;
		margin: 1.75rem 0;
		@media (min-width: $md) {
			margin: 2.25rem 3rem;
		font-size: 1.2rem;
		padding: 0.6em 1.2em;
		}
		&:after {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			width: 8px;
			background: $orange;
			z-index: 1;
			content: '';
		}
  }
  blockquote p {
    margin-bottom: 0;
		&:before {
			content: '"'
		}
		&:after {
			content: '"'
		}
  }
  code,
  kbd,
  samp,
  pre {
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
    background-color: #f2f2f2;
    color: #333;
    font-size: 0.9em;
  }
  code,
  kbd,
  samp {
    border-radius: 3px;
    line-height: 1.77778;
    padding: 0.1em 0.4em 0.2em;
    vertical-align: baseline;
  }
  pre {
    overflow: auto;
    padding: 1em 1.2em;
  }
  pre code {
    background: none;
    font-size: 1em;
    line-height: 1em;
  }
  figure {
    margin-bottom: 2.8em;
    text-align: center;
  }
  figure:first-child {
    margin-top: 0;
  }
  figure:last-child {
    margin-bottom: 0;
  }
  figcaption {
    font-size: 0.8em;
    margin-top: 0.875em;
  }
  table {
    width: 100%;
  }
  table pre {
    white-space: pre-wrap;
  }
  th,
  td {
    font-size: 1em;
    padding: 0.7em;
    border: 1px solid #e6e6e6;
    line-height: 1.4;
  }
  thead tr,
  tfoot tr {
    background-color: #f5f5f5;
  }
  thead th,
  thead td,
  tfoot th,
  tfoot td {
    font-size: 0.9em;
    padding: 0.77778em;
  }
  thead th code,
  thead td code,
  tfoot th code,
  tfoot td code {
    background-color: #fff;
  }
  tbody tr {
    background-color: #fff;
  }
}
</style>