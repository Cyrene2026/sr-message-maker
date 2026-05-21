<template>
  <button
    class="icon-action"
    type="button"
    @click="emit('click', $event)"
  >
    <Icon
      :name="name"
      :width="iconWidth"
      :height="iconHeight"
    />
  </button>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue'

withDefaults(
  defineProps<{
    name: string
    iconWidth?: string
    iconHeight?: string
  }>(),
  {
    iconWidth: '35',
    iconHeight: '35'
  }
)

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()
</script>

<style scoped>
.icon-action {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 60px;
  height: 60px;
  border: none;
  background: transparent;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s;
  user-select: none;
}
.icon-action :deep(path) {
  fill: var(--icon-action-color, currentColor);
}
.icon-action:hover {
  opacity: 1;
}
</style>
