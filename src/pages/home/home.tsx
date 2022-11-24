import { useElementSize } from '@mantine/hooks';
import React from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import {
  fadeFromLeft,
  fadeFromRight,
} from './components/animations/fadeInAnimations';
import Footer from './components/footer/footer';
import FullScreenImage from './components/fullScreenImage/fullScreenImage';
import Jumbo from './components/jumbo/jumbo';
import Section1 from './components/sections/section1';
import Section2 from './components/sections/section2';
import Section3 from './components/sections/section3';
import styles from './home.module.css';

const Home: React.FC = (): JSX.Element => {
  const { ref, width, height } = useElementSize();

  return (
    <ParallaxProvider>
      <div className={styles.container}>
        <div ref={ref}>
          {width && height && <Jumbo width={width} height={height} />}
        </div>
        <div className={styles.content}>
          <Reveal delay={200} keyframes={fadeFromLeft}>
            <div className={styles.image_section}>
              <FullScreenImage position='left'>
                <LazyLoadImage
                  className={styles.image}
                  alt={'First Screenshot'}
                  src='/images/1.png' // use normal <img> attributes as props
                />
              </FullScreenImage>

              <Parallax speed={-10}>
                <div className={styles.image_right_section}>
                  <Section1 />
                </div>
              </Parallax>
            </div>
          </Reveal>
          <Reveal keyframes={fadeFromRight} delay={200}>
            <div className={styles.image_section_opposite}>
              <Parallax speed={-10}>
                <div className={styles.image_right_section}>
                  <Section2 />
                </div>
              </Parallax>
              <FullScreenImage position='right'>
                <LazyLoadImage
                  className={styles.image}
                  alt={'First Screenshot'}
                  src='/images/2.png' // use normal <img> attributes as props
                />
              </FullScreenImage>
            </div>
          </Reveal>
          <Reveal keyframes={fadeFromLeft} delay={200}>
            <div className={styles.image_section}>
              <FullScreenImage position='left'>
                <LazyLoadImage
                  className={styles.image}
                  alt={'First Screenshot'}
                  src='/images/3.png' // use normal <img> attributes as props
                />
              </FullScreenImage>

              <Parallax speed={-10}>
                <div className={styles.image_right_section}>
                  <Section3 />
                </div>
              </Parallax>
            </div>
          </Reveal>
        </div>
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default Home;
