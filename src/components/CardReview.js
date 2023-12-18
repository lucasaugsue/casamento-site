import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import moment from 'moment';
import 'moment/locale/pt-br';
import { forwardRef } from 'react';

const styleIconButton = {
  color: '#757575', 
  margin: '1vh 0.25vw', 
  cursor: 'pointer'
}

const CardReview = forwardRef(({params}, ref) => {
  const colors = [
    '#30567e', '#922f23', '#dbc78c', 
    '#ce674f', '#f49cb4', '#5d573a'
  ]

  return (
    <Card ref={ref} sx={{ maxWidth: 345, borderRadius: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: colors[params.color_id] || red[500] }} aria-label="recipe">
            {params.nome ? params.nome[0].toUpperCase() : ""}
          </Avatar>
        }
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
          {
            (params.descricao && params.descricao.length > 150)
            ?`${params.descricao.slice(0, 146)}...`
            :params.descricao || ""
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Favorito dos noivos">
          <div style={styleIconButton}>
            <FavoriteIcon sx={params.favorito ? { color: red[500] } : {} } />
          </div>
        </Tooltip>
        <Tooltip title="Comprar presente">
          <div style={styleIconButton} onClick={() => {params.handleChange()}}>
            <AttachMoneyIcon />
          </div>
        </Tooltip>
        <Tooltip title="Copiar link">
          <div style={styleIconButton} onClick={() => {params.compartilhar()}}>
            <ShareIcon />
          </div>
        </Tooltip>
      </CardActions>
    </Card>
  );
})

export default CardReview;