export class DataStorage {
  static get(key: string): string | null {
    return localStorage.getItem(key);
  }

  static set(key: string, value: string): void {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('local-storage'));
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('local-storage'));
  }
}
