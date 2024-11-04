import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

// Types

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  TODO = "Todo",
  DOING = "Doing",
  DONE = "Done",
  WARNING = "Warning",
  PENDING = "Pending",
  FAILED = "Failed",
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

interface State {
  todos: Todo[];
}

// Define action types and payloads
type Action =
  | { type: "create"; payload: Todo }
  | { type: "delete"; payload: number }
  | { type: "changeStatus"; payload: [number, Status] }
  | {
      type: "edit";
      payload: [
        number,
        { title: string; estimate: string; priority: Priority }
      ];
    };

const initialState: State = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
};

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

    case "changeStatus":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload[0]
            ? { ...todo, status: action.payload[1] }
            : todo
        ),
      };

    case "edit": {
      const [id, updates] = action.payload;

      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                title: updates.title,
                estimate: updates.estimate,
                priority: updates.priority,
              }
            : todo
        ),
      };
    }
    case "delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
}

interface TodoProviderProps {
  children: ReactNode;
}

function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos } = state;
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
