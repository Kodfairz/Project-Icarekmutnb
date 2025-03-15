import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import cors from '@elysiajs/cors'

// Routes
import { userRoutes } from './routes/users.route.js'
import { categoryRoutes } from './routes/category.js'
import { postRoutes } from './routes/posts.route.js'

const app = new Elysia({ adapter: node() })
	.use(cors())
	.get('/', () => 'Hello Elysia')

	.use(userRoutes)
	.use(categoryRoutes)
	.use(postRoutes)

	.listen(4000, ({ hostname, port }) => {
		console.log(
			`🦊 Elysia is running at ${hostname}:${port}`
		)
	})