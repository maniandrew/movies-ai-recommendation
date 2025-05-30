import React from 'react'
import styles from './Register.module.css';
import { Col, Container, Row, Image } from 'react-bootstrap';
import registrationImg from '../../assets/images/register-img.png'

const Register: React.FC = () => {
    return (
        <Container className={styles.registrationContainer}>
            <Row>
                <Col xs={12} md={6}>
                    <div className="registration-step">
                        <h2>Please <span className='primary'> Scan Your Face </span>  to Complete Registration.</h2>
                        <div className={styles.registrationContentSection}>
                            <button className="primary-button" >
                                Start Face Scan
                            </button>
                        </div>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div className={styles.registerImgContainer}>
                        <Image src={registrationImg} alt="Home Banner"
                            fluid
                            rounded>
                        </Image>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register