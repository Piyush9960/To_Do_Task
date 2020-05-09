import React from "react";
import { useState } from "react";
import ViewToDoList from "../ViewToDoList/ViewToDoList";

function AddToDoTextBox() {
  const [toDoItem, setToDoItem] = useState<string>("");
  const [toDoList, setToDoList] = useState<string[]>([]);
  const [selectedToDoItems, setSelectedToDoItems] = useState<number[]>([]);
  //   const [isItemChecked, setIsItemChecked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDoItem(e.target.value);
  };

  const handleToDoAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToDoList([...toDoList, toDoItem]);
    setToDoItem("");
  };

  const handleChangeSelected = (checked: boolean, toDoItemCode: number) => {
    if (checked) {
      const found = selectedToDoItems.findIndex((i) => i === toDoItemCode);
      //   setIsItemChecked(checked);
      if (found === -1) {
        // not found then add
        setSelectedToDoItems((prev) => [...prev, toDoItemCode]);
      }
    } else {
      const items = selectedToDoItems.filter((i) => i !== toDoItemCode);
      // not found then add
      setSelectedToDoItems(items);
    }
  };

  const deleteToDoHandler = (index: number) => {
    const newToDo = toDoList.slice(); // copying the originalToDoList without mutating the actual state
    newToDo.splice(index, 1);
    // newToDo.filter((value, idx) => index.includes(idx));
    setToDoList(newToDo);
  };

  const displayMessage = () => {
    if (toDoList.length === 0) {
      return (
        <div className="alert alert-success mt-3" role="alert">
          <h5 className="alert-heading">Ooops! Your List seems empty..</h5>
          <p>Please start adding new To-Do's.</p>
        </div>
      );
    }
  };

  const deleteToDoHandlerForMultiple = (toDeleteItems: number[]) => {
    const newToDo = toDoList.slice();
    toDeleteItems.map((item) => {
      //   console.log("indexxx:", item)
      newToDo.splice(item, 1);
      item--;
      //   handleChangeSelected(false, item);
      return toDoList;
    });
    setToDoList(newToDo);
  };

  return (
    <div className="container box-textbox-button add-to-do">
      <form onSubmit={handleToDoAddEvent}>
        <div className="row ">
          <div className="form-group col-9">
            <input
              required
              value={toDoItem}
              onChange={(e) => handleChange(e)}
              type="text"
              name="toDoItem"
              className="form-control"
              placeholder="Add a new to-do"
            />
          </div>
          <div className="col-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={toDoItem ? false : true}
              // onClick={handleToDoAddEvent}
            >
              Add
            </button>
          </div>
        </div>
      </form>
      {displayMessage()}
      {selectedToDoItems.length > 1 && (
        <button
          className="btn btn-primary p-m"
          onClick={() => deleteToDoHandlerForMultiple(selectedToDoItems)}
        >
          Bulk Delete
        </button>
      )}
      <table className="table">
        {toDoList.length > 0 && (
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">To-Do List</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
        )}

        <tbody>
          {toDoList.map((item, idx) => (
            <ViewToDoList
              key={idx}
              toDoItem={item}
              index={idx}
              deleteToDoHandler={deleteToDoHandler}
              onSelectedChange={handleChangeSelected}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddToDoTextBox;
