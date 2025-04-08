import React from 'react'
import HeroSection from './HeroSection'

import iphone from '../../assets/iphone-14-pro.webp'
import mac from '../../assets/mac-system-cut.jfif'
import FeaturedProducts from './FeaturedProducts';

const ho = [
  {
  title: "Buy iPhone 14",
  subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illum qui voluptates quos, error porro.",
  link: "",
  image: iphone
},
{
  title: "Macbook is Great!",
  subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illum qui voluptates quos, error porro.",
  link: "",
  image: mac
},
];

const HomePage = () => {
  return (
    <div>
        <HeroSection title={ho[0].title} subtitle={ho[0].subtitle} link={ho[0].link} image={ho[0].image}/>
        <FeaturedProducts/>
        <HeroSection title={ho[1].title} subtitle={ho[1].subtitle} link={ho[1].link} image={ho[1].image}/>
    </div>
  )
}

export default HomePage