import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='container-fluid'>
        <div className='row justify-content-around'>
          <div className='col-12 text-center'>
            <p className={styles.description}>
              <small>&copy; Copyright 2020</small>
            </p>
          </div>
          <div className='col-2'></div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
