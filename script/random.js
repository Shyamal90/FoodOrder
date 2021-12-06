async function getData(url){

    let response = await fetch(url);
    let data     =  response.json();

    return data;
}

export default getData;
