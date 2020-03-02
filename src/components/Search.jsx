import React, { useState, useEffect } from "react";
import Select from "react-select";
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
  const [recipes, setRecipes] = useState([]);
  const [flavours, setFlavours] = useState([]);
  const [eans, setEANs] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [searchQueryURL, setSearchQueryURL] = useState("");

  const refreshResults = meta => {
    return selectedOptions => {
      // console.log("Meta:", meta, ">>>>", selectedOptions);
      if (!selectedOptions || !selectedOptions[0]) {
        setSearchQuery({ ...searchQuery, [meta]: null });
        return;
      }
      setSearchQuery({ ...searchQuery, [selectedOptions[0].meta]: selectedOptions.map(el => el.value) });
    };
  };

  // if (searchQueryURL) handleSearch(searchQueryURL);

  useEffect(() => {
    setSearchQueryURL("/assets/search?" + qs.stringify(searchQuery, { arrayFormat: "comma", skipNull: true }));
    if (searchQueryURL) handleSearch(searchQueryURL);
    // handleSearch(searchQueryURL);
  }, [searchQuery, searchQueryURL]);

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

        <input type="text" name="name" className="form-control form-control-sm" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="brand" className="small">
          Brand
        </label>
        <Select
          options={meta_brand}
          autoFocus={true}
          isMulti
          onChange={refreshResults("meta_brand")}
          noOptionsMessage={() => "Sorry, there are no results..."}
          name="meta_brand"
          id="brand"
          components={animatedComponents}
          classNamePrefix="react-select"
          theme={customTheme}
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
        />
      </div>
    </div>
  );
}
