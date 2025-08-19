/**
 * Estructura base de la respuesta HTTP.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HttpBaseResponse = {
	readonly status?: number;
	readonly success: boolean;
	readonly message: string;
};

/**
 * Respuesta HTTP que contiene un objeto como data.
 */
export type HttpObjectResponse<T> = HttpBaseResponse & {
	readonly data: T;
};

/**
 * Respuesta HTTP que contiene una lista de objetos.
 */
export type HttpListResponse<T> = HttpBaseResponse & {
	readonly data: readonly T[];
};

/**
 * Estructura de los datos paginados.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HttpPaginateResponse<T> = {
	readonly items: readonly T[];
	readonly total_items: number;
	readonly total_pages: number;
};

/**
 * Respuesta HTTP que contiene una lista paginada.
 */
export type HttpResponsePaginate<T> = HttpBaseResponse & {
	readonly data: HttpPaginateResponse<T>;
};
