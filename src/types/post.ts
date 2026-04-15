export type Post = {
  id: string;
  title: string;
  content: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
};

export type PostInput = {
  title: string;
  content: string;
  author?: string;
};
