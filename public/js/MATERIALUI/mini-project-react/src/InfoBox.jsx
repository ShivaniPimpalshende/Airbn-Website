import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import "./InfoBox.css"

export default function InfoBox({info}){
    const HOT_URL="https://tse3.mm.bing.net/th?id=OIP.tOE8fFSjw9v6U9d-BWp0MAHaEK&pid=Api&P=0&h=220";
    const COLD_URL="http://2.bp.blogspot.com/-mmBeYIaifyY/WGz2qcu6iAI/AAAAAAAPBYQ/dFK2U3-L2mAgIkkX2XHb3g2SDN-OwkhMACK4B/s1600/Blue%2Bhour%2BFinland_by_Laurence%2BNorah.jpg";
    const RAIN_URL="https://tse2.mm.bing.net/th?id=OIP.zly06tYkv0AOsHhZCRkJ3gHaE7&pid=Api&P=0&h=220";
    return(<div className="InfoBox">

<div className='cardContainer'>
<Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.humidity > 80
          ? RAIN_URL
          : info.temp > 15
          ? HOT_URL
          : COLD_URL
        }
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city}{info.humidity > 80
          ? <ThunderstormIcon/>
          : info.temp > 15
          ? <WbSunnyIcon/>
          : <AcUnitIcon/>
        }
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"span"}>
        <p>Temperature = {info.temp}&deg;C</p>
        <p>Humidity = {info.humidity}</p>
        <p>Min Temp = {info.tempMin}&deg;C</p>
        <p>Max Temp = {info.tempMax}&deg;C</p>
        <p>The Weather can be described as <i>{info.weather}</i> and feels like {info.feelslike}&deg;C</p>
        </Typography>
      </CardContent>
      
    </Card>
    </div>
    </div>)
}