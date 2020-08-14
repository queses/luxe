import { assert } from 'chai'
import { AppContainer } from 'lyxe/lib/core/di/AppContainer'
import { MutexTkn } from 'lyxe/lib/mutex/lyxe-mutex-tokens'
import { PromiseUtil } from 'lyxe/lib/core/lang/PromiseUtil'

describe('Mutex', function () {
  it('should wait on lock', async function () {
    let counterOne = 0
    let counterTwo = 0
    const run = () => AppContainer.get(MutexTkn).wrap('test', 100, async () => {
      counterOne++
      await new Promise(r => setTimeout(r, 50))
      counterTwo++
    })

    Promise.all([ run(), run(), run() ]).then()
    await PromiseUtil.waitFor(() => counterOne === 1, 25)
    await new Promise(r => setTimeout(r, 50))
    assert.equal(counterTwo, 1)

    await PromiseUtil.waitFor(() => counterOne === 2, 25)
    await new Promise(r => setTimeout(r, 50))
    assert.equal(counterTwo, 2)

    await PromiseUtil.waitFor(() => counterOne === 3, 25)
    await new Promise(r => setTimeout(r, 50))
    assert.equal(counterTwo, 3)
  })
})

