import { ICacheProvider } from '../ICacheProvider';

interface IClientInterface {
  key: string;
  value: string;
}

class FakeCacheProvider implements ICacheProvider {
  private client: IClientInterface[];

  constructor() {
    this.client = [];
  }

  public async save(key: string, value: unknown): Promise<void> {
    this.client.push({
      key,
      value: JSON.stringify(value),
    });
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.client.find(column => column.key === key);

    if (!data) {
      return null;
    }

    const parseData = JSON.parse(data.value) as T;

    return parseData;
  }

  public async invalidate(key: string): Promise<void> {
    const index = this.client.findIndex(column => column.key === key);

    this.client.slice(index, 1);
  }

  public async invalidadePrefix(prefix: string): Promise<void> {
    this.client = this.client.filter(column => !column.key.match(`${prefix}`));
  }
}

export { FakeCacheProvider };
