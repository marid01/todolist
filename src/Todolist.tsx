import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilteredValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilteredValuesType
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (value: "all" | "active" | "completed", todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todolistId: string) => void

}


export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            props.addTask(newTaskTitle, props.todolistId)
        } else {
            setError(true)

        }
        setNewTaskTitle("");
    }


    const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId);
    const errorMessage = error ? <div className={"error-message"}>Title is required</div> : null
    const onClickRemoveTodolist = () => props.removeTodolist(props.todolistId)

    return <div>
        <h3>{props.title}<button onClick={onClickRemoveTodolist}>x</button></h3>
        <div>
            <input className={error ? "error" : ""}
                value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {errorMessage}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const removeTask = () => {
                     props.removeTask(t.id, props.todolistId)
                    }
                    return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                        <input onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)}
                               type="checkbox"
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ?  "active-filter" : ""} onClick={onAllClickHandler}>
                All
            </button>
            <button className={props.filter === "active" ?  "active-filter" : ""} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ?  "active-filter" : ""} onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}