import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import Like from './common/like';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4
    };

    componentDidMount(){
        this.setState({ movies: getMovies(), genres: getGenres() });
    }

    handleDelete = movie => {
       const movies = this.state.movies.filter(m => m._id !== movie._id);
       this.setState({ movies })
    };
    handleLike = (movie) => {
        //clone the movies array
        const movies = [...this.state.movies];
        //find the index of that object and store into index constant
        const index = movies.indexOf(movie);
        //set movies index to a new object and clone the object
        movies[index] = {...movies[index]};
        //to change the movie state just toggle it
        movies[index].liked = !movies[index].liked;
        //set the state of movies
        this.setState({ movies });
        
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };
    handleGenreSelect = genre => {
        //console.log(genre)
        this.setState({ selectedGenre: genre });
    }

    render(){
        const {length: count} = this.state.movies;
        const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;

        if (count === 0) return <p>There are no movies in the databse.</p>
        
        const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const movies = paginate(filtered, currentPage, pageSize)
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                       items={this.state.genres}
                       selectedItem={this.state.selectedGenre}
                       onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                <p>Showing {filtered.length} movies in the database. </p>
                    <table className="table"> 
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                    <th></th>
                </tr>
                </thead>
              <tbody>
                {movies.map(movie => (
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                    <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>))}
                
              </tbody>
              </table>
                <Pagination 
                itemsCount={filtered.length} 
                pageSize={pageSize} 
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
                />
                </div>     
            </div>
        
    
        );
    }
}

export default Movies;