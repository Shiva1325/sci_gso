import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import YoutubeIcon from '@material-ui/icons/YouTube';
import GithubIcon from '@material-ui/icons/GitHub';
import { FaDiscord } from 'react-icons/fa';
import '../Styles/footer.css';

const currYear = new Date().getFullYear();

const Footer = () => {
    return (
      <div className='footer'>
        <div className='socialMedia'>
            {/* <div className='discordIcon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path d="M19.2774 5.01386C17.9389 4.37206 16.5036 3.89921 15.0029 3.62839C14.9756 3.62317 14.9483 3.63623 14.9342 3.66235C14.7496 4.00545 14.5451 4.45304 14.402 4.80485C12.7879 4.55232 11.182 4.55232 9.60103 4.80485C9.45782 4.44522 9.24592 4.00545 9.0605 3.66235C9.04642 3.6371 9.01912 3.62404 8.99179 3.62839C7.49192 3.89835 6.05662 4.3712 4.71732 5.01386C4.70572 5.01908 4.69579 5.0278 4.68919 5.03911C1.96672 9.28954 1.22092 13.4355 1.58678 17.5301C1.58844 17.5501 1.5992 17.5693 1.6141 17.5814C3.41031 18.9599 5.15024 19.7968 6.85787 20.3515C6.8852 20.3602 6.91415 20.3497 6.93155 20.3262C7.33549 19.7498 7.69556 19.1419 8.00429 18.5027C8.02251 18.4653 8.00512 18.4209 7.96788 18.4061C7.39674 18.1797 6.8529 17.9036 6.32976 17.5902C6.28838 17.5649 6.28507 17.503 6.32314 17.4734C6.43323 17.3872 6.54334 17.2975 6.64846 17.207C6.66748 17.1904 6.69398 17.1869 6.71634 17.1974C10.1531 18.8371 13.8739 18.8371 17.2701 17.1974C17.2924 17.1861 17.3189 17.1896 17.3388 17.2061C17.4439 17.2967 17.554 17.3872 17.6649 17.4734C17.703 17.503 17.7005 17.5649 17.6591 17.5902C17.136 17.9097 16.5922 18.1797 16.0202 18.4052C15.983 18.42 15.9664 18.4653 15.9846 18.5027C16.3 19.141 16.66 19.7489 17.0565 20.3254C17.0731 20.3497 17.1029 20.3602 17.1302 20.3515C18.8461 19.7968 20.586 18.9599 22.3823 17.5814C22.398 17.5693 22.4079 17.551 22.4096 17.5309C22.8474 12.7972 21.6762 8.68521 19.3047 5.03998C19.2989 5.0278 19.289 5.01908 19.2774 5.01386ZM8.51752 15.0369C7.48281 15.0369 6.63024 14.0442 6.63024 12.825C6.63024 11.6059 7.46628 10.6132 8.51752 10.6132C9.57701 10.6132 10.4213 11.6146 10.4048 12.825C10.4048 14.0442 9.56873 15.0369 8.51752 15.0369ZM15.4954 15.0369C14.4607 15.0369 13.6082 14.0442 13.6082 12.825C13.6082 11.6059 14.4442 10.6132 15.4954 10.6132C16.5549 10.6132 17.3992 11.6146 17.3827 12.825C17.3827 14.0442 16.5549 15.0369 15.4954 15.0369Z" />
                </svg>
            </div> */}
            <FaDiscord className='icon'  />
            <FacebookIcon className='icon' />
            <GithubIcon className='icon' />
            <InstagramIcon className='icon'  />
            <LinkedInIcon className='icon'  />
            <TwitterIcon className='icon'  />
            <YoutubeIcon className='icon'  />

        </div>
        <div className='copyrightText'>
            <b> &copy; Copyright {currYear}: SCI-GSO</b>
        </div>
      </div>
    )
  }

export default Footer;