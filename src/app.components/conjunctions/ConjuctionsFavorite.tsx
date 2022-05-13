import React, { useState } from 'react'
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
      <ConjuctionsFavroiteTable inputValue={inputValue} watch={watch('favorite')} />
    </StyledWrapper>
  )
}

export default ConjuctionsFavorite

const StyledWrapper = styled.div`
  .favorite-form {
    margin-bottom: 10px;
    .favorite-form-input {
      margin-right: 10px;
    }
  }
`
