import type { Database, Constants } from "./database.types";
import type { EventInput } from "@fullcalendar/core";
import { Constants } from "~/types/database.types";

declare module '#supabase/schema' {
  interface DatabaseDefinition extends Database {};
};

type User = Database['public']['Tables']['users'];
export type UserRow = User['Row'];
export type UserInsert = User['Insert'];
export type UserUpdate = User['Update'];

type Profiles = Database['public']['Tables']['profiles'];
export type ProfilesRow = Profiles['Row'];
export type ProfilesInsert = Profiles['Insert'];
export type ProfilesUpdate = Profiles['Update'];

type Clubs = Database['public']['Tables']['clubs'];
export type ClubsRow = Clubs['Row'];
export type ClubsInsert = Clubs['Insert'];
export type ClubsUpdate = Clubs['Update'];

type Memebers = Database['public']['Tables']['members'];
export type MemebersRow = Memebers['Row'];
export type MemebersInsert = Memebers['Insert'];
export type MemebersUpdate = Memebers['Update'];

type Trackers = Database['public']['Tables']['member_tracker'];
export type TrackersRow = Trackers['Row'];
export type TrackersInsert = Trackers['Insert'];
export type TrackersUpdate = Trackers['Update'];

type Events = Database['public']['Tables']['events'];
export type EventsRow = Events['Row'];
export type EventsInsert = Events['Insert'];
export type EventsUpdate = Events['Update'];

type Accounting = Database['public']['Tables']['finance_record'];
export type AccountingRow = Accounting['Row'];
export type AccountingInsert = Accounting['Insert'];
export type AccountingUpdate = Accounting['Update'];

type Enums = Constants['public']['Enums']
export type Role = Enums['club_role'];
export type Attendance = Enums['attendance_status'];
export type Grade = Enums['grade'];