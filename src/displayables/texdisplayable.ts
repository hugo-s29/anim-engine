import Displayable from './displayable'
import { IDisplayable } from '../../@types'
import { SERVER_URL } from '../constants'

export class TexDisplayable extends Displayable {
  public static async _getAsyncData({
    value,
  }: IDisplayable.ITexParams): Promise<IDisplayable.ITexAsyncData> {
    const svg = await fetch(`${SERVER_URL}/tex/${btoa(value)}`).then((r) =>
      r.text()
    )

    return { path: svg }
  }

  public static async create(params: IDisplayable.ITexParams) {
    const d = await TexDisplayable._getAsyncData(params)
    const displayable = new TexDisplayable({ ...params, ...d })
    return displayable
  }
}

export default TexDisplayable
