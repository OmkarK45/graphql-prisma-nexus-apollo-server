import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './graphql'

export const schema = makeSchema({
	// GraphQL types that will be used to construct your GraphQL schema. It's voluntarily empty for now.
	types,
	outputs: {
		// Output path to where nexus should write the generated TypeScript definition types derived from your schema.
		typegen: join(__dirname, '..', 'nexus-typegen.ts'),
		// Output path to where nexus should write the SDL version of your GraphQL schema. More on it later as well.
		schema: join(__dirname, '..', 'schema.graphql'),
	},
	contextType: {
		module: join(__dirname, './context.ts'),
		export: 'Context',
	},
})
