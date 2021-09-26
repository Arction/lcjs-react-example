import React, { useState } from 'react';
import './App.css'
import NumberField from './NumberField/NumberField';
import CheckboxField from './CheckboxField/CheckboxField';
import DropdownField from './DropdownField/DropdownField';
import HeatmapChart from './HeatmapChart/HeatmapChart'

// - number field: columns
// - number field: rows
// - dropdown selection: data type 
// - checkbox: bilinear interpolation
// - checkbox: cursor enabled
// - checkbox: cursor interpolation enabled
// - checkbox: legend enabled
// - checkbox: wire frame enabled

const App = (props) => {
    const [columns, setColumns] = useState(100)
    const [rows, setRows] = useState(100)
    const [wireframe, setWireframe] = useState(false)
    const [cursor, setCursor] = useState(true)
    const [cursorInterpolation, setCursorInterpolation] = useState(true)
    const [legend, setLegend] = useState(true)
    const [interpolation, setInterpolation] = useState(true)
    const [dataGenerator, setDataGenerator] = useState('waterdrops')

    return <div className='app-container'>
        <div className='app-uiContainer'>
            <div className='app-uiItemContainer'>
                <NumberField
                    label='Number of columns (X)'
                    value={columns}
                    onValueChanged={(value) => setColumns(value)}
                />
            </div>
            <div className='app-uiItemContainer'>
                <NumberField
                    label='Number of rows (Y)'
                    value={rows}
                    onValueChanged={(value) => setRows(value)}
                />
            </div>
            <div className='app-uiItemContainer'>
                <DropdownField
                    label='Data generator'
                    options={['waterdrops', 'spectrum']}
                    selectedOption={dataGenerator}
                    onSelectedOptionChanged={(value) => setDataGenerator(value)}
                />
            </div>
            <div className='app-uiItemContainer'>
                <CheckboxField
                    label='Wire frame enabled'
                    checked={wireframe}
                    onCheckedChanged={(checked) => setWireframe(checked)}
                />
            </div>
            <div className='app-uiItemContainer'>
                <CheckboxField
                    label='Cursor enabled'
                    checked={cursor}
                    onCheckedChanged={(checked) => setCursor(checked)}
                />
            </div>
            <div className='app-uiItemContainer'>
                <CheckboxField
                    label='Cursor interpolation enabled'
                    checked={cursorInterpolation}
                    onCheckedChanged={(checked) => setCursorInterpolation(checked)}
                />
            </div>
            <div className='app-uiItemContainer'>
                <CheckboxField
                    label='Legend enabled'
                    checked={legend}
                    onCheckedChanged={(checked) => setLegend(checked)}
                />
            </div>
            <div className='app-uiItemContainer'>
                <CheckboxField
                    label='Heatmap interpolation enabled'
                    checked={interpolation}
                    onCheckedChanged={(checked) => setInterpolation(checked)}
                />
            </div>
        </div>
        <div className='app-chartContainer'>
            <HeatmapChart
                columns={columns}
                rows={rows}
                wireframe={wireframe}
                cursor={cursor}
                cursorInterpolation={cursorInterpolation}
                legend={legend}
                interpolation={interpolation}
                dataGenerator={dataGenerator}
            />
        </div>
    </div>
}

export default App
