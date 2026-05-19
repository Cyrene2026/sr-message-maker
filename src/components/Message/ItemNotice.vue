<template>
  <Transition
    :name="!state.drag ? 'fade-in' : undefined"
    appear
  >
    <div class="notice">
      <Icon name="warn" />
      <span
        :contenteditable="!preview"
        @keydow="preview ? undefined : onKeydown($event)"
        @blur="preview ? undefined : updateMessage($event)"
      >
        {{ text }}
      </span>
      <div v-if="!preview">
        <div
          @click="emit('delete')"
          class="del"
        >
          <Icon
            name="delete"
            width="30"
            height="30"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { state } from '@/store/setting'
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
.notice span {
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  opacity: 0;
  cursor: pointer;
}
.notice div .del :deep(path) {
  fill: var(--notice-color);
}
.notice div .del:hover {
  opacity: 1;
}
</style>
