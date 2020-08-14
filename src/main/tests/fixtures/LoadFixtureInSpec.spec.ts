import { assert } from 'chai'
import { MochaFixtureUtil } from 'lyxe/lib/testing/mocha/MochaFixtureUtil'
import { TestSpecialistAccountFixture } from './TestSpecialistAccountFixture'
import { itInTransaction } from 'lyxe/lib/testing/mocha/it-in-transaction'
import { TestUtil } from 'lyxe/lib/testing/TestUtil'
import { TestSpecialistAccountRepoTkn } from '../../test-tokens'

describe('LoadFixtureInSpec', function () {
  MochaFixtureUtil.loadFixturesIn(TestSpecialistAccountFixture, 'test')

  itInTransaction('should count loaded fixtures', async function (sf, em) {
    const repo = TestUtil.createRepo(TestSpecialistAccountRepoTkn, em)
    assert.isAbove(await repo.count(), 0)
  }, 'test')
})
