import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import ConjuctionsFavoriteTable from './ConjuctionsFavroiteTable'

const ConjuctionsFavorite = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const [inputValue, setInpuValue] = useState('')

  const handleFavorite = (filed: { favorite: string }) => {
    setInpuValue(filed.favorite.trim())
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
      <ConjuctionsFavoriteTable inputValue={inputValue} />
    </StyledWrapper>
  )
}

export default ConjuctionsFavorite

const StyledWrapper = styled.div`
  margin-top: 10px;
  .favorite-form {
    margin-bottom: 10px;
    .favorite-form-input {
      margin-right: 10px;
    }
  }
`
