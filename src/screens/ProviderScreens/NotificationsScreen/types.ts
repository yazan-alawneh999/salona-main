export interface Notification {
    id: number;
    user_id: number;
    title_ar: string;
    title_en: string;
    message_ar: string;
    message_en: string;
    is_read: number;
    created_at: string;
    updated_at: string;
    image_url: string | null;
  }
  
  export interface NotificationsResponse {
    success: boolean;
    notifications: {
      current_page: number;
      data: Notification[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: Array<{
        url: string | null;
        label: string;
        active: boolean;
      }>;
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
  }