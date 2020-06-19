import React, { Component } from 'react'
import './DisplayMovieData.css'

//export default class DisplayMovieData extends Component {
export default function DisplayMovieData(props) {

    try{
        let { movieData } = props;
        
        if(movieData !== null)
        {
            let { Released, Genre, Director, Writer,
            Actors, Plot, Language, Poster, imdbRating, imdbVotes,
            Ratings, Production} = movieData;

            const ratings = Ratings.map((rating) =>
                <li><span>{rating.Source}:</span> {rating.Value} </li>
                );
            return (
                <div className="movie-data"> 
                    <div className="row">
                        <div className="col-sm-12 col-md-7">
                            <ul className="list-group">
                                <li className="list-group-item">             
                                    <span>IMDB Rating:</span> { imdbRating }
                                </li> 
                                <li className="list-group-item">
                                <span>IMDB Votes:</span> { imdbVotes }
                                </li> 
                                <li className="list-group-item">
                                <span>Ratings:</span>
                                    <ul style={{ listStyleType: "none"}}>
                                        { ratings}
                                    </ul>
                                </li> 
                                <li className="list-group-item">
                                <span>Actors:</span> { Actors }
                                </li> 
                                <li className="list-group-item">
                                <span>Plot:</span> { Plot }
                                </li>  
                                <li className="list-group-item">
                                <span>Released:</span> { Released }
                                </li> 
                                <li className="list-group-item">
                                <span>Genre:</span> { Genre }
                                </li> 
                                <li className="list-group-item">
                                <span>Director:</span> { Director }
                                </li> 
                                <li className="list-group-item">
                                <span>Writer:</span> { Writer }
                                </li> 
                                <li className="list-group-item">
                                <span>Language:</span> { Language }
                                </li> 
                                <li className="list-group-item">
                                <span>Production:</span> { Production }
                                </li> 
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <img className="poster" src={Poster} alt="Poster"/>
                        </div>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className="movie-data"> 
                    <div className="row">
                        <div className="col-sm-12 col-md-7">
                            <ul className="list-group">
                                <li className="list-group-item">             
                                    <span>IMDB Rating:</span>                             </li> 
                                <li className="list-group-item">
                                <span>IMDB Votes:</span> 
                                </li> 
                                <li className="list-group-item">
                                <span>Ratings:</span>
                                    <ul style={{ listStyleType: "none"}}>
                                        
                                    </ul>
                                </li> 
                                <li className="list-group-item">
                                <span>Actors:</span> 
                                </li> 
                                <li className="list-group-item">
                                <span>Plot:</span> 
                                </li>  
                                <li className="list-group-item">
                                <span>Released:</span>
                                </li> 
                                <li className="list-group-item">
                                <span>Genre:</span> 
                                </li> 
                                <li className="list-group-item">
                                <span>Director:</span> 
                                </li> 
                                <li className="list-group-item">
                                <span>Writer:</span> 
                                </li> 
                                <li className="list-group-item">
                                <span>Language:</span>
                                </li> 
                                <li className="list-group-item">
                                <span>Production:</span> 
                                </li> 
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <div className="empty-poster">
                                        Movie Poster
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    catch(err)
    {
        return (
            <div style={{marginLeft:'2rem', paddingLeft:'2rem'}}>
                {err.message}
            </div>
        )
    }

}
 