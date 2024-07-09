import MetaData from "./MetaData";

export default class MovieService {
  Data = new MetaData();

  // eslint-disable-next-line class-methods-use-this
  async GetResource(pageNumber, searchWord) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false&language=en-US&page=${pageNumber}`,
      this.Data.metaData
    );
    const pageResults = await response.json();
    const totalPages = await pageResults.total_pages;
    const movieList = await pageResults.results;

    return { movieList, totalPages };
  }

  // eslint-disable-next-line class-methods-use-this
  getString = (str) => `${str.split(" ", 29).join(" ")}...`;

  async getMovies(pageNumber, searchWord) {
    // eslint-disable-next-line global-require
    const { format } = require("date-fns");
    const { movieList, totalPages } = await this.GetResource(
      pageNumber,
      searchWord
    );

    const Data = movieList.map((el) => ({
      id: el.id,
      title: el.title,
      imgLink: el.poster_path,
      releaseDate: el.release_date.length
        ? format(new Date(el.release_date), "MMMM dd, yyyy")
        : "Unknown",
      description: this.getString(el.overview),
      rating: el.vote_average,
      genre: el.genre_ids,
      personalEstimate: 0,
    }));

    return { movieList: Data, totalPages };
  }
}
