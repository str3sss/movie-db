const AVERAGE = {
  BAD: '#E90000',
  NORMAL: '#E97E00',
  GOOD: '#E9D100',
  PERFECT: '#66E900',
}

export const voteAverageColor = (voteAverage) => {
  if (voteAverage <= 3) return AVERAGE.BAD
  else if (voteAverage <= 5) return AVERAGE.NORMAL
  else if (voteAverage <= 7) return AVERAGE.GOOD
  else return AVERAGE.PERFECT
}
