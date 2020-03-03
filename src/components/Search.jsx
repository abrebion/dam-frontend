import React, { useState, useEffect } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import api from "../api/apiHandler";
import qs from "query-string";

const animatedComponents = makeAnimated();

const meta_brand = [
  { value: "Schweppes", label: "Schweppes", meta: "meta_brand" },
  { value: "Orangina", label: "Orangina", meta: "meta_brand" },
  { value: "Oasis", label: "Oasis", meta: "meta_brand" },
  { value: "Oasis O'Verger", label: "Oasis O'Verger", meta: "meta_brand" },
  { value: "MayTea", label: "MayTea", meta: "meta_brand" },
  { value: "Pulco", label: "Pulco", meta: "meta_brand" },
  { value: "Champomy", label: "Champomy", meta: "meta_brand" },
  { value: "Gini", label: "Gini", meta: "meta_brand" },
  { value: "Canada Dry", label: "Canada Dry", meta: "meta_brand" },
  { value: "Pampryl", label: "Pampryl", meta: "meta_brand" },
  { value: "Ricqlès", label: "Ricqlès", meta: "meta_brand" },
  { value: "Brut de Pomme", label: "Brut de Pomme", meta: "meta_brand" },
  { value: "Banga", label: "Banga", meta: "meta_brand" }
];

const meta_capacity = [
  { value: "2l", label: "2l", meta: "meta_capacity" },
  { value: "1.5l", label: "1.5l", meta: "meta_capacity" },
  { value: "1l", label: "1l", meta: "meta_capacity" },
  { value: "50cl", label: "50cl", meta: "meta_capacity" },
  { value: "33cl", label: "33cl", meta: "meta_capacity" },
  { value: "25cl", label: "25cl", meta: "meta_capacity" },
  { value: "15cl", label: "15cl", meta: "meta_capacity" }
];

const meta_packaging = [
  { value: "PET", label: "PET", meta: "meta_packaging" },
  { value: "CAN", label: "CAN", meta: "meta_packaging" },
  { value: "VERRE", label: "VERRE", meta: "meta_packaging" }
];

const meta_format = [
  { value: "Standard", label: "Standard", meta: "meta_format" },
  { value: "Lot Gratuité", label: "Lot Gratuité", meta: "meta_format" },
  { value: "Lot Physique", label: "Lot Physique", meta: "meta_format" }
];

const customTheme = theme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#007696" // active option
      // primary25: "#b4ebfa", // rollover on option
      // primary50: "#a2dff0", // click on option
      // danger: "#ce071c"
    }
  };
};

export default function Search({ handleSearch }) {
  const [nameSelect, setNameSelect] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [flavours, setFlavours] = useState([]);
  const [eans, setEANs] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [brandSelect, setBrandSelect] = useState([]);
  const [recipeSelect, setRecipeSelect] = useState([]);
  const [flavourSelect, setFlavourSelect] = useState([]);
  const [packagingSelect, setPackagingSelect] = useState([]);
  const [capacitySelect, setCapacitySelect] = useState([]);
  const [formatSelect, setFormatSelect] = useState([]);
  const [tagsSelect, setTagsSelect] = useState([]);
  const [eanSelect, setEanSelect] = useState([]);

  const refreshResults = meta => {
    return selectedOptions => {
      // console.log("Meta:", meta, ">>>>", selectedOptions);
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
      setSearchQuery({ ...searchQuery, [selectedOptions[0].meta]: selectedOptions.map(el => el.value) });
    };
  };

  const loadAsyncNames = async (inputValue, callback) => {
    try {
      const fetchedNames = await api.get("/assets");
      const returnedNames = fetchedNames.data.map(el => {
        return { value: el.name, label: el.name, meta: "name" };
      });
      const filteredNames = returnedNames.filter(el => el.label.match(new RegExp(inputValue, "gi")));
      console.log(filteredNames);
      callback(filteredNames);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery) handleSearch("/assets/search?sort=-createdAt&" + qs.stringify(searchQuery, { arrayFormat: "comma", skipNull: true }));
  }, [searchQuery]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const fetchedTags = await api.get("/tags");
        const tags = fetchedTags.data.map(el => {
          return { value: el._id, label: el.name, meta: "meta_tags" };
        });
        setTags(tags);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchRecipes() {
      try {
        const fetchedRecipes = await api.get("/assets/recipes");
        const recipes = fetchedRecipes.data.map(el => {
          return { value: el, label: el, meta: "meta_recipe" };
        });
        setRecipes(recipes);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchFlavours() {
      try {
        const fetchedFlavours = await api.get("/assets/flavours");
        const flavours = fetchedFlavours.data.map(el => {
          return { value: el, label: el, meta: "meta_flavour" };
        });
        setFlavours(flavours);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchEANs() {
      try {
        const fetchedEANs = await api.get("/assets/eans");
        const eans = fetchedEANs.data.map(el => {
          return { value: el, label: el, meta: "meta_ean13" };
        });
        setEANs(eans);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTags();
    fetchRecipes();
    fetchFlavours();
    fetchEANs();
  }, []);

  const handleNameChange = newValue => {
    setNameSelect({ newValue });
    return newValue;
  };

  const handleResetFilters = e => {
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
          options={meta_brand}
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
          options={recipes}
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
          options={flavours}
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
          options={meta_capacity}
          isMulti
          onChange={refreshResults("meta_capacity")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_capacity"
          id="capacity"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={capacitySelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="packaging" className="small">
          Packaging
        </label>

        <Select
          options={meta_packaging}
          isMulti
          onChange={refreshResults("meta_packaging")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_packaging"
          id="packaging"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
          value={packagingSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="format" className="small">
          Format
        </label>

        <Select
          options={meta_format}
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
          options={tags}
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
          options={eans}
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
}
