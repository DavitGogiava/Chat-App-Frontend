import { deleteCookie } from "cookies-next";
import { toast } from "react-toastify";

interface FetchOptions extends Omit<RequestInit, "method"> {
  baseURL?: string;
  token?: string;
  noResponseBody?: boolean;
  device?: string;
  locale?: string;
}

export enum Status {
  SUCCESS = "success",
  FAIL = "fail",
}

export interface RequestError {
  type: "error";
  code:
    | "generic"
    | "validation_error"
    | "unsupported_locale"
    | "blocked_account"
    | "invalid_country";
  status: Status.FAIL;
  message: string;
  errors: Record<string, string[]>;
}

export interface SuccessResponse {
  message?: string;
  status?: Status.SUCCESS;
}

const handleUnauthorized = () => {
  deleteCookie("auth_token");
};

export const fetchClient = async (options?: FetchOptions) => {
  const {
    baseURL = process.env.NEXT_PUBLIC_BACKEND_URL,
    token = "",
    noResponseBody,
    device = "mobile",
    ...rest
  } = options || {};

  const get = async <T = unknown>(
    url: string
  ): Promise<T | RequestError | undefined> => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Device-Type": device,
        },
        ...rest,
      };

      const response = await fetch(`${baseURL}${url}`, options);

      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized();
        }

        const errorData = await response.json();

        if (global?.window) {
          toast.error(errorData.message);
        } else {
          // throw new Error(`${errorData.message} (Endpoint: ${url}, method: GET)`);
        }

        return { ...(errorData as RequestError), status: Status.FAIL };
      }

      try {
        const data = await response.json();

        return { ...data, status: Status.SUCCESS };
      } catch (error) {
        console.error(error, "fetchClientGet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = async <T = any>(
    url: string,
    body?: Record<string, unknown> | FormData,
    rest?: RequestInit
  ): Promise<T | RequestError | undefined> => {
    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
      "X-Device-Type": device,
    };

    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const requestOptions: RequestInit = {
      method: "POST",
      headers,
      ...rest,
      body: body instanceof FormData ? body : JSON.stringify(body),
    };

    try {
      const response = await fetch(`${baseURL}${url}`, requestOptions);
      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized();
        }
        const errorData = await response.json();
        return { ...(errorData as RequestError), status: Status.FAIL };
      }

      if (noResponseBody) return;

      const data = await response.json();
      return { ...data, status: Status.SUCCESS };
    } catch (error) {
      console.error(error, "fetchClientPost");
      return undefined;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patch = async <T = any>(
    url: string,
    body?: Record<string, unknown>
  ): Promise<T | RequestError | undefined> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Device-Type": device,
      },
      ...rest,
      body: JSON.stringify({ ...body }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorized();
      }
      const errorData = await response.json();

      return { ...(errorData as RequestError), status: Status.FAIL };
    }

    try {
      const data = await response.json();

      return { ...data, status: Status.SUCCESS };
    } catch (error) {
      console.error(error, "fetchClientPatch");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteRequest = async <T = any>(
    url: string
  ): Promise<T | RequestError | undefined> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Device-Type": device,
      },
      ...rest,
    });

    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorized();
      }
      const errorData = await response.json();

      return { ...(errorData as RequestError), status: Status.FAIL };
    }

    if (noResponseBody) return;

    try {
      const data = await response.json();

      return { ...data, status: Status.SUCCESS };
    } catch (error) {
      console.error(error, "fetchClientDelete");
    }
  };

  return { get, post, patch, delete: deleteRequest };
};
