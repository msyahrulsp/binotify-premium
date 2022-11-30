# Binotify Premium

## Features
### Add Song
Backend Endpoints:
```
`${baseUrl}/singer/${singerid}/songs`
```
Request payload:
```
{
  judul: "judul",
  audio_path: "audio_path",
  penyanyi_id: "penyanyi_id"
}
```
Response payload: none.  
Penyanyi id didapat dari front end url:
```
http://localhost:3000/singer/:penyanyi_id/songs
```

### Edit Song
Backend Endpoints:
```
`${baseUrl}/singer/${singerid}/songs/${songid}`
```
Request payload:
```
{
  song_id: songid // integer,
  judul: "songTitle",
  penyanyi_id: "singerid",
  audio_path: "songPath"
}
```
Response payload: none.  
Penyanyi id dan song id didapat dari front end url.
```
http://localhost:3000/singer/:singerid/songs/:songid
```

### Delete Song
Backend Endpoints:
```
`${baseUrl}/singer/${singerid}/songs/${songID}`
```
Request payload: none.  
Response payload: none.  
Penyanyi id dan song id didapat dari button click setiap list item.