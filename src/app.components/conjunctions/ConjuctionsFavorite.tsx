import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import ConjuctionsFavroiteTable from './ConjuctionsFavroiteTable'

const ConjuctionsFavorite = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()

  const handleFavorite = (text) => {
    console.log(text)
  }

  return (
    <StyledWrapper>
      <form className="favorite-form" onSubmit={handleSubmit(handleFavorite)}>
        <input
          className="favorite-form-input"
          type="text"
          {...register('favorite')}
          placeholder="SatName or NorId"
        />
        <button type="submit">Search</button>
        {errors.favorite && <span>Favorite Field is Required</span>}
      </form>
      <ConjuctionsFavroiteTable />
    </StyledWrapper>
  )
}

export default ConjuctionsFavorite

const StyledWrapper = styled.div`
  .favorite-form {
    .favorite-form-input {
      margin-right: 10px;
    }
  }
`
