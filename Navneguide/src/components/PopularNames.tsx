import React, { useEffect, useState } from 'react';
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

          // Remove leading digit if present
          name = name.replace(/^\d+/, ''); 

          const populationNode = $(element).find('div.aon-name-listing__link-population');
          const population = populationNode.text().trim();

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
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Male_symbol_%28bold%29.svg/330px-Male_symbol_%28bold%29.svg.png"
          />
          {renderNameList(namesData.filter(item => item.gender === 'Male'))}
        </div>
        <div className='popnames2'>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8hKzJCaHdksGFof_3UecLLNCZZUM5b-_Kyg&usqp=CAU"
            className='small-image'
          />
          {renderNameList(namesData.filter(item => item.gender === 'Female'))}
        </div>
        <div className='popnames3'>
          <img
            src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX47099397.jpg"
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
