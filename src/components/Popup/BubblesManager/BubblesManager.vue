<template>
  <Popup :index="props.index">
    <Window title="更换对话框">
      <div class="bubble-list">
        <div
          class="bubble-option"
          v-for="(item, key) in bubbles"
          :key="key"
          :class="{ 'bubble-option_active': index === key }"
          @click="index = key"
        >
          <div :class="`bubbles-${key}`">
            <BubbleText text="你好" />
          </div>
        </div>
      </div>
      <template #outside>
        <div class="manager-actions">
          <div
            class="manager-action-btn"
            title="更新记录"
            @click.stop="popupManager.open('log')"
          >
            <Icon
              name="log"
              width="50"
              height="50"
            />
          </div>
          <div
            class="manager-action-btn"
            title="字体设置"
            @click.stop="popupManager.open('font')"
          >
            <Icon
              name="font"
              width="60"
              height="60"
            />
          </div>
          <div
            class="manager-action-btn"
            title="数据管理"
            @click.stop="popupManager.open('data')"
          >
            <Icon name="data" />
          </div>
          <div
            class="manager-action-btn"
            title="其它设置"
            @click.stop="popupManager.open('setting')"
          >
            <Icon name="gear" />
          </div>
        </div>
      </template>
      <template #left>
        <ItemPreview :name="name">
          <div class="bubble-preview">
            <div :class="`bubbles-${index}`">
              <BubbleText>
                <template #default>
                  <span>———</span>
                  <span>——</span>
                </template>
              </BubbleText>
            </div>
          </div>
        </ItemPreview>
      </template>
      <template #footer>
        <Btn
          name="取消"
          type="wrong"
          @click="close"
        />
        <Btn
          name="确认"
          type="check"
          :disable="index === setting.bubbles"
          @click="onBtnClick"
        />
      </template>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import { bubbles } from '@/assets/data/bubbles'
import { popupManager } from '@/assets/scripts/popup'
import Icon from '@/components/Common/Icon.vue'
import ItemPreview from '@/components/Common/ItemPreview.vue'
import BubbleText from '@/components/Message/BubbleText.vue'
import { setting } from '@/store/setting'
import { Btn, Popup, Window } from 'star-rail-vue'
import { callback } from './data'

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

const index = ref(0)

const nameList = ['次元扑满', '扑满', '泡泡', '毛球', '白色恶魔', '肥大', '扑满侠', '扑神']
const name = computed(() => {
  if (index.value === 2) {
    return nameList[Math.floor(Math.random() * nameList.length)]
  } else {
    return bubbles[index.value].name
  }
})

watch(
  () => props.index,
  () => {
    if (props.index !== -1) {
      index.value = setting.bubbles
    }
  }
)

const onBtnClick = () => {
  if (setting.bubbles === index.value) return false
  close()
  setting.bubbles = index.value
  return true
}

callback.confirm = onBtnClick
</script>

<style scoped>
.bubble-preview :deep(.text-box) {
  transform: scale(0.9);
}
.bubble-preview :deep(.text-box .text) {
  display: flex;
  flex-direction: column;
}
.bubble-preview :deep(.text-box .text span) {
  overflow: hidden;
  max-width: 125px;
  word-break: break-all;
  font-weight: bold;
  line-height: 40px;
}
.bubble-preview :deep(.bubbles-0 .text) {
  padding: 25px 40px;
}
.bubble-preview :deep(.bubbles-1 .text),
.bubble-preview :deep(.bubbles-2 .text) {
  padding: 0;
}
.bubble-preview .bubbles-3 {
  margin-left: 15px;
}
.bubble-preview :deep(.bubbles-3 .text) {
  padding: 15px 5px;
}
.manager-actions .manager-action-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 30px;
  width: 90px;
  height: 90px;
  border: 5px solid #767479;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
.manager-actions .manager-action-btn :deep(path) {
  fill: #767479;
}
.manager-actions .manager-action-btn:hover {
  background: #fff;
}
.bubble-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow-x: hidden;
  margin-bottom: 30px;
  padding-right: 10px;
  width: 1200px;
  height: 450px;
  user-select: none;
}
.bubble-list .bubble-option {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  margin: 30px 10px 0 0;
  width: 385px;
  height: 200px;
  border: 4px solid #a7a8aa;
  background: #c5c6ca;
  cursor: pointer;
}
.bubble-list .bubble-option:hover {
  background: #d7d7d7;
}
.bubble-list .bubble-option :deep(.text-box) {
  transform: scale(0.8);
}
.bubble-list .bubble-option :deep(.bubbles-0 .text) {
  padding: 25px 50px;
}
.bubble-list .bubble-option :deep(.bubbles-1 .text),
.bubble-list .bubble-option :deep(.bubbles-2 .text) {
  padding: 1px 8px;
}
.bubble-list .bubble-option :deep(.bubbles-3 .text) {
  padding: 10px;
}
.bubble-list .bubble-option_active {
  border: 4px solid #14120d;
  cursor: auto;
}
.bubble-list .bubble-option_active:after {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  background: #e7c57e;
  content: '使用中';
  font-size: 28px;
}
.bubble-list .bubble-option_active:hover {
  background: #c5c6ca;
}
</style>
