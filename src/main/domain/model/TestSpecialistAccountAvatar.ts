import { Column } from 'typeorm'
import { TestSpecialistAccountPresentation } from './TestSpecialistAccountPresentation'
import { ComposedCollectionElement } from '../../../lib/persistence-typeorm/annotations/ComposedCollectionElement'
import { ComposedEntity } from '../../../lib/persistence-typeorm/ComposedEntity'
import { ComposedCollectionParent } from '../../../lib/persistence-typeorm/annotations/ComposedCollectionParent'

@ComposedCollectionElement()
export class TestSpecialistAccountAvatar extends ComposedEntity<TestSpecialistAccountPresentation> {
  @Column()
  private readonly url: string

  @Column()
  private readonly uploadedAt: Date

  @ComposedCollectionParent(type => TestSpecialistAccountPresentation)
  public readonly parent: Promise<TestSpecialistAccountPresentation>

  constructor (url: string) {
    super()
    this.url = url
    this.uploadedAt = new Date()
  }

  public getUrl () { return this.url }
}
