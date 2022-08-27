import { Component } from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.min.css'
import { Pagination, List, Card, Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
// import MovieAPI from './service'

const data = [
  { title: 'First' },
  { title: 'Second' },
  { title: 'Third' },
  { title: 'Fourth' },
  { title: 'Fiveth' },
  { title: 'Sixth' },
]

class App extends Component {
  state = {
    title: 'title',
    date: 'March 5, 2020',
    description: 'description',
    genres: ['Action', 'Drama'],
  }

  render() {
    return (
      <Layout
        style={{
          backgroundColor: '#F7F7F7',
          height: '100vh',
          paddingLeft: '20rem',
          paddingRight: '20rem',
        }}
      >
        <Content
          style={{
            backgroundColor: 'white',
            paddingTop: '21px',
            paddingLeft: '2rem',
            paddingRight: '2rem',
          }}
        >
          <List
            grid={{ gutter: 36, column: 2 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.title}
                  style={{
                    filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15))',
                    minHeight: '280px',
                    minWidth: '250px',
                  }}
                >
                  desc
                </Card>
              </List.Item>
            )}
          />
          <Pagination total={50} style={{ margin: 'auto', textAlign: 'center' }} />
        </Content>
      </Layout>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)
