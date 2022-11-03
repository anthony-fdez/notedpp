import React from 'react';
import LoginButton from '../../components/auth/loginButton/loginButton';
import styles from './home.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Home: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.jumbo}>
        <div className={styles.jumbo_text_container}>
          <div>
            <span>Noted++</span>
            <h1>Browser based notes app for all your notes needs.</h1>
          </div>
          <LoginButton />
        </div>
        <div className={styles.bottom_fade} />
      </div>
      <div className={styles.content}>
        <div className={styles.image_section}>
          <LazyLoadImage
            className={styles.image}
            alt={'First Screenshot'}
            src='/images/1.png' // use normal <img> attributes as props
          />
          <div className={styles.image_right_section}>
            <img
              className={styles.illustration_image}
              alt='Writer'
              src='/writer.svg'
            />
            <h2 className={styles.image_section_header}>
              Fully Feature Rich Text Editor!
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s
            </p>
          </div>
        </div>
        <div className={styles.image_section}>
          <LazyLoadImage
            className={styles.image}
            alt={'First Screenshot'}
            src='/images/2.png' // use normal <img> attributes as props
          />
          <div className={styles.image_right_section}>
            <img
              className={styles.illustration_image}
              alt='Workflow'
              src='/workflow.svg'
            />
            <h2 className={styles.image_section_header}>
              Productivity workflow!
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s
            </p>
          </div>
        </div>
        <div className={styles.image_section}>
          <LazyLoadImage
            className={styles.image}
            alt={'First Screenshot'}
            src='/images/3.png' // use normal <img> attributes as props
          />
          <div className={styles.image_right_section}>
            <img
              className={styles.illustration_image}
              alt='Collaboration'
              src='/collaboration.svg'
            />
            <h2 className={styles.image_section_header}>
              A collaboration environment.
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s
            </p>
          </div>
        </div>
        <div className={styles.footer}>
          <img src='/icon.png' />
          <h1>Noted++</h1>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
