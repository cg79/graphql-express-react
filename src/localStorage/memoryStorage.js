
class MemoryStorage {
  dict= {};

  get(key, defaultValue) {
    return this.dict[key] || defaultValue;
  }

  set(key, value) {
    this.dict[key] = value;
  }

  remove(key) {
    delete this.dict[key];
  }
  
}

const memoryStorage = new MemoryStorage();

export { memoryStorage };
