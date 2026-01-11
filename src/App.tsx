import { useEffect, useState } from "react"

export function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [tracks, setTracks] = useState(null)

  useEffect(() => {
    console.log('effect')
    fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
      headers: {
        'api-key': 'be0d9c95-8751-4645-a84e-146c0f9b7f67'
      }
    }).then(res => res.json())
        .then(json => setTracks(json.data))
  }, [])

 
    
  if(tracks === null) {
    return <div>
      <h1>Musicfun</h1>
      <span>loading...</span>
    </div>
  }

  // if (tracks.length === 0) {
  //     return <div>
  //       <h1>Musicfun</h1>
  //       <span>No tracks</span>
  //     </div>
  // }

  return (
    <div>
      <h1>Musicfun</h1>
      <button onClick = { () => {setSelectedTrackId(null)}}>
        Reset selection
      </button>
      <ul>
        {
          tracks.map((track) => {
            return (
              <li key={track.id} style={{
                border: track.id === selectedTrackId ? '1px solid yellow' : 'none'
              }}>
                <div onClick={ () => {
                  setSelectedTrackId(track.id)
                }}>
                  {track.attributes.title}
                </div>
                <audio src={track.attachments[0].url} controls></audio>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
  
  
}

