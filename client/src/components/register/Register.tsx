import React, { useRef, useState } from 'react'
import styles from './Register.module.css';
import { Col, Container, Row, Image } from 'react-bootstrap';
import registrationImg from '../../assets/images/register-img.png';
import '../../assets/styles/global.css';
import { FaCamera, FaUpload } from 'react-icons/fa';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';


const validationSchema = yup.object({
    userName: yup.string().required('Username is required*')
}).required();



type FormData = {
    userName: string;
};

const Actions = {
    LOGIN: 'Login',
    REGISTER: 'Sign up',
    START_FACE_SCAN: 'Start Face Scan'
}

const Register: React.FC = () => {

    const [actionContext, setActionContext] = useState<string>(Actions.START_FACE_SCAN);
    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [fileDetails, setFileDetails] = useState<File | null>(null);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: yupResolver(validationSchema)
    });

    const userName = watch('userName');

    const isNameValid = userName && !errors.userName;

    const navigate = useNavigate();

    const onSubmit = (formData: FormData) => {
        if (actionContext === Actions.START_FACE_SCAN) {
            if (formData.userName) {
                navigate('/face-scanner' , {
                    state: {
                        userName: userName
                    }
                });
            }
        }
    }

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageProcess = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileDetails(file)
            setActionContext(Actions.REGISTER);
            setReadOnly(true)
        }
    }

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current?.click();
        }
    }

    return (
        <Container className={styles.registrationContainer}>
            <Row>
                <Col xs={12} md={6}>
                    <div className="registration-step">
                        <h3>Secure Login with  <span className='primary'> Your Face </span>  to Complete Registration.</h3>
                        <hr />
                        <div className={styles.registrationContentSection}>
                            <div className={styles.registrationDescription}>
                                <div className={styles.contentIconsWrapper}>
                                    <p><FaCamera className={styles.regCameraIcon} /></p>
                                    <p>Use Your Webcam
                                        <span className='primary'> Enable your webcam and look at the camera </span>
                                        Our system will detect and verify your face in real time</p>
                                </div>

                                <div className={styles.contentIconsWrapper}>
                                    <p> <FaUpload className={styles.regCameraIcon} /> </p>
                                    <p>  Upload an image , Upload a clear image of your face
                                        Make sure the photo is <span className='primary'> front-facing and well-lit</span></p>
                                </div>
                            </div>
                            <div className={styles.dottedSection}>
                                <div className={styles.nameContainer}>
                                    <form>
                                        <input
                                            {...register('userName')}
                                            type='text'
                                            placeholder='Enter Your Name'
                                            readOnly={readOnly}
                                        ></input>
                                        {errors.userName && <p className={styles.errorMessage}>{errors.userName.message}</p>}
                                    </form>
                                </div>
                                {isNameValid && <div className={styles.uploadIconWrapper}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleImageProcess}
                                    />
                                    <div className={styles.uploadIconSection} onClick={handleIconClick}>
                                        <FaUpload className={styles.uploadIcon} />
                                    </div>
                                </div>}
                                <div className={styles.uploadContent}>
                                    <React.Fragment>
                                        {
                                            isNameValid && !fileDetails && (
                                                <React.Fragment>
                                                    <p>Click to upload your profile picture</p>
                                                    <p>Supported Format: <span className={styles.spanClickContainer}>
                                                        PNG, JPG, or JPEG
                                                    </span>
                                                    </p>
                                                </React.Fragment>
                                            )
                                        }
                                        {fileDetails && (
                                            <p>Selected file: <span className='primary'> {fileDetails.name}</span></p>
                                        )}


                                    </React.Fragment>
                                </div>
                            </div>
                        </div>
                        <div className={styles.registrationActionSection}>
                            <button className="primary-button" onClick={handleSubmit(onSubmit)}>
                                {actionContext}
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