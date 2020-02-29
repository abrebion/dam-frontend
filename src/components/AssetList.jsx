import React from "react";
import AssetCard from "./AssetCard";

export default function AssetList() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">
      {list.map((asset, i) => (
        <AssetCard
          key={i}
          img="https://res.cloudinary.com/dkx479spl/image/upload/v1582663942/dam/default/default_v2_preview.png"
          name="Oasis O'Verger Parfum Fraise-Framboise 6x33cl"
          type="Product"
          extension="png"
          bytes={5678900}
          width="1500"
          height="1500"
          ean="1234567890123"
        />
      ))}
    </div>
  );
}
