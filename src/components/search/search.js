import {AsyncPaginate} from 'react-select-async-paginate';
import {useState} from 'react';
import {geoApiOptions,GEO_API_URL} from '../../api';
const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        // 搜索框中选择的城市的数据
        setSearch(searchData);
        onSearchChange(searchData); 
    }

    const loadOptions =  (inputValue) => {
        return fetch(`${GEO_API_URL}?minPopulation=10000&namePrefix=${inputValue}`,geoApiOptions)
        .then(response => response.json())
        .then( (response) => {
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude},${city.longitude}`,
                        label: `${city.city}, ${city.countryCode}`
                    }
                })
            }
        })
        .catch(err => console.error(err));
    }

    return(
        <AsyncPaginate 
            placeholder="Search for city"
            debounceTimeout={1000}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions} // function to load options, Array
    />)
}
export default Search;