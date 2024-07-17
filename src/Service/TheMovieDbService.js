/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-class-component-methods */
import { Component } from "react";
import MovieServiceDB from "../Services/MovieService";
import GuestSessionServiceDB from "../Services/GuestSessionService";
import RatingServiceDB from "../Services/RatingService";
import GenresServiceDB from "../Services/GenresService";

export default class TheMovieDbService extends Component {
  constructor() {
    super();
    this.MovieService = new MovieServiceDB();
    this.GuestSessionService = new GuestSessionServiceDB();
    this.RatingService = new RatingServiceDB();
    this.GenresService = new GenresServiceDB();
  }

  getMovies = (currentPage, searchWord) =>
    this.MovieService.getMovies(currentPage, searchWord);

  Authorization = () => this.GuestSessionService.Authorization();

  AddRating = (guestSessionId, movieId, value) =>
    this.RatingService.AddRating(guestSessionId, movieId, value);

  GetRating = (guestSessionId, pageNumber) =>
    this.RatingService.GetRating(guestSessionId, pageNumber);

  GetGenres = () => this.GenresService.GetGenres();
}
