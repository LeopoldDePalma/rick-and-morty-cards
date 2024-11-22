import type { AxiosStatic } from 'axios';
import axios from 'axios';
import { z } from 'zod';
import { heroSchemas, type CardType } from '../schemas/heroSchemas';

class HeroService {
  #client: AxiosStatic;

  constructor(client: AxiosStatic) {
    this.#client = client;
  }

  async getAll(): Promise<CardType[]> {
    try {
      const response = await this.#client.get<{ results: CardType[] }>(
        'https://rickandmortyapi.com/api/character/',
      );

      const parsedResult = heroSchemas.array().parse(response.data.results);
      console.log(parsedResult);
      return parsedResult;
    } catch (error) {
      if (error instanceof z.ZodError) console.error({ message: error });
      console.error({ message: error });
      return [];
    }
  }
}

export default new HeroService(axios);
