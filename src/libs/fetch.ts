export const post = async <T extends object>(url: string, params?: T) => {
  const res = await fetch(url, {
    method: "POST",
    body: params ? JSON.stringify(params) : undefined,
  });
  const data = await res.json();
  if (data.success) {
    return data.result;
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
