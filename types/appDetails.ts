export interface appDetails {
  app: {
    id: number
    title: string,
    store_id: string,
    store_url: string,
    icon: string,
    rating: string,
    developer_id: number,
    created_at: string,
    updated_at: string,
    developer: {
      id: number,
      name: string,
      store_id: string,
      store_url: string,
      website: string,
      email: string,
      created_at: string,
      updated_at: string
    },
    fake_ads: [
      {
          id: number,
          url: string,
          app_id: number,
          created_at: string,
          updated_at: string,
      }
    ]
  },
  reports: {
    data: [
      {
        id: number,
        comment: string,
        works_offline: number,
        published: number,
        app_id: number,
        author_id: number,
        created_at: string,
        updated_at: string
      }
    ]
  }
}
