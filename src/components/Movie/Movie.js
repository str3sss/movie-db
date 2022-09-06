import { List, Card, Rate, Typography } from 'antd'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { voteAverageColor } from '../../Services/service'
import './Movie.css'

const Movie = ({ item }) => {
  const returnRate = (id) => {
    let rated = localStorage.getItem('rated')
    if (rated) {
      rated = JSON.parse(localStorage.rated)
      for (let key of rated) {
        if (key.id == id) {
          console.log(item.title)
          console.log(item)
          return key.rate
        }
      }
    } else {
      return 0
    }
  }

  const [rate, setRate] = useState(returnRate(item.id))

  const changeRate = (Value) => {
    let rated = localStorage.getItem('rated')
    if (!rated) {
      const newItem = { ...item, rate: Value }
      localStorage.setItem('rated', '[' + JSON.stringify(newItem) + ']')
    } else {
      rated = JSON.parse(localStorage.rated)
      for (let key of rated) {
        if (key.id == item.id) {
          key.rate = Value
        }
      }
      localStorage.rated = JSON.stringify(rated)
    }
    setRate(Value)
  }

  const genres = item.genres.map((genre) => {
    return (
      <Typography.Text row={1} key={uuidv4()} code>
        {genre}
      </Typography.Text>
    )
  })
  return (
    <List.Item>
      <Card
        hoverable
        style={{
          filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15))',
          objectFit: 'cover',
          minHeight: '200px',
          minWidth: '350px',
          maxHeight: '280px',
          margin: '5px',
        }}
      >
        <img width={'25%'} height={'200px'} alt="logo" src={`https://image.tmdb.org/t/p/w500/${item.img}`} />
        <Card.Grid hoverable={false} style={{ width: '75%', textAlign: 'left' }}>
          {item.title}
          <div style={{ borderColor: voteAverageColor(item.voteAverage) }} className="voteAverage">
            {item.voteAverage}
          </div>
          <div className="genresList ">{genres}</div>
          <Typography.Text>{item.description}</Typography.Text>
          <br />
          <Rate allowHalf count={10} defaultValue={rate} onChange={(Value) => changeRate(Value)} />
        </Card.Grid>
      </Card>
    </List.Item>
  )
}

export default Movie
