<template>
  <Popup :index="props.index">
    <Window
      title="消息管理"
      @close="close"
    >
      <div class="message-config">
        <table class="config-table">
          <tbody>
            <tr
              class="config-row"
              v-if="currentMessage?.list?.[data.key || -1]?.key !== '开拓者'"
            >
              <td class="config-label">修改昵称</td>
              <td class="config-control">
                <div
                  class="config-link"
                  @click.stop="handleChangeName"
                >
                  <span>点击修改</span>
                  <Icon
                    name="arrow"
                    class="icon"
                  />
                </div>
              </td>
            </tr>
            <tr class="config-row">
              <td class="config-label">等待时间</td>
              <td class="config-control">
                <div class="interval-control">
                  <Slider
                    class="interval-range"
                    :min="1"
                    :max="5"
                    :step="0.1"
                    v-model="data.interval"
                  />
                  <span class="interval-text">
                    {{ data.interval ? data.interval + '秒' : '默认' }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <template #footer>
        <Btn
          name="取消"
          type="wrong"
          @click="close"
        />
        <Btn
          name="确认"
          type="check"
          @click="onConfirml"
        />
      </template>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import { popupManager } from '@/assets/scripts/popup'
import Icon from '@/components/Common/Icon.vue'
import Slider from '@/components/Common/Slider.vue'
import { currentMessage } from '@/store/message'
import { Btn, Popup, Window } from 'star-rail-vue'
import { callback, data } from './data'

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

// 修改昵称
const handleChangeName = async () => {
  if (!currentMessage.value) return

  if (data.key !== undefined && currentMessage.value.list[data.key]) {
    if (currentMessage.value.list[data.key].key !== '开拓者') {
      const name = await popupManager.open('input', {
        title: '修改昵称',
        tip: '建议不要使用过长的昵称',
        required: false,
        defaultText: currentMessage.value.list[data.key].name,
        placeholder: currentMessage.value.list[data.key].name
      })
      if (name !== null) {
        currentMessage.value.list[data.key].name = name
      }
    }
  }
}

const onConfirml = () => {
  if (!currentMessage.value) return
  if (data.interval > 0 && data.key !== undefined && currentMessage.value.list[data.key]) {
    currentMessage.value.list[data.key].interval = data.interval * 1000
  }
  close()
}

callback.confirm = onConfirml
</script>

<style scoped>
.message-config {
  padding: 60px 0;
  width: 1600px;
  user-select: none;
}
.message-config .config-table {
  width: 100%;
  border-collapse: collapse;
}
.message-config .config-row {
  height: 120px;
  border: 1px solid #000;
}
.message-config .config-label,
.message-config .config-control {
  box-sizing: border-box;
  padding: 5px 40px;
}
.message-config .config-label {
  width: 60%;
  background: transparent;
}
.message-config .config-control {
  width: 40%;
  background: #e2e2e2;
}
.message-config .interval-control {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.message-config .interval-control .interval-range {
  flex: 0 0 70%;
  margin: 20px 0;
}
.message-config .interval-control .interval-text {
  flex: 0 0 20%;
  text-align: right;
}
.message-config .config-link {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.message-config .config-link .icon {
  position: absolute;
  right: 0;
}
.message-config .config-link_disabled {
  color: #808080;
  cursor: not-allowed;
}
.message-config .config-link_disabled .icon {
  display: none;
}
</style>
