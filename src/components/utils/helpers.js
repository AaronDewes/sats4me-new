const host = "https://sats4.me";

function contrastingColor(color)
{
    return (luma(color) >= 200) ? '#000' : '#fff';
}

function luma(color)
{
    var rgb = hexToRGB(color);
    return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
}

function hexToRGB(color)
{
    var rgb = [];
    for (var i = 0; i <= 2; i++)
        rgb[i] = parseInt(color.substr(i * 2, 2), 16);
    return rgb;
}

async function fetchInvoice(to, amount, comment) {
  let args = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      // value is expected in msat later
      body: JSON.stringify({ memo: comment, value: amount * 1000 })
    };
  const response = await fetch(host + `/${to}/v1/invoices`, args);

  if(!response.ok) {
    throw new Error(response.error);
  }

  return response.json();
}

async function fetchParams(to) {
  const response = await fetch(host + `/params?to=${to}`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });

  if(!response.ok) {
    throw new Error(response.error);
  }

  return response.json();
}

module.exports = {
  fetchInvoice: fetchInvoice,
  luma: luma,
  contrastingColor: contrastingColor,
  fetchParams: fetchParams,
}