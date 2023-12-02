interface Document {
  _id: string;
}

export interface User extends Document {
  username: string;
  password: string;
}

export interface Image extends Document {
  file?: File; // temporary property for new images
  src: string;
  place: string;
  photographer: string;
}

export interface Work extends Document {
  slug: string;
  name: string;
  date: string;
  size: string;
  material: string;
  images: Image[];
  visible: boolean;
}

export interface Project extends Document {
  slug: string;
  name: string;
  date: string;
  works: Work[];
  visible: boolean;
}

/** A special type of project with `works` as a list of strings for the purpose of posting or patching projects. */
export interface SpecialProject extends Omit<Project, 'works'> {
  works: string[]; // Redefining 'works' as an array of strings
}

export interface SpecialUser extends Omit<User, '_id'> {
  passwordConfirmation?: string;
}