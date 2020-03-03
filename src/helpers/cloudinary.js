import sha1 from "sha1";
import axios from "axios";

export function generateArchive(public_ids = [], mode = "download") {
  try {
    const timestamp = Date.now();
    const api_key = process.env.REACT_APP_CLOUDINARY_KEY;
    const api_secret = process.env.REACT_APP_CLOUDINARY_SECRET;
    const expireAt = Math.round(timestamp / 1000) + 7 * 24 * 60 * 60; // 1 week
    const stringToHash = `allow_missing=true&expires_at=${expireAt}&flatten_folders=true&mode=${mode}&public_ids=${public_ids}&target_format=zip&timestamp=${timestamp}&use_original_filename=true${api_secret}`;

    // const stringToHash = `allow_missing=true${
    //   mode === "create" ? "&async=true" : ""
    // }&expires_at=${expireAt}&flatten_folders=true&mode=${mode}&public_ids=${public_ids}&target_format=zip&timestamp=${timestamp}&use_original_filename=true${api_secret}`;

    const signature = sha1(stringToHash);
    const options = {
      allow_missing: true,
      expires_at: expireAt,
      flatten_folders: true,
      mode: mode,
      public_ids: public_ids,
      use_original_filename: true,
      target_format: "zip",
      timestamp: timestamp,
      api_key: api_key,
      signature: signature
    };
    // if (mode === "create") options.async = true;
    return axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/generate_archive`, options, {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    });
    // const response = await axios.post(
    //   `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/generate_archive?allow_missing=true&expires_at=${expireAt}&mode=${mode}&public_ids=${public_ids}&target_format=zip&timestamp=${timestamp}&use_original_filename=true&api_key=${api_key}&signature=${signature}`
    // );
    // return response;
  } catch (error) {
    return error;
  }
}
