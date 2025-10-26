import type { UserRow, UserUpdate } from "./supabase";
import type { ButtonNativeType, FieldType } from "vant";

export type MainStoreState = {
  isAuthenticated: boolean,
  user: UserRow | UserUpdate | null,
  tabBarActive: string,
  defaultAvatar: string
};

export type FieldItem = {
  label: string;
  value: string;
  name: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  message?: string;
  autocomplete?: string;
};

export type message = {
  text: string,
  value: string
};

export type cityType = {
  name: string,
  geo: string
};

export type Contact = {
  name: string,
  birth: string,
  role: string
};

export type navItem = {
  label: string,
  path: string,
  icon: string[]
};

export type ButtonItem = {
  text: string, 
  type: ButtonNativeType,
  to?: string
};