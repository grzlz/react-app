import React, { Component } from 'react'
import './dashboard.css'
import {Col, Row, Container } from 'react-bootstrap'
import WidgetText from './widgetText'
import WidgetBar from './widgetBar'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';

const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`


export class dashboard extends Component {

    constructor() {
        super()
        this.state = {
            items: [],
            dropdownOptions: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource: null,
            pageViews: null,
            users: null,
            newUsers: null,
            sourceArr: []
        }
    }

    getData = arg => {
        const arr = this.state.items
        const arrLen = arr.length
        
        let organicSource = 0
        let directSource = 0
        let referralSource = 0
        let pageViews = 0
        let users = 0
        let newUsers = 0
        let selectedValue = null
        let sourceArr = []

        for(let i = 0; i < arrLen; i++) {
            if(arg === arr[i]["month"]) {
                organicSource = arr[i].organic_source
                directSource = arr[i].direct_source
                referralSource = arr[i].referral_source
                pageViews = arr[i].page_views
                users = arr[i].users
                newUsers = arr[i].new_users 
                sourceArr.push(
                    {
                        label: 'Organic source',
                        value: arr[i].organic_source
                    },
                    {
                        label: 'Direct source',
                        value: arr[i].direct_source
                    },
                    {
                        label: 'Referral source',
                        value: arr[i].referral_source
                    }
                    )
                
            }
        }

        this.setState({
            organicSource: organicSource,
            directSource: directSource,
            referralSource: referralSource,
            pageViews: pageViews,
            users: users,
            newUsers: newUsers,
            sourceArr: sourceArr
        })
    }

    updateDashboard = event => {
        this.getData(event.value)
        this.setState({selectedValue: event.value}, () => {console.log(this.state.users)})
    }

    componentDidMount() {
        fetch(url).then(response => response.json())
        .then(data => {
            let batchRowValues = data.valueRanges[0].values

            const rows = []

            for(let i = 1; i < batchRowValues.length; i++) {
                let rowObject = {}
                for (let j = 0; j < batchRowValues[i].length; j++) {
                    rowObject[batchRowValues[0][j]] = batchRowValues[i][j]
                }
                rows.push(rowObject)
            }
            let dropdownOptions = []

            for(let i = 0; i < rows.length; i++) {
                dropdownOptions.push(rows[i].month)
            }

            dropdownOptions = Array.from(new Set(dropdownOptions)).reverse()
            this.setState(
                {
                    items: rows,
                    dropdownOptions: dropdownOptions,
                    selectedValue: 'Jan 2018'
                },
                () => this.getData('Jan 2018')
            )
        })

    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row className = "TopHeader">
                        <Col>Dashboard</Col>
                        <Col>
                            <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                        </Col>
                    </Row>
                </Container>
                <Container className = "mainDashboard">
                    <Row>
                        <Col>
                            <WidgetText title = "Organic source" value = {this.state.organicSource} description = "desc" />
                        </Col>
                        <Col>
                            <WidgetText title = "Direct source" value = {this.state.directSource} description = "desc" />
                        </Col>
                    </Row>
              
                        <Col>
                            <WidgetBar title = "Source comparison" data = {this.state.sourceArr} />
                        </Col>
               
                </Container>
            </div>
        )
    }
}

export default dashboard 