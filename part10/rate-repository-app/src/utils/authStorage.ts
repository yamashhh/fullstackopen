import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  readonly namespace: string;

  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  get key(): string {
    return `${this.namespace}:accessToken`;
  }

  async getAccessToken(): Promise<string | null> {
    // Get the access token for the storage
    const rawAccessToken = await AsyncStorage.getItem(this.key);
    if (rawAccessToken === null) {
      return rawAccessToken;
    }
    return JSON.parse(rawAccessToken);
  }

  async setAccessToken(accessToken: string): Promise<void> {
    // Add the access token to the storage
    await AsyncStorage.setItem(this.key, JSON.stringify(accessToken));
  }

  async removeAccessToken(): Promise<void> {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(this.key);
  }
}

export default AuthStorage;
