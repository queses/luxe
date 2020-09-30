import { IHasId } from './IHasId'
import { TPersistenceId, TUpdateEntityConfig, TUpdateEntityResult } from './lyxe-persistence'

export class EntityUpdateUtil {
  static async fromDto <E extends IHasId<ID>, ID extends TPersistenceId, D extends Record<string, unknown>> (
    fieldsConfig: TUpdateEntityConfig<E, ID, D>, entity: E, dto: D
  ): Promise<TUpdateEntityResult<D>> {
    const result: TUpdateEntityResult<D> = {}
    for (const fieldConfig of fieldsConfig) {
      const [ name, getter, setter, transform ] = fieldConfig
      let newValue = dto[name]

      if (typeof newValue === 'undefined') {
        continue
      }

      let oldValue = getter.bind(entity)()
      if (oldValue instanceof Promise) {
        oldValue = await oldValue
      }

      if (typeof transform === 'function') {
        newValue = transform(newValue, oldValue)
        if (newValue instanceof Promise) {
          newValue = await newValue
        }
      }

      if (newValue !== oldValue) {
        const setterResult = setter.bind(entity)(newValue)
        if (setterResult instanceof Promise) {
          await setterResult
        }

        result[name] = { oldValue, newValue }
      }
    }

    return result
  }
}
