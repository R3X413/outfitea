export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          role: string
          is_verified: boolean
          followers_count: number
          created_at: string
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          is_verified?: boolean
          followers_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          is_verified?: boolean
          followers_count?: number
          created_at?: string
        }
      }
      items: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          category: string
          color: string
          brand: string
          season: string
          image_url: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          category: string
          color: string
          brand: string
          season: string
          image_url: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          category?: string
          color?: string
          brand?: string
          season?: string
          image_url?: string
        }
      }
      outfits: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          description: string
          season: string
          occasion: string
          is_favorite: boolean
          image_url: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          description: string
          season: string
          occasion: string
          is_favorite?: boolean
          image_url: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          description?: string
          season?: string
          occasion?: string
          is_favorite?: boolean
          image_url?: string
        }
      }
      outfit_items: {
        Row: {
          id: string
          outfit_id: string
          item_id: string
        }
        Insert: {
          id?: string
          outfit_id: string
          item_id: string
        }
        Update: {
          id?: string
          outfit_id?: string
          item_id?: string
        }
      }
      calendar_events: {
        Row: {
          id: string
          user_id: string
          outfit_id: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          outfit_id: string
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          outfit_id?: string
          date?: string
          created_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          description: string
          logo_url: string
          is_verified: boolean
          followers_count: number
          products_count: number
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          logo_url: string
          is_verified?: boolean
          followers_count?: number
          products_count?: number
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          logo_url?: string
          is_verified?: boolean
          followers_count?: number
          products_count?: number
          user_id?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          brand_id: string
          name: string
          category: string
          price: number
          stock: number
          status: string
          views: number
          saves: number
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          name: string
          category: string
          price: number
          stock: number
          status?: string
          views?: number
          saves?: number
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          name?: string
          category?: string
          price?: number
          stock?: number
          status?: string
          views?: number
          saves?: number
          image_url?: string
          created_at?: string
        }
      }
      collaborations: {
        Row: {
          id: string
          brand_id: string
          collaborator_id: string
          status: string
          start_date: string
          end_date: string | null
          products_count: number
          engagement_level: string
          created_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          collaborator_id: string
          status?: string
          start_date: string
          end_date?: string | null
          products_count?: number
          engagement_level?: string
          created_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          collaborator_id?: string
          status?: string
          start_date?: string
          end_date?: string | null
          products_count?: number
          engagement_level?: string
          created_at?: string
        }
      }
      verification_requests: {
        Row: {
          id: string
          user_id: string
          request_date: string
          status: string
          reason: string
          processed_by: string | null
          processed_date: string | null
        }
        Insert: {
          id?: string
          user_id: string
          request_date?: string
          status?: string
          reason: string
          processed_by?: string | null
          processed_date?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          request_date?: string
          status?: string
          reason?: string
          processed_by?: string | null
          processed_date?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
