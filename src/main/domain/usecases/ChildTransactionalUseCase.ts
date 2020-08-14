import { TransactionalUseCase } from 'lyxe/lib/persistence/annotations/TransactionalUseCase'
import { ChildTransactionalUseCaseTkn, TestSpecialistRepoTkn } from '../../test-tokens'
import { BaseUseCase } from 'lyxe/lib/core/context/BaseUseCase'
import { IChildTransactionalUseCase } from '../test-use-cases'
import { InjectRepository } from 'lyxe/lib/persistence/annotations/InjectRepository'
import { ITestSpecialistRepo } from '../test-repos'
import { TestSpecialist } from '../model/TestSpecialist'

@TransactionalUseCase(ChildTransactionalUseCaseTkn, 'test')
export class ChildTransactionalUseCase extends BaseUseCase implements IChildTransactionalUseCase {
  @InjectRepository(TestSpecialistRepoTkn)
  private specialistRepo: ITestSpecialistRepo


  public async run (toThrow: boolean = false) {
    await this.specialistRepo.save(TestSpecialist.create('Test', 'Another'))

    if (toThrow) {
      throw Error()
    }
  }
}
