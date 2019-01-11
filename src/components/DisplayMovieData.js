import React, { Component } from 'react'

export default class DisplayMovieData extends Component {

    render() { 

        let { movieData } = this.props;

        if(movieData != null)
        {
            let {Title, Year, Released, Genre, Director, Writer,
            Actors, Plot, Language, Poster, imdbRating, imdbVotes,
        Ratings, Production} = movieData;

        const ratings = Ratings.map((rating) =>
            <li>{rating.Source}:{rating.Value} </li>
            );
        return (
        <div> 
            <ul>
                { ratings}
            </ul>
           <br/>               
           IMDB Rating: { imdbRating }
           <br/>
           IMDB Votes: { imdbVotes }
           <br/>
           Title: { Title }
           <br/>
           Year: { Year }
           <br/>
           Released: { Released }
           <br/>
           Genre: { Genre }
           <br/>
           Director: { Director }
           <br/>
           Writer: { Writer }
           <br/>
           Actors: { Actors }
           <br/>
           Plot: { Plot }
           <br/>
           Language: { Language }
           <br/>
           <img src={Poster} alt="" height="auto" width="100px"/>
           <br/>
           Production: { Production }
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
