<template>
  <div
    class="setting-row"
    @click="emit('click', $event)"
  >
    <div class="setting-row-text">
      <span class="setting-row-label">{{ label }}</span>
      <span class="setting-row-value">{{ value }}</span>
    </div>
    <Icon
      v-if="icon"
      :name="icon"
      class="setting-row-icon"
    />
  </div>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue'

defineProps<{
  label: string
  value: string
  icon?: string
}>()

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()
</script>

<style scoped>
.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: 36px;
}
.setting-row:hover {
  background: #ddd;
}
.setting-row:hover .setting-row-icon {
  color: #333;
}
.setting-row-text {
  display: flex;
  align-items: center;
  height: 100px;
}
.setting-row-label {
  display: flex;
  align-items: center;
  padding: 0 40px;
  width: 150px;
  height: 100%;
  border-right: 2px solid rgba(0, 0, 0, 0.2);
}
.setting-row-value {
  margin: 0 40px;
  color: #333;
}
.setting-row-icon {
  margin-right: 40px;
  color: #aaa;
}
</style>
