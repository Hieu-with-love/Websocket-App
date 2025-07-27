// Interface đại diện cho một mục trong localStorage
interface LocalStorageItem<T = string> {
  key: string;
  value: T;
}

// Hàm set giá trị vào localStorage (tự động stringify nếu là object)
export const setLocalStorage = <T>(item: LocalStorageItem<T>): void => {
  const serialized =
    typeof item.value === "string" ? item.value : JSON.stringify(item.value);
  localStorage.setItem(item.key, serialized);
};

// Hàm get giá trị từ localStorage (tự động parse nếu là object)
export const getLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  try {
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    // Nếu không phải JSON thì trả về chuỗi
    return item as unknown as T;
  }
};

// Hàm remove item
export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

// Hàm clear toàn bộ localStorage
export const clearLocalStorage = (): void => {
  localStorage.clear();
};
