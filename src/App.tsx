import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilteredValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilteredValuesType
}
// type TaskStateType = {
//     [key: string]: Array<TaskType>
// }


function App() {


    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
        //setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t=>t.id !==taskId) }) второй способ
    }

    function addTask(title: string, todolistId: string) {

        let task = {
            id: v1(),
            title: title,
            isDone: false
        };
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    function changeFilter(value: FilteredValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].map(t => t.id === id ? {...t, isDone: isDone} : t)
        setTasks({...tasks})
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: "all"}
        setTodolists([...todolists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]);

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ]
    });


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />

            {
                todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    return <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                    />
                })
            }

        </div>
    );
}

export default App;



