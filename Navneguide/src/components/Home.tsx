import './HomeCSS.css';
import { Typewriter } from 'react-simple-typewriter'

function Home() {
  return( 
    
    <div className='home-page'>
      <div className=' typewriter'>
        <h1 style={{ color: 'whitesmoke', paddingTop: '5rem', margin: 'auto 0', fontWeight: 'bold' }}>
         Vi kan hjælpe dig med at{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            <Typewriter
              words={['finde drenge navne', 'finde pige navne', 'finde populære navne', 'og meget mere !']}
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
        
            <img
                className="LOGO"
                src="https://cdn.discordapp.com/attachments/1060882642570072134/1181542272949563412/EBN_Logo.png?ex=65816ffd&is=656efafd&hm=810cada5243de0cb22e1547b225ff53043691a23fe21bd190a21bf678fb66fb2&"
              />
      </div>
  </div> 
)};

export default Home