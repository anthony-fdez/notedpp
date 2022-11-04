import React from 'react';
import LoginButton from '../../components/auth/loginButton/loginButton';
import styles from './home.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Fade } from 'react-awesome-reveal';
import { Text } from '@mantine/core';
import Jumbo from './components/jumbo/jumbo';
import Footer from './components/footer/footer';

const Home: React.FC = (): JSX.Element => {
  return (
    <ParallaxProvider>
      <div className={styles.container}>
        <Jumbo />
        <div className={styles.content}>
          <Fade triggerOnce delay={500}>
            <div className={styles.image_section}>
              <LazyLoadImage
                className={styles.image}
                alt={'First Screenshot'}
                src='/images/1.png' // use normal <img> attributes as props
              />
              <Parallax speed={-10}>
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                  </p>
                </div>
              </Parallax>
            </div>
          </Fade>
          <Fade triggerOnce delay={500}>
            <div className={styles.image_section}>
              <LazyLoadImage
                className={styles.image}
                alt={'First Screenshot'}
                src='/images/2.png' // use normal <img> attributes as props
              />
              <Parallax speed={-10}>
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                  </p>
                </div>
              </Parallax>
            </div>
          </Fade>
          <Fade triggerOnce delay={500}>
            <div className={styles.image_section}>
              <LazyLoadImage
                className={styles.image}
                alt={'First Screenshot'}
                src='/images/3.png' // use normal <img> attributes as props
              />
              <Parallax speed={-10}>
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                  </p>
                </div>
              </Parallax>
            </div>
          </Fade>
        </div>
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default Home;
