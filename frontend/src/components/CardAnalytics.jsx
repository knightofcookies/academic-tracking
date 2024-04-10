import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CardAnalytics(props) {
  return (
    <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={props.image_src}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" style={{ textAlign: 'center' }} >
            {props.count}
          </Typography>
          <Typography variant="h5"  color="text.secondary" style={{ textAlign: 'center' }}>
            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica */}
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}