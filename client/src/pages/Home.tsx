import React from 'react';
import '../assets/styles/global.css';
import styles from './Home.module.css'

const Home: React.FC = () => {
    return (
        <div className={styles.homeContainer}>
            <h2>welcome to home page</h2>
        </div>
    )
}

export default Home;