<template>
  <Popup :index="props.index">
    <Window
      title="数据管理"
      @close="close"
    >
      <div class="data-manager">
        <div class="data-section">
          <div class="data-row">
            <span class="data-label">短信数</span>
            <span class="data-value">{{ message.list.length }}</span>
          </div>
          <div class="data-row">
            <span class="data-label">消息数</span>
            <span class="data-value">{{ messageNum }}</span>
          </div>
          <div class="data-row">
            <span class="data-label">数据大小</span>
            <span class="data-value">{{ messageUsage }}</span>
          </div>
          <div class="action-list">
            <div
              class="action-btn"
              :class="{ action_disabled: !hasMessage }"
              @click="deleteMessage"
            >
              <span>清空</span>
            </div>
            <div
              class="action-btn"
              :class="{ action_disabled: !hasMessage }"
              @click="downloadMessage"
            >
              <span>导出</span>
            </div>
            <div
              class="action-btn"
              @click="uploadMessage"
            >
              <span>导入</span>
            </div>
          </div>
        </div>
        <div class="data-section">
          <div class="data-row">
            <span class="data-label">自定义角色</span>
            <span class="data-value">{{ Object.keys(character.custom).length }}</span>
          </div>
          <div class="data-row">
            <span class="data-label">数据大小</span>
            <span class="data-value">{{ characterUsage }}</span>
          </div>
          <div class="action-list">
            <div
              class="action-btn"
              :class="{ action_disabled: !hasCharacter }"
              @click="deleteCharacter"
            >
              <span>清空</span>
            </div>
            <div
              class="action-btn"
              :class="{ action_disabled: !hasCharacter }"
              @click="downloadCharacter"
            >
              <span>导出</span>
            </div>
            <div
              class="action-btn"
              @click="uploadCharacter"
            >
              <span>导入</span>
            </div>
          </div>
        </div>
        <div class="data-section">
          <div class="data-row">
            <span class="data-label">自定义头像</span>
            <span class="data-value">{{ avatar.custom.length }}</span>
          </div>
          <div class="data-row">
            <span class="data-label">数据大小</span>
            <span class="data-value">{{ customAvatarUsage }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <Btn
          class="reset-btn"
          name="重置数据库"
          @click="reserDatabase"
        />
      </template>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import { exportFile, inputFile } from '@/assets/scripts/file'
import { popupManager } from '@/assets/scripts/popup'
import { avatar } from '@/store/avatar'
import { character } from '@/store/character'
import { message } from '@/store/message'
import { KEY } from '@/store/setting'
import { Btn, countStrToSize, Popup, Window } from 'star-rail-vue'

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

const messageUsage = computed(() => countStrToSize(JSON.stringify(message.list)))
const messageNum = computed(() => message.list.reduce((i, j) => j.list.length + i, 0))
const characterUsage = computed(() => countStrToSize(JSON.stringify(character.custom)))
const customAvatarUsage = computed(() => countStrToSize(JSON.stringify(avatar.custom)))

const hasMessage = computed(() => message.list.length > 0)

const deleteMessage = () => {
  if (!hasMessage.value) return

  popupManager.open('confirm', {
    title: '清空短信',
    text: ['确定删除所有短信吗？'],
    fn: async () => {
      message.list.length = 0
      await nextTick()
      popupManager.open('confirm', {
        title: '短信已清空',
        text: ['已删除所有短信']
      })
    }
  })
}

const downloadMessage = () => {
  if (!hasMessage.value) return
  exportFile(toRaw(message.list), KEY.MESSAGE_FILE_ACCEPT)
}

const uploadMessage = async () => {
  await inputFile(`.png,${KEY.MESSAGE_FILE_ACCEPT}`)
}

const hasCharacter = computed(() => Object.keys(character.custom).length > 0)

const deleteCharacter = () => {
  if (!hasCharacter.value) return

  popupManager.open('confirm', {
    title: '清空自定义角色',
    text: ['确定删除所有自定义角色吗？'],
    fn: async () => {
      Object.keys(character.custom).forEach((key) => {
        delete character.custom[key]
      })
      await nextTick()
      popupManager.open('confirm', {
        title: '自定义角色已清空',
        text: ['已删除所有自定义角色']
      })
    }
  })
}

const downloadCharacter = () => {
  if (!hasCharacter.value) return

  exportFile(toRaw(character.custom), KEY.CHARACTER_FILE_ACCEPT)
}

const uploadCharacter = async () => {
  await inputFile(KEY.CHARACTER_FILE_ACCEPT)
}

const reserDatabase = () => {
  popupManager.open('confirm', {
    title: '重置数据库',
    tip: '该操作会清除所有短信/头像/自定义角色',
    text: ['确定重置数据库吗？'],
    fn: () => {
      popupManager.open('loading')
      const request = indexedDB.deleteDatabase(KEY.DATABASE_NAME)
      request.onblocked = () => {
        location.reload()
      }
      request.onsuccess = () => {
        location.reload()
      }
    }
  })
}
</script>

<style scoped>
.data-manager {
  display: flex;
  flex-direction: column;
  margin: 40px 0 60px;
  width: 1000px;
  gap: 30px;
}
.data-manager .data-section {
  box-sizing: border-box;
  border: 4px solid rgba(0, 0, 0, 0.2);
}
.data-manager .data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  font-size: 36px;
}
.data-manager .data-row:last-child {
  border-bottom: none;
}
.data-manager .data-label {
  display: flex;
  flex: 0 0 33.33%;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-right: 2px solid rgba(0, 0, 0, 0.2);
}
.data-manager .data-value {
  flex: 1;
  padding: 0 50px;
  color: #333;
  text-align: center;
}
.data-manager .action-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  border: 2px solid rgba(0, 0, 0, 0);
}
.data-manager .action-list .action-btn {
  display: flex;
  flex: 0 0 calc(33.33% + 1px);
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  border-right: 2px solid rgba(0, 0, 0, 0.2);
  color: #333;
  user-select: none;
}
.data-manager .action-list .action-btn:last-child {
  border-right: none;
}
.data-manager .action-list .action-btn:hover {
  background: #ddd;
}
.reset-btn {
  width: 100%;
}
.action_disabled {
  color: rgba(0, 0, 0, 0.2) !important;
  pointer-events: none;
}
</style>
