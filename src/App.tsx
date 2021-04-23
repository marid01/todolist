import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilteredValuesType = "all" | "active" | "completed"


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);



    function removeTask(taskId: string) {

        let filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
    }
    function addTask(title: string) {
        debugger
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean) {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t))
    }

    let [filter, setFilter] = useState<"all" | "active" | "completed">("all");



    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value:  "all" | "active" | "completed") {
        setFilter(value);
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      filter={filter}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;



