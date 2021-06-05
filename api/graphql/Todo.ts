import { objectType, extendType, stringArg, nonNull } from 'nexus'

export const Todo = objectType({
	name: 'Todo',
	definition(t) {
		t.string('id')
		t.string('text')
		t.string('title')
	},
})

export const TodoQuery = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('todos', {
			type: 'Todo',
			resolve(_root, _args, ctx) {
				return ctx.db.todo.findMany({})
			},
		})
	},
})

export const TodoMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createTodo', {
			type: 'Todo',
			args: {
				title: nonNull(stringArg()),
				text: nonNull(stringArg()),
			},
			resolve(_root, args, ctx) {
				const newTodo = {
					title: args.title,
					text: args.text,
				}
				return ctx.db.todo.create({
					data: newTodo,
				})
			},
		})

		t.nonNull.field('removeTodo', {
			type: 'Todo',
			args: {
				id: nonNull(stringArg()),
			},
			resolve(_root, args, ctx) {
				return ctx.db.todo.delete({
					where: {
						id: args.id,
					},
				})
			},
		})

		t.nonNull.field('editTodo', {
			type: 'Todo',
			args: {
				id: nonNull(stringArg()),
				text: stringArg(),
				title: stringArg(),
			},
			resolve(_root, args, ctx) {
				return ctx.db.todo.update({
					where: {
						id: args.id,
					},
					data: {
						text: args.text!,
						title: args.title!,
					},
				})
			},
		})
	},
})
