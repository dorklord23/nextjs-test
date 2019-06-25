import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { withRouter } from 'next/router';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

import Layout from '../components/Layout';

class Weather extends Component {
    constructor() {
        super();

        this.getLocation = this.getLocation.bind(this);
    }

    async getLocation(lat = '', lng = '') {
        try {
            const response = await fetch(`http://localhost:3000/location/${lat},${lng}`);
            const json = await response.json();

            if (response.ok) {
                const {
                    adminArea5,
                } = json.results[0].locations[0];

                return adminArea5;
            }

            throw new Error(json.error);
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.message,
                type: 'error',
            });
        }
    }

    async componentDidMount() {
        const {
            cityName,
            lat,
            lng,
        } = this.props;

        if (cityName === '') {
            const _cityName = await this.getLocation(lat, lng);
            this.props.updateCityName(_cityName);
        }
    }

    render() {
        const {
            cityName,
            summary,
            icon,
            temperature,
            error,
        } = this.props;

        if (error.length) {
            Swal.fire({
                title: 'Error!',
                text: error,
                type: 'error',
            });
        }

        return (
            <Layout>
                <Container>
                    <Row>
                        <Col xs={{ span: 6, offset: 3 }}>
                            <h1>The weather in {cityName} today</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 4, offset: 4 }}>
                            <div className="img-container">
                                <Image src={`/static/img/icons/${icon}.png`} fluid />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 4, offset: 4 }}>
                            <div className="result-box">
                                <div className="result temperature">
                                    {temperature}°C
                                </div>
                                <div className="result summary">
                                    {summary}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <style jsx>{`
                    h1 {
                        text-align: center;
                    }

                    .img-container {
                        padding-top: 20px;
                        padding-bottom: 20px;
                    }

                    .result-box {
                        border: medium solid #fcfbe3;
                        padding: 10px;
                        border-radius: 10px;
                        background-color: #a5a48c;
                    }

                    .result {
                        text-align: center;
                        color: white;
                        font-weight: bold;
                    }

                    .temperature {
                        font-size: 5vw;
                    }

                    .summary {
                        font-size: xx-large;
                    }
                `}</style>
            </Layout >
        );
    }
}

Weather.getInitialProps = async ({ query }) => {
    try {
        const { lat, lng } = query;
        const response = await fetch(`http://localhost:3000/forecast/${lat},${lng}`);
        const json = await response.json();

        if (response.ok) {
            const {
                summary,
                icon,
                temperature,
            } = json.currently;

            return {
                summary,
                icon,
                temperature,
                error: '',
                lat,
                lng,
            };
        }

        throw new Error(json.error);
    } catch (err) {
        return {
            summary: '',
            icon: 'error',
            temperature: '',
            error: err.message,
            lat: '',
            lng: '',
        };
    }
};

function mapDispatchToProps(dispatch) {
    return {
        updateCityName: (payload) => dispatch({
            type: 'UPDATE_CITY_NAME',
            payload,
        })
    }
}

function mapStateToProps(state) {
    return {
        cityName: state.cityName,
    }
}

Weather = connect(mapStateToProps, mapDispatchToProps)(Weather);

export default withRouter(Weather);
