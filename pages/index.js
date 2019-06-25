import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Router from 'next/router';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import _ from 'lodash';

import Layout from '../components/Layout';

class Index extends Component {
    constructor() {
        super();
        this.state = {
            cityName: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.getCoord = this.getCoord.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();

        const { cityName } = this.state;
        const {
            lat,
            lng,
        } = await this.getCoord(cityName);

        this.props.updateCityName(_.startCase(cityName));

        Router.push(`/weather?lat=${lat}&lng=${lng}`, `/weather/${lat},${lng}`);
    }

    async getCoord(location = '') {
        try {
            const response = await fetch(`http://localhost:3000/coord/${location}`);
            const json = await response.json();

            if (response.ok) {
                const {
                    lat,
                    lng,
                } = json.results[0].locations[0].latLng;

                return {
                    lat,
                    lng,
                };
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

    render() {
        const { cityName } = this.state;
        return (
            <Layout>
                <Container>
                    <Row>
                        <Col xs={{ span: 6, offset: 3 }}>
                            <h1>Tri's Weather App</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 4, offset: 4 }}>
                            <div className="img-container">
                                <Image src="/static/img/logo.png" fluid />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 6, offset: 3 }}>
                            <Row>
                                <Col>
                                    <Form.Label>Your location</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={10}>
                                    <Form id="city-name" onSubmit={this.onSubmit}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter the city where you live"
                                            value={cityName}
                                            onChange={e => this.setState({ cityName: e.target.value })}
                                        />
                                    </Form>
                                </Col>
                                <Col sm={2}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={cityName.length === 0}
                                        form="city-name"
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
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
                `}</style>
            </Layout >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateCityName: (payload) => dispatch({
            type: 'UPDATE_CITY_NAME',
            payload,
        })
    }
}

Index = connect(null, mapDispatchToProps)(Index);

export default Index;
