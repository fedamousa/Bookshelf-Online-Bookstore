import React from 'react'
import Hero from '../components/hero/Hero'
import NewsletterSection from '../components/home/NewsletterSection'
import FavoriteBookSection from '../components/home/FavoriteBookSection'
import BookSection from '../components/home/BookSection'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [bookRef, bookInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [favoriteRef, favoriteInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [newsletterRef, newsletterInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div>
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <Hero />
      </motion.div>

      <motion.div
        ref={bookRef}
        initial="hidden"
        animate={bookInView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <BookSection />
      </motion.div>

      <motion.div
        ref={favoriteRef}
        initial="hidden"
        animate={favoriteInView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <FavoriteBookSection />
      </motion.div>

      <motion.div
        ref={newsletterRef}
        initial="hidden"
        animate={newsletterInView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <NewsletterSection />
      </motion.div>
    </div>
  )
}
