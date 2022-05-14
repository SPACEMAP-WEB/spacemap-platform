/* eslint-disable @typescript-eslint/comma-dangle */
import {
  favoriteDataRefactor,
  favoriteFindDataRefactor,
} from '@app.feature/conjunctions/module/favoriteDataRefactor'
import { useQueryFavorite } from '@app.feature/conjunctions/query/useQueryFavorite'
import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.modules/types/conjunctions'
import React, { useEffect, useState } from 'react'
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
  const [tableData, setTableData] = useState<FavoriteColumnType[]>([])
  const [bookmarkData, setBookmarkData] = useState<FavoriteColumnType[]>([])

  const handleFavorite = (filed: { favorite: string }) => {
    setInpuValue(filed.favorite.trim())
  }

  const { data: favoriteData, isLoading, isSuccess } = useQueryFavorite(inputValue)

  const props = {
    favoriteData,
    isLoading,
    isSuccess,
    tableData,
    bookmarkData,
    setBookmarkData,
  }

  useEffect(() => {
    if (isSuccess) {
      const newData = inputValue
        ? favoriteFindDataRefactor(favoriteData as FavoriteFindDataType[])
        : favoriteDataRefactor(favoriteData as FavoriteDataType)
      setTableData(newData)
      if (!inputValue) setBookmarkData(newData)
    }
  }, [favoriteData])

  if (isLoading) return null

  return (
    <>
      {isSuccess && (
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
          <ConjuctionsFavoriteTable inputValue={inputValue} {...props} />
        </StyledWrapper>
      )}
    </>
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
