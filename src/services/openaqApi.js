// src/services/openaqApi.js
// Capa de servicios: centraliza toda la comunicación con la API de OpenAQ.
// Todas las páginas y componentes consumen la API únicamente a través de
// las funciones exportadas aquí (nunca hacen fetch directamente).

const API_URL = "/api/v3";
const API_KEY = import.meta.env.VITE_OPENAQ_API_KEY || "a355e801fc5f634c036453639393b93654725df8bafd2284bc9f0d990454a2aa";

/**
 * Helper interno para centralizar cabeceras, manejo de errores y parseo JSON.
 */
async function request(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "X-API-Key": API_KEY,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error API OpenAQ (${response.status}) en ${endpoint}`);
  }

  return response.json();
}

/**
 * 1. Obtiene el listado de ubicaciones / estaciones de monitoreo.
 */
export const getLocations = async (limit = 100) => {
  try {
    const data = await request(`/locations?limit=${limit}`);
    return data.results || [];
  } catch (error) {
    console.error("Error obteniendo ubicaciones:", error);
    return [];
  }
};

/**
 * Obtiene el detalle de una ubicación específica por su ID.
 */
export const getLocationById = async (locationId) => {
  try {
    const data = await request(`/locations/${locationId}`);
    return data.results?.[0] || null;
  } catch (error) {
    console.error("Error obteniendo la ubicación:", error);
    return null;
  }
};

/**
 * 2. Obtiene los sensores pertenecientes a una ubicación seleccionada.
 */
export const getLocationSensors = async (locationId) => {
  try {
    const data = await request(`/locations/${locationId}/sensors`);
    return data.results || [];
  } catch (error) {
    console.error("Error obteniendo sensores de la ubicación:", error);
    return [];
  }
};

/**
 * Obtiene el detalle de un sensor específico por su ID.
 */
export const getSensorById = async (sensorId) => {
  try {
    const data = await request(`/sensors/${sensorId}`);
    return data.results?.[0] || null;
  } catch (error) {
    console.error("Error obteniendo el sensor:", error);
    return null;
  }
};

/**
 * 3. Obtiene las mediciones registradas por un sensor seleccionado.
 */
export const getSensorMeasurements = async (sensorId, limit = 50) => {
  try {
    const data = await request(`/sensors/${sensorId}/measurements?limit=${limit}`);
    return data.results || [];
  } catch (error) {
    console.error("Error obteniendo mediciones del sensor:", error);
    return [];
  }
};
