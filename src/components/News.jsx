import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/newsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';
const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const count = (simplified) ? 6 : 12;
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count });
    const { data } = useGetCryptosQuery(count);
    if (!cryptoNews?.value) return 'Loading...';
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Select.Option value="Cryptocurrency"></Select.Option>
                        {data?.data?.coins.map((coin) => <Select.Option value={coin.name}>{coin.name}</Select.Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Typography.Title className='news-title' level={4}>{news.name}</Typography.Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt={news.name} />
                            </div>
                            <p>
                                {news.description.length > 150 ?
                                    `${news.description.substring(0, 150)}...`
                                    : news.description}
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                    <Typography.Text className='provider-name'>{news.provider[0]?.name}</Typography.Text>
                                </div>
                                <Typography.Text>{moment(news.datePublished).startOf('ss').fromNow()}</Typography.Text>

                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News