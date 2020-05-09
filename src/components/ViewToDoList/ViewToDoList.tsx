import React from "react";
import "./ViewToDoStyle.css";

function ViewToDoList({
  toDoItem,
  index,
  deleteToDoHandler,
  onSelectedChange,
}: //   isItemChecked
{
  toDoItem: string;
  index: number;
  deleteToDoHandler: (index: number) => void;
  onSelectedChange: (checked: boolean, itemCode: number) => void;
  //   isItemChecked: boolean;
}) {
  return (
    <React.Fragment>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <label className="checkboxContainer">
            {toDoItem}
            <input
              type="checkbox"
              onChange={(e) => onSelectedChange(e.target.checked, index)}
              //   checked={isItemChecked}
            />
            <span className="checkmark"></span>
          </label>
        </td>
        <td
          className="fs-20 btn btn-link p-2"
          onClick={() => deleteToDoHandler(index)}
        >
          <i className="fa fa-trash"></i>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ViewToDoList;
