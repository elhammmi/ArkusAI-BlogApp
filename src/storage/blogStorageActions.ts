import { PostInterface } from "../types";
import { getItem, setItem } from "./localStorageActions";
import data from "./data";

const key: string = "BlogList";

export const getPostList = (): PostInterface[] => {
  let list = getItem<PostInterface[]>(key);
  if (!list) {
    return [] as PostInterface[];
  }
  return list.sort(function (a, b) {
    return +new Date(b.createdAt) - +new Date(a.createdAt);
  });
};

export const getPost = (postId: number): PostInterface | undefined => {
  const list = getPostList();
  const post = list.find((item) => item.id === postId);
  return post;
};
export const addPost = (post: PostInterface) => {
  let list = getPostList();
  const nextId = getNextId();
  post.id = nextId;
  list = [...list, post];
  setItem(key, list);
};

export const editPost = (post: PostInterface) => {
  post.updatedAt = new Date();
  let list = getPostList();
  list = list.map((item) => (item.id === post.id ? post : item));
  setItem(key, list);
};

export const deletePost = (id: number) => {
  let list = getPostList();
  const removeItem = list.find((item) => item.id === id);
  if (removeItem) {
    list = list.filter((item) => item.id !== id);
  }
  setItem(key, list);
};

export const seedData = () => {
  const currentList = getPostList();
  if (currentList.length > 0) return;
  const dataList = data.map(
    (item) =>
      ({ ...item, createdAt: new Date(item.createdAt) } as PostInterface)
  );

  setItem(key, dataList);
};

const getNextId = () => {
  const list = getPostList();
  const nextId = Math.max(...list.map((item) => item.id)) + 1;
  return nextId;
};
