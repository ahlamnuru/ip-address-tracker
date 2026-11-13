export type IpInfo = {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
  };
  isp: string;
};

const API_KEY = import.meta.env.VITE_IPIFY_API_KEY;
const BASE_URL = "https://geo.ipify.org/api/v2/country,city";

function isIpAddress(value: string) {
  const isIpv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(value);
  const isIpv6 = value.includes(":");
  return isIpv4 || isIpv6;
}

export async function fetchIpInfo(query: string): Promise<IpInfo> {
  if (!API_KEY) {
    throw new Error("API key is missing. Add VITE_IPIFY_API_KEY to your .env file.");
  }

  const params = new URLSearchParams({ apiKey: API_KEY });

  // with no ipAddress or domain, the API uses the visitor's own IP
  if (query) {
    if (isIpAddress(query)) {
      params.set("ipAddress", query);
    } else {
      params.set("domain", query);
    }
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (response.status === 422) {
    throw new Error("Please enter a valid IP address or domain.");
  }
  if (response.status === 401 || response.status === 403) {
    throw new Error("There is a problem with the API key.");
  }
  if (response.status === 429) {
    throw new Error("Too many requests. Please try again later.");
  }
  if (!response.ok) {
    throw new Error("Something went wrong. Please try again.");
  }

  return response.json();
}