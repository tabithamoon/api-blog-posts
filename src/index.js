import { Hono } from 'hono'

const app = new Hono()

app.get('/get/latest/:count', async (c) =>  {
  const count = c.req.param("count")
  
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

export default app
