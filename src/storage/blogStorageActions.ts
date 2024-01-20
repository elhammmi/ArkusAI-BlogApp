import { PostInterface } from "../types";
import { getItem, setItem } from "./localStorageActions";
import data from "./data";

const key: string = "BlogList";

export const getPostList = (): PostInterface[] => {
  let list = getItem<PostInterface[]>(key);
  if (!list) {
    return [] as PostInterface[];
  }
  return list;
};

export const addPost = (post: PostInterface) => {
  let list = getPostList();
  list = [...list, post];
  setItem(key, list);
};

export const editPost = (post: PostInterface) => {
  let list = getPostList();
  list = list.map((item) => (item.id === post.id ? post : item));
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
