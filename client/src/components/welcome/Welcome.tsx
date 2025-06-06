import React from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import styles from './Welcome.module.css'
import homeImg from '../../assets/images/home.png';
import { useNavigate  } from 'react-router-dom';


const Welcome: React.FC = () => {

    const navigate = useNavigate();

    const handleRegister = ():void => {
       navigate('/register');
    }

    const handleLogin = (): void => {
        navigate('/login')
    }
    return (
        <Container className={styles.welcomeContainer}>
            <Row>
                <Col xs={12} md={6}>
                    <div className={styles.welcomeContentContainer}>
                        <div className={styles.welcomeContentSection}>
                            <h1>Welcome to CineMatch 🎥</h1>
                            <p>Your personal movie guide, powered by smart recommendations and
                                <span className='primary'> secure Face Lock login. </span>
                            </p>
                        </div>
                        <div className={styles.welcomeContentSection}>
                            <h4>🔒 Seamless & Secure</h4>
                            <p><span className='primary'> Log in using Face Recognition </span> — no passwords, just your smile.</p>

                        </div>
                        <div className={styles.welcomeContentSection}>
                            <h4>🎯 Spot-On Recommendations</h4>
                            <p>Discover movies you'll <span className='primary'> love based on your taste and watch</span> history.</p>
                        </div>
                        <div className={styles.welcomeContentSection}>
                            <h4>🌙 Dark Mode, Light Feel</h4>
                            <p>Enjoy a <span className='primary'> stylish and smooth </span> experience — built for comfort in every light.</p>
                        </div>
                        <div className={styles.actionButtons}>
                            <button className="primary-button" onClick={handleRegister}>Register</button>
                            <button className="secondary-button" onClick={handleLogin}>Login</button>
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

export default Welcome;