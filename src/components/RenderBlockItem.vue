<template>
  <div
    class="render-block"
    :class="[`render-block_${block.type}`, `render-block_${block.type}_${blockLevel}`]"
  >
    <BubbleText
      v-if="block.type === 'bubble'"
      :text="block.text"
    />
    <ItemMessage
      v-else-if="block.type === 'message'"
      :item="messageItem"
      preview
    />
    <ItemMission
      v-else-if="block.type === 'mission'"
      :text="block.text"
      :mission="block.mission"
      preview
    />
    <ItemNotice
      v-else-if="block.type === 'notice'"
      :text="block.text"
      preview
    />
    <OptionText
      v-else-if="block.type === 'option'"
      :text="block.text"
      :highlight="block.selected"
      @click="emit('action', { type: 'select-option', id: block.id })"
    />
    <div
      v-else-if="block.type === 'text'"
      class="render-text"
      :class="[`render-text_${block.variant ?? 'plain'}`, `render-text_${block.mode ?? 'text'}`]"
    >
      <TextContent
        class="render-text-content"
        :model-value="block.text"
        :mode="block.mode ?? 'text'"
        :placeholder="block.placeholder"
        @update:model-value="emit('action', { type: 'update-text', id: block.id, text: $event })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TextContent from './Common/TextContent.vue'
import BubbleText from './Message/BubbleText.vue'
import ItemMessage from './Message/ItemMessage.vue'
import ItemMission from './Message/ItemMission.vue'
import ItemNotice from './Message/ItemNotice.vue'
import OptionText from './Message/OptionText.vue'

const props = defineProps<{
  block: RenderBlock
}>()

const emit = defineEmits<{
  (event: 'action', value: RenderAction): void
}>()

const blockLevel = computed(() => {
  if (props.block.type !== 'notice') return 'default'
  return props.block.level ?? 'info'
})

const messageItem = computed<Message>(() => {
  if (props.block.type !== 'message') {
    return {
      key: '开拓者',
      name: '',
      avatar: '',
      text: DEFAULT_TEXT
    }
  }

  return {
    key: props.block.character?.key ?? '开拓者',
    name: props.block.character?.name ?? '',
    avatar: props.block.character?.avatar ?? '',
    text: props.block.text,
    img: props.block.img,
    emoticon: props.block.emoticon,
    loading: props.block.loading
  }
})
</script>

<style scoped>
.render-block {
  width: 100%;
}
.render-block :deep(.message),
.render-block :deep(.mission),
.render-block :deep(.notice) {
  margin-right: 0;
  width: 100%;
}
.render-block :deep(.mission .bg) {
  width: 100% !important;
}
.render-text_bar {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 120px;
  background: var(--message-menu-background-color);
}
.render-text_bar .render-text-content {
  flex: 1;
  margin: 0 20px;
  padding: 0 50px;
  height: 90px;
  background: #e8e8e8;
  color: #121212;
  text-align: center;
  font-size: 48px;
  line-height: 90px;
}
.render-text_copyable .render-text-content {
  color: #555;
}
.render-block_notice_warn {
  --notice-color: #949595;
}
.render-block_notice_error {
  --notice-color: #9c3434;
}
.render-block_notice_success {
  --notice-color: #4f7a48;
}
</style>
