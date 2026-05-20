<template>
  <div class="bubble-text text-box">
    <TextContent
      class="bubble-text-content text"
      :model-value="text"
      :mode="contenteditable ? 'editable' : 'text'"
      @keydown="emit('keydown', $event)"
      @blur="emit('blur', $event)"
    >
      <slot>{{ text }}</slot>
    </TextContent>
    <Icon
      v-if="showIcon"
      contenteditable="false"
      class="bg-icon"
      name="train"
    />
  </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/Common/Icon.vue'
import TextContent from '@/components/Common/TextContent.vue'

withDefaults(
  defineProps<{
    text?: string
    contenteditable?: boolean
    showIcon?: boolean
  }>(),
  {
    text: '',
    contenteditable: false,
    showIcon: false
  }
)

const emit = defineEmits<{
  (event: 'keydown', value: KeyboardEvent): void
  (event: 'blur', value: FocusEvent): void
}>()
</script>

<style>
@import '../../assets/data/bubbles/style.css';

.bubble-text {
  position: relative;
  margin-bottom: 10px;
}
.bubble-text .bubble-text-content {
  display: block;
  margin-top: 15px;
  padding: 35px;
  min-width: 20px;
  min-height: 65px;
  width: fit-content;
  border-radius: 0 25px 25px 25px;
  background: #ebebeb;
  box-shadow: -2px 4px #9d9f9f;
  color: var(--text-color);
  word-break: break-word;
  font-size: 45px;
}
.bubble-text .bg-icon {
  position: absolute;
  bottom: 10px;
  left: 50%;
  z-index: 1;
  height: 100px;
  transform: translateX(-50%);
  pointer-events: none;
}
.bubble-text .bg-icon path {
  fill: rgba(100, 100, 100, 0.005);
}
</style>
