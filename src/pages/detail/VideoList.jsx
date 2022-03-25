import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import tmdbApi from '../../api/tmdbApi'

const Video = (props) => {

    const item = props.item
    const ref = useRef(null)
    useEffect(() => {
        const height = ref.current.offsetWidth * 9 / 16 + 'px';
        ref.current.setAttribute("height", height)
    }, [])
    return (
        <div className='video'>
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>

            <iframe ref={ref} src={`https://www.youtube.com/embed/${item.key}`} width='100%' title='video' ></iframe>
        </div>
    )
}

const VideoList = (props) => {
    const { category } = useParams()

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, props.id)
            setVideos(res.results.slice(0, 5))
        }

        getVideos()
    }, [category, props.id])
    return (
        <>
            {
                videos.map((video, i) => (
                    <Video key={i} item={video} />
                ))
            }
        </>
    )
}



export default VideoList