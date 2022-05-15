import React, { useEffect, forwardRef } from 'react'

interface IndeterminateCheckboxProps {
  row: any
  indeterminate?: boolean
  disabled?: boolean
}

const useCombinedRefs = (...refs: any[]): React.MutableRefObject<any> => {
  const targetRef = React.useRef()

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = React.useRef(null)
    const combinedRef = useCombinedRefs(ref, defaultRef)

    useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false
      }
    }, [combinedRef, indeterminate])

    return <input type="checkbox" ref={combinedRef} {...rest} />
  }
)

export default IndeterminateCheckbox
