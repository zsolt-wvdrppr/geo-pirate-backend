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
      achievements: {
        Row: {
          achievement_id: number
          description: string
          icon: string | null
          reward: number | null
        }
        Insert: {
          achievement_id: number
          description: string
          icon?: string | null
          reward?: number | null
        }
        Update: {
          achievement_id?: number
          description?: string
          icon?: string | null
          reward?: number | null
        }
        Relationships: []
      }
      attempted_quests: {
        Row: {
          attempted_quest_id: string
          completed_clues: number[]
          finish_time_stamp: string | null
          quest_id: number
          start_time_stamp: string | null
          user_id: string
        }
        Insert: {
          attempted_quest_id?: string
          completed_clues?: number[]
          finish_time_stamp?: string | null
          quest_id: number
          start_time_stamp?: string | null
          user_id: string
        }
        Update: {
          attempted_quest_id?: string
          completed_clues?: number[]
          finish_time_stamp?: string | null
          quest_id?: number
          start_time_stamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attempted_quests_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["quest_id"]
          },
        ]
      }
      clues: {
        Row: {
          achievement_id: number | null
          clue_id: number
          clue_name: string
          clue_success_message: string | null
          hint_msg: string | null
          hotzone_cntr_loc: Json | null
          hotzone_cntr_range: number | null
          hotzone_msg: string | null
          hotzone_poly_coords: Json | null
          instruction_msg: string | null
          picture_clue_alt: string | null
          picture_clue_url: string | null
          quest_id: number | null
          reward_coins: number | null
          riddle: string | null
          riddle_answer: string | null
          search_cntr_loc: Json | null
          search_cntr_range: number | null
          search_poly_coords: Json | null
          sketch_id: number | null
          target_loc: Json | null
        }
        Insert: {
          achievement_id?: number | null
          clue_id: number
          clue_name: string
          clue_success_message?: string | null
          hint_msg?: string | null
          hotzone_cntr_loc?: Json | null
          hotzone_cntr_range?: number | null
          hotzone_msg?: string | null
          hotzone_poly_coords?: Json | null
          instruction_msg?: string | null
          picture_clue_alt?: string | null
          picture_clue_url?: string | null
          quest_id?: number | null
          reward_coins?: number | null
          riddle?: string | null
          riddle_answer?: string | null
          search_cntr_loc?: Json | null
          search_cntr_range?: number | null
          search_poly_coords?: Json | null
          sketch_id?: number | null
          target_loc?: Json | null
        }
        Update: {
          achievement_id?: number | null
          clue_id?: number
          clue_name?: string
          clue_success_message?: string | null
          hint_msg?: string | null
          hotzone_cntr_loc?: Json | null
          hotzone_cntr_range?: number | null
          hotzone_msg?: string | null
          hotzone_poly_coords?: Json | null
          instruction_msg?: string | null
          picture_clue_alt?: string | null
          picture_clue_url?: string | null
          quest_id?: number | null
          reward_coins?: number | null
          riddle?: string | null
          riddle_answer?: string | null
          search_cntr_loc?: Json | null
          search_cntr_range?: number | null
          search_poly_coords?: Json | null
          sketch_id?: number | null
          target_loc?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "clues_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["achievement_id"]
          },
          {
            foreignKeyName: "clues_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["quest_id"]
          },
          {
            foreignKeyName: "clues_sketch_id_fkey"
            columns: ["sketch_id"]
            isOneToOne: false
            referencedRelation: "sketches"
            referencedColumns: ["sketch_id"]
          },
        ]
      }
      quests: {
        Row: {
          achievement_id: number | null
          description: string | null
          difficulty: number | null
          est_completion_time: number | null
          icon: string
          quest_id: number
          quest_poly_coords: Json | null
          quest_start_location: Json | null
          quest_start_range: number | null
          quest_success_msg: string | null
          reward_coins: number | null
          title: string | null
        }
        Insert: {
          achievement_id?: number | null
          description?: string | null
          difficulty?: number | null
          est_completion_time?: number | null
          icon: string
          quest_id: number
          quest_poly_coords?: Json | null
          quest_start_location?: Json | null
          quest_start_range?: number | null
          quest_success_msg?: string | null
          reward_coins?: number | null
          title?: string | null
        }
        Update: {
          achievement_id?: number | null
          description?: string | null
          difficulty?: number | null
          est_completion_time?: number | null
          icon?: string
          quest_id?: number
          quest_poly_coords?: Json | null
          quest_start_location?: Json | null
          quest_start_range?: number | null
          quest_success_msg?: string | null
          reward_coins?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quests_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["achievement_id"]
          },
        ]
      }
      sketches: {
        Row: {
          sketch_caption: string | null
          sketch_id: number
          sketch_img_url: string
        }
        Insert: {
          sketch_caption?: string | null
          sketch_id?: number
          sketch_img_url: string
        }
        Update: {
          sketch_caption?: string | null
          sketch_id?: number
          sketch_img_url?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          achievements: Json | null
          avatar: string | null
          current_coins: number | null
          first_name: string | null
          last_name: string | null
          pinned_quests: number[]
          user_id: string
          username: string
        }
        Insert: {
          achievements?: Json | null
          avatar?: string | null
          current_coins?: number | null
          first_name?: string | null
          last_name?: string | null
          pinned_quests?: number[]
          user_id: string
          username: string
        }
        Update: {
          achievements?: Json | null
          avatar?: string | null
          current_coins?: number | null
          first_name?: string | null
          last_name?: string | null
          pinned_quests?: number[]
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_completed_clue: {
        Args: { p_attempted_quest_id: string; p_clue_id: number }
        Returns: string
      }
      append_pinned_quest: {
        Args: { p_quest_id: number; p_user_id: string }
        Returns: undefined
      }
      init_quest_attempt: {
        Args: { p_quest_id: number; p_user_id: string }
        Returns: string
      }
      remove_pinned_quest: {
        Args: { p_quest_id: number; p_user_id: string }
        Returns: undefined
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
