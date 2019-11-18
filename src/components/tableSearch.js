import React,{useState} from 'react'

export default function TableSearch(props) {
  const {onSearch} = props;
  const [search, setSearch] = useState('');
  const valueChangeHandler =(event)=>{
    setSearch(event.target.value)
  }
  return (
    <div className="input-group mb-3 order-sm-2">
      <div className="input-group-prepend">
        <button
          className="btn btn-primary"
          type="button"
          id="button-addon1"
          
         
          onClick={()=>onSearch(search)}
        >
          Search
        </button>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={search}
        onChange={valueChangeHandler}
        style={{background:"rgba(235, 234, 234, 0.616)"}}
      />
    </div>
  );
}
