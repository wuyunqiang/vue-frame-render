<template>
    <slot v-if="nextFrame"></slot>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useFrameRender } from "./useFrameRender.js";
export default defineComponent({
  name: "vue-frame-render",
  props: {
    frame: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { nextFrame } = useFrameRender(props.frame);
    return {
      nextFrame,
    };
  },
});
</script>
<style lang="less"></style>
