/* eslint-disable global-require */
import MetaData from "./MetaData";

export default class RatingService {
  Data = new MetaData();

  async AddRating(guestSessionId, movieId, value) {
    try {
      const response = await fetch(
        `${this.Data.mainSource}movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
        {
          method: "POST",
          headers: {
            ...this.Data.metaData.headers,
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            value,
          }),
        }
      );

      const status = await response.json();
      const { success } = status;

      return success;
    } catch (error) {
      console.error("Ошибка при добавлении рейтинга:", error);
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getString = (str) => `${str.split(" ", 29).join(" ")}...`;

  async GetRating(guestSessionId, page) {
    const response = await fetch(
      `${this.Data.mainSource}guest_session/${guestSessionId}/rated/movies?&language=en-US&page=${page}&sort_by=created_at.asc`,
      this.Data.metaData
    );
    const toJSON = await response.json();
    const ratingList = await toJSON.results;
    const totalPages = await toJSON.total_pages;

    const { format } = require("date-fns");
    const Data = ratingList.map((el) => ({
      id: el.id,
      title: el.title,
      imgLink: el.poster_path,
      releaseDate: el.release_date.length
        ? format(new Date(el.release_date), "MMMM dd, yyyy")
        : "Unknown",
      description: this.getString(el.overview),
      rating: el.vote_average,
      genre: el.genre_ids,
      personalEstimate: el.rating,
    }));
    return { Data, totalPages };
  }
}
