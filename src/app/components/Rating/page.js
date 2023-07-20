import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AppContext } from '@/app/contexts/AppContext';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function CustomizedRating() {
  const { handleFormAvaliation } = React.useContext(AppContext);

  return (
    <StyledRating
      name="rating"
      onChange={ handleFormAvaliation }
      defaultValue={1}
      getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
      precision={0.5}
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon style={{color: 'gray'}} fontSize="inherit" />}
    />
  );
}