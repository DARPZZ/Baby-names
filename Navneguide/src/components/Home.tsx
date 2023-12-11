import './HomeCSS.css';
import { Typewriter } from 'react-simple-typewriter'
import logo from './Billeder/EBN Logo.png';
function Home() {
  return( 
    <div className='home-page'>
      <div className=' typewriter'>
        <h1 style={{ color: 'whitesmoke', paddingTop: '5rem', margin: 'auto 0', fontWeight: 'bold' }}>
         Vi kan hjælpe dig med at{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            <Typewriter
              words={['finde drenge navne', 'finde pige navne', 'finde populære navne']}
              loop={Infinity}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>
      </div>
      <div className='home-container'>
        
      <img className="LOGO" src={logo} />

      </div>
  </div> 
)};

export default Home