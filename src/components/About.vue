<template lang="pug">
#about.section.section--small.section--right.section--dark
  .about__inner
    .section__title
      h2 Hi, I'm Chad
    .section__content
      p I’m a Senior Frontend Engineer and Director of Frontend Development, living and working in Denver, Colorado. I love to build challenging, visually exciting, and unique applications on the web.

      p One of my favorite things about development is the massive toolbox of languages, libraries, and methodologies that you can pull from. I am not one of those people who thinks if you want to be good at design, you have to be bad at logic, or vise-versa. I like to pride myself on being excellent at all aspects of web development.

      p Please feel free to review any of my projects (scroll down), and should the mood strike you, reach out on any to the platforms listed below.

      p - Cheers!


</template>

<style lang="scss" scoped>
#about {
  position: relative;
  height: max(90vh, 800px);
  z-index: 0;
  &::after {
    content: '';
    position: absolute;
    inset: 0rem;
    background: linear-gradient(to left, $green, $teal);
    z-index: -1;
  }
}

.about__inner {
  position: sticky;
  top: 0rem;
  text-align: justify;
}
</style>