import { List, Alert } from 'antd'
import { Component } from 'react'

import MovieAPI from '../../services/service'
import Spinner from '../Spiner/Spinner'
import Movie from '../Movie/Movie'

export default class MovieList extends Component {
  movieAPI = new MovieAPI()

  state = {
    data: null,
  }

  componentDidMount() {
    this.movieAPI
      .searchMovies('return')
      .then((data) => {
        this.setState({
          data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search || this.props.page !== prevProps.page) {
      this.movieAPI
        .searchMovies(this.props.search, this.props.page)
        .then((data) => {
          this.setState({
            data,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  componentDidCatch(error) {
    return <Alert>Error: {error}</Alert>
  }

  render() {
    const { data } = this.state
    if (!data) {
      return <Spinner />
    }
    return (
      <List
        className="list"
        grid={{
          gutter: 16,
          xxl: 2,
          xl: 1,
        }}
        dataSource={data}
        renderItem={(item) => <Movie item={item} />}
      ></List>
    )
  }
}
