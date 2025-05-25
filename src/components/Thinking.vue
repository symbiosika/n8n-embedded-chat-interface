<template>
  <div class="thinking-chip-wrapper">
    <span class="thinking-chip">
      <span class="chip-text">Thinking</span>
    </span>
  </div>
</template>

<script setup lang="ts">
// Keine Props mehr nötig
</script>

<style scoped>
.thinking-chip-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.thinking-chip {
  position: relative;
  display: inline-block;
  padding: 0.3em 0.8em;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(80, 0, 80, 0.08);
  overflow: hidden;
  font-weight: 500;
  font-size: 0.85em;
  min-width: 70px;
}

.chip-text {
  position: relative;
  letter-spacing: 0.04em;
  background: linear-gradient(90deg, 
    #a7476f 0%, 
    #6a5cff 25%, 
    #a7476f 50%, 
    #6a5cff 75%, 
    #a7476f 100%);
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-gradient-slide 2s ease-in-out infinite;
}

@keyframes text-gradient-slide {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
