import { render, screen, fireEvent} from '@testing-library/react'
import { mocked } from 'jest-mock'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}))

describe('SubscribeButton component', () => {
    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton />)
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })
    
    it('redirects user to sign in when not authenticated correctly', () => {
        const signInMocked = jest.mocked(signIn)

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton />)
        const subscribeButton = screen.getByText('Subscribe now')
        fireEvent.click(subscribeButton)
        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects to posts when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([{
            user: {name: 'John Doe', email: 'john@doe.com'}, 
            activeSubscription: 'fake-activeSubscription',
            expires: 'fake-expires', 
        }, false
        ]) 

        const pushMock = jest.fn()

        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)

        render(<SubscribeButton />)

        const subcribeBtn = screen.getByText('Subscribe now')

        fireEvent.click(subcribeBtn)

        expect(pushMock).toHaveBeenCalledWith('/posts')
    })
})