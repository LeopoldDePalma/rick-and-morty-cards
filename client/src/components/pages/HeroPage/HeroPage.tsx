import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { CardType } from '../../../schemas/heroSchemas';
import heroService from '../../../services/heroService';
import HeroCard from '../../ui/HeroCard/HeroCard';
import styles from './HeroPage.module.css';

export default function HeroPage(): React.JSX.Element {
  const [heroes, setHeroes] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    heroService
      .getAll()
      .then(setHeroes)
      .catch((error: unknown) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Box className={styles.loadingContainer}>Loading...</Box>;
  }

  return (
    <Box className={styles.container}>
      <Container className={styles.cardsContainer}>
        <Box className={styles.cardsGrid}>
          {heroes.map((hero) => (
            <Box key={hero.id} className={styles.cardWrapper}>
              <HeroCard hero={hero} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
