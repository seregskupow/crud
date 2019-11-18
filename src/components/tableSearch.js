import React,{useState} from 'react'

export default function TableSearch(props) {
  const {onSearch} = props;
  const [search, setSearch] = useState('');
  const valueChangeHandler =(event)=>{
    setSearch(event.target.value)
  }
  return (
    <div class="input-group mb-3 order-sm-2">
      <div class="input-group-prepend">
        <button
          class="btn btn-primary"
          type="button"
          id="button-addon1"
          
         
          onClick={()=>onSearch(search)}
        >
          Button
        </button>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder=""
        value={search}
        onChange={valueChangeHandler}
        style={{background:"rgba(235, 234, 234, 0.616)"}}
      />
    </div>
  );
}
