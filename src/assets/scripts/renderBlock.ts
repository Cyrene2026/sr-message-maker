const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const createId = (value: Record<string, unknown>, index: number) => {
  const id = value.id
  if (typeof id === 'string') return id
  if (typeof id === 'number') return String(id)
  return `render-${index}`
}

const readText = (value: Record<string, unknown>) => {
  return typeof value.text === 'string' ? value.text : DEFAULT_TEXT
}

const normalizeMission = (value: unknown): Mission => {
  if (!isRecord(value)) return { type: 0, state: 0 }

  const type = typeof value.type === 'number' ? value.type : 0
  const state = typeof value.state === 'number' ? value.state : 0

  return {
    type: type >= 0 && type <= 4 ? (type as Mission['type']) : 0,
    state: state >= 0 && state <= 2 ? (state as Mission['state']) : 0
  }
}

const normalizeTextMode = (mode: unknown): TextContentMode => {
  if (mode === 'copyable' || mode === 'editable' || mode === 'input') return mode
  return 'text'
}

const normalizeTypedBlock = (
  value: Record<string, unknown>,
  index: number
): RenderBlock | undefined => {
  const id = createId(value, index)
  const text = readText(value)

  switch (value.type) {
    case 'bubble':
      return {
        id,
        type: 'bubble',
        text
      }
    case 'message':
      return {
        id,
        type: 'message',
        text,
        character: isRecord(value.character)
          ? {
              key: typeof value.character.key === 'string' ? value.character.key : '开拓者',
              name: typeof value.character.name === 'string' ? value.character.name : '',
              avatar: typeof value.character.avatar === 'string' ? value.character.avatar : ''
            }
          : undefined,
        img: typeof value.img === 'string' ? value.img : undefined,
        emoticon: typeof value.emoticon === 'string' ? value.emoticon : undefined,
        loading: typeof value.loading === 'boolean' ? value.loading : undefined
      }
    case 'mission':
      return {
        id,
        type: 'mission',
        text,
        mission: normalizeMission(value.mission)
      }
    case 'notice':
      return {
        id,
        type: 'notice',
        text,
        level:
          value.level === 'warn' || value.level === 'error' || value.level === 'success'
            ? value.level
            : 'info'
      }
    case 'option':
      return {
        id,
        type: 'option',
        text,
        selected: typeof value.selected === 'boolean' ? value.selected : undefined
      }
    case 'text':
      return {
        id,
        type: 'text',
        text,
        mode: normalizeTextMode(value.mode),
        placeholder: typeof value.placeholder === 'string' ? value.placeholder : undefined,
        variant: value.variant === 'bar' ? 'bar' : 'plain'
      }
    default:
      return undefined
  }
}

export const normalizeMessageToRenderBlock = (message: Message, index = 0): RenderBlock => {
  const id = `message-${index}`

  if (message.option) {
    return {
      id,
      type: 'option',
      text: message.text,
      selected: message.option[0]
    }
  }

  if (message.mission) {
    return {
      id,
      type: 'mission',
      text: message.text,
      mission: message.mission
    }
  }

  if (message.notice) {
    return {
      id,
      type: 'notice',
      text: message.text,
      level: 'info'
    }
  }

  return {
    id,
    type: 'message',
    text: message.text,
    character: {
      key: message.key,
      name: message.name,
      avatar: message.avatar
    },
    img: message.img,
    emoticon: message.emoticon,
    loading: message.loading
  }
}

export const normalizeRenderBlock = (value: unknown, index = 0): RenderBlock | undefined => {
  if (!isRecord(value)) return undefined

  if (typeof value.type === 'string') {
    return normalizeTypedBlock(value, index)
  }

  return normalizeMessageToRenderBlock(value as unknown as Message, index)
}

export const normalizeRenderBlocks = (value: unknown): RenderBlock[] => {
  if (!Array.isArray(value)) return []

  return value
    .map((item, index) => normalizeRenderBlock(item, index))
    .filter((item): item is RenderBlock => Boolean(item))
}
