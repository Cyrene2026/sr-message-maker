<template>
  <div class="component-test">
    <div
      v-for="block in blocks"
      :key="block.id"
      class="test-item"
    >
      <button
        class="test-close"
        type="button"
        title="关闭"
        @click="close(block.id)"
      >
        ×
      </button>
      <RenderBlockItem
        :block="block"
        @action="handleAction"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { normalizeRenderBlocks } from '@/assets/scripts/renderBlock'
import RenderBlockItem from './RenderBlockItem.vue'

const blocks = ref<RenderBlock[]>(
  normalizeRenderBlocks([
    {
      id: 'bubble',
      type: 'bubble',
      text: '你好'
    },
    {
      id: 'mission',
      type: 'mission',
      text: '愿此行，终抵群星',
      mission: { type: 0, state: 0 }
    },
    {
      id: 'option',
      type: 'option',
      text: '愿此行，终抵群星'
    },
    {
      id: 'notice',
      type: 'notice',
      text: '愿此行，终抵群星',
      level: 'warn'
    },
    {
      id: 'input-text',
      type: 'text',
      text: '愿此行，终抵群星',
      mode: 'text',
      variant: 'bar'
    },
    {
      id: 'copyable-text',
      type: 'text',
      text: '这段文本可以选中复制，但不能编辑',
      mode: 'copyable',
      variant: 'bar'
    }
  ])
)

const close = (id: string) => {
  blocks.value = blocks.value.filter((block) => block.id !== id)
}

const handleAction = (action: RenderAction) => {
  if (action.type === 'close' || action.type === 'delete') {
    close(action.id)
  }
}
</script>

<style scoped>
.component-test {
  position: absolute;
  top: 220px;
  right: 120px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px;
  width: 1350px;
  max-height: 80%;
  background: rgba(216, 216, 216, 0.92);
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
  gap: 35px;
  overflow-y: auto;
}
.test-item {
  position: relative;
  box-sizing: border-box;
  min-height: 130px;
}
.test-close {
  position: absolute;
  top: -18px;
  right: -18px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background: #ece9ec;
  color: #333;
  cursor: pointer;
  font-size: 36px;
  line-height: 1;
}
.test-close:hover {
  background: #ddd;
}
</style>
