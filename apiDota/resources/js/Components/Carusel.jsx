// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
//import img from '../../../public/img/dota pjs'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carrucel=() =>{

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    > 
    
      <SwiperSlide> <img src= 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lina.png' className="w-64 h-64"></img> </SwiperSlide>
      <SwiperSlide> <img src= "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lion.png" className="w-64 h-64"></img>  </SwiperSlide>
      <SwiperSlide> <img src= "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lone_druid.png" className="w-64 h-64"></img> </SwiperSlide>
      <SwiperSlide> <img src= "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/luna.png" className="w-64 h-64"></img>  </SwiperSlide>
      <SwiperSlide> <img src= "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lycan.png" className="w-64 h-64"></img>  </SwiperSlide>
      <SwiperSlide> <img src= "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/magnataur.png" className="w-64 h-64"></img>  </SwiperSlide>
      <SwiperSlide> <img src= "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/marci.png" className="w-64 h-64"></img>  </SwiperSlide>
    </Swiper>
  );
};

export default Carrucel;
