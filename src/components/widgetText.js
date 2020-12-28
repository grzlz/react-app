import React from 'react'

export default function widgetText(props) {
    return (
        <div className="widgetWrap">
            <div className="widgetTitle">{props.title}</div>
            <div className="widgetValue">
                <div class="value">{props.value}</div>
                <div class="description">{props.description}</div>
            </div>
        </div>
    )
}
