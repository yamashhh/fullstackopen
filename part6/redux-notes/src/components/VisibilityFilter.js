import { useDispatch, useSelector } from 'react-redux'
import { filter } from '../features/filter/filterSlice'

const VisibilityFilter = () => {
  const filterValue = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  return (
    <div>
      <label>
        all
        <input
          type="radio"
          name="filter"
          checked={filterValue === 'ALL'}
          onChange={() => dispatch(filter('ALL'))}
        />
      </label>
      <label>
        important
        <input
          type="radio"
          name="filter"
          checked={filterValue === 'IMPORTANT'}
          onChange={() => dispatch(filter('IMPORTANT'))}
        />
      </label>
      <label>
        non-important
        <input
          type="radio"
          name="filter"
          checked={filterValue === 'NON_IMPORTANT'}
          onChange={() => dispatch(filter('NON_IMPORTANT'))}
        />
      </label>
    </div>
  )
}

export default VisibilityFilter
