import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { performTradeAPI } from '../api/PerformTrade.js';
import { updateStocksAPI } from '../api/UpdateStocks.js';

const TradePlatformPage = () => {
  // Placeholder user data
  const [userData, setUserData] = useState({
    index: 'DOW',
    platform: 'Alpaca',
    risk: 'Low',
    perc_alloc: '50%',
    // Add more fields as needed
    newField: [], // New field for multi-select checkbox list
  });

  // State for form inputs
  const [formValues, setFormValues] = useState(userData);

  // State for stock options fetched from the updateStocksAPI
  const [stockOptions, setStockOptions] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle checkbox changes for the new field
  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    if (checked) {
      setFormValues({ ...formValues, [name]: [...formValues[name], value] });
    } else {
      setFormValues({ ...formValues, [name]: formValues[name].filter(item => item !== value) });
    }
  };

  // Handle form submission for updating stocks
  const handleUpdateStocks = async (e) => {
    e.preventDefault();
    try {
      // Call the update stocks API with formValues
      const response = await updateStocksAPI(formValues);
      // Extract the stock options from the response data
      const stocks = response.map(stock => ({
        label: stock.CompanyName,
        value: stock.StockTicker
      }));
      // Update the stockOptions based on the extracted stock options
      setStockOptions(stocks);
    } catch (error) {
      console.error('Error updating stocks:', error);
    }
  };


  // Handle form submission for performing trade
  const handlePerformTrade = async (e) => {
    e.preventDefault();
    try {
      // Get selected symbols from formValues
      const symbols = formValues.newField;
      
      // Make sure at least one symbol is selected
      if (symbols.length === 0) {
        console.error('No symbols selected for trade');
        return;
      }

      // Call the perform trade API with selected symbols
      const responses = await performTradeAPI(symbols);

      // Log or handle each response individually
      responses.forEach((response, index) => {
        console.log(`Trade ${index + 1} performed successfully:`, response);
      });
    } catch (error) {
      console.error('Error performing trade:', error);
    }
  };


  // // Fetch initial stock options when component mounts
  // useEffect(() => {
  //   const fetchStockOptions = async () => {
  //     try {
  //       const response = await updateStocksAPI(formValues);
  //       setStockOptions(response.stocks);
  //     } catch (error) {
  //       console.error('Error fetching stock options:', error);
  //     }
  //   };
  //   fetchStockOptions();
  // }, []); // Empty dependency array ensures this effect runs only once when component mounts
  

  return (
    <div className="background container">
      <div className="sidebar">
        <Sidebar></Sidebar>
      </div>

      <div className='main'>
        <div className="profile-container">
          <h1>Stock Recommendations for invetment</h1>
          <form onSubmit={handleUpdateStocks} className="profile-info form-container">
            <br/>
            <h2>Select Sector & Risk Level</h2>

            <div id="tradePreferences" className='form-container'>
                <div className="form-field">
              
                  <label htmlFor="sector">Sector </label>
                  
                  <select
                    id="sector"
                    name="sector"
                    value={formValues.sectot}
                    onChange={handleInputChange}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Industrials">Industrials</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Consumer Defensive">Consumer Defensive</option>
                    <option value="Communication Services">Communication Services</option>
                    <option value="Industrials">Basic Materials</option>
                  </select>


                    <label htmlFor="riskLevel">
                      Risk Level 
                    </label>
                    <select
                      id="riskLevel"
                      name="riskLevel"
                      value={formValues.riskLevel}
                      onChange={handleInputChange}
                    >
                      <option value="0">Low</option>
                      <option value="1">Medium</option>
                      <option value="2">High</option>
                    </select>
                </div>
                <div className="form-field">
                  <button className="profile-button" type="submit">Submit</button>
                </div>
            </div>
          </form>

          {/* New field for multi-select checkbox list */}
          <form onSubmit={handlePerformTrade} className="checkbox-list form-container">
            <h2>Stock Options</h2>
            <div className='stock-container'>
              {stockOptions.map((stock, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name="newField"
                    value={stock.value} // Use the value property from stockOptions
                    checked={formValues.newField.includes(stock.value)}
                    onChange={handleCheckboxChange}
                  /> {stock.label}
                </label>
              ))}
            </div>
            <br/>
            <button className="profile-button" type="submit">Perform Trade</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TradePlatformPage;
