import { Layout, Pagination, Input, Tabs } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { Component } from 'react'

import MovieList from '../MovieList'
import RatedList from '../RatedList'
import './App.css'

export default class App extends Component {
  state = {
    search: 'return',
    page: '1',
  }
  pageHandler = (page) => {
    this.setState((state) => {
      if (state.page != page) {
        return { page }
      }
    })
  }

  inputHandler = (e) => {
    this.setState((state) => {
      if (state.search != e.target.value) {
        return { search: e.target.value }
      }
    })
  }

  render() {
    const { search, page } = this.state
    return (
      <Layout className="layout">
        <Content className="content">
          <Tabs centered destroyInactiveTabPane={true}>
            <Tabs.TabPane tab="Search" key={1}>
              <Input
                placeholder="Type to search..."
                style={{ marginBottom: '20px' }}
                onPressEnter={this.inputHandler}
              />
              <MovieList search={search} page={page} />
              <Pagination total={50} style={{ margin: '20px', textAlign: 'center' }} onChange={this.pageHandler} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rated" key={2}>
              <RatedList />
            </Tabs.TabPane>
          </Tabs>
        </Content>
      </Layout>
    )
  }
}
