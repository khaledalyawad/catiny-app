import APP_CONFIG from '../../config/app-config';
import {staticUrl} from "./url-utils";

const DEFAULT_IMAGE = APP_CONFIG.apiUrl + '/content/images/logo/Catiny-logo-250x250.png';
const DEFAULT_IMAGE_X3 = [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE];

/**
 * nếu không phải json thì return luôn chuỗi string đó
 * nếu là json : tìm link
 *             : không thì tìm url
 * mặc định return: "content/images/logo/Catiny-logo.svg"
 *
 * @param jsonOrUrl json chứa chi tiết của ảnh hoặc url ảnh
 * @return "content/images/logo/Catiny-logo.svg" (default)
 */
export const imageUrl = (jsonOrUrl) =>
{
  const su = staticUrl(jsonOrUrl);
  return su === "" || !su
    ? DEFAULT_IMAGE
    : su;
};
/**
 * ít nhất 3 ảnh
 * @param json
 * @return array
 */
export const multipleImageUrl = (json) =>
{
  if (json)
  {
    const jsonParsed = JSON.parse(json);
    if (!jsonParsed) return DEFAULT_IMAGE_X3;
    else if (jsonParsed)
      if (jsonParsed.links && jsonParsed.links.length > 2) return jsonParsed.links;
      else if (jsonParsed.urls && jsonParsed.urls.length > 2) return jsonParsed.urls;
  }
  else return DEFAULT_IMAGE_X3;
};
