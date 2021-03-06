import { IRendering } from '../types'
import { Displayable, Group } from '../displayables'
import { range } from '../util/methods'
import Scene from './scene'

export class Camera {
  public domElement: SVGSVGElement
  public document: Document

  constructor({ document }: IRendering.ICameraParams) {
    this.document = document
    this.domElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  }

  public render(d: Displayable, original: Displayable, elem: SVGElement = this.domElement): void {
    const domElement = original.getDomElement()
    if (!original.appendedToDom) {
      elem.appendChild(domElement)
      original.appendedToDom = true
    }

    this.setStyles(domElement, d)

    if (d.id.length > 0) domElement.setAttribute('id', d.id)

    if (d.path.length > 0) domElement.setAttribute('d', d.path)

    if (d.subdisplayables.length > 0)
      for (const i of range(d.subdisplayables.length)) {
        const child = d.subdisplayables[i]
        const originalChild = original.subdisplayables[i]
        this.render(child, originalChild, domElement)
      }
  }

  public async renderScene(s: Scene) {
    s.bindCamera(this)
    await s.define()
  }

  public setStyles(elem: SVGElement, d: Displayable) {
    elem.style.transform = d.mat.toString()
    elem.style.fill = d.fill.toCss()
    elem.style.fillOpacity = d.fill.toCssOpacity()
    elem.style.stroke = d.border.color.toCss()
    elem.style.opacity = d.opacity.toString()
    elem.style.strokeWidth = `${d.border.weight / 40}`
    if (d.border.array !== undefined) elem.style.strokeDasharray = d.border.array.toString()
    if (d.border.offset !== undefined) elem.style.strokeDashoffset = d.border.offset.toString()
  }

  protected updatePartially<T extends {}, K extends keyof Camera>(data: Partial<T>, key: K) {
    this[key] = {
      ...(this as any)[key],
      ...data,
    }
  }
}

export default Camera
