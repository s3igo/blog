import type { APIRoute } from 'astro';

type ApiParams = Record<string, string | undefined>;
type ApiProps = Record<string, unknown>;

type ApiRouteOptions = {
    props?: ApiProps;
    params?: ApiParams;
};

/**
 * Astroが提供するAPIRoute型は以下のシグネチャを持つ。
 * ```ts
 * type APIRoute<
 *     APIProps extends Record<string, any> = Record<string, any>,
 *     APIParams extends Record<string, string | undefined> = Record<string, string | undefined>,
 * > = (context: APIContext<APIProps, APIParams>) => Response | Promise<Response>;
 * ```
 * そのため、型引数の順序によりAPIPropsだけ渡してAPIParamsを省略することは
 * できてもその逆はできない。
 *
 * しかし、実際にはAPIParamsだけ渡してAPIPropsを省略したいケースもあるので、
 * APIRouteをラップしてAPIPropsを省略できる型を提供する。
 **/
export type ApiRoute<T extends ApiRouteOptions = Record<string, never>> =
    APIRoute<
        T['props'] extends ApiProps ? T['props'] : ApiProps,
        T['params'] extends ApiParams ? T['params'] : ApiParams
    >;
