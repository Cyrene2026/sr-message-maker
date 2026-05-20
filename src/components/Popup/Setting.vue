<template>
  <Popup :index="props.index">
    <Window
      title="其它设置"
      @close="close"
    >
      <div class="setting-list">
        <SettingRow
          label="截图保存"
          :value="setting.download ? '下载图片' : '新窗口打开'"
          icon="change"
          title="切换截图的保存模式"
          @click="setting.download = !setting.download"
        />
        <SettingRow
          label="预览背景"
          :value="setting.green ? '绿幕' : '模糊'"
          icon="change"
          title="切换预览背景"
          @click="setting.green = !setting.green"
        />
        <SettingRow
          label="截图质量"
          :value="setting.quality === 1 ? '高(1600px)' : '低(900px)'"
          icon="change"
          title="切换截图的图片质量"
          @click="qualityChange"
        />
        <SettingRow
          label="最后更新"
          :value="lastUpdate"
          title="查看更新日志"
          @click="popupManager.open('log')"
        />
      </div>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import { popupManager } from '@/assets/scripts/popup'
import { setting } from '@/store/setting'
import { Popup, Window } from 'star-rail-vue'
import SettingRow from '../Common/SettingRow.vue'

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

const qualityChange = () => {
  if (setting.quality === 1) {
    setting.quality = 0.5
  } else {
    setting.quality = 1
  }
}

const lastUpdate = new Date(BUILD_TIME).toLocaleString() || '-'
</script>

<style scoped>
.setting-list {
  margin: 40px 0;
  width: 1000px;
  user-select: none;
}
</style>
