import Carousel from 'react-bootstrap/Carousel';
import tcImage from '../../images/tcimage.jpg';
import tcImage2 from '../../images/tcimage3.jpg'
import tcImage3 from '../../images/tcimage4.jpg'

import './TitleCarousel.css'

function TitleCarousel() {
    return (
        <Carousel data-bs-theme="gold">
            <Carousel.Item>
                <img
                    className="d-block w-100 h-0"
                    src={tcImage}
                    alt="First slide"
                    width="30px"
                />
                <Carousel.Caption>
                    <div className='text'>
                        <h3>Мир Приключений</h3>
                        <p>Погрузитесь в захватывающие истории, которые перенесут вас в другие миры.</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={tcImage2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <div className='text'>

                        <h3>Классика Литературы</h3>
                        <p>Откройте для себя произведения, которые оставили след в сердцах читателей на протяжении веков.</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={tcImage3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <div className='text'>
                        <h3>Новые Бестселлеры</h3>
                        <p>
                            Не пропустите самые ожидаемые книги этого сезона – будьте в курсе литературных новинок!
                        </p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default TitleCarousel;