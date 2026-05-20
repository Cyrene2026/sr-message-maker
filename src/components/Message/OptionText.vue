<template>
  <TextContent
    class="option-text"
    :class="{ 'option-text_highlight': highlight }"
    :model-value="text"
    :mode="editable ? 'input' : 'text'"
    @update:model-value="emit('update', $event)"
    @blur="emit('blur', $event)"
    @keydown="emit('keydown', $event)"
  >
    <slot>{{ text }}</slot>
  </TextContent>
</template>

<script lang="ts" setup>
import TextContent from '@/components/Common/TextContent.vue'

withDefaults(
  defineProps<{
    text?: string
    highlight?: boolean
    editable?: boolean
  }>(),
  {
    text: '',
    highlight: false,
    editable: false
  }
)

const emit = defineEmits<{
  (event: 'update', value: string): void
  (event: 'blur', value: FocusEvent): void
  (event: 'keydown', value: KeyboardEvent): void
}>()
</script>

<style scoped>
.option-text {
  overflow: hidden;
  box-sizing: border-box;
  padding: 5px 30px;
  width: 100%;
  height: 90px;
  border: 2px solid var(--border-hover-color);
  background: var(--option-background-color);
  box-shadow: 2px 2px 10px var(--border-hover-color);
  color: var(--text-color);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  font-size: 40px;
}
.option-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.option-text_highlight {
  background: var(--option-background-hover-color);
}
</style>
