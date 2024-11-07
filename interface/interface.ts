export interface WeatherResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temperature: number;
    weather_icons: string[];
    weather_descriptions: string[];
    feelslike: number;
    wind_speed: number;
    wind_dir: string;
    pressure: number;
  };
}
