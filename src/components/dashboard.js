import React, { Component } from 'react'
import './dashboard.css'
import {Col, Row, Container } from 'react-bootstrap'
import WidgetText from './widgetText'
import WidgetBar from './widgetBar'



export class dashboard extends Component {


    render() {
        // Preparing the chart data
        const chartData = [
        {
        label: "Venezuela",
        value: "290"
        },
        {
        label: "Saudi",
        value: "260"
        },
        {
        label: "Canada",
        value: "180"
        },
        {
        label: "Iran",
        value: "140"
        },
        {
        label: "Russia",
        value: "115"
        }
        ];

        return (
            <div>
                <WidgetText title = 'test' value = {100} description = 'testing' />
                <WidgetBar title = 'Chart' data = {chartData} />
            </div>
        )
    }
}

export default dashboard 