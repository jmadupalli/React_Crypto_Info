import React from 'react';
import { Line } from 'react-chartjs-2';
import "chart.js/auto";
import { Col, Row, Typography } from 'antd';

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i--) {
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString());
    }
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };
    return (
        <>
            <Row className='chart-header'>
                <Typography.Title level={2} className="chart-title">{coinName} Price Chart</Typography.Title>
                <Col className='price-container'>
                    <Typography.Title level={5} className="price-change">{coinHistory?.data?.change}%</Typography.Title>
                    <Typography.Title level={5} className="current-price">Current {coinName} Price: ${currentPrice}</Typography.Title>
                </Col>
            </Row>
            <Line data={data} options={options} />

        </>

    )
}
export default LineChart