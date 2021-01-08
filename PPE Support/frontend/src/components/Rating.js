import React from 'react'
import PropTypes from 'prop-types'

// star rating icon refers to:
// https://fontawesome.com/icons?d=gallery&q=rating
const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>{text ? text : ' '}</span>
    </div>
  )
}

// we could set differetn colors in Product
// value={product.rating}
// text={`${product.numReviews}
//   reviews`}
// color='blue'
Rating.defaultProps = {
  color: '#25f8ae'
}

// Type check, show error on console
Rating.prototypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
}
export default Rating
