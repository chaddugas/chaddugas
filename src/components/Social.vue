<template lang="pug">
a.social(v-bind="{href: props.social.url, target: '_blank'}")
  i(:class="`icon-${props.social.icon}`")
  span {{ props.social.title }}
</template>

<script setup lang="ts">

const props = defineProps<{
  social: Social;
}>();
</script>

<style lang="scss" scoped>
.social {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  text-decoration: none;
  color: $white;
  border: 1px solid rgba($white, 0.1);
  transition: 0.2s ease;
  background-clip: content-box;

  &:hover {
    background: $white;
    color: $black;
  }

  i {
    @include fluid(font-size, 3.25rem, 4.5rem);
  }
  span {
    @include fluid(font-size, 1.25rem, 1.75rem);
  }

  &:nth-child(n+3) {
    border-top: none;
  }
  &:nth-child(even) {
    border-left: none;
  }
}
</style>