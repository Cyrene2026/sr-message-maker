<template>
  <Transition
    :name="!state.drag ? 'fade-in' : undefined"
    appear
  >
    <div class="option">
      <IconAction
        class="change"
        :name="highlight ? 'fail' : 'success'"
        icon-width="50"
        icon-height="50"
        @click="emit('select')"
      />
      <OptionText
        editable
        :text="text"
        :highlight="highlight"
        @update="emit('update', $event)"
        @blur="updateText(($event.target as HTMLInputElement).value)"
        @keydown="onKeydown"
      />
      <IconAction
        class="del"
        name="delete"
        @click="emit('delete')"
      />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { state } from '@/store/setting'
import IconAction from '../Common/IconAction.vue'
import { onKeydown } from './Message'
import OptionText from './OptionText.vue'

defineProps<{
  text: string
  highlight?: boolean
}>()

const emit = defineEmits<{
  (event: 'select'): void
  (event: 'update', text: string): void
  (event: 'delete'): void
}>()

const updateText = (text: string) => {
  if (text.length < 1) emit('update', DEFAULT_TEXT)
}
</script>

<style scoped>
.option {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  position: relative;
  margin-right: 50px;
  width: calc(100% - 50px);
}
.option .change,
.option .del {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  --icon-action-color: var(--message-item-name-color);
}
.option .change {
  left: 20px;
}
.option .del {
  right: 20px;
}
.option :deep(.option-text) {
  width: calc(100% - var(--message-item-avatar-width) * 2 - 100px);
}
</style>
