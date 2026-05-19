<template>
  <div class="preview">
    <div class="circle">
      <div class="circle-1"></div>
      <div class="circle-2"></div>
      <div class="circle-3"></div>
      <div class="circle-4"></div>
      <div class="circle-5"></div>
      <div class="circle-6"></div>
      <div class="point-1"></div>
      <div class="point-2"></div>
      <div class="point-3"></div>
      <div class="line"></div>
      <slot></slot>
      <img
        v-if="!$slots.default && img"
        @click.stop="onClick ? emit('click') : undefined"
        :style="{ cursor: onClick ? 'pointer' : undefined }"
        :class="{ img_circle: circle }"
        :title="title"
        :src="img"
        alt=""
      />
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    name: string
    img?: string
    width?: string
    circle?: boolean
    color?: string
    bgColor?: string
    fontSize?: string
    onClick?: () => void
    title?: string
  }>(),
  {
    width: '300px',
    color: '#6a6a6a',
    bgColor: 'linear-gradient(#d5d5d5 10%, #b8b8b8)',
    fontSize: '35px'
  }
)

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 60px 0 150px;
  width: v-bind(width);
  height: 100%;
  user-select: none;
}
.preview .circle {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(width);
  height: v-bind(width);
  border-radius: 50%;
  background: v-bind(bgColor);
}
.preview .circle img {
  width: 80%;
}
.preview .circle .circle-1,
.preview .circle .circle-2,
.preview .circle .circle-3 {
  position: absolute;
  bottom: -5px;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%);
}
.preview .circle .circle-1 {
  width: 117%;
  height: 117%;
  border: 3px solid #b9babf;
}
.preview .circle .circle-2 {
  width: 109%;
  height: 109%;
  border: 2px dotted #b9babf;
}
.preview .circle .circle-3 {
  width: 165%;
  height: 165%;
  border: 2px solid #b9babf;
  opacity: 0.5;
}
.preview .circle .circle-4,
.preview .circle .circle-5,
.preview .circle .circle-6 {
  position: absolute;
  top: -50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.preview .circle .circle-4 {
  width: 100%;
  height: 100%;
  border: 2px dotted #b9babf;
  opacity: 0.3;
}
.preview .circle .circle-5 {
  width: 81%;
  height: 81%;
  border: 2px solid #b9babf;
  opacity: 0.4;
}
.preview .circle .circle-6 {
  width: 65%;
  height: 65%;
  border: 2px solid #b9babf;
  opacity: 0.4;
}
.preview .circle .point-1,
.preview .circle .point-2,
.preview .circle .point-3 {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #b9babf;
  opacity: 0.3;
  transform: translate(-50%, -50%);
}
.preview .circle .point-1 {
  top: -17%;
  left: 50%;
}
.preview .circle .point-2 {
  top: -40%;
  left: 50%;
}
.preview .circle .point-3 {
  top: -15%;
  right: -30%;
}
.preview .circle .line {
  position: absolute;
  top: -50%;
  left: 50%;
  width: 2px;
  height: 100%;
  background: #b9babf;
  opacity: 0.3;
  transform: translate(-50%, -50%);
}
.preview .circle .name {
  position: absolute;
  bottom: -65px;
  overflow: hidden;
  max-width: 600px;
  color: v-bind(color);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  font-size: v-bind(fontSize);
}
.img_circle {
  border-radius: 50%;
  clip-path: var(--avatar-image-clip-path-bilibiliwiki-only);
}
</style>
