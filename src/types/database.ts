export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          title: string;
          content: string;
          user_id: string;
          category_id: string;
          summary: string;
          cover_url: string;
          create_date: string;
          update_date: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          user_id: string;
          category_id: string;
          summary: string;
          cover_url: string;
          create_date?: string;
          update_date?: string;
        };
        Update: {
          id?: string;
          title: string;
          content: string;
          user_id: string;
          category_id: string;
          summary: string;
          cover_url: string;
          create_date?: string;
          update_date?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          text: string;
        };
        Insert: {
          id?: string;
          text: string;
        };
        Update: {
          id?: string;
          text?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          text: string;
          create_date?: string;
        };
        Insert: {
          id?: string;
          text: string;
          create_date?: string;
        };
        Update: {
          id?: string;
          text?: string;
          create_date?: string;
        };
      };
      article_tags: {
        Row: {
          id: string;
          article_id: string;
          tag_id: string;
        };
        Insert: {
          id?: string;
          tag_id: string;
          article_id: string;
        };
        Update: {
          id?: string;
          tag_id?: string;
          article_id: string;
        };
      };

      comments: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          content: string;
          create_date?: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          content: string;
          create_date?: string;
        };
        Update: {
          id?: string;
          article_id: string;
          user_id: string;
          content: string;
          create_date?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// 便捷类型别名
export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
export type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"];


export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];  
export type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"];

export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type TagInsert = Database["public"]["Tables"]["tags"]["Insert"];
export type TagUpdate = Database["public"]["Tables"]["tags"]["Update"];

export type ArticleTag = Database["public"]["Tables"]["article_tags"]["Row"];
export type ArticleTagInsert = Database["public"]["Tables"]["article_tags"]["Insert"];
export type ArticleTagUpdate = Database["public"]["Tables"]["article_tags"]["Update"];

export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type CommentInsert = Database["public"]["Tables"]["comments"]["Insert"];
export type CommentUpdate = Database["public"]["Tables"]["comments"]["Update"];

export type DatabaseTables = Database["public"]["Tables"];

