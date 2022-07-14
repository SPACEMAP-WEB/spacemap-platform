export type czml = {
  id?: string
  name?: string
  availability?: string | string[]
  description?: string
  polyline?: {
    show?: boolean
    width?: number
    material?: {
      polylineOutline?: {
        color?: { interval?: string; rgba?: number[] }[]
        outlineColor?: {
          rgba?: number[]
        }
        outlineWidth?: number
      }
    }
    arcType?: string
    positions?: {
      references?: string[]
    }
  }
  billboard?: {
    show: boolean
    image: string
  }
  label?: {
    fillColor?: {
      rgba?: number[]
    }
    font?: string
    horizontalOrigin?: string
    outlineColor?: {
      rgba?: number[]
    }
    outlineWidth?: number
    pixelOffset?: {
      cartesian2?: number[]
    }
    show?: boolean
    style?: string
    text?: string
    verticalOrigin?: string
  }
  model?: {
    show?: boolean
    minimumPixelSize?: number
  }
  path?: {
    material?: {
      polylineOutline?: {
        color?: {
          rgba?: number[]
        }
        outlineColor?: {
          rgba?: number[]
        }
        outlineWidth?: number
      }
    }
    width?: number
    leadTime?: number
    trailTime?: number
    resolution?: number
  }
  position?: {
    interpolationAlgorithm?: string
    interpolationDegree?: number
    referenceFrame?: string
    epoch?: string
    cartesian?: number[]
  }
  point?: {
    show?: boolean
    color?: {
      rgba?: number[]
    }
    outlineColor?: {
      rgba?: number[]
    }
    outlineWidth?: number
    pixelSize?: number
  }
  cylinder?: {
    length?: number
    topRadius?: number
    bottomRadius?: number
    material?: {
      solidColor?: {
        color?: {
          rgba?: number[]
        }
      }
    }
  }
}
