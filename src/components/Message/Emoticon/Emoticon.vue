<template>
  <transition name="emoticon">
    <div
      class="emoticon"
      v-show="emoticonData.show"
      @click.stop=""
    >
      <div class="title">{{ emoticon[emoticonPage]?.title }}</div>
      <transition
        name="fade-in"
        appear
      >
        <div
          class="emoticon-list"
          :key="emoticonPage"
          ref="listDom"
        >
          <div
            class="item"
            v-for="(item, key) in emoticon[emoticonPage]?.list"
            v-show="!item.error"
            :key="`emoticon-${key}`"
            @click="onEmoticonClick(emoticonPage, key)"
          >
            <div class="img">
              <img
                :src="item.url"
                :alt="item.title"
                @error="item.error = true"
              />
            </div>
            <div class="text">
              {{ item.title }}
            </div>
          </div>
        </div>
      </transition>
      <div
        class="group"
        @wheel.prevent.stop="onWheel"
        ref="groupDom"
      >
        <div
          class="group-item"
          v-for="(group, key) in emoticonGroup"
          :key="`group-${key}`"
          :class="{ highlight: key === emoticonPage }"
          @click="changePage(key)"
          v-show="group"
        >
          <div
            class="img"
            v-if="group"
          >
            <img
              :src="group.url"
              :alt="group.title"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { emoticon } from '@/assets/data/emoticon'
import { urlToBase64 } from '@/assets/scripts/loader'
import { emoticonData } from './'

const emits = defineEmits<{
  (event: 'emoticon', url: string, name: string): void
}>()

const listDom = ref<HTMLElement | null>(null)

const emoticonGroup = computed(() => {
  const list: (Emoticon | undefined)[] = []
  emoticon.forEach((group) => {
    list.push(group.list.find((item) => !item.error))
  })
  return list
})
const emoticonPage = ref(emoticonGroup.value.findIndex((item) => item))

const onEmoticonClick = async (index: number, key: number) => {
  if (emoticon[index].list[key].url.startsWith('http')) {
    try {
      emoticon[index].list[key].url = await urlToBase64(emoticon[index].list[key].url, true)
    } catch {}
  }
  emits(
    'emoticon',
    emoticon[index].list[key].url,
    emoticon[index]?.title === '布洛妮娅' ? '中年人' : emoticon[index].list[key].title
  )
}

const changePage = (page: number) => {
  emoticonPage.value = page
  nextTick(() => {
    if (listDom.value) {
      listDom.value.scrollTop = 0
    }
  })
}

const groupDom = ref<HTMLElement | null>(null)

const onWheel = (e: WheelEvent) => {
  if (groupDom.value) {
    groupDom.value.scrollLeft += e.deltaY
  }
}
</script>

<style scoped>
.emoticon {
  position: absolute;
  right: 0;
  bottom: 120px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 30px 40px 60px 50px;
  width: 1400px;
  height: 950px;
  border-radius: 5px;
  background: rgba(239, 239, 239, 0.97);
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.15);
  user-select: none;
  clip-path: polygon(
    -20px -20px,
    calc(100% + 20px) -20px,
    calc(100% + 20px) calc(100% - 30px),
    calc(100% - 195px) calc(100% - 30px),
    calc(100% - 220px) 100%,
    calc(100% - 245px) calc(100% - 30px),
    -20px calc(100% - 30px)
  );
}
.emoticon .title {
  margin-bottom: 15px;
  font-size: 48px;
}
.emoticon .emoticon-list {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;

  scrollbar-gutter: stable;
  mask-image:
    linear-gradient(to bottom, transparent, #000 20px, #000, #000 calc(100% - 50px), transparent),
    linear-gradient(to left, #000, transparent 10px);
  mask-size: 100% 100%;
  mask-position:
    0 0,
    100% 0;
  mask-repeat: no-repeat, no-repeat;
}
.emoticon .emoticon-list::-webkit-scrollbar-track {
  margin: 15px 0;
}
.emoticon .emoticon-list .item {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0 20px 30px 0;
  width: 261px;
  border: 5px solid #c5c5c5;
  background: #d9d9d9;
  cursor: pointer;
}
.emoticon .emoticon-list .item:nth-child(5n) {
  margin-right: 0;
}
.emoticon .emoticon-list .item .img {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 5px;
  width: 261px;
  height: 245px;
}
.emoticon .emoticon-list .item .img img {
  margin: 10px;
  width: calc(100% - 20px);
}
.emoticon .emoticon-list .text {
  overflow: hidden;
  padding: 5px;
  background: #ececec;
  color: #545454;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  font-size: 32px;
}
.emoticon .group {
  position: relative;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding-top: 20px;
  scrollbar-width: none;
}
.emoticon .group::-webkit-scrollbar {
  height: 0;
}
.emoticon .group .group-item {
  position: relative;
  z-index: 5;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  border-bottom: 8px solid #dadada;
  cursor: pointer;
}
.emoticon .group .group-item:hover .img {
  opacity: 1;
}
.emoticon .group .group-item .img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  opacity: 0.5;
}
.emoticon .group .group-item .img img {
  width: 75px;
}
.highlight .img {
  opacity: 1 !important;
}
.highlight:before {
  position: absolute;
  bottom: 50%;
  left: 50%;
  z-index: -1;
  width: 140px;
  height: 50px;
  background: #121212;
  content: '';
  opacity: 0.4;
  transform: translate(-50%, 50%);
  transform-origin: center;
  animation: open-1 0.9s forwards;
}
.highlight:after {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 7px;
  background: #121212;
  content: '';
  animation: open-2 0.6s forwards;
}
.emoticon-enter-active,
.emoticon-leave-active {
  transition: all 0.2s;
}
.emoticon-enter-from {
  opacity: 0;
  transform: translateY(20%);
}
.emoticon-leave-to {
  opacity: 0;
}
@keyframes open-1 {
  0% {
    transform: translate(-50%, 50%) scaleX(0);
  }
  50% {
    transform: translate(-50%, 50%) scaleX(1);
  }
  100% {
    opacity: 0;
  }
}
@keyframes open-2 {
  0% {
    background: #fdd073;
    transform: scaleX(0);
  }
  75% {
    background: #fdd073;
    transform: scaleX(1);
  }
  100% {
    background: #121212;
  }
}
</style>
