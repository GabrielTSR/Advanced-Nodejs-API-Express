import axios from 'axios'
import { HttpGetClient } from '@/infra/http'

export class AxiosHttpClient implements HttpGetClient {
    async get({ url, params }: HttpGetClient.Input): Promise<any> {
        const output = await axios.get(url, { params })
        return output.data
    }
}
