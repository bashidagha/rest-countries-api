import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useParams,
} from "react-router-dom";
import localData from "./data/data.json";
import Country from "./components/Country";
import CountryDetail from "./components/CountryDetail";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import "./App.css";

function App() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [region, setRegion] = useState("Select All Region");

    const itemsPerPage = 20;

    useEffect(() => {
        setCountries(localData);
        setFilteredCountries(localData);
    }, []);

    // Apply filters when searchQuery or region changes
    useEffect(() => {
        if (region !== "Select All Region") {
            setFilteredCountries(
                countries.filter(
                    (country) =>
                        country.region.toLowerCase() === region.toLowerCase(),
                ),
            );
        }
        if (searchQuery) {
            setFilteredCountries(
                countries.filter((country) =>
                    country.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                ),
            );
        }
    }, [searchQuery, region, countries]);

    return (
        <Router basename="rest-countries-api">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PaginationPage
                            countries={filteredCountries}
                            itemsPerPage={itemsPerPage}
                            setSearchQuery={setSearchQuery}
                            setRegion={setRegion}
                            searchQuery={searchQuery}
                            region={region}
                        />
                    }
                />
                <Route
                    path="/page/:pageNumber"
                    element={
                        <PaginationPage
                            countries={filteredCountries}
                            itemsPerPage={itemsPerPage}
                            setSearchQuery={setSearchQuery}
                            setRegion={setRegion}
                            searchQuery={searchQuery}
                            region={region}
                        />
                    }
                />
                <Route path="/country/:name" element={<CountryDetail />} />
            </Routes>
        </Router>
    );
}

const PaginationPage = ({
    countries,
    itemsPerPage,
    setSearchQuery,
    setRegion,
    searchQuery,
    region,
}) => {
    const { pageNumber } = useParams();
    const navigate = useNavigate();

    const currentPage = parseInt(pageNumber || 1, 10);
    const totalPages = Math.ceil(countries.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCountries = countries.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    const handlePageChange = (page) => {
        navigate(`/page/${page}`);
    };

    return (
        <div>
            <Filters
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                region={region}
                onRegionChange={setRegion}
            />
            <div className="container">
                <div className="country-grid">
                    {paginatedCountries.map((country) => (
                        <Country country={country} key={country.name} />
                    ))}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default App;
