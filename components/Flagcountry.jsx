'use client'

import React, { useEffect, useState } from 'react'




import {
    Card,
    CardContent,

    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Select,
    SelectContent,

    SelectItem,

    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const flagcountry = () => {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");

        if (!res.ok) {
          throw new Error(`Something went wrong: ${res.status}`);
        }

        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    send(selectedCountry);
  };

  const send = (country) => {
    const url = `https://restcountries.com/v2/name/${country}`;

    fetch(url)
      .then((res) => res.json())
      .then((countryData) => {
        const {
          capital,
          name,
          region,
          languages,
          flags: { svg },
          currencies,
        } = countryData[0];

        setCountryInfo({
          name,
          capital,
          region,
          svg,
          languages: languages[0].name,
          currency: `${Object.values(currencies)[0].name}, ${Object.values(
            currencies
          )[0].symbol}`,
        });
      })
      .catch((error) => console.log(error));
  };


  return (
    
      < >


 <select className='border p-3 rounded-xl border-bg-transparent border-r-[10px]' onChange={handleCountryChange} value={selectedCountry}>
        {countries.map((country) => (
          <option key={country.name.common} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select> 

          <div className='mt-10'>

          {countryInfo  &&
          <Card className="w-[290px] h-full">

        <CardHeader>
            <img className='w-full' src={countryInfo.svg} alt="flag" />
        </CardHeader>

        <CardTitle className="w-full p-5">
        <h2 className='text-[24px]'>{countryInfo.name}</h2>
        <p className='mt-2'>{countryInfo.capital}</p>
        </CardTitle>
        <CardContent>
        <ul>
                    <li>{countryInfo.region}</li>
                    <li>{countryInfo.languages}</li>
                    <li>{countryInfo.currency}</li>
                  </ul>
        </CardContent>

        </Card>
        
        }
          </div>
         






        
      </>
   
  )
}

export default flagcountry