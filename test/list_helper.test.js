const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
        }
    ]

    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
        { title: 'A', author: 'A', likes: 3 },
        { title: 'B', author: 'B', likes: 7 },
        { title: 'C', author: 'C', likes: 2 }
        ]
        assert.strictEqual(listHelper.totalLikes(blogs), 12)
    })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('when list has one blog returns that blog', () => {
    const blog = { title: 'Test', author: 'Author', likes: 5 }
    assert.deepStrictEqual(listHelper.favoriteBlog([blog]), blog)
  })

  test('of a bigger list returns the one with most likes', () => {
    const blogs = [
      { title: 'A', author: 'A', likes: 3 },
      { title: 'B', author: 'B', likes: 12 },
      { title: 'C', author: 'C', likes: 7 }
    ]
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[1])
  })
})
