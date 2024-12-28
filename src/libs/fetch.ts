export const post = async <T extends object | null, K extends object | null>(
  url: string,
  params?: T
): Promise<K> => {
  const res = await fetch(url, {
    method: "POST",
    body: params ? JSON.stringify(params) : undefined,
  });
  const data = await res.json();
  if (data.success) {
    return data.result as K;
  } else {
    throw data;
  }
};

export const success = <T extends object>(data: T) => {
  return new Response(JSON.stringify({ success: true, result: data }), {
    status: 200,
  });
};

export const fail = (errorMsg: string) => {
  return new Response(JSON.stringify({ result: `error: ${errorMsg}` }), {
    status: 500,
  });
};
