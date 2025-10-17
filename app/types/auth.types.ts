import type { FieldType } from "vant";
import type { User, UserUpdate } from "./supabase";

export type account = {
  label: string;
  value: string;
  name: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
  message: string;
  autocomplete?: string;
}

export type AuthState = {
  userInfo: User | UserUpdate | null,
  defaultAvatar: string,
  isAuthenticated: Boolean,
  userId: string,
  tabBarActive: string
}