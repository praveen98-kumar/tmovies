import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import './MovieGrid.scss'
import MovieCard from '../movie-card/MovieCard'
import Button, { OutlineButton } from '../button/Button'
import Input from '../input/Input'

const MovieSearch = props => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = React.useState(props.keyword ?? '')

    const goToSearch = React.useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`/${category[props.category]}/search/${keyword}`)
        }
    }, [keyword, props.category, navigate])

    React.useEffect(() => {
        const enterEvent = e => {
            e.preventDefault()
            if (e.code == 'Enter') {
                goToSearch()
            }
        }

        document.addEventListener("keyup", enterEvent)
        return () => {
            document.removeEventListener("keyup", enterEvent)
        }
    }, [keyword, goToSearch])

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch} >Search</Button>
        </div>
    )
}


const MovieGrid = (props) => {
    const [items, setItmes] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(0)
    const { keyword } = useParams()
    React.useEffect(() => {
        const getList = async () => {
            let response = null;

            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params })
                }
            } else {
                const params = {
                    query: keyword
                }

                response = await tmdbApi.search(props.category, { params })
            }

            setItmes(response.results)
            setTotalPage(response.total_pages)
        }
        getList()
    }, [props.category, keyword])

    const loadMore = async () => {
        let response = null;

        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params })
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }

            response = await tmdbApi.search(props.category, { params })
        }

        setItmes([...items, ...response.results])
        setPage(page + 1)
    }
    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className='movie-grid'>
                {
                    items.map((item, i) => (
                        <MovieCard category={props.category} key={item.id} item={item} />
                    ))
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore} >Load More</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

export default MovieGrid