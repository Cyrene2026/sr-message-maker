<template>
  <div class="component-test">
    <div
      v-for="item in visibleItems"
      :key="item"
      class="test-item"
    >
      <button
        class="test-close"
        type="button"
        title="关闭"
        @click="close(item)"
      >
        ×
      </button>
      <BubbleText
        v-if="item === 'bubble'"
        text="你好"
      />
      <ItemMission
        v-else-if="item === 'mission'"
        text="愿此行，终抵群星"
        :mission="{ type: 0, state: 0 }"
        preview
      />
      <OptionText
        v-else-if="item === 'option'"
        text="愿此行，终抵群星"
      />
      <ItemNotice
        v-else-if="item === 'notice'"
        text="愿此行，终抵群星"
        preview
      />
      <div
        v-else-if="item === 'input'"
        class="test-input-row"
      >
        <TextContent
          class="test-input"
          model-value="愿此行，终抵群星"
          mode="text"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TextContent from './Common/TextContent.vue'
import BubbleText from './Message/BubbleText.vue'
import ItemMission from './Message/ItemMission.vue'
import ItemNotice from './Message/ItemNotice.vue'
import OptionText from './Message/OptionText.vue'

type TestItem = 'bubble' | 'mission' | 'option' | 'notice' | 'input'

const visibleItems = ref<TestItem[]>(['bubble', 'mission', 'option', 'notice', 'input'])

const close = (item: TestItem) => {
  visibleItems.value = visibleItems.value.filter((value) => value !== item)
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
.component-test :deep(.mission) {
  margin-right: 0;
  width: 100%;
}
.component-test :deep(.mission .bg) {
  width: 100% !important;
}
.component-test :deep(.notice) {
  margin-right: 0;
  width: 100%;
}
.test-input-row {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 120px;
  background: var(--message-menu-background-color);
}
.test-input {
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
</style>
