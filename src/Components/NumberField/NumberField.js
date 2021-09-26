import './NumberField.css'

const NumberField = (props) => {
    const {
        label,
        value,
        onValueChanged
    } = props

    return <div className='numberfield-container'>
        {label}
        <input
            className='numberfield-input'
            value={value}
            onChange={(event) => {
                try {
                    const newValue = Number(event.target.value)
                    if (newValue !== value) {
                        onValueChanged(newValue)
                    }
                } catch (e) {}
            }}
        >
        </input>
    </div>
}

export default NumberField
