export interface User {
  username: string;
  password?: string;
}

export interface Image {
  _id: string;
  file?: File; // temporary property for new images
  src: string;
  place: string;
  photographer: string;
}

export interface Work {
  _id: string;
  slug: string;
  name: string;
  date: string;
  size: string;
  material: string;
  images: Image[];
}

export interface Project {
  _id: string;
  slug: string;
  name: string;
  date: string;
  works: Work[];
}