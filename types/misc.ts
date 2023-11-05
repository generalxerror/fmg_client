export interface latestReport {
  id: number,
  comment: string,
  app_id: number,
  created_at: string,
  store_app: {
    id: number,
    developer_id: number,
    title: string,
    rating: string,
    icon: string,
    developer: {
      id: number,
      name: string
    }
  }
}

export interface worstApp {
  id: number,
  title: string,
  rating: string,
  developer_id: number,
  icon: string,
  reports_count: number,
  developer: {
      id: number
      name: string
  }
}

export interface worstDev {
  id: number,
  name: string,
  apps_count: number,
  reports_count: number
}
