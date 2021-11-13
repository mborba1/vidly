import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import Like from './common/like';

class Movies extends Component {
    state = {
        movies: getMovies(),
        currentPage: 1,
        pageSize: 4
    };

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
    }

    render(){
        const {length: count} = this.state.movies;
        const { pageSize, currentPage } = this.state;

        if (count === 0) return <p>There are no movies in the databse.</p>

        return (
            <React.Fragment>
                <p>Showing {count} movies in the database. </p>
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
                {this.state.movies.map(movie => (
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
               itemsCount={count} 
               pageSize={pageSize} 
               onPageChange={this.handlePageChange}
               currentPage={currentPage}
               />
            </React.Fragment>
        
    
        );
    }
}

export default Movies;