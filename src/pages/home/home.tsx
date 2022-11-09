import { useElementSize } from '@mantine/hooks';
import React, { useState } from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import {
  fadeFromLeft,
  fadeFromRight,
} from './components/animations/fadeInAnimations';
import Footer from './components/footer/footer';
import Jumbo from './components/jumbo/jumbo';
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
                    Modern text editor which is easy to use and has every option
                    you would need. Making tables, typing code snippets, making
                    headers, everything is easy to do in noted++.
                  </p>
                </div>
              </Parallax>
            </div>
          </Reveal>
          <Reveal keyframes={fadeFromRight} delay={200}>
            <div className={styles.image_section_opposite}>
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
                    Managing your notes and tasks are now easier than ever!
                    Great schedule organizer; always keep track of what is next
                    in your life.
                  </p>
                </div>
              </Parallax>
              <LazyLoadImage
                className={styles.image}
                alt={'First Screenshot'}
                src='/images/2.png' // use normal <img> attributes as props
              />
            </div>
          </Reveal>
          <Reveal keyframes={fadeFromLeft} delay={200}>
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
                    Any kind of profession utilizes collaboration and
                    networking, and noted++ lets you do just that. Sharing notes
                    is as easy as one click and having the ability to have
                    multiple people working on one note is even easier!
                  </p>
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
