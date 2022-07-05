import { SecondaryButton } from '@app.components/button/Button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import FavoritesSubscriptionTable from './FavoritesSubscriptionTable'

const FavoritesSubscription = ({ login }: { login: boolean }) => {
  const [inputValue, setInputValue] = useState('')
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const handleFavorite = (filed: { favorite: string }) => {
    login ? setInputValue(filed.favorite.trim()) : alert('login is Required')
  }

  return (
    <StyledWrapper>
        <form className="favorite-form" onSubmit={handleSubmit(handleFavorite)}>
          <input
            className="favorite-form-input"
            type="text"
            {...register('favorite')}
            placeholder="Search Your Satellites"
          />
          <SecondaryButton width={80} height={30} type="submit">Search</SecondaryButton>
          {errors.favorite && <span>Favorite Field is Required</span>}
        </form>
        <FavoritesSubscriptionTable inputValue={inputValue} />
    </StyledWrapper>
  )
}

export default FavoritesSubscription

const StyledWrapper = styled.div`
  text-align: center;
  .favorite-form {
    margin-bottom: 10px;
    width: 300px;
    display: flex;
    gap: 1rem;
    .favorite-form-input {
      margin-right: 5px;
      border: none;
      border-radius: 5px;
      width: 100%;
      height: 30px;
      background-color: rgba(149, 149, 149, 0.4);
      color: rgba(255, 255, 255, 0.8);
      font-size: 15px;
      padding: 7px;
      ::placeholder {
        color: white;
        opacity: 0.5;
      }
    }
  }
  .login-required {
    color: white;
    border: 2px dashed gray;
    padding: 2rem;
    font-size: 20px;
    font-weight: bold;
    font-family: 'SpoqaHanSansNeo';
  }
`
