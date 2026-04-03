import type { AxiosInstance } from 'axios'

class AxiosHolder {
  #instance: AxiosInstance | null = null

  public set axiosWithAuth(instance: AxiosInstance) {
    if (this.#instance !== null) {
      throw new Error('axiosWithAuth is already instantiated')
    }

    this.#instance = instance
  }

  public get axiosWithAuth(): AxiosInstance {
    if (this.#instance === null) {
      throw new Error('axiosWithAuth is not initialized')
    }

    return this.#instance
  }
}

export const axiosHolder = new AxiosHolder()
