import React from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import styles from './Home.module.css'
import homeImg from '../assets/images/home.png'


const Home: React.FC = () => {
    return (
        <Container className={styles.welcomeContainer}>
            <Row>
                <Col xs={12} md={6}>
                    <div className={styles.welcomeContentContainer}>
                        <div className="welcome-content-sections">
                            <h1>Welcome to CineMatch 🎥</h1>
                            <p>Your personal movie guide, powered by smart recommendations and
                                <span className='primary'> secure Face Lock login. </span>
                            </p>
                        </div>
                        <div className="welcome-content-sections">
                            <h3>🔒 Seamless & Secure</h3>
                            <p><span className='primary'> Log in using Face Recognition </span> — no passwords, just your smile.</p>

                        </div>
                        <div className="welcome-content-sections">
                            <h3>🎯 Spot-On Recommendations</h3>
                            <p>Discover movies you'll <span className='primary'> love based on your taste and watch</span> history.</p>
                        </div>
                        <div className="welcome-content-sections">
                            <h3>🌙 Dark Mode, Light Feel</h3>
                            <p>Enjoy a stylish and smooth experience — built for comfort in every light.</p>
                        </div>
                        <div className={styles.actionButtons}>
                            <button className="primary-button">Get started</button>
                            <button className="secondary-button">Learn more</button>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className={styles.homeImgContainer}>
                        <Image
                            src={homeImg}
                            alt="Home Banner"
                            fluid
                            rounded
                        ></Image>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default Home;