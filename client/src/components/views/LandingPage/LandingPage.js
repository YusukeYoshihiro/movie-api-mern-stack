import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import { Typography, Row } from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from '../NavBar/Sections/GridCard';
import { set } from 'mongoose';
const { Title } = Typography;

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)

    }, [])

    const fetchMovies = (path) => {

        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
    }

    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endpoint);
    }

    return (
        <div style={{ width: '100%', margin: 0 }} >
            {/* Movie Main Image  
               • we need to put three props into MainImage component "image(url)", "title","text" 
               • we must contain <MainImage•••••/> inside of { Movie[0]&& }, otherwise it will show err like " backdrop_path undefined "
            */}

            {Movies[0] &&
                <MainImage image={`${IMAGE_URL}/w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`} title={Movies[0].original_title} text={Movies[0].overview} />
            }

            {/*<MainImage image={`${IMAGE_URL}/w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`} title={Movies[0].original_title} text={Movies[0].overview} />*/}

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Title level={2} > Movies by latest</Title>
                <hr />

                {/* Grid Cards 
                    • we need to put two props into GridCard Component "image = url", "movieID"
                    • "image" props must write {movie.poster_path && `${..}size{movie.poster_path}}, because rendering speed is faster than fetching the path speed.  
                */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieID={movie.id}
                            />
                        </React.Fragment>
                    ))}


                </Row>

                {/* Load More Button */}
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={handleClick}> Load More</button>
                </div>

            </div>

        </div>
    )
}

export default LandingPage
