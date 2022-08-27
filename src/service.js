export default class MovieAPI {
  _apiKey = '58a2e6696802a02e51a5b297dca114ea'
  _apiBase = 'https://api.themoviedb.org/3/'

  async getResoure(url, param = {}) {
    const res = await fetch(`${this._apiBase}${url}?api_key=${this._apiKey}&` + new URLSearchParams(param))
    if (!res.ok) {
      throw new Error(res.status)
    }
    return await res.json()
  }

  async searchMovies(query) {
    const res = await this.getResoure('search/movie', { query })
    return await res.results
  }
}
