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


const getValidationSchema = (isLogin: boolean) => {
    return yup.object(
        isLogin
            ? {} // No validation needed for userName
            : {
                userName: yup.string().required('Username is required*'),
            }
    );
}


type FormData = {
    userName?: string;
};

const Actions = {
    LOGIN: 'Login',
    REGISTER: 'Sign up',
    START_FACE_SCAN: 'Face Scan',
    IMAGE_SCAN: 'Image Scan',
    UPLOAD_IMAGE: 'Upload Image'
}

type Props = {
    isLogin: boolean
}

const Register: React.FC<Props> = ({ isLogin }) => {

    const registerTitle = <h3>Secure with  <span className='primary'> your face </span>  to complete Registration</h3>
    const loginTitle = <h3> Login with your <span className='primary'>face to complete Authentication </span> </h3>
    const [isFaceScan, setIsFaceScan] = useState<boolean>(true);
    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [fileDetails, setFileDetails] = useState<File | null>(null);
    const [isFaceButtonDisabled, setFaceButtonDisabled] = useState<boolean>(false);
    const [imageBtnCtxt, setImageBtnCtxt] = useState<string>(Actions.UPLOAD_IMAGE);
    const [isFileNotFound, setFileNotFound] = useState<boolean>(false);
    const validationSchema = getValidationSchema(isLogin);

    const TemplateTitle: React.FC = () => {
        return isLogin ? loginTitle : registerTitle
    }

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: yupResolver(validationSchema)
    });

    const userName = watch('userName');

    const isNameValid = userName && !errors.userName;

    const navigate = useNavigate();

    const onFaceScanSubmit = (formData: FormData) => {
        setFaceButtonDisabled(false);
        setIsFaceScan(true);
        if(isLogin) {
            navigate('/face-scanner', {
                state: {
                    userName: userName,
                    isFaceScan,
                    isLogin
                }
            });
            return;
        }
        if (!isLogin && formData.userName) {
            navigate('/face-scanner', {
                state: {
                    userName: userName,
                    isFaceScan,
                    isLogin
                }
            });
        }
    }


    const onImageScanSubmit = (formData: FormData) => {
        setIsFaceScan(false);
        setFaceButtonDisabled(true)
        setImageBtnCtxt(Actions.IMAGE_SCAN);
        if (formData.userName || isLogin) {
            if (imageBtnCtxt === Actions.IMAGE_SCAN) {
                if (!fileDetails) {
                    setFileNotFound(true);
                    return;
                }
                navigate('/face-scanner', {
                    state: {
                        userName: userName,
                        isFaceScan,
                        fileDetails,
                        isLogin
                    }
                });

            }

        }
    }


    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageProcess = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) setFileNotFound(true);
        if (file) {
            setFileDetails(file)
            setReadOnly(true)
            setFileNotFound(false)
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
                        <TemplateTitle />
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
                            {
                                <div className={styles.dottedSection}>
                                   {!isLogin && <div className={styles.nameContainer}>
                                        <form>
                                            <input
                                                {...register('userName')}
                                                type='text'
                                                placeholder='Enter Your Name'
                                                readOnly={readOnly}
                                            ></input>
                                            {errors.userName && <p className={styles.errorMessage}>{errors.userName.message}</p>}
                                        </form>
                                    </div>}
                                    {(isLogin || isNameValid) && !isFaceScan &&   <div className={styles.uploadIconWrapper}>
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
                                        <div style={{ marginTop: '5px', alignSelf: 'flex-start' }}>
                                            {isFileNotFound ? <p className='primary'>Please upload the image file*</p> : null}
                                        </div>
                                    </div>}
                                    <div className={styles.uploadContent}>
                                        <React.Fragment>
                                            {
                                                isNameValid && !fileDetails && !isFaceScan && (
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
                            }

                        </div>
                        <div className={styles.registrationActionSection}>
                            <button className="primary-button" onClick={handleSubmit(onFaceScanSubmit)} hidden={isFaceButtonDisabled}>
                                {Actions.START_FACE_SCAN}
                            </button>

                            <button className='secondary-button' onClick={handleSubmit(onImageScanSubmit)}>
                                {imageBtnCtxt}
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