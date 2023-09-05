import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

const CryptoDetails = () => {
    const [timePeriod, setTimePeriod] = useState('7d');
    const { coinId } = useParams();

    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

    if (isFetching) return 'Loading...';

    const cryptoDetails = data?.data?.coin;
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];
    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Typography.Title level={2} className='coin-name'>
                    {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                </Typography.Title>
                <p>
                    {cryptoDetails.name} live price in USD.
                    View value stats, marketcap, and supply.
                </p>
            </Col>
            <Select
                defaultValue='7d'
                className='select-timeperiod'
                placeholder='Select Time Period'
                onChange={(val) => setTimePeriod(val)}
            >
                {time.map((date) => <Select.Option key={date}>{date}</Select.Option>)}
            </Select>
            {/* cgart*/}
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Typography.Title level={3} className='coin-details-heading'>
                            {cryptoDetails.name} Value Statistics
                        </Typography.Title>
                        <p>
                            An overview showing the stats of {cryptoDetails.name}
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Typography.Text>{icon}</Typography.Text>
                                <Typography.Text>{title}</Typography.Text>
                            </Col>
                            <Typography.Text className='stats'>{value}</Typography.Text>
                        </Col>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails