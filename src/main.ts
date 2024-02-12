import "./style.css";
interface Todo {
  title: string;
  readonly id: string;
  isCompleted: boolean;
}

const todos: Todo[] = [];

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    id: String(Math.random() * 100),
    isCompleted: false,
  };
  todos.push(todo);
  console.log(todos);
  renderTodos(todos);
  todoInput.value = "";
};
const genrateTodoItem = (title: string, id: string, isCompleted: boolean) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  //creating check box
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    paragraph.className = checkBox.checked ? "textCut" : "";
  };
  //creating paragraph for title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";

  // creating delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    delItem(id);
  };

  const delItem = (id: string) => {
    const rmId = todos.findIndex((item) => item.id === id);
    todos.splice(rmId, 1);
    renderTodos(todos);
  };

  //append
  todo.append(checkBox, paragraph, btn);
  todoContainer.append(todo);
};

const renderTodos = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    genrateTodoItem(item.title, item.id, item.isCompleted);
  });
};
