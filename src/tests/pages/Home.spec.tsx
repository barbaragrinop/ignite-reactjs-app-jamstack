import {render, screen} from '@testing-library/react'
import Home, { getStaticProps } from '../../pages'
import { stripe } from '../../services/stripe'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
    return {
        useSession(){
            return [null, false]
        }
    }
})
jest.mock('../../services/stripe')

describe('Home page', () => {
    it('renders correctly', () => {
        render(<Home product={{priceId: 'fake price', amount: '$23,00'}}/>)

        expect(screen.getByText('for $23,00 month')).toBeInTheDocument()
    })

    // it('loads initial data', () => {
    //     const retriveStripePricesMocked = jest.mocked(stripe.prices.retrieve)

    //     retriveStripePricesMocked.mockResolvedValueOnce({
    //         id: 'fake-prioce-id', 
    //         unit_amount: 1000,
    //     } as any)

    //     const response = getStaticProps({})

    //     console.log(response)
    // })
})