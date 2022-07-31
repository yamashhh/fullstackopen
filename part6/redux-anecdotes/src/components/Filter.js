import { connect } from 'react-redux'
import { setFilter } from '../features/filter/filterSlice'

const Filter = ({ filter, setFilter }) => {
  const style = {
    marginBottom: 10,
  }

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    setFilter(event.target.value)
  }

  return (
    <label style={style}>
      filter <input value={filter} onChange={handleChange} />
    </label>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  setFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
