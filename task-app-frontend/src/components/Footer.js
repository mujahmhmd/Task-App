import React from 'react'

export const Footer = () => {
  const year = new Date();

  return (
    <footer className='fixed-bottom font-bold text-center bg-indigo-900 text-blue-200'>Copyright &copy; {year.getFullYear()}</footer>
  )
}

export default Footer;