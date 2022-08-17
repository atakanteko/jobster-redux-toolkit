
const FormRowSelect = ({name, value, handleChange, optionList}) => {
    return (
        <div className='form-row'>
            <label htmlFor='status' className='form-label'>
                status
            </label>
            <select
                name={name}
                value={value}
                onChange={handleChange}
                className='form-select'
            >
                {optionList.map((itemValue, index) => {
                    return (
                        <option key={index} value={itemValue}>
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FormRowSelect;
