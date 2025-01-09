<template>
  <div class="engineWithControls">
    <div class="controls">
      <button @click="isControlsCollapsed = !isControlsCollapsed">
        {{ isControlsCollapsed ? "Show" : "Hide" }} Controls
      </button>
      <div v-if="!isControlsCollapsed" class="controls-inner-panel"></div>
    </div>
    <canvas ref="renderingCanvas" class="renderingCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface DataType {
  isControlsCollapsed: boolean;
}

export default defineComponent({
  name: "EngineWithControls",
  data(): DataType {
    return {
      isControlsCollapsed: false,
    };
  },
  methods: {},
});
</script>

<style lang="scss">
.controls {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
.renderingCanvas {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
