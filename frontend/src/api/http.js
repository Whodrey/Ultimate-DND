const apiUrl = import.meta.env.VITE_BACKEND_URL ?? "/api";

function buildApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${apiUrl}${normalizedPath}`;
}

function isFormData(body) {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

function normalizeRequestBody(body, headers) {
  if (body === undefined || body === null || typeof body !== "object") {
    return {
      body,
      headers,
    };
  }

  if (isFormData(body)) {
    return {
      body,
      headers,
    };
  }

  return {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
}

async function parseJsonResponse(response, fallbackMessage) {
  const responseText = response.status === 204 ? "" : await response.text();
  let data = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }
  }

  if (!response.ok) {
    throw new Error(data?.message ?? fallbackMessage);
  }

  return data;
}

export async function apiRequest(path, options = {}) {
  const {
    body,
    fallbackMessage = "Request failed.",
    headers = {},
    ...fetchOptions
  } = options;
  const requestBody = normalizeRequestBody(body, headers);
  const response = await fetch(buildApiUrl(path), {
    ...fetchOptions,
    headers: requestBody.headers,
    body: requestBody.body,
  });

  return parseJsonResponse(response, fallbackMessage);
}
