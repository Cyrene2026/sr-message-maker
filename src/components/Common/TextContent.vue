<template>
  <input
    v-if="mode === 'input'"
    ref="inputRef"
    class="text-content"
    :value="modelValue"
    :placeholder="placeholder"
    @input="handleInput"
    @keydown="emit('keydown', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
  <div
    v-else
    ref="textRef"
    class="text-content"
    :contenteditable="mode === 'editable'"
    @input="handleTextInput"
    @keydown="emit('keydown', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <slot>{{ modelValue }}</slot>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue?: string
    mode?: 'text' | 'editable' | 'input'
    placeholder?: string
  }>(),
  {
    modelValue: '',
    mode: 'text',
    placeholder: ''
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'keydown', value: KeyboardEvent): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const handleTextInput = (event: Event) => {
  if (props.mode !== 'editable') return

  emit('update:modelValue', (event.target as HTMLElement).innerText)
}

const focus = () => {
  inputRef.value?.focus()
  textRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
  textRef.value?.blur()
}

defineExpose({ focus, blur })
</script>

<style scoped>
.text-content {
  outline: none;
  font: inherit;
}
</style>
