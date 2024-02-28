import { Hono } from 'hono'

const app = new Hono()

app.get('/get/latest/:count', async (c) =>  {
  const count = c.req.param("count")
  
  if (count > 10) return c.text("Too many posts (limit 10)", 400)

  const posts = await c.env.DB.prepare(
    `
      SELECT *
      FROM Pages
      ORDER BY Serial DESC
      LIMIT ?
    `
  ).bind(count).all()

  return c.json(posts.results, 200)
})

app.get('/get/slug/:id', async (c) => {
  const slug = c.req.param('id')

  const post = await c.env.DB.prepare(
    `
      SELECT *
      FROM Pages
      WHERE Slug = ?
    `
  ).bind(slug).all()

  if (post.results.length == 0) return c.text("Not Found", 404)

  return c.json(post.results, 200)
})

export default app
