import { lightningChart, emptyFill, SolidLine, ColorRGBA, emptyLine, SolidFill, AutoCursorModes, PalettedFill, LUT } from '@arction/lcjs'
import { createWaterDropDataGenerator, createSpectrumDataGenerator } from '@arction/xydata'
import React, { useRef, useEffect, useState } from 'react'
import './HeatmapChart.css'

const HeatmapChart = (props) => {
    const {
        columns,
        rows,
        wireframe,
        cursor,
        cursorInterpolation,
        legend,
        interpolation,
        dataGenerator
    } = props

    const [chart, setChart] = useState(undefined)
    const [heatmap, setHeatmap] = useState(undefined)
    const refLegendBox = useRef(undefined)

    // This effect is triggered only when the entire LC JS chart has to be reconstructed or initialized.
    useEffect(() => {
        const chart = lightningChart().ChartXY({
            container: 'heatmapchart'
        })
            .setTitleFillStyle(emptyFill)

        setChart(chart)

        // Required for chart looking initially correct in React context.
        chart.engine.layout()

        // TODO IMMEDIATE: layout does not fully set chart size correctly.
        // Mouse location with cursor etc is slightly off !

        // Return function that will destroy the chart completely.
        return () => {
            chart.dispose()
            setChart(undefined)
        }
    }, [])

    // This effect is triggered when the Heatmap Series has to be recreated.
    useEffect(() => {
        if (!chart) return

        const heatmap = chart.addHeatmapGridSeries({
            columns,
            rows,
            dataOrder: 'columns',
        })
            .setFillStyle(new PalettedFill({
                lookUpProperty: 'value',
                lut: new LUT({
                    units: 'intensity',
                    interpolate: false,
                    steps: [
                        { value: 0, color: ColorRGBA(255, 255, 0) },
                        { value: 30, color: ColorRGBA(255, 204, 0) },
                        { value: 45, color: ColorRGBA(255, 128, 0) },
                        { value: 60, color: ColorRGBA(255, 0, 0) },
                    ]
                })
            }))

        console.log(chart.getTitleFont())

        setHeatmap(heatmap)

        return () => {
            heatmap.dispose()
            setHeatmap(undefined)
        }
    }, [chart, columns, rows])

    // This effect is triggered whenever data set has to be regenerated.
    useEffect(() => {
        let dataGenerationCanceled = false
        const handleDataLoaded = (data) => {
            if (dataGenerationCanceled) return
            if (heatmap) {
                heatmap.invalidateIntensityValues(data)
            }
        }
        if (dataGenerator === 'waterdrops') {
            createWaterDropDataGenerator()
                .setRows(columns)
                .setColumns(rows)
                .generate()
                .then(handleDataLoaded)
        } else {
            createSpectrumDataGenerator()
                .setSampleSize(rows)
                .setNumberOfSamples(columns)
                .generate()
                .toPromise()
                .then(data => data.map(sample => sample.map(value => value * 100)))
                .then(handleDataLoaded)
        }
        return () => {
            dataGenerationCanceled = true
        }
    }, [heatmap, dataGenerator, columns, rows])

    // This effect is triggered whenever heatmap wire frame style has to be reapplied.
    useEffect(() => {
        if (!heatmap) return

        heatmap.setWireframeStyle(wireframe ? 
            new SolidLine({
                thickness: 1,
                fillStyle: new SolidFill({color: ColorRGBA(0, 0, 0, 255)})
            }) :
            emptyLine    
        )
    }, [heatmap, wireframe])

    // This effect is triggered whenever heatmap interpolation has to be reapplied.
    useEffect(() => {
        if (!heatmap) return

        heatmap.setPixelInterpolationMode(interpolation ? 'bilinear' : 'disabled')
    }, [heatmap, interpolation])

    // This effect is triggered whenever legend has to be updated.
    useEffect(() => {
        if (!chart) return

        if (legend) {
            const legendBox = chart.addLegendBox().add(chart)
            refLegendBox.current = legendBox
        }

        return () => {
            if (refLegendBox.current) {
                refLegendBox.current.dispose()
                refLegendBox.current = undefined
            }
        }
    }, [chart, heatmap, legend])

    // This effect is triggered whenever auto cursor mode is updated.
    useEffect(() => {
        if (!chart) return

        chart.setAutoCursorMode(cursor ? AutoCursorModes.snapToClosest : AutoCursorModes.disabled)
    }, [chart, cursor])

    // This effect is triggered whenever auto cursor interpolation mode is updated.
    useEffect(() => {
        if (!heatmap) return

        heatmap.setCursorInterpolationEnabled(cursorInterpolation)
    }, [heatmap, cursorInterpolation])

    return <div
        id='heatmapchart'
    ></div>
}

export default HeatmapChart