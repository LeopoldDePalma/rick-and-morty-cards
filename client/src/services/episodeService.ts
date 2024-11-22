import type { AxiosStatic } from 'axios';
import axios from 'axios';
import { z } from 'zod';
import { episodeSchemas, type CardType } from '../schemas/episodeSchemas';

class EpisodeService {
  #client: AxiosStatic;

  constructor(client: AxiosStatic) {
    this.#client = client;
  }

  async getAll(): Promise<CardType[]> {
    try {
      const response = await this.#client.get<{ results: CardType[] }>(
        'https://rickandmortyapi.com/api/episode/',
      );

      const parsedResult = episodeSchemas.array().parse(response.data.results);
      console.log(parsedResult);
      return parsedResult;
    } catch (error) {
      if (error instanceof z.ZodError) console.error({ message: error });
      console.error({ message: error });
      return [];
    }
  }
}

export default new EpisodeService(axios);
