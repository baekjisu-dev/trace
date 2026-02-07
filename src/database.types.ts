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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      book: {
        Row: {
          authors: string[]
          category: string | null
          contents: string | null
          created_at: string
          datetime: string | null
          isbn: string
          price: number | null
          publisher: string | null
          sale_price: number | null
          status: string | null
          thumbnail: string | null
          title: string
          translators: string[] | null
          url: string | null
        }
        Insert: {
          authors: string[]
          category?: string | null
          contents?: string | null
          created_at?: string
          datetime?: string | null
          isbn?: string
          price?: number | null
          publisher?: string | null
          sale_price?: number | null
          status?: string | null
          thumbnail?: string | null
          title?: string
          translators?: string[] | null
          url?: string | null
        }
        Update: {
          authors?: string[]
          category?: string | null
          contents?: string | null
          created_at?: string
          datetime?: string | null
          isbn?: string
          price?: number | null
          publisher?: string | null
          sale_price?: number | null
          status?: string | null
          thumbnail?: string | null
          title?: string
          translators?: string[] | null
          url?: string | null
        }
        Relationships: []
      }
      comment: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: number
          parent_comment_id: number | null
          post_id: number
          root_comment_id: number | null
        }
        Insert: {
          author_id?: string
          content?: string
          created_at?: string
          id?: number
          parent_comment_id?: number | null
          post_id: number
          root_comment_id?: number | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: number
          parent_comment_id?: number | null
          post_id?: number
          root_comment_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_comment_id_fkey"
            columns: ["root_comment_id"]
            isOneToOne: false
            referencedRelation: "comment"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: number
          created_at: string
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: number
          created_at?: string
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: number
          created_at?: string
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: number
          last_message_at: string | null
          pair_key: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          last_message_at?: string | null
          pair_key?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          last_message_at?: string | null
          pair_key?: string | null
        }
        Relationships: []
      }
      like: {
        Row: {
          created_at: string
          id: number
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: number
          created_at: string
          id: number
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: number
          created_at?: string
          id?: never
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: number
          created_at?: string
          id?: never
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          actor_id: string | null
          context: Json
          created_at: string
          id: number
          is_read: boolean
          type: string
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          context?: Json
          created_at?: string
          id?: never
          is_read?: boolean
          type: string
          user_id: string
        }
        Update: {
          actor_id?: string | null
          context?: Json
          created_at?: string
          id?: never
          is_read?: boolean
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_actor_id_fkey1"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          author_id: string
          book_isbn: string | null
          content: Json
          content_text: string
          created_at: string
          id: number
          image_urls: string[] | null
          like_count: number
        }
        Insert: {
          author_id?: string
          book_isbn?: string | null
          content: Json
          content_text?: string
          created_at?: string
          id?: number
          image_urls?: string[] | null
          like_count?: number
        }
        Update: {
          author_id?: string
          book_isbn?: string | null
          content?: Json
          content_text?: string
          created_at?: string
          id?: number
          image_urls?: string[] | null
          like_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_book_isbn_fkey"
            columns: ["book_isbn"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["isbn"]
          },
        ]
      }
      profile: {
        Row: {
          avatar_url: string | null
          bio: string
          created_at: string
          id: string
          nickname: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string
          created_at?: string
          id?: string
          nickname?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string
          created_at?: string
          id?: string
          nickname?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_dm_header: {
        Args: { p_conversation_id: number }
        Returns: {
          conversation_id: number
          created_at: string
          last_message_at: string
          last_message_content: string
          last_message_id: number
          last_message_sender_id: string
          my_last_read_at: string
          other_avatar_url: string
          other_nickname: string
          other_user_id: string
          unread_count: number
        }[]
      }
      get_dm_list_page: {
        Args: {
          p_cursor_conversation_id?: number
          p_cursor_last_message_at?: string
          p_limit?: number
        }
        Returns: {
          conversation_id: number
          created_at: string
          last_message_at: string
          last_message_content: string
          last_message_id: number
          last_message_sender_id: string
          my_last_read_at: string
          other_avatar_url: string
          other_nickname: string
          other_user_id: string
          unread_count: number
        }[]
      }
      get_messages_page: {
        Args: {
          p_conversation_id: number
          p_cursor_created_at?: string
          p_cursor_id?: number
          p_limit?: number
        }
        Returns: {
          content: string
          conversation_id: number
          created_at: string
          id: number
          sender_id: string
        }[]
      }
      get_or_create_dm: { Args: { other_user_id: string }; Returns: number }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      toggle_post_like: {
        Args: { p_post_id: number; p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
