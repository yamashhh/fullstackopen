import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../features/filter/filterSlice'

const Filter = () => {
  const style = {
    marginBottom: 10,
  }

  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(setFilter(event.target.value))
  }

  return (
    <label style={style}>
      filter <input value={filter} onChange={handleChange} />
    </label>
  )
}

export default Filter
