import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { CarDTO } from '../../dots/CarsDTO';

import { Container } from './styles';

const userId = 1;

export function MyCars() {
  const [ cars, setCars ] = useState<CarDTO[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function loadCars() {
      try{
        const {data} = await axios.get(`/schedules_byuser`,{
          params: {
            user_id: userId
          }
        });
        setCars(data);
        setLoading(false);
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false);
      }
    }

    loadCars();
  },[]);

  return (
    <Container>
    </Container>
  );
};
