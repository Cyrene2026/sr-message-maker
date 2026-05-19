<template>
  <div
    class="character"
    :class="{ 'custom-character': custom, sender }"
    :title="name"
  >
    <div
      class="card"
      :class="{ 'gold-border': level === 5 }"
    >
      <div class="avatar">
        <img
          :src="avatar || defaultAvatar"
          :alt="name"
          draggable="false"
        />
      </div>
      <div class="name">{{ name }}</div>
    </div>
    <div
      class="info"
      :title="info"
    >
      {{ info || '' }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import defaultAvatar from '@/assets/images/avatar/私聊.webp'

defineProps<{
  sender?: boolean
  custom?: boolean
  name: string
  info?: string
  avatar: string
  level?: 5
}>()
</script>

<style scoped>
.gold-border {
  border-bottom: 15px solid #ffd070 !important;
  background: linear-gradient(to bottom, #373737, #7b715b) !important;
}
.custom-character:hover .card:after {
  bottom: -15px !important;
}
.custom-character .card {
  margin-bottom: 2px;
  height: 635px !important;
  border-bottom: 14px solid #c3c3c3;
  background: linear-gradient(to bottom, #373737, #615a6d);
}
.custom-character .card .avatar {
  overflow: hidden;
  margin: auto;
  padding-top: 65px;
  width: 340px;
  height: 340px;
}
.custom-character .card .avatar img {
  width: 100% !important;
  height: 100% !important;
  border-radius: 50%;
  background: var(--avatar-background);
  pointer-events: none;
  user-select: none;
  object-fit: contain;
  clip-path: var(--avatar-image-clip-path-bilibiliwiki-only);
}
.custom-character .name {
  bottom: 65px !important;
}
.character {
  position: relative;
  margin: 10px 12px;
  width: 387px;
  height: 700px;
  cursor: pointer;
}
.character .card {
  border-top-right-radius: 50px;
  transition: 0.2s;
}
.character:hover .card {
  position: relative;
  filter: brightness(1.1);
}
.character:hover .card:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 5px solid rgba(255, 255, 255, 0.7);
  border-top-right-radius: 50px;
  content: '';
  pointer-events: none;
}
.character .card {
  position: relative;
  height: 650px;
}
.character .card .avatar img {
  width: 100%;
  height: 650px;
  pointer-events: none;
  user-select: none;
}
.character .name,
.character .info {
  overflow: hidden;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.character .name {
  position: absolute;
  bottom: 80px;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  font-weight: bold;
  font-size: 40px;
}
.character .info {
  margin-bottom: 10px;
  color: var(--info-color);
  text-align: center;
  font-size: 30px;
}
.sender {
  border-top-right-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
}
.sender .info {
  color: #ddd;
}
</style>
