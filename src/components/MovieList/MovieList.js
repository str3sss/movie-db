import { List, Alert, Pagination } from 'antd'
import { Component } from 'react'

import { MovieService } from '../../services/service'
import Spinner from '../Spiner/Spinner'
import Movie from '../Movie/Movie'

export default class MovieList extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    MovieService.searchMovies('return')
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
      MovieService.searchMovies(this.props.search, this.props.page)
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
      <>
        <List
          className="list"
          grid={{
            gutter: 16,
            xxl: 2,
            xl: 2,
            lg: 2,
            md: 2,
            sm: 1,
            xs: 1,
          }}
          dataSource={data}
          renderItem={(item) => <Movie item={item} />}
        ></List>
        {data.length !== 0 && (
          <Pagination total={50} style={{ margin: '20px', textAlign: 'center' }} onChange={this.props.pageHandler} />
        )}
      </>
    )
  }
}
