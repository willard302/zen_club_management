export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string | null
          event_id: string
          id: number
          member_id: string
          remark: string | null
          status: Database["public"]["Enums"]["attendance_status"] | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id: number
          member_id: string
          remark?: string | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: number
          member_id?: string
          remark?: string | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          short_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          short_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          short_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          created_by: string
          description: string
          end_at: string
          id: string
          is_all_day: boolean
          location: string
          participants: string[] | null
          start_at: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string
          end_at?: string
          id?: string
          is_all_day?: boolean
          location?: string
          participants?: string[] | null
          start_at?: string
          title?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          end_at?: string
          id?: string
          is_all_day?: boolean
          location?: string
          participants?: string[] | null
          start_at?: string
          title?: string
        }
        Relationships: []
      }
      member_status: {
        Row: {
          contact_date: string | null
          contact_way: string | null
          created_at: string | null
          id: number
          member_id: string | null
          member_status: string | null
        }
        Insert: {
          contact_date?: string | null
          contact_way?: string | null
          created_at?: string | null
          id: number
          member_id?: string | null
          member_status?: string | null
        }
        Update: {
          contact_date?: string | null
          contact_way?: string | null
          created_at?: string | null
          id?: number
          member_id?: string | null
          member_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_status_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          birthday: string
          club_group: string
          club_role: Database["public"]["Enums"]["club_role"]
          created_at: string
          department: string
          email: string | null
          id: string
          instagram: string
          inviter: string
          join_date: string
          line_id: string
          name: string
          phone: string
          student_id: string
          student_year: Database["public"]["Enums"]["student_year"] | null
        }
        Insert: {
          birthday?: string
          club_group?: string
          club_role?: Database["public"]["Enums"]["club_role"]
          created_at?: string
          department?: string
          email?: string | null
          id?: string
          instagram?: string
          inviter?: string
          join_date?: string
          line_id?: string
          name?: string
          phone?: string
          student_id?: string
          student_year?: Database["public"]["Enums"]["student_year"] | null
        }
        Update: {
          birthday?: string
          club_group?: string
          club_role?: Database["public"]["Enums"]["club_role"]
          created_at?: string
          department?: string
          email?: string | null
          id?: string
          instagram?: string
          inviter?: string
          join_date?: string
          line_id?: string
          name?: string
          phone?: string
          student_id?: string
          student_year?: Database["public"]["Enums"]["student_year"] | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string
          created_at: string
          department: string
          email: string
          gender: string
          id: string
          name: string
          phone: string
          role: Database["public"]["Enums"]["club_role"]
          status: string
          student_years: Database["public"]["Enums"]["student_year"]
        }
        Insert: {
          avatar_url?: string
          created_at?: string
          department?: string
          email?: string
          gender?: string
          id?: string
          name?: string
          phone?: string
          role?: Database["public"]["Enums"]["club_role"]
          status?: string
          student_years?: Database["public"]["Enums"]["student_year"]
        }
        Update: {
          avatar_url?: string
          created_at?: string
          department?: string
          email?: string
          gender?: string
          id?: string
          name?: string
          phone?: string
          role?: Database["public"]["Enums"]["club_role"]
          status?: string
          student_years?: Database["public"]["Enums"]["student_year"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      attendance_status: "attendance" | "lateness" | "leave" | "absence"
      club_role:
        | "admin"
        | "teacher"
        | "counselor"
        | "president"
        | "vice_president"
        | "team_director"
        | "deputy_team_director"
        | "committee_member"
        | "member"
        | "new_member"
        | "guest"
      student_year: "freshman" | "sophomore" | "junior" | "senior" | "graduate"
    }
    CompositeTypes: {
      event_extended: {
        location: string | null
        description: string | null
        is_public: boolean | null
        participants: string[] | null
        metadata:
          | Database["public"]["CompositeTypes"]["event_extended_meta_data"]
          | null
      }
      event_extended_meta_data: {
        created_at: string | null
        created_by: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attendance_status: ["attendance", "lateness", "leave", "absence"],
      club_role: [
        "admin",
        "teacher",
        "counselor",
        "president",
        "vice_president",
        "team_director",
        "deputy_team_director",
        "committee_member",
        "member",
        "new_member",
        "guest",
      ],
      student_year: ["freshman", "sophomore", "junior", "senior", "graduate"],
    },
  },
} as const
