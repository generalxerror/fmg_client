export interface devDetails {
  developer: {
    id: number,
    name: string
    store_id: string
    store_url: string
    website: string
    email: string
    created_at: string
    updated_at: string
  },
  apps: [
    {
      id: number,
      title: string
      rating: string
      developer_id: number,
      icon: string
      reports_count: number
    }
  ],
  total_reports: number
}
