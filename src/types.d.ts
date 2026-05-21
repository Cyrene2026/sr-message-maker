type Message<T extends keyof MessageType | undefined = undefined> = T extends undefined
  ? BaseItem &
      Partial<OptionItem> &
      Partial<MissionItem> &
      Partial<NoticeItem> &
      Partial<MessageItem>
  : BaseItem & MessageType[T]

interface MessageType {
  option: OptionItem
  mission: MissionItem
  notice: NoticeItem
  message: MessageItem
}

interface BaseItem {
  key: string
  name: string
  avatar: string
  text: string
}

interface OptionItem {
  option: [boolean]
}

interface Mission {
  type: 0 | 1 | 2 | 3 | 4
  state: 0 | 1 | 2
}

interface MissionItem {
  mission: Mission
}

interface NoticeItem {
  notice: boolean
}

interface MessageItem {
  img?: string
  emoticon?: string
  loading?: boolean
  interval?: number
}

interface MessageListItem {
  time: number
  id: number
  title?: string
  list: Message[]
}

interface Character {
  name: string
  avatar: string
  card: string
  info?: string
  type?: Fate
  level?: 4 | 5
}

type OtherCharacter = Omit<Character, 'card'> & { gold?: boolean; custom: true }

type CustomCharacter = Omit<Character, 'card'> & { custom: true }

interface Emoticon {
  name?: string
  title: string
  url: string
  error?: boolean
}

interface UserAvatar {
  avatar: string
  card?: string
}

type TextContentMode = 'text' | 'copyable' | 'editable' | 'input'

type RenderBlock =
  | RenderBubbleBlock
  | RenderMessageBlock
  | RenderMissionBlock
  | RenderNoticeBlock
  | RenderOptionBlock
  | RenderTextBlock

interface RenderBaseBlock {
  id: string
  text: string
  closable?: boolean
}

interface RenderCharacter {
  key: string
  name?: string
  avatar?: string
}

interface RenderBubbleBlock extends RenderBaseBlock {
  type: 'bubble'
}

interface RenderMessageBlock extends RenderBaseBlock {
  type: 'message'
  character?: RenderCharacter
  img?: string
  emoticon?: string
  loading?: boolean
}

interface RenderMissionBlock extends RenderBaseBlock {
  type: 'mission'
  mission: Mission
}

interface RenderNoticeBlock extends RenderBaseBlock {
  type: 'notice'
  level?: 'info' | 'warn' | 'error' | 'success'
}

interface RenderOptionBlock extends RenderBaseBlock {
  type: 'option'
  selected?: boolean
}

interface RenderTextBlock extends RenderBaseBlock {
  type: 'text'
  mode?: TextContentMode
  placeholder?: string
  variant?: 'plain' | 'bar'
}

type RenderAction =
  | { type: 'close'; id: string }
  | { type: 'delete'; id: string }
  | { type: 'select-option'; id: string }
  | { type: 'update-text'; id: string; text: string }
