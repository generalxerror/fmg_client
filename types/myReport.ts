export interface myReport {
  id: number,
  comment: string,
  works_offline: number,
  published: number,
  app_id: number,
  created_at: string,
  store_app: {
    id: number,
    title: string,
    store_url: string,
    icon: string
  }
}
