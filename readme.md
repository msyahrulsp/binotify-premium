# Binotify Premium

## Deskripsi Singkat Aplikasi

Binotify Premium adalah sebuah website luar biasa saja yang dikerjakan oleh 3 mahasiswa relatif stress yang berfungsi sebagai pemutar lagu (walaupun Spotify lebih bagus) untuk memenuhi salah satu Tugas Besar pada mata kuliah Web Based Development

## Screenshot Tampilan Aplikasi

#### Homepage

![image](https://user-images.githubusercontent.com/69589003/205214553-f62395e8-98e4-4456-9bee-35563ac0b5ff.png)

#### Login

![image](https://user-images.githubusercontent.com/69589003/205214678-529b3eaf-84a3-43db-b9be-fb97c857069a.png)

#### Register

![image](https://user-images.githubusercontent.com/69589003/205215199-f0870433-77c4-4552-9982-dde955f84255.png)

#### Dashboard Singer

![image](https://user-images.githubusercontent.com/69589003/205215308-83cfb937-976e-454b-8c5d-d321876fe2b6.png)

#### Singer's Song List

![image](https://user-images.githubusercontent.com/69589003/205215382-25c4835f-800a-43dd-ab16-c4243821adb7.png)

#### Add Song Modal

![image](https://user-images.githubusercontent.com/69589003/205215433-1a70ce0c-e093-42d9-a565-289fce619346.png)

#### Dashboard Admin

![image](https://user-images.githubusercontent.com/69589003/205215498-167b80ba-d482-41c2-8632-41069ce96f3b.png)

#### Subscription List Request

![image](https://user-images.githubusercontent.com/69589003/205216848-a666daec-89ab-414b-8336-914462d19c50.png)

#### Handle Subscription Request

![image](https://user-images.githubusercontent.com/69589003/205216912-eee2df0a-4316-417a-976a-faed7a87ee98.png)

## Pembagian Tugas

| Task                         | NIM                          |
| ---------------------------- | ---------------------------- |
| Login & Register             | 13520080                     |
| List Permintaan Subscription | 13520161                     |
| Pengelolaan Lagu             | 13520002                     |
| Integrasi dengan Backend     | 13520002, 13520080, 13520161 |

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
