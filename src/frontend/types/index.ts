interface Document {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Image extends Document {
  name: string
  alt: string
  caption: string
  url: string
}

export interface Portfolio extends Document {
  name: string
  description: string
  photo: Image
}

export interface Work extends Document {
  slug: string
  title: string
  date: string
  material: string
  size: string
  description: string
  photos: Image[]
}

export interface Project extends Document {
  slug: string
  title: string
  description: string
  date: string
  works: Work[]
}
