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
  visible: boolean;
}

interface IProject {
  name: string;
  date: string;
  works: IWork[];
  slug: string;
  visible: boolean;
}

export { BaseError, IUser, IProject, IWork, IImage };