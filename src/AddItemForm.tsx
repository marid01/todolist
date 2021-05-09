import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false)


    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }

    const onClickAddItem = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            props.addItem(newTaskTitle)
        } else {
            setError(true)

        }
        setNewTaskTitle("");
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    const errorMessage = error ? <div className={"error-message"}>Title is required</div> : null

    return(
        <div>
            <input className={error ? "error" : ""}
                   value={newTaskTitle}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm;