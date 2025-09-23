interface message {
  created_at: string;
  message: string;
  readAt: string;
  sender: string;
  status: string;
}

interface file {
  type: string;
  url: string;
}

interface numbersResult {
  birth: number;
  birthDay: string;
  destiny: number;
  empty: number[];
  nature: number[];
  sign: number;
  spirit: number;
  talent: number[];
}

interface numbers {
  moon: numbersResult;
  sun: numbersResult;
}

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: {
          created_at?: string;
          id?: number;
          lastMessageContent?: string | null;
          lastMessageDate?: string | null;
          members?: string[] | null;
          messages?: message[] | null;
        },
        Insert: {
          created_at?: string;
          id?: number;
          lastMessageContent?: string | null;
          lastMessageDate?: string | null;
          members?: string[] | null;
          messages?: message[] | null;
        },
        Update: {
          created_at?: string;
          id?: number;
          lastMessageContent?: string | null;
          lastMessageDate?: string | null;
          members?: string[] | null;
          messages?: message[] | null;
        },
        Relationships: []
      };
      posts: {
        Row: {
          author?: string;
          author_id?: string;
          avatar_url?: string;
          content?: string;
          created_at?: string;
          favorite?: boolean;
          trackers_id?: string[];
          files?: file[];
          id: number;
          accessible_id?: string[];
          comments?: string[];
        }
        Insert: Partial<Database["public"]["Tables"]["posts"]["Row"]>
        Update: Partial<Database["public"]["Tables"]["posts"]["Row"]>
        Relationships?: [];
      };
      users: {
        Row: {
          name?: string;
          email?: string | null;
          avatar_url?: string;
          birth?: string | number;
          birth_city?: string | null;
          birth_country?: string;
          created_at?: string | null;
          gender?: string;
          no?: number;
          username?: string | null;
          uuid?: string | null;
          habits?: string[] | null;
          numbers?: numbers | null;
          status?: string | null;
        }
        Update: Partial<Database["public"]["Tables"]["users"]["Row"]>
        Insert: Partial<Database["public"]["Tables"]["users"]["Row"]>
        Relationships?: [];
      };
    };
  };
};

export type Post = Database['public']['Tables']['posts']['Row'];

export type User = Database['public']['Tables']['users']['Row'];

export type UserUpdate = Database['public']['Tables']['users']['Update'];
