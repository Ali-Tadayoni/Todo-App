import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// Types

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
  WARNING = "WARNING",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

// Define a type for Todo items
type Todo = {
  id: number;
  title: string;
  priority: Priority;
  createdAt: string;
  estimate: string;
  status: Status;
  hash: string;
};

// Define the shape of the state
interface State {
  todos: Todo[];
}

// Define action types and payloads
type Action =
  | { type: "create"; payload: Todo }
  | { type: "delete"; payload: number };

const initialState: State = {
  todos: [],
};

// Create the context with a typed initial value of undefined to be set by the provider
const TodoContext = createContext<
  { todos: Todo[]; dispatch: Dispatch<Action> } | undefined
>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "create":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
}

// Define the props for the provider
interface TodoProviderProps {
  children: ReactNode;
}

function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos } = state; // Destructure todos from the state

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook to use the Todo context, ensuring it's only used within the provider
function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}

export { TodoProvider, useTodo };
