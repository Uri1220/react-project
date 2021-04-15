import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
     border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize:12
  },
  
}))(Badge);

export default function CartInHeader({total}) {
  return (
    <IconButton style={{fontSize:20}}aria-label="cart">
      <StyledBadge badgeContent={total} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
