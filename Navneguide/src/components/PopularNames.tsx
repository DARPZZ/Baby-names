import React, { useEffect, useState } from 'react';
import maleLogo from './Billeder/Male-removebg-preview.png';
import femaleLogo from './Billeder/FemalePink.png';
import unisexLogo from './Billeder/Unisex.png';
import axios from 'axios';
import cheerio from 'cheerio';
import './PopularNamesCSS.css';
interface NameInfo {
  name: string;
  population: string;
  gender: string;
}

function PopularNames() {
  const [selectedYear, setSelectedYear] = useState<string>('2022');
  const [namesData, setNamesData] = useState<NameInfo[]>([]);

  useEffect(() => {
    const url: string = `https://www.navneguiden.dk/toplister/navne-til-nyfodte/${selectedYear}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const nameList: NameInfo[] = [];

        $('ul.aon-name-listing__list li').each((index, element) => {
          const nameNode = $(element).find('a div').first();
          let name = nameNode.text().trim();
          name = name.replace(/^\d+/, ''); 

          const populationNode = $(element).find('div.aon-name-listing__link-population');
          let population = populationNode.text().trim();
          population = population.replace(/fikk/g, 'fik');

          const genderClass = $(element).find('div[class*=gender-clock]');
          let gender = 'Unknown';

          if (genderClass.length > 0) {
            const circleNode = genderClass.find('circle');
            const strokeDashArray = circleNode.attr('style') || '';

            if (strokeDashArray.includes('stroke-dasharray:100 100')) {
              gender = 'Male';
            } else if (strokeDashArray.includes('stroke-dasharray:0 100')) {
              gender = 'Female';
            }
          }
        
          nameList.push({ name, population, gender });
        });

        setNamesData(nameList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const renderNameList = (names: NameInfo[]) => {
    return (
      <ul className="pop-names-list">
        {names.map((item, index) => (
          <li key={index}>
            Navn: {item.name} | Antal: {item.population} 
          </li>
        ))}
      </ul>
    );
  };



  
  return (
    <div className="Popularnames-group">
      <div className="popnames-container">
        
        <div className='popnames'>
          <img
            className="small-image"
            src= {maleLogo}
          />
          {renderNameList(namesData.filter(item => item.gender === 'Male'))}
        </div>
        <div className='popnames2'>
          <img
            src= {femaleLogo}
            className='small-image2'
          />
          {renderNameList(namesData.filter(item => item.gender === 'Female'))}
        </div>
        <div className='popnames3'>
          <img
            src= {unisexLogo}
            className='small-image'
          />
          {renderNameList(namesData.filter(item => item.gender === 'Unknown'))}
        </div>
      </div>
      <div>
        <label htmlFor="yearSelector">Select Year:</label>
        <select
          id="yearSelector"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {[...Array(23)].map((_, index) => {
            const year = 2000 + index;
            return (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default PopularNames;