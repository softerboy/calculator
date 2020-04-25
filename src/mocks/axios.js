import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import mockCalculations from './calculatons'

// This sets the mock adapter on the default instance
// All requests will have a 2 seconds delay
const mockAxios = new AxiosMockAdapter(axios, { delayResponse: 2000 })

// reply HTTP status OK with mock calculations
mockAxios.onGet('/calculations').reply(200, mockCalculations)

// simply reply HTTP status OK
mockAxios.onPost('/calculations').reply(200)
