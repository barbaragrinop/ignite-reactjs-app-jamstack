import {render, screen} from '@testing-library/react'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
  };

const posts: Post[] = [
    {excerpt: 'Post excerpt', slug: 'my-new-post', title: 'My new post', updatedAt: 'March 10'},

]

describe('Posts page', () => {
    it('renders correct', () => {
        render(<Posts posts={posts}/>)

        expect(screen.getByText('My new post')).toBeInTheDocument()
    })

    it('loads initial data', async () => {
        const getPrismicClientMock = jest.mocked(getPrismicClient)

        getPrismicClientMock.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [{type: 'heading', text: 'My new post'}], 
                            content: [{type: 'paragraph', text: 'Post excerpt'}]
                        },
                        last_publication_date: '01-02-2021'
                    }
                ]
            }),
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(expect.objectContaining({
            props: {
                posts: [{
                    excerpt: 'Post excerpt', 
                    slug: 'my-new-post', 
                    title: 'My new post', 
                    updatedAt: '02 de janeiro de 2021',
                }]
            }
        }))
    })
})