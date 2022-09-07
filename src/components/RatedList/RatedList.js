import { List } from 'antd'
import { Component } from 'react'

import Movie from '../Movie/Movie'

export default class RatedList extends Component {
  state = {
    data: localStorage.rated ? JSON.parse(localStorage.rated) : [],
  }
  render() {
    return (
      <List
        className="list"
        grid={{
          gutter: 16,
          xxl: 2,
          xl: 1,
        }}
        dataSource={this.state.data}
        renderItem={(item) => <Movie item={item} />}
      ></List>
    )
  }
}
