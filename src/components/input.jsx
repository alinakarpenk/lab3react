import React from 'react';

const Input = ({ label, id, register, errors, type = 'text', options = [] }) => {
  let element;
  switch (type) {
    case 'checkbox':
      element = (
        <input id={id} type="checkbox" {...register(id)}/>
      );
      break;
    case 'select':
      element = (
        <select id={id} {...register(id)}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
          </select>
        );
      break;
    default:
    element = <input id={id} type={type} {...register(id)} />;
  }
  return (
    <div className={type === 'checkbox' ? 'checkbox-field' : 'input-field'}>
      {type !== 'checkbox' && <label htmlFor={id}>{label}</label>} {element}
      {type === 'checkbox' && <label htmlFor={id}>{label}</label>}
      {errors[id] && <p className="error-message">{errors[id].message}</p>}
    </div>
  );
};

export default Input;
