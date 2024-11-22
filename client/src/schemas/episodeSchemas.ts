import { z } from 'zod';

export const episodeSchemas = z.object({
  id: z.number(),
  name: z.string(),
  air_date: z.string(),
  episode: z.string(),
  url: z.string(),
  created: z.string(),
});

export type CardType = z.infer<typeof episodeSchemas>;
