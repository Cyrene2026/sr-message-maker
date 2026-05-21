<template>
  <Transition
    :name="!state.drag ? 'fade-in' : undefined"
    appear
  >
    <div class="notice">
      <Icon name="warn" />
      <TextContent
        class="notice-text"
        :model-value="text"
        :mode="preview ? 'text' : 'editable'"
        @keydown="preview ? undefined : onKeydown($event)"
        @blur="preview ? undefined : updateMessage($event)"
      />
      <div v-if="!preview">
        <IconAction
          class="del"
          name="delete"
          icon-width="30"
          icon-height="30"
          @click="emit('delete')"
        />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { state } from '@/store/setting'
import IconAction from '../Common/IconAction.vue'
import TextContent from '../Common/TextContent.vue'
import Icon from '../Common/Icon.vue'
import { onKeydown } from './Message'

defineProps<{
  text: string
  preview?: boolean
}>()

const emit = defineEmits<{
  (event: 'update', text: string): void
  (event: 'delete'): void
}>()

const updateMessage = (e: Event) => {
  if (e.target) {
    let text = (e.target as HTMLElement).innerText
    if (text.length < 1) {
      text = DEFAULT_TEXT
      ;(e.target as HTMLElement).innerText = DEFAULT_TEXT
    }
    emit('update', text)
  }
}
</script>

<style scoped>
.notice {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 50px;
  width: calc(100% - 50px);
  padding: 40px 0;
  height: 60px;
  color: var(--notice-color);
  font-size: 30px;
}
.notice img {
  user-select: none;
}
.notice .notice-text {
  overflow: hidden;
  margin-left: 20px;
  max-width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.notice div {
  position: relative;
  height: 100%;
}
.notice div .del {
  position: absolute;
  right: -100px;
  --icon-action-color: var(--notice-color);
}
</style>
