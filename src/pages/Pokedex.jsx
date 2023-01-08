import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListPokemons from '../components/ListPokemons'
import "./styles/Pokedex.css"

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    const [types, setTypes] = useState([])
    const [namePokemon, setNamePokemon] = useState("")

    const nameTrainer = useSelector(state => state.nameTrainer)

    const handleSubmit = (e) => {
      e.preventDefault()
      const name = e.target.namePokemon.value
      setNamePokemon(name)
    }

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/pokemon/?limit=30"
        axios.get(URL)
            .then(res => setPokemons(res.data.results))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      const URL = "https://pokeapi.co/api/v2/type/"
      axios.get(URL)
        .then(res => setTypes(res.data.results))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      const newPokemons = pokemons.filter(pokemon => pokemon.name.includes(namePokemon))
      setPokemonsFilter(newPokemons)
    }, [namePokemon])

  return (
    <main>
        <header>
            <h1>Pokedex</h1>
            <p>Welcome <span>{nameTrainer}</span>, here you can find your favorite pokemon</p>
            <form onSubmit={handleSubmit} classname='pokedex_form'>
              <div className='pokedex_search'>
                <input type="text" id='namePokemon' />
                <button type='submit'>Search</button>
              </div>
              <select className='pokedex_select'>
                <option value="">All pokemons</option>
              {
                types.map(type => <option value={type.name} key={type.url}>{type.name}</option>)
              }
              </select>
            </form>
        </header>
        <ListPokemons pokemons={pokemonsFilter}/>
    </main>
  )
}

export default Pokedex
