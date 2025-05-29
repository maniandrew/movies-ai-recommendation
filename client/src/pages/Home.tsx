import React from 'react';
import { Button, Container } from 'react-bootstrap';
import styles from './Home.module.css'
import { BoxArrowInRight, PersonPlus } from 'react-bootstrap-icons';

const Home: React.FC = () => {
    
    return (
        <Container className={styles.homeContainer}>
            <Container className={styles.homeMainContent}>
                <h1>Face Authentication</h1>
                <Container className={styles.homeContextText}>
                    <p>The Facial Recognition-Based Authentication Application is a cutting-edge web application developed using React and face-api.js. The main objective of the application is to offer a reliable and efficient authentication system by analyzing and verifying the user's facial features.</p>
                </Container>
                <Container className={styles.homeContextActionButtons}>
                    <Button className={styles.buttons} >
                        <PersonPlus size={25} /> Register
                    </Button>
                    <Button className={styles.buttons}>
                        <BoxArrowInRight size={25} /> Login
                    </Button>
                </Container>
            </Container>
        </Container>
    )
}

export default Home;