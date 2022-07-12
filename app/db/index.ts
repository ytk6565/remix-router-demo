const storage: Record<string, string> = {};

export default {
  get: (key: string) => storage[key],
  set: (key: string, value: string) => {
    storage[key] = value;
  },
};
