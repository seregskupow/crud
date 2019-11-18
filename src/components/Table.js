import React,{useState} from "react";
import _ from "lodash";



export default function Table(props) {
  const { data, rowHandleClick,active,isActive } = props;
  const [value, setValue] = useState(false);
const changeVal=()=>{
 
}
  return (
    <tbody>
      {data.map(item => (
        <tr
          key={item.id}
          data-id={item.id}
          onClick={event => {rowHandleClick(event,item.id)}}
          className={
           active === item.id
              ? "active"
              : "none"
          }
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
