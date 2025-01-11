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
  renderInterval: number | undefined;
}

export default defineComponent({
  name: "EngineWithControls",
  data(): DataType {
    return {
      isControlsCollapsed: false,
      renderInterval: undefined,
    };
  },
  mounted() {
    const canvas = this.$refs.renderingCanvas as HTMLCanvasElement;
    // Fill with black
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2d context");
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.renderInterval = setInterval(this.rerender, 1000 / 60);
  },
  beforeUnmount() {
    clearInterval(this.renderInterval);
  },
  methods: {
    rerender() {
      // render the scene
    },
  },
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
