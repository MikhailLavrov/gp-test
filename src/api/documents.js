export const getData = (url, dispatchCallback) => {
  fetch(url)
  .then(Response => Response.ok ? Response.json() : console.log(`Response.status: ${Response.status}`))
  .then(data => {
    // Приводим дату в читаемый вид
    const filteredData = data.map(item => ({ ...item, deliveryDate: item.deliveryDate.substring(0, 10) }));
    dispatchCallback(filteredData)
  })
  .catch(error => console.error(`Fetching data error: ${error}`))
}

export const postData = (url, content) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({content})
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}

export const documentsApi = {
  getData,
  postData,
}
