
import {render, screen} from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('Active link component', () => {
    it('renders correctly', () => {
        render(
            <ActiveLink activeClassName='active' href={'/'}>
                <a href="/">Home</a>
            </ActiveLink>
        )
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
    
    it('is receiving active class', () => {
        render(
            <ActiveLink activeClassName='active' href={'/'}>
                <a href="/">Home</a>
            </ActiveLink>
        )
        expect(screen.getByText('Home')).toHaveClass('active')
    })
})