import React from 'react'

const MovieContext = React.createContext({
  activeRoute: '',
  onChangeRoute: () => {},
})

export default MovieContext
