import React from "react";

export default function Table({data}) {
  console.log(data);
  return (
    <table class="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.age}>
            <th>{item.firstName}</th>
            <td>{item.lastName}</td>
            <td>{item.phone}</td>
            <td>{item.gender}</td>
            <td>{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
