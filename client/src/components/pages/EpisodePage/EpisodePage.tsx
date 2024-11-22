import { Masonry } from '@mui/lab';
import { Box, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import type { CardType } from '../../../schemas/episodeSchemas';
import episodeService from '../../../services/episodeService';
import TabBar from '../../ui/TabBar/TabBar';
import styles from './EpisodePage.module.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

export default function EpisodePage(): React.JSX.Element {
  const [episodes, setEpisodes] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredEpisodes, setFilteredEpisodes] = useState<CardType[]>([]);
  const [selectedSeason, setSelectedSeason] = useState('all');

  useEffect(() => {
    setLoading(true);
    episodeService
      .getAll()
      .then((data) => {
        setEpisodes(data);
        setFilteredEpisodes(data);
      })
      .catch((error: unknown) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const getRandomDescriptionHandler = (episode: string): string => {
    const description = [
      `Эпизод ${episode} - один из самых захватывающих в сериале. В нем происходит множество неожиданных событий, которые меняют ход истории.`,
      `Ключевой эпизод ${episode} сезона.`,
      `В этом эпизоде ${episode} мы видим развитие персонажей и их взаимоотношений. Множество интересных диалогов и неожиданных поворотов сюжета делают его особенным.`,
      `Короткий, но важный эпизод ${episode}.`,
      `Эпизод ${episode} раскрывает новые тайны из жизни героев.`,
    ];
    return description[Math.floor(Math.random() * description.length)];
  };

  const seasons = [...new Set(episodes.map((episode) => episode.episode.slice(1, 3)))].sort();

  const getEpisodesBySeason = (season: string): void => {
    setSelectedSeason(season);

    if (season === 'all') {
      setFilteredEpisodes(episodes);
    } else {
      setFilteredEpisodes(episodes.filter((episode) => episode.episode.startsWith(`S${season}`)));
    }
  };

  if (loading) {
    return <Box className={styles.loadingContainer}>Loading...</Box>;
  }

  return (
    <Box className={styles.container}>
      <TabBar
        seasons={seasons}
        selectedSeason={selectedSeason}
        getEpisodesBySeason={getEpisodesBySeason}
      />
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', margin: '0 auto' }}>
          <Typography variant="h5" className={styles.title}>
            Episodes
          </Typography>
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {filteredEpisodes.map((episode) => (
              <Item key={episode.id} className={styles.card}>
                <Typography variant="h6" gutterBottom>
                  {episode.name}
                </Typography>
                <Typography variant="subtitle2" className={styles.subtitle} gutterBottom>
                  Episode: {episode.episode}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Air Date: {episode.air_date}
                </Typography>
                <Typography variant="body2" className={styles.description}>
                  {getRandomDescriptionHandler(episode.episode)}
                </Typography>
              </Item>
            ))}
          </Masonry>
        </Box>
      </Container>
    </Box>
  );
}
