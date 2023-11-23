interface BaseError {
  message: string;
  status: number;
}

interface IUser {
  username: string;
  password: string;
  avatar?: string;
}

interface IImage {
  src: string;
  place: string;
  photographer: string;
}

interface IWork {
  name: string;
  date: string;
  size: string;
  material: string;
  images: IImage[];
  slug: string;
}

interface IProject {
  name: string;
  date: string;
  works: IWork[];
  slug: string;
}

export { BaseError, IUser, IProject, IWork, IImage };