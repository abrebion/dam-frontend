import React, { useState, useEffect } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import api from "../../api/apiHandler";
import qs from "query-string";
// Redux Store
import { connect } from "react-redux";
import { searchAssets } from "../../redux/actions/search";
import { loadAssetFilters } from "../../redux/actions/assets";

const animatedComponents = makeAnimated();

const customTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#007696", // active option
      // primary25: "#b4ebfa", // rollover on option
      // primary50: "#a2dff0", // click on option
      // danger: "#ce071c"
    },
  };
};

const Search = ({ filters, loadAssetFilters, handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState({});
  const [nameSelect, setNameSelect] = useState("");
  const [brandSelect, setBrandSelect] = useState([]);
  const [recipeSelect, setRecipeSelect] = useState([]);
  const [flavourSelect, setFlavourSelect] = useState([]);
  const [packagingSelect, setPackagingSelect] = useState([]);
  const [capacitySelect, setCapacitySelect] = useState([]);
  const [formatSelect, setFormatSelect] = useState([]);
  const [tagsSelect, setTagsSelect] = useState([]);
  const [eanSelect, setEanSelect] = useState([]);

  useEffect(() => {
    loadAssetFilters();
  }, []);

  useEffect(() => {
    if (searchQuery) handleSearch("/assets/search?sort=-createdAt&" + qs.stringify(searchQuery, { arrayFormat: "comma", skipNull: true }));
  }, [searchQuery]);

  const refreshResults = (meta) => {
    return (selectedOptions) => {
      switch (meta) {
        case "name":
          if (selectedOptions) setNameSelect(selectedOptions.name);
          else setNameSelect(null);
          break;
        case "meta_brand":
          if (selectedOptions) setBrandSelect([...selectedOptions]);
          else setBrandSelect(null);
          break;
        case "meta_recipe":
          if (selectedOptions) setRecipeSelect([...selectedOptions]);
          else setRecipeSelect(null);
          break;
        case "meta_flavour":
          if (selectedOptions) setFlavourSelect([...selectedOptions]);
          else setFlavourSelect(null);
          break;
        case "meta_capacity":
          if (selectedOptions) setCapacitySelect([...selectedOptions]);
          else setCapacitySelect(null);
          break;
        case "meta_packaging":
          if (selectedOptions) setPackagingSelect([...selectedOptions]);
          else setPackagingSelect(null);
          break;
        case "meta_format":
          if (selectedOptions) setFormatSelect([...selectedOptions]);
          else setFormatSelect(null);
          break;
        case "meta_tags":
          if (selectedOptions) setTagsSelect([...selectedOptions]);
          else setTagsSelect(null);
          break;
        case "meta_ean13":
          if (selectedOptions) setEanSelect([...selectedOptions]);
          else setEanSelect(null);
          break;
        default:
          break;
      }
      if (meta === "name" && selectedOptions) {
        setSearchQuery({ ...searchQuery, name: selectedOptions.value });
        return;
      }
      if (!selectedOptions || !selectedOptions[0]) {
        setSearchQuery({ ...searchQuery, [meta]: null });
        return;
      }
      setSearchQuery({ ...searchQuery, [selectedOptions[0].meta]: selectedOptions.map((el) => el.value) });
    };
  };

  const loadAsyncNames = async (inputValue, callback) => {
    try {
      const fetchedNames = await api.get("/assets");
      const returnedNames = fetchedNames.data.map((el) => {
        return { value: el.name, label: el.name, meta: "name" };
      });
      const filteredNames = returnedNames.filter((el) => el.label.match(new RegExp(inputValue, "gi")));
      callback(filteredNames);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (newValue) => {
    setNameSelect({ newValue });
    return newValue;
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    setNameSelect(null);
    setBrandSelect(null);
    setRecipeSelect(null);
    setFlavourSelect(null);
    setCapacitySelect(null);
    setPackagingSelect(null);
    setFormatSelect(null);
    setTagsSelect(null);
    setEanSelect(null);
    setSearchQuery(null);
    handleSearch();
  };

  return (
    <div className="search border rounded p-3" style={{ backgroundColor: "white" }}>
      <p className="small">
        Intuitively search for digital assets,
        <br />
        using mutiple criteria and autocomplete.
      </p>
      <div className="form-group">
        <label htmlFor="name" className="small">
          Name
        </label>
        <AsyncSelect
          cacheOptions
          loadOptions={loadAsyncNames}
          defaultOptions
          onInputChange={handleNameChange}
          onChange={refreshResults("name")}
          noOptionsMessage={() => "Start typing..."}
          name="name"
          id="name"
          classNamePrefix="react-select"
          isClearable={true}
          value={nameSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="brand" className="small">
          Brand
        </label>
        <Select
          options={filters.meta_brand}
          isMulti
          onChange={refreshResults("meta_brand")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_brand"
          id="brand"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={brandSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Recipe" className="small">
          Recipe
        </label>
        <Select
          options={filters.meta_recipe}
          isMulti
          onChange={refreshResults("meta_recipe")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_recipe"
          id="recipe"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={recipeSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="flavour" className="small">
          Flavour
        </label>
        <Select
          options={filters.meta_flavour}
          isMulti
          onChange={refreshResults("meta_flavour")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_flavour"
          id="flavour"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={flavourSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="capacity" className="small">
          Capacity
        </label>
        <Select
          options={filters.meta_capacity}
          isMulti
          onChange={refreshResults("meta_capacity")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_capacity"
          id="capacity"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={packagingSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="packaging" className="small">
          Packaging
        </label>
        <Select
          options={filters.meta_packaging}
          isMulti
          onChange={refreshResults("meta_packaging")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_packaging"
          id="packaging"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={capacitySelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="format" className="small">
          Format
        </label>
        <Select
          options={filters.meta_format}
          isMulti
          onChange={refreshResults("meta_format")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_format"
          id="format"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={formatSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags" className="small">
          Tags
        </label>
        <Select
          options={filters.meta_tags}
          isMulti
          onChange={refreshResults("meta_tags")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_tags"
          id="tags"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={tagsSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ean" className="small">
          EAN
        </label>
        <Select
          options={filters.meta_ean}
          isMulti
          onChange={refreshResults("meta_ean13")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_eans13"
          id="ean"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={eanSelect}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-sm btn-block btn-primary mt-3" style={{ height: "38px" }} onClick={handleResetFilters}>
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filters: state.assets.filters,
});

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (url) => dispatch(searchAssets(url)),
  loadAssetFilters: () => dispatch(loadAssetFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
