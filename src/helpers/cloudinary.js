import sha1 from "sha1";
import axios from "axios";

export function generateArchive(public_ids = [], mode = "create") {
  try {
    const timestamp = Date.now();
    const api_key = process.env.REACT_APP_CLOUDINARY_KEY;
    const api_secret = process.env.REACT_APP_CLOUDINARY_SECRET;
    const expireAt = Math.round(timestamp / 1000) + 7 * 24 * 60 * 60; // 1 week
    const stringToHash = `allow_missing=true&expires_at=${expireAt}&flatten_folders=true&mode=${mode}&public_ids=${public_ids}&target_format=zip&timestamp=${timestamp}&use_original_filename=true${api_secret}`;
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
    if (mode === "download") {
      const public_ids_string = public_ids.reduce((acc, el) => {
        return (acc += "&public_ids[]=" + el);
      }, "");
      return `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/generate_archive?allow_missing=true&expires_at=${expireAt}&flatten_folders=true&mode=${mode}${public_ids_string}&target_format=zip&timestamp=${timestamp}&use_original_filename=true&api_key=${api_key}&signature=${signature}`;
    } else
      return axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/generate_archive`, options, {
        headers: { "X-Requested-With": "XMLHttpRequest" }
      });
  } catch (error) {
    return error;
  }
}
