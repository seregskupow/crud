import React from "react";
import _ from "lodash";

export default function Table(props) {
  const { data, rowHandleClick } = props;

  return (
    <tbody>
      {data.map(item => (
        <tr
          key={Math.random() * 1000 + 1}
          data-id={item.id}
          onClick={event => rowHandleClick(event)}
        >
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.phone}</td>
          <td>{item.gender}</td>
          <td>{item.age}</td>
        </tr>
      ))}
    </tbody>
  );
}
