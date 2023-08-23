interface apiProps {
  headers?: {};
  body?: string;
  url: string;
  method: string;
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
}

export const fetchData = async ({
  headers,
  body,
  url,
  method,
  cache,
}: apiProps): Promise<any> => {
  const response = await fetch(url, {
    headers: headers,
    body: body,
    method: method === undefined || method === null ? 'GET' : method,
    cache: cache,
  });
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  // console.log(await response.json());

  return response.json();
};
