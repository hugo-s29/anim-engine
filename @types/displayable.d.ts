import Color from '../src/util/color'
import Displayable from '../src/displayables/displayable'
import Vector from '../src/util/vector'
import Matrix from '../src/util/matrix'

export namespace IDisplayable {
  export type IParams = {
    fill?: Color
    border?: IBorder
    subdisplayables?: Displayable[]
    mat?: Matrix
    path?: string
    parent?: Displayable | null
    opacity?: number
  }

  export type IBorder = {
    color: Color
    weight: number
  }

  export type ITexParams = {
    fill?: Color
    border?: IBorder
    value: string
  }

  export type ISVGParams = {
    url: string
  }

  export namespace IShapes {
    export type IParams = {
      fill?: Color
      border?: IBorder
      mat?: Matrix
      opacity?: number
    }

    export type IPolygonParams = IParams & {
      points: Vector[]
    }

    export type ITriangleParams = IParams & {
      width: number
    }

    export type ISquareParams = IParams & {
      width: number
    }

    export type IRectangleParams = IParams & {
      width: number
      height: number
    }

    export type IRegularPolygonParams = IParams & {
      pointsCount: number
      radius: number
      offset?: number
    }

    export type IArcParams = IParams & {
      radius: Vector
      startAngle: number
      endAngle: number
      degrees?: boolean
      pointsCount?: number
    }

    export type IEllipseParams = IParams & {
      radius: Vector
      pointsCount?: number
      offset?: number
    }

    export type ICircleParams = IParams & {
      radius: number
      pointsCount?: number
      offset?: number
    }
  }
}
