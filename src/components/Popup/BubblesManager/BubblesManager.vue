<template>
  <Popup :index="props.index">
    <Window title="更换对话框">
      <div class="select">
        <div
          class="item"
          v-for="(item, key) in bubbles"
          :key="key"
          :class="{ highlight: index === key }"
          @click="index = key"
        >
          <div :class="`bubbles-${key}`">
            <div class="text-box">
              <div class="text">你好</div>
            </div>
          </div>
        </div>
      </div>
      <template #outside>
        <div class="other-setting">
          <div
            class="setting-btn"
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
            class="setting-btn"
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
            class="setting-btn"
            title="数据管理"
            @click.stop="popupManager.open('data')"
          >
            <Icon name="data" />
          </div>
          <div
            class="setting-btn"
            title="其它设置"
            @click.stop="popupManager.open('setting')"
          >
            <Icon name="gear" />
          </div>
        </div>
      </template>
      <template #left>
        <ItemPreview :name="name">
          <div class="preview-text-box">
            <div :class="`bubbles-${index}`">
              <div class="text-box">
                <div class="text">
                  <span>———</span>
                  <span>——</span>
                </div>
              </div>
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
@import '../../../assets/styles/bubbles.css';

.text-box {
  position: relative;
  margin-bottom: 10px;
}
.text-box .text {
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
.preview-text-box .text-box {
  transform: scale(0.9);
}
.preview-text-box .text-box .text {
  display: flex !important;
  flex-direction: column;
}
.preview-text-box .text-box .text span {
  overflow: hidden;
  max-width: 125px;
  word-break: break-all;
  font-weight: bold;
  line-height: 40px;
}
.preview-text-box .bubbles-0 .text {
  padding: 25px 40px !important;
}
.preview-text-box .bubbles-1 .text,
.preview-text-box .bubbles-2 .text {
  padding: 0px !important;
}
.preview-text-box .bubbles-3 {
  margin-left: 15px;
}
.preview-text-box .bubbles-3 .text {
  padding: 15px 5px !important;
}
.other-setting .setting-btn {
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
.other-setting .setting-btn :deep(path) {
  fill: #767479;
}
.other-setting .setting-btn:hover {
  background: #fff;
}
.select {
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
.select .item {
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
.select .item:hover {
  background: #d7d7d7;
}
.select .item .text-box {
  transform: scale(0.8);
}
.select .item .bubbles-0 .text {
  padding: 25px 50px !important;
}
.select .item .bubbles-1 .text,
.select .item .bubbles-2 .text {
  padding: 1px 8px !important;
}
.select .item .bubbles-3 .text {
  padding: 10px !important;
}
.highlight {
  border: 4px solid #14120d !important;
  cursor: auto !important;
}
.highlight:after {
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
.highlight:hover {
  background: #c5c6ca !important;
}
</style>
