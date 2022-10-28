import axios, { AxiosResponse } from 'axios';

export async function generateRandom(): Promise<any> {
  const randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return await axios.get(randomUrl).catch((error: any) => {
    console.log('error', error);
  });
}
