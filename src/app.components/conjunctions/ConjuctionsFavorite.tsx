import { FavoriteColumnType } from '@app.modules/types/conjunctions'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Column } from 'react-table'
import styled from 'styled-components'

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

  const COLUMNS: Column<FavoriteColumnType>[] = [
    { Header: 'NoradId', accessor: 'noradId' },
    { Header: 'SatName', accessor: 'satName' },
  ]

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
