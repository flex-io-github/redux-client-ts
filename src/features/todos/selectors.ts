// import { RootState } from './reducer';
import { RootState } from '@src/features';
import { createSelector } from 'reselect';

export const getTodos = (state: RootState) => state.todos.todos;

export const getTodosFilter = (state: RootState) => state.todos.todosFilter;

export const getFilteredTodos = createSelector(
    getTodos, getTodosFilter,
    (todos, todosFilter) => {
        switch (todosFilter) {
            case 'completed':
                return todos.filter((t) => t.completed);
            case 'active':
                return todos.filter((t) => !t.completed);

            default:
                return todos;

        }
    }
);