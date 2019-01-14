import React, { Component } from 'react'
import './DisplayMovieData.css'

export default class DisplayMovieData extends Component {

    render() { 

        let { movieData } = this.props;

        if((movieData != null))
        {
            let {Title, Year, Released, Genre, Director, Writer,
            Actors, Plot, Language, Poster, imdbRating, imdbVotes,
        Ratings, Production} = movieData;

        const ratings = Ratings.map((rating) =>
            <li><span>{rating.Source}:</span> {rating.Value} </li>
            );
        return (
        <div> 
            <div className="row">
                <div className="col-md-7 movie-data">
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
                        <span>Title:</span> { Title }
                        </li> 
                        <li className="list-group-item">
                        <span>Year:</span> { Year }
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
                        <span>Actors:</span> { Actors }
                        </li> 
                        <li className="list-group-item">
                        <span>Plot:</span> { Plot }
                        </li> 
                        <li className="list-group-item">
                        <span>Language:</span> { Language }
                        </li> 
                        <li className="list-group-item">
                        <span>Production:</span> { Production }
                        </li> 
                    </ul>
                </div>
                <div className="col-md-5">
                    <img src={Poster} alt="" height="auto" width="100%"/>
                </div>
            </div>
        </div>
        )
    }
    else
    return (
        <div>
            Error
        </div>
    )
  }
}
