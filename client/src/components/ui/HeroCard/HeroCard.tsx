import { Info as InfoIcon } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import type { CardType } from '../../../schemas/heroSchemas';
import styles from './HeroCard.module.css';

export default function HeroCard({ hero }: { hero: CardType }): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'alive':
        return '#66bb6a';
      case 'dead':
        return '#f44336';
      default:
        return '#ffa726';
    }
  };

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        height="300"
        image={hero.image}
        alt={hero.name}
        className={styles.media}
      />

      <CardHeader
        title={
          <Typography variant="h6" className={styles.title}>
            {hero.name}
          </Typography>
        }
        subheader={
          <Chip
            label={hero.status}
            size="small"
            className={styles.statusChip}
            style={{
              backgroundColor: `${getStatusColor(hero.status)}15`,
              color: getStatusColor(hero.status),
            }}
          />
        }
      />

      <CardContent className={styles.content}>
        <Typography variant="body2" color="text.secondary">
          {hero.species} • {hero.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Origin: {hero.origin.name}
        </Typography>
      </CardContent>

      <CardActions className={styles.actions}>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          className={expanded ? styles.infoButton : ''}
        >
          <InfoIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">
            <strong>Type:</strong> {hero.type || 'Unknown'}
          </Typography>
          <Typography variant="body2">
            <strong>Last known location:</strong> {hero.location.name}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
