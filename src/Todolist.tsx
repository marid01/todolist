import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilteredValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilteredValuesType
    removeTask: (taskId: string) => void
    changeFilter: (value: "all" | "active" | "completed") => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
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
            props.addTask(newTaskTitle)
        } else {
            setError(true)

        }
        setNewTaskTitle("");
    }


    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const errorMessage = error ? <div className={"error-message"}>Title is required</div> : null

    return <div>
        <h3>{props.title}</h3>
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
                    const onRemoveHandler = () => {
                        props.removeTask(t.id)
                    }
                    return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                        <input onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}
                               type="checkbox"
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
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