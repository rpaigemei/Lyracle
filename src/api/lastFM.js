// lastFM.js was developed with the help of AI

export async function fetchTracks(apiKey, limit = 100) {
    // if no api key is passed, throws error
    if (!apiKey) {
        throw new Error ('last.fm API key is required');
    }
    
    // last.fm api url
        // method = top tracks chart
        // api_key inserts your api key
        // format = json
        // limit = number of tracks to return (default = 100)
    const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json&limit=${limit}`;

    // http request to the url
    // waits until response is received
    const res = await fetch(url);

    // if response is not successful, throws error 
    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`last.fm request failed: ${res.status} ${res.statusText} ${txt}`);
    }

    // converts the response to json
    const data = await res.json();
    const tracks = (data.tracks && data.tracks.track) || [];

    // loops through each track and pulls out title and artist
    // if either is missing, return unknown
    return tracks.map((t) => {
        const title = t.name || 'unknown';
        const artist = (t.artist && (t.artist.name || t.artist)) || 'unknown';

        return {title, artist};
    });
}