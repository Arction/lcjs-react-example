import './DropdownField.css'

const DropdownField = (props) => {
    const {
        label,
        options,
        selectedOption,
        onSelectedOptionChanged,
    } = props

    return <div className='dropdownfield-container'>
        {label}
        <select
            className='dropdownfield-input'
            value={selectedOption}
            onChange={(event) => {
                const newSelectedOption = event.target.value
                if (newSelectedOption !== selectedOption) {
                    onSelectedOptionChanged(newSelectedOption)
                }
            }}
        >
            {options.map(option => 
                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>    
            )}
        </select>
    </div>
}

export default DropdownField
