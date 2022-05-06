import React, { createContext, Dispatch, useReducer } from 'react'

type MenuContextType = {
  state: MenuStateType
  dispatch: Dispatch<MenuActionType>
}

type MenuStateType = {
  isConjunctionsClicked: boolean
  isLaunchConjunctionsClicked: boolean
}

type MenuActionType =
  | { type: 'UPDATE_CONJUCTIONS_CLICKED'; payload: boolean }
  | { type: 'UPDATE_LAUNCH_CONJUCTIONS_CLICKED'; payload: boolean }

export const MenuContext = createContext<MenuContextType>({} as MenuContextType)

const reducer = (state: MenuStateType, action: MenuActionType): MenuStateType => {
  switch (action.type) {
    case 'UPDATE_CONJUCTIONS_CLICKED':
      return {
        isConjunctionsClicked: action.payload,
        isLaunchConjunctionsClicked: false,
      }
    case 'UPDATE_LAUNCH_CONJUCTIONS_CLICKED':
      return {
        isConjunctionsClicked: false,
        isLaunchConjunctionsClicked: action.payload,
      }
    default:
      return state
  }
}

const initialState = {
  isConjunctionsClicked: false,
  isLaunchConjunctionsClicked: false,
}

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <MenuContext.Provider value={{ state, dispatch }}>{children}</MenuContext.Provider>
}

export default MenuProvider
