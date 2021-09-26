import './CheckboxField.css'

const CheckboxField = (props) => {
    const {
        label,
        checked,
        onCheckedChanged
    } = props

    return <div className='checkbox-container'>
        {label}
        <input
            type='checkbox'
            checked={checked}
            onChange={(event) => {
                const newState = event.target.checked
                if (newState !== checked) {
                    onCheckedChanged(newState)
                }
            }}
        >
        </input>
    </div>
}

export default CheckboxField
