import React from 'react';
import { CarouselItem } from 'react-bootstrap';
import TitleCarousel from '../../components/Carousel/TitleCarousel';
import './HomePage.css'
import ExploreBook from '../../components/ExploreBook/ExploreBook';
import LatestBooks from '../../components/LatestBook/LatestBook';
import TopRatedBooks from '../../components/TopRatedBooks/TopRatedBooks';
function HomePage() {
    return (
        <div className='container'>
            <TitleCarousel />
            <LatestBooks/>
            <TopRatedBooks/>
            <ExploreBook/>
        </div>
    );
}

export default HomePage;
