import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AppContext } from '@/app/contexts/AppContext';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#F24C3D',
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
      defaultValue={2}
      getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
      precision={0.5}
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon style={{color: '#424242'}} fontSize="inherit" />}
      className='lg:text-4xl lg:flex lg:gap-3'
    />
  );
}