export const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify({ value }));
};

export const getItem = <T>(key: string): T | null => {
  const data: string | null = localStorage.getItem(key);

  if (data !== null) {
    return JSON.parse(data, reviver).value;
  }

  return null;
};

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function reviver(key: any, value: any) {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
}
