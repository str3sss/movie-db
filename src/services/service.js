import { genres } from './genres'

class MovieAPI {
  // eslint-disable-next-line no-undef
  _apiKey = process.env.REACT_APP_API_KEY
  _apiBase = 'https://api.themoviedb.org/3/'

  async getResoure(url, param = {}) {
    const res = await fetch(`${this._apiBase}${url}?api_key=${this._apiKey}&` + new URLSearchParams(param))
    if (!res.ok) {
      throw new Error(res.status)
    }
    return await res.json()
  }

  async searchMovies(query, page = 1) {
    const res = await this.getResoure('search/movie', { query, page })
    return res.results.map(this._transformSearch)
  }

  cutDescription = (description, maxLenght = 80) => {
    const newDesc = description.substr(0, maxLenght)
    return newDesc.substr(0, Math.min(newDesc.length, newDesc.lastIndexOf(' '))) + '...'
  }

  _transformSearch = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      genres: this._transformGenres(movie.genre_ids),
      img: movie.poster_path,
      releaseDate: movie.release_date,
      description: this.cutDescription(movie.overview),
      rate: this.getRate(movie.id),
      voteAverage: movie.vote_average,
    }
  }

  _transformGenres = (genresIDs) => {
    const genresNames = genresIDs.map((genreID) => {
      for (let item of genres) {
        if (item.id == genreID) {
          return item.name
        }
      }
    })
    return genresNames
  }

  getRate = (id) => {
    if (localStorage.rated) {
      for (let key of JSON.parse(localStorage.rated)) {
        if (key.id == id) {
          return key.rate
        }
      }
      return 0
    }
  }
}

export const MovieService = new MovieAPI()
