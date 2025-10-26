import type { Database, Constants } from "./database.types";

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
export type MemebersUpdate = Memebers['Row'];

type Enums = Constants['public']['Enums']
export type Role = Enums['club_role'];
export type Attendance = Enums['attendance_status'];
export type StudentYear = Enums['student_year'];