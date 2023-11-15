import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import moment from 'moment'
import 'moment/locale/pt-br';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardReview({params}) {
  const [expanded, setExpanded] = React.useState(false);

  const colors = [
    '#30567e', '#922f23', '#dbc78c', 
    '#ce674f', '#f49cb4', '#5d573a'
  ]

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: colors[params.color_id] || red[500] }} aria-label="recipe">
            {params.nome ? params.nome[0].toUpperCase() : ""}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={params.nome || ""}
        subheader={params.created_at ? moment(params.created_at).format('MMMM Do YYYY, h:mm') : ""}
      />
      <CardMedia
        component="img"
        height="194"
        image={params.url || ""}
        alt={params.nome || ""}
        sx={{ cursor: 'pointer' }}
        onClick={() => {params.handleChange()}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {params.descricao || ""}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Favorito dos noivos">
          <IconButton>
            <FavoriteIcon sx={params.favorito ? { color: red[500] } : {} } />
          </IconButton>
        </Tooltip>
        <Tooltip title="Comprar presente">
          <IconButton onClick={() => {params.handleChange()}}>
            <AttachMoneyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Copiar link">
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}