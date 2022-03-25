import React from 'react'
import './HeroSlide.scss'
import { useNavigate } from 'react-router-dom'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import tmdbApi, { category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import Button, { OutlineButton } from '../button/Button'
import Modal, { ModalContent } from '../modal/Modal'

const HeroSlideItem = props => {
    const item = props.item;
    const navigate = useNavigate()
    const bg = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id)

        if (videos.results.length > 0) {
            const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`

            modal.querySelector('.modal__content > iframe').setAttribute("src", videoSrc)
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer'
        }

        modal.classList.toggle('active')
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${bg})` }
            }
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className='title'>{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate(`/movie/${item.id}`)} >Watch Now</Button>
                        <OutlineButton onClick={setModalActive}>Watch Trailer</OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} alt={item.title} />
                </div>
            </div>
        </div >
    )
}


const TrailerModal = props => {
    const item = props.item;

    const iframeRef = React.useRef(null)
    const onClose = () => iframeRef.current.setAttribute('src', '')
    return (
        <Modal active={false} id={`modal_${item.id}`} >
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer" ></iframe>
            </ModalContent>
        </Modal>
    )
}


const HeroSlide = () => {

    SwiperCore.use([Autoplay])
    const [movies, setMovies] = React.useState([])

    React.useEffect(() => {
        const getMovies = async () => {
            const params = {
                page: 1,
            }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params })
                setMovies(response.results.slice(0, 9))
            } catch (error) {
                console.error('err', error)
            }
        }

        getMovies()
    }, [])

    return (
        <div className='hero-slide'>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                grabCursor={true}
                modules={[Autoplay]}
            // autoplay={{ delay: 1000 }}
            >
                {
                    movies.map((movie, i) => <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem item={movie} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>)
                }
            </Swiper>

            {
                movies.map((item, index) => (
                    <TrailerModal key={index} item={item} />
                ))
            }
        </div>
    )
}

export default HeroSlide