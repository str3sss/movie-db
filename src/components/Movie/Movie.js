import { List, Card, Rate, Typography, Image } from 'antd'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { voteAverageColor } from '../../helpers/colors'
import './Movie.css'

const Movie = ({ item }) => {
  const [ls, setLs] = useState(localStorage.rated || '')

  const onChangeCallBack = (value) => {
    item.rate = value
    if (localStorage.rated) {
      const rated = JSON.parse(localStorage.rated)
      for (let key of rated) {
        if (key.id == item.id) {
          key.rate = value
          localStorage.rated = JSON.stringify(rated)
          setLs(localStorage.rated)
          return
        }
      }
      rated.push(item)
      localStorage.rated = JSON.stringify(rated)
    } else {
      localStorage.rated = '[' + JSON.stringify(item) + ']'
    }
    setLs(localStorage.rated)
  }

  const genres = item.genres.map((genre) => {
    return (
      <Typography.Text row={1} key={uuidv4()} code>
        {genre}
      </Typography.Text>
    )
  })
  return (
    <List.Item ls={ls}>
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
        <Image
          width={'25%'}
          height={'200px'}
          src={`https://image.tmdb.org/t/p/w500/${item.img}`}
          fallback="https://ne-vkl.ru/images/placeholder.png"
        />
        <Card.Grid hoverable={false} style={{ width: '75%', textAlign: 'left' }}>
          {item.title}
          <div style={{ borderColor: voteAverageColor(item.voteAverage) }} className="voteAverage">
            {item.voteAverage}
          </div>
          <div className="genresList ">{genres}</div>
          <Typography.Text>{item.description}</Typography.Text>
          <br />
          <Rate allowHalf count={10} value={item.rate} onChange={(value) => onChangeCallBack(value)} />
        </Card.Grid>
      </Card>
    </List.Item>
  )
}

export default Movie
