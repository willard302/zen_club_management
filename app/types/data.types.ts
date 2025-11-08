import type { EventsInsert, FinancesInsert, MemebersRow, MemebersUpdate, UserInsert, UserRow, UserUpdate } from "./supabase";
import type { ButtonNativeType, FieldType } from "vant";

export type MainStoreState = {
  isAuthenticated: boolean
  user: UserInsert | UserUpdate
  tabBarActive: string
  defaultAvatar: string
  locale: string
  showTabbar: boolean
};

export type FinanceStoreState = {
  records: FinancesInsert[]
};

export type MemberStoreState = {
  member: MemebersRow | MemebersUpdate | null
};

export type FieldOption = {
  text: string
  value: string
}

export type FieldItem = {
  label: string
  value: string | number | boolean
  name: keyof EventsInsert | keyof MemebersUpdate | string
  type?: FieldType
  placeholder?: string
  required?: boolean
  message?: string
  autocomplete?: string
  options?: FieldOption[]
};

export type message = {
  text: string
  value: string
};

export type cityType = {
  name: string
  geo: string
};

export type Contact = {
  name: string
  birth: string
  role: string
};

export type navItem = {
  label: string
  path: string
  icon: string[]
};

export type ButtonItem = {
  text: string
  type: ButtonNativeType
  to?: string
  action?: string
};

type EventExtendedMetaData = {
  created_at: string,
  created_by: string
}

export type EventExtended = {
  description: string
  location: string
  participants: string[]
  priority: string
  customId: number
  metaData: EventExtendedMetaData
};

export type Operation = {
  name: string
  id: string
};