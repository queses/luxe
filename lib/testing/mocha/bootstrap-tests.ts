import * as sinon from 'sinon'
import { use } from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { AppPathUtil } from '../../core/config/AppPathUtil'
import { AppConfigurationError } from '../../core/application-errors/AppConfigurationError'
import { LuxeFramework } from '../../core/LuxeFramework'

use(chaiAsPromised)

before(async function () {
  let bootstrapApp: (() => void) | undefined
  try {
    bootstrapApp = require(AppPathUtil.appSrc + '/bootstrap').default
  } catch (e) {
    // No bootstrap file in "src" folder found
  }

  if (!bootstrapApp) {
    throw new AppConfigurationError('Cannot find application bootstrap file. Tests cannot be started')
  }

  bootstrapApp()
  await LuxeFramework.run()
})

afterEach(() => {
  // Restore the default sandbox
  sinon.restore()
})